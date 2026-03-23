# SmartHRO Deployment Guide

This guide will help you deploy SmartHRO to production using Heroku (Backend) and Vercel (Frontend).

## Prerequisites

- GitHub account (to store your code)
- Heroku account (free tier available)
- Vercel account (free tier available)
- MongoDB Atlas account (free tier available)

## Step 1: Prepare Your Code

### 1.1 Initialize Git Repository

```bash
cd hr-fullstack
git init
git add .
git commit -m "Initial commit: SmartHRO full-stack application"
git branch -M main
```

### 1.2 Create GitHub Repository

1. Go to github.com and create a new repository named `smarthro`
2. Push your code:

```bash
git remote add origin https://github.com/YOUR_USERNAME/smarthro.git
git push -u origin main
```

## Step 2: Set Up MongoDB Atlas

### 2.1 Create MongoDB Database

1. Go to mongodb.com/cloud/atlas
2. Create a free account
3. Create a new project called "SmartHRO"
4. Create a cluster (Free tier)
5. Click "Connect" and get your connection string
6. Replace `<username>` and `<password>` in the connection string
7. Add your IP address to the whitelist

Connection string example:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/smarthro?retryWrites=true&w=majority
```

## Step 3: Deploy Backend to Heroku

### 3.1 Install Heroku CLI

```bash
# Windows
choco install heroku-cli

# macOS
brew tap heroku/brew && brew install heroku

# Or download from https://devcenter.heroku.com/articles/heroku-cli
```

### 3.2 Login to Heroku

```bash
heroku login
```

### 3.3 Create Heroku App

```bash
cd server
heroku create your-app-name-api
```

### 3.4 Set Environment Variables

```bash
heroku config:set MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/smarthro?retryWrites=true&w=majority
heroku config:set JWT_SECRET=your_very_secret_key_string_here
heroku config:set NODE_ENV=production
```

### 3.5 Create Procfile in Server

The Procfile is already created. Verify it contains:
```
web: npm start
```

### 3.6 Update Server package.json

Make sure the start script is:
```json
"start": "node server.js"
```

### 3.7 Deploy to Heroku

```bash
# Add Heroku remote
heroku git:remote -a your-app-name-api

# Deploy
git push heroku main
```

### 3.8 Verify Backend Deployment

```bash
heroku logs --tail
heroku open
```

Visit `https://your-app-name-api.herokuapp.com/api/health` - you should see:
```json
{"status": "Server is running"}
```

## Step 4: Deploy Frontend to Vercel

### 4.1 Install Vercel CLI

```bash
npm install -g vercel
```

### 4.2 Create Vercel App

```bash
cd client
vercel
```

Follow the prompts:
- Link to existing project: No
- Set project name: `smarthro-frontend`
- Framework preset: Create React App
- Root directory: ./

### 4.3 Set Environment Variables in Vercel

1. Go to vercel.com > your project > Settings > Environment Variables
2. Add:
   - Name: `REACT_APP_API_URL`
   - Value: `https://your-app-name-api.herokuapp.com/api`

### 4.4 Deploy to Vercel

```bash
vercel --prod
```

## Step 5: Configure CORS in Backend

Update your server.js CORS configuration:

```javascript
app.use(cors({
  origin: [
    'https://your-frontend-url.vercel.app',
    'http://localhost:3000', // for development
    'http://localhost:5000'
  ],
  credentials: true
}));
```

Redeploy to Heroku:
```bash
git push heroku main
```

## Step 6: Test Your Deployment

1. Visit your Vercel frontend: `https://your-frontend-url.vercel.app`
2. Check that all API calls work
3. Test creating employees, marking attendance, etc.

## Monitoring & Updates

### View Logs

**Heroku:**
```bash
heroku logs --tail
```

**Vercel:**
- Check Vercel dashboard > Deployments > Logs

### Update Code

```bash
# Make changes locally
git add .
git commit -m "Update: Your changes"

# Push to GitHub
git push origin main

# Deploy to Heroku
git push heroku main

# Deploy to Vercel (automatic with GitHub integration)
```

## Environment Variables Reference

### Backend (.env)

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/smarthro
PORT=5000
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=production
```

### Frontend (.env)

```
REACT_APP_API_URL=https://your-backend-url.herokuapp.com/api
```

## Troubleshooting

### Backend won't start on Heroku

1. Check logs: `heroku logs --tail`
2. Verify environment variables: `heroku config`
3. Ensure MongoDB connection string is correct
4. Check that all dependencies are in package.json

### Frontend API calls failing

1. Verify REACT_APP_API_URL is set in Vercel
2. Check that backend CORS allows your frontend domain
3. Verify API endpoints are correct
4. Check browser console for errors

### Deployment taking too long

- Vercel: Check if it's stuck in build. Retry deployment.
- Heroku: May be slow on free tier. Consider upgrading dyno.

## Cost Estimates (Free Tier)

- **MongoDB Atlas**: Free (512 MB storage)
- **Heroku**: Free (5 free dyno hours/month) or $7/month for hobby dyno
- **Vercel**: Free for hobby projects
- **GitHub**: Free with public/private repos

## Next Steps

1. Set up custom domain names
2. Add email notifications
3. Implement user authentication
4. Set up automated backups
5. Add monitoring and analytics

## Support

For deployment issues, visit:
- Heroku: devcenter.heroku.com
- Vercel: vercel.com/docs
- MongoDB: mongodb.com/docs
