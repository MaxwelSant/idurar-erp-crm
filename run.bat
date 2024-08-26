@echo off
cd backend
npm install
start cmd /k "npm run dev"
cd ..
cd frontend
npm install
npm run dev