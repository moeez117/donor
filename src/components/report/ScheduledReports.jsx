import React, { useState } from "react";
import { Calendar, Mail, Play, Edit3, Trash2, Plus, Clock, Users, PauseCircle } from "lucide-react";

const allReports = [
  { id: 1, name: "Weekly Donations Report", freq: "Weekly", day: "Sunday", time: "09:00", recipients: "RACA Board, Finance", status: "active" },
  { id: 2, name: "Monthly Compliance Summary", freq: "Monthly", day: "1st of month", time: "10:00", recipients: "Compliance Team", status: "active" },
  { id: 3, name: "Quarterly Impact Report", freq: "Quarterly", day: "1st of quarter", time: "11:00", recipients: "External Stakeholders", status: "paused" },
];

export default function ScheduledReports() {
  const [filter, setFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [reports, setReports] = useState(allReports);

  const frequencies = ["All", "Weekly", "Monthly", "Quarterly"];
  const filtered = filter === "All" ? reports : reports.filter(r => r.freq === filter);

  const runReport = (id) => {
    alert(`Running report ${id} now...`);
    console.log("Running report:", id);
  };

  const deleteReport = (id) => {
    if (window.confirm("Are you sure you want to delete this report?")) {
      setReports(reports.filter(report => report.id !== id));
      console.log("Deleted report:", id);
    }
  };

  const toggleStatus = (id) => {
    setReports(reports.map(report => 
      report.id === id 
        ? { ...report, status: report.status === "active" ? "paused" : "active" }
        : report
    ));
    console.log("Toggled status for report:", id);
  };

  const createReport = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newReport = {
      id: reports.length + 1,
      name: formData.get("name"),
      freq: formData.get("frequency"),
      day: formData.get("day"),
      time: formData.get("time"),
      recipients: formData.get("recipients"),
      status: "active"
    };
    setReports([...reports, newReport]);
    setShowForm(false);
    alert("New report scheduled successfully!");
  };

  const getStatusColor = (status) => 
    status === "active" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800";

  return (
    <div className="bg-white rounded-2xl border border-emerald-200 shadow-xl w-full">
      <div className="p-4 sm:p-6 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-t-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <Calendar className="text-white" size={28} />
            <div>
              <h3 className="text-lg sm:text-xl font-bold">Scheduled Reports</h3>
              <p className="text-xs sm:text-sm text-emerald-100">
                Manage periodic reports for stakeholders
              </p>
            </div>
          </div>
          <button 
            onClick={() => setShowForm(true)} 
            className="flex items-center justify-center gap-2 bg-white text-emerald-600 px-4 py-2 rounded-xl text-sm hover:bg-emerald-50 transition-colors w-full sm:w-auto"
          >
            <Plus size={16} />
            New Report
          </button>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-6">
          {frequencies.map(freq => (
            <button 
              key={freq} 
              onClick={() => setFilter(freq)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                filter === freq 
                  ? "bg-emerald-500 text-white shadow-lg" 
                  : "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
              }`}
            >
              {freq}
            </button>
          ))}
        </div>

        <div className="grid gap-4">
          {filtered.map(report => (
            <div
              key={report.id}
              className="border border-emerald-200 rounded-xl p-4 hover:shadow-lg transition-all bg-white group"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                <div className="flex items-start gap-3 sm:gap-4 flex-1">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl flex items-center justify-center">
                    <Mail className="text-emerald-600" size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                      <h4 className="font-semibold text-emerald-900 text-sm sm:text-base">
                        {report.name}
                      </h4>
                      <span
                        className={`px-2 py-1 rounded-full text-[11px] sm:text-xs font-medium ${getStatusColor(
                          report.status
                        )}`}
                      >
                        {report.status}
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-4 text-xs sm:text-sm text-emerald-600 mb-2">
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>
                          {report.freq} • {report.day} at {report.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users size={14} />
                        <span className="break-all">{report.recipients}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 md:opacity-0 md:group-hover:opacity-100 transition-opacity md:self-start">
                  <button 
                    onClick={() => runReport(report.id)} 
                    className="p-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
                  >
                    <Play size={14} />
                  </button>
                  <button 
                    onClick={() => toggleStatus(report.id)}
                    className="p-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
                  >
                    <PauseCircle size={14} />
                  </button>
                  <button 
                    onClick={() => deleteReport(report.id)} 
                    className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-8 text-emerald-600">
            <Calendar size={40} className="mx-auto mb-3 text-emerald-300" />
            <p className="font-semibold text-sm sm:text-base">No reports found</p>
            <p className="text-xs sm:text-sm mt-1">
              Create a new report to get started
            </p>
          </div>
        )}

        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full">
              <h3 className="text-lg font-bold text-emerald-900 mb-4">
                Schedule New Report
              </h3>
              <form onSubmit={createReport} className="space-y-4">
                <input 
                  type="text" 
                  name="name"
                  placeholder="Report Name" 
                  className="w-full border border-emerald-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" 
                  required
                />
                <select 
                  name="frequency"
                  className="w-full border border-emerald-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                >
                  <option value="">Select Frequency</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Quarterly">Quarterly</option>
                </select>
                <input 
                  type="text" 
                  name="day"
                  placeholder="Day (e.g., Monday, 1st)" 
                  className="w-full border border-emerald-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" 
                  required
                />
                <input 
                  type="time" 
                  name="time"
                  className="w-full border border-emerald-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" 
                  required
                />
                <input 
                  type="text" 
                  name="recipients"
                  placeholder="Recipients (comma separated)" 
                  className="w-full border border-emerald-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" 
                  required
                />
                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                  <button
                    type="submit"
                    className="flex-1 bg-emerald-500 text-white py-2 rounded-lg text-sm hover:bg-emerald-600 transition-colors"
                  >
                    Create Report
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setShowForm(false)} 
                    className="flex-1 bg-gray-500 text-white py-2 rounded-lg text-sm hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
