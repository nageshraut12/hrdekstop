import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './pages/Dashboard';
import { Employees } from './pages/Employees';
import { Attendance } from './pages/Attendance';
import { Payroll } from './pages/Payroll';
import { Tasks } from './pages/Tasks';
import { Reports } from './pages/Reports';
import { Settings } from './pages/Settings';
import { Feedback } from './pages/Feedback';
import { Login } from './pages/Login';
import { DataProvider } from './context/DataContext';
import { ThemeProvider } from './context/ThemeContext';

// Protected Route Component
function ProtectedRoute({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('hrUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-screen text-gray-600 dark:text-gray-400">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

// Dashboard Layout Component
function DashboardLayout({ currentPage, setCurrentPage }) {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Sidebar onNavChange={setCurrentPage} />
      <div className="flex-1 flex flex-col ml-64">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          {renderPage(currentPage)}
        </main>
      </div>
    </div>
  );
}

function renderPage(currentPage) {
  switch (currentPage) {
    case 'dashboard':
      return <Dashboard />;
    case 'employees':
      return <Employees />;
    case 'attendance':
      return <Attendance />;
    case 'payroll':
      return <Payroll />;
    case 'tasks':
      return <Tasks />;
    case 'reports':
      return <Reports />;
    case 'feedback':
      return <Feedback />;
    case 'settings':
      return <Settings />;
    default:
      return <Dashboard />;
  }
}

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  return (
    <ThemeProvider>
      <DataProvider>
        <Router>
          <Routes>
            {/* Login Route */}
            <Route path="/login" element={<Login />} />

            {/* Protected Dashboard Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardLayout currentPage={currentPage} setCurrentPage={setCurrentPage} />
                </ProtectedRoute>
              }
            />

            {/* All other routes go to dashboard layout */}
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <DashboardLayout currentPage={currentPage} setCurrentPage={setCurrentPage} />
                </ProtectedRoute>
              }
            />

            {/* Default redirect to dashboard */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Router>
      </DataProvider>
    </ThemeProvider>
  );
}

export default App;
