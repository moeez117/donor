import { useMemo, useState } from "react";
import { Download, Filter, Shield, AlertTriangle, Users, FileText, Activity } from "lucide-react";
import KpiStrip from "../../components/admin/KpiStrip";
import AdminPanels from "../../components/admin/Panels";

export default function AdminOverview() {
  const [range, setRange] = useState("MTD");
  const [exportOpen, setExportOpen] = useState(false);

  const kpis = useMemo(() => {
    const base = { donations: 12400000.4, tx: 5241, disbursed: 78.2, dupPrevented: 420 };
    
    const ranges = {
      Today: { donations: 0.01, tx: 0.02, disbursed: 65.0, dupPrevented: 0.01, deltaMult: 1 },
      MTD: { donations: 0.18, tx: 0.22, disbursed: 72.4, dupPrevented: 0.16, deltaMult: 8 },
      YTD: { donations: 1, tx: 1, disbursed: 78.2, dupPrevented: 1, deltaMult: 14 },
      "12M": { donations: 1.1, tx: 1.12, disbursed: 80.3, dupPrevented: 1.05, deltaMult: 18 }
    };

    const r = ranges[range] || ranges.MTD;
    return {
      donations: { 
        value: base.donations * r.donations, 
        delta: r.deltaMult + Math.random() * 3, 
        suffix: " QAR" 
      },
      tx: { 
        value: Math.round(base.tx * r.tx), 
        delta: r.deltaMult * 0.8 + Math.random() * 2 
      },
      disbursed: { 
        value: r.disbursed, 
        delta: (r.disbursed - 70) + Math.random() * 2, 
        suffix: "%" 
      },
      dupPrevented: { 
        value: Math.round(base.dupPrevented * r.dupPrevented), 
        delta: r.deltaMult * 0.3 + Math.random() * 1 
      },
    };
  }, [range]);

  const quickActions = [
    { 
      icon: Shield, 
      label: "Approvals Queue", 
      count: 12, 
      color: "emerald", 
      description: "Pending reviews",
      onClick: () => alert("Navigate to Approvals") 
    },
    { 
      icon: AlertTriangle, 
      label: "AML Alerts", 
      count: 8, 
      color: "rose", 
      description: "Security monitoring",
      onClick: () => alert("Navigate to AML Alerts") 
    },
    { 
      icon: Users, 
      label: "Beneficiary Map", 
      count: null, 
      color: "blue", 
      description: "Geographic view",
      onClick: () => alert("Open Beneficiary Map") 
    },
    { 
      icon: FileText, 
      label: "RACA Report", 
      count: null, 
      color: "teal", 
      description: "Monthly analysis",
      onClick: () => alert("Download RACA Report") 
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-cyan-50/30 overflow-x-hidden">
      <div className="mx-auto max-w-[1800px] px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Header */}
        <section className="relative overflow-hidden rounded-3xl border border-white/80 bg-gradient-to-br from-white/90 to-emerald-50/70 shadow-2xl shadow-emerald-200/30 backdrop-blur-xl">
          
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/10 via-teal-400/5 to-cyan-400/10" />
          <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-emerald-300/30 blur-3xl" />
          <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-cyan-300/20 blur-3xl" />

          <div className="relative p-8">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-8">

              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="h-3 w-3 rounded-full bg-emerald-500 animate-ping absolute" />
                    <div className="h-3 w-3 rounded-full bg-emerald-600 relative" />
                  </div>

                  <div>
                    <h1 className="text-4xl font-black bg-gradient-to-r from-emerald-800 via-teal-700 to-cyan-700 bg-clip-text text-transparent mb-2">
                      Admin Dashboard
                    </h1>
                    <p className="text-slate-600 text-lg max-w-2xl leading-relaxed">
                      Real-time monitoring across all campaigns, donations, Saudi beneficiaries, and compliance metrics.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-2xl px-4 py-2">
                    <Activity className="w-4 h-4 text-emerald-600 animate-pulse" />
                    <span className="text-sm font-semibold text-emerald-700">Live</span>
                  </div>
                  <span className="text-sm text-slate-500">Data updates every 30 seconds</span>
                </div>
              </div>

              {/* Right Controls */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <RangeSelector range={range} onChange={setRange} />

                <div className="flex gap-3">
                  <button className="px-6 py-3 rounded-xl border-2 border-emerald-200 bg-white text-emerald-700 font-semibold hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-200 active:scale-95 shadow-sm flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    Filter
                  </button>
                  <button
                    onClick={() => setExportOpen(true)}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 active:scale-95 shadow-lg shadow-emerald-500/25 flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Export
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Actions — FIXED GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 border-t border-emerald-100/50 pt-8">
              {quickActions.map((action) => (
                <button
                  key={action.label}
                  onClick={action.onClick}
                  className="group relative p-5 rounded-2xl bg-white/80 border border-emerald-100/50 backdrop-blur-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left"
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-2xl bg-${action.color}-100 text-${action.color}-600 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                      <action.icon className="w-6 h-6" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="font-semibold text-slate-800 text-sm truncate">{action.label}</div>
                        {action.count && (
                          <span className={`flex-shrink-0 bg-${action.color}-500 text-white text-xs font-bold px-2 py-1 rounded-full min-w-[24px] text-center`}>
                            {action.count}
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-500 truncate">{action.description}</div>
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* FIX: WRAPPED IN full-width div */}
        <div className="w-full overflow-x-hidden">
          <KpiStrip kpis={kpis} />
        </div>

        <div className="w-full overflow-x-hidden">
          <AdminPanels range={range} dupPrevented={kpis.dupPrevented.value} />
        </div>

        {exportOpen && (
          <ExportModal
            range={range}
            onClose={() => setExportOpen(false)}
            onConfirm={() => {
              console.log("Export snapshot for range:", range);
              setExportOpen(false);
            }}
          />
        )}
      </div>
    </div>
  );
}

function RangeSelector({ range, onChange }) {
  const opts = ["Today", "MTD", "YTD", "12M"];
  
  return (
    <div className="relative inline-flex rounded-2xl border-2 border-emerald-100 bg-white p-1.5 shadow-lg shadow-emerald-500/10 backdrop-blur-sm">
      {opts.map((o) => (
        <button
          key={o}
          onClick={() => onChange(o)}
          className={`relative px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 min-w-[70px] text-center ${
            range === o 
              ? "text-white" 
              : "text-slate-600 hover:text-emerald-700 hover:bg-emerald-50"
          }`}
        >
          {range === o && (
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 shadow-lg shadow-emerald-500/25" />
          )}
          <span className="relative z-10">{o}</span>
        </button>
      ))}
    </div>
  );
}

function ExportModal({ range, onClose, onConfirm }) {
  const [format, setFormat] = useState("pdf");
  const [includeCharts, setIncludeCharts] = useState(true);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md rounded-3xl border border-white/20 bg-white/95 p-8 shadow-2xl shadow-black/30 backdrop-blur-xl">

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900">Export Dashboard</h2>
          <button
            onClick={onClose}
            className="rounded-2xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
          >
            ✕
          </button>
        </div>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              Time Range
            </label>
            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200">
              <span className="font-bold text-emerald-700">{range}</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              Format
            </label>
            <div className="grid grid-cols-2 gap-3">
              {["pdf", "excel", "csv", "json"].map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => setFormat(fmt)}
                  className={`p-3 rounded-xl border-2 text-sm font-semibold transition-all ${
                    format === fmt
                      ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                      : "border-slate-200 text-slate-600 hover:border-emerald-300"
                  }`}
                >
                  {fmt.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:border-emerald-300 transition-colors">
            <input
              type="checkbox"
              checked={includeCharts}
              onChange={(e) => setIncludeCharts(e.target.checked)}
              className="w-4 h-4 text-emerald-600 rounded"
            />
            <span className="text-sm font-semibold text-slate-700">Include charts and graphs</span>
          </label>
        </div>
        
        <div className="flex gap-3 mt-8">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border-2 border-slate-200 px-4 py-3 font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-3 font-semibold text-white shadow-lg shadow-emerald-500/25 hover:from-emerald-700 hover:to-teal-700 transition-all flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export Now
          </button>
        </div>
      </div>
    </div>
  );
}
