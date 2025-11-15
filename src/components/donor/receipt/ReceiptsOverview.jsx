import React, { useState } from 'react';
import {
  Download,
  Filter,
  Search,
  FileText,
  CheckCircle,
  Clock,
  X,
  Eye,
  Calendar,
  ArrowUpDown,
  ChevronDown,
  ChevronUp,
  Shield,
  Printer,
  Mail,
  ExternalLink,
  TrendingUp,
  DollarSign,
  Building
} from 'lucide-react';
import Head from './Head';
import ReceiptsControls from './ReceiptsControls';
import ReceiptsList from './ReceiptsList';
import ReceiptModal from './ReceiptModal';

const DonationHistoryReceipts = () => {
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [statusFilter, setStatusFilter] = useState('all');
  const [campaignTypeFilter, setCampaignTypeFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [showFilters, setShowFilters] = useState(false);
  const [exportFormat, setExportFormat] = useState('');

  // Sample donation data
  const donations = [
    {
      id: 'DON-789456',
      campaignName: 'Emergency Relief Fund',
      charityName: 'Hope Foundation',
      date: '2024-01-18',
      amount: 250,
      currency: 'USD',
      status: 'completed',
      type: 'emergency',
      receiptId: 'RC-789456123',
      blockchainId: '0x1a2b3c4d5e6f7g8h9i0j',
      description: 'Emergency aid for flood victims in the region',
      items: [
        { name: 'Food Packages', quantity: 25, cost: 150 },
        { name: 'Medical Supplies', quantity: 10, cost: 100 }
      ],
      taxDeductible: true
    },
    {
      id: 'DON-789457',
      campaignName: 'Education for All',
      charityName: 'Future Leaders Org',
      date: '2024-01-15',
      amount: 100,
      currency: 'USD',
      status: 'completed',
      type: 'education',
      receiptId: 'RC-789456124',
      blockchainId: '0x2b3c4d5e6f7g8h9i0j1k',
      description: 'School supplies and books for underprivileged children',
      items: [
        { name: 'Textbooks', quantity: 50, cost: 75 },
        { name: 'School Kits', quantity: 25, cost: 25 }
      ],
      taxDeductible: true
    },
    {
      id: 'DON-789458',
      campaignName: 'Medical Aid Initiative',
      charityName: 'Health First International',
      date: '2024-01-12',
      amount: 500,
      currency: 'USD',
      status: 'in-progress',
      type: 'medical',
      receiptId: 'RC-789456125',
      blockchainId: '0x3c4d5e6f7g8h9i0j1k2l',
      description: 'Medical equipment for rural clinics',
      items: [
        { name: 'Medical Kits', quantity: 10, cost: 300 },
        { name: 'Vaccines', quantity: 200, cost: 200 }
      ],
      taxDeductible: false
    },
    {
      id: 'DON-789459',
      campaignName: 'Clean Water Project',
      charityName: 'Water for Life',
      date: '2024-01-08',
      amount: 75,
      currency: 'USD',
      status: 'completed',
      type: 'environment',
      receiptId: 'RC-789456126',
      blockchainId: '0x4d5e6f7g8h9i0j1k2l3m',
      description: 'Water purification systems installation',
      items: [
        { name: 'Water Filters', quantity: 15, cost: 75 }
      ],
      taxDeductible: true
    }
  ];

  const filteredDonations = donations
    .filter(donation => {
      const matchesSearch =
        donation.campaignName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        donation.charityName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || donation.status === statusFilter;
      const matchesType = campaignTypeFilter === 'all' || donation.type === campaignTypeFilter;
      const matchesDate =
        (!dateRange.start || donation.date >= dateRange.start) &&
        (!dateRange.end || donation.date <= dateRange.end);

      return matchesSearch && matchesStatus && matchesType && matchesDate;
    })
    .sort((a, b) => {
      let aValue, bValue;

      switch (sortBy) {
        case 'amount':
          aValue = a.amount;
          bValue = b.amount;
          break;
        case 'campaign':
          aValue = a.campaignName;
          bValue = b.campaignName;
          break;
        default:
          aValue = a.date;
          bValue = b.date;
      }

      if (sortOrder === 'desc') {
        return aValue < bValue ? 1 : -1;
      } else {
        return aValue > bValue ? 1 : -1;
      }
    });

  const handleExport = (format) => {
    setExportFormat(format);
    setTimeout(() => {
      alert(`${format.toUpperCase()} export completed!`);
      setExportFormat('');
    }, 1500);
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 py-6 sm:py-8 px-3 sm:px-4">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        <Head donations={filteredDonations} />

        <ReceiptsControls
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          dateRange={dateRange}
          setDateRange={setDateRange}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          campaignTypeFilter={campaignTypeFilter}
          setCampaignTypeFilter={setCampaignTypeFilter}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          handleExport={handleExport}
        />

        <ReceiptsList
          donations={filteredDonations}
          handleSort={handleSort}
          sortBy={sortBy}
          sortOrder={sortOrder}
          setSelectedDonation={setSelectedDonation}
        />

        {selectedDonation && (
          <ReceiptModal
            donation={selectedDonation}
            onClose={() => setSelectedDonation(null)}
          />
        )}

        {exportFormat && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center px-4">
            <div className="bg-white rounded-2xl w-full max-w-sm p-6 sm:p-8 text-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-600 animate-bounce" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                Exporting {exportFormat.toUpperCase()}...
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                Preparing your donation history file
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DonationHistoryReceipts;
