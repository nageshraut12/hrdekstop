const DataStore = require('../dataStore');

// Get all employees
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = DataStore.getAllEmployees();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single employee
exports.getEmployee = async (req, res) => {
  try {
    const employee = DataStore.getEmployeeById(req.params.id);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.json(employee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create employee
exports.createEmployee = async (req, res) => {
  try {
    const newEmployee = DataStore.createEmployee(req.body);
    res.status(201).json(newEmployee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update employee
exports.updateEmployee = async (req, res) => {
  try {
    const employee = DataStore.updateEmployee(req.params.id, req.body);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.json(employee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete employee
exports.deleteEmployee = async (req, res) => {
  try {
    const employee = DataStore.deleteEmployee(req.params.id);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.json({ message: 'Employee deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get employees by status
exports.getEmployeesByStatus = async (req, res) => {
  try {
    const employees = DataStore.getAllEmployees();
    const filteredEmployees = employees.filter(emp => emp.status === req.params.status);
    res.json(filteredEmployees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
