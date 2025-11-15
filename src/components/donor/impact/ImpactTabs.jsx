import React from 'react';
import { motion } from 'framer-motion';

const ImpactTabs = ({ activeTab, setActiveTab, tabs }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="
        flex flex-wrap justify-center 
        gap-3 sm:gap-4 
        mb-8 sm:mb-12
        px-2
      "
    >
      {tabs.map((tab) => (
        <motion.button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`
            relative flex items-center 
            gap-2 sm:gap-4 
            px-4 py-3 sm:px-8 sm:py-5 
            rounded-2xl font-bold 
            text-sm sm:text-lg
            transition-all duration-500
            w-full xs:w-auto
            ${
              activeTab === tab.id
                ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-2xl transform scale-105 shadow-emerald-300"
                : "bg-white/80 text-gray-700 hover:bg-emerald-50 shadow-lg hover:shadow-emerald-200 border-2 border-emerald-100 backdrop-blur-sm"
            }
          `}
        >
          <tab.icon
            className={`
              ${activeTab === tab.id ? "text-white" : "text-emerald-600"}
              w-4 h-4 sm:w-6 sm:h-6
            `}
          />

          <span className="whitespace-nowrap">{tab.label}</span>

          {activeTab === tab.id && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl -z-10"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}

          {activeTab === tab.id && (
            <div className="absolute inset-0 rounded-2xl bg-emerald-400/20 blur-xl -z-20"></div>
          )}
        </motion.button>
      ))}
    </motion.div>
  );
};

export default ImpactTabs;
