import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export const Settings = ({ onLogout }) => {
  const { user, updateProfile } = useAuth();
  const { darkMode, toggleTheme } = useTheme();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    employeeId: user?.employeeId || '',
    gender: user?.gender || 'male',
    joiningDate: user?.joiningDate || '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    updateProfile(formData);
    setEditMode(false);
    setMessage('Profile updated successfully');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      onLogout();
    }
  };

  return (
    <div className={`p-8 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className="mb-8">
        <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Settings
        </h1>
        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-2`}>
          Manage your account and preferences
        </p>
      </div>

      {/* Success Message */}
      {message && (
        <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Account Settings */}
          <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <div className="flex justify-between items-center mb-6">
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Account Information
              </h2>
              <button
                onClick={() => {
                  if (editMode) {
                    setFormData({
                      name: user?.name || '',
                      email: user?.email || '',
                      employeeId: user?.employeeId || '',
                      gender: user?.gender || 'male',
                      joiningDate: user?.joiningDate || '',
                    });
                  }
                  setEditMode(!editMode);
                }}
                className={`px-4 py-2 rounded-lg ${
                  editMode
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                } transition-colors`}
              >
                {editMode ? 'Cancel' : 'Edit'}
              </button>
            </div>

            {user && (
              <div className="space-y-4">
                {/* User Avatar */}
                <div className="flex justify-center mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white">
                    <span className="text-4xl font-bold">{user.name?.charAt(0).toUpperCase()}</span>
                  </div>
                </div>

                {/* Full Name */}
                <div>
                  <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    Full Name
                  </label>
                  {editMode ? (
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 rounded-lg border ${
                        darkMode
                          ? 'bg-gray-700 border-gray-600 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                  ) : (
                    <p className={`px-4 py-2 ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                      {user.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    Email Address
                  </label>
                  <p className={`px-4 py-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {user.email}
                  </p>
                  <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'} mt-1`}>
                    Email cannot be changed
                  </p>
                </div>

                {/* Employee ID */}
                <div>
                  <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    Employee ID
                  </label>
                  <p className={`px-4 py-2 ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                    {user.employeeId}
                  </p>
                </div>

                {/* Gender */}
                <div>
                  <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    Gender
                  </label>
                  {editMode ? (
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 rounded-lg border ${
                        darkMode
                          ? 'bg-gray-700 border-gray-600 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  ) : (
                    <p className={`px-4 py-2 capitalize ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                      {user.gender}
                    </p>
                  )}
                </div>

                {/* Joining Date */}
                <div>
                  <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    Joining Date
                  </label>
                  <p className={`px-4 py-2 ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                    {new Date(user.joiningDate).toLocaleDateString()}
                  </p>
                </div>

                {/* Account Created */}
                <div>
                  <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    Account Created
                  </label>
                  <p className={`px-4 py-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </div>

                {/* Save Button */}
                {editMode && (
                  <button
                    onClick={handleSave}
                    className="w-full py-3 px-4 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 transition-all font-semibold mt-4"
                  >
                    Save Changes
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-6">
          {/* Theme Settings */}
          <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
              Theme
            </h3>
            <button
              onClick={toggleTheme}
              className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all font-semibold flex items-center justify-center gap-2"
            >
              {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
            </button>
          </div>

          {/* Security Settings */}
          <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
              Security
            </h3>
            <button className="w-full py-3 px-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-semibold opacity-50 cursor-not-allowed">
                🔑 Change Password
            </button>
            <p className={`text-xs mt-2 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
              Feature coming soon
            </p>
          </div>

          {/* Logout */}
          <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg border-2 border-red-200 dark:border-red-900`}>
            <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
              Logout
            </h3>
            <button
              onClick={handleLogout}
              className="w-full py-3 px-4 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-lg hover:from-red-700 hover:to-pink-700 transition-all font-semibold"
            >
              🚪 Logout
            </button>
            <p className={`text-xs mt-2 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
              You will be logged out from your account
            </p>
          </div>

          {/* Help */}
          <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
              Help
            </h3>
            <button className="w-full py-3 px-4 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors font-semibold">
              ❓ Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
