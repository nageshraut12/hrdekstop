import React, { createContext, useState, useCallback, useEffect } from 'react';

export const DataContext = createContext();

// Sample data for initial state
const SAMPLE_EMPLOYEES = [
  {
    _id: '1',
    name: 'John Smith',
    email: 'john.smith@company.com',
    position: 'Software Engineer',
    department: 'IT',
    salary: 85000,
    status: 'Active',
    phone: '+1-555-0101',
    joinDate: '2022-01-15'
  },
  {
    _id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    position: 'Product Manager',
    department: 'Product',
    salary: 95000,
    status: 'Active',
    phone: '+1-555-0102',
    joinDate: '2021-06-20'
  },
  {
    _id: '3',
    name: 'Mike Davis',
    email: 'mike.davis@company.com',
    position: 'HR Manager',
    department: 'HR',
    salary: 75000,
    status: 'On Leave',
    phone: '+1-555-0103',
    joinDate: '2020-03-10'
  },
  {
    _id: '4',
    name: 'Emily Chen',
    email: 'emily.chen@company.com',
    position: 'UX Designer',
    department: 'Design',
    salary: 80000,
    status: 'Active',
    phone: '+1-555-0104',
    joinDate: '2022-09-01'
  },
  {
    _id: '5',
    name: 'Robert Wilson',
    email: 'robert.wilson@company.com',
    position: 'Finance Manager',
    department: 'Finance',
    salary: 90000,
    status: 'Active',
    phone: '+1-555-0105',
    joinDate: '2021-02-15'
  }
];

export const DataProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [payroll, setPayroll] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({
    totalEmployees: 50,
    presentToday: 45,
    onLeave: 3,
    absent: 2
  });
  const [attendanceChart, setAttendanceChart] = useState([
    { day: 'Mon', present: 48, absent: 2 },
    { day: 'Tue', present: 47, absent: 3 },
    { day: 'Wed', present: 49, absent: 1 },
    { day: 'Thu', present: 46, absent: 4 },
    { day: 'Fri', present: 45, absent: 5 },
    { day: 'Sat', present: 20, absent: 30 },
    { day: 'Sun', present: 10, absent: 40 }
  ]);
  const [employeeDistribution, setEmployeeDistribution] = useState([
    { name: 'IT', value: 15 },
    { name: 'HR', value: 8 },
    { name: 'Finance', value: 12 },
    { name: 'Design', value: 10 },
    { name: 'Product', value: 5 }
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize data from localStorage
  useEffect(() => {
    setLoading(true);
    try {
      const savedEmployees = localStorage.getItem('hrEmployees');
      const savedAttendance = localStorage.getItem('hrAttendance');
      const savedPayroll = localStorage.getItem('hrPayroll');
      const savedTasks = localStorage.getItem('hrTasks');

      if (savedEmployees) {
        setEmployees(JSON.parse(savedEmployees));
      } else {
        setEmployees(SAMPLE_EMPLOYEES);
        localStorage.setItem('hrEmployees', JSON.stringify(SAMPLE_EMPLOYEES));
      }

      if (savedAttendance) {
        setAttendance(JSON.parse(savedAttendance));
      }

      if (savedPayroll) {
        setPayroll(JSON.parse(savedPayroll));
      }

      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      }

      setError(null);
    } catch (err) {
      setError('Failed to load data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Employees
  const fetchEmployees = useCallback(() => {
    setLoading(true);
    try {
      const saved = localStorage.getItem('hrEmployees');
      const data = saved ? JSON.parse(saved) : SAMPLE_EMPLOYEES;
      setEmployees(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch employees');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const addEmployee = useCallback((data) => {
    try {
      const newEmployee = {
        _id: Date.now().toString(),
        ...data
      };
      const updated = [...employees, newEmployee];
      setEmployees(updated);
      localStorage.setItem('hrEmployees', JSON.stringify(updated));
      setError(null);
      return newEmployee;
    } catch (err) {
      setError('Failed to create employee');
      throw err;
    }
  }, [employees]);

  const updateEmployee = useCallback((id, data) => {
    try {
      const updated = employees.map(emp => emp._id === id ? { ...emp, ...data } : emp);
      setEmployees(updated);
      localStorage.setItem('hrEmployees', JSON.stringify(updated));
      setError(null);
      return updated.find(e => e._id === id);
    } catch (err) {
      setError('Failed to update employee');
      throw err;
    }
  }, [employees]);

  // Attendance
  const fetchAttendance = useCallback(() => {
    setLoading(true);
    try {
      const saved = localStorage.getItem('hrAttendance');
      const data = saved ? JSON.parse(saved) : [];
      setAttendance(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch attendance');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const addAttendance = useCallback((data) => {
    try {
      const newRecord = {
        _id: Date.now().toString(),
        ...data,
        createdAt: new Date().toISOString()
      };
      const updated = [...attendance, newRecord];
      setAttendance(updated);
      localStorage.setItem('hrAttendance', JSON.stringify(updated));
      setError(null);
      return newRecord;
    } catch (err) {
      setError('Failed to create attendance record');
      throw err;
    }
  }, [attendance]);

  // Dashboard
  const fetchDashboardData = useCallback(() => {
    setLoading(true);
    try {
      setStats({
        totalEmployees: employees.length,
        presentToday: Math.floor(employees.length * 0.9),
        onLeave: Math.floor(employees.length * 0.05),
        absent: Math.floor(employees.length * 0.05)
      });
      setError(null);
    } catch (err) {
      setError('Failed to fetch dashboard data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [employees]);

  // Tasks
  const fetchTasks = useCallback(() => {
    setLoading(true);
    try {
      const saved = localStorage.getItem('hrTasks');
      const data = saved ? JSON.parse(saved) : [];
      setTasks(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch tasks');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const addTask = useCallback((data) => {
    try {
      const newTask = {
        _id: Date.now().toString(),
        ...data,
        createdAt: new Date().toISOString()
      };
      const updated = [...tasks, newTask];
      setTasks(updated);
      localStorage.setItem('hrTasks', JSON.stringify(updated));
      setError(null);
      return newTask;
    } catch (err) {
      setError('Failed to create task');
      throw err;
    }
  }, [tasks]);

  const updateTask = useCallback((id, data) => {
    try {
      const updated = tasks.map(task => task._id === id ? { ...task, ...data } : task);
      setTasks(updated);
      localStorage.setItem('hrTasks', JSON.stringify(updated));
      setError(null);
      return updated.find(t => t._id === id);
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
