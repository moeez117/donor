import React, { useState } from "react";
import { Eye, EyeOff, CheckCircle, X, QrCode, Shield, Key, Clock, Lock, Smartphone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const DonorProfileSecurity = () => {
  const [security, setSecurity] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactorEnabled: false,
    lastPasswordChange: "2024-01-15"
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showTwoFASetup, setShowTwoFASetup] = useState(false);
  const [twoFACode, setTwoFACode] = useState("");

  const handlePasswordChange = () => {
    if (security.newPassword !== security.confirmPassword) {
      alert("New passwords don't match!");
      return;
    }
    setSecurity(p => ({ ...p, currentPassword: "", newPassword: "", confirmPassword: "" }));
    alert("Password changed successfully!");
  };

  const toggleTwoFA = () => {
    if (!security.twoFactorEnabled) setShowTwoFASetup(true);
    else {
      setSecurity(p => ({ ...p, twoFactorEnabled: false }));
      alert("Two-factor authentication disabled.");
    }
  };

  const completeTwoFASetup = () => {
    setSecurity(p => ({ ...p, twoFactorEnabled: true }));
    setShowTwoFASetup(false);
    setTwoFACode("");
    alert("Two-factor authentication enabled successfully!");
  };

  const securityStats = [
    { label: "Password Strength", value: "Strong", color: "text-emerald-600", bg: "bg-emerald-100" },
    { label: "2FA Status", value: security.twoFactorEnabled ? "Active" : "Inactive", 
      color: security.twoFactorEnabled ? "text-emerald-600" : "text-rose-600",
      bg: security.twoFactorEnabled ? "bg-emerald-100" : "bg-rose-100" },
    { label: "Last Updated", value: "2 weeks ago", color: "text-blue-600", bg: "bg-blue-100" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-black mb-4 bg-gradient-to-r from-emerald-600 to-teal-700 bg-clip-text text-transparent">
            Security Center
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Security Overview */}
          <div className="xl:col-span-1 space-y-6">
            {/* Security Status */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-3xl shadow-2xl border-2 border-emerald-100 p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-8 h-8 text-emerald-600" />
                <h3 className="text-xl font-bold text-gray-900">Security Status</h3>
              </div>
              <div className="space-y-4">
                {securityStats.map((stat, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">{stat.label}</span>
                    <span className={`px-3 py-1 ${stat.bg} ${stat.color} rounded-full text-sm font-bold`}>
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-3xl shadow-2xl border-2 border-emerald-100 p-6"
            >
              <h3 className="font-bold text-gray-900 mb-4">Security Actions</h3>
              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={toggleTwoFA}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${
                    security.twoFactorEnabled
                      ? "bg-rose-600 text-white hover:bg-rose-700"
                      : "bg-emerald-600 text-white hover:bg-emerald-700"
                  }`}
                >
                  <Smartphone className="w-4 h-4" />
                  {security.twoFactorEnabled ? "Disable 2FA" : "Enable 2FA"}
                </motion.button>
              </div>
            </motion.div>

            {/* Security Tips */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-emerald-500 to-teal-500 rounded-3xl p-6 text-white"
            >
              <h4 className="font-bold text-lg mb-3">💡 Security Tips</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Use strong passwords
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Enable 2FA
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Update regularly
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Main Security Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="xl:col-span-3 space-y-6"
          >
            {/* Password Change Card */}
            <div className="bg-white rounded-3xl shadow-2xl border-2 border-emerald-100 p-8">
              <div className="flex items-center gap-3 mb-6">
                <Key className="w-8 h-8 text-emerald-600" />
                <h3 className="text-2xl font-bold text-gray-900">Change Password</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <PasswordField
                  label="Current Password"
                  value={security.currentPassword}
                  onChange={e => setSecurity(p => ({ ...p, currentPassword: e.target.value }))}
                  showPassword={showPassword}
                  onToggleShow={() => setShowPassword(!showPassword)}
                />
                <PasswordField
                  label="New Password"
                  value={security.newPassword}
                  onChange={e => setSecurity(p => ({ ...p, newPassword: e.target.value }))}
                  showPassword={showNewPassword}
                  onToggleShow={() => setShowNewPassword(!showNewPassword)}
                />
                <div className="md:col-span-2">
                  <label className="block text-lg font-bold text-gray-900 mb-3">Confirm New Password</label>
                  <input
                    type="password"
                    value={security.confirmPassword}
                    onChange={e => setSecurity(p => ({ ...p, confirmPassword: e.target.value }))}
                    className="w-full px-4 py-3 border-2 border-emerald-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handlePasswordChange}
                className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-bold hover:from-emerald-600 hover:to-teal-600 transition-all"
              >
                Update Password
              </motion.button>
            </div>

            {/* Two-Factor & Security Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 2FA Status */}
              <div className="bg-white rounded-3xl shadow-2xl border-2 border-emerald-100 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Smartphone className="w-6 h-6 text-emerald-600" />
                  <h3 className="text-lg font-bold text-gray-900">2FA Status</h3>
                </div>
                <div className={`flex items-center gap-3 p-4 rounded-xl ${
                  security.twoFactorEnabled 
                    ? "bg-emerald-50 border-2 border-emerald-200" 
                    : "bg-rose-50 border-2 border-rose-200"
                }`}>
                  <CheckCircle className={`w-5 h-5 ${
                    security.twoFactorEnabled ? "text-emerald-600" : "text-rose-600"
                  }`} />
                  <span className={`font-bold ${
                    security.twoFactorEnabled ? "text-emerald-800" : "text-rose-800"
                  }`}>
                    {security.twoFactorEnabled ? "2FA Active" : "2FA Inactive"}
                  </span>
                </div>
              </div>

              {/* Security Info */}
              <div className="bg-white rounded-3xl shadow-2xl border-2 border-emerald-100 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-6 h-6 text-emerald-600" />
                  <h3 className="text-lg font-bold text-gray-900">Security Info</h3>
                </div>
                <div className="space-y-2 text-sm text-gray-700">
                  <p><strong>Last password change:</strong> {new Date(security.lastPasswordChange).toLocaleDateString()}</p>
                  <p><strong>Account created:</strong> Jan 15, 2023</p>
                  <p><strong>Last login:</strong> Today at 14:30</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 2FA Setup Modal */}
      <AnimatePresence>
        {showTwoFASetup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-6 max-w-sm w-full space-y-6 shadow-2xl"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-900">Enable 2FA</h3>
                <button onClick={() => setShowTwoFASetup(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="text-center">
                <div className="bg-gray-100 rounded-xl p-4 mb-4">
                  <QrCode className="w-32 h-32 mx-auto text-gray-400" />
                </div>
                <p className="text-gray-600 text-sm mb-4">Scan with authenticator app</p>
                
                <input
                  type="text"
                  value={twoFACode}
                  onChange={e => setTwoFACode(e.target.value)}
                  placeholder="Enter 6-digit code"
                  className="w-full px-4 py-3 border-2 border-emerald-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-center text-lg font-mono"
                />
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setShowTwoFASetup(false)}
                  className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={completeTwoFASetup}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-600"
                >
                  Enable
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const PasswordField = ({ label, value, onChange, showPassword, onToggleShow }) => (
  <div className="relative">
    <label className="block text-sm font-bold text-gray-900 mb-2">{label}</label>
    <input
      type={showPassword ? "text" : "password"}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-3 border-2 border-emerald-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 pr-12"
    />
    <button
      type="button"
      onClick={onToggleShow}
      className="absolute right-3 top-10 text-gray-400 hover:text-gray-600"
    >
      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
    </button>
  </div>
);

export default DonorProfileSecurity;