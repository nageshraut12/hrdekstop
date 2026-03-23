import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Settings = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('hrUser');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setFormData(userData);
    }
  }, []);

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      localStorage.setItem('hrUser', JSON.stringify(formData));
      setUser(formData);
      setEditMode(false);
      setSuccess('Profile updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('hrUser');
      navigate('/login');
    }
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    const currentPassword = e.target.currentPassword.value;
    const newPassword = e.target.newPassword.value;
    const confirmPassword = e.target.confirmPassword.value;

    if (currentPassword !== user.password) {
      setError('Current password is incorrect');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    const updatedUser = { ...user, password: newPassword };
    localStorage.setItem('hrUser', JSON.stringify(updatedUser));
    setUser(updatedUser);
    setError('');
    setSuccess('Password changed successfully!');
    e.target.reset();
    setTimeout(() => setSuccess(''), 3000);
  };

  if (!user) {
    return <div className="text-center py-12 text-gray-600 dark:text-gray-400">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Manage your account settings and preferences</p>
      </div>

      {/* Success/Error Messages */}
      {success && (
        <div className="p-4 bg-green-100 dark:bg-green-900 border border-green-400 dark:border-green-700 text-green-700 dark:text-green-200 rounded-lg">
          ✅ {success}
        </div>
      )}
      {error && (
        <div className="p-4 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 rounded-lg">
          ❌ {error}
        </div>
      )}

      {/* Profile Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Account Information</h2>
          <button
            onClick={() => setEditMode(!editMode)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition font-semibold"
          >
            {editMode ? '❌ Cancel' : '✏️ Edit Profile'}
          </button>
        </div>

        {editMode ? (
          <form onSubmit={handleProfileUpdate} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Full Name</label>
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-white"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email || ''}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-white"
                />
              </div>

              {/* Employee ID */}
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Employee ID</label>
                <input
                  type="text"
                  value={formData.employeeId || ''}
                  disabled
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                />
              </div>

              {/* Department */}
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Department</label>
                <input
                  type="text"
                  value={formData.department || ''}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-white"
                />
              </div>

              {/* Gender */}
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Gender</label>
                <select
                  value={formData.gender || ''}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-white"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Joining Date */}
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Joining Date</label>
                <input
                  type="date"
                  value={formData.joiningDate || ''}
                  onChange={(e) => setFormData({ ...formData, joiningDate: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition"
            >
              Save Changes
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Full Name</p>
                <p className="text-gray-900 dark:text-white text-lg font-semibold">{user.name}</p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Email</p>
                <p className="text-gray-900 dark:text-white text-lg font-semibold">{user.email}</p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Employee ID</p>
                <p className="text-gray-900 dark:text-white text-lg font-semibold">{user.employeeId}</p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Department</p>
                <p className="text-gray-900 dark:text-white text-lg font-semibold">{user.department || 'N/A'}</p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Gender</p>
                <p className="text-gray-900 dark:text-white text-lg font-semibold">{user.gender || 'N/A'}</p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Joining Date</p>
                <p className="text-gray-900 dark:text-white text-lg font-semibold">{user.joiningDate || 'N/A'}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Change Password */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Change Password</h2>

        <form onSubmit={handleChangePassword} className="space-y-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Current Password</label>
            <input
              type="password"
              name="currentPassword"
              placeholder="Enter your current password"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">New Password</label>
            <input
              type="password"
              name="newPassword"
              placeholder="Enter new password"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Confirm New Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm new password"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Update Password
          </button>
        </form>
      </div>

      {/* Logout Section */}
      <div className="bg-red-50 dark:bg-red-900/20 rounded-xl shadow-lg p-8 border border-red-200 dark:border-red-800">
        <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-3">Logout</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">Sign out from your HR Portal account. You'll need to login again to access your account.</p>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-red-700 transition"
        >
          🚪 Logout
        </button>
      </div>
    </div>
  );
};
