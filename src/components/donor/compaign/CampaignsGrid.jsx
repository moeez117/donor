import React from "react";
import { FaUsers, FaClock, FaCheckCircle, FaBookmark, FaDonate, FaFire } from "react-icons/fa";
import { motion } from "framer-motion";

const CampaignsGrid = ({
  campaigns,
  calculateProgress,
  calculateDaysLeft,
  setSelectedCampaign,
  setQuickDonateCampaign,
  bookmarkedCampaigns,
  toggleBookmark,
  showBookmarks
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {showBookmarks && campaigns.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 bg-white rounded-3xl shadow-lg"
        >
          <FaBookmark className="text-amber-400 text-6xl mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-800 mb-2">No Bookmarked Campaigns</h3>
          <p className="text-gray-600 max-w-md mx-auto">
            Start exploring campaigns and bookmark your favorites to find them easily later.
          </p>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {campaigns.map((campaign) => {
          const progress = calculateProgress(campaign.raised, campaign.goal);
          const daysLeft = calculateDaysLeft(campaign.deadline);
          const isBookmarked = bookmarkedCampaigns.includes(campaign.id);
          const isUrgent = daysLeft <= 7 && progress < 100;

          return (
            <motion.div
              key={campaign.id}
              variants={cardVariants}
              className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group relative overflow-hidden"
            >
              {/* Featured Badge */}
              {campaign.featured && (
                <div className="absolute top-4 left-4 z-10">
                  <div className="flex items-center gap-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                    <FaFire className="text-xs" />
                    Featured
                  </div>
                </div>
              )}

              {/* Bookmark Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleBookmark(campaign.id);
                }}
                className={`absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  isBookmarked
                    ? "bg-amber-500 text-white shadow-lg"
                    : "bg-white/90 text-gray-400 hover:bg-white hover:text-amber-500 shadow-md"
                }`}
              >
                <FaBookmark className="text-sm" />
              </button>

              {/* Campaign Image */}
              <div 
                className="h-48 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-t-3xl relative overflow-hidden"
                onClick={() => setSelectedCampaign(campaign)}
              >
                <img
                  src={campaign.media[0]}
                  alt={campaign.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                
                {/* Progress Bar */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="w-full bg-white/30 rounded-full h-2 backdrop-blur-sm">
                    <motion.div
                      className="h-2 bg-gradient-to-r from-white to-emerald-200 rounded-full shadow-lg"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-white text-sm font-semibold drop-shadow-lg">
                      {progress}% funded
                    </span>
                    <span className="text-white/90 text-xs drop-shadow-lg">
                      ₳ {campaign.raised} of ₳ {campaign.goal}
                    </span>
                  </div>
                </div>
              </div>

              {/* Campaign Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{campaign.logo}</span>
                    <div>
                      <h3 className="font-bold text-gray-800 text-lg leading-tight">
                        {campaign.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        {campaign.verified && (
                          <div className="flex items-center gap-1 text-emerald-600 text-xs font-semibold">
                            <FaCheckCircle />
                            <span>Verified</span>
                          </div>
                        )}
                        <span className="text-gray-500 text-sm">• {campaign.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {campaign.description}
                </p>

                <div className="flex justify-between items-center text-gray-600 mb-4">
                  <div className="flex items-center gap-1 text-sm">
                    <FaUsers className="text-emerald-500" />
                    <span>{campaign.donors} donors</span>
                  </div>
                  <div className={`flex items-center gap-1 text-sm ${isUrgent ? 'text-rose-500 font-semibold' : ''}`}>
                    <FaClock className={isUrgent ? 'text-rose-500' : ''} />
                    <span>{daysLeft} days left</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedCampaign(campaign)}
                    className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-2xl font-semibold hover:bg-gray-200 transition-colors text-sm"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => setQuickDonateCampaign(campaign)}
                    className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-emerald-400 to-teal-500 text-white rounded-2xl font-semibold hover:from-emerald-500 hover:to-teal-600 shadow-md transition-all text-sm"
                  >
                    <FaDonate />
                    Donate
                  </button>
                </div>
              </div>

              {/* Urgent Ribbon */}
              {isUrgent && (
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-4 py-1 rounded-full text-xs font-semibold shadow-lg animate-pulse">
                    🔥 Urgent
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {campaigns.length === 0 && !showBookmarks && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16 bg-white rounded-3xl shadow-lg"
        >
          <div className="w-24 h-24 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaSearch className="text-emerald-500 text-3xl" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">No Campaigns Found</h3>
          <p className="text-gray-600 max-w-md mx-auto mb-6">
            Try adjusting your search terms or filters to find more campaigns that match your interests.
          </p>
          <button className="px-6 py-3 bg-gradient-to-r from-emerald-400 to-teal-500 text-white rounded-2xl font-semibold shadow-md hover:shadow-lg transition-all">
            Explore All Campaigns
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default CampaignsGrid;