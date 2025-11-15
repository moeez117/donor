import React, { useState } from "react";
import { Users, UserPlus, Edit3, Trash2, Mail, Shield, ToggleRight } from "lucide-react";

const initialUsers = [
  { id: 1, name: "RACA Admin", email: "admin@raca.qa", role: "Super Admin", active: true, lastLogin: "2 hours ago" },
  { id: 2, name: "Compliance Officer", email: "compliance@raca.qa", role: "Compliance", active: true, lastLogin: "1 day ago" },
  { id: 3, name: "Finance Analyst", email: "finance@raca.qa", role: "Finance", active: false, lastLogin: "1 week ago" },
];

const roles = ["Super Admin", "Compliance", "Finance", "Viewer"];

export default function AdminUsersRoles() {
  const [users, setUsers] = useState(initialUsers);
  const [showAddUser, setShowAddUser] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "Viewer" });

  const toggleActive = (id) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, active: !u.active } : u));
  };

  const changeRole = (id, role) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, role } : u));
  };

  const deleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(prev => prev.filter(u => u.id !== id));
    }
  };

  const addUser = () => {
    if (!newUser.name || !newUser.email) {
      alert("Please fill in all fields");
      return;
    }
    const user = {
      ...newUser,
      id: Math.max(...users.map(u => u.id)) + 1,
      active: true,
      lastLogin: "Never"
    };
    setUsers(prev => [...prev, user]);
    setNewUser({ name: "", email: "", role: "Viewer" });
    setShowAddUser(false);
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
      <div className="p-4 sm:p-6 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-t-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-xl">
              <Users className="text-white" size={28} />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold">Users & Roles</h3>
              <p className="text-xs sm:text-sm text-emerald-100">
                Manage RACA staff accounts and permissions
              </p>
            </div>
          </div>
          <button 
            onClick={() => setShowAddUser(true)}
            className="flex items-center justify-center gap-2 bg-white/20 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm hover:bg-white/30 transition-all"
          >
            <UserPlus size={16} />
            Invite User
          </button>
        </div>
      </div>

      {/* Users List */}
      <div className="p-4 sm:p-6">
        <div className="grid gap-3 sm:gap-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl flex items-center justify-center">
                    <Shield className="text-emerald-600" size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2">
                      <h4 className="font-semibold text-gray-900 text-sm sm:text-base break-words">
                        {user.name}
                      </h4>
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold text-white ${getRoleColor(
                          user.role
                        )}`}
                      >
                        {user.role}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-[10px] sm:text-xs ${
                          user.active
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {user.active ? "Active" : "Inactive"}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600 mb-2">
                      <div className="flex items-center gap-1 min-w-0">
                        <Mail size={14} />
                        <span className="truncate sm:whitespace-normal">
                          {user.email}
                        </span>
                      </div>
                      <span className="hidden sm:inline">•</span>
                      <span className="text-xs sm:text-sm">
                        Last login: {user.lastLogin}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                      <select
                        value={user.role}
                        onChange={(e) => changeRole(user.id, e.target.value)}
                        className="text-xs sm:text-sm border border-gray-300 rounded-lg px-2 sm:px-3 py-1 focus:ring-2 focus:ring-emerald-500"
                      >
                        {roles.map(role => (
                          <option key={role} value={role}>{role}</option>
                        ))}
                      </select>
                      <button
                        onClick={() => toggleActive(user.id)}
                        className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs sm:text-sm ${
                          user.active 
                            ? "bg-red-100 text-red-700 hover:bg-red-200" 
                            : "bg-green-100 text-green-700 hover:bg-green-200"
                        }`}
                      >
                        <ToggleRight size={14} />
                        {user.active ? "Disable" : "Enable"}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 self-end md:self-auto">
                  <button className="p-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors">
                    <Edit3 size={16} />
                  </button>
                  <button 
                    onClick={() => deleteUser(user.id)}
                    className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add User Modal */}
        {showAddUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-4 sm:p-6 max-w-md w-full">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4">
                Invite New User
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-xs sm:text-sm text-gray-600">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={newUser.name}
                    onChange={(e) =>
                      setNewUser(prev => ({ ...prev, name: e.target.value }))
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 text-sm focus:ring-2 focus:ring-emerald-500"
                    placeholder="Enter full name"
                  />
                </div>
                <div>
                  <label className="text-xs sm:text-sm text-gray-600">
                    Email
                  </label>
                  <input
                    type="email"
                    value={newUser.email}
                    onChange={(e) =>
                      setNewUser(prev => ({ ...prev, email: e.target.value }))
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 text-sm focus:ring-2 focus:ring-emerald-500"
                    placeholder="Enter email address"
                  />
                </div>
                <div>
                  <label className="text-xs sm:text-sm text-gray-600">
                    Role
                  </label>
                  <select
                    value={newUser.role}
                    onChange={(e) =>
                      setNewUser(prev => ({ ...prev, role: e.target.value }))
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 text-sm focus:ring-2 focus:ring-emerald-500"
                  >
                    {roles.map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <button
                  onClick={addUser}
                  className="flex-1 bg-emerald-500 text-white py-2 rounded-lg text-sm hover:bg-emerald-600"
                >
                  Send Invitation
                </button>
                <button
                  onClick={() => setShowAddUser(false)}
                  className="flex-1 bg-gray-500 text-white py-2 rounded-lg text-sm hover:bg-gray-600"
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
