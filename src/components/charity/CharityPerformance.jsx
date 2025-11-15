import React, { useState } from "react";

const stats = [
  { id: 1, name: "Qatar Relief Foundation", donations: 120000, campaigns: 14, complaints: 1, impact: 92, growth: 12 },
  { id: 2, name: "Hope for Education", donations: 80000, campaigns: 9, complaints: 3, impact: 86, growth: 8 },
  { id: 3, name: "Health & Care Society", donations: 65000, campaigns: 7, complaints: 0, impact: 95, growth: 15 },
  { id: 4, name: "Gulf Food Aid", donations: 45000, campaigns: 6, complaints: 2, impact: 81, growth: 5 },
];

export default function CharityPerformance() {
  const [filter, setFilter] = useState("All");

  const totalDonations = stats.reduce((sum, charity) => sum + charity.donations, 0);
  const totalCampaigns = stats.reduce((sum, charity) => sum + charity.campaigns, 0);
  const avgImpact = Math.round(stats.reduce((sum, charity) => sum + charity.impact, 0) / stats.length);

  const filteredStats = stats.filter(charity => {
    if (filter === "High") return charity.impact >= 90;
    if (filter === "Medium") return charity.impact >= 80 && charity.impact < 90;
    if (filter === "Low") return charity.impact < 80;
    return true;
  });

  const viewDetails = (charity) => {
    alert(
      `Detailed Report for ${charity.name}:\n\n• Total Donations: ${charity.donations.toLocaleString()} QAR\n• Active Campaigns: ${charity.campaigns}\n• Impact Score: ${charity.impact}/100\n• Growth: +${charity.growth}%`
    );
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 p-4 sm:p-6 overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-teal-600 p-4 sm:p-6 lg:p-8 text-white">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">Charity Performance</h1>
                <p className="text-green-100 mt-1 sm:mt-2 text-sm sm:text-base">
                  KPI dashboard with impact metrics and growth tracking
                </p>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-6 sm:mt-8">
              <div className="bg-white/20 rounded-xl p-4 sm:p-6 backdrop-blur-sm">
                <div className="text-xl sm:text-2xl font-bold">
                  {totalDonations.toLocaleString()} QAR
                </div>
                <div className="text-xs sm:text-sm opacity-90 mt-1">Total Donations</div>
              </div>
              <div className="bg-white/20 rounded-xl p-4 sm:p-6 backdrop-blur-sm">
                <div className="text-xl sm:text-2xl font-bold">{totalCampaigns}</div>
                <div className="text-xs sm:text-sm opacity-90 mt-1">Active Campaigns</div>
              </div>
              <div className="bg-white/20 rounded-xl p-4 sm:p-6 backdrop-blur-sm">
                <div className="text-xl sm:text-2xl font-bold">{avgImpact}%</div>
                <div className="text-xs sm:text-sm opacity-90 mt-1">Avg Impact Score</div>
              </div>
              <div className="bg-white/20 rounded-xl p-4 sm:p-6 backdrop-blur-sm">
                <div className="text-xl sm:text-2xl font-bold">+10%</div>
                <div className="text-xs sm:text-sm opacity-90 mt-1">Overall Growth</div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2 sm:gap-3 border-b border-gray-200 bg-gray-50 px-4 sm:px-8 py-3 sm:py-4">
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {["All", "High", "Medium", "Low"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`rounded-lg px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium transition-colors ${
                    filter === f
                      ? "bg-green-600 text-white"
                      : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {f} Impact
                </button>
              ))}
            </div>
            <button
              className="sm:ml-auto rounded-lg border border-gray-300 bg-white px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-50 self-start"
            >
              Reset Filters
            </button>
          </div>

          {/* Charity Cards */}
          <div className="p-4 sm:p-8">
            <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
              {filteredStats.map((charity) => (
                <div
                  key={charity.id}
                  className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4 sm:mb-6 gap-3">
                    <div className="min-w-0">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 break-words">
                        {charity.name}
                      </h3>
                      <p className="text-gray-600 mt-1 text-sm sm:text-base">
                        Growth:{" "}
                        <span className="text-green-600 font-semibold">
                          +{charity.growth}%
                        </span>
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg sm:text-2xl font-bold text-green-600">
                        {charity.donations.toLocaleString()} QAR
                      </div>
                      <div className="text-xs sm:text-sm text-gray-500">
                        Total Donations
                      </div>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div className="text-center p-2 sm:p-3 bg-gray-50 rounded-lg">
                      <div className="text-base sm:text-lg font-bold text-gray-900">
                        {charity.campaigns}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-600">Campaigns</div>
                    </div>
                    <div className="text-center p-2 sm:p-3 bg-gray-50 rounded-lg">
                      <div
                        className={`text-base sm:text-lg font-bold ${
                          charity.complaints ? "text-red-600" : "text-green-600"
                        }`}
                      >
                        {charity.complaints}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-600">
                        Complaints
                      </div>
                    </div>
                    <div className="text-center p-2 sm:p-3 bg-gray-50 rounded-lg">
                      <div className="text-base sm:text-lg font-bold text-gray-900">
                        {charity.impact}%
                      </div>
                      <div className="text-xs sm:text-sm text-gray-600">Impact</div>
                    </div>
                  </div>

                  {/* Performance Bar */}
                  <div className="mb-4 sm:mb-6">
                    <div className="flex justify-between text-xs sm:text-sm text-gray-600 mb-1.5 sm:mb-2">
                      <span>Performance Score</span>
                      <span className="font-semibold">
                        {charity.impact}/100
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full"
                        style={{ width: `${charity.impact}%` }}
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => viewDetails(charity)}
                    className="w-full bg-green-600 text-white py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold hover:bg-green-700 transition-colors"
                  >
                    View Full Report
                  </button>
                </div>
              ))}
            </div>

            {filteredStats.length === 0 && (
              <div className="text-center py-10 sm:py-12 text-gray-500 text-sm sm:text-base">
                No charities match the selected filters
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
