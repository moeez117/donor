import React from 'react';
import { MapPin, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const InteractiveMap = ({ locations, selectedLocation, setSelectedLocation }) => {
  return (
    <div>
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-8 sm:mb-12 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent px-2">
        Interactive Impact Map
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Map / Hero Panel */}
        <div className="lg:col-span-2 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-4 sm:p-6 lg:p-8 min-h-[260px] sm:min-h-[360px] lg:min-h-[500px] flex items-center justify-center relative overflow-hidden border-2 border-emerald-200">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10" />
          
          <div className="text-center text-gray-600 relative z-10 px-2">
            <Globe className="w-24 h-24 sm:w-32 sm:h-32 lg:w-48 lg:h-48 mx-auto mb-6 sm:mb-8 text-emerald-600 opacity-20" />
            
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 sm:p-8 lg:p-12 shadow-2xl border-2 border-emerald-200 max-w-xl mx-auto">
              <Globe className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 mx-auto mb-4 sm:mb-6 text-emerald-600" />
              
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
                Interactive Map View
              </p>
              
              <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6">
                Showing real-time impact in{" "}
                <span className="font-semibold text-emerald-600">
                  {selectedLocation}
                </span>
              </p>
              
              <div className="inline-flex items-center px-5 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full font-semibold sm:font-bold text-sm sm:text-lg shadow-2xl shadow-emerald-300">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" />
                Live Impact Tracking Active
              </div>
            </div>
          </div>
        </div>

        {/* Locations List */}
        <div className="space-y-4 sm:space-y-6 mt-4 lg:mt-0 px-1 sm:px-0">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-6">
            Impact Locations
          </h3>

          {locations.map((location, index) => (
            <motion.div
              key={location.name}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedLocation(location.name)}
              className={`p-4 sm:p-6 rounded-3xl border-2 cursor-pointer transition-all duration-300 shadow-lg ${
                selectedLocation === location.name
                  ? 'border-emerald-500 bg-gradient-to-r from-emerald-50 to-teal-50 shadow-2xl shadow-emerald-200 transform scale-[1.02]'
                  : 'border-emerald-100 hover:border-emerald-300 bg-white hover:shadow-xl'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 sm:mb-4 gap-2 sm:gap-0">
                <span className="font-bold text-gray-900 text-lg sm:text-xl">
                  {location.name}
                </span>
                <div className="flex items-center">
                  {location.active && (
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-emerald-500 rounded-full mr-2 sm:mr-3 animate-pulse" />
                  )}
                  <span className="text-sm sm:text-lg text-emerald-600 font-bold">
                    {location.donations.toLocaleString()} donations
                  </span>
                </div>
              </div>

              <div className="w-full bg-emerald-100 rounded-full h-3 sm:h-4">
                <motion.div
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 h-3 sm:h-4 rounded-full shadow-lg"
                  initial={{ width: 0 }}
                  animate={{ width: `${location.progress}%` }}
                  transition={{ duration: 1, delay: index * 0.2 }}
                />
              </div>

              <div className="flex justify-between text-xs sm:text-sm md:text-base text-gray-600 mt-2 sm:mt-3 font-semibold">
                <span>Impact Progress</span>
                <span className="text-emerald-600">
                  {location.progress}% Complete
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;
