// src/pages/Accept.jsx
import { useMemo, useState } from "react";
import { Search, Filter, Download, Settings, Bell, Users } from "lucide-react";

const TABS = [
  { key: "all", label: "All Campaigns", icon: "📋", description: "Manage all charitable campaigns" },
  { key: "queue", label: "Approval Queue", icon: "✅", description: "Pending review campaigns" },
  { key: "templates", label: "Templates", icon: "⚙️", description: "Document templates" },
];

// Default campaign data to prevent undefined errors
const DEFAULT_CAMPAIGNS = [
  { 
    id: "C-8421", 
    title: "Urgent Cardiac Surgeries", 
    charity: "Qatar Relief", 
    category: "Health", 
    goal: 120000, 
    requested: 65000, 
    risk: 12, 
    status: "pending", 
    age: "5h", 
    donors: 45 
  },
  { 
    id: "C-8427", 
    title: "Digital Education Access", 
    charity: "Hope Education", 
    category: "Education", 
    goal: 80000, 
    requested: 40000, 
    risk: 38, 
    status: "pending", 
    age: "18h", 
    donors: 23 
  },
  { 
    id: "C-8450", 
    title: "Flood Emergency Relief", 
    charity: "Doha Aid", 
    category: "Relief", 
    goal: 150000, 
    requested: 80000, 
    risk: 72, 
    status: "flagged", 
    age: "36h", 
    donors: 67 
  },
  { 
    id: "C-9001", 
    title: "University Scholarships", 
    charity: "Hope Education", 
    category: "Education", 
    goal: 200000, 
    requested: 200000, 
    risk: 20, 
    status: "approved", 
    age: "72h", 
    donors: 89 
  },
];

