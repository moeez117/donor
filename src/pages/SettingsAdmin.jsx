import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { 
  Globe, 
  Clock, 
  Building, 
  CreditCard, 
  Users, 
  Link, 
  Eye, 
  Save, 
  RotateCcw,
  TestTube,
  Shield,
  CheckCircle,
  XCircle,
  Wifi,
  WifiOff,
  Settings,
  Palette
} from "lucide-react";

const defaultState = {
  language: "English & Arabic",
  timezone: "Asia/Qatar",
  branding: "RACA - Qatar Charity Platform",
  integrations: {
    banks: { enabled: true, status: "connected", lastTest: "2 min ago" },
    payments: { enabled: true, status: "connected", lastTest: "5 min ago" },
    sandi: { enabled: true, status: "connected", lastTest: "1 hour ago" },
    blockchain: { enabled: false, status: "disconnected", lastTest: "Never" },
  },
  appearance: {
    primaryColor: "#10b981",
    secondaryColor: "#059669",
    darkMode: false,
    fontFamily: "Inter"
  }
};

export default function AdminSettings() {
  const [language, setLanguage] = useState(defaultState.language);
  const [timezone, setTimezone] = useState(defaultState.timezone);
  const [branding, setBranding] = useState(defaultState.branding);
  const [integrations, setIntegrations] = useState(defaultState.integrations);
  const [appearance, setAppearance] = useState(defaultState.appearance);
  const [activeTab, setActiveTab] = useState("general");
  const [testingIntegration, setTestingIntegration] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 600, once: true });
  }, []);

  const toggleIntegration = async (key) => {
    const newStatus = !integrations[key].enabled;
    setIntegrations(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        enabled: newStatus,
        status: newStatus ? "testing" : "disconnected"
      }
    }));

    // Simulate connection testing
    if (newStatus) {
      setTimeout(() => {
        setIntegrations(prev => ({
          ...prev,
          [key]: {
            ...prev[key],
            status: Math.random() > 0.2 ? "connected" : "failed",
            lastTest: "Just now"
          }
        }));
      }, 2000);
    }
  };

  const handleTest = async (key) => {
    setTestingIntegration(key);
    setIntegrations(prev => ({
      ...prev,
      [key]: { ...prev[key], status: "testing" }
    }));

    // Simulate API test
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const success = Math.random() > 0.3;
    setIntegrations(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        status: success ? "connected" : "failed",
        lastTest: "Just now"
      }
    }));
    setTestingIntegration(null);
  };

  const handleSave = () => {
    const payload = {
      language,
      timezone,
      branding,
      integrations,
      appearance
    };
    console.log("Saving settings:", payload);
    
    // Show success animation
    const saveBtn = document.getElementById('save-btn');
    if (saveBtn) {
      saveBtn.innerHTML = '<CheckCircle size={16} /> Saved!';
      setTimeout(() => {
        saveBtn.innerHTML = '<Save size={16} /> Save Configuration';
      }, 2000);
    }
  };

  const handleReset = () => {
    if (!window.confirm("Reset all settings to defaults?")) return;
    setLanguage(defaultState.language);
    setTimezone(defaultState.timezone);
    setBranding(defaultState.branding);
    setIntegrations(defaultState.integrations);
    setAppearance(defaultState.appearance);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "connected": return "text-emerald-500";
      case "testing": return "text-amber-500";
      case "failed": return "text-red-500";
      default: return "text-gray-500";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "connected": return <Wifi size={14} className="text-emerald-500" />;
      case "testing": return <div className="w-3 h-3 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />;
      case "failed": return <WifiOff size={14} className="text-red-500" />;
      default: return <WifiOff size={14} className="text-gray-400" />;
    }
  };

  return (
    <section className="mb-8" data-aos="fade-up">
      <div className="mx-auto max-w-7xl rounded-3xl bg-white shadow-2xl overflow-hidden border border-emerald-100">
        {/* Enhanced Header */}
        <div className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 px-8 py-6 text-white">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                <Settings size={28} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest opacity-90">
                  SYSTEM ADMINISTRATION
                </p>
                <h2 className="text-2xl font-bold mt-1">System Settings</h2>
                <p className="mt-2 text-emerald-100 opacity-90">
                  General options, integrations and live branding preview
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleReset}
                className="flex items-center gap-2 rounded-2xl bg-white/15 px-5 py-3 font-semibold text-white hover:bg-white/25 transition-all duration-300 backdrop-blur-sm"
              >
                <RotateCcw size={16} />
                Reset to Defaults
              </button>
              <button
                id="save-btn"
                onClick={handleSave}
                className="flex items-center gap-2 rounded-2xl bg-white px-5 py-3 font-semibold text-emerald-700 hover:bg-emerald-50 hover:scale-105 transition-all duration-300 shadow-lg"
              >
                <Save size={16} />
                Save Configuration
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-emerald-100 bg-white">
          <div className="px-8">
            <div className="flex gap-1">
              {[
                { id: "general", label: "General", icon: Settings },
                { id: "integrations", label: "Integrations", icon: Link },
                { id: "appearance", label: "Appearance", icon: Palette },
                { id: "preview", label: "Live Preview", icon: Eye }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-semibold transition-all duration-300 border-b-2 ${
                    activeTab === tab.id
                      ? "border-emerald-500 text-emerald-600 bg-emerald-50"
                      : "border-transparent text-gray-500 hover:text-emerald-600 hover:bg-emerald-25"
                  }`}
                >
                  <tab.icon size={18} />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-8">
          {/* General Settings */}
          {activeTab === "general" && (
            <div className="grid gap-8 md:grid-cols-2">
              <div data-aos="fade-right" className="space-y-6">
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-emerald-100 rounded-xl">
                      <Globe className="text-emerald-600" size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-emerald-900">Language & Region</h3>
                      <p className="text-sm text-emerald-600">Configure platform language and timezone</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-emerald-800 mb-2">
                        Language Support
                      </label>
                      <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="w-full rounded-xl border border-emerald-200 bg-white px-4 py-3 text-emerald-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all"
                      >
                        <option>English & Arabic</option>
                        <option>English only</option>
                        <option>Arabic only</option>
                        <option>Multilingual (All)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-emerald-800 mb-2">
                        Timezone
                      </label>
                      <select
                        value={timezone}
                        onChange={(e) => setTimezone(e.target.value)}
                        className="w-full rounded-xl border border-emerald-200 bg-white px-4 py-3 text-emerald-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all"
                      >
                        <option>Asia/Qatar</option>
                        <option>UTC+3</option>
                        <option>Middle East/Doha</option>
                        <option>UTC</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-emerald-100 rounded-xl">
                      <Building className="text-emerald-600" size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-emerald-900">Platform Branding</h3>
                      <p className="text-sm text-emerald-600">Customize platform identity</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-emerald-800 mb-2">
                      Branding Text
                    </label>
                    <input
                      value={branding}
                      onChange={(e) => setBranding(e.target.value)}
                      placeholder="Enter platform branding text"
                      className="w-full rounded-xl border border-emerald-200 bg-white px-4 py-3 text-emerald-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all"
                    />
                    <p className="text-xs text-emerald-600 mt-2">
                      This text will appear across all portals and communications
                    </p>
                  </div>
                </div>
              </div>

              <div data-aos="fade-left" className="space-y-6">
                <div className="bg-white rounded-2xl p-6 border border-emerald-200 shadow-sm">
                  <h3 className="text-lg font-bold text-emerald-900 mb-4">Quick Actions</h3>
                  <div className="grid gap-3">
                    <button className="flex items-center gap-3 p-4 rounded-xl border border-emerald-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all">
                      <Shield size={20} className="text-emerald-600" />
                      <span className="font-semibold text-emerald-900">Security Settings</span>
                    </button>
                    <button className="flex items-center gap-3 p-4 rounded-xl border border-emerald-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all">
                      <Users size={20} className="text-emerald-600" />
                      <span className="font-semibold text-emerald-900">User Management</span>
                    </button>
                    <button className="flex items-center gap-3 p-4 rounded-xl border border-emerald-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all">
                      <TestTube size={20} className="text-emerald-600" />
                      <span className="font-semibold text-emerald-900">Development Mode</span>
                    </button>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200">
                  <h3 className="text-lg font-bold text-amber-900 mb-2">System Status</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-amber-700">Platform Uptime</span>
                      <span className="font-semibold text-amber-900">99.98%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-amber-700">Active Users</span>
                      <span className="font-semibold text-amber-900">1,247</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-amber-700">Last Backup</span>
                      <span className="font-semibold text-amber-900">2 hours ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Integrations */}
          {activeTab === "integrations" && (
            <div data-aos="fade-up" className="space-y-6">
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-200">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-emerald-100 rounded-xl">
                    <Link className="text-emerald-600" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-emerald-900">Integration Management</h3>
                    <p className="text-emerald-600">Enable or disable core integrations and test connectivity</p>
                  </div>
                </div>

                <div className="grid gap-4">
                  {[
                    {
                      key: "banks",
                      icon: Building,
                      title: "Bank Integrations",
                      description: "QNB, QIB, Doha Bank, and other local banks",
                      status: integrations.banks.status
                    },
                    {
                      key: "payments",
                      icon: CreditCard,
                      title: "Payment Gateways",
                      description: "Cards, digital wallets, QR payments",
                      status: integrations.payments.status
                    },
                    {
                      key: "sandi",
                      icon: Users,
                      title: "Sandi Platform",
                      description: "Beneficiary synchronization and management",
                      status: integrations.sandi.status
                    },
                    {
                      key: "blockchain",
                      icon: Shield,
                      title: "Blockchain Node",
                      description: "Transparent donation tracking and verification",
                      status: integrations.blockchain.status
                    }
                  ].map(({ key, icon: Icon, title, description, status }) => (
                    <div key={key} className="flex items-center justify-between p-4 bg-white rounded-xl border border-emerald-200 hover:shadow-md transition-all">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="p-3 bg-emerald-100 rounded-xl">
                          <Icon size={20} className="text-emerald-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-emerald-900">{title}</h4>
                          <p className="text-sm text-emerald-600">{description}</p>
                          <div className="flex items-center gap-2 mt-1">
                            {getStatusIcon(status)}
                            <span className={`text-xs font-medium ${getStatusColor(status)}`}>
                              {status.charAt(0).toUpperCase() + status.slice(1)}
                            </span>
                            <span className="text-xs text-emerald-500">
                              • Last test: {integrations[key].lastTest}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleTest(key)}
                          disabled={testingIntegration === key}
                          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-100 text-emerald-700 hover:bg-emerald-200 disabled:opacity-50 transition-all"
                        >
                          {testingIntegration === key ? (
                            <div className="w-4 h-4 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <TestTube size={14} />
                          )}
                          Test
                        </button>
                        <button
                          onClick={() => toggleIntegration(key)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all ${
                            integrations[key].enabled ? 'bg-emerald-500' : 'bg-gray-300'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                              integrations[key].enabled ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-emerald-100 rounded-xl">
                  <p className="text-sm text-emerald-700">
                    <strong>Note:</strong> In production, toggling an integration would validate credentials 
                    and update the connection status in real time. Failed connections will be automatically retried.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Live Preview */}
          {activeTab === "preview" && (
            <div className="grid gap-8 lg:grid-cols-2">
              <div data-aos="fade-right" className="space-y-6">
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-200">
                  <h3 className="text-lg font-bold text-emerald-900 mb-4">Current Settings</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                      <span className="text-emerald-700">Language</span>
                      <span className="font-semibold text-emerald-900">{language}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                      <span className="text-emerald-700">Timezone</span>
                      <span className="font-semibold text-emerald-900">{timezone}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                      <span className="text-emerald-700">Branding</span>
                      <span className="font-semibold text-emerald-900 truncate">{branding}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-emerald-200 shadow-sm">
                  <h3 className="text-lg font-bold text-emerald-900 mb-4">Integration Status</h3>
                  <div className="space-y-3">
                    {Object.entries(integrations).map(([key, config]) => (
                      <div key={key} className="flex justify-between items-center">
                        <span className="text-emerald-700 capitalize">{key}</span>
                        <div className="flex items-center gap-2">
                          {config.enabled ? (
                            <CheckCircle size={16} className="text-emerald-500" />
                          ) : (
                            <XCircle size={16} className="text-red-500" />
                          )}
                          <span className={`text-sm font-medium ${
                            config.enabled ? 'text-emerald-600' : 'text-red-600'
                          }`}>
                            {config.enabled ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div data-aos="fade-left" className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white">
                <h3 className="text-lg font-bold mb-4">Live Portal Preview</h3>
                <p className="text-gray-400 text-sm mb-6">
                  Approximate preview of how portals will look with current settings
                </p>

                {/* Preview Header */}
                <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-4 mb-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="text-xs uppercase tracking-widest opacity-90">{language}</p>
                      <p className="text-lg font-bold truncate">{branding}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs opacity-90">Timezone</p>
                      <p className="text-sm font-semibold">{timezone}</p>
                    </div>
                  </div>
                </div>

                {/* Preview Content */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-gray-700 rounded-xl p-3">
                    <p className="font-semibold text-sm">Donor Portal</p>
                    <p className="text-xs text-gray-400">Multilingual UI</p>
                  </div>
                  <div className="bg-gray-700 rounded-xl p-3">
                    <p className="font-semibold text-sm">Family Portal</p>
                    <p className="text-xs text-gray-400">RACA branding</p>
                  </div>
                  <div className="bg-gray-700 rounded-xl p-3">
                    <p className="font-semibold text-sm">Sandi Sync</p>
                    <p className="text-xs text-gray-400">
                      {integrations.sandi.enabled ? 'Connected' : 'Not configured'}
                    </p>
                  </div>
                  <div className="bg-gray-700 rounded-xl p-3">
                    <p className="font-semibold text-sm">Payments</p>
                    <p className="text-xs text-gray-400">
                      {integrations.payments.enabled ? 'Gateways enabled' : 'Disabled'}
                    </p>
                  </div>
                </div>

                <div className="bg-gray-700 rounded-xl p-4">
                  <p className="text-xs text-gray-400 text-center">
                    This is a visual preview only. Real portals will consume these settings from the configuration service.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}