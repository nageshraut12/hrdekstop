import React, { createContext, useState, useCallback } from 'react';
import { employeeAPI, attendanceAPI, payrollAPI, taskAPI, dashboardAPI } from '../utils/api';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [payroll, setPayroll] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({});
  const [attendanceChart, setAttendanceChart] = useState([]);
  const [employeeDistribution, setEmployeeDistribution] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Employees
  const fetchEmployees = useCallback(async () => {
    setLoading(true);
    try {
      const response = await employeeAPI.getAll();
      setEmployees(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch employees');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const addEmployee = useCallback(async (data) => {
    try {
      const response = await employeeAPI.create(data);
      setEmployees([...employees, response.data]);
      setError(null);
      return response.data;
    } catch (err) {
      setError('Failed to create employee');
      throw err;
    }
  }, [employees]);

  const updateEmployee = useCallback(async (id, data) => {
    try {
      const response = await employeeAPI.update(id, data);
      setEmployees(employees.map(emp => emp._id === id ? response.data : emp));
      setError(null);
      return response.data;
    } catch (err) {
      setError('Failed to update employee');
      throw err;
    }
  }, [employees]);

  // Attendance
  const fetchAttendance = useCallback(async () => {
    setLoading(true);
    try {
      const response = await attendanceAPI.getAll();
      setAttendance(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch attendance');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const addAttendance = useCallback(async (data) => {
    try {
      const response = await attendanceAPI.create(data);
      setAttendance([...attendance, response.data]);
      setError(null);
      return response.data;
    } catch (err) {
      setError('Failed to create attendance record');
      throw err;
    }
  }, [attendance]);

  // Dashboard
  const fetchDashboardData = useCallback(async () => {
    setLoading(true);
    try {
      const [statsRes, chartRes, distRes] = await Promise.all([
        dashboardAPI.getStats(),
        dashboardAPI.getAttendanceChart(),
        dashboardAPI.getEmployeeDistribution()
      ]);
      setStats(statsRes.data);
      setAttendanceChart(chartRes.data);
      setEmployeeDistribution(distRes.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch dashboard data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Tasks
  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await taskAPI.getAll();
      setTasks(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch tasks');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const addTask = useCallback(async (data) => {
    try {
      const response = await taskAPI.create(data);
      setTasks([...tasks, response.data]);
      setError(null);
      return response.data;
    } catch (err) {
      setError('Failed to create task');
      throw err;
    }
  }, [tasks]);

  const updateTask = useCallback(async (id, data) => {
    try {
      const response = await taskAPI.update(id, data);
      setTasks(tasks.map(task => task._id === id ? response.data : task));
      setError(null);
      return response.data;
    } catch (err) {
      setError('Failed to update task');
      throw err;
    }
  }, [tasks]);

  const value = {
    employees,
    attendance,
    payroll,
    tasks,
    stats,
    attendanceChart,
    employeeDistribution,
    loading,
    error,
    fetchEmployees,
    addEmployee,
    updateEmployee,
    fetchAttendance,
    addAttendance,
    fetchDashboardData,
    fetchTasks,
    addTask,
    updateTask
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
