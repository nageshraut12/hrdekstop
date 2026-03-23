# SmartHRO Installation & Getting Started

Welcome to SmartHRO - Your Complete HR Management System! 🎉

## What You Have

A complete, production-ready MERN (MongoDB, Express, React, Node.js) stack HR dashboard with:

✅ **Dashboard** - Real-time analytics & charts
✅ **Employee Management** - CRUD operations
✅ **Attendance Tracking** - Mark & view attendance
✅ **Payroll** - Process monthly salaries
✅ **Task Management** - Assign and track tasks
✅ **Professional UI** - Tailwind CSS & Recharts
✅ **Ready to Deploy** - Heroku & Vercel configs included

## Installation Methods

### Method 1: Local Development (Recommended)

#### Step 1: Prerequisites
- **Node.js** v14+ → https://nodejs.org
- **MongoDB** 
  - Option A: Local → https://docs.mongodb.com/manual/installation/
  - Option B: Cloud (Atlas) → https://www.mongodb.com/cloud/atlas (recommended)

#### Step 2: Install Dependencies

```bash
cd "C:\Users\swaru\OneDrive\Desktop\hr fullstack"
npm run install-all
```

**What this does:**
- Installs root dependencies (concurrently)
- Installs server dependencies (Express, Mongoose, etc.)
- Installs client dependencies (React, Recharts, Tailwind)

#### Step 3: Configure Environment Files

**Backend Configuration:**

```bash
cd server
```

Edit `.env` file:

**For Local MongoDB:**
```
MONGODB_URI=mongodb://localhost:27017/smarthro
PORT=5000
JWT_SECRET=your-secret-key-change-this
NODE_ENV=development
```

**For MongoDB Atlas (Cloud):**
```
MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/smarthro?retryWrites=true&w=majority
PORT=5000
JWT_SECRET=your-secret-key-change-this
NODE_ENV=development
```

**Frontend Configuration:**

```bash
cd ../client
```

The `.env` file is already set up for local development. No changes needed!

#### Step 4: Start MongoDB (if using local)

Open a **new terminal**:

```bash
mongod
```

Wait until you see: `Listening on port 27017`

#### Step 5: Start Development Servers

From the **root directory** (`hr fullstack`):

```bash
npm run dev
```

You should see:
```
✓ Server running on port 5000
✓ Compiled successfully!
✓ You can now view client in the browser.
```

**Open in browser:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api/health

---

### Method 2: Docker (One Command Setup)

#### Prerequisites
- Docker Desktop → https://www.docker.com/products/docker-desktop

#### Quick Start

```bash
cd "C:\Users\swaru\OneDrive\Desktop\hr fullstack"
docker-compose up
```

That's it! Everything will be running:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- MongoDB: http://localhost:27017

See [DOCKER.md](./DOCKER.md) for more info.

---

## First Time Use

### 1. Create Sample Data (Optional but Recommended)

In a terminal (from server directory):

```bash
cd server
npm run seed
```

This adds 8 sample employees, 160 attendance records, and 8 tasks.

### 2. Test the Application

**Add an Employee:**
1. Go to Menu → **Employees**
2. Click **+ Add Employee**
3. Fill in details:
   - Name: Test Employee
   - Email: test@company.com
   - Position: Engineer
   - Department: IT
   - Salary: 50000
4. Click **Save**

**Mark Attendance:**
1. Go to Menu → **Attendance**
2. Click **+ Mark Attendance**
3. Select the employee you just created
4. Choose today's date
5. Select "Present"
6. Click **Save**

**Process Payroll:**
1. Go to Menu → **Payroll**
2. Click **+ Process Payroll**
3. Select your test employee
4. Choose a month
5. Enter salary (auto-filled: 50000)
6. Click **Save**

**Create a Task:**
1. Go to Menu → **Tasks**
2. Click **+ Create Task**
3. Fill in:
   - Title: Test Task
   - Description: This is a test
   - Assign to: Your test employee
   - Priority: Medium
4. Click **Save**

**View the Dashboard:**
1. Go to Menu → **Dashboard**
2. See all your data visualized with charts!

---

## Folder Structure

```
hr-fullstack/
│
├── client/                           # React Frontend
│   ├── src/
│   │   ├── components/              # Reusable UI components
│   │   │   ├── Sidebar.js           # Navigation menu
│   │   │   ├── Header.js            # Top header
│   │   │   └── StatCard.js          # Stat cards
│   │   ├── pages/                   # Page components
│   │   │   ├── Dashboard.js         # Main dashboard
│   │   │   ├── Employees.js         # Employee management
│   │   │   ├── Attendance.js        # Attendance tracking
│   │   │   ├── Payroll.js           # Payroll management
│   │   │   ├── Tasks.js             # Task management
│   │   │   └── Reports.js           # Reports (coming soon)
│   │   ├── context/
│   │   │   └── DataContext.js       # Global state management
│   │   ├── utils/
│   │   │   └── api.js               # API calls
│   │   ├── App.js                   # Main app component
│   │   └── index.js                 # Entry point
│   └── package.json
│
├── server/                           # Node.js Backend
│   ├── models/                      # Database schemas
│   │   ├── Employee.js
│   │   ├── Attendance.js
│   │   ├── Payroll.js
│   │   └── Task.js
│   ├── routes/                      # API endpoints
│   │   ├── employees.js
│   │   ├── attendance.js
│   │   ├── payroll.js
│   │   ├── tasks.js
│   │   └── dashboard.js
│   ├── controllers/
│   │   ├── employeeController.js
│   │   └── dashboardController.js
│   ├── server.js                    # Entry point
│   ├── seed.js                      # Sample data script
│   └── package.json
│
├── Documentation/
│   ├── README.md                    # Full API & project docs
│   ├── QUICKSTART.md               # 5-minute quick start
│   ├── DEPLOYMENT.md               # Deploy to Heroku/Vercel
│   └── DOCKER.md                   # Docker setup guide
│
└── Configuration/
    ├── package.json                 # Root dependencies (concurrently)
    ├── Procfile                    # Heroku deployment
    ├── vercel.json                 # Vercel deployment
    ├── docker-compose.yml          # Docker Compose
    └── Dockerfile                  # Docker image
```

