// src/components/admin/KpiStrip.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { TrendingUp, TrendingDown, MoreVertical } from "lucide-react";

const DEFAULT_KPIS = {
  donations:    { value: 0, delta: 0, suffix: " QAR" },
  tx:           { value: 0, delta: 0, suffix: "" },
  disbursed:    { value: 0, delta: 0, suffix: "%" },
  dupPrevented: { value: 0, delta: 0, suffix: "" },
};

const fmt = new Intl.NumberFormat("en-US", { maximumFractionDigits: 1 });

export default function KpiStrip({ kpis = DEFAULT_KPIS }) {
  const [detail, setDetail] = useState(null);
  const [hoveredKpi, setHoveredKpi] = useState(null);

  const d   = kpis?.donations    ?? DEFAULT_KPIS.donations;
  const tx  = kpis?.tx           ?? DEFAULT_KPIS.tx;
  const dis = kpis?.disbursed    ?? DEFAULT_KPIS.disbursed;
  const dup = kpis?.dupPrevented ?? DEFAULT_KPIS.dupPrevented;

  const items = useMemo(
    () => [
      { 
        key: "donations", 
        title: "Total Donations", 
        subtitle: "All campaigns",
        icon: <CoinIcon />, 
        ...d 
      },
      { 
        key: "tx",        
        title: "Transactions",    
        subtitle: "Successful payments",
        icon: <TxIcon />,   
        ...tx 
      },
      { 
        key: "disbursed", 
        title: "% Disbursed",     
        subtitle: "To beneficiaries",
        icon: <SendIcon />, 
        ...dis 
      },
      { 
        key: "dup",       
        title: "Duplicates Prevented", 
        subtitle: "Sandi verification",
        icon: <ShieldIcon />, 
        ...dup 
      },
    ],
    [d, tx, dis, dup]
  );

  return (
    <section className="space-y-4">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Performance Overview</h2>
          <p className="text-slate-500 mt-1">Real-time metrics across all charitable activities</p>
        </div>
        <div className="flex items-center gap-2 text-slate-500">
          <span className="text-sm">Live</span>
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
        </div>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((it) => (
          <StatTile
            key={it.key}
            {...it}
            isHovered={hoveredKpi === it.key}
            onHover={() => setHoveredKpi(it.key)}
            onLeave={() => setHoveredKpi(null)}
            onClick={() => setDetail({
              key: it.key,
              title: it.title,
              value: it.value,
              suffix: it.suffix,
              delta: it.delta,
            })}
          />
        ))}
      </div>

      {detail && <DetailModal detail={detail} onClose={() => setDetail(null)} />}
    </section>
  );
}

