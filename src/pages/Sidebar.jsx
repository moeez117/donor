// src/pages/Sidebar.jsx
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/* =========================
   Route map (single source of truth)
========================= */
export const ROUTES = {
  // Admin (RACA)
  admin: {
    overview: "/",
    approvals: "/approvals",
    compliance: "/compliance",
    donations: "/donations",
    charity: "/charity",
    beneficiaries: "/beneficiaries",
    system: "/system",
    reports: "/reports",
    settings: "/settings",
  },
  // Donor
  donor: {
    overview: "/donor/overview",
    mydonations: "/donor/mydonations",
    myimpact: "/donor/myimpact",
    explorecampaigns: "/donor/explorecampaigns",
    certificatereceipt: "/donor/certificatereceipt",
    settings: "/donor/settings",
  },
};

/* =========================
   Brand colors
========================= */
const brand = {
  solid: "bg-emerald-600",
  textOnSolid: "text-white",
  ring: "ring-emerald-600/60",
  border: "border-emerald-100",
  glowFrom: "from-emerald-600",
  glowVia: "via-emerald-500",
  glowTo: "to-teal-400",
};

/* =========================
   Icons (inline SVG)
========================= */
const Icon = {
  dashboard: (c="") => <svg className={`h-5 w-5 ${c}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M3 3h8v8H3zM13 3h8v12h-8zM3 13h8v8H3zM13 17h8v4h-8z"/></svg>,
  checklist: (c="") => <svg className={`h-5 w-5 ${c}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M9 7h11M9 12h11M9 17h11M4 7l1.5 1.5L7.5 6M4 12l1.5 1.5L7.5 11M4 17l1.5 1.5L7.5 16"/></svg>,
  shield: (c="") => <svg className={`h-5 w-5 ${c}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M12 3l7 4v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V7l7-4z"/></svg>,
  heart: (c="") => <svg className={`h-5 w-5 ${c}`} viewBox="0 0 24 24" fill="currentColor"><path d="M12 21s-7-4.35-9.33-8.23C.6 9.2 2.4 5 6.34 5c2.05 0 3.2 1.2 3.66 1.9C10.8 6.2 11.95 5 14 5 17.9 5 19.7 9.2 21.33 12.77 19 16.65 12 21 12 21z"/></svg>,
  cash: (c="") => <svg className={`h-5 w-5 ${c}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><rect x="3" y="6" width="18" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/></svg>,
  users: (c="") => <svg className={`h-5 w-5 ${c}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M16 11a4 4 0 10-8 0 4 4 0 008 0zM3 21a7 7 0 0114 0H3zM17 21a5 5 0 0110 0h-5"/></svg>,
  bank: (c="") => <svg className={`h-5 w-5 ${c}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M2 10l10-6 10 6M3 10h18M5 10v8m4-8v8m4-8v8m4-8v8M2 20h20"/></svg>,
  bell: (c="") => <svg className={`h-5 w-5 ${c}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M15 17h5l-1.4-1.4A2 2 0 0118 14v-3a6 6 0 10-12 0v3a2 2 0 01-.6 1.6L4 17h5m6 0a3 3 0 11-6 0"/></svg>,
  file: (c="") => <svg className={`h-5 w-5 ${c}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M14 3H6a2 2 0 00-2 2v14a2 2 0 002 2h12V9l-4-6z"/><path d="M14 3v6h6"/></svg>,
  chart: (c="") => <svg className={`h-5 w-5 ${c}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M3 3v16a2 2 0 002 2h16"/><path d="M7 14l4-4 4 4 6-6"/><path d="M18 8h3v3"/></svg>,
  gear: (c="") => <svg className={`h-5 w-5 ${c}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M12 8a4 4 0 100 8 4 4 0 000-8zm8.66 3a8.3 8.3 0 01.16 1 8.3 8.3 0 01-.16 1l2 1.55-2 3.46-2.33-.64a8.1 8.1 0 01-1.73 1L14 22h-4l-.6-2.63a8.1 8.1 0 01-1.73-1L4.33 20 2.33 16.54 4.3 15a8.3 8.3 0 01-.16-1 8.3 8.3 0 01.16-1l-2-1.55 2-3.46 2.33.64a8.1 8.1 0 011.73-1L10 2h4l.6 2.63a8.1 8.1 0 011.73 1L19.67 4 21.67 7.46 19.7 9z"/></svg>,
  compass: (c="") => <svg className={`h-5 w-5 ${c}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><circle cx="12" cy="12" r="9"/><path d="M8 16l3-7 5-1-3 7-5 1z"/></svg>,
  cert: (c="") => <svg className={`h-5 w-5 ${c}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M4 5h16v14H4z"/><path d="M8 9h8M8 13h5"/><path d="M16 20l-2-2-2 2v-4h4v4z"/></svg>,
  target: (c="") => <svg className={`h-5 w-5 ${c}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  donation: (c="") => <svg className={`h-5 w-5 ${c}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>,
  impact: (c="") => <svg className={`h-5 w-5 ${c}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M13 2L3 14h6l-4 8 12-10h-6l4-8z"/></svg>,
  explore: (c="") => <svg className={`h-5 w-5 ${c}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/></svg>,
  receipt: (c="") => <svg className={`h-5 w-5 ${c}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/></svg>,
  system: (c="") => <svg className={`h-5 w-5 ${c}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><path d="M8 21h8M12 17v4"/></svg>,
};

/* =========================
   Menu configs (use ROUTES)
========================= */
const ADMIN_ITEMS = (flags) =>
  [
    { k: "overview",       label: "Overview",               path: ROUTES.admin.overview,        icon: Icon.dashboard },
    { k: "approvals",      label: "Approval",               path: ROUTES.admin.approvals,       icon: Icon.checklist, badge: "pending_approvals" },
    { k: "compliance",     label: "Compliance",             path: ROUTES.admin.compliance,      icon: Icon.shield },
    { k: "donations",      label: "Donation",               path: ROUTES.admin.donations,       icon: Icon.donation },
    { k: "charity",        label: "Charity",                path: ROUTES.admin.charity,         icon: Icon.heart },
    { k: "beneficiaries",  label: "Beneficiaries",          path: ROUTES.admin.beneficiaries,   icon: Icon.users, badge: "beneficiary_updates" },
    { k: "system",         label: "System",                 path: ROUTES.admin.system,          icon: Icon.system },
    { k: "reports",        label: "Report",                 path: ROUTES.admin.reports,         icon: Icon.chart },
    { k: "settings",       label: "Setting",                path: ROUTES.admin.settings,        icon: Icon.gear },
  ].filter(Boolean);

const DONOR_ITEMS = [
  { k: "overview",        label: "Overview",               path: ROUTES.donor.overview,        icon: Icon.dashboard },
  { k: "mydonations",     label: "My Donations",           path: ROUTES.donor.mydonations,     icon: Icon.heart },
  { k: "myimpact",        label: "My Impact",              path: ROUTES.donor.myimpact,        icon: Icon.impact },
  { k: "explorecampaigns",label: "Explore Campaigns",      path: ROUTES.donor.explorecampaigns,icon: Icon.explore },
  { k: "certificatereceipt",label: "Certificate & Receipt",path: ROUTES.donor.certificatereceipt,icon: Icon.receipt },
  { k: "settings",        label: "Setting",                path: ROUTES.donor.settings,        icon: Icon.gear },
];

/* =========================
   Sidebar component
========================= */
export default function Sidebar({
  initialRole = "admin",
  flags = { sandi_enabled: true, phase2_aml: true },
  badges = {
    pending_approvals: 3, 
    beneficiary_updates: 5,
    active_donations: 2,
  },
}) {
  const [role, setRole] = useState(initialRole);
  const [open, setOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const items = useMemo(
    () => (role === "admin" ? ADMIN_ITEMS(flags) : DONOR_ITEMS),
    [role, flags]
  );

  // figure out active key from URL
  const activeKey = useMemo(() => {
    const found = items.find((i) => location.pathname.startsWith(i.path));
    return found ? found.k : items[0]?.k;
  }, [items, location.pathname]);

  // lock body scroll when mobile drawer is open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = open ? "hidden" : prev;
    return () => (document.body.style.overflow = prev);
  }, [open]);

  // Navigate helper
  const go = (path) => {
    if (location.pathname !== path) navigate(path);
  };

  // Handle role change with navigation
  const handleRoleChange = (newRole) => {
    setRole(newRole);
    if (newRole === "admin") {
      navigate(ROUTES.admin.overview);
    } else {
      navigate(ROUTES.donor.overview);
    }
  };

  return (
    <>
      {/* Mobile top bar */}
      <header className="md:hidden sticky top-0 z-40 flex items-center justify-between border-b bg-white/80 backdrop-blur px-4 py-3 max-w-full overflow-x-hidden">
        <div className="font-semibold text-emerald-700 truncate">
          Qatar Charity Platform
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <RoleSwitch role={role} onChange={handleRoleChange} />
          <button
            onClick={() => setOpen(true)}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-lg border ${brand.border} bg-white hover:shadow transition active:scale-95`}
            aria-label="Open sidebar"
          >
            <div className="space-y-1">
              <div className="h-0.5 w-5 bg-slate-900" />
              <div className="h-0.5 w-5 bg-slate-900" />
              <div className="h-0.5 w-5 bg-slate-900" />
            </div>
          </button>
        </div>
      </header>

      {/* Desktop: fixed sidebar */}
      <div className="hidden md:block fixed inset-y-0 left-0 z-30 w-64 sm:w-72 lg:w-80 max-w-full">
        <SidebarShell
          role={role}
          items={items}
          badges={badges}
          activeKey={activeKey}
          onRoleChange={handleRoleChange}
          onClickItem={(it) => go(it.path)}
        />
      </div>

      {/* Desktop spacer */}
      <div
        className="hidden md:block w-64 sm:w-72 lg:w-80 shrink-0 max-w-full"
        aria-hidden
      />

      {/* Mobile overlay + drawer */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setOpen(false)}
      />
      <div
        className={`md:hidden fixed inset-y-0 left-0 z-50 w-64 sm:w-72 max-w-full transform transition-transform ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarShell
          role={role}
          items={items}
          badges={badges}
          activeKey={activeKey}
          onRoleChange={handleRoleChange}
          onClickItem={(it) => {
            go(it.path);
            setOpen(false);
          }}
        />
      </div>
    </>
  );
}

/* =========================
   Visual shell
========================= */
function SidebarShell({ role, items, badges, activeKey, onRoleChange, onClickItem }) {
  return (
    <aside className="flex h-full max-h-screen flex-col border-r bg-white shadow-sm">
      {/* Brand */}
      <div className="relative m-3 rounded-2xl p-4 overflow-hidden ring-1 ring-inset ring-emerald-500/20">
        <div className={`absolute inset-0 bg-gradient-to-br ${brand.glowFrom} ${brand.glowVia} ${brand.glowTo}`} />
        <div className="relative flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-white ring-1 ring-white/30 backdrop-blur">
            <span className="text-lg font-bold">Q</span>
          </div>
          <div className="text-white">
            <div className="text-xs/4 opacity-85">Charity Platform</div>
            <div className="font-semibold">
              {role === "admin" ? "RACA Admin" : "Donor Portal"}
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/20 blur-2xl" />
      </div>

      {/* Role switch */}
      <div className="px-3 mb-4">
        <RoleSwitch role={role} onChange={onRoleChange} />
      </div>

      {/* Nav */}
      <nav className="mt-2 flex-1 space-y-1 px-3 pb-6 overflow-y-auto">
        {items.map((it) => {
          const active = it.k === activeKey;
          return (
            <button
              key={it.k}
              onClick={() => onClickItem?.(it)}
              className={[
                "group relative w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all",
                active
                  ? `${brand.solid} ${brand.textOnSolid} shadow-lg ring-1 ${brand.ring}`
                  : "text-slate-700 hover:bg-emerald-50 hover:shadow",
              ].join(" ")}
              aria-current={active ? "page" : undefined}
            >
              <span
                className={[
                  "grid h-8 w-8 place-items-center rounded-lg transition-transform duration-300",
                  active
                    ? "bg-white/15"
                    : "bg-emerald-50 group-hover:bg-emerald-100 group-hover:scale-105",
                ].join(" ")}
              >
                {it.icon(active ? "text-white" : "text-emerald-800")}
              </span>

              <span className="flex-1 truncate text-sm font-medium">
                {it.label}
              </span>

              {it.badge && badges?.[it.badge] > 0 && (
                <span
                  className={[
                    "ml-auto inline-flex min-w-[1.5rem] items-center justify-center rounded-full px-2 text-xs font-semibold transition",
                    active
                      ? "bg-white/25 text-white"
                      : `${brand.solid} ${brand.textOnSolid}`,
                  ].join(" ")}
                >
                  {badges[it.badge] > 99 ? "99+" : badges[it.badge]}
                </span>
              )}

              <span
                className={[
                  "absolute left-0 top-0 h-full w-1 rounded-r-xl transition-all",
                  active
                    ? "bg-white/70"
                    : "bg-emerald-400/0 group-hover:bg-emerald-300/70",
                ].join(" ")}
              />
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="mt-auto border-t px-4 py-3 text-[11px] text-slate-500">
        © {new Date().getFullYear()} Qatar Charity Platform
      </div>
    </aside>
  );
}

/* =========================
   Role switch
========================= */
function RoleSwitch({ role, onChange }) {
  return (
    <div className="relative grid h-10 w-auto sm:w-full grid-cols-2 rounded-xl border bg-white p-1 shadow-sm">
      <button
        onClick={() => onChange?.("admin")}
        className={`rounded-lg text-sm font-medium transition-all ${
          role === "admin"
            ? `${brand.solid} ${brand.textOnSolid} shadow`
            : "text-emerald-900 hover:bg-emerald-50"
        }`}
      >
        Admin
      </button>
      <button
        onClick={() => onChange?.("donor")}
        className={`rounded-lg text-sm font-medium transition-all ${
          role === "donor"
            ? `${brand.solid} ${brand.textOnSolid} shadow`
            : "text-emerald-900 hover:bg-emerald-50"
        }`}
      >
        Donor
      </button>
    </div>
  );
}
