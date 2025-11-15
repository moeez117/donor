// src/components/admin/AdminPanels.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Pie, Line } from "react-chartjs-2";
import { 
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import { Eye, Download, Filter, Calendar } from "lucide-react";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
);

const fmt = new Intl.NumberFormat("en-US", { maximumFractionDigits: 1 });

export default function AdminPanels({ range, dupPrevented = 0 }) {
  const [ticker, setTicker] = useState([
    { id: 1, donor: "Anonymous", qAR: 1965, campaign: "Food Relief", method: "Card", at: "2s ago", avatar: "🕶️" },
    { id: 2, donor: "Doha Corp", qAR: 1305, campaign: "Education Kits", method: "Bank", at: "5s ago", avatar: "🏢" },
    { id: 3, donor: "Aisha", qAR: 855, campaign: "Medical Aid", method: "Wallet", at: "8s ago", avatar: "👩" },
  ]);
  
  const [hoverDay, setHoverDay] = useState(null);
  const [hoverMethod, setHoverMethod] = useState(null);
  const [viewMode, setViewMode] = useState("grid");

  const approvals = [
    { id: "C-8421", charity: "Q Relief", goal: 120000, category: "Health", ageH: 5, urgency: "high" },
    { id: "C-8427", charity: "Hope Org", goal: 80000, category: "Education", ageH: 18, urgency: "medium" },
    { id: "C-8450", charity: "Doha Aid", goal: 150000, category: "Relief", ageH: 36, urgency: "low" },
  ];

  const alerts = [
    { id: "A-1092", level: "high", amount: 250000, donorType: "Corporate", reason: "Unusual large single donation", campaign: "Emergency Relief" },
    { id: "A-1101", level: "medium", amount: 18500, donorType: "Individual", reason: "Multiple micro-payments", campaign: "Medical Aid" },
    { id: "A-1114", level: "low", amount: 4200, donorType: "Individual", reason: "Cross-border pattern", campaign: "Education Kits" },
  ];

  const sandi = useMemo(
    () => ({ 
      unique: 12650, 
      inside: 11820, 
      outside: 830, 
      lastSync: "Today · 02:15 PM", 
      dupPrevented,
      trend: 12.5 
    }),
    [dupPrevented]
  );

  useEffect(() => {
    const id = setInterval(() => {
      const donors = ["Anonymous", "Fatima", "Omar", "Doha Corp", "Khalid", "Layla"];
      const avatars = ["🕶️", "👩", "👨", "🏢", "👳", "🧕"];
      const camps = ["Food Relief", "Education Kits", "Medical Aid", "Clean Water", "Shelter"];
      const methods = ["Card", "Bank", "Wallet", "QR"];
      
      setTicker((t) => [
        {
          id: Date.now(),
          donor: donors[Math.floor(Math.random() * donors.length)],
          avatar: avatars[Math.floor(Math.random() * avatars.length)],
          qAR: Math.floor(250 + Math.random() * 1800),
          campaign: camps[Math.floor(Math.random() * camps.length)],
          method: methods[Math.floor(Math.random() * methods.length)],
          at: "just now",
        },
        ...t.slice(0, 7)
      ]);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  const onReview = (id, type) => {
    alert(`Review ${type}: ${id}`);
  };

  const onExport = (type) => {
    alert(`Exporting ${type} data...`);
  };

  const pieData = {
    labels: ["Card", "Bank Transfer", "Digital Wallet", "QR Code"],
    datasets: [
      {
        data: [55, 25, 15, 5],
        backgroundColor: ["#059669", "#10b981", "#34d399", "#6ee7b7"],
        borderWidth: 0,
        hoverOffset: 8,
      },
    ],
  };

  const pieOptions = {
    plugins: {
      legend: { 
        position: "bottom", 
        labels: { 
          boxWidth: 12, 
          font: { size: 10 },
          usePointStyle: true,
        } 
      },
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.label}: ${ctx.parsed}%`,
        },
      },
    },
    cutout: "60%",
  };

  const lineData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Donations (QAR)",
        data: [120000, 150000, 170000, 160000, 210000, 200000, 250000],
        borderColor: "#059669",
        backgroundColor: "rgba(5,150,105,0.12)",
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: "#059669",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => `QAR ${ctx.parsed.y.toLocaleString()}`,
        },
      },
    },
    scales: {
      y: { 
        ticks: { callback: (v) => `${v / 1000}k` }, 
        grid: { color: "#f1f5f9" } 
      },
      x: { grid: { display: false } },
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
  };

  return (
    <div className="grid gap-6 xl:grid-cols-3">
      <div className="grid gap-6 xl:col-span-2">
        <Card 
          title="Live Donations" 
          badge={`${ticker.length} live`}
          onExport={() => onExport("donations")}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        >
          <Ticker rows={ticker} />
        </Card>
        
        <Card 
          title="Beneficiaries & Sandi Overview" 
          badge="Real-time"
          onExport={() => onExport("beneficiaries")}
        >
          <SandiOverview data={sandi} range={range} />
        </Card>
        
        <Card 
          title="Weekly Donation Trend"
          onExport={() => onExport("trends")}
        >
          {hoverDay && (
            <div className="mb-4 p-3 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200">
              <p className="text-sm text-slate-600">
                <span className="font-semibold text-emerald-700">{hoverDay.label}</span>: 
                {" "}QAR <span className="font-black">{hoverDay.value.toLocaleString()}</span>
              </p>
            </div>
          )}
          <Line
            data={lineData}
            options={lineOptions}
            height={120}
            onHover={(_, elems) => {
              if (elems && elems.length) {
                const i = elems[0].index;
                setHoverDay({
                  label: lineData.labels[i],
                  value: lineData.datasets[0].data[i],
                });
              } else setHoverDay(null);
            }}
          />
        </Card>
      </div>

      <div className="grid gap-6">
        <Card 
          title="Approvals Queue" 
          badge={`${approvals.length} pending`}
          onExport={() => onExport("approvals")}
        >
          <Approvals rows={approvals} onReview={onReview} />
        </Card>
        
        <Card 
          title="AML Alerts" 
          badge={`${alerts.length} active`}
          onExport={() => onExport("alerts")}
        >
          <AlertList rows={alerts} onReview={onReview} />
        </Card>
        
        <Card 
          title="Donation Methods"
          onExport={() => onExport("methods")}
        >
          {hoverMethod && (
            <div className="mb-4 p-3 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200">
              <p className="text-sm text-slate-600">
                <span className="font-semibold text-emerald-700">{hoverMethod.label}</span>: 
                {" "}<span className="font-black">{hoverMethod.value}%</span> of total
              </p>
            </div>
          )}
          <div className="relative h-48">
            <Pie
              data={pieData}
              options={pieOptions}
              onHover={(_, elems) => {
                if (elems && elems.length) {
                  const i = elems[0].index;
                  setHoverMethod({
                    label: pieData.labels[i],
                    value: pieData.datasets[0].data[i],
                  });
                } else setHoverMethod(null);
              }}
            />
          </div>
        </Card>
      </div>
    </div>
  );
}

function Card({ title, children, badge, onExport, viewMode, onViewModeChange }) {
  return (
    <section className="group relative rounded-3xl border border-white/60 bg-white/80 backdrop-blur-lg shadow-xl hover:shadow-2xl transition-all duration-500">
      {/* Enhanced background effects */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/50 to-emerald-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-emerald-200/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <header className="relative flex justify-between items-center border-b border-emerald-100/50 bg-gradient-to-r from-emerald-50/80 to-teal-50/60 px-6 py-4 rounded-t-3xl">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-bold text-slate-800">{title}</h3>
          {badge && (
            <span className="rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 px-3 py-1 text-xs font-bold text-white shadow-lg shadow-emerald-500/25 animate-pulse">
              {badge}
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          {onViewModeChange && (
            <div className="flex rounded-2xl border border-emerald-200 bg-white p-1">
              {["grid", "list"].map((mode) => (
                <button
                  key={mode}
                  onClick={() => onViewModeChange(mode)}
                  className={`px-2 py-1 rounded-xl text-xs font-semibold transition-all ${
                    viewMode === mode 
                      ? "bg-emerald-600 text-white shadow-sm" 
                      : "text-slate-600 hover:text-emerald-700"
                  }`}
                >
                  {mode === "grid" ? "Grid" : "List"}
                </button>
              ))}
            </div>
          )}
          
          {onExport && (
            <button
              onClick={onExport}
              className="rounded-2xl p-2 text-slate-400 hover:bg-white hover:text-emerald-600 transition-all duration-200 hover:shadow-lg"
            >
              <Download className="w-4 h-4" />
            </button>
          )}
        </div>
      </header>
      
      <div className="relative p-6">{children}</div>
    </section>
  );
}

function Ticker({ rows }) {
  return (
    <ul className="space-y-3">
      {rows.map((t, index) => (
        <li
          key={t.id}
          className="flex items-center justify-between rounded-2xl border border-emerald-100/50 bg-white/60 p-4 shadow-sm hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 backdrop-blur-sm group"
        >
          <div className="flex items-center gap-4">
            <div className="text-2xl">{t.avatar}</div>
            <div>
              <p className="font-semibold text-slate-800">
                {t.donor} → <span className="text-emerald-700">{t.campaign}</span>
              </p>
              <p className="text-xs text-slate-500 mt-1 flex items-center gap-2">
                <span className="bg-slate-100 px-2 py-1 rounded-lg">{t.method}</span>
                <span>•</span>
                <span className="text-emerald-600 font-semibold">{t.at}</span>
              </p>
            </div>
          </div>
          <span className="text-sm font-black text-emerald-700 bg-gradient-to-r from-emerald-50 to-teal-50 px-4 py-2 rounded-xl border border-emerald-200 group-hover:scale-105 transition-transform">
            {fmt.format(t.qAR)} QAR
          </span>
        </li>
      ))}
    </ul>
  );
}

function Approvals({ rows, onReview }) {
  return (
    <ul className="space-y-4">
      {rows.map((a) => (
        <li
          key={a.id}
          className="flex items-center justify-between rounded-2xl border border-emerald-100/50 bg-white/60 p-4 shadow-sm hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 backdrop-blur-sm"
        >
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="font-semibold text-slate-800">{a.charity}</span>
              <span className={`rounded-2xl px-2 py-1 text-[10px] font-bold ${
                a.urgency === 'high' ? 'bg-rose-100 text-rose-700' :
                a.urgency === 'medium' ? 'bg-amber-100 text-amber-700' :
                'bg-emerald-100 text-emerald-700'
              }`}>
                {a.urgency}
              </span>
            </div>
            <p className="text-xs text-slate-600 mb-1">
              <span className="text-emerald-700 font-semibold">{a.category}</span> • Goal: {fmt.format(a.goal)} QAR
            </p>
            <p className="text-xs text-slate-500">
              Waiting: <span className="font-semibold">{a.ageH}h</span>
            </p>
          </div>
          <button
            className="rounded-xl border-2 border-emerald-200 bg-white px-4 py-2 text-xs font-semibold text-emerald-700 hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-200 flex items-center gap-2"
            onClick={() => onReview(a.id, "approval")}
          >
            <Eye className="w-3 h-3" />
            Review
          </button>
        </li>
      ))}
    </ul>
  );
}

function AlertList({ rows, onReview }) {
  return (
    <ul className="space-y-4">
      {rows.map((a) => (
        <li
          key={a.id}
          className="rounded-2xl border border-emerald-100/50 bg-white/60 p-4 shadow-sm hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 backdrop-blur-sm"
        >
          <div className="flex justify-between items-start mb-3">
            <span className="font-semibold text-slate-800 text-sm">
              {a.id} • {a.campaign}
            </span>
            <span className={`rounded-2xl px-3 py-1 text-[11px] font-bold ${
              a.level === 'high' ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white' :
              a.level === 'medium' ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white' :
              'bg-gradient-to-r from-emerald-500 to-teal-500 text-white'
            } shadow-lg`}>
              {a.level}
            </span>
          </div>
          
          <p className="text-slate-600 text-sm mb-3 leading-relaxed">{a.reason}</p>
          
          <div className="flex justify-between items-center">
            <span className="text-slate-500 text-xs">
              {a.donorType} • {fmt.format(a.amount)} QAR
            </span>
            <button
              className="rounded-xl border-2 border-emerald-200 bg-white px-3 py-1.5 text-xs font-semibold text-emerald-700 hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-200 flex items-center gap-1"
              onClick={() => onReview(a.id, "alert")}
            >
              <Eye className="w-3 h-3" />
              Investigate
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

function SandiOverview({ data, range }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-slate-600">
          Range: <span className="font-bold text-slate-800">{range}</span>
        </p>
        <span className="flex items-center gap-1 text-xs text-emerald-600 font-semibold bg-emerald-50 px-3 py-1 rounded-xl">
          <TrendingUp className="w-3 h-3" />
          +{data.trend}% growth
        </span>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <Stat label="Unique" v={data.unique} trend={8.2} />
        <Stat label="Inside Qatar" v={data.inside} trend={12.5} />
        <Stat label="Outside scope" v={data.outside} trend={-2.1} />
      </div>
      
      <div className="rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 p-4 border border-emerald-200">
        <p className="text-sm text-slate-700">
          Duplicates prevented via Sandi:{" "}
          <span className="font-black text-emerald-700">
            {fmt.format(data.dupPrevented)}
          </span>
        </p>
      </div>
      
      <div className="flex items-center justify-between text-xs text-slate-500 bg-slate-50 px-3 py-2 rounded-xl">
        <span>Last sync: {data.lastSync}</span>
        <button className="text-emerald-600 hover:text-emerald-700 font-semibold">
          Sync Now
        </button>
      </div>
    </div>
  );
}

const Stat = ({ label, v, trend }) => (
  <div className="rounded-2xl border border-emerald-100/50 bg-white/60 p-4 text-center shadow-sm backdrop-blur-sm hover:shadow-md transition-shadow">
    <p className="text-xs text-slate-500 font-medium mb-2">{label}</p>
    <p className="text-xl font-black text-slate-900 mb-1">
      {fmt.format(v)}
    </p>
    <p className={`text-[10px] font-semibold ${
      trend >= 0 ? 'text-emerald-600' : 'text-rose-600'
    }`}>
      {trend >= 0 ? '↗' : '↘'} {Math.abs(trend)}%
    </p>
  </div>
);

// Add missing TrendingUp icon component
function TrendingUp({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  );
}