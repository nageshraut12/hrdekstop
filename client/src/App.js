import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './pages/Dashboard';
import { Employees } from './pages/Employees';
import { Attendance } from './pages/Attendance';
import { Payroll } from './pages/Payroll';
import { Tasks } from './pages/Tasks';
import { Report } from './pages/Report';
import { Settings } from './pages/Settings';
import { Feedback } from './pages/Feedback';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { DataProvider } from './context/DataContext';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';

function AppContent() {
  const { isAuthenticated, logout } = useAuth();
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [showSignup, setShowSignup] = useState(false);

  if (!isAuthenticated) {
    return showSignup ? (
      <Signup onSwitchToLogin={() => setShowSignup(false)} />
    ) : (
      <Login onSwitchToSignup={() => setShowSignup(true)} />
    );
  }

  const renderPage = () => {
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
      case 'report':
        return <Report />;
      case 'feedback':
        return <Feedback />;
      case 'settings':
        return <Settings onLogout={logout} />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Sidebar onNavChange={setCurrentPage} />
      <div className="flex-1 flex flex-col ml-64">
        <Header />
        <main className="flex-1 overflow-y-auto">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <DataProvider>
          <AppContent />
        </DataProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
