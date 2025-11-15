import React from 'react';
import { X, Bookmark, MapPin, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const MediaModal = ({ media, onClose, savedItems, handleSaveItem }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <img
            src={media.url}
            alt={media.title}
            className="w-full h-96 object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-6 right-6 bg-black/70 text-white p-3 rounded-2xl hover:bg-black/90 transition-colors shadow-2xl"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-3xl font-bold text-gray-900">{media.title}</h3>
            <button 
              onClick={() => handleSaveItem(media.id)}
              className={`p-4 rounded-2xl transition-all shadow-lg ${
                savedItems.includes(media.id) 
                  ? 'bg-rose-500 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Bookmark className="w-6 h-6" />
            </button>
          </div>
          <p className="text-gray-600 text-xl mb-6 leading-relaxed">{media.description}</p>
          <div className="flex flex-wrap gap-3 mb-6">
            {media.tags.map(tag => (
              <span key={tag} className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full text-base font-semibold shadow-lg">
                #{tag}
              </span>
            ))}
          </div>
          <div className="flex justify-between items-center text-gray-600 text-lg">
            <span className="flex items-center font-semibold">
              <MapPin className="w-6 h-6 mr-3 text-emerald-600" />
              {media.location}
            </span>
            <span className="font-semibold">{media.date}</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MediaModal;