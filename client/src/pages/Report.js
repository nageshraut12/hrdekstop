import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

export const Report = () => {
  const { darkMode } = useTheme();
  const [reports, setReports] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [documentFile, setDocumentFile] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    department: 'HR',
    growthPercentage: '',
    improvemet: '',
    documentName: '',
  });

  // Load reports from localStorage
  useEffect(() => {
    const storedReports = localStorage.getItem('hr_reports');
    if (storedReports) {
      setReports(JSON.parse(storedReports));
    }
  }, []);

  // Save reports to localStorage
  useEffect(() => {
    if (reports.length > 0) {
      localStorage.setItem('hr_reports', JSON.stringify(reports));
    }
  }, [reports]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          documentName: file.name,
        }));
        setDocumentFile(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.department || !formData.growthPercentage) {
      alert('Please fill in all required fields');
      return;
    }

    const newReport = {
      id: Date.now().toString(),
      ...formData,
      document: documentFile,
      createdAt: new Date().toISOString(),
    };

    setReports([newReport, ...reports]);
    setFormData({
      title: '',
      description: '',
      department: 'HR',
      growthPercentage: '',
      improvemet: '',
      documentName: '',
    });
    setDocumentFile(null);
    setShowForm(false);
  };

  const downloadDocument = (report) => {
    if (!report.document) return;

    const link = document.createElement('a');
    link.href = report.document;
    link.download = report.documentName || `report-${report.id}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const deleteReport = (id) => {
    if (window.confirm('Are you sure you want to delete this report?')) {
      setReports(reports.filter(r => r.id !== id));
    }
  };

  return (
    <div className={`p-8 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className="mb-8">
        <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Reports
        </h1>
        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-2`}>
          Company growth and improvement reports with document uploads
        </p>
      </div>

      {/* Add Report Button */}
      <button
        onClick={() => setShowForm(!showForm)}
        className="mb-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
      >
        {showForm ? '✕ Cancel' : '+ Add Report'}
      </button>

      {/* Add Report Form */}
      {showForm && (
        <div className={`mb-8 p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Create New Report
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Title */}
              <div>
                <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                  Report Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g., Q1 Company Growth Report"
                  className={`w-full px-4 py-2 rounded-lg border ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>

              {/* Department */}
              <div>
                <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                  Department *
                </label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                  <option value="HR">HR</option>
                  <option value="Finance">Finance</option>
                  <option value="Sales">Sales</option>
                  <option value="Marketing">Marketing</option>
                  <option value="IT">IT</option>
                  <option value="Operations">Operations</option>
                </select>
              </div>

              {/* Growth Percentage */}
              <div>
                <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                  Growth Percentage (%) *
                </label>
                <input
                  type="number"
                  name="growthPercentage"
                  value={formData.growthPercentage}
                  onChange={handleInputChange}
                  placeholder="e.g., 25.5"
                  step="0.1"
                  className={`w-full px-4 py-2 rounded-lg border ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>

              {/* Improvement */}
              <div>
                <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                  Key Improvement Area
                </label>
                <input
                  type="text"
                  name="improvemet"
                  value={formData.improvemet}
                  onChange={handleInputChange}
                  placeholder="e.g., Productivity, Revenue"
                  className={`w-full px-4 py-2 rounded-lg border ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter details about the report..."
                rows="4"
                className={`w-full px-4 py-2 rounded-lg border ${
                  darkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>

            {/* Document Upload */}
            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                Upload Document
              </label>
              <div className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer ${
                darkMode ? 'border-gray-600 hover:border-blue-500' : 'border-gray-300 hover:border-blue-500'
              } transition-colors`}>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  id="reportDocument"
                  accept=".pdf,.doc,.docx,.xlsx,.xls"
                />
                <label htmlFor="reportDocument" className="cursor-pointer block">
                  {documentFile ? (
                    <p className={`text-blue-600 dark:text-blue-400 font-semibold`}>
                      ✓ {formData.documentName}
                    </p>
                  ) : (
                    <div>
                      <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>📄</p>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Click to upload document (PDF, DOC, XLSX)
                      </p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 transition-all font-semibold"
            >
              Create Report
            </button>
          </form>
        </div>
      )}

      {/* Reports List */}
      <div className="space-y-4">
        {reports.length === 0 ? (
          <div className={`p-8 text-center rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              No reports yet. Create your first report!
            </p>
          </div>
        ) : (
          reports.map((report) => (
            <div
              key={report.id}
              className={`p-6 rounded-lg shadow-lg ${
                darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {report.title}
                  </h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
                    Created: {new Date(report.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className={`inline-flex px-4 py-2 rounded-full text-sm font-semibold ${
                  report.growthPercentage > 0
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                }`}>
                  {report.growthPercentage > 0 ? '📈' : '📉'} {report.growthPercentage}%
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Department</p>
                  <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {report.department}
                  </p>
                </div>
                {report.improvemet && (
                  <div>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Improvement</p>
                    <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {report.improvemet}
                    </p>
                  </div>
                )}
              </div>

              {report.description && (
                <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                  {report.description}
                </p>
              )}

              <div className="flex gap-4">
                {report.document && (
                  <button
                    onClick={() => downloadDocument(report)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    📥 Download Document
                  </button>
                )}
                <button
                  onClick={() => deleteReport(report.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
