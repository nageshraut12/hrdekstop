import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

export const Feedback = () => {
  const { darkMode } = useTheme();
  const { user } = useAuth();
  const [feedbacks, setFeedbacks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [employees] = useState([
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Mike Johnson' },
    { id: 4, name: 'Sarah Williams' },
    { id: 5, name: 'Robert Brown' },
  ]);
  const [formData, setFormData] = useState({
    employeeId: '',
    employeeName: '',
    department: '',
    feedbackType: 'performance',
    rating: 5,
    comment: '',
  });

  // Load feedbacks from localStorage
  useEffect(() => {
    const storedFeedbacks = localStorage.getItem('hr_feedbacks');
    if (storedFeedbacks) {
      setFeedbacks(JSON.parse(storedFeedbacks));
    }
  }, []);

  // Save feedbacks to localStorage
  useEffect(() => {
    if (feedbacks.length > 0) {
      localStorage.setItem('hr_feedbacks', JSON.stringify(feedbacks));
    }
  }, [feedbacks]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEmployeeSelect = (employeeId, employeeName) => {
    setFormData(prev => ({
      ...prev,
      employeeId,
      employeeName
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.employeeId || !formData.comment) {
      alert('Please fill in all required fields');
      return;
    }

    const newFeedback = {
      id: Date.now().toString(),
      ...formData,
      givenBy: user?.name || 'Anonymous',
      givenByEmail: user?.email || 'unknown@email.com',
      createdAt: new Date().toISOString(),
    };

    setFeedbacks([newFeedback, ...feedbacks]);
    setFormData({
      employeeId: '',
      employeeName: '',
      department: '',
      feedbackType: 'performance',
      rating: 5,
      comment: '',
    });
    setShowForm(false);
  };

  const getRatingColor = (rating) => {
    if (rating >= 4) return 'text-green-600 dark:text-green-400';
    if (rating >= 3) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getRatingBg = (rating) => {
    if (rating >= 4) return 'bg-green-100 dark:bg-green-900';
    if (rating >= 3) return 'bg-yellow-100 dark:bg-yellow-900';
    return 'bg-red-100 dark:bg-red-900';
  };

  const deleteFeedback = (id) => {
    if (window.confirm('Are you sure you want to delete this feedback?')) {
      setFeedbacks(feedbacks.filter(f => f.id !== id));
    }
  };

  return (
    <div className={`p-8 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className="mb-8">
        <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Feedback
        </h1>
        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-2`}>
          Provide constructive feedback to your colleagues
        </p>
      </div>

      {/* Add Feedback Button */}
      <button
        onClick={() => setShowForm(!showForm)}
        className="mb-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
      >
        {showForm ? '✕ Cancel' : '+ Give Feedback'}
      </button>

      {/* Feedback Form */}
      {showForm && (
        <div className={`mb-8 p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Provide Feedback
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Select Employee */}
            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                Select Employee *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
                {employees.map((emp) => (
                  <button
                    key={emp.id}
                    type="button"
                    onClick={() => handleEmployeeSelect(emp.id, emp.name)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      formData.employeeId === emp.id.toString()
                        ? 'border-blue-600 bg-blue-50 dark:bg-blue-900'
                        : darkMode
                        ? 'border-gray-600 bg-gray-700 hover:border-blue-500'
                        : 'border-gray-300 bg-gray-50 hover:border-blue-500'
                    }`}
                  >
                    <p className={`font-semibold ${
                      formData.employeeId === emp.id.toString()
                        ? 'text-blue-600 dark:text-blue-400'
                        : darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {emp.name}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Feedback Type */}
              <div>
                <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                  Feedback Type
                </label>
                <select
                  name="feedbackType"
                  value={formData.feedbackType}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                  <option value="performance">Performance</option>
                  <option value="behavior">Behavior</option>
                  <option value="teamwork">Teamwork</option>
                  <option value="communication">Communication</option>
                  <option value="technical">Technical Skills</option>
                </select>
              </div>

              {/* Rating */}
              <div>
                <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                  Rating (1-5) *
                </label>
                <div className="flex gap-2 items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                      className={`text-3xl cursor-pointer transition-transform ${
                        star <= formData.rating ? 'scale-110' : 'scale-100'
                      }`}
                    >
                      {star <= formData.rating ? '⭐' : '☆'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Department */}
            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                Department
              </label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                placeholder="e.g., HR, Finance, Sales"
                className={`w-full px-4 py-2 rounded-lg border ${
                  darkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>

            {/* Comment */}
            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                Feedback Comment *
              </label>
              <textarea
                name="comment"
                value={formData.comment}
                onChange={handleInputChange}
                placeholder="Provide detailed feedback..."
                rows="5"
                className={`w-full px-4 py-2 rounded-lg border ${
                  darkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 transition-all font-semibold"
            >
              Submit Feedback
            </button>
          </form>
        </div>
      )}

      {/* Feedbacks List */}
      <div className="space-y-4">
        {feedbacks.length === 0 ? (
          <div className={`p-8 text-center rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              No feedback yet. Start by giving constructive feedback!
            </p>
          </div>
        ) : (
          feedbacks.map((feedback) => (
            <div
              key={feedback.id}
              className={`p-6 rounded-lg shadow-lg ${
                darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {feedback.employeeName}
                  </h3>
                  <div className="flex gap-2 items-center mt-2">
                    <span className={`text-sm px-3 py-1 rounded-full ${
                      darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {feedback.feedbackType}
                    </span>
                    {feedback.department && (
                      <span className={`text-sm px-3 py-1 rounded-full ${
                        darkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {feedback.department}
                      </span>
                    )}
                  </div>
                </div>
                <div className={`text-3xl font-bold ${getRatingColor(feedback.rating)}`}>
                  {feedback.rating}/5
                </div>
              </div>

              <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {feedback.comment}
              </p>

              <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-4 flex justify-between`}>
                <span>Given by: {feedback.givenBy}</span>
                <span>{new Date(feedback.createdAt).toLocaleDateString()}</span>
              </div>

              <button
                onClick={() => deleteFeedback(feedback.id)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                🗑️ Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
