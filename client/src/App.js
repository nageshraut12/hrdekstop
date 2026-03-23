import React, { useState, useContext } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './pages/Dashboard';
import { Employees } from './pages/Employees';
import { Attendance } from './pages/Attendance';
import { Payroll } from './pages/Payroll';
import { Tasks } from './pages/Tasks';
import { Reports } from './pages/Reports';
import { DataProvider } from './context/DataContext';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

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
      case 'reports':
        return <Reports />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <ThemeProvider>
      <DataProvider>
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
          <Sidebar onNavChange={setCurrentPage} />
          <div className="flex-1 flex flex-col ml-64">
            <Header />
            <main className="flex-1 overflow-y-auto">
              {renderPage()}
            </main>
          </div>
        </div>
      </DataProvider>
    </ThemeProvider>
  );
}

export default App;
