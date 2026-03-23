import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export const Sidebar = ({ onNavChange }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const { user } = useAuth();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'employees', label: 'Employees', icon: '👥' },
    { id: 'attendance', label: 'Attendance', icon: '📅' },
    { id: 'payroll', label: 'Payroll', icon: '💰' },
    { id: 'tasks', label: 'Tasks', icon: '✓' },
    { id: 'report', label: 'Reports', icon: '📈' },
    { id: 'feedback', label: 'Feedback', icon: '💬' },
    { id: 'settings', label: 'Settings', icon: '⚙️' }
  ];

  const handleMenuClick = (id) => {
    setActiveMenu(id);
    onNavChange(id);
  };

  return (
    <div className={`${isExpanded ? 'w-64' : 'w-20'} bg-gradient-to-b from-blue-600 to-blue-700 dark:from-gray-800 dark:to-gray-900 text-white h-screen transition-all duration-300 fixed left-0 top-0 overflow-y-auto shadow-xl flex flex-col`}>
      {/* Logo */}
      <div className="p-4 border-b border-blue-500 dark:border-gray-600 flex items-center justify-between">
        <div className={`flex items-center gap-2 ${!isExpanded && 'justify-center w-full'}`}>
          <div className="text-2xl">🏢</div>
          {isExpanded && <span className="font-bold text-lg">HR Portal</span>}
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1 hover:bg-blue-500 dark:hover:bg-gray-700 rounded transition-colors"
        >
          {isExpanded ? '◀' : '▶'}
        </button>
      </div>

      {/* Menu Items */}
      <nav className="p-4 flex-1">
        {menuItems.map(item => (
          <button
            key={item.id}
            onClick={() => handleMenuClick(item.id)}
            className={`w-full text-left px-4 py-3 my-1 rounded-lg transition-all flex items-center gap-3 ${
              activeMenu === item.id
                ? 'bg-blue-700 dark:bg-gray-700 font-semibold shadow-md'
                : 'hover:bg-blue-500 dark:hover:bg-gray-700'
            } ${!isExpanded && 'px-3 justify-center'}`}
            title={!isExpanded ? item.label : ''}
          >
            <span className="text-xl">{item.icon}</span>
            {isExpanded && <span>{item.label}</span>}
          </button>
        ))}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-blue-500 dark:border-gray-600 bg-blue-700 dark:bg-gray-800">
        <div className={`flex items-center gap-3 ${!isExpanded && 'justify-center'}`}>
          <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center font-bold">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          {isExpanded && (
            <div className="text-sm">
              <p className="font-semibold truncate">{user?.name}</p>
              <p className="text-blue-200 text-xs">Employee ID: {user?.employeeId}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
