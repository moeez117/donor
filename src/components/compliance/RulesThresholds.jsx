import React, { useState } from "react";
import { Settings, ToggleRight, Save, Plus, Trash2, Edit3, Zap, AlertCircle, Download } from "lucide-react";

const initialRules = [
  { id: 1, name: "Single Donation Limit", description: "Flag large single donations for review", value: 50000, unit: "QAR", enabled: true, category: "Transaction", severity: "High" },
  { id: 2, name: "Daily Donor Total", description: "Monitor donors exceeding daily contribution limits", value: 100000, unit: "QAR/day", enabled: true, category: "Frequency", severity: "Medium" },
  { id: 3, name: "Risk Route Score", description: "Risk points for high-risk jurisdiction transactions", value: 60, unit: "Score", enabled: false, category: "Geographic", severity: "High" },
  { id: 4, name: "Cash Transaction Alert", description: "Monitor large cash-based donations", value: 20000, unit: "QAR", enabled: true, category: "Transaction", severity: "Critical" },
];

export default function RulesThresholds() {
  const [rules, setRules] = useState(initialRules);
  const [hasChanges, setHasChanges] = useState(false);
  const [editingRule, setEditingRule] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [newRule, setNewRule] = useState({
    name: "", description: "", value: 0, unit: "QAR", category: "Transaction", severity: "Medium"
  });

  const stats = {
    active: rules.filter(r => r.enabled).length,
    total: rules.length,
    critical: rules.filter(r => r.severity === "Critical").length
  };

  const toggleRule = (id) => {
    setRules(prev => prev.map(r => r.id === id ? { ...r, enabled: !r.enabled } : r));
    setHasChanges(true);
  };

  const updateValue = (id, value) => {
    setRules(prev => prev.map(r => r.id === id ? { ...r, value: Number(value) } : r));
    setHasChanges(true);
  };

  const deleteRule = (id) => {
    if (window.confirm("Delete this rule?")) {
      setRules(prev => prev.filter(r => r.id !== id));
      setHasChanges(true);
    }
  };

  const startEdit = (rule) => {
    setEditingRule(rule.id);
    setEditForm(rule);
  };

  const saveEdit = () => {
    setRules(prev => prev.map(r => r.id === editingRule ? { ...r, ...editForm } : r));
    setEditingRule(null);
    setHasChanges(true);
  };

  const saveChanges = () => {
    setHasChanges(false);
    alert("Rules updated successfully!");
  };

  const addNewRule = () => {
    if (!newRule.name.trim()) {
      alert("Please enter a rule name");
      return;
    }
    const rule = {
      ...newRule,
      id: Math.max(...rules.map(r => r.id)) + 1,
      enabled: true,
      value: Number(newRule.value) || 0
    };
    setRules(prev => [...prev, rule]);
    setNewRule({ name: "", description: "", value: 0, unit: "QAR", category: "Transaction", severity: "Medium" });
    setShowAddForm(false);
    setHasChanges(true);
  };

  const exportRules = () => {
    const csv = rules.map(r => `${r.id},${r.name},${r.description},${r.value},${r.unit},${r.category},${r.severity},${r.enabled}`).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'aml-rules.csv';
    link.click();
  };

  const getSeverityColor = (severity) => {
    const colors = {
      Critical: "bg-gradient-to-r from-red-500 to-red-600",
      High: "bg-gradient-to-r from-orange-500 to-orange-600",
      Medium: "bg-gradient-to-r from-yellow-500 to-yellow-600",
      Low: "bg-gradient-to-r from-green-500 to-green-600"
    };
    return colors[severity] || "bg-gray-500";
  };

  const getCategoryIcon = (category) => {
    const icons = {
      Transaction: "💰",
      Frequency: "🔄", 
      Geographic: "🌍",
      Behavioral: "👤"
    };
    return icons[category] || "⚙️";
  };

  return (
    <div className="bg-white rounded-2xl border border-emerald-100 shadow-xl w-full">
      {/* Header */}
      <div className="p-4 sm:p-6 bg-gradient-to-r from-cyan-500 to-indigo-500 text-white rounded-t-2xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-xl">
              <Zap className="text-white" size={28} />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold">Rules Engine</h3>
              <p className="text-xs sm:text-sm text-purple-100">Configure AML thresholds & rules</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 justify-start md:justify-end">
            <div className="text-right">
              <div className="text-xs sm:text-sm">Active Rules</div>
              <div className="text-xl sm:text-2xl font-bold">{stats.active}/{stats.total}</div>
            </div>
            <button
              onClick={exportRules}
              className="flex items-center gap-2 bg-white/20 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm hover:bg-white/30 transition-all"
            >
              <Download size={16} />
              Export
            </button>
            <button
              onClick={saveChanges}
              disabled={!hasChanges}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                hasChanges 
                  ? "bg-white text-purple-600 hover:bg-purple-50 shadow-lg" 
                  : "bg-white/20 text-white cursor-not-allowed"
              }`}
            >
              <Save size={16} />
              Save
            </button>
          </div>
        </div>
      </div>

      {/* Rules List */}
      <div className="p-3 sm:p-4">
        <div className="grid gap-3 sm:gap-4">
          {rules.map((rule) => (
            <div
              key={rule.id}
              className="group border border-gray-200 rounded-xl p-3 sm:p-4 hover:shadow-lg transition-all duration-300 bg-white"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
                <div className="flex items-start gap-3 sm:gap-4 flex-1">
                  <div className="text-2xl sm:text-3xl">{getCategoryIcon(rule.category)}</div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                      <h4 className="font-semibold text-gray-900 text-sm sm:text-base break-words">
                        {rule.name}
                      </h4>
                      <span
                        className={`px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold text-white ${getSeverityColor(
                          rule.severity
                        )}`}
                      >
                        {rule.severity}
                      </span>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-[10px] sm:text-xs">
                        {rule.category}
                      </span>
                    </div>
                    <p className="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-3 break-words">
                      {rule.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                      <span className="text-xs sm:text-sm text-gray-600">Threshold:</span>
                      <input
                        type="number"
                        value={rule.value}
                        onChange={(e) => updateValue(rule.id, e.target.value)}
                        className="w-24 px-2 sm:px-3 py-1 border border-gray-300 rounded-lg text-xs sm:text-sm focus:ring-2 focus:ring-purple-500"
                      />
                      <span className="text-xs sm:text-sm text-gray-600 font-medium">{rule.unit}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap md:flex-nowrap items-center gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300">
                  <button
                    onClick={() => toggleRule(rule.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                      rule.enabled 
                        ? "bg-green-100 text-green-700 hover:bg-green-200" 
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    <ToggleRight
                      className={rule.enabled ? "text-green-600" : "text-gray-400"}
                      size={16}
                    />
                    {rule.enabled ? "Active" : "Inactive"}
                  </button>
                  <button
                    onClick={() => startEdit(rule)}
                    className="p-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
                    title="Edit Rule"
                  >
                    <Edit3 size={16} />
                  </button>
                  <button
                    onClick={() => deleteRule(rule.id)}
                    className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    title="Delete Rule"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Rule Section */}
        <div className="mt-5 sm:mt-6">
          {!showAddForm ? (
            <button 
              onClick={() => setShowAddForm(true)}
              className="w-full border-2 border-dashed border-gray-300 rounded-xl p-5 sm:p-6 text-center hover:border-purple-300 hover:bg-purple-50 transition-all duration-300 group"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <Plus className="text-purple-600" size={22} />
              </div>
              <h4 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">
                Add New Rule
              </h4>
              <p className="text-gray-600 text-xs sm:text-sm">
                Create custom AML rules and thresholds
              </p>
            </button>
          ) : (
            <div className="border-2 border-purple-200 rounded-xl p-4 sm:p-6 bg-purple-50">
              <h4 className="font-semibold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">
                Create New Rule
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                <input
                  type="text"
                  placeholder="Rule Name"
                  value={newRule.name}
                  onChange={(e) => setNewRule(prev => ({ ...prev, name: e.target.value }))}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500"
                />
                <select
                  value={newRule.category}
                  onChange={(e) => setNewRule(prev => ({ ...prev, category: e.target.value }))}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500"
                >
                  <option value="Transaction">Transaction</option>
                  <option value="Frequency">Frequency</option>
                  <option value="Geographic">Geographic</option>
                </select>
                <input
                  type="text"
                  placeholder="Description"
                  value={newRule.description}
                  onChange={(e) => setNewRule(prev => ({ ...prev, description: e.target.value }))}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500"
                />
                <select
                  value={newRule.severity}
                  onChange={(e) => setNewRule(prev => ({ ...prev, severity: e.target.value }))}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Critical">Critical</option>
                </select>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <button
                  onClick={addNewRule}
                  className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 text-sm"
                >
                  Create Rule
                </button>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Edit Modal */}
        {editingRule && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-4 sm:p-6 max-w-md w-full">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4">
                Edit Rule
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-600">Rule Name</label>
                  <input 
                    type="text" 
                    value={editForm.name}
                    onChange={(e) => setEditForm(prev => ({...prev, name: e.target.value}))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 text-sm"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600">Description</label>
                  <input 
                    type="text" 
                    value={editForm.description}
                    onChange={(e) => setEditForm(prev => ({...prev, description: e.target.value}))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 text-sm"
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <button
                  onClick={saveEdit}
                  className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 text-sm"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingRule(null)}
                  className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
