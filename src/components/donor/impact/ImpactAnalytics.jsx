import React from 'react';
import { Download, TrendingUp, PieChart, Target, Trophy, Users, MapPin, Award, Crown, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const ImpactAnalytics = ({ timeframe, setTimeframe }) => {
  // Sample data
  const impactMetrics = [
    { label: "Total People Helped", value: "12,847", change: "+15%", icon: Users },
    { label: "Communities Reached", value: "48", change: "+8", icon: MapPin },
    { label: "Campaign Success Rate", value: "94%", change: "+6%", icon: Target },
    { label: "Schools Built", value: "12", change: "+3", icon: Award }
  ];

  const categoryBreakdown = [
    { name: "Education", value: 35, color: "bg-emerald-500", amount: "$147,000" },
    { name: "Healthcare", value: 28, color: "bg-teal-500", amount: "$117,600" },
    { name: "Emergency Relief", value: 20, color: "bg-amber-500", amount: "$84,000" },
    { name: "Environment", value: 12, color: "bg-blue-500", amount: "$50,400" },
    { name: "Community", value: 5, color: "bg-purple-500", amount: "$21,000" }
  ];

  const renderCategoryChart = () => {
    return (
      <div className="space-y-4">
        {categoryBreakdown.map((category, index) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4"
          >
            <div className="flex items-center gap-3 sm:gap-4 flex-1">
              <div className={`w-5 h-5 sm:w-6 sm:h-6 ${category.color} rounded-lg shadow-lg`} />
              <span className="text-base sm:text-lg font-semibold text-gray-700">
                {category.name}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
              <div className="w-full sm:w-48 bg-gray-200 rounded-full h-2.5 sm:h-3 shadow-inner">
                <motion.div
                  className={`h-2.5 sm:h-3 rounded-full ${category.color} shadow-lg`}
                  initial={{ width: 0 }}
                  animate={{ width: `${category.value}%` }}
                  transition={{ duration: 1, delay: index * 0.2 }}
                />
              </div>
              <span className="text-sm sm:text-lg font-bold text-gray-900 sm:w-24 text-right">
                {category.amount}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-8 sm:space-y-12">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
          Impact Analytics & Insights
        </h2>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full lg:w-auto">
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 border-2 border-emerald-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm sm:text-base font-semibold"
          >
            <option value="monthly">Monthly View</option>
            <option value="yearly">Yearly View</option>
          </select>
          <button className="w-full sm:w-auto flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-2xl text-sm sm:text-base font-bold hover:from-emerald-600 hover:to-teal-600 transition-all shadow-lg hover:shadow-xl">
            <Download className="w-4 h-4 sm:w-5 sm:h-5" />
            Export Analytics
          </button>
        </div>
      </div>

      {/* Impact Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {impactMetrics.map((metric, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gradient-to-br from-white to-emerald-50 rounded-3xl p-5 sm:p-6 shadow-2xl border-2 border-emerald-100 hover:shadow-3xl transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <metric.icon className="w-7 h-7 sm:w-10 sm:h-10 text-emerald-600" />
              <span className="text-xs sm:text-sm font-bold text-emerald-600 bg-emerald-100 px-2 sm:px-3 py-1.5 sm:py-2 rounded-full">
                {metric.change}
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-gray-900 mb-1 sm:mb-2">
              {metric.value}
            </div>
            <div className="text-sm sm:text-base text-gray-600 font-semibold">
              {metric.label}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Category Breakdown */}
      <div className="bg-white rounded-3xl p-5 sm:p-8 shadow-2xl border-2 border-emerald-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2 sm:gap-3">
            <PieChart className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600" />
            Impact Category Breakdown
          </h3>
          <span className="text-sm sm:text-lg text-emerald-600 font-bold bg-emerald-50 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full self-start md:self-auto">
            Total Impact: $420,000
          </span>
        </div>
        {renderCategoryChart()}
      </div>
    </div>
  );
};

export default ImpactAnalytics;
