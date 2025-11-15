// src/components/approvals/ApprovalCard.jsx
import { useState } from "react";
import { Eye, CheckCircle, XCircle, Download, Users, Calendar } from "lucide-react";

// Default item structure to prevent undefined errors
const DEFAULT_ITEM = {
  id: "N/A",
  title: "Untitled Campaign",
  charity: "Unknown Charity",
  category: "Uncategorized",
  goal: 0,
  requested: 0,
  risk: 0,
  status: "pending",
  age: "Unknown",
  donors: 0
};

export default function ApprovalCard({ item, onApprove, onReject, onOpen }) {
  const [confirmAction, setConfirmAction] = useState(null);
  
  // Use default values to prevent undefined errors
  const safeItem = { ...DEFAULT_ITEM, ...(item || {}) };
  const goal = safeItem.goal || 1; // Avoid division by zero
  const requested = safeItem.requested || 0;
  const progress = (requested / goal) * 100;
  const riskLevel = safeItem.risk >= 60 ? 'high' : safeItem.risk >= 25 ? 'medium' : 'low';

  const handleQuickApprove = () => {
    setConfirmAction('approve');
  };

  const handleQuickReject = () => {
    setConfirmAction('reject');
  };

  const confirmActionHandler = () => {
    if (confirmAction === 'approve') {
      onApprove?.(safeItem);
    } else {
      onReject?.(safeItem);
    }
    setConfirmAction(null);
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 p-4 sm:p-6 transition-all hover:shadow-3xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
        <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
          <div
            className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full mt-1 sm:mt-2 ${
              riskLevel === 'high'
                ? 'bg-rose-500'
                : riskLevel === 'medium'
                ? 'bg-amber-500'
                : 'bg-emerald-500'
            }`}
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-slate-900 mb-1 sm:mb-2 truncate">
              {safeItem.title}
            </h3>
            <div className="flex flex-wrap gap-2 sm:gap-3 text-xs sm:text-sm text-slate-600">
              <span className="flex items-center gap-1 min-w-0">
                <Users className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" />
                <span className="truncate">{safeItem.charity}</span>
              </span>
              <span className="min-w-0 truncate">🏷️ {safeItem.category}</span>
              <span
                className={`font-semibold ${
                  riskLevel === 'high'
                    ? 'text-rose-600'
                    : riskLevel === 'medium'
                    ? 'text-amber-600'
                    : 'text-emerald-600'
                }`}
              >
                ⚠️ {safeItem.risk}% Risk
              </span>
              <span className="flex items-center gap-1 min-w-0">
                <Calendar className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" />
                <span className="truncate">{safeItem.age}</span>
              </span>
            </div>
          </div>
        </div>

        <div className="text-left md:text-right md:min-w-[8rem]">
          <div className="text-lg sm:text-xl md:text-2xl font-black text-slate-900 whitespace-nowrap">
            {requested.toLocaleString()} QAR
          </div>
          <div className="text-slate-500 text-xs sm:text-sm">
            Goal: {goal.toLocaleString()} QAR
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4 sm:mb-6">
        <div className="flex justify-between text-xs sm:text-sm text-slate-600 mb-2">
          <span>Funding Progress</span>
          <span className="font-semibold">{progress.toFixed(0)}%</span>
        </div>
        <div className="h-2.5 sm:h-3 w-full bg-slate-200 rounded-2xl overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl transition-all duration-500"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
      </div>

      {/* Confirmation Dialog */}
      {confirmAction && (
        <div className="mb-4 p-3 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200">
          <p className="text-xs sm:text-sm text-slate-700 mb-3">
            Are you sure you want to <strong>{confirmAction}</strong> this campaign?
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={() => setConfirmAction(null)}
              className="px-3 sm:px-4 py-2 rounded-2xl border border-slate-300 text-xs sm:text-sm text-slate-700 hover:bg-white transition-all flex-1"
            >
              Cancel
            </button>
            <button
              onClick={confirmActionHandler}
              className={`px-3 sm:px-4 py-2 rounded-2xl text-xs sm:text-sm text-white font-semibold transition-all flex-1 ${
                confirmAction === 'approve'
                  ? 'bg-emerald-500 hover:bg-emerald-600'
                  : 'bg-rose-500 hover:bg-rose-600'
              }`}
            >
              Confirm {confirmAction}
            </button>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
        <button
          onClick={() => onOpen?.(safeItem)}
          className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 rounded-2xl border-2 border-slate-300 bg-white text-xs sm:text-sm text-slate-700 font-semibold hover:bg-slate-50 transition-all flex-1"
        >
          <Eye className="w-4 h-4" />
          View
        </button>

        <button
          onClick={handleQuickReject}
          className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 rounded-2xl bg-rose-500 text-xs sm:text-sm text-white font-semibold hover:bg-rose-600 transition-all flex-1"
        >
          <XCircle className="w-4 h-4" />
          Reject
        </button>

        <button
          onClick={handleQuickApprove}
          className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-xs sm:text-sm text-white font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all flex-1"
        >
          <CheckCircle className="w-4 h-4" />
          Approve
        </button>
      </div>

      {/* Additional Info */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mt-4 pt-4 border-t border-slate-200">
        <span className="text-xs sm:text-sm text-slate-500 break-all">
          ID: {safeItem.id}
        </span>
        <button className="flex items-center justify-start sm:justify-end gap-1 text-xs sm:text-sm text-blue-600 hover:text-blue-700">
          <Download className="w-4 h-4" />
          Export Docs
        </button>
      </div>
    </div>
  );
}
