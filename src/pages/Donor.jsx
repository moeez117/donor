// File: src/pages/Dashboard.jsx
import React, { useState } from "react";
import {
  FaDonate,
  FaChartLine,
  FaProjectDiagram,
  FaHandsHelping,
} from "react-icons/fa";
import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

export default function Dashboard() {
  const [goalProgress] = useState(72);

  const stats = [
    { title: "Total Donations", value: "₳ 450", icon: <FaDonate /> },
    { title: "Active Campaigns", value: "3", icon: <FaProjectDiagram /> },
    { title: "Impact Score", value: "85%", icon: <FaChartLine /> },
  ];

  const donationData = [
    { name: "Education", value: 250 },
    { name: "Medical", value: 150 },
    { name: "Relief", value: 50 },
  ];

  const monthlyData = [
    { month: "Jan", donations: 50 },
    { month: "Feb", donations: 70 },
    { month: "Mar", donations: 90 },
    { month: "Apr", donations: 120 },
    { month: "May", donations: 160 },
    { month: "Jun", donations: 140 },
  ];

  return (
    <div className="space-y-10 bg-gradient-to-b from-gray-50 via-white to-gray-100 min-h-screen p-4 sm:p-6">
      {/* Header */}
      <motion.div
        className="rounded-2xl shadow-lg overflow-hidden border border-gray-200"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-gray-800 text-white p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight">
                Donor Overview
              </h1>
              <p className="mt-2 text-emerald-100/90 max-w-xl">
                Track donations, campaigns, and real-time impact — beautifully
                visualized with modern charts and smooth transitions.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <button className="px-5 py-2.5 bg-white/15 hover:bg-white/25 rounded-xl font-medium transition-all">
                  Make a Donation
                </button>
                <button className="px-5 py-2.5 border border-white/40 hover:bg-white/15 rounded-xl font-medium transition-all">
                  Create Campaign
                </button>
              </div>
            </div>

            <div className="bg-white/15 p-5 rounded-xl text-center shadow-inner backdrop-blur-sm">
              <FaHandsHelping size={32} className="mx-auto mb-2 text-emerald-200" />
              <p className="text-sm text-emerald-100/80">Annual Goal</p>
              <p className="text-2xl font-bold">₳ 1,000</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="mx-6 -mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-transform hover:-translate-y-1 hover:scale-[1.02] border border-gray-100"
              whileHover={{ scale: 1.03 }}
            >
              <div className="flex items-center gap-4">
                <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-100 to-teal-100 text-emerald-600 text-2xl shadow-inner">
                  {s.icon}
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">{s.title}</p>
                  <p className="text-2xl font-bold text-gray-800">{s.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bar Chart */}
        <motion.div
          className="col-span-2 bg-white rounded-2xl p-6 shadow-md border border-gray-100"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Donation Goal Progress
          </h2>
          <p className="text-gray-600 mb-4">
            You’ve achieved <strong>{goalProgress}%</strong> of your annual
            target.
          </p>

          <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden mb-6">
            <motion.div
              className="h-4 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-gray-700"
              initial={{ width: 0 }}
              animate={{ width: `${goalProgress}%` }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
          </div>

          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={monthlyData}>
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.9} />
                  <stop offset="95%" stopColor="#065f46" stopOpacity={0.8} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" tick={{ fill: "#4b5563" }} />
              <YAxis tick={{ fill: "#4b5563" }} />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="donations"
                fill="url(#barGradient)"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Pie Chart */}
        <motion.div
          className="bg-white rounded-2xl p-6 shadow-md border border-gray-100"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Donation Distribution
          </h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <defs>
                <linearGradient id="pieGrad1" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#064e3b" />
                </linearGradient>
                <linearGradient id="pieGrad2" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#0d9488" />
                  <stop offset="100%" stopColor="#134e4a" />
                </linearGradient>
                <linearGradient id="pieGrad3" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#34d399" />
                  <stop offset="100%" stopColor="#065f46" />
                </linearGradient>
              </defs>
              <Pie
                data={donationData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label
              >
                {donationData.map((_, i) => (
                  <Cell key={i} fill={`url(#pieGrad${i + 1})`} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        className="bg-white rounded-2xl p-6 shadow-md border border-gray-100"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Recent Activity
        </h2>
        <ul className="space-y-3">
          {[
            { action: "Donated ₳150", detail: "Education for All — 2025-11-01" },
            { action: "Donated ₳300", detail: "Medical Aid — 2025-11-05" },
            { action: "Joined Campaign", detail: "Clean Water Campaign — 2025-11-07" },
          ].map((a, i) => (
            <motion.li
              key={i}
              className="flex items-start gap-4 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl hover:shadow-md hover:bg-emerald-100/70 transition"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-3 h-3 rounded-full bg-emerald-600 mt-3" />
              <div>
                <p className="text-gray-800 font-semibold">{a.action}</p>
                <p className="text-sm text-gray-600">{a.detail}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}
