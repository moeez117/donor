// src/components/approvals/ApprovalList.jsx
import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";

export default function ApprovalList({ items = [], onApprove, onReject, onOpen }) {
  const [sortBy, setSortBy] = useState("risk");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [selectedItems, setSelectedItems] = useState(new Set());

  const safeItems = items || [];

  const sortedItems = useMemo(() => {
    const sorted = [...safeItems];
    switch (sortBy) {
      case "risk":
        return sorted.sort((a, b) => (b?.risk || 0) - (a?.risk || 0));
      case "goal":
        return sorted.sort((a, b) => (b?.goal || 0) - (a?.goal || 0));
      case "age":
        return sorted.sort((a, b) => {
          const ageA = parseInt(a?.age) || 0;
          const ageB = parseInt(b?.age) || 0;
          return ageB - ageA;
        });
      default:
        return sorted;
    }
  }, [safeItems, sortBy]);

  const totalPages = Math.ceil(sortedItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = sortedItems.slice(startIndex, startIndex + itemsPerPage);

  const toggleSelectItem = (id) => {
    const newSelected = new Set(selectedItems);
    newSelected.has(id) ? newSelected.delete(id) : newSelected.add(id);
    setSelectedItems(newSelected);
  };

  const selectAll = () => {
    if (selectedItems.size === paginatedItems.length) {
      setSelectedItems(new Set());
    } else {
      const validIds = paginatedItems.map(item => item?.id).filter(Boolean);
      setSelectedItems(new Set(validIds));
    }
  };

  const handleBulkApprove = () => {
    if (selectedItems.size > 0) {
      alert(`Approving ${selectedItems.size} selected campaigns`);
      setSelectedItems(new Set());
    }
  };

  const handleBulkReject = () => {
    if (selectedItems.size > 0) {
      alert(`Rejecting ${selectedItems.size} selected campaigns`);
      setSelectedItems(new Set());
    }
  };

  const handleExport = () => {
    alert(`Exporting ${sortedItems.length} campaigns`);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Toolbar */}
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 p-4 sm:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            <div className="flex items-baseline gap-2">
              <div className="text-xl sm:text-2xl font-bold text-slate-900">{sortedItems.length}</div>
              <div className="text-sm sm:text-base text-slate-600">campaigns found</div>
            </div>
            
            {selectedItems.size > 0 && (
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <span className="text-xs sm:text-sm font-semibold text-blue-600">
                  {selectedItems.size} selected
                </span>
                <button
                  onClick={handleBulkApprove}
                  className="px-3 sm:px-4 py-2 rounded-2xl bg-emerald-500 text-white text-xs sm:text-sm font-semibold hover:bg-emerald-600 transition-all"
                >
                  Approve Selected
                </button>
                <button
                  onClick={handleBulkReject}
                  className="px-3 sm:px-4 py-2 rounded-2xl bg-rose-500 text-white text-xs sm:text-sm font-semibold hover:bg-rose-600 transition-all"
                >
                  Reject Selected
                </button>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full xs:w-auto px-3 sm:px-4 py-2.5 sm:py-3 rounded-2xl border-2 border-slate-200 text-xs sm:text-sm focus:border-blue-500 outline-none transition-all"
            >
              <option value="risk">Sort by Risk</option>
              <option value="goal">Sort by Goal</option>
              <option value="age">Sort by Age</option>
            </select>

            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="w-full xs:w-auto px-3 sm:px-4 py-2.5 sm:py-3 rounded-2xl border-2 border-slate-200 text-xs sm:text-sm focus:border-blue-500 outline-none transition-all"
            >
              <option value={6}>6 per page</option>
              <option value={12}>12 per page</option>
              <option value={24}>24 per page</option>
            </select>

            <button
              onClick={handleExport}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 rounded-2xl border-2 border-slate-300 bg-white text-xs sm:text-sm text-slate-700 font-semibold hover:bg-slate-50 transition-all"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* List Header (desktop/tablet only) */}
      {paginatedItems.length > 0 && (
        <div className="hidden md:block bg-white rounded-3xl shadow-2xl border border-slate-100 p-4">
          <div className="flex items-center gap-4">
            <input
              type="checkbox"
              checked={selectedItems.size === paginatedItems.length && paginatedItems.length > 0}
              onChange={selectAll}
              className="w-5 h-5 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
            />
            <div className="flex-1 grid grid-cols-12 gap-4 text-sm font-semibold text-slate-600">
              <div className="col-span-4">Campaign</div>
              <div className="col-span-2">Charity</div>
              <div className="col-span-2">Risk</div>
              <div className="col-span-2">Goal</div>
              <div className="col-span-2">Actions</div>
            </div>
          </div>
        </div>
      )}

      {/* Campaigns List */}
      <div className="space-y-3 sm:space-y-4">
        {paginatedItems.map((item, index) => (
          <CampaignRow
            key={item?.id || index}
            item={item}
            selected={selectedItems.has(item?.id)}
            onToggleSelect={() => item?.id && toggleSelectItem(item.id)}
            onApprove={onApprove}
            onReject={onReject}
            onOpen={onOpen}
            isEven={index % 2 === 0}
          />
        ))}
      </div>

      {/* Empty State */}
      {paginatedItems.length === 0 && (
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 p-10 sm:p-12 text-center">
          <div className="text-5xl sm:text-6xl mb-4">📭</div>
          <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2">No campaigns found</h3>
          <p className="text-sm sm:text-base text-slate-600">Try adjusting your filters or search criteria</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="text-xs sm:text-sm text-slate-600">
              Page{" "}
              <span className="font-bold text-slate-900">{currentPage}</span> of{" "}
              <span className="font-bold text-slate-900">{totalPages}</span>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-2xl border border-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition-all"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-2xl text-xs sm:text-sm font-semibold transition-all ${
                    currentPage === page
                      ? "bg-blue-600 text-white"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {page}
                </button>
              ))}
              
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-2xl border border-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition-all"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function CampaignRow({ item, selected, onToggleSelect, onApprove, onReject, onOpen, isEven }) {
  // Safe defaults for item properties
  const safeItem = item || {};
  const goal = safeItem.goal || 1;
  const requested = safeItem.requested || 0;
  const progress = (requested / goal) * 100;
  
  return (
    <div
      className={`bg-white rounded-3xl shadow-2xl border border-slate-100 p-4 sm:p-6 transition-all ${
        isEven ? "bg-white" : "bg-slate-50/50"
      } ${selected ? "ring-2 ring-blue-500 ring-opacity-20" : ""}`}
    >
      <div className="flex flex-col md:flex-row md:items-center gap-3 sm:gap-4">
        <div className="flex items-start md:items-center gap-3">
          <input
            type="checkbox"
            checked={selected}
            onChange={onToggleSelect}
            className="mt-0.5 md:mt-0 w-4 h-4 sm:w-5 sm:h-5 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
          />
        </div>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-start md:items-center">
          {/* Campaign Info */}
          <div className="md:col-span-4">
            <div className="flex items-start gap-2 sm:gap-3">
              <div
                className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full mt-1 sm:mt-1.5 ${
                  (safeItem.risk || 0) >= 60
                    ? "bg-rose-500"
                    : (safeItem.risk || 0) >= 25
                    ? "bg-amber-500"
                    : "bg-emerald-500"
                }`}
              />
              <div>
                <h4 className="text-sm sm:text-base font-semibold text-slate-900 break-words">
                  {safeItem.title || "Untitled Campaign"}
                </h4>
                <div className="mt-1 text-xs sm:text-sm text-slate-500">
                  <span className="inline-block bg-slate-100 px-2 py-1 rounded-lg">
                    {safeItem.category || "Uncategorized"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Charity */}
          <div className="md:col-span-2 text-xs sm:text-sm text-slate-700 font-medium">
            <span className="md:hidden font-semibold text-slate-500">Charity: </span>
            {safeItem.charity || "Unknown Charity"}
          </div>

          {/* Risk */}
          <div className="md:col-span-2">
            <div
              className={`inline-flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-2xl text-xs sm:text-sm font-semibold ${
                (safeItem.risk || 0) >= 60
                  ? "bg-rose-100 text-rose-700"
                  : (safeItem.risk || 0) >= 25
                  ? "bg-amber-100 text-amber-700"
                  : "bg-emerald-100 text-emerald-700"
              }`}
            >
              ⚠️ {safeItem.risk || 0}%
            </div>
          </div>

          {/* Goal */}
          <div className="md:col-span-2">
            <div className="text-left md:text-right">
              <div className="text-sm sm:text-base font-semibold text-slate-900">
                {requested.toLocaleString()} QAR
              </div>
              <div className="text-xs sm:text-sm text-slate-500">
                of {goal.toLocaleString()} QAR
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="md:col-span-2">
            <div className="flex flex-wrap md:flex-nowrap gap-2">
              <button
                onClick={() => onOpen?.(safeItem)}
                className="flex-1 px-3 py-2 rounded-2xl border border-slate-300 text-xs sm:text-sm text-slate-700 hover:bg-slate-50 transition-all font-semibold"
              >
                View
              </button>
              <button
                onClick={() => onReject?.(safeItem)}
                className="flex-1 px-3 py-2 rounded-2xl bg-rose-500 text-xs sm:text-sm text-white hover:bg-rose-600 transition-all font-semibold"
              >
                Reject
              </button>
              <button
                onClick={() => onApprove?.(safeItem)}
                className="flex-1 px-3 py-2 rounded-2xl bg-emerald-500 text-xs sm:text-sm text-white hover:bg-emerald-600 transition-all font-semibold"
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-3 sm:mt-4 md:ml-9">
        <div className="flex justify-between text-xs sm:text-sm text-slate-600 mb-1.5 sm:mb-2">
          <span>Funding Progress</span>
          <span className="font-semibold">{progress.toFixed(0)}%</span>
        </div>
        <div className="h-2 sm:h-2.5 w-full bg-slate-200 rounded-2xl overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl transition-all duration-500"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}
