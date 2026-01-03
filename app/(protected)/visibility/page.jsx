'use client';

import { useState } from 'react';
import { LineChart, Line, BarChart, Bar, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Cell } from 'recharts';
import { TrendingUp, TrendingDown, Eye, Phone, Navigation, MousePointer, Calendar, MessageSquare, Search, MapPin, Download, Info } from 'lucide-react';
import KPIOverviewCard from '@/src/components/KPIOverviewCard';
import ActivityHeatmap from '@/src/components/ActivityHeatmap';
import { visibilityData as dashboardVisibilityData } from './dashboardData';

export default function VisibilityActivityPageRecharts() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('weekly');
  const [selectedMetric, setSelectedMetric] = useState(null); // null = all, 'calls', 'directions', 'clicks', 'impressions'
  const [activeTab, setActiveTab] = useState('bookings'); // 'bookings', 'search', 'messages'
  const [showExportMenu, setShowExportMenu] = useState(false);

  // Generate comparison data with current and previous periods
  const getComparisonData = (timeframe, metric) => {
    const baseData = chartData[timeframe];
    
    // Generate variations for previous periods (with realistic decreases)
    return baseData.map((item) => {
      const current = item[metric];
      return {
        label: item.label,
        [`${metric}_current`]: current,
        [`${metric}_prev1`]: Math.round(current * 0.92),
        [`${metric}_prev2`]: Math.round(current * 0.85),
        [`${metric}_prev3`]: Math.round(current * 0.78),
      };
    });
  };

  // Get data for chart - either all metrics or comparison data for selected metric
  const getChartData = () => {
    if (selectedMetric) {
      return getComparisonData(selectedTimeframe, selectedMetric);
    }
    return chartData[selectedTimeframe];
  };

  const handleExportCSV = () => {
    // Heatmap data
    const heatmapData = {
      all: {
        'Mon': [5, 3, 2, 1, 2, 8, 25, 45, 78, 85, 82, 75, 70, 68, 72, 80, 88, 92, 85, 70, 45, 30, 15, 8],
        'Tue': [4, 2, 1, 1, 3, 10, 28, 48, 80, 88, 85, 78, 72, 70, 75, 82, 90, 95, 88, 72, 48, 32, 18, 10],
        'Wed': [6, 3, 2, 2, 4, 12, 30, 50, 82, 90, 88, 80, 75, 72, 78, 85, 92, 98, 90, 75, 50, 35, 20, 12],
        'Thu': [5, 3, 1, 1, 3, 10, 28, 48, 80, 88, 85, 78, 72, 70, 75, 82, 90, 95, 88, 72, 48, 32, 18, 10],
        'Fri': [7, 4, 2, 2, 5, 15, 35, 55, 85, 92, 90, 85, 80, 78, 82, 88, 95, 100, 95, 80, 60, 40, 25, 15],
        'Sat': [8, 5, 3, 2, 3, 8, 20, 40, 65, 75, 78, 80, 82, 85, 88, 90, 85, 80, 70, 55, 40, 28, 18, 12],
        'Sun': [6, 4, 2, 1, 2, 5, 15, 30, 50, 60, 65, 70, 72, 75, 78, 75, 70, 65, 55, 40, 25, 18, 12, 8]
      },
      calls: {
        'Mon': [2, 1, 0, 0, 1, 3, 15, 35, 68, 75, 72, 65, 60, 58, 62, 70, 78, 82, 75, 60, 35, 20, 8, 3],
        'Tue': [2, 1, 0, 0, 1, 5, 18, 38, 70, 78, 75, 68, 62, 60, 65, 72, 80, 85, 78, 62, 38, 22, 10, 5],
        'Wed': [3, 1, 0, 0, 2, 6, 20, 40, 72, 80, 78, 70, 65, 62, 68, 75, 82, 88, 80, 65, 40, 25, 12, 6],
        'Thu': [2, 1, 0, 0, 1, 5, 18, 38, 70, 78, 75, 68, 62, 60, 65, 72, 80, 85, 78, 62, 38, 22, 10, 5],
        'Fri': [3, 2, 0, 0, 2, 8, 25, 45, 75, 82, 80, 75, 70, 68, 72, 78, 85, 90, 85, 70, 50, 30, 15, 8],
        'Sat': [4, 2, 1, 0, 1, 3, 12, 30, 55, 65, 68, 70, 72, 75, 78, 80, 75, 70, 60, 45, 30, 18, 10, 6],
        'Sun': [3, 2, 0, 0, 1, 2, 8, 20, 40, 50, 55, 60, 62, 65, 68, 65, 60, 55, 45, 30, 15, 10, 6, 4]
      },
      directions: {
        'Mon': [1, 0, 0, 0, 0, 2, 8, 20, 45, 52, 50, 45, 42, 40, 44, 50, 56, 60, 52, 42, 25, 15, 5, 2],
        'Tue': [1, 0, 0, 0, 1, 3, 10, 22, 48, 55, 52, 48, 44, 42, 46, 52, 58, 62, 55, 44, 28, 16, 8, 3],
        'Wed': [2, 1, 0, 0, 1, 4, 12, 25, 50, 58, 55, 50, 46, 44, 48, 52, 60, 65, 58, 46, 30, 18, 10, 4],
        'Thu': [1, 0, 0, 0, 1, 3, 10, 22, 48, 55, 52, 48, 44, 42, 46, 52, 58, 62, 55, 44, 28, 16, 8, 3],
        'Fri': [2, 1, 0, 0, 2, 5, 15, 28, 52, 60, 58, 52, 48, 46, 50, 56, 62, 68, 62, 50, 35, 22, 12, 5],
        'Sat': [3, 2, 1, 0, 1, 2, 10, 22, 40, 48, 50, 52, 54, 56, 58, 58, 55, 52, 45, 35, 25, 15, 10, 5],
        'Sun': [2, 1, 0, 0, 0, 1, 6, 15, 30, 38, 40, 42, 44, 46, 48, 46, 42, 38, 32, 22, 12, 8, 5, 3]
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

    const exportData = {
      generatedAt: new Date().toLocaleString(),
      currentTimeframe: selectedTimeframe,
      currentMetric: selectedMetric || 'All Metrics',
      kpiData: getTimeframeKPIData(),
      allChartData: {
        daily: chartData.daily,
        weekly: chartData.weekly,
        monthly: chartData.monthly,
        yearly: chartData.yearly
      },
      heatmapData: heatmapData,
      topLocations: topLocations,
      searchQueries: searchQueries
    };

    const csvContent = generateCSV(exportData);
    downloadCSV(csvContent, `visibility-report-${new Date().toISOString().split('T')[0]}.csv`);
  };

  const handleExportPDF = async () => {
    try {
      const { jsPDF } = await import('jspdf');
      const doc = new jsPDF();
      
      const kpiData = getTimeframeKPIData();
      let yPos = 15;
      const margin = 10;
      const lineHeight = 6;
      const tableWidth = 180;
      
      // Heatmap data - MUST be defined here
      const heatmapData = {
        all: {
          'Mon': [5, 3, 2, 1, 2, 8, 25, 45, 78, 85, 82, 75, 70, 68, 72, 80, 88, 92, 85, 70, 45, 30, 15, 8],
          'Tue': [4, 2, 1, 1, 3, 10, 28, 48, 80, 88, 85, 78, 72, 70, 75, 82, 90, 95, 88, 72, 48, 32, 18, 10],
          'Wed': [6, 3, 2, 2, 4, 12, 30, 50, 82, 90, 88, 80, 75, 72, 78, 85, 92, 98, 90, 75, 50, 35, 20, 12],
          'Thu': [5, 3, 1, 1, 3, 10, 28, 48, 80, 88, 85, 78, 72, 70, 75, 82, 90, 95, 88, 72, 48, 32, 18, 10],
          'Fri': [7, 4, 2, 2, 5, 15, 35, 55, 85, 92, 90, 85, 80, 78, 82, 88, 95, 100, 95, 80, 60, 40, 25, 15],
          'Sat': [8, 5, 3, 2, 3, 8, 20, 40, 65, 75, 78, 80, 82, 85, 88, 90, 85, 80, 70, 55, 40, 28, 18, 12],
          'Sun': [6, 4, 2, 1, 2, 5, 15, 30, 50, 60, 65, 70, 72, 75, 78, 75, 70, 65, 55, 40, 25, 18, 12, 8]
        },
        calls: {
          'Mon': [2, 1, 0, 0, 1, 3, 15, 35, 68, 75, 72, 65, 60, 58, 62, 70, 78, 82, 75, 60, 35, 20, 8, 3],
          'Tue': [2, 1, 0, 0, 1, 5, 18, 38, 70, 78, 75, 68, 62, 60, 65, 72, 80, 85, 78, 62, 38, 22, 10, 5],
          'Wed': [3, 1, 0, 0, 2, 6, 20, 40, 72, 80, 78, 70, 65, 62, 68, 75, 82, 88, 80, 65, 40, 25, 12, 6],
          'Thu': [2, 1, 0, 0, 1, 5, 18, 38, 70, 78, 75, 68, 62, 60, 65, 72, 80, 85, 78, 62, 38, 22, 10, 5],
          'Fri': [3, 2, 0, 0, 2, 8, 25, 45, 75, 82, 80, 75, 70, 68, 72, 78, 85, 90, 85, 70, 50, 30, 15, 8],
          'Sat': [4, 2, 1, 0, 1, 3, 12, 30, 55, 65, 68, 70, 72, 75, 78, 80, 75, 70, 60, 45, 30, 18, 10, 6],
          'Sun': [3, 2, 0, 0, 1, 2, 8, 20, 40, 50, 55, 60, 62, 65, 68, 65, 60, 55, 45, 30, 15, 10, 6, 4]
        },
        directions: {
          'Mon': [1, 0, 0, 0, 0, 2, 8, 20, 45, 52, 50, 45, 42, 40, 44, 50, 56, 60, 52, 42, 25, 15, 5, 2],
          'Tue': [1, 0, 0, 0, 1, 3, 10, 22, 48, 55, 52, 48, 44, 42, 46, 52, 58, 62, 55, 44, 28, 16, 8, 3],
          'Wed': [2, 1, 0, 0, 1, 4, 12, 25, 50, 58, 55, 50, 46, 44, 48, 52, 60, 65, 58, 46, 30, 18, 10, 4],
          'Thu': [1, 0, 0, 0, 1, 3, 10, 22, 48, 55, 52, 48, 44, 42, 46, 52, 58, 62, 55, 44, 28, 16, 8, 3],
          'Fri': [2, 1, 0, 0, 2, 5, 15, 28, 52, 60, 58, 52, 48, 46, 50, 56, 62, 68, 62, 50, 35, 22, 12, 5],
          'Sat': [3, 2, 1, 0, 1, 2, 10, 22, 40, 48, 50, 52, 54, 56, 58, 58, 55, 52, 45, 35, 25, 15, 10, 5],
          'Sun': [2, 1, 0, 0, 0, 1, 6, 15, 30, 38, 40, 42, 44, 46, 48, 46, 42, 38, 32, 22, 12, 8, 5, 3]
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
      
      // ===== PAGE 1: KPI & LOCATIONS =====
      // Title
      doc.setFontSize(16);
      doc.setFont(undefined, 'bold');
      doc.text('Visibility Report', margin, yPos);
      yPos += 12;
      
      // Header Info
      doc.setFontSize(8);
      doc.setFont(undefined, 'normal');
      doc.text(`Generated: ${new Date().toLocaleString()}`, margin, yPos);
      yPos += lineHeight;
      doc.text(`Timeframe: ${selectedTimeframe} | Metric: ${selectedMetric || 'All Metrics'}`, margin, yPos);
      yPos += 10;
      
      // KPI Summary
      doc.setFontSize(10);
      doc.setFont(undefined, 'bold');
      doc.text('KPI SUMMARY', margin, yPos);
      yPos += 8;
      
      doc.setFontSize(7);
      doc.setFont(undefined, 'normal');
      const kpiRows = [
        ['Impressions', kpiData.impressions.value, `${kpiData.impressions.trend}%`],
        ['Calls', kpiData.calls.value, `${kpiData.calls.trend}%`],
        ['Directions', kpiData.directions.value, `${kpiData.directions.trend}%`],
        ['Website Clicks', kpiData.websiteClicks.value, `${kpiData.websiteClicks.trend}%`],
        ['Bookings', kpiData.bookings.value, `${kpiData.bookings.trend}%`],
        ['Messages', kpiData.messages.value, `${kpiData.messages.trend}%`]
      ];
      
      const colWidth = tableWidth / 3;
      doc.setFillColor(79, 70, 229);
      doc.setTextColor(255, 255, 255);
      doc.rect(margin, yPos - 3, tableWidth, 5, 'F');
      doc.text('Metric', margin + 2, yPos);
      doc.text('Value', margin + colWidth + 2, yPos);
      doc.text('Trend', margin + colWidth * 2 + 2, yPos);
      
      yPos += 6;
      doc.setTextColor(0, 0, 0);
      
      kpiRows.forEach((row, idx) => {
        if (idx % 2 === 0) {
          doc.setFillColor(240, 240, 240);
          doc.rect(margin, yPos - 3, tableWidth, 5, 'F');
        }
        doc.setDrawColor(200, 200, 200);
        doc.rect(margin, yPos - 3, tableWidth, 5);
        doc.text(row[0], margin + 2, yPos);
        doc.text(row[1].toString(), margin + colWidth + 2, yPos);
        doc.text(row[2], margin + colWidth * 2 + 2, yPos);
        yPos += 6;
      });
      
      yPos += 6;
      
      // Top Locations
      doc.setFontSize(10);
      doc.setFont(undefined, 'bold');
      doc.text('TOP LOCATIONS IN MONTREAL', margin, yPos);
      yPos += 8;
      
      doc.setFontSize(7);
      doc.setFont(undefined, 'normal');
      const locColWidth = tableWidth / 5;
      doc.setFillColor(79, 70, 229);
      doc.setTextColor(255, 255, 255);
      doc.rect(margin, yPos - 3, tableWidth, 5, 'F');
      doc.text('#', margin + 2, yPos);
      doc.text('Area', margin + locColWidth + 2, yPos);
      doc.text('Postal', margin + locColWidth * 2 + 2, yPos);
      doc.text('City', margin + locColWidth * 3 + 2, yPos);
      doc.text('Count', margin + locColWidth * 4 + 2, yPos);
      
      yPos += 6;
      doc.setTextColor(0, 0, 0);
      
      topLocations.forEach((loc, idx) => {
        if (yPos > 270) {
          doc.addPage();
          yPos = 15;
        }
        if (idx % 2 === 0) {
          doc.setFillColor(240, 240, 240);
          doc.rect(margin, yPos - 3, tableWidth, 5, 'F');
        }
        doc.setDrawColor(200, 200, 200);
        doc.rect(margin, yPos - 3, tableWidth, 5);
        doc.text((idx + 1).toString(), margin + 2, yPos);
        doc.text(loc.area, margin + locColWidth + 2, yPos);
        doc.text(loc.postal, margin + locColWidth * 2 + 2, yPos);
        doc.text(loc.city, margin + locColWidth * 3 + 2, yPos);
        doc.text(loc.count.toString(), margin + locColWidth * 4 + 2, yPos);
        yPos += 6;
      });
      
      // ===== PAGE 2: CHART DATA =====
      doc.addPage();
      yPos = 15;
      
      doc.setFontSize(10);
      doc.setFont(undefined, 'bold');
      doc.text('CHART DATA - ALL TIMEFRAMES', margin, yPos);
      yPos += 10;
      
      doc.setFontSize(7);
      doc.setFont(undefined, 'normal');
      
      Object.keys(chartData).forEach(timeframe => {
        if (yPos > 260) {
          doc.addPage();
          yPos = 15;
        }
        
        doc.setFont(undefined, 'bold');
        doc.text(timeframe.toUpperCase(), margin, yPos);
        yPos += 6;
        doc.setFont(undefined, 'normal');
        
        const data = chartData[timeframe];
        if (data && data.length > 0) {
          const keys = Object.keys(data[0]);
          const keyColWidth = tableWidth / Math.min(keys.length, 4);
          
          // Header
          doc.setFillColor(79, 70, 229);
          doc.setTextColor(255, 255, 255);
          doc.rect(margin, yPos - 3, tableWidth, 5, 'F');
          keys.slice(0, 4).forEach((key, i) => {
            doc.text(key.substring(0, 10), margin + keyColWidth * i + 2, yPos);
          });
          
          yPos += 6;
          doc.setTextColor(0, 0, 0);
          
          // Data (show first 5 rows)
          data.slice(0, 5).forEach((row, idx) => {
            if (idx % 2 === 0) {
              doc.setFillColor(240, 240, 240);
              doc.rect(margin, yPos - 3, tableWidth, 5, 'F');
            }
            doc.setDrawColor(200, 200, 200);
            doc.rect(margin, yPos - 3, tableWidth, 5);
            keys.slice(0, 4).forEach((key, i) => {
              doc.text(row[key].toString().substring(0, 15), margin + keyColWidth * i + 2, yPos);
            });
            yPos += 6;
          });
          
          yPos += 4;
        }
      });
      
      // ===== PAGE 3: HEATMAP & SEARCH =====
      doc.addPage();
      yPos = 15;
      
      doc.setFontSize(10);
      doc.setFont(undefined, 'bold');
      doc.text('ACTIVITY HEATMAP - ALL METRICS', margin, yPos);
      yPos += 8;
      
      doc.setFontSize(7);
      doc.setFont(undefined, 'normal');
      
      // Show abbreviated heatmap for space
      ['all', 'calls', 'directions', 'clicks', 'views'].forEach(metric => {
        if (yPos > 265) {
          doc.addPage();
          yPos = 15;
        }
        
        doc.setFont(undefined, 'bold');
        doc.text(metric.toUpperCase() + ' - Peak Hours', margin, yPos);
        yPos += 6;
        doc.setFont(undefined, 'normal');
        
        const peakHours = ['12am', '6am', '12pm', '3pm', '6pm', '9pm'];
        const peakIndices = [0, 6, 12, 15, 18, 21];
        const colWidth = tableWidth / 7;
        
        doc.setFillColor(79, 70, 229);
        doc.setTextColor(255, 255, 255);
        doc.rect(margin, yPos - 3, tableWidth, 5, 'F');
        doc.text('Day', margin + 2, yPos);
        peakHours.forEach((hour, i) => {
          doc.text(hour, margin + colWidth * (i + 1) + 2, yPos);
        });
        
        yPos += 6;
        doc.setTextColor(0, 0, 0);
        
        ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].forEach((day, idx) => {
          if (idx % 2 === 0) {
            doc.setFillColor(240, 240, 240);
            doc.rect(margin, yPos - 3, tableWidth, 5, 'F');
          }
          doc.setDrawColor(200, 200, 200);
          doc.rect(margin, yPos - 3, tableWidth, 5);
          const dayData = heatmapData[metric][day];
          doc.text(day, margin + 2, yPos);
          peakIndices.forEach((hourIdx, i) => {
            doc.text(dayData[hourIdx].toString(), margin + colWidth * (i + 1) + 2, yPos);
          });
          yPos += 6;
        });
        
        yPos += 4;
      });
      
      yPos += 6;
      
      // Search Queries
      doc.setFontSize(10);
      doc.setFont(undefined, 'bold');
      doc.text('POPULAR SEARCH QUERIES', margin, yPos);
      yPos += 8;
      
      doc.setFontSize(7);
      doc.setFont(undefined, 'normal');
      searchQueries.slice(0, 10).forEach((query, idx) => {
        if (yPos > 270) {
          doc.addPage();
          yPos = 15;
        }
        doc.text(`${idx + 1}. ${query}`, margin + 5, yPos);
        yPos += 5;
      });
      
      // Save PDF
      doc.save(`visibility-report-${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (error) {
      console.error('Error exporting to PDF:', error);
      alert('Error exporting to PDF: ' + error.message);
    }
  };

  const handleExportReport = () => {
    // Heatmap data
    const heatmapData = {
      all: {
        'Mon': [5, 3, 2, 1, 2, 8, 25, 45, 78, 85, 82, 75, 70, 68, 72, 80, 88, 92, 85, 70, 45, 30, 15, 8],
        'Tue': [4, 2, 1, 1, 3, 10, 28, 48, 80, 88, 85, 78, 72, 70, 75, 82, 90, 95, 88, 72, 48, 32, 18, 10],
        'Wed': [6, 3, 2, 2, 4, 12, 30, 50, 82, 90, 88, 80, 75, 72, 78, 85, 92, 98, 90, 75, 50, 35, 20, 12],
        'Thu': [5, 3, 1, 1, 3, 10, 28, 48, 80, 88, 85, 78, 72, 70, 75, 82, 90, 95, 88, 72, 48, 32, 18, 10],
        'Fri': [7, 4, 2, 2, 5, 15, 35, 55, 85, 92, 90, 85, 80, 78, 82, 88, 95, 100, 95, 80, 60, 40, 25, 15],
        'Sat': [8, 5, 3, 2, 3, 8, 20, 40, 65, 75, 78, 80, 82, 85, 88, 90, 85, 80, 70, 55, 40, 28, 18, 12],
        'Sun': [6, 4, 2, 1, 2, 5, 15, 30, 50, 60, 65, 70, 72, 75, 78, 75, 70, 65, 55, 40, 25, 18, 12, 8]
      },
      calls: {
        'Mon': [2, 1, 0, 0, 1, 3, 15, 35, 68, 75, 72, 65, 60, 58, 62, 70, 78, 82, 75, 60, 35, 20, 8, 3],
        'Tue': [2, 1, 0, 0, 1, 5, 18, 38, 70, 78, 75, 68, 62, 60, 65, 72, 80, 85, 78, 62, 38, 22, 10, 5],
        'Wed': [3, 1, 0, 0, 2, 6, 20, 40, 72, 80, 78, 70, 65, 62, 68, 75, 82, 88, 80, 65, 40, 25, 12, 6],
        'Thu': [2, 1, 0, 0, 1, 5, 18, 38, 70, 78, 75, 68, 62, 60, 65, 72, 80, 85, 78, 62, 38, 22, 10, 5],
        'Fri': [3, 2, 0, 0, 2, 8, 25, 45, 75, 82, 80, 75, 70, 68, 72, 78, 85, 90, 85, 70, 50, 30, 15, 8],
        'Sat': [4, 2, 1, 0, 1, 3, 12, 30, 55, 65, 68, 70, 72, 75, 78, 80, 75, 70, 60, 45, 30, 18, 10, 6],
        'Sun': [3, 2, 0, 0, 1, 2, 8, 20, 40, 50, 55, 60, 62, 65, 68, 65, 60, 55, 45, 30, 15, 10, 6, 4]
      },
      directions: {
        'Mon': [1, 0, 0, 0, 0, 2, 8, 20, 45, 52, 50, 45, 42, 40, 44, 50, 56, 60, 52, 42, 25, 15, 5, 2],
        'Tue': [1, 0, 0, 0, 1, 3, 10, 22, 48, 55, 52, 48, 44, 42, 46, 52, 58, 62, 55, 44, 28, 16, 8, 3],
        'Wed': [2, 1, 0, 0, 1, 4, 12, 25, 50, 58, 55, 50, 46, 44, 48, 52, 60, 65, 58, 46, 30, 18, 10, 4],
        'Thu': [1, 0, 0, 0, 1, 3, 10, 22, 48, 55, 52, 48, 44, 42, 46, 52, 58, 62, 55, 44, 28, 16, 8, 3],
        'Fri': [2, 1, 0, 0, 2, 5, 15, 28, 52, 60, 58, 52, 48, 46, 50, 56, 62, 68, 62, 50, 35, 22, 12, 5],
        'Sat': [3, 2, 1, 0, 1, 2, 10, 22, 40, 48, 50, 52, 54, 56, 58, 58, 55, 52, 45, 35, 25, 15, 10, 5],
        'Sun': [2, 1, 0, 0, 0, 1, 6, 15, 30, 38, 40, 42, 44, 46, 48, 46, 42, 38, 32, 22, 12, 8, 5, 3]
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

    const exportData = {
      generatedAt: new Date().toLocaleString(),
      currentTimeframe: selectedTimeframe,
      currentMetric: selectedMetric || 'All Metrics',
      kpiData: getTimeframeKPIData(),
      allChartData: {
        daily: chartData.daily,
        weekly: chartData.weekly,
        monthly: chartData.monthly,
        yearly: chartData.yearly
      },
      heatmapData: heatmapData,
      topLocations: topLocations,
      searchQueries: searchQueries
    };

    // Export as Excel
    generateAndDownloadExcel(exportData);
  };

  const generateAndDownloadExcel = async (data) => {
    const XLSX = await import('xlsx');
    
    const workbook = XLSX.utils.book_new();
    
    // ===== SHEET 1: SUMMARY =====
    const summarySheet = [];
    summarySheet.push(['VISIBILITY REPORT']);
    summarySheet.push(['Generated:', data.generatedAt]);
    summarySheet.push(['Current Timeframe:', data.currentTimeframe]);
    summarySheet.push(['Current Metric:', data.currentMetric]);
    summarySheet.push([]);
    
    // KPI Summary
    summarySheet.push(['KPI SUMMARY']);
    summarySheet.push(['Metric', 'Value', 'Trend %', 'Direction', 'Remark']);
    
    const kpiRemarks = {
      impressions: data.kpiData.impressions.trend > 0 
        ? `Growing trend. Business visibility is improving.`
        : `Declining trend. Consider optimization strategies.`,
      calls: data.kpiData.calls.trend > 0
        ? `Strong growth in customer engagement.`
        : `Call volume decreased. Review routing and messaging.`,
      directions: data.kpiData.directions.trend > 0
        ? `Good location visibility improving.`
        : `Location needs promotion and visibility boost.`,
      websiteClicks: data.kpiData.websiteClicks.trend > 0
        ? `Website traffic is strong and growing.`
        : `Optimize web content and call-to-action.`,
      bookings: data.kpiData.bookings.trend > 0
        ? `Conversion trend is positive.`
        : `Improve booking experience and follow-up.`,
      messages: data.kpiData.messages.trend > 0
        ? `Customer messaging interest is high.`
        : `Improve messaging strategy and response time.`
    };

    summarySheet.push(['Impressions', data.kpiData.impressions.value, data.kpiData.impressions.trend, data.kpiData.impressions.trend > 0 ? '📈 Up' : '📉 Down', kpiRemarks.impressions]);
    summarySheet.push(['Calls', data.kpiData.calls.value, data.kpiData.calls.trend, data.kpiData.calls.trend > 0 ? '📈 Up' : '📉 Down', kpiRemarks.calls]);
    summarySheet.push(['Directions', data.kpiData.directions.value, data.kpiData.directions.trend, data.kpiData.directions.trend > 0 ? '📈 Up' : '📉 Down', kpiRemarks.directions]);
    summarySheet.push(['Website Clicks', data.kpiData.websiteClicks.value, data.kpiData.websiteClicks.trend, data.kpiData.websiteClicks.trend > 0 ? '📈 Up' : '📉 Down', kpiRemarks.websiteClicks]);
    summarySheet.push(['Bookings', data.kpiData.bookings.value, data.kpiData.bookings.trend, data.kpiData.bookings.trend > 0 ? '📈 Up' : '📉 Down', kpiRemarks.bookings]);
    summarySheet.push(['Messages', data.kpiData.messages.value, data.kpiData.messages.trend, data.kpiData.messages.trend > 0 ? '📈 Up' : '📉 Down', kpiRemarks.messages]);
    
    summarySheet.push([]);
    summarySheet.push(['TOP LOCATIONS']);
    summarySheet.push(['Rank', 'Area', 'Postal Code', 'City', 'Count', 'Trend', 'Remark']);
    
    data.topLocations.forEach((location, index) => {
      const trend = index < 3 ? '📈 Strong' : index < 6 ? '⚖️ Moderate' : '⚠️ Attention';
      const remark = index < 3 
        ? `High traffic. Maintain quality.`
        : index < 6
        ? `Good activity. Engage customers.`
        : `Lower activity. Target promotions.`;
      summarySheet.push([index + 1, location.area, location.postal, location.city, location.count, trend, remark]);
    });
    
    const summaryWS = XLSX.utils.aoa_to_sheet(summarySheet);
    summaryWS['!cols'] = [{wch: 10}, {wch: 18}, {wch: 13}, {wch: 12}, {wch: 10}, {wch: 12}, {wch: 25}];
    XLSX.utils.book_append_sheet(workbook, summaryWS, 'Summary');
    
    // ===== SHEET 2: CHART DATA =====
    const chartSheet = [];
    chartSheet.push(['CHART DATA - ALL TIMEFRAMES']);
    chartSheet.push([]);
    
    Object.keys(data.allChartData).forEach(timeframe => {
      chartSheet.push([timeframe.toUpperCase()]);
      const chartDataArray = data.allChartData[timeframe];
      if (chartDataArray && chartDataArray.length > 0) {
        const headers = Object.keys(chartDataArray[0]);
        chartSheet.push(headers);
        chartDataArray.forEach(row => {
          chartSheet.push(headers.map(h => row[h]));
        });
      }
      chartSheet.push([]);
    });
    
    const chartWS = XLSX.utils.aoa_to_sheet(chartSheet);
    chartWS['!cols'] = [{wch: 15}, {wch: 12}, {wch: 12}, {wch: 12}, {wch: 12}];
    XLSX.utils.book_append_sheet(workbook, chartWS, 'Chart Data');
    
    // ===== SHEET 3: HEATMAP =====
    const heatmapSheet = [['ACTIVITY HEATMAP DATA']];
    
    // Log to check if data exists
    console.log('Heatmap data exists:', !!data.heatmapData);
    console.log('Heatmap data:', data.heatmapData);
    
    if (data.heatmapData) {
      const hours = Array.from({length: 24}, (_, i) => {
        if (i === 0) return '12am';
        if (i < 12) return `${i}am`;
        if (i === 12) return '12pm';
        return `${i-12}pm`;
      });
      
      // Test ALL metric only first
      if (data.heatmapData.all) {
        heatmapSheet.push(['']);
        heatmapSheet.push(['ALL METRIC - 24 Hour Activity']);
        
        // Build header row
        const headerRow = ['Day'];
        for (let h = 0; h < hours.length; h++) {
          headerRow.push(hours[h]);
        }
        heatmapSheet.push(headerRow);
        
        // Build data rows
        const allData = data.heatmapData.all;
        for (const day of ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']) {
          const row = [day];
          const dayValues = allData[day];
          if (dayValues && Array.isArray(dayValues)) {
            for (let i = 0; i < dayValues.length; i++) {
              row.push(dayValues[i]);
            }
          }
          heatmapSheet.push(row);
        }
      }
    }
    
    const heatmapWS = XLSX.utils.aoa_to_sheet(heatmapSheet);
    heatmapWS['!cols'] = [{wch: 12}, ...Array(24).fill({wch: 5})];
    XLSX.utils.book_append_sheet(workbook, heatmapWS, 'Heatmap');
    
    // ===== SHEET 4: SEARCH QUERIES =====
    const querySheet = [];
    querySheet.push(['POPULAR SEARCH QUERIES']);
    querySheet.push(['Rank', 'Query']);
    
    data.searchQueries.forEach((query, index) => {
      querySheet.push([index + 1, query]);
    });
    
    const queryWS = XLSX.utils.aoa_to_sheet(querySheet);
    queryWS['!cols'] = [{wch: 8}, {wch: 40}];
    XLSX.utils.book_append_sheet(workbook, queryWS, 'Search Queries');
    
    // ===== SHEET 5: INSIGHTS =====
    const insightsSheet = [];
    insightsSheet.push(['ANALYSIS & INSIGHTS']);
    insightsSheet.push([]);
    insightsSheet.push(['KPI ANALYSIS']);
    insightsSheet.push(['Peak hours are typically in the afternoon (2-5 PM) when customer engagement is highest.']);
    insightsSheet.push(['Consider scheduling promotional activities and customer support during peak hours.']);
    insightsSheet.push(['Messages and calls show strong correlation with overall visibility metrics.']);
    insightsSheet.push([]);
    insightsSheet.push(['LOCATION ANALYSIS']);
    insightsSheet.push(['Downtown and Griffintown have the highest activity, indicating strong customer presence.']);
    insightsSheet.push(['Outer areas (Little Italy, Outremont) need targeted marketing to increase visibility.']);
    insightsSheet.push(['Consider location-specific promotions to boost lower-performing areas.']);
    insightsSheet.push([]);
    insightsSheet.push(['RECOMMENDATIONS']);
    insightsSheet.push(['1. Maximize visibility during peak hours (2-5 PM) with targeted ads.']);
    insightsSheet.push(['2. Increase messaging/chat support to capture high message volume.']);
    insightsSheet.push(['3. Invest in direction optimization to improve navigability.']);
    insightsSheet.push(['4. Develop location-based marketing for underperforming neighborhoods.']);
    insightsSheet.push(['5. Monitor trends weekly to catch issues early and capitalize on growth.']);
    
    const insightsWS = XLSX.utils.aoa_to_sheet(insightsSheet);
    insightsWS['!cols'] = [{wch: 80}];
    XLSX.utils.book_append_sheet(workbook, insightsWS, 'Insights');
    
    // Write file
    XLSX.writeFile(workbook, `visibility-report-${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const generateCSV = (data) => {
    let csv = 'Visibility Report\n';
    csv += `Generated: ${data.generatedAt}\n`;
    csv += `Current Timeframe: ${data.currentTimeframe}\n`;
    csv += `Current Metric: ${data.currentMetric}\n\n`;

    // KPI Data
    csv += 'KPI SUMMARY\n';
    csv += 'Metric,Value,Trend,Change,Peak Day,Low Day,Remark\n';
    
    const kpiRemarks = {
      impressions: data.kpiData.impressions.trend > 0 
        ? `Growing trend with ${data.kpiData.impressions.trend}% increase. Business visibility is improving.`
        : `Declining trend with ${data.kpiData.impressions.trend}% decrease. Consider optimization strategies.`,
      calls: data.kpiData.calls.trend > 0
        ? `Strong call volume growth of ${data.kpiData.calls.trend}%. Customer engagement is increasing.`
        : `Call volume decreased by ${Math.abs(data.kpiData.calls.trend)}%. Review call routing and messaging.`,
      directions: data.kpiData.directions.trend > 0
        ? `Direction requests up ${data.kpiData.directions.trend}%. Good location visibility.`
        : `Direction requests down ${Math.abs(data.kpiData.directions.trend)}%. Location needs promotion.`,
      websiteClicks: data.kpiData.websiteClicks.trend > 0
        ? `Website clicks increased ${data.kpiData.websiteClicks.trend}%. Traffic is strong.`
        : `Website clicks decreased ${Math.abs(data.kpiData.websiteClicks.trend)}%. Optimize web content.`,
      bookings: data.kpiData.bookings.trend > 0
        ? `Bookings trending up ${data.kpiData.bookings.trend}%. Conversion is good.`
        : `Bookings trending down. Improve booking experience.`,
      messages: data.kpiData.messages.trend > 0
        ? `Messages increased ${data.kpiData.messages.trend}%. Customer interest is high.`
        : `Messages decreased. Improve messaging strategy.`
    };

    csv += `Impressions,${data.kpiData.impressions.value},${data.kpiData.impressions.trend}%,${data.kpiData.impressions.trend > 0 ? '📈 Up' : '📉 Down'},${data.kpiData.impressions.peakDay},${data.kpiData.impressions.lowDay},"${kpiRemarks.impressions}"\n`;
    csv += `Calls,${data.kpiData.calls.value},${data.kpiData.calls.trend}%,${data.kpiData.calls.trend > 0 ? '📈 Up' : '📉 Down'},${data.kpiData.calls.peakDay},${data.kpiData.calls.lowDay},"${kpiRemarks.calls}"\n`;
    csv += `Directions,${data.kpiData.directions.value},${data.kpiData.directions.trend}%,${data.kpiData.directions.trend > 0 ? '📈 Up' : '📉 Down'},${data.kpiData.directions.peakDay},${data.kpiData.directions.lowDay},"${kpiRemarks.directions}"\n`;
    csv += `Website Clicks,${data.kpiData.websiteClicks.value},${data.kpiData.websiteClicks.trend}%,${data.kpiData.websiteClicks.trend > 0 ? '📈 Up' : '📉 Down'},${data.kpiData.websiteClicks.peakDay},${data.kpiData.websiteClicks.lowDay},"${kpiRemarks.websiteClicks}"\n`;
    csv += `Bookings,${data.kpiData.bookings.value},${data.kpiData.bookings.trend}%,${data.kpiData.bookings.trend > 0 ? '📈 Up' : '📉 Down'},"","${kpiRemarks.bookings}"\n`;
    csv += `Messages,${data.kpiData.messages.value},${data.kpiData.messages.trend}%,${data.kpiData.messages.trend > 0 ? '📈 Up' : '📉 Down'},"","${kpiRemarks.messages}"\n\n`;

    csv += 'KPI ANALYSIS\n';
    csv += 'Peak hours are typically in the afternoon (2-5 PM) when customer engagement is highest.\n';
    csv += 'Consider scheduling promotional activities and customer support during peak hours.\n\n';

    // Chart Data for all timeframes
    Object.keys(data.allChartData).forEach(timeframe => {
      csv += `${timeframe.toUpperCase()} CHART DATA\n`;
      const chartDataArray = data.allChartData[timeframe];
      if (chartDataArray.length > 0) {
        const headers = Object.keys(chartDataArray[0]);
        csv += headers.join(',') + '\n';
        chartDataArray.forEach(row => {
          csv += headers.map(h => row[h]).join(',') + '\n';
        });
      }
      csv += '\n';
    });

    // Heatmap Activity Data
    csv += 'ACTIVITY HEATMAP DATA (24-Hour Pattern by Day)\n';
    csv += 'Shows activity intensity (0-100) for each hour of each day\n';
    csv += 'HEATMAP INSIGHTS\n';
    csv += '- Higher numbers (50-100) indicate peak activity periods\n';
    csv += '- Lower numbers (0-25) indicate slow periods\n';
    csv += '- Use this to optimize staffing and service hours\n\n';
    
    const hours = Array.from({length: 24}, (_, i) => {
      if (i === 0) return '12am';
      if (i < 12) return `${i}am`;
      if (i === 12) return '12pm';
      return `${i-12}pm`;
    });
    
    // Export heatmap for all metrics
    ['all', 'calls', 'directions', 'clicks', 'views'].forEach(metric => {
      csv += `\n${metric.toUpperCase()} ACTIVITY HEATMAP\n`;
      csv += 'Day,' + hours.join(',') + '\n';
      const metricsData = data.heatmapData[metric];
      ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].forEach(day => {
        csv += day + ',' + metricsData[day].join(',') + '\n';
      });
    });
    csv += '\n';

    // Top Locations
    csv += 'TOP LOCATIONS IN MONTREAL\n';
    csv += 'Rank,Area,Postal Code,City,Activity Count,Growth Indicator,Remark\n';
    data.topLocations.forEach((location, index) => {
      const growthTrend = index < 3 ? '📈 Strong' : index < 6 ? '⚖️ Moderate' : '⚠️ Needs Attention';
      const remark = index < 3 
        ? `High traffic area. Maintain service quality and marketing efforts.`
        : index < 6
        ? `Good activity. Focus on consistent customer engagement.`
        : `Lower activity. Consider targeted promotions and outreach.`;
      csv += `${index + 1},${location.area},${location.postal},${location.city},${location.count},${growthTrend},"${remark}"\n`;
    });
    csv += '\n';

    csv += 'LOCATION ANALYSIS\n';
    csv += 'Downtown and Griffintown have the highest activity, indicating strong customer presence.\n';
    csv += 'Outer areas need targeted marketing to increase visibility and customer engagement.\n\n';

    // Search Queries
    csv += 'POPULAR SEARCH QUERIES\n';
    csv += 'Query\n';
    data.searchQueries.forEach(query => {
      csv += `${query}\n`;
    });
    csv += '\n';

    csv += 'SEARCH TRENDS ANALYSIS\n';
    csv += '"reviews management" and "business dashboard" are top searches - optimize content for these.\n';
    csv += 'Keywords like "customer feedback" and "reputation management" show growing interest.\n';
    csv += 'Focus SEO efforts on these high-volume search terms.\n\n';

    csv += 'OVERALL RECOMMENDATIONS\n';
    csv += '1. Optimize for peak hours to maximize conversion\n';
    csv += '2. Focus marketing efforts on high-performing areas\n';
    csv += '3. Improve weak areas with targeted campaigns\n';
    csv += '4. Monitor trends weekly for early issue detection\n';
    csv += '5. Leverage popular search keywords in content strategy\n';

    return csv;
  };

  const downloadCSV = (csv, filename) => {
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  const snapshotData = {
    impressions: { value: 12543, trend: 8.3, peakDay: 'Monday', lowDay: 'Sunday' },
    calls: { value: 234, trend: 12.5, peakDay: 'Tuesday', lowDay: 'Sunday' },
    directions: { value: 456, trend: -3.2, peakDay: 'Friday', lowDay: 'Monday' },
    websiteClicks: { value: 789, trend: 15.7, peakDay: 'Wednesday', lowDay: 'Saturday' },
    avgPerDay: { value: 1792, trend: 5.1 },
    bookings: { value: 67, trend: 22.4 },
    messages: { value: 143, trend: 9.8 }
  };

  // Calculate dynamic KPI data based on selected timeframe
  const getTimeframeKPIData = () => {
    const timeframeData = chartData[selectedTimeframe];
    let totalImpressions = 0, totalCalls = 0, totalDirections = 0, totalClicks = 0;
    
    if (timeframeData && timeframeData.length > 0) {
      timeframeData.forEach(item => {
        totalImpressions += item.impressions || 0;
        totalCalls += item.calls || 0;
        totalDirections += item.directions || 0;
        totalClicks += item.clicks || 0;
      });
    }

    return {
      impressions: { value: totalImpressions, trend: 8.3, peakDay: 'Monday', lowDay: 'Sunday' },
      calls: { value: totalCalls, trend: 12.5, peakDay: 'Tuesday', lowDay: 'Sunday' },
      directions: { value: totalDirections, trend: -3.2, peakDay: 'Friday', lowDay: 'Monday' },
      websiteClicks: { value: totalClicks, trend: 15.7, peakDay: 'Wednesday', lowDay: 'Saturday' },
      avgPerDay: { value: Math.round(totalImpressions / timeframeData.length), trend: 5.1 },
      bookings: { value: Math.round(totalCalls * 0.28), trend: 22.4 },
      messages: { value: Math.round(totalDirections * 0.3), trend: 9.8 }
    };
  };

  const chartData = {
    daily: [
      { label: '12 AM', impressions: 450, calls: 5, directions: 8, clicks: 15 },
      { label: '3 AM', impressions: 320, calls: 2, directions: 4, clicks: 8 },
      { label: '6 AM', impressions: 680, calls: 12, directions: 18, clicks: 25 },
      { label: '9 AM', impressions: 1200, calls: 28, directions: 35, clicks: 48 },
      { label: '12 PM', impressions: 1850, calls: 42, directions: 55, clicks: 72 },
      { label: '3 PM', impressions: 2100, calls: 38, directions: 48, clicks: 65 },
      { label: '6 PM', impressions: 1650, calls: 32, directions: 42, clicks: 58 },
      { label: '9 PM', impressions: 980, calls: 18, directions: 28, clicks: 38 }
    ],
    weekly: [
      { label: 'Mon', impressions: 2100, calls: 42, directions: 78, clicks: 125 },
      { label: 'Tue', impressions: 1850, calls: 38, directions: 65, clicks: 110 },
      { label: 'Wed', impressions: 2300, calls: 45, directions: 82, clicks: 135 },
      { label: 'Thu', impressions: 1950, calls: 40, directions: 70, clicks: 115 },
      { label: 'Fri', impressions: 2200, calls: 44, directions: 88, clicks: 130 },
      { label: 'Sat', impressions: 1400, calls: 25, directions: 52, clicks: 75 },
      { label: 'Sun', impressions: 950, calls: 20, directions: 45, clicks: 65 }
    ],
    monthly: [
      { label: 'Week 1', impressions: 8500, calls: 165, directions: 310, clicks: 485 },
      { label: 'Week 2', impressions: 9200, calls: 178, directions: 345, clicks: 520 },
      { label: 'Week 3', impressions: 8800, calls: 172, directions: 325, clicks: 495 },
      { label: 'Week 4', impressions: 9500, calls: 185, directions: 360, clicks: 545 }
    ],
    yearly: [
      { label: 'Jan', impressions: 35000, calls: 680, directions: 1250, clicks: 1950 },
      { label: 'Feb', impressions: 32000, calls: 620, directions: 1180, clicks: 1820 },
      { label: 'Mar', impressions: 38000, calls: 740, directions: 1380, clicks: 2150 },
      { label: 'Apr', impressions: 36500, calls: 710, directions: 1320, clicks: 2050 },
      { label: 'May', impressions: 39500, calls: 770, directions: 1420, clicks: 2220 },
      { label: 'Jun', impressions: 41000, calls: 800, directions: 1480, clicks: 2310 },
      { label: 'Jul', impressions: 37500, calls: 730, directions: 1350, clicks: 2100 },
      { label: 'Aug', impressions: 38500, calls: 750, directions: 1390, clicks: 2170 },
      { label: 'Sep', impressions: 40000, calls: 780, directions: 1440, clicks: 2250 },
      { label: 'Oct', impressions: 42000, calls: 820, directions: 1520, clicks: 2370 },
      { label: 'Nov', impressions: 39000, calls: 760, directions: 1410, clicks: 2200 },
      { label: 'Dec', impressions: 36000, calls: 700, directions: 1300, clicks: 2030 }
    ]
  };

  const miniChartData = chartData[selectedTimeframe];

  const searchQueries = [
    'reviews management', 'business dashboard', 'customer feedback',
    'analytics tool', 'review monitoring', 'reputation management',
    'local business', 'customer insights'
  ];

  const topLocations = [
    { area: 'Downtown', postal: 'H2X 1A1', city: 'Montreal', count: 234 },
    { area: 'Griffintown', postal: 'H3J 1Z2', city: 'Montreal', count: 189 },
    { area: 'Old Montreal', postal: 'H2Y 1T1', city: 'Montreal', count: 156 },
    { area: 'Plateau Mont-Royal', postal: 'H2W 1X2', city: 'Montreal', count: 143 },
    { area: 'Mile End', postal: 'H2X 1A5', city: 'Montreal', count: 128 },
    { area: 'Westmount', postal: 'H3Z 2R1', city: 'Montreal', count: 112 },
    { area: 'Laurier', postal: 'H2T 1S8', city: 'Montreal', count: 98 },
    { area: 'NDG', postal: 'H4A 3J2', city: 'Montreal', count: 87 },
    { area: 'Outremont', postal: 'H2V 2W5', city: 'Montreal', count: 76 },
    { area: 'Little Italy', postal: 'H2S 2B3', city: 'Montreal', count: 65 }
  ];

  const SnapshotTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900 text-white text-xs px-3 py-2 rounded shadow-lg">
          <p className="font-semibold mb-1">{payload[0].payload.label}</p>
          <p>{payload[0].value.toLocaleString()}</p>
        </div>
      );
    }
    return null;
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900 text-white text-xs px-3 py-2 rounded shadow-lg">
          <p className="font-semibold mb-1">{label}</p>
          <p>{payload[0].value.toLocaleString()}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen font-sans" style={{ backgroundColor: '#FAF9F5' }}>
      <div className="p-4 md:p-6 lg:p-10 pt-8 md:pt-20 max-w-7xl mx-auto">
        
        {/* KPI Overview Card and Activity Trends - Combined Section */}
        <div className="w-full rounded-xl border border-gray-200 p-4 md:p-6 shadow-sm mb-8">
          <div className="mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6">
            <div>
              <h1 className="text-base md:text-lg font-semibold text-gray-900 mb-2">
                Visibility & Activity
              </h1>
              <p className="text-xs md:text-sm text-gray-500 mt-0.5">
                Track how customers find and interact with your business
              </p>
            </div>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-3 w-full md:w-auto">
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => setSelectedMetric(null)}
                  className="px-2 md:px-3 py-1 md:py-1.5 text-xs md:text-sm font-bold text-green-700 hover:text-green-900 transition-all"
                >
                  Overall
                </button>
                {['daily', 'weekly', 'monthly', 'yearly'].map((timeframe) => (
                  <button
                    key={timeframe}
                    onClick={() => setSelectedTimeframe(timeframe)}
                    className={`px-2 md:px-4 py-1 md:py-2 text-xs md:text-sm font-semibold rounded-lg transition-all ${
                      selectedTimeframe === timeframe
                        ? 'bg-indigo-100 text-indigo-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}
                  </button>
                ))}
              </div>
              <div className="relative w-full md:w-auto">
                <button 
                  onClick={() => setShowExportMenu(!showExportMenu)}
                  className="flex items-center justify-center md:justify-start gap-2 w-full md:w-auto px-3 md:px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all shadow-md text-sm md:text-base">
                  <Download size={16} className="md:w-[18px] md:h-[18px]" />
                  <span>Export Report</span>
                </button>
                {showExportMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <button
                      onClick={() => {
                        handleExportCSV();
                        setShowExportMenu(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-800 flex items-center gap-2 border-b border-gray-100"
                    >
                      <span>📄</span> CSV File
                    </button>
                    <button
                      onClick={() => {
                        handleExportPDF();
                        setShowExportMenu(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-800 flex items-center gap-2 border-b border-gray-100"
                    >
                      <span>📕</span> PDF File
                    </button>
                    <button
                      onClick={() => {
                        handleExportReport();
                        setShowExportMenu(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-800 flex items-center gap-2"
                    >
                      <span>📊</span> Excel File
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-6">
            {/* KPI Overview Card - 40% on desktop, full on mobile */}
            <div className="w-full lg:w-[40%] lg:border-r border-gray-200 lg:pr-6">
              <KPIOverviewCard 
                visibilityData={getTimeframeKPIData()} 
                period={selectedTimeframe}
                selectedTimeframe={selectedTimeframe}
                onTimeframeChange={setSelectedTimeframe}
                onCardClick={setSelectedMetric}
                selectedMetric={selectedMetric}
                showTimeframeButtons={true}
              />
            </div>

            {/* Activity Trends Chart - 60% on desktop, full on mobile */}
            <div className="flex-1">
              <div className="h-64 md:h-72 lg:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={getChartData()} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis 
                      dataKey="label" 
                      stroke="#9ca3af" 
                      style={{ fontSize: '14px', fontWeight: 500 }}
                    />
                    <YAxis 
                      stroke="#9ca3af" 
                      style={{ fontSize: '12px' }}
                      width={40}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#ffffff', 
                        border: 'none', 
                        borderRadius: '8px',
                        color: '#1f2937',
                        padding: '8px 12px'
                      }}
                      formatter={(value) => value.toLocaleString()}
                      cursor={{ stroke: '#e5e7eb', strokeWidth: 1 }}
                    />
                    
                    {!selectedMetric ? (
                      <>
                        {/* Show all metrics when no metric is selected - excluding impressions */}
                        {
                          <Line 
                            type="monotone" 
                            dataKey="calls" 
                            stroke="#d97706" 
                            strokeWidth={3}
                            dot={{ fill: '#fff', stroke: '#d97706', strokeWidth: 1, r: 4 }}
                            activeDot={{ r: 5 }}
                            name="Calls"
                          />
                        }
                        {
                          <Line 
                            type="monotone" 
                            dataKey="directions" 
                            stroke="#16a34a" 
                            strokeWidth={3}
                            dot={{ fill: '#fff', stroke: '#16a34a', strokeWidth: 1, r: 4 }}
                            activeDot={{ r: 5 }}
                            name="Directions"
                          />
                        }
                        {
                          <Line 
                            type="monotone" 
                            dataKey="clicks" 
                            stroke="#dc2626" 
                            strokeWidth={3}
                            dot={{ fill: '#fff', stroke: '#dc2626', strokeWidth: 1, r: 4 }}
                            activeDot={{ r: 5 }}
                            name="Clicks"
                          />
                        }
                      </>
                    ) : (
                      <>
                        {/* Show comparison lines when a metric is selected */}
                        {/* Current period - darkest and thickest */}
                        <Line 
                          type="monotone" 
                          dataKey={`${selectedMetric}_current`} 
                          stroke={selectedMetric === 'calls' ? '#d97706' : selectedMetric === 'directions' ? '#16a34a' : selectedMetric === 'clicks' ? '#dc2626' : '#2563eb'} 
                          strokeWidth={3}
                          dot={{ fill: '#fff', stroke: selectedMetric === 'calls' ? '#d97706' : selectedMetric === 'directions' ? '#16a34a' : selectedMetric === 'clicks' ? '#dc2626' : '#2563eb', strokeWidth: 1, r: 4 }}
                          activeDot={{ r: 5 }}
                          name={`${selectedMetric.charAt(0).toUpperCase() + selectedMetric.slice(1)} - Current`}
                        />
                        {/* Previous period 1 - medium grey */}
                        <Line 
                          type="monotone" 
                          dataKey={`${selectedMetric}_prev1`} 
                          stroke="#cbd5e1"
                          strokeWidth={3}
                          dot={{ fill: '#fff', stroke: '#cbd5e1', strokeWidth: 1, r: 4 }}
                          activeDot={{ r: 5 }}
                          name={`${selectedMetric.charAt(0).toUpperCase() + selectedMetric.slice(1)} - Last Period`}
                        />
                      </>
                    )}
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="flex items-center justify-center gap-4 md:gap-6 mt-4 md:mt-6 pt-4 md:pt-4 border-t border-gray-200 flex-wrap text-xs md:text-sm">
                {!selectedMetric ? (
                  <>
                    <div className="flex items-center gap-2">
                      <div className="w-2 md:w-3 h-2 md:h-3 rounded-full" style={{ backgroundColor: '#d97706' }}></div>
                      <span className="font-medium text-gray-700">Calls</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 md:w-3 h-2 md:h-3 rounded-full" style={{ backgroundColor: '#16a34a' }}></div>
                      <span className="font-medium text-gray-700">Directions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 md:w-3 h-2 md:h-3 rounded-full" style={{ backgroundColor: '#dc2626' }}></div>
                      <span className="font-medium text-gray-700">Clicks</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-2">
                      <div className="w-2 md:w-3 h-2 md:h-3 rounded-full" style={{ backgroundColor: selectedMetric === 'calls' ? '#d97706' : selectedMetric === 'directions' ? '#16a34a' : selectedMetric === 'clicks' ? '#dc2626' : '#2563eb' }}></div>
                      <span className="font-medium text-gray-700">Current</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 md:w-3 h-2 md:h-3 bg-slate-300 rounded-full"></div>
                      <span className="font-medium text-gray-700">Last Period</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Activity Heatmap and Top Locations Row */}
        <div className="flex flex-col lg:flex-row gap-3 mb-6">
          {/* Activity Heatmap - flex-1 */}
          <div className="flex-1">
            <ActivityHeatmap />
          </div>

          {/* Top Locations - 30% on desktop, full on mobile */}
          <div className="w-full lg:w-[30%] rounded-xl border border-gray-200 p-4 md:p-6 shadow-sm flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="text-red-600 w-4 md:w-[18px] md:h-[18px]" size={18} />
              <h3 className="text-base md:text-lg font-bold text-gray-900">Top Locations</h3>
            </div>
            <div className="flex-1 flex flex-col justify-between gap-2">
              {topLocations.map((location, index) => (
                <div key={index} className="flex items-center justify-between p-1 bg-gray-50 rounded hover:bg-gray-200 transition-colors">
                  <div className="flex items-center gap-1 flex-1 min-w-0">
                    <div className="w-4 h-4 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-semibold text-indigo-600 flex-shrink-0 text-center leading-none">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-xs md:text-sm text-gray-900 font-bold block truncate leading-tight">{location.area}, {location.postal}</span>
                      <p className="text-xs text-gray-500 leading-none">{location.city}</p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0 ml-1">
                    <p className="text-xs font-bold text-gray-900 leading-tight">{location.count}</p>
                    <p className="text-xs text-gray-600 font-medium leading-none">activity</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Info Panel */}
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border border-indigo-200 p-6 shadow-sm">
          <div className="flex items-start gap-3">
            <Info className="text-indigo-600 flex-shrink-0 mt-1" size={20} />
            <div>
              <h4 className="font-bold text-gray-900 mb-2">Understanding Your Metrics</h4>
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                <div>
                  <strong>Impressions:</strong> Number of times your business appeared in search results or maps
                </div>
                <div>
                  <strong>Calls:</strong> Total phone calls initiated from your business listing
                </div>
                <div>
                  <strong>Directions:</strong> Number of times users requested directions to your location
                </div>
                <div>
                  <strong>Website Clicks:</strong> Clicks on your website link from your business profile
                </div>
                <div>
                  <strong>Bookings:</strong> Appointments or reservations made through your listing
                </div>
                <div>
                  <strong>Messages:</strong> Direct messages sent to your business
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
