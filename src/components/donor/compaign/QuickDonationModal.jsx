import React, { useState } from "react";
import { FaTimes, FaDonate, FaCreditCard, FaUniversity, FaWallet, FaQrcode } from "react-icons/fa";
import { motion } from "framer-motion";

const QuickDonationModal = ({ campaign, onClose }) => {
  const [amount, setAmount] = useState("");
  const [frequency, setFrequency] = useState("one-time");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);

  const presetAmounts = [25, 50, 100, 250, 500];

  const handleDonation = async () => {
    if (!amount || isNaN(amount) || amount <= 0) return;
    
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      alert(`🎉 Thank you for your donation of ₳${amount} to ${campaign.name}!`);
      onClose();
    }, 2000);
  };

  const paymentMethods = [
    { id: "card", label: "Credit/Debit Card", icon: FaCreditCard },
    { id: "bank", label: "Bank Transfer", icon: FaUniversity },
    { id: "wallet", label: "Digital Wallet", icon: FaWallet },
    { id: "qr", label: "QR Code", icon: FaQrcode },
  ];

  const frequencies = [
    { id: "one-time", label: "One-time" },
    { id: "monthly", label: "Monthly" },
    { id: "quarterly", label: "Quarterly" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-800">Quick Donation</h2>
              <p className="text-gray-600 text-sm mt-1">Support {campaign.name}</p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
            >
              <FaTimes />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Amount Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Donation Amount (₳)
            </label>
            <div className="grid grid-cols-3 gap-2 mb-3">
              {presetAmounts.map((preset) => (
                <button
                  key={preset}
                  onClick={() => setAmount(preset.toString())}
                  className={`py-3 rounded-xl font-semibold transition-all ${
                    amount === preset.toString()
                      ? "bg-emerald-500 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  ₳{preset}
                </button>
              ))}
            </div>
            <input
              type="number"
              placeholder="Custom amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>

          {/* Frequency */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Donation Frequency
            </label>
            <div className="grid grid-cols-3 gap-2">
              {frequencies.map((freq) => (
                <button
                  key={freq.id}
                  onClick={() => setFrequency(freq.id)}
                  className={`py-2 rounded-xl font-semibold text-sm transition-all ${
                    frequency === freq.id
                      ? "bg-emerald-500 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {freq.label}
                </button>
              ))}
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Payment Method
            </label>
            <div className="grid grid-cols-2 gap-3">
              {paymentMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`flex items-center gap-2 p-3 rounded-xl font-semibold text-sm transition-all ${
                      paymentMethod === method.id
                        ? "bg-emerald-500 text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    <Icon />
                    {method.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Donate Button */}
          <button
            onClick={handleDonation}
            disabled={!amount || isProcessing}
            className="w-full py-4 bg-gradient-to-r from-emerald-400 to-teal-500 text-white rounded-2xl font-semibold shadow-md hover:from-emerald-500 hover:to-teal-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <FaDonate />
                Donate ₳{amount || "0"}
              </>
            )}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default QuickDonationModal;