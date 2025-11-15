import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const licenses = [
  { id: 1, charity: "Qatar Relief Foundation", type: "Main License", expiry: "2026-01-10", daysLeft: 420, status: "Valid" },
  { id: 2, charity: "Hope for Education", type: "Education Permit", expiry: "2025-12-01", daysLeft: 365, status: "Valid" },
  { id: 3, charity: "Health & Care Society", type: "Medical Aid License", expiry: "2025-03-20", daysLeft: 50, status: "Expiring Soon" },
  { id: 4, charity: "Gulf Food Aid", type: "Food Distribution", expiry: "2025-02-01", daysLeft: 10, status: "Urgent" },
];

export default function LicensesDocuments() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedLicense, setSelectedLicense] = useState(null);
  useEffect(() => {
    AOS.init({ duration: 550, once: true });
  }, []);

  const filtered = licenses.filter(
    (l) =>
      l.charity.toLowerCase().includes(query.toLowerCase()) &&
      (filter === "All" || l.status === filter)
  );

  const viewDocuments = (license) => {
    setSelectedLicense(license);
    alert(
      `License Documents for ${license.charity}:\n\n• ${license.type}\n• Expiry: ${license.expiry}\n• Status: ${license.status}\n• Documents Available:\n  - License Certificate\n  - Renewal Application\n  - Compliance Checklist\n  - Audit Reports`
    );
  };

  const sendReminder = (license) => {
    alert(
      `Reminder sent to ${license.charity} about license expiry in ${license.daysLeft} days.`
    );
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-amber-50/20 to-emerald-50/20 p-4 sm:p-6 overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="rounded-3xl border border-white/80 bg-white/80 shadow-2xl shadow-emerald-200/20 backdrop-blur-xl">
          <div className="rounded-t-3xl bg-gradient-to-r from-emerald-600 to-teal-600 p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-6">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white">
                  Licenses & Documents
                </h1>
                <p className="text-emerald-100 mt-1 sm:mt-2 text-sm sm:text-base">
                  Monitor license expiries and compliance status
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full lg:w-auto">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search charities..."
                  className="w-full sm:w-64 bg-white/20 text-white placeholder-emerald-100 rounded-2xl px-4 py-2 border border-white/30 focus:outline-none focus:border-white text-sm"
                />
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="w-full sm:w-auto bg-white/20 text-white rounded-2xl px-4 py-2 border border-white/30 text-sm"
                >
                  <option value="All">All Status</option>
                  <option value="Valid">Valid</option>
                  <option value="Expiring Soon">Expiring Soon</option>
                  <option value="Urgent">Urgent</option>
                </select>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-6 lg:p-8">
            <div className="grid gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-2">
              {filtered.map((license, i) => (
                <div
                  key={license.id}
                  className="bg-white rounded-2xl border border-emerald-100 p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all"
                >
                  <div className="flex items-start justify-between mb-3 sm:mb-4 gap-3">
                    <div className="min-w-0">
                      <h3 className="text-lg sm:text-xl font-bold text-slate-800 break-words">
                        {license.charity}
                      </h3>
                      <p className="text-slate-600 text-sm sm:text-base">
                        {license.type}
                      </p>
                    </div>
                    <div
                      className={`px-3 py-1 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap ${
                        license.status === "Valid"
                          ? "bg-emerald-100 text-emerald-700"
                          : license.status === "Expiring Soon"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-rose-100 text-rose-700"
                      }`}
                    >
                      {license.status}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4 sm:mb-6 text-sm">
                    <div>
                      <div className="text-xs sm:text-sm text-slate-600">
                        Expiry Date
                      </div>
                      <div className="font-semibold text-slate-800 text-sm sm:text-base">
                        {license.expiry}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm text-slate-600">
                        Days Remaining
                      </div>
                      <div
                        className={`text-lg sm:text-xl font-bold ${
                          license.daysLeft > 90
                            ? "text-emerald-600"
                            : license.daysLeft > 30
                            ? "text-amber-600"
                            : "text-rose-600"
                        }`}
                      >
                        {license.daysLeft} days
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    <button
                      onClick={() => viewDocuments(license)}
                      className="flex-1 bg-emerald-600 text-white py-2.5 sm:py-3 rounded-xl text-sm sm:text-base font-semibold hover:bg-emerald-700 transition-all"
                    >
                      View Documents
                    </button>
                    {license.daysLeft <= 60 && (
                      <button
                        onClick={() => sendReminder(license)}
                        className="px-4 sm:px-6 py-2.5 sm:py-3 bg-amber-500 text-white rounded-xl text-sm sm:text-base font-semibold hover:bg-amber-600 transition-all"
                      >
                        Remind
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {filtered.length === 0 && (
                <div className="col-span-full text-center py-10 sm:py-12 text-slate-500 text-sm sm:text-base">
                  No licenses match your search or filters.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
