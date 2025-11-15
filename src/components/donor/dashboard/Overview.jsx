import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import DonationTabsContent from "./DonationsFilters";
import QuickDonateModal from "./DonationsStatsTable";

const MyDonations = () => {
  const [activeTab, setActiveTab] = useState("history");
  const [filter, setFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ 
    amount: "", 
    campaign: "", 
    type: "relief", 
    paymentMethod: "card" 
  });

  const [history, setHistory] = useState([
    {
      id: 1,
      date: "12 Nov 2025",
      campaign: "Emergency Relief Fund",
      amount: 500,
      paymentMethod: "Card",
      status: "Completed",
      type: "relief"
    },
    {
      id: 2,
      date: "01 Nov 2025",
      campaign: "Education Support Program",
      amount: 250,
      paymentMethod: "Apple Pay",
      status: "Completed",
      type: "education"
    },
    {
      id: 3,
      date: "18 Oct 2025",
      campaign: "Health Aid Qatar",
      amount: 400,
      paymentMethod: "Bank Transfer",
      status: "Processing",
      type: "health"
    }
  ]);

  const [plans, setPlans] = useState([
    {
      id: 1,
      title: "Monthly Orphan Support",
      status: "Active",
      info: "QAR 300 / month · 5th of each month",
      amount: 300,
      nextCharge: "05 Dec 2025",
      type: "orphans"
    },
    {
      id: 2,
      title: "Food Basket Program",
      status: "Paused",
      info: "QAR 150 / month · 20th of each month",
      amount: 150,
      nextCharge: "Paused",
      type: "relief"
    },
    {
      id: 3,
      title: "Education Scholarship",
      status: "Active",
      info: "QAR 500 / month · 1st of each month",
      amount: 500,
      nextCharge: "01 Dec 2025",
      type: "education"
    }
  ]);

  useEffect(() => {
    AOS.init({ duration: 600, once: true });
  }, []);

  const totalDonated = history.reduce((sum, donation) => sum + donation.amount, 0);
  const thisYearDonations = totalDonated;
  const activePlans = plans.filter(plan => plan.status === "Active").length;

  const addDonation = (e) => {
    e.preventDefault();
    if (!form.amount || !form.campaign) return;
    
    const today = new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
    
    const newDonation = {
      id: Date.now(),
      date: today,
      campaign: form.campaign,
      amount: +form.amount,
      paymentMethod: form.paymentMethod,
      status: "Completed",
      type: form.type
    };
    
    setHistory([newDonation, ...history]);
    setForm({ amount: "", campaign: "", type: "relief", paymentMethod: "card" });
    setShowModal(false);
  };

  const handlePlanAction = (planId, action) => {
    setPlans(plans.map(plan => {
      if (plan.id !== planId) return plan;
      
      switch (action) {
        case "cancel":
          return { ...plan, status: "Cancelled" };
        case "pause":
          return { ...plan, status: "Paused" };
        case "resume":
          return { ...plan, status: "Active" };
        case "edit":
          alert(`Edit functionality for ${plan.title} coming soon!`);
          return plan;
        default:
          return plan;
      }
    }));
  };

  const filteredHistory = filter === "all" 
    ? history 
    : history.filter(donation => donation.type === filter);

  const downloadReceipt = (donationId) => {
    const donation = history.find(d => d.id === donationId);
    if (donation) {
      alert(`Downloading receipt for ${donation.campaign} - QAR ${donation.amount}`);
    }
  };

  const sendEmailReceipt = (donationId) => {
    const donation = history.find(d => d.id === donationId);
    if (donation) {
      alert(`Email receipt sent for ${donation.campaign}`);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed": return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "Processing": return "bg-amber-100 text-amber-800 border-amber-200";
      case "Failed": return "bg-rose-100 text-rose-800 border-rose-200";
      default: return "bg-slate-100 text-slate-800 border-slate-200";
    }
  };

  const getTypeIcon = (type) => {
    const icons = {
      health: "🏥",
      education: "📚",
      relief: "🆘",
      orphans: "👧🏽"
    };
    return icons[type] || "❤️";
  };

  const getPlanStatusConfig = (status) => {
    const configs = {
      Active: { color: "bg-emerald-100 text-emerald-800 border-emerald-200", icon: "🟢" },
      Paused: { color: "bg-amber-100 text-amber-800 border-amber-200", icon: "⏸️" },
      Cancelled: { color: "bg-rose-100 text-rose-800 border-rose-200", icon: "❌" }
    };
    return configs[status] || configs.Active;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-teal-50 px-4 py-8">
      <div className="w-full max-w-6xl rounded-3xl border border-emerald-200 bg-white shadow-[0_25px_70px_rgba(16,185,129,0.15)] p-6 sm:p-8" data-aos="zoom-in">
        
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="relative">
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-400 text-white shadow-lg text-xl">
                💳
              </span>
              <div className="absolute -top-1 -right-1 h-5 w-5 bg-rose-500 rounded-full border-2 border-white flex items-center justify-center">
                <span className="text-xs text-white">✨</span>
              </div>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-emerald-900">My Donations</h1>
              <p className="text-sm text-emerald-700 mt-1">
                Track your generosity, manage recurring plans, and see your impact
              </p>
            </div>
          </div>
          <button 
            onClick={() => setShowModal(true)}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 text-white text-sm font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
          >
            <span className="text-lg">+</span>
            Quick Donate
          </button>
        </header>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8" data-aos="fade-up">
          {[
            {
              label: "Total Donated",
              value: `QAR ${totalDonated.toLocaleString()}`,
              icon: "💰",
              trend: "+12% this month",
              color: "from-emerald-500 to-emerald-400"
            },
            {
              label: "Active Recurring",
              value: `${activePlans} Plans`,
              icon: "🔄",
              trend: "Auto-renewing",
              color: "from-teal-500 to-teal-400"
            },
            {
              label: "This Year",
              value: `QAR ${thisYearDonations.toLocaleString()}`,
              icon: "📊",
              trend: "2025 YTD",
              color: "from-cyan-500 to-cyan-400"
            }
          ].map((stat, index) => (
            <div 
              key={stat.label}
              className="relative rounded-2xl bg-gradient-to-br from-white to-emerald-50 border border-emerald-100 p-5 shadow-sm hover:shadow-md transition-shadow duration-300 group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{stat.icon}</span>
                  <div>
                    <h3 className="text-xs font-medium text-emerald-600 uppercase tracking-wide">
                      {stat.label}
                    </h3>
                    <p className="text-lg font-bold text-emerald-900 mt-1">
                      {stat.value}
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-xs text-emerald-500 font-medium">{stat.trend}</p>
              <div className={`absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r ${stat.color} rounded-b-2xl`}></div>
            </div>
          ))}
        </div>

        {/* Tabs and Content */}
        <DonationTabsContent 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          filter={filter}
          setFilter={setFilter}
          filteredHistory={filteredHistory}
          plans={plans}
          getStatusColor={getStatusColor}
          getTypeIcon={getTypeIcon}
          getPlanStatusConfig={getPlanStatusConfig}
          handlePlanAction={handlePlanAction}
          downloadReceipt={downloadReceipt}
          sendEmailReceipt={sendEmailReceipt}
        />

        {/* Quick Donate Modal */}
        <QuickDonateModal 
          showModal={showModal}
          setShowModal={setShowModal}
          form={form}
          setForm={setForm}
          addDonation={addDonation}
        />
      </div>
    </div>
  );
};

export default MyDonations;