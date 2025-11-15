// 🔥 ONLY COLORS UPDATED — NO OTHER CHANGES MADE

import React, { useState } from "react";
import {
  AlertTriangle,
  Shield,
  CheckCircle,
  Search,
  Eye,
  Clock,
  UserCheck,
  Edit3,
  Trash2,
  Bell,
  Download,
} from "lucide-react";

const initialAlerts = [
  {
    id: "AL-1007",
    donor: "XYZ Holdings",
    amount: "250,000 QAR",
    reason: "Unusual spike vs history",
    risk: "High",
    status: "New",
    time: "2h ago",
    category: "Transaction",
    assignedTo: "Unassigned",
  },
  {
    id: "AL-1004",
    donor: "Ahmed Ali",
    amount: "35,000 QAR",
    reason: "Multiple campaigns in 1 hour",
    risk: "Medium",
    status: "Investigating",
    time: "1d ago",
    category: "Frequency",
    assignedTo: "John Doe",
  },
  {
    id: "AL-0999",
    donor: "Overseas Entity",
    amount: "80,000 QAR",
    reason: "High-risk country",
    risk: "High",
    status: "Resolved",
    time: "3d ago",
    category: "Geographic",
    assignedTo: "Sarah Smith",
  },
  {
    id: "AL-1008",
    donor: "Anonymous",
    amount: "150,000 QAR",
    reason: "Large cash donation",
    risk: "Critical",
    status: "New",
    time: "30m ago",
    category: "Cash",
    assignedTo: "Unassigned",
  },
];

