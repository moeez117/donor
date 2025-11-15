import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const initialRequests = [
  { id: "REQ-201", name: "Future Minds Charity", type: "New Registration", submitted: "2025-10-28", documents: 5, priority: "High" },
  { id: "REQ-209", name: "Gulf Food Aid", type: "Profile Update", submitted: "2025-10-30", documents: 3, priority: "Medium" },
  { id: "REQ-214", name: "Healing Hands Foundation", type: "New Registration", submitted: "2025-11-01", documents: 7, priority: "High" },
];

export default function RegistrationRequests() {
  const [requests, setRequests] = useState(initialRequests);
  const [selectedRequest, setSelectedRequest] = useState(null);
  useEffect(() => { AOS.init({ duration: 550, once: true }); }, []);

  const processRequest = (id, action) => {
    const request = requests.find(r => r.id === id);
    if (window.confirm(`${action} ${request.name}?`)) {
      setRequests(prev => prev.filter(r => r.id !== id));
      alert(`${request.name} has been ${action.toLowerCase()}ed successfully.`);
    }
  };

  const viewDocuments = (request) => {
    setSelectedRequest(request);
    alert(`Documents for ${request.name}:\n\n• Registration Form\n• Legal Documents (${request.documents} files)\n• Financial Statements\n• Compliance Checklist\n• Supporting Documents\n\nTotal: ${request.documents} documents uploaded`);
  };

  const addNote = (request) => {
    const note = prompt("Add a note for this request:");
    if (note) {
      alert(`Note added to ${request.name}: "${note}"`);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50/20 to-emerald-50/20 p-4 sm:p-6 overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="rounded-3xl border border-white/80 bg-white/80 shadow-2xl shadow-emerald-200/20 backdrop-blur-xl">
          <div className="rounded-t-3xl bg-gradient-to-r from-emerald-600 to-teal-600 p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-6">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white">Registration Requests</h1>
                <p className="text-emerald-100 mt-1 sm:mt-2 text-sm sm:text-base">
                  Review and approve new charity registrations and updates
                </p>
              </div>
              <div className="bg-white/20 rounded-2xl px-4 sm:px-6 py-2.5 sm:py-3 text-white w-full sm:w-auto">
                <div className="text-xs sm:text-sm">Pending Requests</div>
                <div className="text-xl sm:text-2xl font-bold">{requests.length}</div>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-6 lg:p-8">
            <div className="space-y-4 sm:space-y-6">
              {requests.map((request) => (
                <div
                  key={request.id}
                  className="bg-white rounded-2xl border border-emerald-100 p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4 sm:mb-6">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-1.5 sm:mb-2">
                        <h3 className="text-lg sm:text-xl font-bold text-slate-800 break-words">
                          {request.name}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${
                            request.priority === "High"
                              ? "bg-rose-100 text-rose-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {request.priority} Priority
                        </span>
                      </div>
                      <div className="text-xs sm:text-sm text-slate-600">
                        {request.type} • Submitted {request.submitted} • {request.documents} documents
                      </div>
                    </div>

                    <div className="flex flex-wrap sm:flex-nowrap gap-2 sm:gap-3 w-full lg:w-auto">
                      <button
                        onClick={() => viewDocuments(request)}
                        className="flex-1 sm:flex-none bg-emerald-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base font-semibold hover:bg-emerald-700 transition-all"
                      >
                        View Docs
                      </button>
                      <button
                        onClick={() => addNote(request)}
                        className="flex-1 sm:flex-none border border-emerald-300 text-emerald-700 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base font-semibold hover:bg-emerald-50 transition-all"
                      >
                        Add Note
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                    <button
                      onClick={() => processRequest(request.id, "Approve")}
                      className="flex-1 bg-emerald-600 text-white py-2.5 sm:py-3 rounded-xl text-sm sm:text-base font-semibold hover:bg-emerald-700 transition-all"
                    >
                      ✅ Approve Request
                    </button>
                    <button
                      onClick={() => processRequest(request.id, "Reject")}
                      className="flex-1 bg-rose-600 text-white py-2.5 sm:py-3 rounded-xl text-sm sm:text-base font-semibold hover:bg-rose-700 transition-all"
                    >
                      ❌ Reject Request
                    </button>
                    <button
                      onClick={() => processRequest(request.id, "Request More Info")}
                      className="flex-1 border border-emerald-300 text-emerald-700 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base font-semibold hover:bg-emerald-50 transition-all"
                    >
                      📋 More Info
                    </button>
                  </div>
                </div>
              ))}

              {requests.length === 0 && (
                <div className="text-center py-10 sm:py-12 text-slate-500 text-sm sm:text-base">
                  No pending registration requests.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