function StatTile({ title, subtitle, value, delta = 0, suffix = "", icon, onClick, onHover, onLeave, isHovered }) {
  const up = delta >= 0;
  const display = useCountUp(value, 1200);

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={[
        "group relative overflow-hidden rounded-3xl text-left",
        "border border-white/60 bg-white/80 backdrop-blur-lg",
        "shadow-xl hover:shadow-2xl transition-all duration-500",
        "min-h-[180px] p-6 w-full transform",
        isHovered ? "-translate-y-2 scale-[1.02]" : "hover:-translate-y-1"
      ].join(" ")}
    >
      {/* Enhanced gradient background */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-50/80 via-teal-50/60 to-cyan-50/40 opacity-60" />
      
      {/* Animated glow effect */}
      <div className={`pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-emerald-200/30 blur-3xl transition-opacity duration-500 ${
        isHovered ? 'opacity-100' : 'opacity-40'
      }`} />
      
      {/* Shine animation */}
      <div className="pointer-events-none absolute -left-1/3 top-0 h-full w-1/3 rotate-12 bg-white/70 blur-xl opacity-0 group-hover:opacity-80 transition-opacity duration-1000" />

      {/* Header with icon and menu */}
      <div className="relative flex items-start justify-between mb-4">
        <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-100 text-emerald-800 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl">
          {icon}
        </div>
        <button className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-1 hover:bg-slate-100 rounded-lg">
          <MoreVertical className="w-4 h-4 text-slate-400" />
        </button>
      </div>

      {/* Delta badge */}
      <div className="relative mb-2">
        <span
          className={[
            "inline-flex items-center gap-1 rounded-2xl px-3 py-1.5 text-xs font-bold shadow-lg transition-transform duration-300",
            up 
              ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white" 
              : "bg-gradient-to-r from-rose-500 to-pink-500 text-white",
            "group-hover:scale-105",
          ].join(" ")}
        >
          {up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {Math.abs(delta).toFixed(1)}%
        </span>
      </div>

      {/* Title and value */}
      <div className="relative">
        <div className="text-slate-500 text-sm font-medium mb-1">{title}</div>
        <div className="text-slate-400 text-xs mb-3">{subtitle}</div>
        <div className="text-3xl font-black tracking-tight text-slate-900">
          {fmt.format(display)}
          {suffix && <span className="text-xl">{suffix}</span>}
        </div>
      </div>

      {/* Enhanced bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1.5">
        <div className={`h-full w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 opacity-60 group-hover:opacity-100 transition-all duration-500 ${
          isHovered ? 'opacity-100' : ''
        }`} />
      </div>
    </button>
  );
}

function useCountUp(target = 0, duration = 900) {
  const [val, setVal] = useState(0);
  const startRef = useRef(null);
  const fromRef = useRef(0);
  const toRef = useRef(target);

  useEffect(() => {
    fromRef.current = val;
    toRef.current = target;
    startRef.current = null;

    let raf;
    const step = (ts) => {
      if (!startRef.current) startRef.current = ts;
      const p = Math.min(1, (ts - startRef.current) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(fromRef.current + (toRef.current - fromRef.current) * eased);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);

  return val;
}

function DetailModal({ detail, onClose }) {
  const [timeRange, setTimeRange] = useState("30d");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-2xl rounded-3xl border border-white/20 bg-white/95 p-8 shadow-2xl shadow-black/20 backdrop-blur-xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-slate-900">{detail.title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
          >
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="col-span-2 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 p-6 border border-emerald-200">
            <div className="text-sm text-slate-600 mb-2">Current Value</div>
            <div className="text-3xl font-black text-emerald-800">
              {fmt.format(detail.value)}
              {detail.suffix}
            </div>
            <div className={`flex items-center gap-1 mt-2 text-sm font-semibold ${
              detail.delta >= 0 ? 'text-emerald-600' : 'text-rose-600'
            }`}>
              {detail.delta >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              {Math.abs(detail.delta).toFixed(1)}% from previous period
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="text-sm font-semibold text-slate-700">Time Range</div>
            <select 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 p-6">
          <div className="text-sm font-semibold text-slate-700 mb-4">Performance Breakdown</div>
          <div className="space-y-3 text-sm text-slate-600">
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span>Average Daily</span>
              <span className="font-semibold text-slate-800">
                {fmt.format(detail.value * 0.03)}{detail.suffix}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span>Peak Performance</span>
              <span className="font-semibold text-slate-800">
                {fmt.format(detail.value * 1.2)}{detail.suffix}
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span>Forecast Next Period</span>
              <span className="font-semibold text-emerald-700">
                {fmt.format(detail.value * 1.08)}{detail.suffix}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CoinIcon() {
  return (
    <svg className="h-6 w-6 text-emerald-800" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 3C7 3 3 5 3 8v8c0 3 4 5 9 5s9-2 9-5V8c0-3-4-5-9-5zm0 2c4.4 0 7 1.7 7 3s-2.6 3-7 3-7-1.7-7-3 2.6-3 7-3zm0 14c-4.4 0-7-1.7-7-3V9.9c1.6 1.2 4.2 1.9 7 1.9s5.4-.7 7-1.9V16c0 1.3-2.6 3-7 3z" />
    </svg>
  );
}

function TxIcon() {
  return (
    <svg className="h-6 w-6 text-emerald-800" viewBox="0 0 24 24" fill="currentColor">
      <path d="M4 4h7v4H4zM13 16h7v4h-7z" />
      <path d="M20 8l-3 3-3-3M7 16l3-3 3 3" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg className="h-6 w-6 text-emerald-800" viewBox="0 0 24 24" fill="currentColor">
      <path d="M2 21l21-9L2 3v7l15 2-15 2z" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg className="h-6 w-6 text-emerald-800" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l8 4v6c0 5-4 8-8 10-4-2-8-5-8-10V6l8-4z" />
    </svg>
  );
}