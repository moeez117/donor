import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CampaignsHeader from "./CampaignsHeader";
import CampaignsFilters from "./CampaignsFilters";
import CampaignsGrid from "./CampaignsGrid";
import CampaignModal from "./CampaignModal";
import QuickDonationModal from "./QuickDonationModal";

export default function Campaigns() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [locationFilter, setLocationFilter] = useState("All");
  const [urgencyFilter, setUrgencyFilter] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [quickDonateCampaign, setQuickDonateCampaign] = useState(null);
  const [bookmarkedCampaigns, setBookmarkedCampaigns] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [showBookmarks, setShowBookmarks] = useState(false);

  const campaigns = [
    {
      id: 1,
      name: "Education for All",
      category: "Education",
      location: "Qatar",
      goal: 1000,
      raised: 450,
      donors: 12,
      deadline: "2025-12-31",
      logo: "🎓",
      verified: true,
      featured: true,
      description: "Provide quality education to underprivileged children across Qatar. Help us build a brighter future through knowledge and learning opportunities.",
      licenseProof: "License #12345",
      media: [
        "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400",
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400",
      ],
      beneficiary: "Sandi Organization",
      blockchainID: "0xabc123",
      impact: "120+ children educated",
      updates: ["New school supplies delivered", "50 students enrolled"]
    },
    {
      id: 2,
      name: "Clean Water Project",
      category: "Relief",
      location: "International",
      goal: 2000,
      raised: 1200,
      donors: 30,
      deadline: "2025-11-30",
      logo: "💧",
      verified: true,
      featured: true,
      description: "Provide clean drinking water to communities in need across developing regions. Every donation brings us closer to our goal.",
      licenseProof: "License #67890",
      media: ["https://images.unsplash.com/photo-1548013146-72479768bada?w=400"],
      beneficiary: "Sandi Organization",
      blockchainID: "0xdef456",
      impact: "500+ families served",
      updates: ["2 new wells constructed", "Water purification installed"]
    },
    {
      id: 3,
      name: "Medical Aid Fund",
      category: "Health",
      location: "Qatar",
      goal: 1500,
      raised: 900,
      donors: 20,
      deadline: "2025-12-15",
      logo: "🏥",
      verified: false,
      featured: false,
      description: "Support medical aid and healthcare services for patients in need. Your contribution saves lives and provides essential care.",
      licenseProof: "License #54321",
      media: ["https://images.unsplash.com/photo-1516549655669-df6654e43580?w=400"],
      beneficiary: "Sandi Organization",
      blockchainID: "0xghi789",
      impact: "75+ patients treated",
      updates: ["Medical equipment purchased", "Free clinic established"]
    },
    {
      id: 4,
      name: "Orphan Support Program",
      category: "Orphans",
      location: "International",
      goal: 800,
      raised: 300,
      donors: 8,
      deadline: "2025-10-30",
      logo: "👧🏽",
      verified: true,
      featured: false,
      description: "Provide essential support, education, and care for orphaned children. Help us give them a loving environment and bright future.",
      licenseProof: "License #98765",
      media: ["https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400"],
      beneficiary: "Sandi Organization",
      blockchainID: "0xjkl012",
      impact: "45+ orphans supported",
      updates: ["New shelter opened", "Educational programs started"]
    }
  ];

  const calculateProgress = (raised, goal) =>
    Math.min(Math.round((raised / goal) * 100), 100);
  
  const calculateDaysLeft = (deadline) => {
    const now = new Date();
    const end = new Date(deadline);
    const diff = end - now;
    return diff > 0 ? Math.ceil(diff / (1000 * 60 * 60 * 24)) : 0;
  };

  const filteredCampaigns = campaigns
    .filter((c) => c.name.toLowerCase().includes(search.toLowerCase()))
    .filter((c) => categoryFilter === "All" || c.category === categoryFilter)
    .filter((c) => locationFilter === "All" || c.location === locationFilter)
    .filter((c) => {
      const progress = calculateProgress(c.raised, c.goal);
      if (urgencyFilter === "All") return true;
      if (urgencyFilter === "High") return progress >= 75;
      if (urgencyFilter === "Medium") return progress >= 50 && progress < 75;
      if (urgencyFilter === "Low") return progress < 50;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "featured") return b.featured - a.featured;
      if (sortBy === "raised") return b.raised - a.raised;
      if (sortBy === "deadline") return new Date(a.deadline) - new Date(b.deadline);
      return 0;
    });

  const toggleBookmark = (campaignId) => {
    setBookmarkedCampaigns(prev => 
      prev.includes(campaignId) 
        ? prev.filter(id => id !== campaignId)
        : [...prev, campaignId]
    );
  };

  const handleCampaignView = (campaign) => {
    setSelectedCampaign(campaign);
    setRecentlyViewed(prev => 
      [campaign, ...prev.filter(c => c.id !== campaign.id)].slice(0, 5)
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-4 sm:p-6 space-y-8">
      <CampaignsHeader 
        campaigns={campaigns} 
        showBookmarks={showBookmarks}
        setShowBookmarks={setShowBookmarks}
        bookmarkedCampaigns={bookmarkedCampaigns}
      />
      
      <CampaignsFilters
        search={search}
        setSearch={setSearch}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        locationFilter={locationFilter}
        setLocationFilter={setLocationFilter}
        urgencyFilter={urgencyFilter}
        setUrgencyFilter={setUrgencyFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      <CampaignsGrid
        campaigns={showBookmarks ? filteredCampaigns.filter(c => bookmarkedCampaigns.includes(c.id)) : filteredCampaigns}
        calculateProgress={calculateProgress}
        calculateDaysLeft={calculateDaysLeft}
        setSelectedCampaign={handleCampaignView}
        setQuickDonateCampaign={setQuickDonateCampaign}
        bookmarkedCampaigns={bookmarkedCampaigns}
        toggleBookmark={toggleBookmark}
        showBookmarks={showBookmarks}
      />

      <AnimatePresence>
        {selectedCampaign && (
          <CampaignModal
            campaign={selectedCampaign}
            onClose={() => setSelectedCampaign(null)}
            bookmarkedCampaigns={bookmarkedCampaigns}
            toggleBookmark={toggleBookmark}
            setQuickDonateCampaign={setQuickDonateCampaign}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {quickDonateCampaign && (
          <QuickDonationModal
            campaign={quickDonateCampaign}
            onClose={() => setQuickDonateCampaign(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}