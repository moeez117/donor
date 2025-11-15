import React from 'react';

const DonationTabsContent = ({
  activeTab,
  setActiveTab,
  filter,
  setFilter,
  filteredHistory,
  plans,
  getStatusColor,
  getTypeIcon,
  getPlanStatusConfig,
  handlePlanAction,
  downloadReceipt,
  sendEmailReceipt
}) => {
  return (
    <div className="space-y-6">
      <nav className="flex flex-wrap gap-2 bg-emerald-50 rounded-2xl px-2 py-2 border border-emerald-100" data-aos="fade-right">
        {[
          { id: "history", label: "Donation History", icon: "📋" },
          { id: "recurring", label: "Recurring Donations", icon: "🔄" },
          { id: "zakat", label: "Zakat & Sadaqah", icon: "☪️" }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 min-w-[110px] px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
              activeTab === tab.id
                ? "bg-gradient-to-r from-emerald-500 to-teal-400 text-white shadow-lg transform scale-105"
                : "text-emerald-700 hover:bg-emerald-100 hover:text-emerald-900"
            }`}
          >
            <span>{tab.icon}</span>
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </nav>

      {/* Tab Content */}
      <div data-aos="fade-up">
        
        {/* Donation History Tab */}
        {activeTab === "history" && (
          <section className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-emerald-900">Donation History</h2>
                <p className="text-sm text-emerald-600">Your complete giving timeline</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: "all", label: "All Types" },
                  { id: "health", label: "Health" },
                  { id: "education", label: "Education" },
                  { id: "relief", label: "Relief" },
                  { id: "orphans", label: "Orphans" }
                ].map(f => (
                  <button
                    key={f.id}
                    onClick={() => setFilter(f.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                      filter === f.id
                        ? "bg-emerald-500 text-white border-emerald-500 shadow-md"
                        : "border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-emerald-100 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gradient-to-r from-emerald-50 to-teal-50">
                    <tr className="text-left text-emerald-700 text-xs uppercase tracking-wide">
                      <th className="px-4 py-4 font-semibold">Date</th>
                      <th className="px-4 py-4 font-semibold">Campaign</th>
                      <th className="px-4 py-4 font-semibold">Amount</th>
                      <th className="px-4 py-4 font-semibold">Payment</th>
                      <th className="px-4 py-4 font-semibold">Status</th>
                      <th className="px-4 py-4 font-semibold text-center">Receipt</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-emerald-50">
                    {filteredHistory.map((donation) => (
                      <tr 
                        key={donation.id} 
                        className="hover:bg-emerald-50/50 transition-colors duration-200 group"
                      >
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="font-medium text-emerald-900">{donation.date}</div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <span className="text-lg">{getTypeIcon(donation.type)}</span>
                            <div>
                              <div className="font-medium text-emerald-900">{donation.campaign}</div>
                              <div className="text-xs text-emerald-500 capitalize">{donation.type}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="font-bold text-emerald-900">QAR {donation.amount.toLocaleString()}</div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <span className="text-emerald-600">{donation.paymentMethod}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(donation.status)}`}>
                            {donation.status}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() => downloadReceipt(donation.id)}
                              className="p-2 text-emerald-600 hover:bg-emerald-100 rounded-lg transition-colors group"
                              title="Download PDF"
                            >
                              <span className="text-sm">📥</span>
                            </button>
                            <button
                              onClick={() => sendEmailReceipt(donation.id)}
                              className="p-2 text-teal-600 hover:bg-teal-100 rounded-lg transition-colors group"
                              title="Email Receipt"
                            >
                              <span className="text-sm">✉️</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {filteredHistory.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-4xl mb-3">📭</div>
                  <p className="text-emerald-700 font-medium">No donations found</p>
                  <p className="text-sm text-emerald-500 mt-1">Try changing your filter or make your first donation!</p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Recurring Donations Tab */}
        {activeTab === "recurring" && (
          <section className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-emerald-900">Recurring Donations</h2>
                <p className="text-sm text-emerald-600">Manage your automatic monthly giving</p>
              </div>
              <div className="text-xs text-emerald-500 bg-emerald-50 px-3 py-1.5 rounded-full">
                🔄 Auto-charged · Secure & Flexible
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {plans.map((plan) => {
                const statusConfig = getPlanStatusConfig(plan.status);
                
                return (
                  <div
                    key={plan.id}
                    className="bg-gradient-to-br from-white to-emerald-50 border border-emerald-100 rounded-2xl p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-emerald-900 text-sm mb-1">{plan.title}</h3>
                        <p className="text-xs text-emerald-600 mb-2">{plan.info}</p>
                      </div>
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusConfig.color}`}>
                        <span>{statusConfig.icon}</span>
                        {plan.status}
                      </span>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-xs">
                        <span className="text-emerald-600">Next Charge:</span>
                        <span className="font-medium text-emerald-900">{plan.nextCharge}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-emerald-600">Amount:</span>
                        <span className="font-bold text-emerald-900">QAR {plan.amount}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {plan.status !== "Cancelled" ? (
                        <>
                          {plan.status === "Active" && (
                            <button 
                              onClick={() => handlePlanAction(plan.id, "pause")}
                              className="px-3 py-1.5 text-xs rounded-full border border-amber-300 text-amber-700 hover:bg-amber-50 transition-colors flex items-center gap-1"
                            >
                              ⏸️ Pause
                            </button>
                          )}
                          {plan.status === "Paused" && (
                            <button 
                              onClick={() => handlePlanAction(plan.id, "resume")}
                              className="px-3 py-1.5 text-xs rounded-full border border-emerald-300 text-emerald-700 hover:bg-emerald-50 transition-colors flex items-center gap-1"
                            >
                              ▶️ Resume
                            </button>
                          )}
                          <button 
                            onClick={() => handlePlanAction(plan.id, "edit")}
                            className="px-3 py-1.5 text-xs rounded-full border border-blue-300 text-blue-700 hover:bg-blue-50 transition-colors flex items-center gap-1"
                          >
                            ✏️ Edit
                          </button>
                          <button 
                            onClick={() => handlePlanAction(plan.id, "cancel")}
                            className="px-3 py-1.5 text-xs rounded-full border border-rose-300 text-rose-700 hover:bg-rose-50 transition-colors flex items-center gap-1"
                          >
                            🗑️ Cancel
                          </button>
                        </>
                      ) : (
                        <button className="px-3 py-1.5 text-xs rounded-full border border-slate-300 text-slate-600 hover:bg-slate-50">
                          Reactivate Plan
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {plans.length === 0 && (
              <div className="text-center py-12 bg-emerald-50 rounded-2xl border border-emerald-100">
                <div className="text-4xl mb-3">🔄</div>
                <p className="text-emerald-700 font-medium">No recurring donations</p>
                <p className="text-sm text-emerald-500 mt-1">Set up your first recurring donation to make a continuous impact</p>
              </div>
            )}
          </section>
        )}

        {/* Zakat & Sadaqah Tab */}
        {activeTab === "zakat" && (
          <section className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-emerald-900 mb-1">Zakat & Sadaqah Summary</h2>
              <p className="text-sm text-emerald-600">Your Islamic giving impact for this year</p>
            </div>

            {/* Summary Cards */}
            <div className="grid gap-4 md:grid-cols-3">
              <div className="bg-gradient-to-br from-emerald-500 to-teal-400 rounded-2xl p-5 text-white shadow-lg">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">☪️</span>
                  <div>
                    <h3 className="text-xs font-medium opacity-90">Total Zakat (YTD)</h3>
                    <p className="text-xl font-bold">QAR 8,750</p>
                  </div>
                </div>
                <div className="text-xs opacity-90">92% of yearly goal achieved</div>
              </div>
              
              <div className="bg-white border border-emerald-100 rounded-2xl p-5 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">❤️</span>
                  <div>
                    <h3 className="text-xs font-medium text-emerald-600">Total Sadaqah (YTD)</h3>
                    <p className="text-xl font-bold text-emerald-900">QAR 3,200</p>
                  </div>
                </div>
                <div className="text-xs text-emerald-500">Voluntary charity</div>
              </div>
              
              <div className="bg-gradient-to-br from-cyan-500 to-blue-400 rounded-2xl p-5 text-white shadow-lg">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">📈</span>
                  <div>
                    <h3 className="text-xs font-medium opacity-90">Zakat Progress</h3>
                    <p className="text-xl font-bold">92% Complete</p>
                  </div>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2 mt-2">
                  <div className="bg-white h-2 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
            </div>

            {/* Breakdown */}
            <div>
              <h3 className="text-sm font-semibold text-emerald-900 mb-3">Breakdown by Category</h3>
              <div className="space-y-3">
                {[
                  { label: "Health", value: "QAR 3,000", percentage: 34, icon: "🏥" },
                  { label: "Education", value: "QAR 4,200", percentage: 48, icon: "📚" },
                  { label: "Relief & Emergencies", value: "QAR 2,750", percentage: 31, icon: "🆘" },
                  { label: "Orphans", value: "QAR 1,000", percentage: 11, icon: "👧🏽" }
                ].map((category, index) => (
                  <div
                    key={category.label}
                    className="flex items-center justify-between bg-white border border-emerald-100 rounded-2xl px-4 py-3 hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{category.icon}</span>
                      <div>
                        <div className="text-sm font-medium text-emerald-900">{category.label}</div>
                        <div className="text-xs text-emerald-500">{category.percentage}% of total</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-emerald-900">{category.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Impact Summary */}
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-5 border border-emerald-100">
              <h3 className="text-sm font-semibold text-emerald-900 mb-3">Your Impact Summary</h3>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-white rounded-xl p-3 shadow-sm">
                  <div className="text-2xl mb-1">🎓</div>
                  <div className="text-xs text-emerald-600">Students Supported</div>
                  <div className="font-bold text-emerald-900">12</div>
                </div>
                <div className="bg-white rounded-xl p-3 shadow-sm">
                  <div className="text-2xl mb-1">👨‍👩‍👧‍👦</div>
                  <div className="text-xs text-emerald-600">Families Helped</div>
                  <div className="font-bold text-emerald-900">8</div>
                </div>
                <div className="bg-white rounded-xl p-3 shadow-sm">
                  <div className="text-2xl mb-1">🏥</div>
                  <div className="text-xs text-emerald-600">Medical Treatments</div>
                  <div className="font-bold text-emerald-900">15</div>
                </div>
                <div className="bg-white rounded-xl p-3 shadow-sm">
                  <div className="text-2xl mb-1">🕌</div>
                  <div className="text-xs text-emerald-600">Community Projects</div>
                  <div className="font-bold text-emerald-900">3</div>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default DonationTabsContent;