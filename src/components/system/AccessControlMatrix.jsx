import React, { useState } from "react";
import { Shield, CheckCircle, XCircle, Save, Download } from "lucide-react";

const modules = ["Campaigns", "Donations", "Charities", "Compliance", "Settings", "Reports"];
const roles = ["Super Admin", "Compliance", "Finance", "Viewer"];

const defaultMatrix = {
  "Super Admin": ["Campaigns", "Donations", "Charities", "Compliance", "Settings", "Reports"],
  "Compliance": ["Campaigns", "Donations", "Compliance"],
  "Finance": ["Donations", "Settings", "Reports"],
  "Viewer": ["Campaigns", "Donations", "Charities"],
};

export default function AccessControlMatrix() {
  const [matrix, setMatrix] = useState(defaultMatrix);
  const [hasChanges, setHasChanges] = useState(false);

  const togglePermission = (role, module) => {
    setMatrix(prev => {
      const current = prev[role] || [];
      const has = current.includes(module);
      const updated = {
        ...prev,
        [role]: has ? current.filter(m => m !== module) : [...current, module]
      };
      setHasChanges(true);
      return updated;
    });
  };

  const hasPermission = (role, module) => (matrix[role] || []).includes(module);

  const saveChanges = () => {
    setHasChanges(false);
    alert("Permissions updated successfully!");
  };

  const exportMatrix = () => {
    alert("Exporting permission matrix...");
  };

  const getRoleColor = (role) => {
    const colors = {
      "Super Admin": "bg-gradient-to-r from-purple-500 to-purple-600",
      "Compliance": "bg-gradient-to-r from-blue-500 to-blue-600",
      "Finance": "bg-gradient-to-r from-green-500 to-green-600",
      "Viewer": "bg-gradient-to-r from-gray-500 to-gray-600"
    };
    return colors[role] || "bg-gray-500";
  };

  return (
    <div className="bg-white rounded-2xl border border-emerald-100 shadow-xl w-full">
      {/* Header */}
      <div className="p-4 sm:p-6 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-t-2xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-xl">
              <Shield className="text-white" size={28} />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold">Access Control Matrix</h3>
              <p className="text-xs sm:text-sm text-blue-100">
                Role-based permissions across system modules
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <button
              onClick={exportMatrix}
              className="flex items-center gap-2 bg-white/20 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm hover:bg-white/30"
            >
              <Download size={16} />
              Export
            </button>
            <button
              onClick={saveChanges}
              disabled={!hasChanges}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                hasChanges
                  ? "bg-white text-blue-600 hover:bg-blue-50 shadow-lg"
                  : "bg-white/20 text-white cursor-not-allowed"
              }`}
            >
              <Save size={16} />
              Save
            </button>
          </div>
        </div>
      </div>

      {/* Matrix Table */}
      <div className="p-4 sm:p-6">
        <div className="overflow-x-auto">
          <div className="w-full bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 sm:p-6">
            {/* Header Row */}
            <div className="grid grid-cols-1 sm:grid-cols-[160px_repeat(4,120px)] lg:grid-cols-[200px_repeat(4,140px)] gap-3 sm:gap-4 mb-3 sm:mb-4 items-center">
              <div className="font-semibold text-blue-900 text-sm sm:text-base">
                Module / Role
              </div>
              {roles.map(role => (
                <div key={role} className="text-left sm:text-center">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold text-white ${getRoleColor(
                      role
                    )}`}
                  >
                    {role}
                  </span>
                </div>
              ))}
            </div>

            {/* Module Rows */}
            <div className="space-y-3">
              {modules.map(module => (
                <div
                  key={module}
                  className="grid grid-cols-1 sm:grid-cols-[160px_repeat(4,120px)] lg:grid-cols-[200px_repeat(4,140px)] gap-3 sm:gap-4 items-center"
                >
                  <div className="font-medium text-gray-900 text-sm sm:text-base">
                    {module}
                  </div>
                  {roles.map(role => (
                    <button
                      key={`${module}-${role}`}
                      onClick={() => togglePermission(role, module)}
                      className={`flex items-center justify-center gap-2 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm transition-all duration-300 ${
                        hasPermission(role, module)
                          ? "bg-green-100 text-green-700 hover:bg-green-200 border-2 border-green-300"
                          : "bg-red-100 text-red-700 hover:bg-red-200 border-2 border-red-300"
                      }`}
                    >
                      {hasPermission(role, module) ? (
                        <CheckCircle size={16} className="text-green-600" />
                      ) : (
                        <XCircle size={16} className="text-red-600" />
                      )}
                      {hasPermission(role, module) ? "Allowed" : "Denied"}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="mt-5 sm:mt-6 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {roles.map(role => (
            <div
              key={role}
              className="bg-white border border-gray-200 rounded-xl p-3 sm:p-4 text-center"
            >
              <div
                className={`w-8 h-8 ${getRoleColor(
                  role
                )} rounded-lg flex items-center justify-center mx-auto mb-2`}
              >
                <Shield className="text-white" size={16} />
              </div>
              <h4 className="font-semibold text-gray-900 text-xs sm:text-sm">
                {role}
              </h4>
              <p className="text-[11px] sm:text-xs text-gray-600">
                {matrix[role]?.length || 0} modules
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