---

## API Endpoints

All endpoints are prefixed with `/api`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/employees` | Get all employees |
| POST | `/employees` | Create employee |
| PUT | `/employees/:id` | Update employee |
| DELETE | `/employees/:id` | Delete employee |
| GET | `/attendance` | Get all attendance |
| POST | `/attendance` | Mark attendance |
| PUT | `/attendance/:id` | Update attendance |
| GET | `/payroll` | Get all payroll |
| POST | `/payroll` | Process payroll |
| PUT | `/payroll/:id` | Update payroll |
| GET | `/tasks` | Get all tasks |
| POST | `/tasks` | Create task |
| PUT | `/tasks/:id` | Update task |
| DELETE | `/tasks/:id` | Delete task |
| GET | `/dashboard/stats` | Get dashboard stats |
| GET | `/dashboard/attendance-chart` | Attendance data |
| GET | `/dashboard/employee-distribution` | Employee distribution |

---

## Available Commands

From the **root directory**:

```bash
# Start both frontend and backend
npm run dev

# Start only backend
npm run server

# Start only frontend
npm run client

# Build for production
npm run build

# Install all dependencies
npm run install-all

# Seed database with sample data (from server directory)
npm run seed
```

---

## Deployment

### Deploy Backend (to Heroku)

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

Quick summary:
```bash
# Install Heroku CLI
heroku login
heroku create your-app-name
heroku config:set MONGODB_URI=your-mongodb-uri
git push heroku main
```

### Deploy Frontend (to Vercel)

```bash
cd client
vercel
vercel --prod
```

Or push to GitHub and Vercel auto-deploys!

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| **"Cannot find MongoDB"** | Ensure MongoDB is running: `mongod` |
| **"Port 3000 already in use"** | Change PORT in .env or kill process |
| **"API calls failing"** | Check REACT_APP_API_URL in client/.env |
| **"Dependencies won't install"** | Delete node_modules and run `npm install` again |
| **"Tailwind styles not showing"** | Make sure you ran `npm install` in client directory |

---

## Next Steps

### 🎓 Learning Path

1. ✅ **Get it running** (you are here!)
2. 🔐 **Add Authentication** - Implement JWT login
3. 📱 **Improve Mobile UI** - Make it fully responsive
4. 📧 **Add Email** - Send notifications
5. 📊 **Advanced Charts** - More analytics
6. 🚀 **Deploy** - Go live on Heroku/Vercel

### 🛠️ Customization

- **Add fields** → Edit database models in `server/models/`
- **Create new pages** → Add components in `client/src/pages/`
- **Update styling** → Modify Tailwind classes in components
- **Add API routes** → Create new routes in `server/routes/`

### 📚 Resources

- React: https://react.dev
- Tailwind CSS: https://tailwindcss.com
- MongoDB: https://docs.mongodb.com
- Express: https://expressjs.com
- Recharts: https://recharts.org

---

## Support & Help

If you encounter issues:

1. **Check the logs** - Look at terminal output for errors
2. **Review the docs** - See README.md for detailed info
3. **Database issues** - Verify MongoDB is running and connection string is correct
4. **API errors** - Check browser console (F12) for error messages
5. **Port conflicts** - Change PORT in .env files

---

## Security Notes ⚠️

Before going to production:

- [ ] Generate strong JWT_SECRET (not "your-secret-key-here")
- [ ] Use MongoDB Atlas with strong password
- [ ] Enable HTTPS
- [ ] Set secure CORS origins
- [ ] Implement rate limiting
- [ ] Add input validation
- [ ] Hash passwords (implement auth)
- [ ] Use environment variables for sensitive data

---

## Performance Tips

- Use MongoDB Atlas for better performance
- Enable browser caching
- Minify and compress assets (done in production build)
- Use CDN for static files (Vercel handles this)
- Add pagination for large datasets
- Implement lazy loading for images

---

## What's Included 📦

✅ Complete MERN stack
✅ 5 fully functional modules (Dashboard, Employees, Attendance, Payroll, Tasks)
✅ Interactive charts and graphs
✅ Responsive UI design
✅ API documentation
✅ Database seeders
✅ Deployment configurations
✅ Docker support
✅ Professional styling
✅ Data validation

---

## License

MIT - Feel free to use and modify!

---

## Troubleshooting Quick Reference

```bash
# MongoDB not starting?
mongod

# Port already in use?
netstat -ano | findstr :5000    # (Windows)
lsof -i :5000                   # (Mac/Linux)

# Can't install dependencies?
rm -rf node_modules
npm install

# Clear browser cache
Ctrl+Shift+Delete (browser settings)

# Database reset
npm run seed
```

---

**🎉 You're all set! Have fun building with SmartHRO! 🚀**

For questions or more help, check:
- README.md - Full documentation
- QUICKSTART.md - Quick 5-minute guide
- DEPLOYMENT.md - Production deployment
- DOCKER.md - Docker setup
