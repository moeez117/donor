import React, { useState } from "react";
import { 
  FaTimes, FaBookmark, FaShare, FaDonate, FaUsers, 
  FaClock, FaCheckCircle, FaFilePdf, FaChartLine,
  FaHeart, FaGlobe, FaShieldAlt
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const CampaignModal = ({
  campaign,
  onClose,
  bookmarkedCampaigns,
  toggleBookmark,
  setQuickDonateCampaign
}) => {
  const [activeTab, setActiveTab] = useState("details");
  const [copied, setCopied] = useState(false);

  const isBookmarked = bookmarkedCampaigns.includes(campaign.id);
  const progress = Math.min(Math.round((campaign.raised / campaign.goal) * 100), 100);
  const daysLeft = Math.ceil((new Date(campaign.deadline) - new Date()) / (1000 * 60 * 60 * 24));

  const shareCampaign = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const tabs = [
    { id: "details", label: "Campaign Details", icon: FaHeart },
    { id: "updates", label: "Updates", icon: FaChartLine },
    { id: "impact", label: "Impact", icon: FaUsers },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      // Make overlay scrollable on small screens & add smaller padding
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-start sm:items-center z-50 p-2 sm:p-4 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        // Card is full-width on mobile, centered, with internal scroll
        className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative h-48 sm:h-64 bg-gradient-to-br from-emerald-500 to-teal-500">
          <img
            src={campaign.media[0]}
            alt={campaign.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
          
          {/* Header Actions */}
          <div className="absolute top-3 sm:top-4 right-3 sm:right-4 flex gap-2">
            <button
              onClick={shareCampaign}
              className="w-9 h-9 sm:w-10 sm:h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            >
              <FaShare className="text-xs sm:text-sm" />
            </button>
            <button
              onClick={() => toggleBookmark(campaign.id)}
              className={`w-9 h-9 sm:w-10 sm:h-10 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors ${
                isBookmarked
                  ? "bg-amber-500 text-white"
                  : "bg-white/20 text-white hover:bg-white/30"
              }`}
            >
              <FaBookmark className="text-xs sm:text-sm" />
            </button>
            <button
              onClick={onClose}
              className="w-9 h-9 sm:w-10 sm:h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            >
              <FaTimes className="text-sm" />
            </button>
          </div>

          {/* Campaign Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
            <div className="flex items-start sm:items-center gap-3 mb-3">
              <span className="text-3xl sm:text-4xl">{campaign.logo}</span>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold drop-shadow-lg">{campaign.name}</h2>
                <div className="flex flex-wrap items-center gap-2 mt-1 text-xs sm:text-sm">
                  {campaign.verified && (
                    <div className="flex items-center gap-1 text-emerald-200">
                      <FaCheckCircle />
                      <span>Verified</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1 text-white/80">
                    <FaGlobe />
                    <span>{campaign.location}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 text-xs sm:text-sm">
                <span>Raised: ₳ {campaign.raised.toLocaleString()}</span>
                <span>Goal: ₳ {campaign.goal.toLocaleString()}</span>
              </div>
              <div className="w-full bg-white/30 rounded-full h-2.5 sm:h-3">
                <motion.div
                  className="h-2.5 sm:h-3 bg-gradient-to-r from-white to-emerald-200 rounded-full shadow-lg"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1.5 }}
                />
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 text-xs sm:text-sm">
                <span>{progress}% funded</span>
                <div className="flex items-center gap-1">
                  <FaClock className="text-xs" />
                  <span>{daysLeft} days left</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content (scrollable) */}
        <div className="p-4 sm:p-6 flex-1 overflow-y-auto">
          {/* Tabs */}
          <div className="flex flex-wrap gap-2 border-b border-gray-200 mb-4 sm:mb-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm md:text-base font-semibold border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? "border-emerald-500 text-emerald-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <Icon className="text-xs sm:text-sm" />
                  <span className="whitespace-nowrap">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === "details" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3">
                      About this Campaign
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                      {campaign.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-2xl">
                        <FaShieldAlt className="text-emerald-600 text-lg sm:text-xl" />
                        <div>
                          <p className="font-semibold text-gray-800 text-sm sm:text-base">
                            Verified Organization
                          </p>
                          <p className="text-xs sm:text-sm text-gray-600">{campaign.beneficiary}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-2xl">
                        <FaFilePdf className="text-blue-600 text-lg sm:text-xl" />
                        <div>
                          <p className="font-semibold text-gray-800 text-sm sm:text-base">
                            License Proof
                          </p>
                          <p className="text-xs sm:text-sm text-gray-600">{campaign.licenseProof}</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="p-4 bg-gray-50 rounded-2xl">
                        <p className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">
                          Blockchain Verification
                        </p>
                        <p className="text-xs sm:text-sm text-gray-600 font-mono break-all">
                          {campaign.blockchainID}
                        </p>
                      </div>
                      <div className="p-4 bg-amber-50 rounded-2xl">
                        <p className="font-semibold text-gray-800 mb-1 text-sm sm:text-base">
                          Campaign Impact
                        </p>
                        <p className="text-xs sm:text-sm text-amber-700">{campaign.impact}</p>
                      </div>
                    </div>
                  </div>

                  {/* Additional Media */}
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3 text-sm sm:text-base">
                      Campaign Gallery
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {campaign.media.map((media, index) => (
                        <img
                          key={index}
                          src={media}
                          alt={`${campaign.name} ${index + 1}`}
                          className="w-full h-24 sm:h-32 object-cover rounded-xl hover:scale-105 transition-transform cursor-pointer"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "updates" && (
                <div className="space-y-4">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                    Recent Updates
                  </h3>
                  {campaign.updates?.map((update, index) => (
                    <div
                      key={index}
                      className="p-4 bg-gray-50 rounded-2xl border-l-4 border-emerald-500"
                    >
                      <p className="text-gray-700 text-sm sm:text-base">{update}</p>
                      <p className="text-xs sm:text-sm text-gray-500 mt-2">
                        {new Date().toLocaleDateString()} • Campaign Team
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "impact" && (
                <div className="space-y-6">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                    Impact Summary
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                    <div className="text-center p-3 sm:p-4 bg-emerald-50 rounded-2xl">
                      <p className="text-xl sm:text-2xl font-bold text-emerald-600">
                        {campaign.donors}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-600">Donors</p>
                    </div>
                    <div className="text-center p-3 sm:p-4 bg-blue-50 rounded-2xl">
                      <p className="text-xl sm:text-2xl font-bold text-blue-600">
                        ₳ {campaign.raised}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-600">Raised</p>
                    </div>
                    <div className="text-center p-3 sm:p-4 bg-amber-50 rounded-2xl">
                      <p className="text-xl sm:text-2xl font-bold text-amber-600">
                        {daysLeft}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-600">Days Left</p>
                    </div>
                    <div className="text-center p-3 sm:p-4 bg-purple-50 rounded-2xl">
                      <p className="text-xl sm:text-2xl font-bold text-purple-600">
                        {progress}%
                      </p>
                      <p className="text-xs sm:text-sm text-gray-600">Funded</p>
                    </div>
                  </div>
                  <div className="p-4 sm:p-5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl text-white">
                    <h4 className="font-semibold mb-2 text-sm sm:text-base">Your Impact Matters</h4>
                    <p className="text-xs sm:text-sm text-white/90">{campaign.impact}</p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
            <button
              onClick={onClose}
              className="w-full sm:flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-2xl font-semibold hover:bg-gray-200 transition-colors text-sm sm:text-base"
            >
              Close
            </button>
            <button
              onClick={() => setQuickDonateCampaign(campaign)}
              className="w-full sm:flex-1 flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-400 to-teal-500 text-white rounded-2xl font-semibold hover:from-emerald-500 hover:to-teal-600 shadow-md transition-all justify-center text-sm sm:text-base"
            >
              <FaDonate />
              Donate Now
            </button>
          </div>

          {/* Copy Feedback */}
          <AnimatePresence>
            {copied && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-emerald-500 text-white px-4 py-2 rounded-full text-xs sm:text-sm font-semibold shadow-lg z-[60]"
              >
                Link copied to clipboard!
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CampaignModal;
