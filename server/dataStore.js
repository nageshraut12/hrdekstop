// In-memory data store for development
let employees = [
  {
    _id: '1',
    name: 'John Doe',
    email: 'john.doe@company.com',
    position: 'Software Engineer',
    department: 'Engineering',
    salary: 75000,
    status: 'active',
    hireDate: '2023-01-15',
    phone: '+1-555-0123',
    address: '123 Main St, City, State',
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2023-01-15')
  },
  {
    _id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@company.com',
    position: 'Product Manager',
    department: 'Product',
    salary: 95000,
    status: 'active',
    hireDate: '2023-02-01',
    phone: '+1-555-0124',
    address: '456 Oak Ave, City, State',
    createdAt: new Date('2023-02-01'),
    updatedAt: new Date('2023-02-01')
  },
  {
    _id: '3',
    name: 'Mike Johnson',
    email: 'mike.johnson@company.com',
    position: 'Designer',
    department: 'Design',
    salary: 65000,
    status: 'active',
    hireDate: '2023-03-10',
    phone: '+1-555-0125',
    address: '789 Pine Rd, City, State',
    createdAt: new Date('2023-03-10'),
    updatedAt: new Date('2023-03-10')
  }
];

let attendanceRecords = [];
let payrollRecords = [];
let tasks = [
  {
    _id: '1',
    title: 'Complete project documentation',
    description: 'Write comprehensive documentation for the new feature',
    assignedTo: '1',
    priority: 'high',
    status: 'pending',
    dueDate: '2024-01-15',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '2',
    title: 'Review code changes',
    description: 'Review pull request #123 for the authentication module',
    assignedTo: '2',
    priority: 'medium',
    status: 'in-progress',
    dueDate: '2024-01-12',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

class DataStore {
  // Employee operations
  static getAllEmployees() {
    return employees;
  }

  static getEmployeeById(id) {
    return employees.find(emp => emp._id === id);
  }

  static createEmployee(employeeData) {
    const newEmployee = {
      _id: (employees.length + 1).toString(),
      ...employeeData,
      status: employeeData.status || 'active',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    employees.push(newEmployee);
    return newEmployee;
  }

  static updateEmployee(id, updateData) {
    const index = employees.findIndex(emp => emp._id === id);
    if (index === -1) return null;

    employees[index] = {
      ...employees[index],
      ...updateData,
      updatedAt: new Date()
    };
    return employees[index];
  }

  static deleteEmployee(id) {
    const index = employees.findIndex(emp => emp._id === id);
    if (index === -1) return null;

    const deletedEmployee = employees[index];
    employees.splice(index, 1);
    return deletedEmployee;
  }

  // Task operations
  static getAllTasks() {
    return tasks;
  }

  static createTask(taskData) {
    const newTask = {
      _id: (tasks.length + 1).toString(),
      ...taskData,
      status: taskData.status || 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    tasks.push(newTask);
    return newTask;
  }

  static updateTask(id, updateData) {
    const index = tasks.findIndex(task => task._id === id);
    if (index === -1) return null;

    tasks[index] = {
      ...tasks[index],
      ...updateData,
      updatedAt: new Date()
    };
    return tasks[index];
  }

  static deleteTask(id) {
    const index = tasks.findIndex(task => task._id === id);
    if (index === -1) return null;

    const deletedTask = tasks[index];
    tasks.splice(index, 1);
    return deletedTask;
  }

  // Dashboard stats
  static getDashboardStats() {
    const totalEmployees = employees.length;
    const activeEmployees = employees.filter(emp => emp.status === 'active').length;
    const totalSalary = employees.reduce((sum, emp) => sum + (emp.salary || 0), 0);
    const pendingTasks = tasks.filter(task => task.status === 'pending').length;

    return {
      totalEmployees,
      activeEmployees,
      totalSalary,
      pendingTasks,
      departmentStats: this.getDepartmentStats(),
      recentHires: employees.slice(-3).reverse()
    };
  }

  static getDepartmentStats() {
    const departments = {};
    employees.forEach(emp => {
      if (!departments[emp.department]) {
        departments[emp.department] = 0;
      }
      departments[emp.department]++;
    });
    return Object.entries(departments).map(([name, count]) => ({ name, count }));
  }
}

module.exports = DataStore;