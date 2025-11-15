import React, { useState } from "react";
import {
  Settings,
  Globe,
  Clock,
  Palette,
  Building,
  CreditCard,
  Database,
  Link,
  Save,
} from "lucide-react";

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    language: "English & Arabic",
    timezone: "Asia/Qatar",
    branding: "RACA · Qatar Charity Platform",
    integrations: {
      banks: true,
      payments: true,
      sandi: true,
      blockchain: false,
    },
  });

  const [hasChanges, setHasChanges] = useState(false);

  const updateSetting = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const toggleIntegration = (key) => {
    setSettings((prev) => ({
      ...prev,
      integrations: { ...prev.integrations, [key]: !prev.integrations[key] },
    }));
    setHasChanges(true);
  };

  const saveSettings = () => {
    setHasChanges(false);
    alert("Settings saved successfully!");
  };

  const getIntegrationIcon = (key) => {
    const icons = {
      banks: <Building size={20} />,
      payments: <CreditCard size={20} />,
      sandi: <Database size={20} />,
      blockchain: <Link size={20} />,
    };
    return icons[key];
  };

  const getIntegrationColor = (enabled) =>
    enabled
      ? "bg-gradient-to-r from-green-500 to-emerald-600"
      : "bg-gradient-to-r from-red-500 to-red-600";

  return (
    <div className="bg-white rounded-2xl border border-emerald-100 shadow-xl w-full">
      {/* Header */}
      <div className="p-4 sm:p-6 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-t-2xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-xl">
              <Settings className="text-white" size={28} />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold">System Settings</h3>
              <p className="text-xs sm:text-sm text-purple-100">
                General configuration and integrations
              </p>
            </div>
          </div>
          <button
            onClick={saveSettings}
            disabled={!hasChanges}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
              hasChanges
                ? "bg-white text-purple-600 hover:bg-purple-50 shadow-lg"
                : "bg-white/20 text-white cursor-not-allowed"
            }`}
          >
            <Save size={16} />
            Save Changes
          </button>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
          {/* General Settings */}
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-4 sm:p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-500 rounded-lg">
                <Globe className="text-white" size={20} />
              </div>
              <h4 className="font-semibold text-gray-900 text-sm sm:text-base">
                General Settings
              </h4>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs sm:text-sm font-medium text-gray-700 mb-2 block">
                  Language
                </label>
                <select
                  value={settings.language}
                  onChange={(e) => updateSetting("language", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500"
                >
                  <option>English & Arabic</option>
                  <option>English only</option>
                  <option>Arabic only</option>
                </select>
              </div>

              <div>
                <label className="text-xs sm:text-sm font-medium text-gray-700 mb-2 block">
                  Timezone
                </label>
                <div className="flex items-center gap-3">
                  <Clock className="text-gray-400" size={18} />
                  <select
                    value={settings.timezone}
                    onChange={(e) => updateSetting("timezone", e.target.value)}
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500"
                  >
                    <option>Asia/Qatar</option>
                    <option>UTC</option>
                    <option>Europe/London</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs sm:text-sm font-medium text-gray-700 mb-2 block">
                  Branding
                </label>
                <div className="flex items-center gap-3">
                  <Palette className="text-gray-400" size={18} />
                  <input
                    value={settings.branding}
                    onChange={(e) => updateSetting("branding", e.target.value)}
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500"
                    placeholder="Platform branding text"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Integrations */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 sm:p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-500 rounded-lg">
                <Link className="text-white" size={20} />
              </div>
              <h4 className="font-semibold text-gray-900 text-sm sm:text-base">
                Integrations
              </h4>
            </div>

            <div className="space-y-4">
              {[
                {
                  key: "banks",
                  label: "Bank Integrations",
                  desc: "QNB, QIB, and other banking partners",
                },
                {
                  key: "payments",
                  label: "Payment Gateways",
                  desc: "Cards, digital wallets, and QR payments",
                },
                {
                  key: "sandi",
                  label: "Sandi Platform",
                  desc: "Beneficiary data synchronization",
                },
                {
                  key: "blockchain",
                  label: "Blockchain Node",
                  desc: "Donation tracking and transparency",
                },
              ].map(({ key, label, desc }) => (
                <div
                  key={key}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-white rounded-lg border border-gray-200"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      {getIntegrationIcon(key)}
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900 text-sm sm:text-base">
                        {label}
                      </h5>
                      <p className="text-xs sm:text-sm text-gray-600">{desc}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleIntegration(key)}
                    className={`flex h-6 w-12 items-center rounded-full p-1 transition-all ${
                      settings.integrations[key] ? "bg-green-500" : "bg-gray-300"
                    }`}
                  >
                    <div
                      className={`h-4 w-4 rounded-full bg-white transition-transform ${
                        settings.integrations[key]
                          ? "translate-x-6"
                          : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Status Summary */}
        <div className="mt-5 sm:mt-6 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-white border border-gray-200 rounded-xl p-3 sm:p-4 text-center">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Globe className="text-white" size={16} />
            </div>
            <p className="text-xs sm:text-sm text-gray-600">Language</p>
            <p className="font-semibold text-gray-900 text-xs sm:text-sm">
              {settings.language}
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-3 sm:p-4 text-center">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Clock className="text-white" size={16} />
            </div>
            <p className="text-xs sm:text-sm text-gray-600">Timezone</p>
            <p className="font-semibold text-gray-900 text-xs sm:text-sm">
              {settings.timezone}
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-3 sm:p-4 text-center">
            <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Palette className="text-white" size={16} />
            </div>
            <p className="text-xs sm:text-sm text-gray-600">Branding</p>
            <p className="font-semibold text-gray-900 text-xs sm:text-sm truncate">
              {settings.branding}
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-3 sm:p-4 text-center">
            <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Link className="text-white" size={16} />
            </div>
            <p className="text-xs sm:text-sm text-gray-600">
              Active Integrations
            </p>
            <p className="font-semibold text-gray-900 text-xs sm:text-sm">
              {Object.values(settings.integrations).filter(Boolean).length}/4
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
