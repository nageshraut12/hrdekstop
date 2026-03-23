# SmartHRO - Docker Setup Guide

Deploy SmartHRO using Docker and Docker Compose for easy setup and deployment.

## Prerequisites

- Install Docker from https://www.docker.com/products/docker-desktop
- Install Docker Compose (included with Docker Desktop)

## Quick Start with Docker Compose

### 1. Navigate to Project Root

```bash
cd "C:\Users\swaru\OneDrive\Desktop\hr fullstack"
```

### 2. Start All Services

```bash
docker-compose up
```

This will:
- Download and start MongoDB
- Build and start the Node.js backend
- Install and start the React frontend

Services will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **MongoDB**: mongodb://localhost:27017

### 3. Stop Services

```bash
docker-compose down
```

## Individual Docker Commands

### Build Backend Image

```bash
docker build -t smarthro-backend .
```

### Run Backend Container

```bash
docker run -p 5000:5000 -e MONGODB_URI=mongodb://localhost:27017/smarthro smarthro-backend
```

### Run MongoDB Container

```bash
docker run -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=admin123 mongo:6
```

## Troubleshooting

### Port Already in Use

If port 3000, 5000, or 27017 is already in use:

```bash
# Change ports in docker-compose.yml
# For example, change "3000:3000" to "3001:3000"
```

### Container Won't Start

```bash
# View logs
docker-compose logs -f backend

# Rebuild containers
docker-compose up --build
```

### Clear Everything and Start Fresh

```bash
# Remove all containers and volumes
docker-compose down -v

# Rebuild and start
docker-compose up --build
```

## Production Deployment

### Deploy to Docker Hub

```bash
# Login to Docker Hub
docker login

# Tag image
docker tag smarthro-backend username/smarthro-backend:latest

# Push
docker push username/smarthro-backend:latest
```

### Deploy to Cloud Services

**AWS ECS, Google Cloud Run, Azure Container Instances, or DigitalOcean:**

1. Push image to respective container registry
2. Deploy container with environment variables
3. Configure managed MongoDB (Atlas, AWS DocumentDB, etc.)

## Environment Variables for Docker

Edit `docker-compose.yml` to modify:

```yaml
environment:
  MONGODB_URI: mongodb://admin:admin123@mongodb:27017/smarthro?authSource=admin
  PORT: 5000
  JWT_SECRET: change-this-to-secure-key
  NODE_ENV: production
```

## Health Checks

### Check Backend Health

```bash
curl http://localhost:5000/api/health
# Should return: {"status": "Server is running"}
```

### Check Container Status

```bash
docker-compose ps
```

## Useful Docker Commands

```bash
# View logs
docker-compose logs -f

# Execute command in container
docker-compose exec backend npm run seed

# View all images
docker images

# View all containers
docker ps -a

# Remove unused images
docker image prune -a
```

---

For more info, visit: https://docs.docker.com/
