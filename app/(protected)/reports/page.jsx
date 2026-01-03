'use client';

import { useState, useEffect } from 'react';
import { Search, Sparkles, Calendar, Filter, Download, RefreshCw, ChevronDown, X, Plus } from 'lucide-react';

export default function ReportsPage() {
  const [scrollY, setScrollY] = useState(0);
  const fadeDistance = 80; // Smaller fade distance
  const fadeOpacity = Math.max(0, 1 - scrollY / fadeDistance);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const [searchQuery, setSearchQuery] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [reportData, setReportData] = useState(null);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [savedQueries, setSavedQueries] = useState([
    'Call details every Monday',
    'Negative reviews from last week',
    'Direction requests on weekends',
    'All 5-star reviews this month'
  ]);

  const [activeFilters, setActiveFilters] = useState({
    dateRange: 'custom',
    dataType: 'all',
    frequency: 'once'
  });

  const dataTypeOptions = [
    { value: 'all', label: 'All Data' },
    { value: 'calls', label: 'Call Details' },
    { value: 'reviews', label: 'Reviews' },
    { value: 'directions', label: 'Directions' },
    { value: 'impressions', label: 'Impressions' },
    { value: 'clicks', label: 'Clicks' }
  ];

  const frequencyOptions = [
    { value: 'once', label: 'One-time Report' },
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly (Every Monday)' },
    { value: 'monthly', label: 'Monthly' }
  ];

  const handleSearch = async () => {
    setIsProcessing(true);
    // Simulate AI processing - Replace with actual Google API call
    setTimeout(() => {
      setReportData({
        query: searchQuery,
        results: [
          { date: 'Mon, Dec 2', calls: 28, duration: '2h 15m', source: 'Google Search' },
          { date: 'Mon, Dec 9', calls: 32, duration: '2h 45m', source: 'Google Maps' },
          { date: 'Mon, Dec 16', calls: 25, duration: '1h 58m', source: 'Google Search' }
        ],
        filters: activeFilters
      });
      setIsProcessing(false);
    }, 2000);
  };

  const handleQuickQuery = (query) => {
    setSearchQuery(query);
  };

  const handleSaveQuery = () => {
    if (searchQuery && !savedQueries.includes(searchQuery)) {
      setSavedQueries([searchQuery, ...savedQueries]);
      alert('Query saved successfully!');
    }
  };

  const handleExportCSV = () => {
    if (!reportData) return;

    let csvContent = 'data:text/csv;charset=utf-8,';
    
    // Add headers
    csvContent += 'Query Report Export\n';
    csvContent += `Generated: ${new Date().toLocaleString()}\n`;
    csvContent += `Query: "${reportData.query}"\n\n`;
    
    // Add filters summary
    csvContent += 'Filters Applied\n';
    csvContent += `Date Range: ${reportData.filters.dateRange}\n`;
    csvContent += `Data Type: ${reportData.filters.dataType}\n`;
    csvContent += `Frequency: ${reportData.filters.frequency}\n\n`;
    
    // Add table headers
    csvContent += 'Date,Total Calls,Duration,Source\n';
    
    // Add data rows
    reportData.results.forEach(row => {
      csvContent += `"${row.date}",${row.calls},"${row.duration}","${row.source}"\n`;
    });
    
    // Add summary
    const totalCalls = reportData.results.reduce((sum, row) => sum + row.calls, 0);
    csvContent += `\nTotal Calls: ${totalCalls}\n`;
    csvContent += `Average Calls per Day: ${(totalCalls / reportData.results.length).toFixed(2)}\n`;

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `report_${new Date().getTime()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportPDF = async () => {
    if (!reportData) return;

    try {
      const { jsPDF } = await import('jspdf');
      const doc = new jsPDF();
      
      let yPos = 15;
      const margin = 10;
      const lineHeight = 7;
      
      // Title
      doc.setFontSize(16);
      doc.text('Query Report', margin, yPos);
      yPos += 12;
      
      // Report Info
      doc.setFontSize(9);
      doc.text(`Generated: ${new Date().toLocaleString()}`, margin, yPos);
      yPos += lineHeight;
      doc.text(`Query: "${reportData.query}"`, margin, yPos);
      yPos += 12;
      
      // Filters Section
      doc.setFontSize(11);
      doc.setFont(undefined, 'bold');
      doc.text('FILTERS APPLIED', margin, yPos);
      yPos += 10;
      
      doc.setFontSize(8);
      doc.setFont(undefined, 'normal');
      const filterRows = [
        ['Date Range', reportData.filters.dateRange],
        ['Data Type', reportData.filters.dataType],
        ['Frequency', reportData.filters.frequency]
      ];
      
      // Draw filters table
      const tableWidth = 180;
      const colWidth = tableWidth / 2;
      doc.setFillColor(79, 70, 229);
      doc.setTextColor(255, 255, 255);
      doc.rect(margin, yPos - 5, tableWidth, 6, 'F');
      doc.text('Filter', margin + 2, yPos);
      doc.text('Value', margin + colWidth + 2, yPos);
      
      yPos += 8;
      doc.setTextColor(0, 0, 0);
      
      filterRows.forEach((row, idx) => {
        if (idx % 2 === 0) {
          doc.setFillColor(240, 240, 240);
          doc.rect(margin, yPos - 5, tableWidth, 6, 'F');
        }
        doc.setDrawColor(200, 200, 200);
        doc.rect(margin, yPos - 5, tableWidth, 6);
        doc.text(row[0], margin + 2, yPos);
        doc.text(row[1], margin + colWidth + 2, yPos);
        yPos += 8;
      });
      
      yPos += 8;
      
      // Check if we need a new page
      if (yPos > 250) {
        doc.addPage();
        yPos = 15;
      }
      
      // Results Section
      doc.setFontSize(11);
      doc.setFont(undefined, 'bold');
      doc.text('REPORT RESULTS', margin, yPos);
      yPos += 10;
      
      doc.setFontSize(8);
      doc.setFont(undefined, 'normal');
      const resultRows = reportData.results.map(row => [
        row.date,
        row.calls.toString(),
        row.duration,
        row.source
      ]);
      
      // Draw results table
      const resultColWidth = tableWidth / 4;
      doc.setFillColor(79, 70, 229);
      doc.setTextColor(255, 255, 255);
      doc.rect(margin, yPos - 5, tableWidth, 6, 'F');
      doc.text('Date', margin + 2, yPos);
      doc.text('Calls', margin + resultColWidth + 2, yPos);
      doc.text('Duration', margin + resultColWidth * 2 + 2, yPos);
      doc.text('Source', margin + resultColWidth * 3 + 2, yPos);
      
      yPos += 8;
      doc.setTextColor(0, 0, 0);
      
      resultRows.forEach((row, idx) => {
        if (idx % 2 === 0) {
          doc.setFillColor(240, 240, 240);
          doc.rect(margin, yPos - 5, tableWidth, 6, 'F');
        }
        doc.setDrawColor(200, 200, 200);
        doc.rect(margin, yPos - 5, tableWidth, 6);
        doc.text(row[0], margin + 2, yPos);
        doc.text(row[1], margin + resultColWidth + 2, yPos);
        doc.text(row[2], margin + resultColWidth * 2 + 2, yPos);
        doc.text(row[3], margin + resultColWidth * 3 + 2, yPos);
        yPos += 8;
      });
      
      yPos += 8;
      
      // Check if we need a new page
      if (yPos > 250) {
        doc.addPage();
        yPos = 15;
      }
      
      // Summary Statistics
      const totalCalls = reportData.results.reduce((sum, row) => sum + row.calls, 0);
      const avgCallsPerDay = (totalCalls / reportData.results.length).toFixed(2);
      
      doc.setFontSize(11);
      doc.setFont(undefined, 'bold');
      doc.text('SUMMARY STATISTICS', margin, yPos);
      yPos += 10;
      
      doc.setFontSize(8);
      doc.setFont(undefined, 'normal');
      const summaryRows = [
        ['Total Calls', totalCalls.toString()],
        ['Average Calls per Day', avgCallsPerDay]
      ];
      
      doc.setFillColor(79, 70, 229);
      doc.setTextColor(255, 255, 255);
      doc.rect(margin, yPos - 5, tableWidth, 6, 'F');
      doc.text('Metric', margin + 2, yPos);
      doc.text('Value', margin + colWidth + 2, yPos);
      
      yPos += 8;
      doc.setTextColor(0, 0, 0);
      
      summaryRows.forEach((row, idx) => {
        if (idx % 2 === 0) {
          doc.setFillColor(240, 240, 240);
          doc.rect(margin, yPos - 5, tableWidth, 6, 'F');
        }
        doc.setDrawColor(200, 200, 200);
        doc.rect(margin, yPos - 5, tableWidth, 6);
        doc.text(row[0], margin + 2, yPos);
        doc.text(row[1], margin + colWidth + 2, yPos);
        yPos += 8;
      });
      
      // Save PDF
      doc.save(`report-${new Date().getTime()}.pdf`);
    } catch (error) {
      console.error('Error exporting to PDF:', error);
      alert('Error exporting to PDF: ' + error.message);
    }
  };

  const handleExportExcel = async () => {
    if (!reportData) return;

    try {
      const XLSX = await import('xlsx');
      
      // Create workbook
      const wb = XLSX.utils.book_new();
      
      // Summary sheet
      const summaryData = [
        ['Report Summary'],
        ['Query', reportData.query],
        ['Generated', new Date().toLocaleString()],
        [''],
        ['Filters Applied'],
        ['Date Range', reportData.filters.dateRange],
        ['Data Type', reportData.filters.dataType],
        ['Frequency', reportData.filters.frequency],
        [''],
        ['Statistics'],
      ];
      
      const totalCalls = reportData.results.reduce((sum, row) => sum + row.calls, 0);
      summaryData.push(['Total Calls', totalCalls]);
      summaryData.push(['Average Calls per Day', (totalCalls / reportData.results.length).toFixed(2)]);
      
      const summarySheet = XLSX.utils.aoa_to_sheet(summaryData);
      summarySheet['!cols'] = [{ wch: 25 }, { wch: 40 }];
      XLSX.utils.book_append_sheet(wb, summarySheet, 'Summary');
      
      // Results sheet
      const resultsData = [
        ['Date', 'Total Calls', 'Duration', 'Source'],
        ...reportData.results.map(row => [row.date, row.calls, row.duration, row.source])
      ];
      
      const resultsSheet = XLSX.utils.aoa_to_sheet(resultsData);
      resultsSheet['!cols'] = [{ wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 20 }];
      XLSX.utils.book_append_sheet(wb, resultsSheet, 'Results');
      
      // Heatmap sheet with activity data
      const heatmapData = {
        all: {
          'Mon': [5, 3, 2, 1, 2, 8, 25, 45, 78, 85, 82, 78, 72, 70, 75, 85, 92, 95, 88, 72, 45, 28, 15, 8],
          'Tue': [4, 2, 1, 1, 3, 10, 28, 48, 80, 88, 85, 80, 75, 72, 78, 88, 95, 98, 92, 78, 50, 32, 18, 10],
          'Wed': [6, 3, 2, 2, 4, 12, 30, 52, 82, 90, 88, 82, 78, 75, 82, 90, 98, 100, 95, 80, 52, 35, 20, 12],
          'Thu': [5, 3, 1, 1, 3, 10, 28, 48, 80, 88, 85, 80, 75, 72, 78, 88, 95, 98, 92, 78, 50, 32, 18, 10],
          'Fri': [7, 4, 2, 2, 4, 14, 32, 56, 85, 92, 90, 85, 80, 78, 85, 92, 100, 100, 98, 85, 60, 40, 25, 14],
          'Sat': [8, 5, 3, 2, 3, 10, 22, 42, 68, 78, 80, 82, 85, 88, 90, 90, 85, 80, 75, 60, 42, 28, 18, 12],
          'Sun': [7, 4, 2, 1, 2, 6, 18, 35, 58, 68, 72, 75, 78, 80, 85, 80, 75, 68, 62, 48, 32, 22, 15, 8]
        },
        calls: {
          'Mon': [2, 1, 0, 0, 1, 3, 8, 15, 28, 35, 32, 28, 25, 22, 25, 30, 38, 42, 38, 28, 18, 12, 6, 2],
          'Tue': [1, 1, 0, 0, 1, 4, 10, 18, 30, 38, 35, 30, 28, 25, 28, 35, 42, 45, 40, 30, 20, 15, 8, 4],
          'Wed': [2, 1, 0, 0, 1, 5, 12, 20, 32, 40, 38, 32, 30, 28, 32, 38, 45, 48, 42, 32, 22, 18, 10, 5],
          'Thu': [2, 1, 0, 0, 1, 4, 10, 18, 30, 38, 35, 30, 28, 25, 28, 35, 42, 45, 40, 30, 20, 15, 8, 4],
          'Fri': [2, 2, 0, 0, 1, 5, 14, 22, 35, 42, 40, 35, 32, 30, 35, 40, 48, 52, 45, 35, 25, 18, 12, 5],
          'Sat': [3, 2, 1, 0, 1, 3, 8, 15, 25, 32, 35, 38, 40, 42, 45, 45, 40, 38, 32, 25, 18, 12, 8, 4],
          'Sun': [2, 1, 0, 0, 1, 2, 6, 12, 20, 25, 28, 32, 35, 38, 42, 38, 32, 28, 25, 18, 12, 8, 6, 2]
        },
        directions: {
          'Mon': [1, 1, 0, 0, 0, 2, 5, 10, 18, 22, 20, 18, 15, 15, 18, 22, 28, 32, 28, 18, 10, 6, 3, 1],
          'Tue': [1, 0, 0, 0, 1, 3, 8, 12, 20, 25, 22, 20, 18, 15, 20, 25, 32, 35, 30, 20, 12, 8, 4, 2],
          'Wed': [1, 1, 0, 0, 1, 3, 8, 14, 22, 28, 25, 22, 20, 18, 22, 28, 35, 38, 32, 22, 14, 10, 6, 3],
          'Thu': [1, 0, 0, 0, 1, 3, 8, 12, 20, 25, 22, 20, 18, 15, 20, 25, 32, 35, 30, 20, 12, 8, 4, 2],
          'Fri': [2, 1, 0, 0, 1, 4, 10, 16, 25, 30, 28, 25, 22, 20, 25, 30, 38, 42, 35, 25, 18, 12, 8, 4],
          'Sat': [2, 1, 1, 0, 1, 2, 6, 12, 18, 22, 25, 28, 30, 32, 35, 35, 30, 28, 22, 18, 12, 8, 5, 2],
          'Sun': [1, 1, 0, 0, 0, 1, 4, 8, 14, 18, 20, 22, 25, 28, 32, 28, 22, 18, 15, 12, 8, 5, 3, 1]
        },
        clicks: {
          'Mon': [3, 2, 1, 1, 1, 5, 15, 28, 50, 58, 55, 50, 45, 42, 46, 52, 58, 62, 58, 45, 28, 18, 10, 5],
          'Tue': [2, 1, 1, 1, 2, 6, 18, 30, 52, 60, 58, 52, 48, 45, 48, 55, 60, 65, 60, 48, 30, 20, 12, 6],
          'Wed': [4, 2, 1, 1, 2, 7, 20, 32, 55, 62, 60, 55, 50, 48, 52, 58, 62, 68, 62, 50, 32, 22, 13, 7],
          'Thu': [3, 2, 1, 1, 2, 6, 18, 30, 52, 60, 58, 52, 48, 45, 48, 55, 60, 65, 60, 48, 30, 20, 12, 6],
          'Fri': [4, 3, 1, 1, 3, 8, 22, 35, 58, 65, 62, 58, 52, 50, 55, 60, 65, 70, 65, 55, 38, 25, 15, 8],
          'Sat': [5, 3, 2, 1, 2, 5, 12, 25, 42, 50, 52, 55, 58, 60, 62, 62, 58, 55, 48, 38, 28, 18, 12, 7],
          'Sun': [4, 2, 1, 1, 1, 3, 10, 20, 35, 42, 45, 48, 50, 52, 55, 52, 48, 42, 38, 28, 18, 12, 8, 5]
        },
        views: {
          'Mon': [8, 5, 3, 2, 3, 12, 35, 58, 88, 95, 92, 85, 80, 78, 82, 90, 98, 100, 95, 80, 55, 38, 22, 12],
          'Tue': [7, 4, 2, 2, 4, 15, 38, 60, 90, 98, 95, 88, 82, 80, 85, 92, 100, 98, 98, 82, 58, 40, 25, 15],
          'Wed': [9, 5, 3, 3, 5, 18, 40, 65, 92, 100, 98, 90, 85, 82, 88, 95, 98, 100, 98, 85, 60, 42, 28, 18],
          'Thu': [8, 5, 2, 2, 4, 15, 38, 60, 90, 98, 95, 88, 82, 80, 85, 92, 100, 98, 98, 82, 58, 40, 25, 15],
          'Fri': [10, 6, 3, 3, 6, 20, 45, 68, 95, 100, 100, 95, 90, 88, 92, 98, 100, 100, 100, 90, 70, 48, 32, 20],
          'Sat': [12, 8, 5, 3, 4, 12, 28, 52, 78, 88, 90, 92, 95, 98, 100, 100, 95, 90, 82, 68, 52, 38, 25, 18],
          'Sun': [10, 6, 3, 2, 3, 8, 22, 42, 65, 75, 78, 82, 85, 88, 90, 88, 82, 75, 68, 52, 35, 25, 18, 12]
        }
      };

      const hours = Array.from({length: 24}, (_, i) => {
        if (i === 0) return '12am';
        if (i < 12) return `${i}am`;
        if (i === 12) return '12pm';
        return `${i-12}pm`;
      });

      const heatmapSheet = [['ACTIVITY HEATMAP DATA']];
      heatmapSheet.push(['']);
      
      // Add ALL metric
      if (heatmapData && heatmapData.all) {
        heatmapSheet.push(['ALL METRIC']);
        heatmapSheet.push(['Day', ...hours]);
        heatmapSheet.push(['Mon', ...heatmapData.all.Mon]);
        heatmapSheet.push(['Tue', ...heatmapData.all.Tue]);
        heatmapSheet.push(['Wed', ...heatmapData.all.Wed]);
        heatmapSheet.push(['Thu', ...heatmapData.all.Thu]);
        heatmapSheet.push(['Fri', ...heatmapData.all.Fri]);
        heatmapSheet.push(['Sat', ...heatmapData.all.Sat]);
        heatmapSheet.push(['Sun', ...heatmapData.all.Sun]);
        heatmapSheet.push(['']);
      }
      
      // Add CALLS metric
      if (heatmapData && heatmapData.calls) {
        heatmapSheet.push(['CALLS METRIC']);
        heatmapSheet.push(['Day', ...hours]);
        heatmapSheet.push(['Mon', ...heatmapData.calls.Mon]);
        heatmapSheet.push(['Tue', ...heatmapData.calls.Tue]);
        heatmapSheet.push(['Wed', ...heatmapData.calls.Wed]);
        heatmapSheet.push(['Thu', ...heatmapData.calls.Thu]);
        heatmapSheet.push(['Fri', ...heatmapData.calls.Fri]);
        heatmapSheet.push(['Sat', ...heatmapData.calls.Sat]);
        heatmapSheet.push(['Sun', ...heatmapData.calls.Sun]);
        heatmapSheet.push(['']);
      }
      
      // Add DIRECTIONS metric
      if (heatmapData && heatmapData.directions) {
        heatmapSheet.push(['DIRECTIONS METRIC']);
        heatmapSheet.push(['Day', ...hours]);
        heatmapSheet.push(['Mon', ...heatmapData.directions.Mon]);
        heatmapSheet.push(['Tue', ...heatmapData.directions.Tue]);
        heatmapSheet.push(['Wed', ...heatmapData.directions.Wed]);
        heatmapSheet.push(['Thu', ...heatmapData.directions.Thu]);
        heatmapSheet.push(['Fri', ...heatmapData.directions.Fri]);
        heatmapSheet.push(['Sat', ...heatmapData.directions.Sat]);
        heatmapSheet.push(['Sun', ...heatmapData.directions.Sun]);
        heatmapSheet.push(['']);
      }
      
      // Add CLICKS metric
      if (heatmapData && heatmapData.clicks) {
        heatmapSheet.push(['CLICKS METRIC']);
        heatmapSheet.push(['Day', ...hours]);
        heatmapSheet.push(['Mon', ...heatmapData.clicks.Mon]);
        heatmapSheet.push(['Tue', ...heatmapData.clicks.Tue]);
        heatmapSheet.push(['Wed', ...heatmapData.clicks.Wed]);
        heatmapSheet.push(['Thu', ...heatmapData.clicks.Thu]);
        heatmapSheet.push(['Fri', ...heatmapData.clicks.Fri]);
        heatmapSheet.push(['Sat', ...heatmapData.clicks.Sat]);
        heatmapSheet.push(['Sun', ...heatmapData.clicks.Sun]);
        heatmapSheet.push(['']);
      }
      
      // Add VIEWS metric
      if (heatmapData && heatmapData.views) {
        heatmapSheet.push(['VIEWS METRIC']);
        heatmapSheet.push(['Day', ...hours]);
        heatmapSheet.push(['Mon', ...heatmapData.views.Mon]);
        heatmapSheet.push(['Tue', ...heatmapData.views.Tue]);
        heatmapSheet.push(['Wed', ...heatmapData.views.Wed]);
        heatmapSheet.push(['Thu', ...heatmapData.views.Thu]);
        heatmapSheet.push(['Fri', ...heatmapData.views.Fri]);
        heatmapSheet.push(['Sat', ...heatmapData.views.Sat]);
        heatmapSheet.push(['Sun', ...heatmapData.views.Sun]);
      }
      
      const heatmapWS = XLSX.utils.aoa_to_sheet(heatmapSheet);
      heatmapWS['!cols'] = [{wch: 10}, ...Array(24).fill({wch: 6})];
      XLSX.utils.book_append_sheet(wb, heatmapWS, 'Heatmap');
      
      XLSX.writeFile(wb, `report_${new Date().getTime()}.xlsx`);
    } catch (error) {
      console.error('Error exporting to Excel:', error);
      alert('Error exporting to Excel');
    }
  };

  return (
    <div className="min-h-screen">
      <div className="p-10 max-w-7xl mx-auto pr-24">
          {/* AI-Powered Search Bar */}
          <div className="rounded-xl border border-gray-200 p-6 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles size={24} className="text-indigo-600" />
              <h2 className="text-lg font-semibold text-gray-900">AI-Powered Report Builder</h2>
            </div>

            {/* Main Search Input */}
            <div className="relative mb-4">
              <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Ask anything... e.g., 'Show me call details every Monday' or 'Get all 5-star reviews from last week'"
                className="w-full pl-12 pr-4 py-4 text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder:text-gray-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-all"
                >
                  <X size={18} className="text-gray-400" />
                </button>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
                <button
                  onClick={handleSearch}
                  disabled={!searchQuery || isProcessing}
                  className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw size={18} className="animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Sparkles size={18} />
                      Generate Report
                    </>
                  )}
                </button>

                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
                >
                  <Filter size={18} />
                  Advanced Filters
                  <ChevronDown size={16} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                </button>

                {searchQuery && (
                  <button
                    onClick={handleSaveQuery}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
                  >
                    <Plus size={18} />
                    Save Query
                  </button>
                )}
              </div>

            {/* Advanced Filters */}
            {showFilters && (
              <div className="mt-6 pt-6 border-t border-gray-200 grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Data Type</label>
                  <select
                    value={activeFilters.dataType}
                    onChange={(e) => setActiveFilters({...activeFilters, dataType: e.target.value})}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    {dataTypeOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Date Range</label>
                  <input
                    type="date"
                    value={activeFilters.dateRange}
                    onChange={(e) => setActiveFilters({...activeFilters, dateRange: e.target.value})}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Frequency</label>
                  <select
                    value={activeFilters.frequency}
                    onChange={(e) => setActiveFilters({...activeFilters, frequency: e.target.value})}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    {frequencyOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Saved Queries */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-base font-semibold text-gray-900 mb-4">Saved Queries</h3>
              <div className="flex flex-wrap gap-2">
                {savedQueries.map((query, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickQuery(query)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-lg hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-300 transition-all"
                  >
                    {query}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Table */}
          {reportData && (
            <div className="rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Report Results</h3>
                  <p className="text-sm text-gray-500 mt-1">Query: &quot;{reportData.query}&quot;</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <button 
                      onClick={() => setShowExportMenu(!showExportMenu)}
                      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
                    >
                      <Download size={18} />
                      Export Report
                      <ChevronDown size={16} className={`transition-transform ${showExportMenu ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {showExportMenu && (
                      <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
                        <button
                          onClick={() => {
                            handleExportCSV();
                            setShowExportMenu(false);
                          }}
                          className="w-full text-left px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 border-b border-gray-200 transition-all"
                        >
                          📄 CSV File
                        </button>
                        <button
                          onClick={() => {
                            handleExportPDF();
                            setShowExportMenu(false);
                          }}
                          className="w-full text-left px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 border-b border-gray-200 transition-all"
                        >
                          📕 PDF File
                        </button>
                        <button
                          onClick={() => {
                            handleExportExcel();
                            setShowExportMenu(false);
                          }}
                          className="w-full text-left px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all rounded-b-lg"
                        >
                          📊 Excel File
                        </button>
                      </div>
                    )}
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-all">
                    <Calendar size={18} />
                    Schedule Report
                  </button>
                </div>
              </div>

              {/* Data Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Total Calls
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Duration
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Source
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {reportData.results.map((row, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {row.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {row.calls}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {row.duration}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {row.source}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Summary Stats */}
              <div className="mt-6 pt-6 border-t border-gray-200 grid grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-sm text-blue-700 font-semibold mb-2">Total Calls</p>
                  <p className="text-2xl font-bold text-gray-900">85</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-red-700 font-semibold mb-2">Avg. Duration</p>
                  <p className="text-2xl font-bold text-gray-900">2h 19m</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-yellow-700 font-semibold mb-2">Peak Day</p>
                  <p className="text-2xl font-bold text-gray-900">Mon, Dec 9</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-green-700 font-semibold mb-2">Growth</p>
                  <p className="text-2xl font-bold text-green-700">+12.5%</p>
                </div>
              </div>
            </div>
          )}
        </div>
    </div>
  );
}
