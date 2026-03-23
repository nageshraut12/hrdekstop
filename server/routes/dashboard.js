const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

router.get('/stats', dashboardController.getDashboardStats);
router.get('/attendance-chart', dashboardController.getAttendanceChart);
router.get('/employee-distribution', dashboardController.getEmployeeDistribution);

module.exports = router;