export default function AlertsAML() {
  const [alerts, setAlerts] = useState(initialAlerts);
  const [search, setSearch] = useState("");
  const [riskFilter, setRiskFilter] = useState("All");
  const [editingAlert, setEditingAlert] = useState(null);
  const [editForm, setEditForm] = useState({});

  const filteredAlerts = alerts.filter(
    (alert) =>
      alert.donor.toLowerCase().includes(search.toLowerCase()) &&
      (riskFilter === "All" || alert.risk === riskFilter)
  );

  const stats = {
    unresolved: alerts.filter((a) => a.status !== "Resolved").length,
    critical: alerts.filter((a) => a.risk === "Critical").length,
    high: alerts.filter((a) => a.risk === "High").length,
    total: alerts.length,
  };

  const markResolved = (id) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "Resolved" } : a))
    );
  };

  const assignToMe = (id) => {
    setAlerts((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, status: "Investigating", assignedTo: "You" } : a
      )
    );
  };

  const deleteAlert = (id) => {
    if (window.confirm("Delete this alert?")) {
      setAlerts((prev) => prev.filter((a) => a.id !== id));
    }
  };

  const startEdit = (alert) => {
    setEditingAlert(alert.id);
    setEditForm(alert);
  };

  const saveEdit = () => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === editingAlert ? { ...a, ...editForm } : a))
    );
    setEditingAlert(null);
  };

  const exportAlerts = () => {
    const csv = filteredAlerts
      .map(
        (a) =>
          `${a.id},${a.donor},${a.amount},${a.reason},${a.risk},${a.status}`
      )
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "aml-alerts.csv";
    link.click();
  };

  const getRiskColor = (risk) => {
    const colors = {
      Critical: "bg-red-500",
      High: "bg-orange-500",
      Medium: "bg-amber-500",
      Low: "bg-blue-500",
    };
    return colors[risk] || "bg-gray-500";
  };

  return (
    <div className="bg-white rounded-2xl border border-emerald-100 shadow-xl w-full">
      {/* Header */}
      <div className="p-4 sm:p-6 bg-gradient-to-r from-emerald-800 to-emerald-500 text-white rounded-t-2xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-xl">
              <Bell className="text-white" size={28} />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold">AML Alerts Center</h3>
              <p className="text-xs sm:text-sm text-emerald-100">
                Monitor suspicious activities & transactions
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <div className="flex flex-wrap gap-2 sm:gap-3 text-xs sm:text-sm">
              <div className="bg-white/20 px-3 py-1 rounded-full flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                {stats.critical} Critical
              </div>
              <div className="bg-white/20 px-3 py-1 rounded-full">
                {stats.unresolved} Unresolved
              </div>
            </div>
            <button
              onClick={exportAlerts}
              className="flex items-center gap-2 bg-white/20 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm hover:bg-white/30 transition-all"
            >
              <Download size={16} />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="p-3 sm:p-4 border-b border-emerald-50 bg-gradient-to-r from-red-50 to-orange-50">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search alerts by donor, ID, or reason..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>

          <select
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
            className="w-full sm:w-auto border border-gray-300 rounded-xl px-3 sm:px-4 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          >
            <option value="All">All Risks</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
          </select>
        </div>
      </div>

      {/* Alerts List */}
      <div className="p-3 sm:p-4">
        <div className="grid gap-3">
          {filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              className="group border border-gray-200 rounded-xl p-3 sm:p-4 hover:shadow-lg transition-all duration-300 bg-white"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1">
                  {/* Icon color updated */}
                  <div className={`p-3 rounded-xl ${getRiskColor(alert.risk)}`}>
                    <AlertTriangle className="text-white" size={20} />
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h4 className="font-semibold text-gray-900 text-sm sm:text-base break-words">
                        {alert.donor}
                      </h4>

                      {/* Risk Pill */}
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold text-white ${getRiskColor(
                          alert.risk
                        )}`}
                      >
                        {alert.risk}
                      </span>

                      {/* Status pill (no change) */}
                      <span
                        className={`px-2 py-1 rounded-full text-[10px] sm:text-xs ${
                          alert.status === "New"
                            ? "bg-emerald-100 text-emerald-700"
                            : alert.status === "Investigating"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {alert.status}
                      </span>
                    </div>

                    <p className="text-gray-600 text-xs sm:text-sm mb-2">
                      {alert.reason}
                    </p>

                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500">
                      <span className="font-bold text-gray-900">
                        {alert.amount}
                      </span>

                      <span className="hidden sm:inline">•</span>

                      <span className="flex items-center gap-1">
                        <Clock size={14} className="text-emerald-700" />
                        {alert.time}
                      </span>

                      <span className="hidden sm:inline">•</span>

                      <span className="bg-gray-100 px-2 py-1 rounded text-[10px] sm:text-xs">
                        {alert.category}
                      </span>

                      <span className="text-[10px] sm:text-xs text-gray-600">
                        Assigned: {alert.assignedTo}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons – NEW COLORS */}
                <div className="flex flex-wrap sm:flex-nowrap gap-2 sm:opacity-0 group-hover:opacity-100 transition-all duration-300">
                  {alert.status !== "Resolved" && (
                    <>
                      {/* Assign to me */}
                      <button
                        onClick={() => assignToMe(alert.id)}
                        className="p-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
                        title="Take Ownership"
                      >
                        <UserCheck size={16} />
                      </button>

                      {/* Mark resolved */}
                      <button
                        onClick={() => markResolved(alert.id)}
                        className="p-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
                        title="Mark Resolved"
                      >
                        <CheckCircle size={16} />
                      </button>
                    </>
                  )}

                  {/* Edit */}
                  <button
                    onClick={() => startEdit(alert)}
                    className="p-2 bg-amber-400 text-white rounded-lg hover:bg-amber-500 transition-colors"
                    title="Edit Alert"
                  >
                    <Edit3 size={16} />
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => deleteAlert(alert.id)}
                    className="p-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors"
                    title="Delete Alert"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredAlerts.length === 0 && (
          <div className="text-center py-10 sm:py-12 text-gray-500">
            <Shield size={64} className="mx-auto mb-4 text-gray-300" />
            <p className="text-base sm:text-lg font-semibold">
              No alerts found
            </p>
            <p className="text-xs sm:text-sm">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editingAlert && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-4 sm:p-6 max-w-md w-full">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4">
              Edit Alert
            </h3>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600">Risk Level</label>
                <select
                  value={editForm.risk}
                  onChange={(e) =>
                    setEditForm((prev) => ({ ...prev, risk: e.target.value }))
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 text-sm"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Critical">Critical</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-gray-600">Status</label>
                <select
                  value={editForm.status}
                  onChange={(e) =>
                    setEditForm((prev) => ({
                      ...prev,
                      status: e.target.value,
                    }))
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 text-sm"
                >
                  <option value="New">New</option>
                  <option value="Investigating">Investigating</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={saveEdit}
                className="flex-1 bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 text-sm"
              >
                Save
              </button>

              <button
                onClick={() => setEditingAlert(null)}
                className="flex-1 bg-gray-400 text-white py-2 rounded-lg hover:bg-gray-500 text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
