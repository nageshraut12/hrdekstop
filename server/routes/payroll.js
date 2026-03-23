const express = require('express');
const router = express.Router();

// Mock payroll data
const mockPayroll = [
  { _id: '1', employeeId: '1', employeeName: 'John Doe', month: 'January 2024', basicSalary: 75000, allowances: 5000, deductions: 2000, netSalary: 78000, status: 'paid' },
  { _id: '2', employeeId: '2', employeeName: 'Jane Smith', month: 'January 2024', basicSalary: 95000, allowances: 7000, deductions: 3000, netSalary: 99000, status: 'paid' },
  { _id: '3', employeeId: '3', employeeName: 'Mike Johnson', month: 'January 2024', basicSalary: 65000, allowances: 4000, deductions: 1500, netSalary: 67500, status: 'pending' },
];

// Get all payroll
router.get('/', async (req, res) => {
  try {
    res.json(mockPayroll);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get payroll by employee
router.get('/employee/:id', async (req, res) => {
  try {
    const payroll = mockPayroll.filter(p => p.employeeId === req.params.id);
    res.json(payroll);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create payroll
router.post('/', async (req, res) => {
  try {
    const newPayroll = {
      _id: (mockPayroll.length + 1).toString(),
      ...req.body,
      netSalary: (req.body.basicSalary || 0) + (req.body.allowances || 0) - (req.body.deductions || 0),
      status: req.body.status || 'pending'
    };
    mockPayroll.push(newPayroll);
    res.status(201).json(newPayroll);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
