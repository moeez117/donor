import React, { useState } from "react";
import {
  Search,
  Calendar,
  User,
  Download,
  Shield,
  Clock,
  Filter,
  Edit3,
  Trash2,
  Eye,
  FileText,
} from "lucide-react";

const allLogs = [
  {
    id: 1,
    user: "RACA Admin",
    action: "Approved campaign",
    entityType: "Campaign",
    entityId: "CMP-2201",
    time: "2h ago",
    ip: "192.168.1.100",
    severity: "Low",
  },
  {
    id: 2,
    user: "Compliance Officer",
    action: "Flagged donation as suspicious",
    entityType: "Donation",
    entityId: "DN-1044",
    time: "3h ago",
    ip: "192.168.1.105",
    severity: "High",
  },
  {
    id: 3,
    user: "Finance Analyst",
    action: "Exported financial report",
    entityType: "System",
    entityId: "REPORT-AML",
    time: "1d ago",
    ip: "192.168.1.110",
    severity: "Medium",
  },
  {
    id: 4,
    user: "RACA Admin",
    action: "Updated charity license information",
    entityType: "Charity",
    entityId: "CH-034",
    time: "2d ago",
    ip: "192.168.1.100",
    severity: "Low",
  },
];

export default function AuditLogs() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [userFilter, setUserFilter] = useState("All");
  const [selectedLog, setSelectedLog] = useState(null);
  const [logs, setLogs] = useState(allLogs);

  const filteredLogs = logs.filter(
    (log) =>
      log.user.toLowerCase().includes(search.toLowerCase()) &&
      (typeFilter === "All" || log.entityType === typeFilter) &&
      (userFilter === "All" || log.user === userFilter)
  );

  const stats = {
    total: logs.length,
    high: logs.filter((l) => l.severity === "High").length,
    today: logs.filter((l) => l.time.includes("h ago")).length,
  };

  const deleteLog = (id) => {
    if (window.confirm("Delete this audit log?")) {
      setLogs((prev) => prev.filter((log) => log.id !== id));
    }
  };

  const editLog = (log) => {
    const newAction = prompt("Edit action:", log.action);
    if (newAction) {
      setLogs((prev) =>
        prev.map((l) => (l.id === log.id ? { ...l, action: newAction } : l))
      );
    }
  };

  const exportLogs = () => {
    const csv = filteredLogs
      .map(
        (log) =>
          `${log.id},${log.user},${log.action},${log.entityType},${log.entityId},${log.time},${log.ip},${log.severity}`
      )
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "audit-logs.csv";
    link.click();
  };

  const getSeverityColor = (severity) => {
    const colors = {
      High: "bg-gradient-to-r from-red-500 to-red-600",
      Medium: "bg-gradient-to-r from-yellow-500 to-yellow-600",
      Low: "bg-gradient-to-r from-green-500 to-green-600",
    };
    return colors[severity] || "bg-gray-500";
  };

  return (
    <div className="bg-white rounded-2xl border border-emerald-100 shadow-xl w-full">
      {/* Header */}
      <div className="p-4 sm:p-6 bg-gradient-to-r from-green-500 to-green-300 text-white rounded-t-2xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-xl">
              <FileText className="text-white" size={28} />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold">Audit Trail</h3>
              <p className="text-xs sm:text-sm text-blue-100">
                Complete system activity monitoring
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <div className="text-right">
              <div className="text-xs sm:text-sm">Today's Logs</div>
              <div className="text-xl sm:text-2xl font-bold">{stats.today}</div>
            </div>
            <button
              onClick={exportLogs}
              className="flex items-center gap-2 bg-white/20 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm hover:bg-white/30 transition-all"
            >
              <Download size={16} />
              Export CSV
            </button>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="p-3 sm:p-4 border-b border-emerald-50 bg-gradient-to-r from-blue-50 to-cyan-50">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search by user, action, or entity..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full sm:w-auto border border-gray-300 rounded-xl px-3 sm:px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="All">All Types</option>
            <option value="Campaign">Campaign</option>
            <option value="Donation">Donation</option>
            <option value="Charity">Charity</option>
            <option value="System">System</option>
          </select>
          <select
            value={userFilter}
            onChange={(e) => setUserFilter(e.target.value)}
            className="w-full sm:w-auto border border-gray-300 rounded-xl px-3 sm:px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="All">All Users</option>
            <option value="RACA Admin">RACA Admin</option>
            <option value="Compliance Officer">Compliance</option>
            <option value="Finance Analyst">Finance</option>
          </select>
        </div>
      </div>

      {/* Logs */}
      <div className="p-3 sm:p-4">
        <div className="space-y-3">
          {filteredLogs.map((log) => (
            <div
              key={log.id}
              className="group border border-gray-200 rounded-xl p-3 sm:p-4 hover:shadow-lg transition-all duration-300 bg-white"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="flex items-start gap-3 sm:gap-4 flex-1">
                  <div className="relative">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center">
                      <User className="text-blue-600" size={20} />
                    </div>
                    <div
                      className={`absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 border-white ${getSeverityColor(
                        log.severity
                      )}`}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                      <h4 className="font-semibold text-gray-900 text-sm sm:text-base break-words">
                        {log.user}
                      </h4>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-[10px] sm:text-xs font-medium">
                        {log.entityType}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-[10px] sm:text-xs font-bold text-white ${getSeverityColor(
                          log.severity
                        )}`}
                      >
                        {log.severity}
                      </span>
                      <span className="flex items-center gap-1 text-xs sm:text-sm text-gray-500">
                        <Clock size={14} />
                        {log.time}
                      </span>
                    </div>
                    <p className="text-gray-700 text-sm mb-2 break-words">
                      {log.action}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600">
                      <span className="font-mono bg-gray-100 px-2 py-1 rounded text-[10px] sm:text-xs">
                        ID: {log.entityId}
                      </span>
                      <span className="hidden sm:inline">•</span>
                      <span className="font-mono text-[10px] sm:text-xs">
                        IP: {log.ip}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap sm:flex-nowrap gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300">
                  <button
                    onClick={() => editLog(log)}
                    className="p-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
                    title="Edit Log"
                  >
                    <Edit3 size={16} />
                  </button>
                  <button
                    onClick={() => deleteLog(log.id)}
                    className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    title="Delete Log"
                  >
                    <Trash2 size={16} />
                  </button>
                  <button
                    onClick={() => setSelectedLog(log)}
                    className="p-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                    title="View Details"
                  >
                    <Eye size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredLogs.length === 0 && (
          <div className="text-center py-10 sm:py-12 text-gray-500">
            <Shield size={56} className="mx-auto mb-4 text-gray-300" />
            <p className="text-base sm:text-lg font-semibold">
              No audit logs found
            </p>
            <p className="text-xs sm:text-sm">
              Try adjusting your search criteria
            </p>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedLog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-4 sm:p-6 max-w-md w-full">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="text-blue-500" size={24} />
              <h3 className="text-base sm:text-lg font-bold text-gray-900">
                Audit Log Details
              </h3>
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-600">User</label>
                  <p className="font-medium text-sm sm:text-base">
                    {selectedLog.user}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Severity</label>
                  <div className="mt-1">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-bold text-white ${getSeverityColor(
                        selectedLog.severity
                      )}`}
                    >
                      {selectedLog.severity}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Entity Type</label>
                  <p className="font-medium text-sm sm:text-base">
                    {selectedLog.entityType}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Entity ID</label>
                  <p className="font-mono text-xs sm:text-sm">
                    {selectedLog.entityId}
                  </p>
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-600">Action</label>
                <p className="mt-1 p-2 bg-gray-50 rounded-lg text-sm">
                  {selectedLog.action}
                </p>
              </div>
            </div>
            <button
              onClick={() => setSelectedLog(null)}
              className="w-full mt-6 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
