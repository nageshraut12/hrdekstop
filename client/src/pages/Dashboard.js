import React, { useContext, useEffect } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { DataContext } from '../context/DataContext';
import { StatCard } from '../components/StatCard';

export const Dashboard = () => {
  const {
    stats,
    attendanceChart,
    employeeDistribution,
    fetchDashboardData,
    fetchEmployees,
    employees,
    loading
  } = useContext(DataContext);

  useEffect(() => {
    fetchDashboardData();
    fetchEmployees();
  }, [fetchDashboardData, fetchEmployees]);

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  const sampleAttendanceData = [
    { name: 'Mon', present: 240, absent: 22, leave: 18 },
    { name: 'Tue', present: 250, absent: 18, leave: 15 },
    { name: 'Wed', present: 235, absent: 25, leave: 20 },
    { name: 'Thu', present: 245, absent: 20, leave: 18 },
    { name: 'Fri', present: 238, absent: 28, leave: 20 },
  ];

  const activeEmployeeCount = employees.filter(e => e.status === 'Active').length;

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen">
      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Dashboard Overview
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg mt-2">
          Welcome back! Here's what's happening today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon="👥"
          label="Total Employees"
          value={employees.length}
          color="blue"
          bgGradient="from-blue-500 to-blue-600"
        />
        <StatCard
          icon="✓"
          label="Active Employees"
          value={activeEmployeeCount}
          color="green"
          bgGradient="from-green-500 to-emerald-600"
        />
        <StatCard
          icon="📝"
          label="Pending Tasks"
          value={stats.pendingTasks || 2}
          color="purple"
          bgGradient="from-purple-500 to-violet-600"
        />
        <StatCard
          icon="💰"
          label="Total Salary"
          value={`₹${(stats.totalSalary || 235000).toLocaleString()}`}
          color="orange"
          bgGradient="from-orange-500 to-red-500"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Attendance Overview - Bar Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg">
              <span className="text-white text-xl">📊</span>
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Weekly Attendance</h2>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={sampleAttendanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Legend />
              <Bar dataKey="present" stackId="a" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="absent" stackId="a" fill="#ef4444" radius={[4, 4, 0, 0]} />
              <Bar dataKey="leave" stackId="a" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Attendance Overview - Pie Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-gradient-to-r from-green-500 to-green-600 rounded-lg">
              <span className="text-white text-xl">📈</span>
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Attendance Status</h2>
          </div>
          {attendanceChart.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={attendanceChart}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {attendanceChart.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-300 flex items-center justify-center text-gray-400 dark:text-gray-500">
              <div className="text-center">
                <div className="text-4xl mb-2">📊</div>
                <p>No attendance data available</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Activities & Employee Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activities */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg">
              <span className="text-white text-xl">⚡</span>
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Activities</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg border border-green-200 dark:border-green-700">
              <div className="p-2 bg-green-500 rounded-full">
                <span className="text-white text-lg">✓</span>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900 dark:text-white">New Employee Joined</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">John Doe joined the team</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg border border-blue-200 dark:border-blue-700">
              <div className="p-2 bg-blue-500 rounded-full">
                <span className="text-white text-lg">💰</span>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900 dark:text-white">Salary Processed</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Monthly payroll completed</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Today</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-lg border border-orange-200 dark:border-orange-700">
              <div className="p-2 bg-orange-500 rounded-full">
                <span className="text-white text-lg">📋</span>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900 dark:text-white">Tasks Completed</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">5 tasks completed this week</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Yesterday</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-lg">
              <span className="text-white text-xl">📊</span>
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Quick Stats</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg border border-blue-200 dark:border-blue-700 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <span className="text-2xl">💰</span>
                <span className="font-medium text-gray-700 dark:text-gray-300">Total Payroll</span>
              </div>
              <span className="font-bold text-blue-600 dark:text-blue-400 text-lg">₹2.35L</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg border border-green-200 dark:border-green-700 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📅</span>
                <span className="font-medium text-gray-700 dark:text-gray-300">On Leave</span>
              </div>
              <span className="font-bold text-green-600 dark:text-green-400 text-lg">3</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg border border-purple-200 dark:border-purple-700 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <span className="text-2xl">👥</span>
                <span className="font-medium text-gray-700 dark:text-gray-300">New Hires</span>
              </div>
              <span className="font-bold text-purple-600 dark:text-purple-400 text-lg">2</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-lg border border-orange-200 dark:border-orange-700 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📈</span>
                <span className="font-medium text-gray-700 dark:text-gray-300">Retention Rate</span>
              </div>
              <span className="font-bold text-orange-600 dark:text-orange-400 text-lg">94%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
