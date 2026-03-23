# GitHub Deployment Script
Set-Location "c:\Users\swaru\OneDrive\Desktop\hr fullstack"

# Initialize git if not already done
git init

# Add remote origin
git remote add origin https://github.com/nageshraut12/hrdekstop.git

# Add all files
git add .

# Commit changes
git commit -m "Initial commit: HR Dashboard with MERN stack"

# Push to GitHub
git push -u origin main

Write-Host "Code pushed to GitHub successfully!"