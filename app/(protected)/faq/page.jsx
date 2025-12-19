'use client';

import { useState } from 'react';
import { Search, ChevronDown, ChevronUp, Mail, Phone, MessageCircle, HelpCircle, Book, Video, FileText, ExternalLink, Clock, MapPin, Send } from 'lucide-react';

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openFAQ, setOpenFAQ] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const faqData = [
    {
      category: 'Getting Started',
      questions: [
        {
          id: 1,
          question: 'How do I create a new account?',
          answer: 'To create a new account, click on the "Sign Up" button in the top right corner of the homepage. Fill in your email address, create a strong password, and verify your email. Once verified, you can complete your profile and start using all features.'
        },
        {
          id: 2,
          question: 'What are the system requirements?',
          answer: 'Our platform works on all modern browsers including Chrome, Firefox, Safari, and Edge. For mobile devices, we support iOS 12+ and Android 8+. You\'ll need a stable internet connection for the best experience.'
        },
        {
          id: 3,
          question: 'How can I reset my password?',
          answer: 'Click on "Forgot Password" on the login page. Enter your registered email address, and we\'ll send you a password reset link. Follow the instructions in the email to create a new password. The link expires in 24 hours for security.'
        },
        {
          id: 4,
          question: 'Where can I find my user ID?',
          answer: 'Your user ID can be found in your profile settings under the "Account Information" section. You can also find it in the welcome email we sent when you first signed up.'
        }
      ]
    },
    {
      category: 'Account Management',
      questions: [
        {
          id: 5,
          question: 'How do I update my profile information?',
          answer: 'Navigate to Settings > Profile from the sidebar menu. Here you can update your name, email, phone number, profile picture, and other personal information. Remember to click "Save Changes" when you\'re done.'
        },
        {
          id: 6,
          question: 'Can I change my subscription plan?',
          answer: 'Yes! Go to Settings > Billing & Subscription. You can upgrade or downgrade your plan at any time. Changes take effect immediately for upgrades, or at the end of your current billing cycle for downgrades.'
        },
        {
          id: 7,
          question: 'How do I cancel my account?',
          answer: 'We\'re sorry to see you go! To cancel your account, go to Settings > Account and click "Cancel Account" at the bottom of the page. You\'ll be asked to confirm your decision. Note that this action is permanent and cannot be undone.'
        }
      ]
    },
    {
      category: 'Technical Support',
      questions: [
        {
          id: 8,
          question: 'What should I do if the application is not loading?',
          answer: 'First, try clearing your browser cache and cookies. If that doesn\'t work, try using a different browser or device. Check your internet connection and disable any browser extensions that might interfere. If the issue persists, contact our support team.'
        },
        {
          id: 9,
          question: 'How do I report a bug or error?',
          answer: 'Click on the "Help" icon in the bottom right corner and select "Report a Bug". Provide a detailed description of the issue, including steps to reproduce it, screenshots if possible, and any error messages you received. Our team will investigate promptly.'
        },
        {
          id: 10,
          question: 'Is there a knowledge base for developers?',
          answer: 'Yes! Visit our Developer Portal at docs.example.com for comprehensive API documentation, code samples, integration guides, and best practices. You can also join our developer community forum for support.'
        }
      ]
    },
    {
      category: 'Billing & Payments',
      questions: [
        {
          id: 11,
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit cards (Visa, MasterCard, American Express), debit cards, PayPal, and bank transfers for enterprise accounts. All payments are processed securely through our encrypted payment gateway.'
        },
        {
          id: 12,
          question: 'How do I view my past invoices?',
          answer: 'Go to Settings > Billing & Subscription > Invoice History. Here you can view, download, and print all your past invoices. Invoices are automatically sent to your registered email address after each billing cycle.'
        },
        {
          id: 13,
          question: 'What is your refund policy?',
          answer: 'We offer a 30-day money-back guarantee for new subscriptions. If you\'re not satisfied, contact us within 30 days of purchase for a full refund. Refunds for annual plans are prorated after the initial 30-day period.'
        }
      ]
    }
  ];

  const contactOptions = [
    {
      icon: <Mail size={24} />,
      title: 'Email Support',
      description: 'Get help via email within 24 hours',
      contact: 'support@repuscope.com',
      action: 'Send Email',
      colorClass: 'indigo'
    },
    {
      icon: <Phone size={24} />,
      title: 'Phone Support',
      description: 'Speak with our team directly',
      contact: '+1 (555) 123-4567',
      action: 'Call Now',
      colorClass: 'green'
    },
    {
      icon: <MessageCircle size={24} />,
      title: 'Live Chat',
      description: 'Chat with us in real-time',
      contact: 'Available Mon-Fri, 9AM-6PM EST',
      action: 'Start Chat',
      colorClass: 'blue'
    }
  ];

  const resources = [
    {
      icon: <Book size={20} />,
      title: 'Documentation',
      description: 'Comprehensive guides and tutorials',
      link: '#'
    },
    {
      icon: <Video size={20} />,
      title: 'Video Tutorials',
      description: 'Step-by-step video guides',
      link: '#'
    },
    {
      icon: <FileText size={20} />,
      title: 'Blog & Updates',
      description: 'Latest news and feature updates',
      link: '#'
    },
    {
      icon: <HelpCircle size={20} />,
      title: 'Community Forum',
      description: 'Connect with other users',
      link: '#'
    }
  ];

  const toggleFAQ = (id) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  const filteredFAQs = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(q => 
      (activeCategory === 'all' || category.category === activeCategory) &&
      (q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
       q.answer.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  })).filter(category => category.questions.length > 0);

  const categories = ['all', ...faqData.map(c => c.category)];

  const getColorClasses = (colorClass) => {
    const colors = {
      indigo: { bg: 'bg-indigo-100', text: 'text-indigo-600', button: 'bg-indigo-600 hover:bg-indigo-700' },
      green: { bg: 'bg-green-100', text: 'text-green-600', button: 'bg-green-600 hover:bg-green-700' },
      blue: { bg: 'bg-blue-100', text: 'text-blue-600', button: 'bg-blue-600 hover:bg-blue-700' }
    };
    return colors[colorClass] || colors.indigo;
  };

  return (
    <div className="p-10 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
          <HelpCircle className="text-indigo-600" size={32} />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Frequently Asked Questions</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Find answers to common questions about our platform. Can't find what you're looking for? Contact our support team.
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-3xl mx-auto mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search for answers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex justify-center gap-3 mb-10 flex-wrap">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-5 py-2.5 rounded-lg font-medium transition-all ${
              activeCategory === category
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-white text-gray-700 border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50'
            }`}
          >
            {category === 'all' ? 'All Categories' : category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Main FAQ Section */}
        <div className="col-span-8">
          {filteredFAQs.map((category) => (
            <div key={category.category} className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{category.category}</h2>
              <div className="space-y-3">
                {category.questions.map((faq) => (
                  <div
                    key={faq.id}
                    className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-all"
                  >
                    <button
                      onClick={() => toggleFAQ(faq.id)}
                      className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                      {openFAQ === faq.id ? (
                        <ChevronUp className="text-indigo-600 flex-shrink-0" size={20} />
                      ) : (
                        <ChevronDown className="text-gray-400 flex-shrink-0" size={20} />
                      )}
                    </button>
                    {openFAQ === faq.id && (
                      <div className="px-6 pb-5 pt-2 text-gray-600 leading-relaxed border-t border-gray-100">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {filteredFAQs.length === 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
              <Search size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-600">Try adjusting your search or browse all categories</p>
            </div>
          )}
        </div>

        {/* Sidebar - Quick Links & Contact */}
        <div className="col-span-4 space-y-6">
          {/* Quick Links */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
            <div className="space-y-2">
              {categories.slice(1).map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className="w-full text-left px-4 py-2.5 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-all font-medium"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Helpful Resources</h3>
            <div className="space-y-3">
              {resources.map((resource, idx) => (
                <a
                  key={idx}
                  href={resource.link}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-all group"
                >
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 flex-shrink-0">
                    {resource.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 group-hover:text-indigo-600 transition-colors mb-1">
                      {resource.title}
                    </h4>
                    <p className="text-sm text-gray-600">{resource.description}</p>
                  </div>
                  <ExternalLink size={16} className="text-gray-400 group-hover:text-indigo-600 transition-colors mt-1" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Contact Support Section */}
      <div className="mt-16 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-10 border border-indigo-100">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Still need help?</h2>
          <p className="text-lg text-gray-600">
            If you couldn't find the answer you're looking for, our support team is ready to assist you.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-8">
          {contactOptions.map((option, idx) => {
            const colors = getColorClasses(option.colorClass);
            return (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all"
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${colors.bg} ${colors.text} mb-4`}>
                  {option.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{option.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{option.description}</p>
                <p className="text-sm font-semibold text-gray-700 mb-4">{option.contact}</p>
                <button className={`w-full text-white px-4 py-2.5 rounded-lg transition-all font-medium ${colors.button}`}>
                  {option.action}
                </button>
              </div>
            );
          })}
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 max-w-3xl mx-auto">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Send us a message</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                placeholder="john@example.com"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
            <input
              type="text"
              placeholder="How can we help?"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
            <textarea
              rows={5}
              placeholder="Describe your issue or question..."
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
            />
          </div>
          <button className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-all font-medium shadow-sm hover:shadow-md flex items-center justify-center gap-2">
            <Send size={20} />
            Send Message
          </button>
        </div>
      </div>

      {/* Business Hours */}
      <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
              <Clock className="text-indigo-600" size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Support Hours</h3>
              <p className="text-sm text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM EST</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <MapPin className="text-green-600" size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Our Location</h3>
              <p className="text-sm text-gray-600">123 Business St, Suite 100, New York, NY 10001</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
