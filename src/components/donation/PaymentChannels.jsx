import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const initialRows = [
  { id: "STMT-23201", bank: "QNB", date: "2025-11-01", amount: 25000, matched: true },
  { id: "STMT-23218", bank: "Masraf Al Rayan", date: "2025-11-02", amount: 8500, matched: false },
  { id: "STMT-23233", bank: "QIB", date: "2025-11-02", amount: 12750, matched: true },
];

export default function BankReconciliation() {
  const [rows, setRows] = useState(initialRows);
  useEffect(() => { AOS.init({ duration: 550, once: true }); }, []);

  const toggleMatch = (id) => setRows((p) => p.map((r) => (r.id === id ? { ...r, matched: !r.matched } : r)));
  const deleteRow = (id) => { if (!window.confirm("Delete this statement?")) return; setRows((p) => p.filter((r) => r.id !== id)); };
  const importStatement = () => window.alert("API import functionality");

  return (
    <section className="mb-6" data-aos="fade-up">
      <div className="mx-auto max-w-7xl rounded-3xl border border-emerald-200 bg-white shadow-2xl">
        {/* Header */}
        <div className="rounded-t-3xl bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-emerald-100">Bank Reconciliation</p>
              <h2 className="text-2xl font-bold text-white mt-1">Match Donations with Bank Statements</h2>
            </div>
            <div className="flex gap-3">
              <button onClick={importStatement} className="rounded-2xl bg-white px-6 py-3 font-semibold text-emerald-700 shadow-lg hover:bg-emerald-50 transition-all">
                Import Statement
              </button>
              <button className="rounded-2xl border border-emerald-300 bg-emerald-500/20 px-6 py-3 font-semibold text-white hover:bg-emerald-500/30 transition-all">
                Configure APIs
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="p-6">
          <div className="overflow-x-auto rounded-2xl border border-emerald-100 bg-white">
            <table className="w-full min-w-[720px] text-sm">
              <thead className="bg-gradient-to-r from-emerald-50 to-teal-50">
                <tr className="text-emerald-800">
                  {["Statement ID", "Bank", "Date", "Amount (QAR)", "Status", "Actions"].map((h) => (
                    <th key={h} className="px-6 py-4 text-left font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id} className="border-t border-emerald-50 hover:bg-emerald-50/30 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-800">{r.id}</td>
                    <td className="px-6 py-4 text-slate-700">{r.bank}</td>
                    <td className="px-6 py-4 text-slate-700">{r.date}</td>
                    <td className="px-6 py-4 font-bold text-emerald-600">{r.amount.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={`rounded-2xl px-4 py-2 text-xs font-semibold ${
                        r.matched ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                      }`}>
                        {r.matched ? "✅ Matched" : "⚠️ Needs Review"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button onClick={() => toggleMatch(r.id)} className="rounded-xl bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-200 transition-all">
                          Toggle
                        </button>
                        <button onClick={() => deleteRow(r.id)} className="rounded-xl bg-rose-100 px-4 py-2 text-sm font-semibold text-rose-700 hover:bg-rose-200 transition-all">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}