import React, { useState } from "react";
import { Download, FileText, Sheet, File, Clock, Filter, CheckCircle } from "lucide-react";

const datasets = ["Campaigns", "Donations", "Charities", "Beneficiaries"];
const formats = [
  { type: "CSV", icon: FileText, color: "from-emerald-500 to-teal-600" },
  { type: "Excel", icon: Sheet, color: "from-emerald-500 to-teal-600" },
  { type: "PDF", icon: File, color: "from-emerald-500 to-teal-600" }
];

const recentExports = [
  { id: 1, dataset: "Donations", format: "CSV", time: "2 hours ago", size: "2.4 MB", status: "completed" },
  { id: 2, dataset: "Campaigns", format: "PDF", time: "1 day ago", size: "1.8 MB", status: "completed" },
  { id: 3, dataset: "Charities", format: "Excel", time: "2 days ago", size: "3.1 MB", status: "completed" },
];

export default function ExportsPanel() {
  const [selectedDataset, setSelectedDataset] = useState("Donations");
  const [selectedFormat, setSelectedFormat] = useState("CSV");
  const [includeFilters, setIncludeFilters] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [exports, setExports] = useState(recentExports);

  const handleExport = () => {
    setExporting(true);
    
    // Simulate export process
    setTimeout(() => {
      const newExport = {
        id: exports.length + 1,
        dataset: selectedDataset,
        format: selectedFormat,
        time: "Just now",
        size: "2.5 MB",
        status: "completed"
      };
      
      setExports([newExport, ...exports]);
      setExporting(false);
      alert(`Successfully exported ${selectedDataset} as ${selectedFormat}`);
    }, 2000);
  };

  const getFormatIcon = (formatType) => {
    const format = formats.find(f => f.type === formatType);
    return format ? format.icon : FileText;
  };

  const downloadExport = (exportItem) => {
    alert(`Downloading ${exportItem.dataset}.${exportItem.format.toLowerCase()}`);
  };

  return (
    <div className="bg-white rounded-2xl border border-emerald-200 shadow-xl w-full">
      <div className="p-4 sm:p-6 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-t-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <Download className="text-white" size={28} />
            <div>
              <h3 className="text-lg sm:text-xl font-bold">Data Exports</h3>
              <p className="text-xs sm:text-sm text-emerald-100">
                Manual exports in multiple formats
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Export Controls */}
          <div className="space-y-6">
            {/* Dataset Selection */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-4 sm:p-6">
              <h4 className="font-semibold text-emerald-900 mb-4 flex items-center gap-2 text-sm sm:text-base">
                <Filter size={18} />
                Select Dataset
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {datasets.map(dataset => (
                  <button 
                    key={dataset} 
                    onClick={() => setSelectedDataset(dataset)}
                    className={`p-3 sm:p-4 rounded-lg border-2 transition-all text-left ${
                      selectedDataset === dataset 
                        ? "border-emerald-500 bg-white shadow-md" 
                        : "border-emerald-200 bg-white hover:border-emerald-300"
                    }`}
                  >
                    <div className="font-medium text-emerald-900 text-sm sm:text-base">
                      {dataset}
                    </div>
                    <div className="text-[11px] sm:text-xs text-emerald-600 mt-1">
                      Click to select
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Format Selection */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-4 sm:p-6">
              <h4 className="font-semibold text-emerald-900 mb-4 text-sm sm:text-base">
                Export Format
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {formats.map(({ type, icon: Icon, color }) => (
                  <button 
                    key={type} 
                    onClick={() => setSelectedFormat(type)}
                    className={`p-3 sm:p-4 rounded-lg border-2 transition-all text-center ${
                      selectedFormat === type 
                        ? `border-emerald-500 bg-gradient-to-r ${color} text-white shadow-lg` 
                        : "border-emerald-200 bg-white hover:border-emerald-300 text-emerald-700"
                    }`}
                  >
                    <Icon size={20} className="mx-auto mb-1.5 sm:mb-2" />
                    <div className="text-xs sm:text-sm font-medium">{type}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Export Preview & Actions */}
          <div className="space-y-6">
            {/* Export Settings */}
            <div className="bg-white border border-emerald-200 rounded-xl p-4 sm:p-6">
              <h4 className="font-semibold text-emerald-900 mb-4 text-sm sm:text-base">
                Export Settings
              </h4>
              <div className="space-y-3 sm:space-y-4 text-sm">
                <div className="flex items-center justify-between p-2 hover:bg-emerald-50 rounded">
                  <span className="text-emerald-700 text-xs sm:text-sm">
                    Include current filters
                  </span>
                  <button 
                    onClick={() => setIncludeFilters(!includeFilters)}
                    className={`w-12 h-6 rounded-full transition-all ${
                      includeFilters ? "bg-emerald-500" : "bg-gray-300"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white transition-transform ${
                        includeFilters ? "translate-x-7" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
                <div className="flex items-center justify-between p-2 hover:bg-emerald-50 rounded">
                  <span className="text-emerald-700 text-xs sm:text-sm">
                    File compression
                  </span>
                  <span className="text-[11px] sm:text-sm text-emerald-600 bg-emerald-100 px-2 py-1 rounded">
                    Enabled
                  </span>
                </div>
                <div className="flex items-center justify-between p-2 hover:bg-emerald-50 rounded">
                  <span className="text-emerald-700 text-xs sm:text-sm">
                    Estimated size
                  </span>
                  <span className="text-[11px] sm:text-sm font-semibold text-emerald-600">
                    ~2.5 MB
                  </span>
                </div>
              </div>
            </div>

            {/* Export Action */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-4 sm:p-6">
              <button 
                onClick={handleExport} 
                disabled={exporting}
                className={`w-full py-3 sm:py-4 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base ${
                  exporting 
                    ? "bg-gray-400 text-white cursor-not-allowed" 
                    : "bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:shadow-lg hover:scale-[1.02]"
                }`}
              >
                {exporting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Exporting {selectedDataset}...
                  </>
                ) : (
                  <>
                    <Download size={20} />
                    Export {selectedDataset} as {selectedFormat}
                  </>
                )}
              </button>
              <p className="text-[11px] sm:text-xs text-emerald-600 text-center mt-3">
                Export will include all {selectedDataset.toLowerCase()} data
              </p>
            </div>

            {/* Recent Exports */}
            <div className="bg-white border border-emerald-200 rounded-xl p-4 sm:p-6">
              <h4 className="font-semibold text-emerald-900 mb-4 flex items-center gap-2 text-sm sm:text-base">
                <Clock size={18} />
                Recent Exports
              </h4>
              <div className="space-y-3">
                {exports.map(exportItem => (
                  <div 
                    key={exportItem.id} 
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-3 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors cursor-pointer"
                    onClick={() => downloadExport(exportItem)}
                  >
                    <div className="flex items-center gap-3">
                      {React.createElement(getFormatIcon(exportItem.format), { 
                        size: 16, 
                        className: "text-emerald-600" 
                      })}
                      <div>
                        <div className="text-sm font-medium text-emerald-900">
                          {exportItem.dataset}
                        </div>
                        <div className="text-[11px] sm:text-xs text-emerald-600">
                          {exportItem.format} • {exportItem.size}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-emerald-600">
                      <CheckCircle size={14} className="text-emerald-500" />
                      <span>{exportItem.time}</span>
                    </div>
                  </div>
                ))}
                {exports.length === 0 && (
                  <p className="text-xs sm:text-sm text-emerald-600 text-center py-4">
                    No exports generated yet.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
