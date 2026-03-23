const mongoose = require('mongoose');
require('dotenv').config();

const Employee = require('../models/Employee');
const Attendance = require('../models/Attendance');
const Task = require('../models/Task');

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/smarthro');
    console.log('✓ Connected to MongoDB');

    // Clear existing data
    await Employee.deleteMany({});
    await Attendance.deleteMany({});
    await Task.deleteMany({});
    console.log('✓ Cleared existing data');

    // Sample employees
    const employees = await Employee.insertMany([
      {
        name: 'John Smith',
        email: 'john.smith@company.com',
        position: 'Software Engineer',
        department: 'IT',
        salary: 60000,
        status: 'Active',
        joinDate: '2022-01-15',
        manager: 'Sarah Johnson',
        city: 'New York',
        state: 'NY'
      },
      {
        name: 'Sarah Johnson',
        email: 'sarah.johnson@company.com',
        position: 'IT Manager',
        department: 'IT',
        salary: 80000,
        status: 'Active',
        joinDate: '2021-03-20',
        manager: 'CEO',
        city: 'New York',
        state: 'NY'
      },
      {
        name: 'Emily Brown',
        email: 'emily.brown@company.com',
        position: 'HR Specialist',
        department: 'Human Resources',
        salary: 55000,
        status: 'Active',
        joinDate: '2021-06-10',
        manager: 'CEO',
        city: 'Los Angeles',
        state: 'CA'
      },
      {
        name: 'Michael Davis',
        email: 'michael.davis@company.com',
        position: 'Accountant',
        department: 'Finance',
        salary: 65000,
        status: 'Active',
        joinDate: '2021-09-05',
        manager: 'Finance Director',
        city: 'Chicago',
        state: 'IL'
      },
      {
        name: 'Jessica Wilson',
        email: 'jessica.wilson@company.com',
        position: 'Sales Representative',
        department: 'Sales',
        salary: 50000,
        status: 'On Leave',
        joinDate: '2022-02-14',
        manager: 'Sales Director',
        city: 'Houston',
        state: 'TX'
      },
      {
        name: 'Robert Taylor',
        email: 'robert.taylor@company.com',
        position: 'Product Manager',
        department: 'Product',
        salary: 75000,
        status: 'Active',
        joinDate: '2020-11-01',
        manager: 'CEO',
        city: 'Seattle',
        state: 'WA'
      },
      {
        name: 'Lisa Anderson',
        email: 'lisa.anderson@company.com',
        position: 'Marketing Manager',
        department: 'Marketing',
        salary: 70000,
        status: 'Active',
        joinDate: '2019-07-22',
        manager: 'CEO',
        city: 'Boston',
        state: 'MA'
      },
      {
        name: 'James Martin',
        email: 'james.martin@company.com',
        position: 'Senior Developer',
        department: 'IT',
        salary: 85000,
        status: 'Active',
        joinDate: '2018-05-10',
        manager: 'Sarah Johnson',
        city: 'San Francisco',
        state: 'CA'
      }
    ]);
    console.log(`✓ Seeded ${employees.length} employees`);

    // Sample attendance records
    const today = new Date();
    const attendanceRecords = [];
    
    employees.forEach(emp => {
      for (let i = 0; i < 20; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        
        const statuses = ['Present', 'Present', 'Present', 'Absent', 'Leave', 'Half Day'];
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        
        attendanceRecords.push({
          employeeId: emp._id,
          date: date,
          status: status,
          checkInTime: status === 'Present' ? '09:00' : null,
          checkOutTime: status === 'Present' ? '17:30' : null,
          hoursWorked: status === 'Present' ? 8 : (status === 'Half Day' ? 4 : 0)
        });
      }
    });

    await Attendance.insertMany(attendanceRecords);
    console.log(`✓ Seeded ${attendanceRecords.length} attendance records`);

    // Sample tasks
    const tasks = await Task.insertMany([
      {
        title: 'Implement User Authentication',
        description: 'Add JWT-based authentication to the application',
        assignedTo: employees[0]._id,
        assignedBy: 'Sarah Johnson',
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        status: 'In Progress',
        priority: 'High'
      },
      {
        title: 'Design New Dashboard UI',
        description: 'Create mockups and design the new dashboard interface',
        assignedTo: employees[1]._id,
        assignedBy: 'CEO',
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        status: 'Pending',
        priority: 'Medium'
      },
      {
        title: 'Conduct Annual Performance Review',
        description: 'Complete annual reviews for all team members',
        assignedTo: employees[2]._id,
        assignedBy: 'CEO',
        dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        status: 'Overdue',
        priority: 'High'
      },
      {
        title: 'Prepare Q1 Financial Report',
        description: 'Compile and prepare quarterly financial statements',
        assignedTo: employees[3]._id,
        assignedBy: 'Finance Director',
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        status: 'In Progress',
        priority: 'High'
      },
      {
        title: 'Update Product Documentation',
        description: 'Update and review all product documentation',
        assignedTo: employees[5]._id,
        assignedBy: 'CEO',
        dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        status: 'Pending',
        priority: 'Low'
      },
      {
        title: 'Launch Marketing Campaign',
        description: 'Prepare and launch Q2 marketing campaign',
        assignedTo: employees[6]._id,
        assignedBy: 'CEO',
        dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
        status: 'In Progress',
        priority: 'Medium'
      },
      {
        title: 'Code Review Sprint',
        description: 'Review all pull requests for the current sprint',
        assignedTo: employees[7]._id,
        assignedBy: 'Sarah Johnson',
        dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        status: 'In Progress',
        priority: 'High'
      },
      {
        title: 'Team Building Event',
        description: 'Organize and arrange team building event',
        assignedTo: employees[2]._id,
        assignedBy: 'CEO',
        dueDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
        status: 'Pending',
        priority: 'Medium'
      }
    ]);
    console.log(`✓ Seeded ${tasks.length} tasks`);

    console.log('\n✅ Database seeding completed successfully!');
    console.log('\nSample Data Added:');
    console.log(`  - ${employees.length} employees`);
    console.log(`  - ${attendanceRecords.length} attendance records`);
    console.log(`  - ${tasks.length} tasks`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
