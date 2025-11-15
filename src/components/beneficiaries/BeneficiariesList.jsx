import React, { useState } from "react";
import { Search, Filter, Download, Eye, MapPin, Calendar } from "lucide-react";

const beneficiaries = [
  { id: "SAN-00123", name: "Ahmed Ali", location: "Doha – Al Sadd", aid: "Food, rent support", lastCampaign: "Qatar Relief", status: "Active", priority: "High" },
  { id: "SAN-00457", name: "Fatima Hassan", location: "Doha – Al Wakrah", aid: "Medical, tuition", lastCampaign: "Hope for Education", status: "Active", priority: "Medium" },
  { id: "SAN-00910", name: "Mohammed Saleh", location: "Al Khor", aid: "Emergency relief", lastCampaign: "Flood Response", status: "Pending", priority: "High" },
  { id: "SAN-01022", name: "Family Group", location: "Al Rayyan", aid: "Zakat, food basket", lastCampaign: "Food Security", status: "Active", priority: "Low" },
];

export default function BeneficiariesList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [selectedBeneficiary, setSelectedBeneficiary] = useState(null);

  const filteredBeneficiaries = beneficiaries.filter(b => 
    b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.location.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter(b => filterStatus === "All" || b.status === filterStatus);

  const exportData = () => {
    const dataStr = JSON.stringify(filteredBeneficiaries, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "beneficiaries.json";
    link.click();
  };

  return (
    <div className="bg-white rounded-2xl border border-emerald-100 shadow-lg">
      {/* Header */}
      <div className="p-6 border-b border-emerald-50">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-emerald-900">Beneficiaries</h3>
            <p className="text-emerald-600 mt-1">Read-only data from Sandi platform</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium">
              {filteredBeneficiaries.length} records
            </span>
            <button onClick={exportData} className="flex items-center gap-2 bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors">
              <Download size={16} />
              Export
            </button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-400" size={18} />
            <input
              type="text"
              placeholder="Search beneficiaries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-emerald-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
      </div>

      {/* Beneficiaries Grid */}
      <div className="p-6">
        <div className="grid gap-4">
          {filteredBeneficiaries.map((beneficiary) => (
            <div
              key={beneficiary.id}
              className="bg-emerald-50 rounded-xl border border-emerald-200 p-4 hover:bg-white hover:shadow-md transition-all cursor-pointer"
              onClick={() => setSelectedBeneficiary(beneficiary)}
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="bg-white p-3 rounded-lg border border-emerald-200">
                    <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">ID</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h4 className="font-semibold text-emerald-900">{beneficiary.name}</h4>
                      <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full text-xs font-medium">
                        {beneficiary.id}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        beneficiary.priority === "High" ? "bg-red-100 text-red-800" :
                        beneficiary.priority === "Medium" ? "bg-yellow-100 text-yellow-800" :
                        "bg-blue-100 text-blue-800"
                      }`}>
                        {beneficiary.priority}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-emerald-700">
                      <div className="flex items-center gap-1">
                        <MapPin size={14} />
                        {beneficiary.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        {beneficiary.lastCampaign}
                      </div>
                    </div>
                    <p className="text-emerald-600 text-sm mt-2">Aid: {beneficiary.aid}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    beneficiary.status === "Active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                  }`}>
                    {beneficiary.status}
                  </span>
                  <button className="flex items-center gap-1 text-emerald-600 hover:text-emerald-700 text-sm">
                    <Eye size={16} />
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredBeneficiaries.length === 0 && (
          <div className="text-center py-8 text-emerald-600">
            No beneficiaries found matching your criteria
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedBeneficiary && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-lg font-bold text-emerald-900 mb-4">Beneficiary Details</h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-emerald-600">Name</label>
                <p className="font-medium">{selectedBeneficiary.name}</p>
              </div>
              <div>
                <label className="text-sm text-emerald-600">ID</label>
                <p className="font-medium">{selectedBeneficiary.id}</p>
              </div>
              <div>
                <label className="text-sm text-emerald-600">Location</label>
                <p className="font-medium">{selectedBeneficiary.location}</p>
              </div>
              <div>
                <label className="text-sm text-emerald-600">Aid Type</label>
                <p className="font-medium">{selectedBeneficiary.aid}</p>
              </div>
            </div>
            <button
              onClick={() => setSelectedBeneficiary(null)}
              className="w-full mt-6 bg-emerald-500 text-white py-2 rounded-lg hover:bg-emerald-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}