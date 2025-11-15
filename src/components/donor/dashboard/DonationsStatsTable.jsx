import React from 'react';

const QuickDonateModal = ({
  showModal,
  setShowModal,
  form,
  setForm,
  addDonation
}) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div 
        className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl"
        data-aos="zoom-in"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-emerald-900">Quick Donate</h2>
          <button
            onClick={() => setShowModal(false)}
            className="p-2 hover:bg-emerald-50 rounded-full transition-colors"
          >
            <span className="text-lg">✕</span>
          </button>
        </div>
        
        <form onSubmit={addDonation} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-emerald-700 mb-2">
              Amount (QAR)
            </label>
            <input
              type="number"
              placeholder="Enter amount"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              className="w-full border border-emerald-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-emerald-700 mb-2">
              Campaign Name
            </label>
            <input
              type="text"
              placeholder="Enter campaign name"
              value={form.campaign}
              onChange={(e) => setForm({ ...form, campaign: e.target.value })}
              className="w-full border border-emerald-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-emerald-700 mb-2">
                Type
              </label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full border border-emerald-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
              >
                <option value="relief">Relief</option>
                <option value="health">Health</option>
                <option value="education">Education</option>
                <option value="orphans">Orphans</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-emerald-700 mb-2">
                Payment Method
              </label>
              <select
                value={form.paymentMethod}
                onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}
                className="w-full border border-emerald-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
              >
                <option value="card">Credit Card</option>
                <option value="apple-pay">Apple Pay</option>
                <option value="bank">Bank Transfer</option>
                <option value="paypal">PayPal</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="px-6 py-2.5 text-sm rounded-full border border-emerald-200 text-emerald-700 hover:bg-emerald-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 text-sm rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Donate Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuickDonateModal;