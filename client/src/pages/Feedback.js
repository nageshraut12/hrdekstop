import React, { useState, useEffect, useContext } from 'react';
import { DataContext } from '../context/DataContext';

export const Feedback = () => {
  const { employees } = useContext(DataContext);
  const [feedbacks, setFeedbacks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    employeeId: '',
    employeeName: '',
    category: 'Performance',
    rating: 5,
    comment: '',
    isAnonymous: false
  });
  const [filterEmployee, setFilterEmployee] = useState('');

  useEffect(() => {
    const savedFeedbacks = localStorage.getItem('hrFeedbacks');
    if (savedFeedbacks) {
      setFeedbacks(JSON.parse(savedFeedbacks));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newFeedback = {
      id: Date.now(),
      ...formData,
      submittedBy: JSON.parse(localStorage.getItem('hrUser') || '{}').name,
      submittedAt: new Date().toISOString()
    };

    const updatedFeedbacks = [...feedbacks, newFeedback];
    setFeedbacks(updatedFeedbacks);
    localStorage.setItem('hrFeedbacks', JSON.stringify(updatedFeedbacks));

    setFormData({
      employeeId: '',
      employeeName: '',
      category: 'Performance',
      rating: 5,
      comment: '',
      isAnonymous: false
    });
    setShowForm(false);
  };

  const handleDeleteFeedback = (id) => {
    if (window.confirm('Are you sure you want to delete this feedback?')) {
      const updatedFeedbacks = feedbacks.filter(f => f.id !== id);
      setFeedbacks(updatedFeedbacks);
      localStorage.setItem('hrFeedbacks', JSON.stringify(updatedFeedbacks));
    }
  };

  const filteredFeedbacks = filterEmployee
    ? feedbacks.filter(f => f.employeeId === filterEmployee)
    : feedbacks;

  const getRatingColor = (rating) => {
    if (rating >= 4) return 'text-green-600 dark:text-green-400';
    if (rating >= 3) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getRatingStars = (rating) => {
    return '⭐'.repeat(Math.round(rating));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Employee Feedback</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Provide constructive feedback for your team members</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition font-semibold"
        >
          {showForm ? '❌ Close' : '💬 Give Feedback'}
        </button>
      </div>

      {/* Feedback Form */}
      {showForm && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Submit Feedback</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Select Employee */}
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Select Employee</label>
                <select
                  value={formData.employeeId}
                  onChange={(e) => {
                    const emp = employees.find(e => e._id === e.target.value);
                    setFormData({
                      ...formData,
                      employeeId: e.target.value,
                      employeeName: emp?.name || ''
                    });
                  }}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-white"
                  required
                >
                  <option value="">-- Choose an employee --</option>
                  {employees && employees.map(emp => (
                    <option key={emp._id} value={emp._id}>{emp.name} ({emp.position})</option>
                  ))}
                </select>
              </div>

              {/* Feedback Category */}
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Feedback Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-white"
                >
                  <option>Performance</option>
                  <option>Communication</option>
                  <option>Teamwork</option>
                  <option>Punctuality</option>
                  <option>Professionalism</option>
                  <option>Leadership</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            {/* Rating */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Rating: {getRatingStars(formData.rating)}</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData({ ...formData, rating: star })}
                    className={`text-4xl transition ${star <= formData.rating ? 'opacity-100' : 'opacity-30'}`}
                  >
                    ⭐
                  </button>
                ))}
              </div>
            </div>

            {/* Comment */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Feedback Comment</label>
              <textarea
                value={formData.comment}
                onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                placeholder="Provide detailed and constructive feedback..."
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>

            {/* Anonymous */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="anonymous"
                checked={formData.isAnonymous}
                onChange={(e) => setFormData({ ...formData, isAnonymous: e.target.checked })}
                className="w-5 h-5 rounded cursor-pointer"
              />
              <label htmlFor="anonymous" className="text-gray-700 dark:text-gray-300 font-semibold cursor-pointer">
                Submit as Anonymous
              </label>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition"
              >
                Submit Feedback
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

      {/* Filter */}
      {feedbacks.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Filter by Employee</label>
          <select
            value={filterEmployee}
            onChange={(e) => setFilterEmployee(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-white"
          >
            <option value="">-- Show All Feedbacks --</option>
            {employees && employees.map(emp => (
              <option key={emp._id} value={emp._id}>{emp.name}</option>
            ))}
          </select>
        </div>
      )}

      {/* Feedbacks List */}
      <div className="space-y-4">
        {filteredFeedbacks.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-12 text-center border border-gray-200 dark:border-gray-700">
            <div className="text-6xl mb-4">💬</div>
            <p className="text-gray-600 dark:text-gray-400 text-lg">No feedback yet</p>
            <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">Start by providing constructive feedback to your team members</p>
          </div>
        ) : (
          filteredFeedbacks.map(feedback => (
            <div
              key={feedback.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{feedback.employeeName}</h3>
                  <div className="flex gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full">
                      {feedback.category}
                    </span>
                    <span className={`font-bold ${getRatingColor(feedback.rating)}`}>
                      {getRatingStars(feedback.rating)} {feedback.rating}/5
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteFeedback(feedback.id)}
                  className="bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 px-3 py-2 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 transition"
                >
                  🗑️
                </button>
              </div>

              <p className="text-gray-700 dark:text-gray-300 mb-4">{feedback.comment}</p>

              <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                <span>
                  {feedback.isAnonymous ? 'Anonymous' : `By: ${feedback.submittedBy}`}
                </span>
                <span>{new Date(feedback.submittedAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
