#!/bin/bash

echo ============================
echo Starting backend setup...
echo ============================
cd backend

echo Installing backend dependencies...
npm install
echo Starting backend server in new window...
npm run start &

cd ..
echo ============================
echo Starting frontend setup...
echo ============================

cd frontend
echo Installing frontend dependencies...
npm install
echo Starting frontend server...
npm run dev