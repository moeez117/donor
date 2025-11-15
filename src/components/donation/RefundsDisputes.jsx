import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const initialCases = [
  { id: "#RF-7781", donationId: "#DN-1007", amount: 1200, reason: "Card chargeback", status: "Under Investigation" },
  { id: "#RF-7772", donationId: "#DN-1003", amount: 500, reason: "Duplicate payment", status: "Refunded" },
  { id: "#RF-7765", donationId: "#DN-0999", amount: 5000, reason: "Compliance hold", status: "Escalated" },
];

const badgeClasses = {
  "Under Investigation": "bg-amber-100 text-amber-700 border-amber-300",
  "Refunded": "bg-emerald-100 text-emerald-700 border-emerald-300",
  "Escalated": "bg-rose-100 text-rose-700 border-rose-300",
};

export default function RefundsDisputes() {
  const [cases, setCases] = useState(initialCases);
  useEffect(() => { AOS.init({ duration: 550, once: true }); }, []);

  const updateCase = (id) => {
    const c = cases.find((x) => x.id === id);
    if (!c) return;
    const status = window.prompt("New status:", c.status);
    if (!status) return;
    setCases((prev) => prev.map((x) => (x.id === id ? { ...x, status: status.trim() } : x)));
  };

  const deleteCase = (id) => {
    if (!window.confirm("Delete this case?")) return;
    setCases((prev) => prev.filter((x) => x.id !== id));
  };

  return (
    <section className="mb-6" data-aos="fade-up">
      <div className="mx-auto max-w-7xl rounded-3xl border border-emerald-200 bg-white shadow-2xl">
        {/* Header */}
        <div className="rounded-t-3xl bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-emerald-100">Refunds & Disputes</p>
              <h2 className="text-2xl font-bold text-white mt-1">Investigate Chargebacks & High-Risk Donations</h2>
            </div>
            <button className="rounded-2xl bg-white px-6 py-3 font-semibold text-emerald-700 shadow-lg hover:bg-emerald-50 transition-all">
              New Case
            </button>
          </div>
        </div>

        {/* Cases */}
        <div className="p-6 space-y-4">
          {cases.map((c) => (
            <div key={c.id} className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm hover:shadow-md transition-all">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-4">
                  <span className="rounded-2xl bg-emerald-100 px-4 py-2 font-bold text-emerald-700">{c.id}</span>
                  <span className="text-slate-700">Donation: <span className="font-semibold text-slate-900">{c.donationId}</span></span>
                </div>
                <span className={`rounded-2xl border px-4 py-2 text-sm font-semibold ${badgeClasses[c.status]}`}>
                  {c.status}
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-6">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Reason</p>
                  <p className="text-lg font-semibold text-slate-800">{c.reason}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-600 mb-1">Amount</p>
                  <p className="text-2xl font-bold text-emerald-600">{c.amount.toLocaleString()} QAR</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
                <div className="flex gap-3">
                  <button onClick={() => updateCase(c.id)} className="rounded-xl bg-emerald-100 px-4 py-2 font-semibold text-emerald-700 hover:bg-emerald-200 transition-all">
                    Update
                  </button>
                  <button onClick={() => deleteCase(c.id)} className="rounded-xl bg-rose-100 px-4 py-2 font-semibold text-rose-700 hover:bg-rose-200 transition-all">
                    Delete
                  </button>
                </div>
                <span className="text-sm text-slate-500">Last action: demo only</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}