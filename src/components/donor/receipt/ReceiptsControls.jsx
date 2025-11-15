import React from 'react';
import {
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  Download,
  FileText,
  TrendingUp,
  Calendar
} from 'lucide-react';

const ReceiptsControls = ({
  searchTerm,
  setSearchTerm,
  dateRange,
  setDateRange,
  statusFilter,
  setStatusFilter,
  campaignTypeFilter,
  setCampaignTypeFilter,
  showFilters,
  setShowFilters,
  handleExport
}) => {
  const statusOptions = [
    { value: 'all', label: 'All Status', color: 'gray' },
    { value: 'completed', label: 'Completed', color: 'emerald' },
    { value: 'in-progress', label: 'In Progress', color: 'amber' }
  ];

  const campaignTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'emergency', label: 'Emergency Relief' },
    { value: 'education', label: 'Education' },
    { value: 'medical', label: 'Medical' },
    { value: 'environment', label: 'Environment' }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-8 border border-emerald-100">
      <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
        {/* Search */}
        <div className="relative flex-1 w-full max-w-full lg:max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search campaigns or charities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-emerald-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm sm:text-base"
          />
        </div>

        {/* Controls */}
        <div className="flex flex-wrap gap-3 w-full lg:w-auto justify-start lg:justify-end">
          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center justify-center gap-2 px-3 py-2.5 sm:px-4 sm:py-3 bg-emerald-50 text-emerald-700 rounded-xl font-semibold hover:bg-emerald-100 transition-colors text-sm sm:text-base flex-1 xs:flex-none"
          >
            <Filter className="w-4 h-4" />
            Filters
            {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {/* Export Options */}
          <div className="relative group flex-1 xs:flex-none">
            <button className="flex items-center justify-center gap-2 w-full px-3 py-2.5 sm:px-4 sm:py-3 bg-white border border-emerald-200 text-emerald-700 rounded-xl font-semibold hover:bg-emerald-50 transition-colors text-sm sm:text-base">
              <Download className="w-4 h-4" />
              Export
              <ChevronDown className="w-4 h-4" />
            </button>

            {/* Export Dropdown */}
            <div className="absolute right-0 mt-2 w-44 sm:w-48 bg-white rounded-xl shadow-2xl border border-emerald-100 z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
              <button
                onClick={() => handleExport('pdf')}
                className="flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-emerald-50 first:rounded-t-xl last:rounded-b-xl text-sm"
              >
                <FileText className="w-4 h-4 text-emerald-600" />
                Export as PDF
              </button>
              <button
                onClick={() => handleExport('excel')}
                className="flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-emerald-50 first:rounded-t-xl last:rounded-b-xl text-sm"
              >
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                Export as Excel
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Filters */}
      {showFilters && (
        <div className="mt-4 sm:mt-6 p-4 sm:p-6 bg-emerald-50 rounded-xl border border-emerald-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Date Range */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-1" />
                Date Range
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) =>
                    setDateRange((prev) => ({ ...prev, start: e.target.value }))
                  }
                  className="flex-1 px-3 py-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                />
                <input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) =>
                    setDateRange((prev) => ({ ...prev, end: e.target.value }))
                  }
                  className="flex-1 px-3 py-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Campaign Type Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Campaign Type
              </label>
              <select
                value={campaignTypeFilter}
                onChange={(e) => setCampaignTypeFilter(e.target.value)}
                className="w-full px-3 py-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
              >
                {campaignTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Clear Filters */}
          <div className="flex justify-end mt-4">
            <button
              onClick={() => {
                setDateRange({ start: '', end: '' });
                setStatusFilter('all');
                setCampaignTypeFilter('all');
              }}
              className="px-4 py-2 text-xs sm:text-sm text-gray-600 hover:text-gray-800 transition-colors"
            >
              Clear all filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReceiptsControls;
