import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const initialCharities = [
  { id: 1, name: "Qatar Relief Foundation", sector: "Emergency Relief", status: "Active", lastAudit: "2025-07-10", contact: "contact@qrf.org" },
  { id: 2, name: "Hope for Education", sector: "Education", status: "Under Review", lastAudit: "2025-05-02", contact: "info@hopedu.org" },
  { id: 3, name: "Health & Care Society", sector: "Health", status: "Suspended", lastAudit: "2024-12-20", contact: "admin@healthcare.org" },
  { id: 4, name: "Gulf Food Aid", sector: "Food Security", status: "Active", lastAudit: "2025-01-14", contact: "support@gfa.org" },
];

export default function CharityDirectory() {
  const [filter, setFilter] = useState("All");
  const [charities, setCharities] = useState(initialCharities);
  const [selectedCharity, setSelectedCharity] = useState(null);
  useEffect(() => { AOS.init({ duration: 550, once: true }); }, []);

  const visible = filter === "All" ? charities : charities.filter((c) => c.status === filter);

  const toggleStatus = (id) => {
    setCharities((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              status:
                c.status === "Suspended"
                  ? "Active"
                  : c.status === "Active"
                  ? "Under Review"
                  : "Suspended",
            }
          : c
      )
    );
  };

  const viewDocuments = (charity) => {
    setSelectedCharity(charity);
    alert(
      `Opening documents for: ${charity.name}\n\nAvailable Documents:\n• Registration Certificate\n• Financial Statements\n• Audit Reports\n• Compliance Documents`
    );
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/30 p-4 sm:p-6 overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="rounded-3xl border border-white/80 bg-white/80 shadow-2xl shadow-emerald-200/20 backdrop-blur-xl">
          <div className="rounded-t-3xl bg-gradient-to-r from-emerald-600 to-teal-600 p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-6">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white">
                  Charity Directory
                </h1>
                <p className="text-emerald-100 mt-1 sm:mt-2 text-sm sm:text-base">
                  Manage all registered organizations and their status
                </p>
              </div>
              <div className="flex gap-2 sm:gap-3 flex-wrap">
                {["All", "Active", "Under Review", "Suspended"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setFilter(s)}
                    className={`px-4 sm:px-6 py-2 sm:py-3 rounded-2xl text-sm sm:text-base font-semibold transition-all ${
                      filter === s
                        ? "bg-white text-emerald-700 shadow-lg"
                        : "bg-emerald-500/20 text-white hover:bg-emerald-500/30"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-6 lg:p-8">
            <div className="grid gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
              {visible.map((charity) => (
                <div
                  key={charity.id}
                  className="bg-white rounded-2xl border border-emerald-100 p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all group"
                >
                  <div className="flex items-start justify-between mb-3 sm:mb-4 gap-3">
                    <div className="min-w-0">
                      <h3 className="text-lg sm:text-xl font-bold text-slate-800 break-words">
                        {charity.name}
                      </h3>
                      <p className="text-slate-600 mt-1 text-sm sm:text-base">
                        {charity.sector}
                      </p>
                    </div>
                    <span
                      className={`px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap ${
                        charity.status === "Active"
                          ? "bg-emerald-100 text-emerald-700"
                          : charity.status === "Under Review"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-rose-100 text-rose-700"
                      }`}
                    >
                      {charity.status}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs sm:text-sm text-slate-600 mb-4 sm:mb-6">
                    <div className="flex items-center justify-between gap-2">
                      <span>Last Audit:</span>
                      <span className="font-semibold text-right">
                        {charity.lastAudit}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <span>Contact:</span>
                      <span className="font-semibold text-emerald-600 break-all text-right">
                        {charity.contact}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2 sm:gap-3">
                    <button
                      onClick={() => viewDocuments(charity)}
                      className="flex-1 bg-emerald-600 text-white py-2.5 sm:py-3 rounded-xl text-sm sm:text-base font-semibold hover:bg-emerald-700 transition-all"
                    >
                      View Docs
                    </button>
                    <button
                      onClick={() => toggleStatus(charity.id)}
                      className="px-3 sm:px-4 py-2 border border-emerald-300 text-emerald-700 rounded-xl hover:bg-emerald-50 transition-all text-lg sm:text-xl"
                    >
                      ↻
                    </button>
                  </div>
                </div>
              ))}

              {visible.length === 0 && (
                <div className="col-span-full text-center py-10 text-slate-500">
                  <p className="text-base sm:text-lg font-semibold">
                    No charities found for this filter
                  </p>
                  <p className="text-xs sm:text-sm mt-1">
                    Try selecting a different status.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
