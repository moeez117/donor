import React from 'react';
import { Download, CheckCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const DonationJourney = ({ donationJourney, expandedSection, setExpandedSection }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-emerald-500 text-white shadow-lg shadow-emerald-200';
      case 'current': return 'bg-gradient-to-r from-emerald-600 to-teal-500 text-white shadow-2xl shadow-emerald-300 animate-pulse';
      default: return 'bg-gray-300 text-gray-600';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'current': return Clock;
      default: return Clock;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
          Your Donation Journey
        </h2>
        <button className="flex items-center justify-center gap-3 w-full md:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-2xl text-sm sm:text-base font-bold hover:from-emerald-600 hover:to-teal-600 transition-all shadow-lg hover:shadow-xl">
          <Download className="w-4 h-4 sm:w-5 sm:h-5" />
          Export Journey Report
        </button>
      </div>
      
      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-5 sm:left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-200 to-teal-200 transform translate-x-3 sm:translate-x-4 pointer-events-none" />

        {donationJourney.map((step, index) => {
          const Icon = getStatusIcon(step.status);
          return (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className="relative flex items-start mb-10 sm:mb-12 group"
            >
              {/* Status Icon */}
              <div
                className={`flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-3xl flex items-center justify-center z-10 transition-all duration-500 ${getStatusColor(step.status)}`}
              >
                <Icon className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10" />
              </div>
              
              {/* Card */}
              <motion.div 
                className="ml-4 sm:ml-8 flex-1 bg-gradient-to-r from-emerald-50 to-teal-50 p-5 sm:p-6 md:p-8 rounded-3xl group-hover:from-emerald-100 group-hover:to-teal-100 transition-all duration-500 border-2 border-emerald-100 shadow-lg"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                    {step.title}
                  </h3>
                  <span className="text-xs sm:text-sm text-emerald-600 bg-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-semibold shadow-md self-start sm:self-auto">
                    {step.timestamp}
                  </span>
                </div>

                <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-4">
                  {step.description}
                </p>
                
                <motion.button 
                  onClick={() => setExpandedSection(expandedSection === step.step ? null : step.step)}
                  className="flex items-center gap-2 text-emerald-600 text-sm sm:text-base font-bold hover:text-emerald-700 transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  View Details
                  <motion.span
                    animate={{ rotate: expandedSection === step.step ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    ▼
                  </motion.span>
                </motion.button>
                
                {expandedSection === step.step && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-4 p-4 sm:p-6 bg-white rounded-2xl border border-emerald-200 shadow-inner"
                  >
                    <p className="text-sm sm:text-base text-gray-700">
                      {step.details}
                    </p>
                  </motion.div>
                )}
                
                {step.status === 'current' && (
                  <div className="mt-4 inline-flex items-center px-4 sm:px-6 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm sm:text-base font-bold shadow-lg">
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-white rounded-full mr-2 sm:mr-3 animate-pulse" />
                    Currently Active - Live Tracking
                  </div>
                )}
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default DonationJourney;
