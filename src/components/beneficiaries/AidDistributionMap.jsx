import React, { useState } from "react";
import { Map, BarChart3, Users, TrendingUp, Filter } from "lucide-react";

const districts = [
  { name: "Al Sadd", households: 120, growth: 12, aidTypes: ["Food", "Rent", "Medical"], color: "emerald" },
  { name: "Al Rayyan", households: 95, growth: 8, aidTypes: ["Education", "Food"], color: "green" },
  { name: "Al Wakrah", households: 80, growth: 15, aidTypes: ["Medical", "Emergency"], color: "blue" },
  { name: "Al Khor", households: 55, growth: -2, aidTypes: ["Food", "Shelter"], color: "yellow" },
  { name: "Al Shamal", households: 25, growth: 5, aidTypes: ["Food", "Education"], color: "purple" },
  { name: "Dukhan", households: 15, growth: 20, aidTypes: ["Emergency", "Medical"], color: "red" },
];

export default function AidDistributionMap() {
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [sortBy, setSortBy] = useState("households");
  const [view, setView] = useState("grid"); // grid or chart

  const totalHouseholds = districts.reduce((sum, d) => sum + d.households, 0);
  const topDistrict = districts.reduce((a, b) => a.households > b.households ? a : b);

  const sortedDistricts = [...districts].sort((a, b) => {
    if (sortBy === "households") return b.households - a.households;
    if (sortBy === "growth") return b.growth - a.growth;
    if (sortBy === "name") return a.name.localeCompare(b.name);
    return 0;
  });

  const getColorClass = (color) => {
    const colors = {
      emerald: "bg-emerald-500",
      green: "bg-green-500",
      blue: "bg-blue-500",
      yellow: "bg-yellow-500",
      purple: "bg-purple-500",
      red: "bg-red-500"
    };
    return colors[color] || "bg-emerald-500";
  };

  return (
    <div className="bg-white rounded-2xl border border-emerald-100 shadow-lg">
      {/* Header */}
      <div className="p-6 border-b border-emerald-50">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-emerald-900">Aid Distribution Map</h3>
            <p className="text-emerald-600 mt-1">Geographic analysis of aid distribution</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex bg-emerald-50 rounded-lg p-1">
              <button
                onClick={() => setView("grid")}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                  view === "grid" ? "bg-white text-emerald-700 shadow-sm" : "text-emerald-600"
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setView("chart")}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                  view === "chart" ? "bg-white text-emerald-700 shadow-sm" : "text-emerald-600"
                }`}
              >
                Chart
              </button>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-emerald-200 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-emerald-500"
            >
              <option value="households">Sort by Households</option>
              <option value="growth">Sort by Growth</option>
              <option value="name">Sort by Name</option>
            </select>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-500 p-2 rounded-lg">
                <Users className="text-white" size={20} />
              </div>
              <div>
                <p className="text-sm text-emerald-600">Total Households</p>
                <p className="text-2xl font-bold text-emerald-900">{totalHouseholds}</p>
              </div>
            </div>
          </div>
          <div className="bg-green-50 rounded-xl p-4 border border-green-200">
            <div className="flex items-center gap-3">
              <div className="bg-green-500 p-2 rounded-lg">
                <Map className="text-white" size={20} />
              </div>
              <div>
                <p className="text-sm text-green-600">Districts Covered</p>
                <p className="text-2xl font-bold text-green-900">{districts.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
            <div className="flex items-center gap-3">
              <div className="bg-blue-500 p-2 rounded-lg">
                <TrendingUp className="text-white" size={20} />
              </div>
              <div>
                <p className="text-sm text-blue-600">Top District</p>
                <p className="text-lg font-bold text-blue-900">{topDistrict.name}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {view === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sortedDistricts.map((district) => (
              <div
                key={district.name}
                className="bg-emerald-50 rounded-xl border border-emerald-200 p-4 hover:bg-white hover:shadow-md transition-all cursor-pointer"
                onClick={() => setSelectedDistrict(district)}
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-emerald-900">{district.name}</h4>
                  <div className={`w-3 h-3 rounded-full ${getColorClass(district.color)}`} />
                </div>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm text-emerald-700 mb-1">
                      <span>Households Reached</span>
                      <span className="font-semibold">{district.households}</span>
                    </div>
                    <div className="w-full bg-emerald-100 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-700 ${getColorClass(district.color)}`}
                        style={{ width: `${(district.households / totalHouseholds) * 100}%` }}
                      />
                    </div>
                    <p className="text-xs text-emerald-600 text-right mt-1">
                      {Math.round((district.households / totalHouseholds) * 100)}% of total
                    </p>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className={`text-sm font-medium ${
                      district.growth >= 0 ? "text-green-600" : "text-red-600"
                    }`}>
                      {district.growth >= 0 ? "+" : ""}{district.growth}% growth
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {district.aidTypes.slice(0, 2).map((type, index) => (
                        <span
                          key={index}
                          className="bg-white px-2 py-1 rounded text-xs text-emerald-700 border border-emerald-200"
                        >
                          {type}
                        </span>
                      ))}
                      {district.aidTypes.length > 2 && (
                        <span className="bg-white px-2 py-1 rounded text-xs text-emerald-500 border border-emerald-200">
                          +{district.aidTypes.length - 2}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {sortedDistricts.map((district) => (
              <div key={district.name} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-emerald-900">{district.name}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-emerald-700">{district.households} households</span>
                    <span className={`text-sm ${
                      district.growth >= 0 ? "text-green-600" : "text-red-600"
                    }`}>
                      {district.growth >= 0 ? "+" : ""}{district.growth}%
                    </span>
                  </div>
                </div>
                <div className="w-full bg-emerald-100 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all duration-1000 ${getColorClass(district.color)}`}
                    style={{ width: `${(district.households / totalHouseholds) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedDistrict && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-lg font-bold text-emerald-900 mb-4">{selectedDistrict.name} District</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-emerald-50 p-3 rounded-lg">
                  <p className="text-sm text-emerald-600">Households</p>
                  <p className="text-xl font-bold text-emerald-900">{selectedDistrict.households}</p>
                </div>
                <div className={`p-3 rounded-lg ${
                  selectedDistrict.growth >= 0 ? "bg-green-50" : "bg-red-50"
                }`}>
                  <p className="text-sm text-emerald-600">Growth</p>
                  <p className={`text-xl font-bold ${
                    selectedDistrict.growth >= 0 ? "text-green-900" : "text-red-900"
                  }`}>
                    {selectedDistrict.growth >= 0 ? "+" : ""}{selectedDistrict.growth}%
                  </p>
                </div>
              </div>
              <div>
                <p className="text-sm text-emerald-600 mb-2">Aid Types</p>
                <div className="flex flex-wrap gap-2">
                  {selectedDistrict.aidTypes.map((type, index) => (
                    <span
                      key={index}
                      className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm"
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <button
              onClick={() => setSelectedDistrict(null)}
              className="w-full mt-6 bg-emerald-500 text-white py-2 rounded-lg hover:bg-emerald-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}