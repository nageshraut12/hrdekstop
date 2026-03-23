import React, { useState, useEffect } from 'react';

export const Reports = () => {
  const [reports, setReports] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    type: 'Company Growth',
    description: '',
    date: new Date().toISOString().split('T')[0],
    document: null,
    documentName: ''
  });

  useEffect(() => {
    const savedReports = localStorage.getItem('hrReports');
    if (savedReports) {
      setReports(JSON.parse(savedReports));
    }
  }, []);

  const handleDocumentUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, document: reader.result, documentName: file.name });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReport = {
      id: Date.now(),
      ...formData,
      createdAt: new Date().toISOString()
    };

    const updatedReports = [...reports, newReport];
    setReports(updatedReports);
    localStorage.setItem('hrReports', JSON.stringify(updatedReports));

    setFormData({
      title: '',
      type: 'Company Growth',
      description: '',
      date: new Date().toISOString().split('T')[0],
      document: null,
      documentName: ''
    });
    setShowForm(false);
  };

  const handleDeleteReport = (id) => {
    if (window.confirm('Are you sure you want to delete this report?')) {
      const updatedReports = reports.filter(r => r.id !== id);
      setReports(updatedReports);
      localStorage.setItem('hrReports', JSON.stringify(updatedReports));
    }
  };

  const downloadDocument = (document, name) => {
    const link = document.createElement('a');
    link.href = document;
    link.download = name;
    link.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Reports & Analytics</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Company growth and improvement reports with documents</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition font-semibold"
        >
          {showForm ? '❌ Close' : '📊 Add Report'}
        </button>
      </div>

      {/* Add Report Form */}
      {showForm && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Create New Report</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Report Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Q4 Growth Report"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>

              {/* Report Type */}
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Report Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-white"
                >
                  <option>Company Growth</option>
                  <option>Improvement Initiative</option>
                  <option>Performance Analysis</option>
                  <option>Financial Report</option>
                  <option>Employee Development</option>
                </select>
              </div>
            </div>

            {/* Date */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Report Date</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Provide detailed information about this report..."
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>

            {/* Document Upload */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Upload Document</label>
              <input
                type="file"
                onChange={handleDocumentUpload}
                accept=".pdf,.doc,.docx,.xlsx,.xls,.ppt,.pptx,.txt"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-white"
              />
              {formData.documentName && (
                <p className="mt-2 text-sm text-green-600 dark:text-green-400">✅ {formData.documentName}</p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition"
              >
                Create Report
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-bold py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <div className="text-6xl mb-4">📊</div>
            <p className="text-gray-600 dark:text-gray-400 text-lg">No reports created yet</p>
            <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">Click "Add Report" to create your first report</p>
          </div>
        ) : (
          reports.map((report) => (
            <div
              key={report.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-xl transition"
            >
              {/* Type Badge */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 flex justify-between items-center">
                <span className="font-semibold">{report.type}</span>
                <span className="text-sm bg-white/20 px-3 py-1 rounded-full">{report.date}</span>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{report.title}</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 line-clamp-3">{report.description}</p>

                {/* Document Section */}
                {report.document && (
                  <div className="bg-blue-50 dark:bg-blue-900 p-3 rounded-lg mb-4">
                    <p className="text-sm text-gray-700 dark:text-gray-300 font-semibold mb-2">📎 Document Attached</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 truncate">{report.documentName}</p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2">
                  {report.document && (
                    <button
                      onClick={() => downloadDocument(report.document, report.documentName)}
                      className="flex-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 font-semibold py-2 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition text-sm"
                    >
                      ⬇️ Download
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteReport(report.id)}
                    className="flex-1 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 font-semibold py-2 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 transition text-sm"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
