import React, { useState, useEffect } from "react";
import { RefreshCw, CheckCircle, XCircle, AlertTriangle, Play } from "lucide-react";

const initialLogs = [
  { id: 3, time: "2025-11-13 13:05", status: "Success", records: 432, duration: "45s", user: "System" },
  { id: 2, time: "2025-11-13 02:00", status: "Success", records: 120, duration: "23s", user: "System" },
  { id: 1, time: "2025-11-12 02:00", status: "Failed", records: 0, duration: "0s", user: "System", error: "API timeout" },
];

export default function SandiSyncStatus() {
  const [logs, setLogs] = useState(initialLogs);
  const [syncing, setSyncing] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);
  const [autoSync, setAutoSync] = useState(true);

  useEffect(() => {
    if (autoSync) {
      const interval = setInterval(() => {
        if (!syncing && Math.random() > 0.7) {
          runAutoSync();
        }
      }, 30000);
      return () => clearInterval(interval);
    }
  }, [autoSync, syncing]);

  const runSync = (isManual = false) => {
    if (isManual && !window.confirm("Start manual Sandi synchronization?")) return;
    
    setSyncing(true);
    setSyncProgress(0);
    
    const progressInterval = setInterval(() => {
      setSyncProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 300);

    setTimeout(() => {
      clearInterval(progressInterval);
      const newLog = {
        id: logs[0].id + 1,
        time: new Date().toLocaleString(),
        status: Math.random() > 0.1 ? "Success" : "Failed",
        records: Math.floor(Math.random() * 500) + 50,
        duration: `${Math.floor(Math.random() * 60) + 10}s`,
        user: isManual ? "Manual" : "System",
        error: Math.random() > 0.1 ? null : "Network timeout"
      };
      setLogs([newLog, ...logs.slice(0, 9)]);
      setSyncing(false);
      setSyncProgress(0);
    }, 2000);
  };

  const runAutoSync = () => runSync(false);

  const successCount = logs.filter(l => l.status === "Success").length;
  const failedCount = logs.filter(l => l.status === "Failed").length;
  const lastSync = logs[0];

  return (
    <div className="bg-white rounded-2xl border border-emerald-100 shadow-lg">
      {/* Header */}
      <div className="p-6 border-b border-emerald-50">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-emerald-900">Sandi Sync Status</h3>
            <p className="text-emerald-600 mt-1">Real-time synchronization monitoring</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={autoSync}
                onChange={(e) => setAutoSync(e.target.checked)}
                className="rounded border-emerald-300 text-emerald-600 focus:ring-emerald-500"
              />
              <span className="text-sm text-emerald-700">Auto Sync</span>
            </div>
            <button
              onClick={() => runSync(true)}
              disabled={syncing}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                syncing
                  ? 'bg-emerald-100 text-emerald-400 cursor-not-allowed'
                  : 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-md'
              }`}
            >
              {syncing ? <RefreshCw size={16} className="animate-spin" /> : <Play size={16} />}
              {syncing ? 'Syncing...' : 'Manual Sync'}
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        {syncing && (
          <div className="mt-4">
            <div className="flex justify-between text-sm text-emerald-700 mb-2">
              <span>Syncing with Sandi...</span>
              <span>{Math.round(syncProgress)}%</span>
            </div>
            <div className="w-full bg-emerald-100 rounded-full h-2">
              <div
                className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${syncProgress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="p-6 border-b border-emerald-50">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-emerald-50 rounded-xl border border-emerald-200">
            <div className="text-2xl font-bold text-emerald-900">{logs.length}</div>
            <div className="text-sm text-emerald-600">Total Syncs</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-xl border border-green-200">
            <div className="text-2xl font-bold text-green-900">{successCount}</div>
            <div className="text-sm text-green-600">Successful</div>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-xl border border-red-200">
            <div className="text-2xl font-bold text-red-900">{failedCount}</div>
            <div className="text-sm text-red-600">Failed</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-200">
            <div className="text-2xl font-bold text-blue-900">{lastSync.records}</div>
            <div className="text-sm text-blue-600">Last Records</div>
          </div>
        </div>
      </div>

      {/* Sync Logs */}
      <div className="p-6">
        <h4 className="font-semibold text-emerald-900 mb-4">Recent Sync Activity</h4>
        <div className="space-y-3">
          {logs.map((log) => (
            <div
              key={log.id}
              className={`p-4 rounded-xl border transition-all ${
                log.status === 'Success' 
                  ? 'bg-green-50 border-green-200 hover:bg-green-100' 
                  : 'bg-red-50 border-red-200 hover:bg-red-100'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  {log.status === 'Success' ? (
                    <CheckCircle className="text-green-500 mt-0.5" size={20} />
                  ) : (
                    <XCircle className="text-red-500 mt-0.5" size={20} />
                  )}
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-medium text-emerald-900">{log.time}</p>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        log.user === 'Manual' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {log.user}
                      </span>
                    </div>
                    <p className="text-sm text-emerald-700 mt-1">
                      {log.status === "Success" 
                        ? `Successfully synchronized ${log.records} beneficiary records`
                        : `Sync failed: ${log.error || 'Unknown error'}`
                      }
                    </p>
                    <div className="flex gap-4 mt-2 text-xs text-emerald-600">
                      <span>Duration: {log.duration}</span>
                      <span>Records: {log.records}</span>
                    </div>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  log.status === 'Success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {log.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}