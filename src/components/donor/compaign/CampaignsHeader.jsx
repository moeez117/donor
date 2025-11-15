import React from "react";
import { FaBookmark, FaFire, FaRocket, FaHeart } from "react-icons/fa";
import { motion } from "framer-motion";

const CampaignsHeader = ({ campaigns, showBookmarks, setShowBookmarks, bookmarkedCampaigns }) => {
  const totalRaised = campaigns.reduce((sum, c) => sum + c.raised, 0);
  const totalDonors = campaigns.reduce((sum, c) => sum + c.donors, 0);
  const featuredCampaigns = campaigns.filter(c => c.featured).length;
  const verifiedCampaigns = campaigns.filter(c => c.verified).length;

  return (
    <>
      {/* Header */}
      <motion.div
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
              <FaHeart className="text-white text-2xl" />
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-rose-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">{campaigns.length}</span>
            </div>
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800">
              Campaign Explorer
            </h1>
            <p className="text-gray-600 mt-1">
              Discover and support verified charity campaigns
            </p>
          </div>
        </div>
        
        <button
          onClick={() => setShowBookmarks(!showBookmarks)}
          className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold transition-all ${
            showBookmarks 
              ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg" 
              : "bg-white text-gray-700 shadow-md hover:shadow-lg"
          }`}
        >
          <FaBookmark className={showBookmarks ? "text-white" : "text-amber-500"} />
          {showBookmarks ? "Show All" : `Bookmarks (${bookmarkedCampaigns.length})`}
        </button>
      </motion.div>

      {/* Analytics Summary */}
      <motion.div
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl shadow-lg p-5 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
          <div className="relative z-10">
            <p className="text-white/80 text-sm">Total Raised</p>
            <h2 className="text-2xl font-bold mt-1">₳ {totalRaised.toLocaleString()}</h2>
            <div className="flex items-center gap-1 mt-2 text-white/70">
              <FaRocket className="text-sm" />
              <span className="text-xs">All campaigns</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl shadow-lg p-5 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
          <div className="relative z-10">
            <p className="text-white/80 text-sm">Total Donors</p>
            <h2 className="text-2xl font-bold mt-1">{totalDonors}</h2>
            <div className="flex items-center gap-1 mt-2 text-white/70">
              <FaHeart className="text-sm" />
              <span className="text-xs">Generous supporters</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-lime-400 to-green-500 rounded-2xl shadow-lg p-5 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
          <div className="relative z-10">
            <p className="text-white/80 text-sm">Featured</p>
            <h2 className="text-2xl font-bold mt-1">{featuredCampaigns}</h2>
            <div className="flex items-center gap-1 mt-2 text-white/70">
              <FaFire className="text-sm" />
              <span className="text-xs">Top campaigns</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl shadow-lg p-5 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
          <div className="relative z-10">
            <p className="text-white/80 text-sm">Verified</p>
            <h2 className="text-2xl font-bold mt-1">{verifiedCampaigns}</h2>
            <div className="flex items-center gap-1 mt-2 text-white/70">
              <FaBookmark className="text-sm" />
              <span className="text-xs">Trusted organizations</span>
            </div>
          </div>
        </div>
      </motion.div>

      {showBookmarks && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-4"
        >
          <div className="flex items-center gap-3">
            <FaBookmark className="text-amber-500 text-xl" />
            <div>
              <h3 className="font-semibold text-amber-800">Viewing Bookmarked Campaigns</h3>
              <p className="text-amber-600 text-sm">
                {bookmarkedCampaigns.length} campaign{bookmarkedCampaigns.length !== 1 ? 's' : ''} saved
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default CampaignsHeader;