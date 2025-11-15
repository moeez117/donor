import React from 'react';
import {
  X,
  Shield,
  Printer,
  Mail,
  Download,
  ExternalLink,
  CheckCircle,
  Clock
} from 'lucide-react';

const ReceiptModal = ({ donation, onClose }) => {
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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white rounded-2xl sm:rounded-3xl w-full max-w-full sm:max-w-2xl lg:max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-4 sm:p-6 text-white">
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-start">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">Donation Receipt</h2>
              <p className="text-emerald-100 text-sm sm:text-base">
                Transaction #{donation.receiptId}
              </p>
            </div>
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-4 sm:p-6">
          {/* Verification Badge */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-xl p-3 sm:p-4 mb-6">
            <Shield className="w-8 h-8 text-emerald-600" />
            <div>
              <h3 className="font-semibold text-emerald-900 text-sm sm:text-base">
                Verified Transaction
              </h3>
              <p className="text-xs sm:text-sm text-emerald-700">
                This donation has been verified on the blockchain
              </p>
            </div>
          </div>

          {/* Transaction Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-4">
                Transaction Details
              </h3>

              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 py-2 border-b border-gray-200">
                <span className="text-gray-600 text-sm sm:text-base">Campaign</span>
                <span className="font-semibold text-sm sm:text-base text-right sm:text-left">
                  {donation.campaignName}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 py-2 border-b border-gray-200">
                <span className="text-gray-600 text-sm sm:text-base">Charity</span>
                <span className="font-semibold text-sm sm:text-base text-right sm:text-left">
                  {donation.charityName}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 py-2 border-b border-gray-200">
                <span className="text-gray-600 text-sm sm:text-base">Date</span>
                <span className="font-semibold text-sm sm:text-base text-right sm:text-left">
                  {new Date(donation.date).toLocaleDateString()}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 py-2 border-b border-gray-200">
                <span className="text-gray-600 text-sm sm:text-base">Amount</span>
                <span className="text-xl font-bold text-emerald-600 text-right sm:text-left">
                  ${donation.amount}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 py-2 border-b border-gray-200">
                <span className="text-gray-600 text-sm sm:text-base">Status</span>
                <span
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${getStatusColor(
                    donation.status
                  )}`}
                >
                  {getStatusIcon(donation.status)}
                  {donation.status === 'completed' ? 'Completed' : 'In Progress'}
                </span>
              </div>

              {donation.taxDeductible && (
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 py-2 border-b border-gray-200">
                  <span className="text-gray-600 text-sm sm:text-base">Tax Deductible</span>
                  <span className="text-emerald-600 font-semibold text-sm sm:text-base">
                    Yes
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-4">
                Blockchain Verification
              </h3>

              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 py-2 border-b border-gray-200">
                <span className="text-gray-600 text-sm sm:text-base">Transaction ID</span>
                <span className="font-mono text-xs sm:text-sm break-all text-right sm:text-left">
                  {donation.id}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 py-2 border-b border-gray-200">
                <span className="text-gray-600 text-sm sm:text-base">Receipt ID</span>
                <span className="font-mono text-xs sm:text-sm break-all text-right sm:text-left">
                  {donation.receiptId}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 py-2 border-b border-gray-200">
                <span className="text-gray-600 text-sm sm:text-base">Blockchain ID</span>
                <span className="font-mono text-xs sm:text-sm truncate max-w-full sm:max-w-[200px] text-right sm:text-left">
                  {donation.blockchainId}
                </span>
              </div>

              <div className="bg-gray-50 rounded-lg p-3 sm:p-4 mt-2 sm:mt-4">
                <p className="text-xs sm:text-sm text-gray-600 mb-2">
                  {donation.description}
                </p>
                <button className="flex items-center gap-1 text-emerald-600 text-xs sm:text-sm font-semibold hover:text-emerald-700 transition-colors">
                  <ExternalLink className="w-4 h-4" />
                  View on blockchain explorer
                </button>
              </div>
            </div>
          </div>

          {/* Items Breakdown */}
          <div className="border border-gray-200 rounded-xl overflow-hidden mb-6">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Items Funded</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {donation.items.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 px-4 py-3"
                >
                  <div>
                    <p className="font-medium text-gray-900 text-sm sm:text-base">
                      {item.name}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold text-emerald-600 text-sm sm:text-base">
                    ${item.cost}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row-reverse sm:justify-end gap-3 sm:gap-4">
            <button className="flex items-center justify-center gap-2 w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 bg-emerald-600 text-white rounded-xl text-sm sm:text-base font-semibold hover:bg-emerald-700 transition-colors">
              <Download className="w-5 h-5" />
              Download PDF
            </button>
            <button className="flex items-center justify-center gap-2 w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 border border-emerald-200 text-emerald-700 rounded-xl text-sm sm:text-base font-semibold hover:bg-emerald-50 transition-colors">
              <Mail className="w-5 h-5" />
              Email Receipt
            </button>
            <button className="flex items-center justify-center gap-2 w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 border border-emerald-200 text-emerald-700 rounded-xl text-sm sm:text-base font-semibold hover:bg-emerald-50 transition-colors">
              <Printer className="w-5 h-5" />
              Print Receipt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceiptModal;
