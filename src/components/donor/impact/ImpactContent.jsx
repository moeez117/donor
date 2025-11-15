import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DonationJourney from './DonationJourney';
import MediaGallery from './MediaGallery';
import InteractiveMap from './InteractiveMap';
import ImpactAnalytics from './ImpactAnalytics';

const ImpactContent = ({
  activeTab,
  donationJourney,
  mediaProof,
  locations,
  selectedLocation,
  setSelectedLocation,
  searchTerm,
  setSearchTerm,
  filterType,
  setFilterType,
  expandedSection,
  setExpandedSection,
  savedItems,
  handleSaveItem,
  setSelectedMedia,
  timeframe,
  setTimeframe
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

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="
        bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl 
        border border-emerald-100 
        w-full 
        p-4 sm:p-6 lg:p-8 
        mb-6 sm:mb-8
      "
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="w-full"
        >
          {activeTab === 'journey' && (
            <DonationJourney
              donationJourney={donationJourney}
              expandedSection={expandedSection}
              setExpandedSection={setExpandedSection}
            />
          )}

          {activeTab === 'media' && (
            <MediaGallery
              mediaProof={mediaProof}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              filterType={filterType}
              setFilterType={setFilterType}
              savedItems={savedItems}
              handleSaveItem={handleSaveItem}
              setSelectedMedia={setSelectedMedia}
            />
          )}

          {activeTab === 'map' && (
            <InteractiveMap
              locations={locations}
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
            />
          )}

          {activeTab === 'analytics' && (
            <ImpactAnalytics
              timeframe={timeframe}
              setTimeframe={setTimeframe}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default ImpactContent;
