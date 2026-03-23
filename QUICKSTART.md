# Quick Start Guide - SmartHRO

Get your SmartHRO HR Management System up and running in minutes!

## ⚡ Quick Setup (5 minutes)

### 1. Prerequisites

- Node.js v14+ ([Download](https://nodejs.org))
- MongoDB ([Local](https://docs.mongodb.com/manual/installation/) or [Atlas Cloud](https://www.mongodb.com/cloud/atlas))

### 2. Install ALL Dependencies

```bash
cd "C:\Users\swaru\OneDrive\Desktop\hr fullstack"
npm run install-all
```

This will install:
- Root dependencies (concurrently)
- Server dependencies (Express, MongoDB, etc.)
- Client dependencies (React, Tailwind, Recharts, etc.)

### 3. Configure Environment

#### Backend Setup
```bash
cd server
# Copy example to actual .env
copy .env.example .env

# Edit .env with your settings
# For LOCAL development:
# MONGODB_URI=mongodb://localhost:27017/smarthro
# PORT=5000
# NODE_ENV=development
```

#### Frontend Setup
```bash
cd ../client
# Copy example to actual .env
copy .env.example .env

# Default is already configured for local development
# REACT_APP_API_URL=http://localhost:5000/api
```

### 4. Start MongoDB (Local)

Open a new terminal:
```bash
mongod
```

**OR** Use MongoDB Atlas:
1. Create free account at mongodb.com/cloud/atlas
2. Copy connection string
3. Update `MONGODB_URI` in server/.env

### 5. Start Development Servers

```bash
# From root directory
npm run dev
```

This will start:
- **Backend**: http://localhost:5000 (API Server)
- **Frontend**: http://localhost:3000 (Web Application)

## 🎯 Default Credentials

**Admin User:**
- Email: admin@smarthro.com
- Password: admin123

*(Note: Authentication setup can be implemented next)*

## 📚 First Steps in the App

### 1. Add Some Test Employees

1. Go to **Employees** menu
2. Click **+ Add Employee**
3. Fill in the form:
   - Name: John Doe
   - Email: john@company.com
   - Position: Software Engineer
   - Department: IT
   - Salary: 50000
   - Status: Active
4. Click **Save**

### 2. Mark Attendance

1. Go to **Attendance** menu
2. Click **+ Mark Attendance**
3. Select employee, date, status
4. Click **Save**

### 3. Process Payroll

1. Go to **Payroll** menu
2. Click **+ Process Payroll**
3. Select employee and month
4. Enter salary details
5. Click **Save**

### 4. Assign Tasks

1. Go to **Tasks** menu
2. Click **+ Create Task**
3. Fill in task details
4. Assign to employee
5. Click **Save**

## 🚀 Available Commands

```bash
# From root directory

# Start development servers (both front & back)
npm run dev

# Start only backend
npm run server

# Start only frontend
npm run client

# Build for production
npm run build

# Install all dependencies
npm run install-all
```

## 📁 Project Structure Quick Reference

```
hr-fullstack/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/    # UI components (Sidebar, Header, etc.)
│   │   ├── pages/         # Page components (Dashboard, Employees, etc.)
│   │   ├── context/       # Data management (DataContext)
│   │   ├── utils/         # API calls (api.js)
│   │   └── App.js         # Main app component
│   └── package.json
│
├── server/                # Node.js Backend
│   ├── models/           # Database models (Employee, Attendance, etc.)
│   ├── routes/           # API routes
│   ├── controllers/      # Business logic
│   ├── server.js         # Entry point
│   └── package.json
│
└── README.md             # Full documentation
```

## 🔗 API Quick Reference

All API routes are prefixed with `/api`

**Employees:**
- GET `/employees` - Get all employees
- POST `/employees` - Create employee
- PUT `/employees/:id` - Update employee

**Attendance:**
- GET `/attendance` - Get all attendance records
- POST `/attendance` - Mark attendance

**Payroll:**
- GET `/payroll` - Get all payroll
- POST `/payroll` - Process payroll

**Tasks:**
- GET `/tasks` - Get all tasks
- POST `/tasks` - Create task

## ⚠️ Common Issues & Solutions

| Problem | Solution |
|---------|----------|
| **Port 5000 already in use** | Change PORT in server/.env or kill process using that port |
| **MongoDB connection error** | Ensure MongoDB is running or check MONGODB_URI |
| **API calls failing** | Verify REACT_APP_API_URL in client/.env |
| **Tailwind not applied** | Run `npm install` in client directory |

## 📚 Learn More

- **Full Documentation**: See [README.md](./README.md)
- **Deployment Guide**: See [DEPLOYMENT.md](./DEPLOYMENT.md)
- **React**: [react.dev](https://react.dev)
- **Tailwind CSS**: [tailwindcss.com](https://tailwindcss.com)
- **MongoDB**: [mongodb.com/docs](https://mongodb.com/docs)

## 🎓 Next Learning Steps

1. ✅ Get app running (you are here!)
2. 🔐 Add user authentication (JWT)
3. 📱 Improve responsive design
4. 📊 Add more charts/analytics
5. 🚀 Deploy to production

## 💬 Need Help?

- Check the [README.md](./README.md) for detailed documentation
- Review component code in `client/src/components/`
- Check API routes in `server/routes/`
- Create an issue in your repository

---

**You're all set! Happy developing! 🎉**
