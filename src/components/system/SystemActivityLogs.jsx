import React, { useState } from "react";
import { Activity, Download, Filter, Search, Clock, Server, Database, Wifi } from "lucide-react";

const logs = [
  { id: 1, time: "2 minutes ago", source: "Sandi Sync", message: "Sync completed successfully (432 records)", level: "success" },
  { id: 2, time: "15 minutes ago", source: "Payment Gateway", message: "Latency within normal range (45ms)", level: "info" },
  { id: 3, time: "2 hours ago", source: "Bank Integration", message: "Nightly reconciliation job completed", level: "success" },
  { id: 4, time: "5 hours ago", source: "System Health", message: "All services operational", level: "info" },
  { id: 5, time: "1 day ago", source: "Database", message: "Backup completed successfully", level: "success" },
  { id: 6, time: "2 days ago", source: "API Gateway", message: "Rate limit threshold reached", level: "warning" },
];

export default function SystemActivityLogs() {
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState("All");
  const [sourceFilter, setSourceFilter] = useState("All");

  const filteredLogs = logs.filter(
    (log) =>
      log.message.toLowerCase().includes(search.toLowerCase()) &&
      (levelFilter === "All" || log.level === levelFilter) &&
      (sourceFilter === "All" || log.source === sourceFilter)
  );

  const exportLogs = () => {
    alert("Exporting system logs...");
  };

  const getLevelColor = (level) => {
    const colors = {
      success: "bg-gradient-to-r from-green-500 to-emerald-600",
      info: "bg-gradient-to-r from-blue-500 to-cyan-600",
      warning: "bg-gradient-to-r from-yellow-500 to-amber-600",
      error: "bg-gradient-to-r from-red-500 to-red-600",
    };
    return colors[level] || "bg-gray-500";
  };

  const getSourceIcon = (source) => {
    const icons = {
      "Sandi Sync": <Database size={16} />,
      "Payment Gateway": <Wifi size={16} />,
      "Bank Integration": <Server size={16} />,
      "System Health": <Activity size={16} />,
      Database: <Database size={16} />,
      "API Gateway": <Wifi size={16} />,
    };
    return icons[source] || <Activity size={16} />;
  };

  const systemHealth = {
    status: "Healthy",
    uptime: "99.9%",
    lastIncident: "None",
    activeServices: 12,
  };

  return (
    <div className="bg-white rounded-2xl border border-emerald-100 shadow-xl w-full">
      {/* Header */}
      <div className="p-4 sm:p-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-t-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-xl">
              <Activity className="text-white" size={28} />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold">System Activity & Health</h3>
              <p className="text-xs sm:text-sm text-emerald-100">
                Technical logs and system health monitoring
              </p>
            </div>
          </div>
          <button
            onClick={exportLogs}
            className="flex items-center justify-center gap-2 bg-white/20 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm hover:bg-white/30"
          >
            <Download size={16} />
            Export Logs
          </button>
        </div>
      </div>

      {/* Health Overview */}
      <div className="p-4 sm:p-6 border-b border-emerald-50 bg-gradient-to-r from-green-50 to-emerald-50">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-white rounded-xl p-3 sm:p-4 text-center border border-emerald-200">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-2">
              <Activity className="text-white" size={20} />
            </div>
            <p className="text-xs sm:text-sm text-gray-600">Overall Status</p>
            <p className="font-bold text-green-600 text-sm sm:text-base">
              {systemHealth.status}
            </p>
          </div>
          <div className="bg-white rounded-xl p-3 sm:p-4 text-center border border-emerald-200">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-2">
              <Clock className="text-white" size={20} />
            </div>
            <p className="text-xs sm:text-sm text-gray-600">Uptime (7 days)</p>
            <p className="font-bold text-blue-600 text-sm sm:text-base">
              {systemHealth.uptime}
            </p>
          </div>
          <div className="bg-white rounded-xl p-3 sm:p-4 text-center border border-emerald-200">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-2">
              <Server className="text-white" size={20} />
            </div>
            <p className="text-xs sm:text-sm text-gray-600">Active Services</p>
            <p className="font-bold text-gray-900 text-sm sm:text-base">
              {systemHealth.activeServices}
            </p>
          </div>
          <div className="bg-white rounded-xl p-3 sm:p-4 text-center border border-emerald-200">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-500 rounded-xl flex items-center justify-center mx-auto mb-2">
              <Activity className="text-white" size={20} />
            </div>
            <p className="text-xs sm:text-sm text-gray-600">Last Incident</p>
            <p className="font-bold text-gray-900 text-sm sm:text-base">
              {systemHealth.lastIncident}
            </p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="p-4 border-b border-emerald-50">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search logs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 text-sm"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-2 md:w-auto">
            <select
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
              className="w-full sm:w-auto border border-gray-300 rounded-xl px-3 sm:px-4 py-2 text-sm focus:ring-2 focus:ring-green-500"
            >
              <option value="All">All Levels</option>
              <option value="success">Success</option>
              <option value="info">Info</option>
              <option value="warning">Warning</option>
            </select>
            <select
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
              className="w-full sm:w-auto border border-gray-300 rounded-xl px-3 sm:px-4 py-2 text-sm focus:ring-2 focus:ring-green-500"
            >
              <option value="All">All Sources</option>
              <option value="Sandi Sync">Sandi Sync</option>
              <option value="Payment Gateway">Payment Gateway</option>
              <option value="Bank Integration">Bank Integration</option>
              <option value="System Health">System Health</option>
              <option value="Database">Database</option>
              <option value="API Gateway">API Gateway</option>
            </select>
          </div>
        </div>
      </div>

      {/* Logs List */}
      <div className="p-4">
        <div className="space-y-3">
          {filteredLogs.map((log) => (
            <div
              key={log.id}
              className="border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all duration-300 bg-white"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 sm:gap-4 flex-1">
                  <div className={`p-3 rounded-xl ${getLevelColor(log.level)}`}>
                    {getSourceIcon(log.source)}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2">
                      <h4 className="font-semibold text-gray-900 text-sm sm:text-base">
                        {log.source}
                      </h4>
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold text-white ${getLevelColor(
                          log.level
                        )}`}
                      >
                        {log.level.toUpperCase()}
                      </span>
                      <span className="flex items-center gap-1 text-xs sm:text-sm text-gray-500">
                        <Clock size={14} />
                        {log.time}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-700">
                      {log.message}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredLogs.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Activity size={48} className="mx-auto mb-4 text-gray-300" />
            <p className="text-base sm:text-lg font-semibold">No logs found</p>
            <p className="text-xs sm:text-sm">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}
