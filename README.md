# SmartHRO - HR Management System

A comprehensive full-stack HR management dashboard built with React, Node.js, and MongoDB.

**🚀 [Quick Start in 5 minutes](./GETTING_STARTED.md) | 📖 [Detailed Setup](./GETTING_STARTED.md) | 🌐 [Deploy to Production](./DEPLOYMENT.md) | 🐳 [Docker Setup](./DOCKER.md)**

## Features

✨ **Dashboard Overview**
- Real-time employee statistics
- Attendance charts and graphs
- Quick stats and activities feed
- Interactive visualizations

👥 **Employee Management**
- Add, edit, and delete employees
- Track employee status (Active, Inactive, On Leave)
- Manage employee details and positions
- Filter by department

📅 **Attendance Tracking**
- Mark attendance records
- Track check-in/check-out times
- View attendance history
- Filter by employee and date

💰 **Payroll Management**
- Process monthly payroll
- Calculate net salary with bonuses and deductions
- Track payment status
- Monthly payroll reports

✓ **Task Management**
- Create and assign tasks
- Track task status
- Priority levels (Low, Medium, High)
- Due date management

📊 **Reports** *(Coming Soon)*
- Generate various HR reports
- Export data capabilities

## Tech Stack

### Frontend
- **React** - UI library
- **Tailwind CSS** - Styling
- **Recharts** - Data visualization
- **Axios** - HTTP client
- **React Router** - Navigation

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication (ready for implementation)

## Project Structure

```
hr-fullstack/
├── client/                 # React frontend
│   ├── public/            # Static files
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── context/       # Context API
│   │   ├── utils/         # API calls
│   │   └── App.js         # Main app
│   └── package.json
├── server/                # Node.js backend
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── controllers/      # Business logic
│   ├── middleware/       # Custom middleware
│   ├── server.js         # Entry point
│   └── package.json
├── package.json          # Root package.json
├── Procfile              # Heroku deployment
└── vercel.json          # Vercel deployment
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd hr-fullstack
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Set up environment variables**

   Create `.env` file in the `server` directory:
   ```
   MONGODB_URI=mongodb://localhost:27017/smarthro
   PORT=5000
   JWT_SECRET=your_jwt_secret_key_here
   NODE_ENV=development
   ```

4. **Start MongoDB**
   ```bash
   mongod
   ```

5. **Start the development servers**
   ```bash
   npm run dev
   ```

   Or run separately:
   - **Backend**: `npm run server` (runs on http://localhost:5000)
   - **Frontend**: `npm run client` (runs on http://localhost:3000)

## API Endpoints

### Employees
- `GET /api/employees` - Get all employees
- `GET /api/employees/:id` - Get single employee
- `POST /api/employees` - Create employee
- `PUT /api/employees/:id` - Update employee
- `DELETE /api/employees/:id` - Delete employee

### Attendance
- `GET /api/attendance` - Get all attendance records
- `GET /api/attendance/employee/:id` - Get employee attendance
- `POST /api/attendance` - Mark attendance
- `PUT /api/attendance/:id` - Update attendance

### Payroll
- `GET /api/payroll` - Get all payroll
- `GET /api/payroll/employee/:id` - Get employee payroll
- `POST /api/payroll` - Process payroll
- `PUT /api/payroll/:id` - Update payroll

### Tasks
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Dashboard
- `GET /api/dashboard/stats` - Dashboard statistics
- `GET /api/dashboard/attendance-chart` - Attendance chart data
- `GET /api/dashboard/employee-distribution` - Employee distribution

## Deployment

### Heroku Deployment (Backend)

1. Create Heroku account and install CLI
2. Login to Heroku:
   ```bash
   heroku login
   ```
3. Create app:
   ```bash
   heroku create your-app-name
   ```
4. Configure MongoDB Atlas and set environment variables:
   ```bash
   heroku config:set MONGODB_URI=your_mongodb_uri
   heroku config:set JWT_SECRET=your_secret_key
   ```
5. Deploy:
   ```bash
   git push heroku main
   ```

### Vercel Deployment (Frontend)

1. Create Vercel account and install CLI
2. Navigate to client directory:
   ```bash
   cd client
   ```
3. Deploy:
   ```bash
   vercel
   ```
4. Set environment variable for API URL in Vercel dashboard

## Usage

1. **Login/Setup** - Create your admin account
2. **Add Employees** - Use the Employees page to add staff
3. **Mark Attendance** - Track daily attendance
4. **Process Payroll** - Calculate and process monthly payroll
5. **Manage Tasks** - Create and assign tasks to employees
6. **View Reports** - Monitor performance through the dashboard

## Key Features Usage

### Adding an Employee
1. Go to Employees page
2. Click "Add Employee" button
3. Fill in employee details
4. Click Save

### Marking Attendance
1. Go to Attendance page
2. Click "Mark Attendance"
3. Select employee and date
4. Choose status (Present/Absent/Leave/Half Day)
5. Add check-in/out times (optional)
6. Save

### Processing Payroll
1. Go to Payroll page
2. Click "Process Payroll"
3. Select employee and month
4. Enter salary details
5. Select payment status
6. Save

### Creating Tasks
1. Go to Tasks page
2. Click "Create Task"
3. Fill in task details
4. Assign to employee
5. Set priority and due date
6. Save

## Future Enhancements

- [ ] User authentication and login
- [ ] Role-based access control
- [ ] Leave management system
- [ ] Performance reviews
- [ ] Advanced reporting
- [ ] Email notifications
- [ ] Mobile application
- [ ] Document management

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check MONGODB_URI in .env file
- Verify connection string format

### Port Already in Use
- Change PORT in .env file
- Or kill process using the port

### CORS Issues
- Check that frontend URL is allowed in backend CORS configuration
- Verify API_URL in frontend .env

## Support

For issues and questions, please create an issue in the repository.

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Author

Created with ❤️ for HR teams worldwide.

---

**Happy HR Managing! 🚀**
