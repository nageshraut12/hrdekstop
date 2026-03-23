const express = require('express');
const router = express.Router();
const DataStore = require('../dataStore');

// Get all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = DataStore.getAllTasks();
    // Add employee names for display
    const employees = DataStore.getAllEmployees();
    const tasksWithNames = tasks.map(task => {
      const employee = employees.find(emp => emp._id === task.assignedTo);
      return {
        ...task,
        assignedToName: employee ? employee.name : 'Unknown'
      };
    });
    res.json(tasksWithNames);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create task
router.post('/', async (req, res) => {
  try {
    const newTask = DataStore.createTask(req.body);
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update task
router.put('/:id', async (req, res) => {
  try {
    const task = DataStore.updateTask(req.params.id, req.body);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete task
router.delete('/:id', async (req, res) => {
  try {
    const task = DataStore.deleteTask(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
