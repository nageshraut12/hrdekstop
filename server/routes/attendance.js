const express = require('express');
const router = express.Router();

// Mock attendance data
const mockAttendance = [
  { _id: '1', employeeId: '1', employeeName: 'John Doe', date: '2024-01-15', status: 'present', checkIn: '09:00', checkOut: '17:00' },
  { _id: '2', employeeId: '2', employeeName: 'Jane Smith', date: '2024-01-15', status: 'present', checkIn: '08:45', checkOut: '17:15' },
  { _id: '3', employeeId: '3', employeeName: 'Mike Johnson', date: '2024-01-15', status: 'late', checkIn: '09:30', checkOut: '17:30' },
  { _id: '4', employeeId: '1', employeeName: 'John Doe', date: '2024-01-14', status: 'present', checkIn: '08:50', checkOut: '17:10' },
  { _id: '5', employeeId: '2', employeeName: 'Jane Smith', date: '2024-01-14', status: 'absent', checkIn: null, checkOut: null },
];

// Get all attendance
router.get('/', async (req, res) => {
  try {
    res.json(mockAttendance);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get attendance by employee
router.get('/employee/:id', async (req, res) => {
  try {
    const attendance = mockAttendance.filter(att => att.employeeId === req.params.id);
    res.json(attendance);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create attendance
router.post('/', async (req, res) => {
  try {
    const newAttendance = {
      _id: (mockAttendance.length + 1).toString(),
      ...req.body,
      date: req.body.date || new Date().toISOString().split('T')[0]
    };
    mockAttendance.push(newAttendance);
    res.status(201).json(newAttendance);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
