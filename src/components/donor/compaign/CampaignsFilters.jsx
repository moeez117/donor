import React from "react";
import { FaSearch, FaFilter, FaSort, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const CampaignsFilters = ({
  search,
  setSearch,
  categoryFilter,
  setCategoryFilter,
  locationFilter,
  setLocationFilter,
  urgencyFilter,
  setUrgencyFilter,
  sortBy,
  setSortBy
}) => {
  const [showMobileFilters, setShowMobileFilters] = React.useState(false);

  const categories = ["All", "Education", "Health", "Relief", "Orphans"];
  const locations = ["All", "Qatar", "International"];
  const urgencyLevels = ["All", "High", "Medium", "Low"];
  const sortOptions = [
    { value: "featured", label: "Featured" },
    { value: "raised", label: "Most Funded" },
    { value: "deadline", label: "Ending Soon" }
  ];

  const clearFilters = () => {
    setSearch("");
    setCategoryFilter("All");
    setLocationFilter("All");
    setUrgencyFilter("All");
    setSortBy("featured");
  };

  const hasActiveFilters = search || categoryFilter !== "All" || locationFilter !== "All" || urgencyFilter !== "All";

  return (
    <>
      {/* Desktop Filters */}
      <motion.div
        className="hidden lg:flex flex-wrap gap-3 items-center justify-between"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <div className="flex flex-wrap gap-3 items-center">
          {/* Search */}
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search campaigns..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 pr-4 py-3 bg-white rounded-2xl shadow-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent w-64"
            />
          </div>

          {/* Filters */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-3 bg-white rounded-2xl shadow-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="px-4 py-3 bg-white rounded-2xl shadow-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          >
            {locations.map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>

          <select
            value={urgencyFilter}
            onChange={(e) => setUrgencyFilter(e.target.value)}
            className="px-4 py-3 bg-white rounded-2xl shadow-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          >
            {urgencyLevels.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-2 px-4 py-3 bg-rose-500 text-white rounded-2xl shadow-md hover:bg-rose-600 transition-colors"
            >
              <FaTimes />
              Clear
            </button>
          )}
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2">
          <FaSort className="text-gray-400" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 bg-white rounded-2xl shadow-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      </motion.div>

      {/* Mobile Filters */}
      <div className="lg:hidden space-y-3">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search campaigns..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white rounded-2xl shadow-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="px-4 py-3 bg-white rounded-2xl shadow-md border border-gray-200"
          >
            <FaFilter className="text-gray-600" />
          </button>
        </div>

        <AnimatePresence>
          {showMobileFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white rounded-2xl shadow-lg p-4 space-y-3"
            >
              <div className="grid grid-cols-2 gap-3">
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-3 py-2 bg-gray-50 rounded-xl border border-gray-200"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <select
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="px-3 py-2 bg-gray-50 rounded-xl border border-gray-200"
                >
                  {locations.map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
                <select
                  value={urgencyFilter}
                  onChange={(e) => setUrgencyFilter(e.target.value)}
                  className="px-3 py-2 bg-gray-50 rounded-xl border border-gray-200"
                >
                  {urgencyLevels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 bg-gray-50 rounded-xl border border-gray-200"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="w-full py-2 bg-rose-500 text-white rounded-xl font-semibold"
                >
                  Clear Filters
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default CampaignsFilters;