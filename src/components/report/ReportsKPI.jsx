import React, { useState } from "react";
import { BarChart3, PieChart, TrendingUp, Download, Filter } from "lucide-react";

const views = ["By Charity", "By Category", "By Region"];

const dataByView = {
  "By Charity": [
    { label: "Qatar Relief", value: 120000, color: "#10b981" },
    { label: "Hope Education", value: 80000, color: "#059669" },
    { label: "Health Society", value: 65000, color: "#047857" },
  ],
  "By Category": [
    { label: "Health", value: 140000, color: "#3b82f6" },
    { label: "Education", value: 90000, color: "#2563eb" },
    { label: "Food Relief", value: 75000, color: "#1d4ed8" },
  ],
  "By Region": [
    { label: "Doha", value: 180000, color: "#8b5cf6" },
    { label: "Al Rayyan", value: 70000, color: "#7c3aed" },
    { label: "Al Khor", value: 30000, color: "#6d28d9" },
  ],
};

export default function ReportsKPI() {
  const [activeView, setActiveView] = useState("By Charity");
  const [timeRange, setTimeRange] = useState("monthly");
  const items = dataByView[activeView];
  const total = items.reduce((sum, item) => sum + item.value, 0);

  const handleExport = () => {
    alert(`Exporting ${activeView} data as PDF`);
  };

  const handleFilter = () => {
    alert("Opening filter options");
  };

  // ✅ Fixed: no mutation of React elements, just use a running cumulative percent
  const PieChartComponent = () => {
    let cumulativePercent = 0;

    const circles = items.map((item, index) => {
      const percent = (item.value / total) * 100;
      const dashArray = `${percent} ${100 - percent}`;
      const dashOffset = -cumulativePercent;
      cumulativePercent += percent;

      return (
        <circle
          key={index}
          cx="16"
          cy="16"
          r="15.9155"
          fill="transparent"
          stroke={item.color}
          strokeWidth="2"
          strokeDasharray={dashArray}
          strokeDashoffset={dashOffset}
          className="transition-all duration-700"
        />
      );
    });

    return (
      <div className="relative w-28 h-28 sm:w-32 sm:h-32 mx-auto">
        <svg
          viewBox="0 0 32 32"
          className="w-28 h-28 sm:w-32 sm:h-32 transform -rotate-90"
        >
          {circles}
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-base sm:text-lg font-bold text-emerald-900">
            {Math.round(total / 1000)}K
          </span>
        </div>
      </div>
    );
  };

  const BarChartComponent = () => {
    const maxVal = Math.max(...items.map((i) => i.value));
    return (
      <div className="flex items-end justify-center gap-3 sm:gap-4 h-32 mt-4 w-full">
        {items.map((item, index) => (
          <div key={index} className="flex flex-col items-center min-w-[2rem]">
            <div className="text-[11px] sm:text-xs text-emerald-600 mb-1 font-semibold">
              {Math.round(item.value / 1000)}K
            </div>
            <div
              className="w-7 sm:w-10 rounded-t-lg transition-all duration-700 hover:opacity-80 cursor-pointer"
              style={{
                height: `${(item.value / maxVal) * 80}px`,
                backgroundColor: item.color,
              }}
              onClick={() =>
                alert(
                  `Details for ${item.label}: ${item.value.toLocaleString()} QAR`
                )
              }
            />
            <div className="text-[11px] sm:text-xs text-emerald-900 mt-2 text-center font-medium">
              {item.label.split(" ")[0]}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl border border-emerald-200 shadow-xl w-full">
      <div className="p-4 sm:p-6 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-t-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-3">
            <BarChart3 className="text-white" size={28} />
            <div>
              <h3 className="text-lg sm:text-xl font-bold">KPI Dashboards</h3>
              <p className="text-xs sm:text-sm text-emerald-100">
                Pre-built analytical views with charts
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 justify-start lg:justify-end">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-white/20 text-white rounded-xl px-3 py-2 text-xs sm:text-sm border border-white/30 focus:outline-none"
            >
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
            </select>
            <button
              onClick={handleFilter}
              className="flex items-center gap-1.5 sm:gap-2 bg-white/20 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm hover:bg-white/30 transition-colors"
            >
              <Filter size={16} />
              Filter
            </button>
            <button
              onClick={handleExport}
              className="flex items-center gap-1.5 sm:gap-2 bg-white text-emerald-600 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm hover:bg-emerald-50 transition-colors"
            >
              <Download size={16} />
              Export
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-6">
          {views.map((view) => (
            <button
              key={view}
              onClick={() => setActiveView(view)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                activeView === view
                  ? "bg-emerald-500 text-white shadow-lg"
                  : "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
              }`}
            >
              {view}
            </button>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Chart Section */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <PieChart className="text-emerald-600" size={20} />
                <h4 className="font-semibold text-emerald-900 text-sm sm:text-base">
                  Distribution Overview
                </h4>
              </div>
              <span className="text-xs sm:text-sm text-emerald-600 bg-white px-2 py-1 rounded self-start sm:self-auto">
                Total: {total.toLocaleString()} QAR
              </span>
            </div>
            <div className="flex flex-col items-center">
              <PieChartComponent />
              <BarChartComponent />
            </div>
          </div>

          {/* Stats Section */}
          <div className="space-y-4">
            <div className="bg-white border border-emerald-200 rounded-xl p-4 sm:p-5">
              <div className="flex items-center gap-2 sm:gap-3 mb-3">
                <TrendingUp className="text-emerald-600" size={20} />
                <h4 className="font-semibold text-emerald-900 text-sm sm:text-base">
                  Performance Summary
                </h4>
              </div>
              <div className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm">
                <div className="flex justify-between p-2 hover:bg-emerald-50 rounded">
                  <span className="text-emerald-600">Total Donations</span>
                  <span className="font-bold text-emerald-900">
                    {total.toLocaleString()} QAR
                  </span>
                </div>
                <div className="flex justify-between p-2 hover:bg-emerald-50 rounded">
                  <span className="text-emerald-600">Top Performer</span>
                  <span className="font-semibold text-emerald-900">
                    {items[0].label}
                  </span>
                </div>
                <div className="flex justify-between p-2 hover:bg-emerald-50 rounded">
                  <span className="text-emerald-600">Average</span>
                  <span className="font-semibold text-emerald-900">
                    {(total / items.length).toLocaleString()} QAR
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-emerald-200 rounded-xl p-4 sm:p-5">
              <h4 className="font-semibold text-emerald-900 mb-3 text-sm sm:text-base">
                Detailed Breakdown
              </h4>
              <div className="space-y-2">
                {items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 hover:bg-emerald-50 rounded cursor-pointer"
                    onClick={() => alert(`Detailed view for ${item.label}`)}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-xs sm:text-sm text-emerald-900">
                        {item.label}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="font-semibold text-emerald-900 text-xs sm:text-sm">
                        {item.value.toLocaleString()} QAR
                      </span>
                      <span className="text-[11px] sm:text-xs text-emerald-600 ml-2">
                        ({Math.round((item.value / total) * 100)}%)
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
