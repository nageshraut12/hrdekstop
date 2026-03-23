import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');

  // Demo credentials
  const [demoMode] = useState(true);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    try {
      if (demoMode && email === 'demo@example.com' && password === 'password') {
        const demoUser = {
          name: 'John Doe',
          email: 'demo@example.com',
          employeeId: 'EMP001',
          department: 'HR',
          gender: 'Male',
          joiningDate: '2023-01-15'
        };
        localStorage.setItem('hrUser', JSON.stringify(demoUser));
        navigate('/dashboard');
      } else if (demoMode) {
        setError('Demo credentials: email: demo@example.com, password: password');
      } else {
        login(email, password);
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    if (forgotEmail) {
      setError('');
      alert('Password reset link sent to ' + forgotEmail + '\n\nFor demo, use: demo@example.com / password');
      setShowForgotModal(false);
      setForgotEmail('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center p-4">
      {/* Main Login Box */}
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-2">HR Portal</h1>
          <p className="text-blue-100 text-lg">Employee Management System</p>
        </div>

        {/* Login Form Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 text-center">Welcome Back</h2>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-8">Sign in to your account</p>

          {error && (
            <div className="mb-6 p-3 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@company.com"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>

            {/* Forgot Password Link */}
            <button
              type="button"
              onClick={() => setShowForgotModal(true)}
              className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium w-full text-right"
            >
              Forgot Password?
            </button>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition duration-300 shadow-lg"
            >
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
            <span className="px-3 text-gray-500 dark:text-gray-400 text-sm">or</span>
            <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
          </div>

          {/* Create Account Button */}
          <button
            type="button"
            onClick={() => setShowSignupModal(true)}
            className="w-full border-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 font-bold py-3 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition duration-300"
          >
            Create New Account
          </button>
        </div>

        {/* Demo Credentials Info */}
        <div className="mt-6 p-4 bg-white/10 backdrop-blur-md rounded-lg border border-white/20">
          <p className="text-white text-sm text-center">
            <span className="font-semibold">Demo Login:</span> demo@example.com / password
          </p>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Reset Password</h3>
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                  Enter your email address
                </label>
                <input
                  type="email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="your.email@company.com"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Send Reset Link
                </button>
                <button
                  type="button"
                  onClick={() => setShowForgotModal(false)}
                  className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-bold py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Signup Modal */}
      {showSignupModal && (
        <SignupModal onClose={() => setShowSignupModal(false)} />
      )}
    </div>
  );
};

const SignupModal = ({ onClose }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    employeeId: '',
    password: '',
    confirmPassword: '',
    gender: 'Male',
    joiningDate: new Date().toISOString().split('T')[0],
    employeeIdImage: null
  });
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState('');

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, employeeIdImage: reader.result });
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      const newUser = {
        name: formData.name,
        email: formData.email,
        employeeId: formData.employeeId,
        password: formData.password,
        gender: formData.gender,
        joiningDate: formData.joiningDate,
        employeeIdImage: formData.employeeIdImage,
        createdAt: new Date().toISOString()
      };

      const users = JSON.parse(localStorage.getItem('hrUsers') || '[]');
      
      if (users.some(u => u.email === formData.email)) {
        setError('Email already exists');
        return;
      }

      if (users.some(u => u.employeeId === formData.employeeId)) {
        setError('Employee ID already exists');
        return;
      }

      users.push(newUser);
      localStorage.setItem('hrUsers', JSON.stringify(users));
      localStorage.setItem('hrUser', JSON.stringify(newUser));

      alert('Account created successfully!');
      navigate('/dashboard');
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full p-8 my-8">
        <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Create New Account</h3>

        {error && (
          <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Full Name */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="John Doe"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Email Address</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="john@company.com"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          {/* Employee ID */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Employee ID</label>
            <input
              type="text"
              value={formData.employeeId}
              onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
              placeholder="EMP001"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Gender</label>
            <select
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-white"
            >
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          {/* Joining Date */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Joining Date</label>
            <input
              type="date"
              value={formData.joiningDate}
              onChange={(e) => setFormData({ ...formData, joiningDate: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Confirm Password</label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          {/* Employee ID Card Image Upload */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Employee ID Card Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-white"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Employee ID Preview"
                className="mt-2 w-full max-w-xs h-auto rounded-lg border border-gray-300 dark:border-gray-600"
              />
            )}
          </div>

          {/* Buttons */}
          <div className="md:col-span-2 flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition"
            >
              Create Account
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-bold py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
