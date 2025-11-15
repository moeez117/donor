import React, { useState } from "react";
import { Bell, Shield, Globe, Plus, Trash2, Building, Users, MessageSquare, Target, Volume2, Mail } from "lucide-react";
import { motion } from "framer-motion";

// Missing components that need to be defined
const Toggle = ({ checked, onChange }) => (
  <button
    type="button"
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
      checked ? 'bg-emerald-600' : 'bg-gray-200'
    }`}
    onClick={onChange}
  >
    <span
      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
        checked ? 'translate-x-6' : 'translate-x-1'
      }`}
    />
  </button>
);

const PrefRow = ({ label, checked, onChange }) => (
  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
    <span className="font-semibold text-gray-900 text-sm">{label}</span>
    <Toggle checked={checked} onChange={() => onChange(!checked)} />
  </div>
);

const LangOption = ({ value, label, language, setLanguage }) => (
  <button
    onClick={() => setLanguage(value)}
    className={`w-full text-left p-3 rounded-lg transition-all ${
      language === value 
        ? 'bg-emerald-600 text-white' 
        : 'bg-gray-50 text-gray-900 hover:bg-emerald-50'
    }`}
  >
    <div className="font-semibold text-sm">{label}</div>
  </button>
);

const DonorProfilePreferences = () => {
  const [communication, setCommunication] = useState({
    emailNotifications: true,
    smsNotifications: false,
    monthlyReports: true,
    impactUpdates: true,
    campaignAlerts: true,
    newsletter: false
  });
  const [donationPrefs, setDonationPrefs] = useState({
    anonymousDonations: false,
    showAmountPublicly: true,
    preferredCategories: ["education", "healthcare"]
  });
  const [language, setLanguage] = useState("english");
  const [linkedAccounts, setLinkedAccounts] = useState([
    { id: 1, type: "corporate", name: "TechCorp Inc.", role: "Employee Giving Program", status: "active", joinedDate: "2023-03-15" },
    { id: 2, type: "family", name: "Family Giving Fund", role: "Co-manager", status: "active", joinedDate: "2023-08-22" }
  ]);

  const unlinkAccount = id => {
    setLinkedAccounts(prev => prev.filter(a => a.id !== id));
    alert("Account unlinked successfully!");
  };

  const toggleComm = key => {
    setCommunication(p => ({ ...p, [key]: !p[key] }));
  };

  const toggleCategory = (cat, checked) => {
    setDonationPrefs(p => ({
      ...p,
      preferredCategories: checked
        ? [...p.preferredCategories, cat]
        : p.preferredCategories.filter(c => c !== cat)
    }));
  };

  const communicationSettings = [
    { k: "emailNotifications", label: "Email Notifications", desc: "Account notifications via email", icon: Mail },
    { k: "smsNotifications", label: "SMS Notifications", desc: "Text messages for urgent updates", icon: MessageSquare },
    { k: "monthlyReports", label: "Monthly Reports", desc: "Detailed impact reports", icon: Target },
    { k: "impactUpdates", label: "Impact Updates", desc: "Real-time donation impact", icon: Shield },
    { k: "campaignAlerts", label: "Campaign Alerts", desc: "New donation opportunities", icon: Bell },
    { k: "newsletter", label: "Newsletter", desc: "Monthly charity news", icon: Volume2 }
  ];

  const categories = ["education", "healthcare", "emergency", "environment", "animals", "community"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-black mb-4 bg-gradient-to-r from-emerald-600 to-teal-700 bg-clip-text text-transparent">
            Preferences
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Navigation Sidebar */}
          <div className="xl:col-span-1 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-3xl shadow-2xl border-2 border-emerald-100 p-6"
            >
              <h3 className="font-bold text-gray-900 mb-4">Settings</h3>
              <div className="space-y-2">
                {[
                  { icon: Bell, label: "Communication", active: true },
                  { icon: Shield, label: "Donation", active: false },
                  { icon: Globe, label: "Language", active: false },
                  { icon: Users, label: "Accounts", active: false }
                ].map((item, index) => (
                  <button
                    key={index}
                    className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-emerald-50 rounded-lg transition-all text-sm font-semibold"
                  >
                    <item.icon className="w-4 h-4 text-emerald-600" />
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="xl:col-span-3">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Communication Preferences */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl shadow-2xl border-2 border-emerald-100 p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Bell className="w-6 h-6 text-emerald-600" />
                  <h3 className="text-lg font-bold text-gray-900">Communication</h3>
                </div>
                <div className="space-y-3">
                  {communicationSettings.map(item => (
                    <div key={item.k} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <item.icon className="w-4 h-4 text-emerald-600" />
                        <div>
                          <div className="font-semibold text-gray-900 text-sm">{item.label}</div>
                          <div className="text-gray-600 text-xs">{item.desc}</div>
                        </div>
                      </div>
                      <Toggle
                        checked={communication[item.k]}
                        onChange={() => toggleComm(item.k)}
                      />
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Donation Preferences */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-3xl shadow-2xl border-2 border-emerald-100 p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-6 h-6 text-emerald-600" />
                  <h3 className="text-lg font-bold text-gray-900">Donation</h3>
                </div>
                <div className="space-y-4">
                  <PrefRow
                    label="Anonymous Donations"
                    checked={donationPrefs.anonymousDonations}
                    onChange={v => setDonationPrefs(p => ({ ...p, anonymousDonations: v }))}
                  />
                  <PrefRow
                    label="Show Amount Publicly"
                    checked={donationPrefs.showAmountPublicly}
                    onChange={v => setDonationPrefs(p => ({ ...p, showAmountPublicly: v }))}
                  />
                  
                  <div className="bg-emerald-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 text-sm mb-3">Preferred Categories</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {categories.map(cat => (
                        <label key={cat} className="flex items-center gap-2 text-xs text-gray-700 capitalize">
                          <input
                            type="checkbox"
                            checked={donationPrefs.preferredCategories.includes(cat)}
                            onChange={e => toggleCategory(cat, e.target.checked)}
                            className="w-3 h-3 text-emerald-600 rounded"
                          />
                          {cat}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Language Preferences */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-3xl shadow-2xl border-2 border-emerald-100 p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Globe className="w-6 h-6 text-emerald-600" />
                  <h3 className="text-lg font-bold text-gray-900">Language</h3>
                </div>
                <div className="space-y-3">
                  <LangOption value="english" label="English" language={language} setLanguage={setLanguage} />
                  <LangOption value="arabic" label="العربية" language={language} setLanguage={setLanguage} />
                </div>
              </motion.div>

              {/* Linked Accounts */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-3xl shadow-2xl border-2 border-emerald-100 p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Users className="w-6 h-6 text-emerald-600" />
                    <h3 className="text-lg font-bold text-gray-900">Linked Accounts</h3>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all"
                  >
                    <Plus className="w-4 h-4" />
                  </motion.button>
                </div>
                <div className="space-y-3">
                  {linkedAccounts.map(acc => (
                    <div key={acc.id} className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                          {acc.type === "corporate" ? 
                            <Building className="w-4 h-4 text-emerald-600" /> : 
                            <Users className="w-4 h-4 text-emerald-600" />
                          }
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 text-sm">{acc.name}</div>
                          <div className="text-gray-600 text-xs">{acc.role}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-emerald-100 text-emerald-800 rounded text-xs font-bold">
                          {acc.status}
                        </span>
                        <button
                          onClick={() => unlinkAccount(acc.id)}
                          className="p-1 text-gray-400 hover:text-rose-600 transition-colors"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorProfilePreferences;