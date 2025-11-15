import React from 'react';
import {
  ArrowUpDown,
  Building,
  Download,
  Eye,
  FileText,
  CheckCircle,
  Clock
} from 'lucide-react';

const ReceiptsList = ({ donations, handleSort, sortBy, sortOrder, setSelectedDonation }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-emerald-600" />;
      case 'in-progress':
        return <Clock className="w-4 h-4 text-amber-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-emerald-100 text-emerald-800';
      case 'in-progress':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-emerald-100 overflow-hidden">
      {/* Table Header */}
      <div className="bg-emerald-50 px-4 sm:px-6 py-3 sm:py-4 border-b border-emerald-200">
        {/* Desktop / Tablet Header */}
        <div className="hidden md:grid grid-cols-12 gap-4 text-xs sm:text-sm font-semibold text-gray-700">
          <div className="col-span-4 flex items-center gap-2">
            <button
              onClick={() => handleSort('campaign')}
              className="flex items-center gap-1 hover:text-emerald-600 transition-colors"
            >
              Campaign
              <ArrowUpDown className="w-4 h-4" />
            </button>
          </div>
          <div className="col-span-2 flex items-center gap-2">
            <button
              onClick={() => handleSort('date')}
              className="flex items-center gap-1 hover:text-emerald-600 transition-colors"
            >
              Date
              <ArrowUpDown className="w-4 h-4" />
            </button>
          </div>
          <div className="col-span-2 flex items-center gap-2">
            <button
              onClick={() => handleSort('amount')}
              className="flex items-center gap-1 hover:text-emerald-600 transition-colors"
            >
              Amount
              <ArrowUpDown className="w-4 h-4" />
            </button>
          </div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2">Actions</div>
        </div>

        {/* Mobile Header */}
        <div className="md:hidden text-xs font-semibold text-gray-700">
          Recent Donations
        </div>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-emerald-100">
        {donations.map((donation) => (
          <div
            key={donation.id}
            className="px-4 sm:px-6 py-4 hover:bg-emerald-50 transition-colors"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start md:items-center">
              {/* Campaign & Charity */}
              <div className="md:col-span-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Building className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                      {donation.campaignName}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600">
                      {donation.charityName}
                    </p>
                  </div>
                </div>
              </div>

              {/* Date */}
              <div className="md:col-span-2">
                <p className="text-xs text-gray-500 md:hidden mb-1">Date</p>
                <p className="text-sm text-gray-900">
                  {new Date(donation.date).toLocaleDateString()}
                </p>
              </div>

              {/* Amount */}
              <div className="md:col-span-2">
                <p className="text-xs text-gray-500 md:hidden mb-1">Amount</p>
                <p className="text-base sm:text-lg font-semibold text-emerald-600">
                  ${donation.amount}
                </p>
              </div>

              {/* Status */}
              <div className="md:col-span-2">
                <p className="text-xs text-gray-500 md:hidden mb-1">Status</p>
                <span
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                    donation.status
                  )}`}
                >
                  {getStatusIcon(donation.status)}
                  {donation.status === 'completed' ? 'Completed' : 'In Progress'}
                </span>
              </div>

              {/* Actions */}
              <div className="md:col-span-2">
                <div className="flex flex-wrap md:flex-nowrap items-center gap-2 justify-start md:justify-end">
                  <button
                    onClick={() => setSelectedDonation(donation)}
                    className="flex items-center justify-center gap-1 px-3 py-2 w-full md:w-auto bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-xs sm:text-sm font-semibold"
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </button>
                  <button className="p-2 rounded-lg w-10 md:w-auto flex items-center justify-center text-gray-400 hover:text-emerald-600 transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {donations.length === 0 && (
        <div className="text-center py-8 sm:py-12 px-4">
          <FileText className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-3 sm:mb-4" />
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">
            No donations found
          </h3>
          <p className="text-sm sm:text-base text-gray-600">
            Try adjusting your filters or search terms
          </p>
        </div>
      )}
    </div>
  );
};

export default ReceiptsList;
