@echo off
cd "c:\Users\swaru\OneDrive\Desktop\hr fullstack"

REM Initialize git if not already done
git init

REM Add remote origin
git remote add origin https://github.com/nageshraut12/hrdekstop.git

REM Add all files
git add .

REM Commit changes
git commit -m "Initial commit: HR Dashboard with MERN stack"

REM Push to GitHub
git push -u origin main

echo "Code pushed to GitHub successfully!"