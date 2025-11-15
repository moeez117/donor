import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FiTrash2, FiEdit3 } from "react-icons/fi";

const initialDonations = [
  { id: "#DN-1023", donorType: "Individual", amount: "2500", campaign: "Emergency Medical Aid", method: "Card", status: "Completed", channel: "Web", country: "Qatar" },
  { id: "#DN-1019", donorType: "Corporate", amount: "50000", campaign: "Education for All", method: "Bank Transfer", status: "Pending", channel: "Mobile", country: "Qatar" },
  { id: "#DN-1011", donorType: "Individual", amount: "750", campaign: "Food Relief", method: "QR Code", status: "Failed", channel: "Field Staff", country: "Qatar" },
];

const statusClasses = {
  Completed: "bg-emerald-500/10 text-emerald-700 border-emerald-400",
  Pending: "bg-amber-500/10 text-amber-700 border-amber-400",
  Failed: "bg-rose-500/10 text-rose-700 border-rose-400",
};

export default function AllDonations() {
  const [donations, setDonations] = useState(initialDonations);
  useEffect(() => { AOS.init({ duration: 550, once: true }); }, []);

  const handleEdit = (id) => {
    const row = donations.find((d) => d.id === id);
    if (!row) return;
    const amount = window.prompt("New amount (QAR):", row.amount);
    if (!amount) return;
    const status = window.prompt("New status (Completed / Pending / Failed):", row.status);
    if (!status) return;
    setDonations((prev) => prev.map((d) => d.id === id ? { ...d, amount: amount.trim(), status: status.trim() } : d));
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this donation?")) return;
    setDonations((prev) => prev.filter((d) => d.id !== id));
  };

  const total = donations.reduce((s, d) => s + Number(d.amount || 0), 0);

  return (
    <section className="mb-6" data-aos="fade-up">
      <div className="mx-auto max-w-7xl rounded-3xl border border-emerald-200 bg-white shadow-2xl">
        {/* Header */}
        <div className="rounded-t-3xl bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-emerald-100">Donations & Transactions</p>
              <h2 className="text-2xl font-bold text-white mt-1">All Donations Overview</h2>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-2 rounded-full bg-emerald-500/30 px-4 py-2 text-sm font-medium text-white">
                <span className="h-2 w-2 rounded-full bg-emerald-200" />
                Real-time Sync
              </span>
              <button className="rounded-2xl bg-white px-6 py-3 font-semibold text-emerald-700 shadow-lg hover:bg-emerald-50 transition-all">
                Export CSV
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 border-b border-emerald-100 bg-emerald-50/50 px-8 py-4">
          {["Date: Last 30 days", "Charity: All", "Campaign: Any", "Channel: All"].map((f) => (
            <button key={f} className="rounded-2xl border border-emerald-200 bg-white px-4 py-2 text-sm text-emerald-700 hover:bg-emerald-50 transition-all">
              {f}
            </button>
          ))}
          <button className="ml-auto rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
            Reset
          </button>
        </div>

        {/* Table */}
        <div className="p-6">
          <div className="overflow-x-auto rounded-2xl border border-emerald-100 bg-white">
            <table className="w-full min-w-[880px] text-sm">
              <thead className="bg-gradient-to-r from-emerald-50 to-teal-50">
                <tr className="text-emerald-800">
                  {["Donation ID", "Donor Type", "Campaign", "Amount (QAR)", "Method", "Channel", "Country", "Status", "Actions"].map((h) => (
                    <th key={h} className="px-6 py-4 text-left font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {donations.map((d, i) => (
                  <tr key={d.id} className="border-t border-emerald-50 hover:bg-emerald-50/30 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-800">
                      {d.id}
                      <span className="ml-2 rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-600">#{i + 1}</span>
                    </td>
                    <td className="px-6 py-4 text-slate-700">{d.donorType}</td>
                    <td className="px-6 py-4 font-medium text-emerald-700">{d.campaign}</td>
                    <td className="px-6 py-4 font-bold text-emerald-600">{Number(d.amount).toLocaleString()}</td>
                    <td className="px-6 py-4 text-slate-700">{d.method}</td>
                    <td className="px-6 py-4 text-slate-700">{d.channel}</td>
                    <td className="px-6 py-4 text-slate-700">{d.country}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-2 rounded-2xl border px-3 py-2 text-xs font-semibold ${statusClasses[d.status]}`}>
                        <span className="h-2 w-2 rounded-full bg-current" />
                        {d.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button onClick={() => handleEdit(d.id)} className="rounded-xl bg-emerald-100 p-2 text-emerald-700 hover:bg-emerald-200 transition-all">
                          <FiEdit3 size={16} />
                        </button>
                        <button onClick={() => handleDelete(d.id)} className="rounded-xl bg-rose-100 p-2 text-rose-700 hover:bg-rose-200 transition-all">
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <p className="text-slate-600">Showing <span className="font-semibold text-slate-800">{donations.length}</span> donations</p>
            <div className="flex items-center gap-4">
              <span className="rounded-2xl bg-emerald-100 px-4 py-2 font-bold text-emerald-700">
                Total: {total.toLocaleString()} QAR
              </span>
              <button className="rounded-2xl border border-emerald-300 bg-white px-6 py-2 font-semibold text-emerald-700 hover:bg-emerald-50 transition-all">
                Next →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}