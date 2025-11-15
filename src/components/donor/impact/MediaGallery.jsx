import React from 'react';
import { Search, CheckCircle, Bookmark, ZoomIn, MapPin, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const MediaGallery = ({
  mediaProof,
  searchTerm,
  setSearchTerm,
  filterType,
  setFilterType,
  savedItems,
  handleSaveItem,
  setSelectedMedia
}) => {
  const filteredMedia = mediaProof.filter(media => {
    const matchesSearch =
      media.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      media.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || media.type === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div>
      {/* Header + Controls */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 lg:mb-12 gap-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent max-w-xl">
          Media Proof & Documentation
        </h2>

        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
          {/* Search */}
          <div className="relative w-full sm:w-auto sm:flex-1 lg:w-80">
            <Search className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search media proofs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 py-3 sm:py-4 border-2 border-emerald-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent w-full text-sm sm:text-base lg:text-lg"
            />
          </div>

          {/* Filter */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="w-full sm:w-auto px-4 sm:px-6 py-3 sm:py-4 border-2 border-emerald-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm sm:text-base lg:text-lg font-semibold"
          >
            <option value="all">All Media Types</option>
            <option value="image">Images</option>
          </select>
        </div>
      </div>

      {/* Cards Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8"
        layout
      >
        {filteredMedia.map((media, index) => (
          <motion.div
            key={media.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gradient-to-br from-white to-emerald-50 rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 group border-2 border-emerald-100"
            whileHover={{ y: -8 }}
          >
            {/* Image Section */}
            <div className="relative overflow-hidden">
              <img
                src={media.url}
                alt={media.title}
                className="w-full h-56 sm:h-64 md:h-64 lg:h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Top-right badges */}
              <div className="absolute top-3 sm:top-4 right-3 sm:right-4 flex gap-2 sm:gap-3">
                <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold flex items-center shadow-lg">
                  <CheckCircle className="w-4 h-4 mr-1.5 sm:mr-2" />
                  Verified
                </div>
                <button
                  onClick={() => handleSaveItem(media.id)}
                  className={`p-2.5 sm:p-3 rounded-2xl backdrop-blur-sm transition-all shadow-lg ${
                    savedItems.includes(media.id)
                      ? 'bg-rose-500 text-white'
                      : 'bg-white/90 text-gray-600 hover:bg-white hover:text-rose-500'
                  }`}
                >
                  <Bookmark className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>

              {/* Zoom button */}
              <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4">
                <button
                  onClick={() => setSelectedMedia(media)}
                  className="bg-black/70 text-white p-2.5 sm:p-3 rounded-2xl backdrop-blur-sm hover:bg-black/90 transition-colors shadow-lg"
                >
                  <ZoomIn className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-4 sm:p-6">
              {/* Title + likes */}
              <div className="flex items-start justify-between mb-3 sm:mb-4 gap-3">
                <h3 className="font-bold text-gray-900 text-lg sm:text-xl leading-tight flex-1">
                  {media.title}
                </h3>
                <button
                  onClick={() => handleSaveItem(media.id)}
                  className="flex items-center gap-1.5 sm:gap-2 text-gray-400 hover:text-rose-500 transition-colors flex-shrink-0"
                >
                  <Heart
                    className={`w-4 h-4 sm:w-5 sm:h-5 ${
                      savedItems.includes(media.id) ? 'fill-rose-500 text-rose-500' : ''
                    }`}
                  />
                  <span className="text-xs sm:text-sm font-semibold">{media.likes}</span>
                </button>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm sm:text-base mb-3 sm:mb-4 leading-relaxed">
                {media.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
                {media.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 sm:py-2 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 rounded-full text-xs sm:text-sm font-semibold"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Meta row */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 text-sm sm:text-base text-gray-600 font-semibold">
                <span className="flex items-center">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2 text-emerald-600" />
                  {media.location}
                </span>
                <span className="text-gray-500 sm:text-right">{media.date}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Empty state */}
      {filteredMedia.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 sm:py-16 px-4"
        >
          <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <Search className="w-12 h-12 sm:w-16 sm:h-16 text-emerald-500" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3 sm:mb-4">
            No Media Found
          </h3>
          <p className="text-gray-600 text-base sm:text-xl max-w-md mx-auto">
            Try adjusting your search terms or filters to find media proofs.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default MediaGallery;
