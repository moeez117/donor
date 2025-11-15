import React from 'react';
import { Sparkles, Target, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const ImpactHeader = ({ donationAmount, setDonationAmount, handleDonate }) => {
  return (
    <>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10 sm:mb-12 px-4"
      >
        <div className="
          inline-flex items-center gap-3 
          bg-gradient-to-r from-emerald-500 to-teal-500 
          text-white px-4 sm:px-6 py-2 sm:py-3 
          rounded-full text-xs sm:text-sm font-semibold 
          mb-4 sm:mb-6 
          shadow-lg shadow-emerald-200
        ">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
          Live Impact Tracking Active
        </div>

        <h1 className="
          text-4xl sm:text-5xl lg:text-6xl 
          font-black text-gray-900 mb-3 sm:mb-4 
          bg-gradient-to-r from-emerald-600 to-teal-700 
          bg-clip-text text-transparent
        ">
          Real-Time Impact
        </h1>

        <p className="
          text-lg sm:text-xl lg:text-2xl 
          text-gray-600 
          max-w-xl sm:max-w-3xl lg:max-w-4xl 
          mx-auto 
          leading-relaxed font-light px-2
        ">
          Watch your donations create waves of change. Every contribution is
          <span className="font-semibold text-emerald-600"> tracked, verified, and celebrated</span>
          in real-time.
        </p>
      </motion.div>

      {/* Quick Donation CTA */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="
          relative 
          bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 
          rounded-2xl sm:rounded-3xl 
          p-6 sm:p-8 
          text-white shadow-2xl shadow-emerald-300 
          mb-10 sm:mb-12 
          overflow-hidden 
          mx-2 sm:mx-0
        "
      >
        {/* Background circles */}
        <div className="absolute top-0 right-0 w-40 sm:w-64 h-40 sm:h-64 bg-white/10 rounded-full -translate-y-20 sm:-translate-y-32 translate-x-20 sm:translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-32 sm:w-48 h-32 sm:h-48 bg-white/5 rounded-full translate-y-20 sm:translate-y-24 -translate-x-20 sm:-translate-x-24"></div>

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
          {/* Text Section */}
          <div className="text-center lg:text-left px-2 sm:px-0">
            <div className="flex items-center gap-3 mb-3 sm:mb-4 justify-center lg:justify-start">
              <Target className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-200" />
              <h3 className="text-2xl sm:text-3xl font-bold">Make an Immediate Impact</h3>
            </div>
            <p className="text-emerald-100 text-base sm:text-lg max-w-xl">
              Your donation will be tracked from the moment you give until it reaches those in need. 
              <span className="font-semibold text-white"> Complete transparency guaranteed.</span>
            </p>
          </div>

          {/* Donation Input + Button */}
          <div className="
            flex flex-col sm:flex-row items-center 
            gap-3 sm:gap-4 
            bg-white/20 backdrop-blur-sm 
            rounded-xl sm:rounded-2xl 
            p-3 sm:p-4 w-full sm:w-auto
          ">
            <div className="flex items-center bg-white/30 rounded-xl p-2 sm:p-3 w-full sm:w-auto">
              <span className="text-emerald-100 px-2 text-lg sm:text-xl">$</span>
              <input
                type="number"
                value={donationAmount}
                onChange={(e) => setDonationAmount(e.target.value)}
                className="
                  bg-transparent text-white font-bold 
                  text-lg sm:text-xl 
                  w-full sm:w-24 text-center sm:text-left 
                  focus:outline-none placeholder-white/70
                "
                min="1"
                placeholder="100"
              />
            </div>

            <button
              onClick={handleDonate}
              className="
                bg-white text-emerald-600 
                px-6 sm:px-8 py-3 sm:py-4 
                rounded-xl font-bold 
                hover:bg-gray-50 
                transition-all duration-300 
                shadow-2xl hover:shadow-3xl 
                hover:scale-105 
                flex items-center gap-2 w-full sm:w-auto justify-center
              "
            >
              <TrendingUp className="w-5 h-5" />
              Donate Now
            </button>
          </div>
        </div>

        {/* Floating decorations */}
        <div className="absolute top-4 left-4 w-2 sm:w-3 h-2 sm:h-3 bg-yellow-400 rounded-full animate-bounce"></div>
        <div className="absolute bottom-6 right-6 w-2 h-2 bg-cyan-300 rounded-full animate-pulse"></div>
      </motion.div>
    </>
  );
};

export default ImpactHeader;
