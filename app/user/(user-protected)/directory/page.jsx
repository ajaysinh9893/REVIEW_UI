'use client';

import { useState, useEffect } from 'react';
import { Users, Plus, Search, Edit2, Trash2, X, Mail, Phone, MapPin, Building, Tag, Star, Filter, Download, Upload, MoreVertical, Calendar, Globe, Check, ChevronDown } from 'lucide-react';

export default function ContactsDirectory() {
  const [scrollY, setScrollY] = useState(0);
  const fadeDistance = 80; // Smaller fade distance
  const fadeOpacity = Math.max(0, 1 - scrollY / fadeDistance);
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@example.com',
      phone: '+1 (555) 123-4567',
      company: 'Tech Solutions Inc',
      position: 'Marketing Director',
      location: 'New York, NY',
      tags: ['Client', 'VIP'],
      notes: 'Key decision maker for annual contracts',
      favorite: true,
      addedDate: '2024-01-15'
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'michael.chen@startup.io',
      phone: '+1 (555) 234-5678',
      company: 'StartupHub',
      position: 'CEO',
      location: 'San Francisco, CA',
      tags: ['Partner', 'Investor'],
      notes: 'Interested in collaboration opportunities',
      favorite: false,
      addedDate: '2024-02-20'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      email: 'emily.r@designco.com',
      phone: '+1 (555) 345-6789',
      company: 'DesignCo',
      position: 'Creative Director',
      location: 'Austin, TX',
      tags: ['Vendor', 'Designer'],
      notes: 'Handles all our branding projects',
      favorite: true,
      addedDate: '2024-01-28'
    },
    {
      id: 4,
      name: 'James Wilson',
      email: 'j.wilson@consulting.com',
      phone: '+1 (555) 456-7890',
      company: 'Wilson Consulting',
      position: 'Business Consultant',
      location: 'Chicago, IL',
      tags: ['Consultant'],
      notes: 'Quarterly strategy sessions',
      favorite: false,
      addedDate: '2024-03-05'
    },
    {
      id: 5,
      name: 'Lisa Anderson',
      email: 'lisa@mediagroup.net',
      phone: '+1 (555) 567-8901',
      company: 'Media Group LLC',
      position: 'Account Manager',
      location: 'Los Angeles, CA',
      tags: ['Client', 'Media'],
      notes: 'Manages our advertising campaigns',
      favorite: false,
      addedDate: '2024-02-10'
    },
    {
      id: 6,
      name: 'David Kim',
      email: 'david.kim@techventures.com',
      phone: '+1 (555) 678-9012',
      company: 'Tech Ventures',
      position: 'Product Manager',
      location: 'Seattle, WA',
      tags: ['Partner', 'Tech'],
      notes: 'Potential partnership for Q3',
      favorite: true,
      addedDate: '2024-01-18'
    },
    {
      id: 7,
      name: 'Jennifer Martinez',
      email: 'jen.martinez@innovate.co',
      phone: '+1 (555) 789-0123',
      company: 'Innovate Labs',
      position: 'VP Engineering',
      location: 'Boston, MA',
      tags: ['Tech', 'Partner'],
      notes: 'Leading development initiatives',
      favorite: false,
      addedDate: '2024-02-15'
    },
    {
      id: 8,
      name: 'Robert Thompson',
      email: 'r.thompson@finance.net',
      phone: '+1 (555) 890-1234',
      company: 'Finance Plus',
      position: 'CFO',
      location: 'New York, NY',
      tags: ['Finance', 'Client'],
      notes: 'Annual budget reviews',
      favorite: true,
      addedDate: '2024-01-22'
    },
    {
      id: 9,
      name: 'Alexandra Brown',
      email: 'alex.brown@marketing.io',
      phone: '+1 (555) 901-2345',
      company: 'Marketing Pro',
      position: 'Campaign Manager',
      location: 'Miami, FL',
      tags: ['Marketing', 'Vendor'],
      notes: 'Social media strategy expert',
      favorite: false,
      addedDate: '2024-03-01'
    },
    {
      id: 10,
      name: 'Christopher Lee',
      email: 'c.lee@sales.com',
      phone: '+1 (555) 012-3456',
      company: 'Sales Force Inc',
      position: 'Sales Director',
      location: 'Dallas, TX',
      tags: ['Sales', 'VIP'],
      notes: 'Top performing sales leader',
      favorite: false,
      addedDate: '2024-02-28'
    },
    {
      id: 11,
      name: 'Patricia Gray',
      email: 'pat.gray@operations.net',
      phone: '+1 (555) 123-4567',
      company: 'Operations Hub',
      position: 'Operations Manager',
      location: 'Denver, CO',
      tags: ['Operations', 'Partner'],
      notes: 'Efficient process optimization',
      favorite: false,
      addedDate: '2024-03-10'
    },
    {
      id: 12,
      name: 'Daniel Jackson',
      email: 'daniel.j@solutions.io',
      phone: '+1 (555) 234-5678',
      company: 'Solution Experts',
      position: 'Consultant',
      location: 'Atlanta, GA',
      tags: ['Consultant', 'Tech'],
      notes: 'Enterprise solutions specialist',
      favorite: true,
      addedDate: '2024-01-30'
    },
    {
      id: 13,
      name: 'Michelle White',
      email: 'michelle.w@growth.com',
      phone: '+1 (555) 345-6789',
      company: 'Growth Strategies',
      position: 'Growth Lead',
      location: 'Portland, OR',
      tags: ['Growth', 'Client'],
      notes: 'Scaling operations expert',
      favorite: false,
      addedDate: '2024-02-05'
    },
    {
      id: 14,
      name: 'Steven Harris',
      email: 'steven.h@tech.io',
      phone: '+1 (555) 456-7890',
      company: 'Tech Innovations',
      position: 'CTO',
      location: 'San Jose, CA',
      tags: ['Tech', 'Partner', 'VIP'],
      notes: 'Leading edge technology expert',
      favorite: true,
      addedDate: '2024-01-12'
    },
    {
      id: 15,
      name: 'Rebecca Scott',
      email: 'rebecca.s@agency.net',
      phone: '+1 (555) 567-8901',
      company: 'Digital Agency Plus',
      position: 'Creative Lead',
      location: 'Nashville, TN',
      tags: ['Agency', 'Design'],
      notes: 'Award-winning creative director',
      favorite: false,
      addedDate: '2024-02-22'
    },
    {
      id: 16,
      name: 'Kevin Lopez',
      email: 'kevin.l@consulting.com',
      phone: '+1 (555) 678-9012',
      company: 'Business Consulting Group',
      position: 'Senior Consultant',
      location: 'Phoenix, AZ',
      tags: ['Consultant'],
      notes: 'Strategy and planning expert',
      favorite: false,
      addedDate: '2024-03-08'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [selectedContact, setSelectedContact] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [expandedContactId, setExpandedContactId] = useState(null);
  const [deleteConfirmContactId, setDeleteConfirmContactId] = useState(null);

  // Scroll effect
  // Scroll fade effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showModal]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    position: '',
    location: '',
    tags: [],
    notes: '',
    favorite: false
  });

  // Get all unique tags
  const allTags = ['All', ...new Set(contacts.flatMap(c => c.tags))];

  // Close all menus function
  const closeAllMenus = () => {
    setShowFilters(false);
    setShowExportMenu(false);
  };

  // Filter contacts
  const filteredContacts = contacts.filter(contact => {
    const searchLower = searchQuery.toLowerCase();
    
    const matchesWordStart = (text) => {
      if (!searchLower) return true;
      const words = text.toLowerCase().split(/\s+/);
      return words.some(word => word.startsWith(searchLower));
    };
    
    const matchesSearch = matchesWordStart(contact.name) ||
                         matchesWordStart(contact.email) ||
                         matchesWordStart(contact.company);
    const matchesTag = selectedTag === 'All' || contact.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const handleAddContact = () => {
    setModalMode('add');
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      position: '',
      location: '',
      tags: [],
      notes: '',
      favorite: false
    });
    setShowModal(true);
  };

  const handleEditContact = (contact) => {
    closeAllMenus();
    setModalMode('edit');
    setSelectedContact(contact);
    setFormData(contact);
    setShowModal(true);
  };

  const handleDeleteContact = (id) => {
    closeAllMenus();
    if (confirm('Are you sure you want to delete this contact?')) {
      setContacts(contacts.filter(c => c.id !== id));
    }
  };

  const handleSaveContact = () => {
    if (modalMode === 'add') {
      const newContact = {
        ...formData,
        id: Math.max(...contacts.map(c => c.id)) + 1,
        addedDate: new Date().toISOString().split('T')[0]
      };
      setContacts([...contacts, newContact]);
    } else {
      setContacts(contacts.map(c => c.id === selectedContact.id ? { ...formData, id: c.id } : c));
    }
    setShowModal(false);
  };

  const toggleFavorite = (id) => {
    setContacts(contacts.map(c => c.id === id ? { ...c, favorite: !c.favorite } : c));
  };

  const handleTagInput = (e) => {
    if (e.key === 'Enter' && e.target.value.trim()) {
      e.preventDefault();
      const newTag = e.target.value.trim();
      if (!formData.tags.includes(newTag)) {
        setFormData({ ...formData, tags: [...formData.tags, newTag] });
      }
      e.target.value = '';
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData({ ...formData, tags: formData.tags.filter(t => t !== tagToRemove) });
  };

  const handleExportCSV = () => {
    let csvContent = 'data:text/csv;charset=utf-8,';
    
    // Add headers
    csvContent += 'Contact Directory Export\n';
    csvContent += `Generated: ${new Date().toLocaleString()}\n\n`;
    
    // Add table headers
    csvContent += 'Name,Email,Phone,Company,Position,Location,Tags,Added Date\n';
    
    // Add contact data rows
    filteredContacts.forEach(contact => {
      const tags = contact.tags.join('; ');
      csvContent += `"${contact.name}","${contact.email}","${contact.phone}","${contact.company}","${contact.position}","${contact.location}","${tags}","${contact.addedDate}"\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `contacts_${new Date().getTime()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportPDF = async () => {
    try {
      const { jsPDF } = await import('jspdf');
      const doc = new jsPDF();
      
      let yPos = 15;
      const margin = 10;
      const lineHeight = 7;
      
      // Title
      doc.setFontSize(16);
      doc.text('Contact Directory', margin, yPos);
      yPos += 12;
      
      // Report Info
      doc.setFontSize(9);
      doc.text(`Generated: ${new Date().toLocaleString()}`, margin, yPos);
      yPos += lineHeight;
      doc.text(`Total Contacts: ${filteredContacts.length}`, margin, yPos);
      yPos += 12;
      
      // Contacts Section
      doc.setFontSize(11);
      doc.setFont(undefined, 'bold');
      doc.text('CONTACTS', margin, yPos);
      yPos += 10;
      
      doc.setFontSize(8);
      doc.setFont(undefined, 'normal');
      const contactRows = filteredContacts.map(contact => [
        contact.name,
        contact.email,
        contact.phone,
        contact.company,
        contact.position,
        contact.location
      ]);
      
      // Draw contacts table
      const tableWidth = 180;
      const colWidth = tableWidth / 6;
      doc.setFillColor(79, 70, 229);
      doc.setTextColor(255, 255, 255);
      doc.rect(margin, yPos - 5, tableWidth, 6, 'F');
      doc.text('Name', margin + 2, yPos);
      doc.text('Email', margin + colWidth + 2, yPos);
      doc.text('Phone', margin + colWidth * 2 + 2, yPos);
      doc.text('Company', margin + colWidth * 3 + 2, yPos);
      doc.text('Position', margin + colWidth * 4 + 2, yPos);
      doc.text('Location', margin + colWidth * 5 + 2, yPos);
      
      yPos += 8;
      doc.setTextColor(0, 0, 0);
      
      contactRows.forEach((row, idx) => {
        // Check if we need a new page
        if (yPos > 250) {
          doc.addPage();
          yPos = 15;
        }
        
        if (idx % 2 === 0) {
          doc.setFillColor(240, 240, 240);
          doc.rect(margin, yPos - 5, tableWidth, 6, 'F');
        }
        doc.setDrawColor(200, 200, 200);
        doc.rect(margin, yPos - 5, tableWidth, 6);
        doc.setFont(undefined, 'normal');
        doc.setFontSize(7);
        doc.text(row[0].substring(0, 15), margin + 2, yPos);
        doc.text(row[1].substring(0, 15), margin + colWidth + 2, yPos);
        doc.text(row[2].substring(0, 13), margin + colWidth * 2 + 2, yPos);
        doc.text(row[3].substring(0, 15), margin + colWidth * 3 + 2, yPos);
        doc.text(row[4].substring(0, 12), margin + colWidth * 4 + 2, yPos);
        doc.text(row[5].substring(0, 15), margin + colWidth * 5 + 2, yPos);
        yPos += 8;
      });
      
      // Save PDF
      doc.save(`contacts-${new Date().getTime()}.pdf`);
    } catch (error) {
      console.error('Error exporting to PDF:', error);
      alert('Error exporting to PDF: ' + error.message);
    }
  };

  const handleExportExcel = async () => {
    try {
      const XLSX = await import('xlsx');
      
      // Create workbook
      const wb = XLSX.utils.book_new();
      
      // Summary sheet
      const summaryData = [
        ['Contact Directory Summary'],
        ['Generated', new Date().toLocaleString()],
        ['Total Contacts', filteredContacts.length],
        ['Favorite Contacts', filteredContacts.filter(c => c.favorite).length],
        ['Total Companies', new Set(filteredContacts.map(c => c.company)).size],
        ['Total Categories', new Set(filteredContacts.flatMap(c => c.tags)).size],
      ];
      
      const summarySheet = XLSX.utils.aoa_to_sheet(summaryData);
      summarySheet['!cols'] = [{ wch: 25 }, { wch: 40 }];
      XLSX.utils.book_append_sheet(wb, summarySheet, 'Summary');
      
      // Contacts sheet
      const contactsData = [
        ['Name', 'Email', 'Phone', 'Company', 'Position', 'Location', 'Tags', 'Added Date', 'Favorite'],
        ...filteredContacts.map(contact => [
          contact.name,
          contact.email,
          contact.phone,
          contact.company,
          contact.position,
          contact.location,
          contact.tags.join('; '),
          contact.addedDate,
          contact.favorite ? 'Yes' : 'No'
        ])
      ];
      
      const contactsSheet = XLSX.utils.aoa_to_sheet(contactsData);
      contactsSheet['!cols'] = [
        { wch: 18 },
        { wch: 25 },
        { wch: 18 },
        { wch: 20 },
        { wch: 20 },
        { wch: 20 },
        { wch: 25 },
        { wch: 15 },
        { wch: 12 }
      ];
      XLSX.utils.book_append_sheet(wb, contactsSheet, 'Contacts');
      
      // Save the workbook
      XLSX.writeFile(wb, `contacts-${new Date().getTime()}.xlsx`);
    } catch (error) {
      console.error('Error exporting to Excel:', error);
      alert('Error exporting to Excel: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen font-sans overflow-y-scroll" style={{ backgroundColor: '#FAF9F5' }}>
      <div className="p-4 md:p-6 lg:p-10 md:pt-8 lg:pt-20 max-w-7xl mx-auto lg:pr-24">
        {/* Sticky Header Section */}
        <div className="sticky top-0 bg-[#FAF9F5] z-30 pb-4 md:pb-6 space-y-4 md:space-y-6">
          {/* Add Contact Button - Desktop Only */}
          <div className="hidden md:block mb-4 md:mb-6">
            <button
              onClick={handleAddContact}
              className="w-full md:w-auto flex items-center justify-center md:justify-start gap-2 bg-indigo-600 text-white px-4 md:px-6 py-2.5 rounded-lg hover:bg-indigo-700 transition-all shadow-sm hover:shadow-md font-medium text-sm md:text-base"
            >
              <Plus size={20} />
              Add Contact
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-6">
            <div className="rounded-lg md:rounded-xl border border-gray-200 p-3 md:p-5">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="text-xs md:text-sm text-gray-600 mb-1">Total Contacts</p>
                  <p className="text-xl md:text-2xl font-bold text-gray-900">{contacts.length}</p>
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="text-indigo-600" size={20} />
                </div>
              </div>
            </div>

            <div className="rounded-lg md:rounded-xl border border-gray-200 p-3 md:p-5">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="text-xs md:text-sm text-gray-600 mb-1">Favorites</p>
                  <p className="text-xl md:text-2xl font-bold text-gray-900">{contacts.filter(c => c.favorite).length}</p>
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Star className="text-amber-600" size={20} />
                </div>
              </div>
            </div>

            <div className="rounded-lg md:rounded-xl border border-gray-200 p-3 md:p-5">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="text-xs md:text-sm text-gray-600 mb-1">Companies</p>
                  <p className="text-xl md:text-2xl font-bold text-gray-900">{new Set(contacts.map(c => c.company)).size}</p>
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Building className="text-green-600" size={20} />
                </div>
              </div>
            </div>

            <div className="rounded-lg md:rounded-xl border border-gray-200 p-3 md:p-5">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="text-xs md:text-sm text-gray-600 mb-1">Categories</p>
                  <p className="text-xl md:text-2xl font-bold text-gray-900">{allTags.length - 1}</p>
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Tag className="text-purple-600" size={20} />
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filter Bar */}
          <div className="rounded-lg md:rounded-xl border border-gray-200 p-3 md:p-4 mb-4 md:mb-6">
            {/* Mobile: Search with inline icons */}
            <div className="md:hidden flex items-center gap-2">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 flex-shrink-0" size={16} />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onFocus={() => {
                    closeAllMenus();
                    setExpandedContactId(null);
                  }}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    closeAllMenus();
                    setExpandedContactId(null);
                  }}
                  className="w-full pl-9 pr-2 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              {/* Add Contact Icon Button */}
              <button
                onClick={handleAddContact}
                className="p-2 bg-indigo-600 text-white border border-indigo-600 rounded-lg hover:bg-indigo-700 transition-all flex-shrink-0"
                title="Add Contact"
              >
                <Plus size={16} />
              </button>

              {/* Filter Icon Button */}
              <button
                onClick={() => {
                  setShowExportMenu(false);
                  setShowFilters(!showFilters);
                }}
                className={`p-2 border border-gray-300 rounded-lg transition-all flex-shrink-0 ${
                  showFilters 
                    ? 'bg-gray-200 text-gray-900 shadow-inset scale-95' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                style={showFilters ? { boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)' } : {}}
                title="Filter"
              >
                <Filter size={16} />
              </button>

              {/* Export Dropdown Icon */}
              <div className="relative flex-shrink-0">
                <button 
                  onClick={() => {
                    setShowFilters(false);
                    setShowExportMenu(!showExportMenu);
                  }}
                  className={`p-2 border border-gray-300 rounded-lg transition-all ${
                    showExportMenu 
                      ? 'bg-gray-200 text-gray-900 shadow-inset scale-95' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  style={showExportMenu ? { boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)' } : {}}
                  title="Export"
                >
                  <Download size={16} />
                </button>
                
                {showExportMenu && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded-lg shadow-lg z-[9999]">
                    <button
                      onClick={() => {
                        handleExportCSV();
                        setShowExportMenu(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 border-b border-gray-200 transition-all"
                    >
                      📄 CSV
                    </button>
                    <button
                      onClick={() => {
                        handleExportPDF();
                        setShowExportMenu(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 border-b border-gray-200 transition-all"
                    >
                      📕 PDF
                    </button>
                    <button
                      onClick={() => {
                        handleExportExcel();
                        setShowExportMenu(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-all rounded-b-lg"
                    >
                      📊 Excel
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Desktop: Full search bar with labels */}
            <div className="hidden md:flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 flex-shrink-0" size={18} />
                <input
                  type="text"
                  placeholder="Search contacts..."
                  value={searchQuery}
                  onFocus={() => {
                    closeAllMenus();
                    setExpandedContactId(null);
                  }}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    closeAllMenus();
                    setExpandedContactId(null);
                  }}
                  className="w-full pl-10 pr-3 md:pr-4 py-2 md:py-2.5 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              {/* Filter Button */}
              <button
                onClick={() => {
                  setShowExportMenu(false);
                  setShowFilters(!showFilters);
                }}
                className={`w-full md:w-auto flex items-center justify-center gap-2 px-3 md:px-4 py-2 md:py-2.5 text-sm md:text-base border border-gray-300 rounded-lg transition-all whitespace-nowrap ${
                  showFilters 
                    ? 'bg-gray-200 text-gray-900 shadow-inset scale-95' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                style={showFilters ? { boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)' } : {}}
              >
                <Filter size={18} />
                Filters
              </button>

              {/* Export Button */}
              <div className="relative flex-1 md:flex-none">
                <button 
                  onClick={() => {
                    setShowFilters(false);
                    setShowExportMenu(!showExportMenu);
                  }}
                  className={`w-full md:w-auto flex items-center justify-center gap-1 md:gap-2 px-3 md:px-4 py-2 md:py-2.5 text-xs md:text-sm font-medium border border-gray-300 rounded-lg transition-all whitespace-nowrap ${
                    showExportMenu 
                      ? 'bg-gray-200 text-gray-900 shadow-inset scale-95' 
                      : 'text-gray-700 bg-white hover:bg-gray-50'
                  }`}
                  style={showExportMenu ? { boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)' } : {}}
                >
                  <Download size={16} className="md:w-5 md:h-5 flex-shrink-0" />
                  <span className="hidden md:inline">Export</span>
                  <ChevronDown size={14} className={`md:w-4 md:h-4 transition-transform ${showExportMenu ? 'rotate-180' : ''}`} />
                </button>
                
                {showExportMenu && (
                  <div className="absolute left-0 md:right-0 mt-2 w-full md:w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-[9999]">
                    <button
                      onClick={() => {
                        handleExportCSV();
                        setShowExportMenu(false);
                      }}
                      className="w-full text-left px-4 py-2.5 md:py-3 text-xs md:text-sm font-medium text-gray-700 hover:bg-gray-50 border-b border-gray-200 transition-all"
                    >
                      📄 CSV
                    </button>
                    <button
                      onClick={() => {
                        handleExportPDF();
                        setShowExportMenu(false);
                      }}
                      className="w-full text-left px-4 py-2.5 md:py-3 text-xs md:text-sm font-medium text-gray-700 hover:bg-gray-50 border-b border-gray-200 transition-all"
                    >
                      📕 PDF
                    </button>
                    <button
                      onClick={() => {
                        handleExportExcel();
                        setShowExportMenu(false);
                      }}
                      className="w-full text-left px-4 py-2.5 md:py-3 text-xs md:text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all rounded-b-lg"
                    >
                      📊 Excel
                    </button>
                  </div>
                )}
              </div>

              {/* View Toggle - Desktop Only */}
              <div className="hidden md:flex gap-1 bg-gray-100 p-1 rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-gray-200' : 'hover:bg-gray-200'}`}
                >
                  <MoreVertical size={18} className="rotate-90" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-gray-200' : 'hover:bg-gray-200'}`}
                >
                  <MoreVertical size={18} />
                </button>
              </div>
            </div>

            {/* Tag Filters */}
            {showFilters && (
            <div className="mt-3 md:mt-4 p-3 md:p-4 bg-indigo-50 border-t border-indigo-200 rounded-lg">
              <p className="text-xs md:text-sm font-medium text-indigo-900 mb-2 md:mb-3">Filter by Category:</p>
              <div className="flex flex-wrap gap-2">
                {allTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => {
                      closeAllMenus();
                      setSelectedTag(tag);
                    }}
                    className={`px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-all ${
                      selectedTag === tag
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
            )}
          </div>
        </div>

        {/* Contacts Grid/List */}
        {viewMode === 'grid' ? (
          <>
              {/* Mobile List View - Simple Collapsed, Expandable */}
              <div className={`md:hidden space-y-2 ${filteredContacts.length > 6 ? 'overflow-y-auto md:overflow-visible max-h-[calc(100vh-350px)]' : ''}`}>
                {filteredContacts.map(contact => (
                  <div key={contact.id} className="border border-gray-200 rounded-lg overflow-hidden bg-white">
                    {/* Collapsed View - List with Action Icons */}
                    <div className="flex items-center justify-between gap-2 p-3 hover:bg-gray-50 transition-all active:bg-gray-100">
                      {/* Left side - Avatar and Name */}
                      <button
                        onClick={() => {
                          closeAllMenus();
                          if (expandedContactId === contact.id) {
                            setExpandedContactId(null);
                          } else {
                            setExpandedContactId(contact.id);
                          }
                        }}
                        className="flex-1 flex items-center gap-2 text-left"
                      >
                        <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                          {contact.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <h3 className="font-medium text-gray-900 text-sm truncate text-left">{contact.name}</h3>
                      </button>

                      {/* Right side - Action Icons (Visible when expanded) */}
                      {expandedContactId === contact.id && (
                        <div className="flex items-center gap-1 flex-shrink-0">
                          {/* Edit Icon */}
                          <button
                            onClick={() => {
                              closeAllMenus();
                              handleEditContact(contact);
                            }}
                            className="p-2 text-indigo-600 hover:bg-indigo-100 rounded transition-all"
                            title="Edit"
                          >
                            <Edit2 size={16} />
                          </button>
                          {/* Delete Icon */}
                          <button
                            onClick={() => {
                              closeAllMenus();
                              setDeleteConfirmContactId(contact.id);
                            }}
                            className="p-2 text-red-600 hover:bg-red-100 rounded transition-all"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                          {/* Call Icon */}
                          <a
                            href={`tel:${contact.phone}`}
                            className="p-2 text-green-600 hover:bg-green-100 rounded transition-all"
                            title="Call"
                          >
                            <Phone size={16} />
                          </a>
                        </div>
                      )}
                      {expandedContactId !== contact.id && (
                        <div className="flex items-center gap-1 flex-shrink-0 invisible w-[88px]">
                          {/* Placeholder for layout consistency */}
                        </div>
                      )}
                    </div>

                    {/* Expanded View */}
                    {expandedContactId === contact.id && (
                      <div className="border-t border-gray-200 bg-gray-50">
                        {/* Contact Info */}
                        <div className="p-3 space-y-1.5 text-xs">
                          <div className="flex items-center gap-2 text-gray-600">
                            <Building size={12} className="text-gray-400 flex-shrink-0" />
                            <span className="truncate">{contact.company}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Mail size={12} className="text-gray-400 flex-shrink-0" />
                            <span className="truncate">{contact.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Phone size={12} className="text-gray-400 flex-shrink-0" />
                            <span className="truncate">{contact.phone}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <MapPin size={12} className="text-gray-400 flex-shrink-0" />
                            <span className="truncate">{contact.location}</span>
                          </div>
                        </div>

                        {/* Tags */}
                        {contact.tags.length > 0 && (
                          <div className="px-3 pb-3 flex flex-wrap gap-1">
                            {contact.tags.map((tag, idx) => (
                              <span key={idx} className="px-1.5 py-0.5 bg-indigo-100 text-indigo-700 text-xs rounded">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Desktop Grid View */}
              <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                {filteredContacts.map(contact => (
                  <div key={contact.id} className="rounded-lg md:rounded-xl border border-gray-200 p-4 md:p-6 hover:shadow-md transition-all">
                    {/* Header with favorite and menu */}
                    <div className="flex items-start justify-between mb-3 md:mb-4">
                      <div className="flex items-center gap-2 md:gap-3 min-w-0">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm md:text-lg flex-shrink-0">
                          {contact.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-semibold text-gray-900 text-sm md:text-base truncate">{contact.name}</h3>
                          <p className="text-xs md:text-sm text-gray-500 truncate">{contact.position}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleFavorite(contact.id)}
                        className="text-gray-400 hover:text-amber-500 transition-colors flex-shrink-0"
                      >
                        <Star size={18} className={`md:w-5 md:h-5 ${contact.favorite ? 'fill-amber-500 text-amber-500' : ''}`} />
                      </button>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-1 md:space-y-2 mb-3 md:mb-4">
                      <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
                        <Building size={14} className="md:w-4 md:h-4 text-gray-400 flex-shrink-0" />
                        <span className="truncate">{contact.company}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
                        <Mail size={14} className="md:w-4 md:h-4 text-gray-400 flex-shrink-0" />
                        <span className="truncate">{contact.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
                        <Phone size={14} className="md:w-4 md:h-4 text-gray-400 flex-shrink-0" />
                        <span className="truncate">{contact.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
                        <MapPin size={14} className="md:w-4 md:h-4 text-gray-400 flex-shrink-0" />
                        <span className="truncate">{contact.location}</span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 md:gap-2 mb-3 md:mb-4">
                      {contact.tags.map((tag, idx) => (
                        <span key={idx} className="px-2 py-0.5 md:py-1 bg-indigo-50 text-indigo-700 text-xs font-medium rounded">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-3 md:pt-4 border-t border-gray-200">
                      <button
                        onClick={() => {
                          closeAllMenus();
                          handleEditContact(contact);
                        }}
                        className="flex-1 flex items-center justify-center gap-1 md:gap-2 px-3 md:px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-all font-medium text-xs md:text-sm"
                      >
                        <Edit2 size={14} className="md:w-4 md:h-4" />
                        <span className="hidden md:inline">Edit</span>
                      </button>
                      <button
                        onClick={() => {
                          closeAllMenus();
                          handleDeleteContact(contact.id);
                        }}
                        className="flex-1 flex items-center justify-center gap-1 md:gap-2 px-3 md:px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all font-medium text-xs md:text-sm"
                      >
                        <Trash2 size={14} className="md:w-4 md:h-4" />
                        <span className="hidden md:inline">Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="hidden md:block rounded-lg md:rounded-xl border border-gray-200 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Contact</th>
                    <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Company</th>
                    <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Email</th>
                    <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Phone</th>
                    <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Tags</th>
                    <th className="px-4 md:px-6 py-3 md:py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredContacts.map(contact => (
                    <tr key={contact.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                            {contact.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{contact.name}</p>
                            <p className="text-sm text-gray-500">{contact.position}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">{contact.company}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{contact.email}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{contact.phone}</td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {contact.tags.map((tag, idx) => (
                            <span key={idx} className="px-2 py-1 bg-indigo-50 text-indigo-700 text-xs font-medium rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => toggleFavorite(contact.id)}
                            className="p-2 text-gray-400 hover:text-amber-500 transition-colors"
                          >
                            <Star size={18} className={contact.favorite ? 'fill-amber-500 text-amber-500' : ''} />
                          </button>
                          <button
                            onClick={() => {
                              closeAllMenus();
                              handleEditContact(contact);
                            }}
                            className="p-2 text-gray-400 hover:text-indigo-600 transition-colors"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => handleDeleteContact(contact.id)}
                            className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Empty State */}
          {filteredContacts.length === 0 && (
            <div className="rounded-xl border border-gray-200 p-12 text-center">
              <Users size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No contacts found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
              <button
                onClick={handleAddContact}
                className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-all"
              >
                <Plus size={20} />
                Add Your First Contact
              </button>
            </div>
          )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="rounded-xl max-w-2xl w-full max-h-[85vh] flex flex-col border border-gray-200 shadow-2xl overflow-hidden" style={{ backgroundColor: '#FAF9F5' }}>
            {/* Modal Header */}
            <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-xl" style={{ backgroundColor: '#FAF9F5' }}>
              <h2 className="text-xl font-bold text-gray-900">
                {modalMode === 'add' ? 'Add New Contact' : 'Edit Contact'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 p-4 space-y-3">
              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Acme Inc"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Position
                  </label>
                  <input
                    type="text"
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Marketing Manager"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="New York, NY"
                  />
                </div>
              </div>

              {/* Service */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Service
                </label>
                <input
                  type="text"
                  onKeyDown={handleTagInput}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Type a service type and press Enter"
                />
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {formData.tags.map((tag, idx) => (
                    <span key={idx} className="flex items-center gap-2 px-2.5 py-1 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-lg">
                      {tag}
                      <button
                        onClick={() => removeTag(tag)}
                        className="hover:text-indigo-900"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                  placeholder="Additional notes about this contact..."
                />
              </div>

              {/* Favorite Toggle */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="favorite"
                  checked={formData.favorite}
                  onChange={(e) => setFormData({ ...formData, favorite: e.target.checked })}
                  className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <label htmlFor="favorite" className="text-sm font-medium text-gray-700 cursor-pointer">
                  Mark as favorite
                </label>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="border-t border-gray-200 px-4 py-3 flex items-center justify-end gap-3 rounded-b-xl" style={{ backgroundColor: '#FAF9F5' }}>
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-all font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveContact}
                className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all font-medium shadow-sm hover:shadow-md flex items-center gap-2"
              >
                <Check size={18} />
                {modalMode === 'add' ? 'Add Contact' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmContactId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6 space-y-4">
            {/* Header */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Trash2 size={24} className="text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Delete Contact</h3>
                <p className="text-sm text-gray-500">This action cannot be undone</p>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-sm text-gray-600">
                <span className="font-medium text-gray-900">{contacts.find(c => c.id === deleteConfirmContactId)?.name}</span> will be permanently deleted.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <button
                onClick={() => setDeleteConfirmContactId(null)}
                className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleDeleteContact(deleteConfirmContactId);
                  setDeleteConfirmContactId(null);
                  setExpandedContactId(null);
                }}
                className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all font-medium flex items-center justify-center gap-2"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}