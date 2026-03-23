const DataStore = require('../dataStore');

exports.getDashboardStats = async (req, res) => {
  try {
    const stats = DataStore.getDashboardStats();
    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAttendanceChart = async (req, res) => {
  try {
    // Mock attendance data for now
    const chartData = [
      { name: 'Present', value: 85 },
      { name: 'Absent', value: 12 },
      { name: 'Late', value: 8 }
    ];
    res.json(chartData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getEmployeeDistribution = async (req, res) => {
  try {
    const departmentStats = DataStore.getDepartmentStats();
    res.json(departmentStats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
