import React, { useState } from "react";
import { Download, Trash2, Edit3, Save, Camera, User, Mail, Phone, MapPin, Calendar, IdCard } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const DonorProfileProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Smith",
    email: "john.smith@example.com",
    phone: "+974 1234 5678",
    nationalId: "1234567890",
    dateOfBirth: "1985-06-15",
    address: "123 Charity Street, Doha, Qatar",
    bio: "Passionate about making a difference in the community through charitable giving."
  });

  const handleProfileChange = (field, value) => {
    setProfile(p => ({ ...p, [field]: value }));
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  const exportData = () => alert("Exporting your data...");
  const deleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account?"))
      alert("Account deletion process initiated.");
  };

  const profileFields = [
    { icon: User, label: "First Name", field: "firstName", type: "text" },
    { icon: User, label: "Last Name", field: "lastName", type: "text" },
    { icon: Mail, label: "Email", field: "email", type: "email" },
    { icon: Phone, label: "Phone", field: "phone", type: "tel" },
    { icon: IdCard, label: "National ID", field: "nationalId", type: "text" },
    { icon: Calendar, label: "Date of Birth", field: "dateOfBirth", type: "date" },
    { icon: MapPin, label: "Address", field: "address", type: "text", fullWidth: true },
  ];

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
            Profile Settings
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Profile Card & Actions */}
          <div className="xl:col-span-1 space-y-6">
            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-3xl shadow-2xl border-2 border-emerald-100 p-6 text-center"
            >
              <div className="relative mx-auto w-24 h-24 mb-4">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white text-2xl font-bold border-4 border-white shadow-lg">
                  {profile.firstName.charAt(0)}{profile.lastName.charAt(0)}
                </div>
                {isEditing && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    className="absolute -bottom-2 -right-2 w-10 h-10 bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-lg border-2 border-white"
                  >
                    <Camera className="w-4 h-4" />
                  </motion.button>
                )}
              </div>
              
              <h2 className="text-xl font-bold text-gray-900">{profile.firstName} {profile.lastName}</h2>
              <p className="text-gray-600 text-sm mt-1">{profile.email}</p>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsEditing(!isEditing)}
                className={`w-full mt-4 flex items-center justify-center gap-2 px-4 py-3 rounded-2xl font-bold transition-all ${
                  isEditing 
                    ? "bg-rose-600 text-white hover:bg-rose-700" 
                    : "bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600"
                }`}
              >
                {isEditing ? <Save className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
                {isEditing ? "Cancel" : "Edit Profile"}
              </motion.button>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-3xl shadow-2xl border-2 border-emerald-100 p-6"
            >
              <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={exportData}
                  className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-emerald-50 rounded-xl transition-all border border-emerald-100"
                >
                  <Download className="w-4 h-4 text-emerald-600" />
                  <span className="font-semibold text-sm">Export Data</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={deleteAccount}
                  className="w-full flex items-center gap-3 px-4 py-3 text-rose-600 hover:bg-rose-50 rounded-xl transition-all border border-rose-100"
                >
                  <Trash2 className="w-4 h-4" />
                  <span className="font-semibold text-sm">Delete Account</span>
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Profile Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="xl:col-span-3"
          >
            <div className="bg-white rounded-3xl shadow-2xl border-2 border-emerald-100 p-8">
              {/* Form Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {profileFields.map((field, index) => (
                  <motion.div
                    key={field.field}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={field.fullWidth ? "md:col-span-2" : ""}
                  >
                    <label className="block text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                      <field.icon className="w-4 h-4 text-emerald-600" />
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      value={profile[field.field]}
                      onChange={e => handleProfileChange(field.field, e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border-2 border-emerald-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 disabled:bg-gray-50 transition-all"
                    />
                  </motion.div>
                ))}
                
                {/* Bio Field */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="md:col-span-2"
                >
                  <label className="block text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <User className="w-4 h-4 text-emerald-600" />
                    Bio
                  </label>
                  <textarea
                    rows="3"
                    disabled={!isEditing}
                    value={profile.bio}
                    onChange={e => handleProfileChange("bio", e.target.value)}
                    className="w-full px-4 py-3 border-2 border-emerald-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 disabled:bg-gray-50 resize-none transition-all"
                  />
                </motion.div>
              </div>

              {/* Save Button */}
              <AnimatePresence>
                {isEditing && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex justify-end pt-6 mt-6 border-t border-emerald-100"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSaveProfile}
                      className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-bold hover:from-emerald-600 hover:to-teal-600 transition-all shadow-lg"
                    >
                      <Save className="w-4 h-4 inline mr-2" />
                      Save Changes
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DonorProfileProfile;