export default function Accept() {
  const [tab, setTab] = useState("all");
  const [search, setSearch] = useState("");
  const [risk, setRisk] = useState("all");
  const [status, setStatus] = useState("all");
  const [selected, setSelected] = useState(new Set());

  // Use default campaigns to prevent undefined errors
  const campaigns = useMemo(() => DEFAULT_CAMPAIGNS, []);

  const filtered = useMemo(() => {
    let data = campaigns || [];
    if (search) {
      data = data.filter(x => 
        `${x?.title || ''} ${x?.charity || ''}`.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (status !== "all") data = data.filter(x => x?.status === status);
    if (risk !== "all") {
      data = data.filter(x => {
        const itemRisk = x?.risk || 0;
        return risk === "low" ? itemRisk < 25 : 
               risk === "med" ? itemRisk >= 25 && itemRisk < 60 : 
               itemRisk >= 60;
      });
    }
    return data;
  }, [campaigns, search, risk, status]);

  const stats = useMemo(() => ({
    total: campaigns?.length || 0,
    pending: campaigns?.filter(x => x?.status === "pending").length || 0,
    highRisk: campaigns?.filter(x => (x?.risk || 0) >= 60).length || 0,
    approved: campaigns?.filter(x => x?.status === "approved").length || 0,
  }), [campaigns]);

  const handleBulkApprove = () => {
    if (selected.size > 0) {
      alert(`Approving ${selected.size} campaigns`);
      setSelected(new Set());
    }
  };

  const handleBulkReject = () => {
    if (selected.size > 0) {
      alert(`Rejecting ${selected.size} campaigns`);
      setSelected(new Set());
    }
  };

  const toggleSelect = (id) => {
    const newSelected = new Set(selected);
    newSelected.has(id) ? newSelected.delete(id) : newSelected.add(id);
    setSelected(newSelected);
  };

  const handleExport = () => {
    alert(`Exporting ${filtered.length} campaigns as CSV`);
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-emerald-50/20 p-3 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* HEADER */}
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 p-4 sm:p-6 md:p-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">

            <div className="min-w-0">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-black bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                  Admin Approvals
                </h1>
              </div>
              <p className="text-slate-600 text-sm sm:text-base md:text-lg">
                Manage and approve charitable campaigns with RACA compliance oversight
              </p>
            </div>

            <div className="flex flex-wrap gap-3 justify-start sm:justify-end">
              <button 
                onClick={handleExport}
                className="px-4 py-2 sm:px-5 sm:py-3 md:px-6 rounded-2xl border-2 border-slate-200 bg-white text-slate-700 text-sm sm:text-base font-semibold hover:bg-slate-50 transition-all flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
              <button className="px-4 py-2 sm:px-5 sm:py-3 md:px-6 rounded-2xl bg-gradient-to-r from-blue-600 to-emerald-600 text-white text-sm sm:text-base font-semibold hover:from-blue-700 hover:to-emerald-700 transition-all flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filter
              </button>
            </div>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard label="Total Campaigns" value={stats.total} icon="📊" color="blue" />
            <StatCard label="Pending Review" value={stats.pending} icon="⏳" color="amber" highlight />
            <StatCard label="High Risk" value={stats.highRisk} icon="⚠️" color="rose" />
            <StatCard label="Approved" value={stats.approved} icon="✅" color="emerald" />
          </div>

          {/* TABS */}
          <div className="flex flex-col sm:flex-row gap-2 bg-slate-100 rounded-2xl p-1 sm:p-2">
            {TABS.map(({ key, label, icon, description }) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 rounded-2xl text-xs sm:text-sm md:text-base font-semibold transition-all flex-1 ${
                  tab === key 
                    ? "bg-white text-slate-900 shadow-lg" 
                    : "text-slate-600 hover:text-slate-900"
                }`}
                title={description}
              >
                <span className="text-lg sm:text-xl">{icon}</span>
                <span className="truncate">{label}</span>
                {key === "queue" && stats.pending > 0 && (
                  <span className="bg-rose-500 text-white text-[10px] sm:text-xs font-bold w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center">
                    {stats.pending}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* FILTER BAR */}
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 p-4 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 sm:w-5 sm:h-5" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search campaigns..."
                className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 rounded-2xl border-2 border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none text-sm sm:text-base transition-all"
              />
            </div>

            {/* STATUS */}
            <select 
              value={status} 
              onChange={(e) => setStatus(e.target.value)}
              className="px-3 sm:px-4 py-3 sm:py-4 rounded-2xl border-2 border-slate-200 focus:border-blue-500 outline-none text-sm sm:text-base transition-all"
            >
              <option value="all">All Status</option>
              <option value="pending">🟡 Pending</option>
              <option value="approved">🟢 Approved</option>
              <option value="rejected">🔴 Rejected</option>
              <option value="flagged">🟠 Flagged</option>
            </select>

            {/* RISK */}
            <select 
              value={risk} 
              onChange={(e) => setRisk(e.target.value)}
              className="px-3 sm:px-4 py-3 sm:py-4 rounded-2xl border-2 border-slate-200 focus:border-blue-500 outline-none text-sm sm:text-base transition-all"
            >
              <option value="all">All Risk</option>
              <option value="low">🟢 Low Risk</option>
              <option value="med">🟡 Medium Risk</option>
              <option value="high">🔴 High Risk</option>
            </select>

            {/* CLEAR */}
            <button 
              onClick={() => { setSearch(""); setRisk("all"); setStatus("all"); }}
              className="px-4 sm:px-6 py-3 sm:py-4 rounded-2xl border-2 border-slate-300 bg-white text-slate-700 text-sm sm:text-base font-semibold hover:bg-slate-50 transition-all"
            >
              Clear All
            </button>
          </div>
        </div>

        {/* BULK ACTION BAR */}
        {selected.size > 0 && (
          <div className="bg-gradient-to-r from-blue-500 to-emerald-500 rounded-3xl shadow-2xl p-4 sm:p-6 text-white">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="font-semibold text-sm sm:text-base">{selected.size} campaigns selected</span>
              </div>

              <div className="flex gap-3 flex-wrap">
                <button 
                  onClick={handleBulkApprove}
                  className="px-4 sm:px-6 py-2 sm:py-3 rounded-2xl bg-white/20 hover:bg-white/30 transition-all font-semibold text-sm sm:text-base"
                >
                  Approve All
                </button>
                <button 
                  onClick={handleBulkReject}
                  className="px-4 sm:px-6 py-2 sm:py-3 rounded-2xl bg-rose-500 hover:bg-rose-600 transition-all font-semibold text-sm sm:text-base"
                >
                  Reject All
                </button>
              </div>

            </div>
          </div>
        )}

        {/* CONTENT */}
        <div className="grid gap-4">
          {tab === "templates" ? (
            <TemplatesPanel />
          ) : (
            filtered.map((campaign) => (
              <CampaignCard 
                key={campaign.id} 
                campaign={campaign} 
                selected={selected.has(campaign.id)}
                onToggleSelect={() => toggleSelect(campaign.id)}
              />
            ))
          )}
        </div>

        {/* EMPTY STATE */}
        {tab !== "templates" && filtered.length === 0 && (
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 p-10 sm:p-12 text-center">
            <div className="text-5xl sm:text-6xl mb-4">📭</div>
            <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2">No campaigns found</h3>
            <p className="text-slate-600 text-sm sm:text-base">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------------------- CARD COMPONENTS ---------------------------- */

function StatCard({ label, value, icon, color, highlight }) {
  const colorClasses = {
    blue: "from-blue-500 to-cyan-500",
    amber: "from-amber-500 to-orange-500",
    rose: "from-rose-500 to-pink-500", 
    emerald: "from-emerald-500 to-teal-500"
  };

  return (
    <div className={`bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 relative overflow-hidden transition-all hover:scale-[1.02] ${
      highlight ? "ring-2 ring-amber-500 ring-opacity-50 shadow-lg" : ""
    }`}>
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="text-2xl sm:text-3xl font-black text-slate-900">{value}</div>
          <div className="text-slate-600 text-sm sm:text-base font-medium truncate">{label}</div>
        </div>
        <div className="text-2xl sm:text-3xl">{icon}</div>
      </div>
      <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${colorClasses[color]}`} />
    </div>
  );
}

function CampaignCard({ campaign, selected, onToggleSelect }) {
  const safeCampaign = campaign || {};
  const goal = safeCampaign.goal || 0;
  const requested = safeCampaign.requested || 0;
  const progress = goal > 0 ? (requested / goal) * 100 : 0;

  const statusConfig = {
    pending: { color: "bg-amber-500", label: "Pending Review" },
    approved: { color: "bg-emerald-500", label: "Approved" },
    flagged: { color: "bg-orange-500", label: "Flagged" },
    rejected: { color: "bg-rose-500", label: "Rejected" }
  };

  const { color: statusColor, label: statusLabel } = statusConfig[safeCampaign.status] || statusConfig.pending;

  const handleApprove = () => alert(`Approving campaign: ${safeCampaign.title}`);
  const handleReject = () => alert(`Rejecting campaign: ${safeCampaign.title}`);
  const handleView = () => alert(`Viewing details for: ${safeCampaign.title}`);

  return (
    <div className={`bg-white rounded-3xl shadow-2xl border-2 transition-all duration-300 ${
      selected ? "border-blue-500 ring-2 ring-blue-500 ring-opacity-20" : "border-slate-100 hover:border-slate-300"
    }`}>
      <div className="p-4 sm:p-6">

        {/* TOP ROW */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between mb-4 gap-4">

          {/* LEFT */}
          <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
            <input
              type="checkbox"
              checked={selected}
              onChange={onToggleSelect}
              className="mt-1.5 sm:mt-2 w-4 h-4 sm:w-5 sm:h-5 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
            />

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-slate-900 truncate">
                  {safeCampaign.title || "Untitled Campaign"}
                </h3>

                <span className={`px-2 sm:px-3 py-1 rounded-2xl text-white text-xs sm:text-sm font-semibold ${statusColor}`}>
                  {statusLabel}
                </span>
              </div>

              {/* Info Row */}
              <div className="flex flex-wrap gap-2 sm:gap-4 text-slate-600 mb-3 text-xs sm:text-sm md:text-base">
                <span>🏢 {safeCampaign.charity}</span>
                <span>🏷️ {safeCampaign.category}</span>

                <span className={`font-semibold ${
                  (safeCampaign.risk || 0) >= 60 ? 'text-rose-600' : 
                  (safeCampaign.risk || 0) >= 25 ? 'text-amber-600' : 'text-emerald-600'
                }`}>
                  ⚠️ Risk {safeCampaign.risk}%
                </span>

                <span>🕐 {safeCampaign.age}</span>
                <span>👥 {safeCampaign.donors} donors</span>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="text-right min-w-[5.5rem] sm:min-w-24">
            <div className="text-lg sm:text-xl md:text-2xl font-black text-slate-900">
              {requested.toLocaleString()} QAR
            </div>
            <div className="text-slate-500 text-xs sm:text-sm">of {goal.toLocaleString()} QAR</div>
          </div>
        </div>

        {/* PROGRESS BAR */}
        <div className="mb-4">
          <div className="flex justify-between text-[11px] sm:text-sm text-slate-600 mb-2">
            <span>Funding Progress</span>
            <span className="font-semibold">{progress.toFixed(0)}%</span>
          </div>
          <div className="h-2.5 sm:h-3 w-full bg-slate-200 rounded-2xl overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <button 
            onClick={handleView}
            className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl border-2 border-slate-300 bg-white text-slate-700 text-sm sm:text-base font-semibold hover:bg-slate-50 transition-all flex-1"
          >
            View Details
          </button>
          <button 
            onClick={handleReject}
            className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl bg-rose-500 text-white text-sm sm:text-base font-semibold hover:bg-rose-600 transition-all flex-1"
          >
            Reject
          </button>
          <button 
            onClick={handleApprove}
            className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm sm:text-base font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all flex-1"
          >
            Approve
          </button>
        </div>

      </div>
    </div>
  );
}

function TemplatesPanel() {
  const categories = [
    { 
      name: "Health & Medical", 
      icon: "🏥",
      color: "from-rose-500 to-pink-600",
      docs: ["Medical Reports", "Hospital Invoices", "Doctor Certifications"]
    },
    { 
      name: "Education", 
      icon: "🎓",
      color: "from-blue-500 to-cyan-600",
      docs: ["Student IDs", "Tuition Fees", "Academic Records"]
    },
    { 
      name: "Emergency Relief", 
      icon: "🆘",
      color: "from-emerald-500 to-teal-600",
      docs: ["Assessment Reports", "Distribution Plans", "Field Verification"]
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
      {categories.map((category) => (
        <div key={category.name} className="bg-white rounded-3xl shadow-2xl border border-slate-100 p-4 sm:p-6">
          <div className={`bg-gradient-to-r ${category.color} rounded-2xl p-4 sm:p-6 text-white mb-4 sm:mb-6`}>
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="text-2xl sm:text-3xl">{category.icon}</div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold">{category.name}</h3>
                <p className="text-white/80 text-xs sm:text-sm">{category.docs.length} required documents</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-2 sm:space-y-3">
            {category.docs.map((doc, index) => (
              <div key={index} className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-2xl bg-slate-50">
                <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gradient-to-r ${category.color}`} />
                <span className="text-xs sm:text-sm font-medium text-slate-700 truncate">{doc}</span>
              </div>
            ))}
          </div>
          
          <button className="w-full mt-4 sm:mt-6 py-3 sm:py-4 rounded-2xl border-2 border-slate-300 bg-white text-slate-700 text-sm sm:text-base font-semibold hover:bg-slate-50 transition-all">
            Configure Template
          </button>
        </div>
      ))}
    </div>
  );
}
