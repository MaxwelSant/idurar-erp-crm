#!/bin/bash

# Navigate to the backend directory and install dependencies
cd backend
npm install

# Run the backend server in the background
npm run dev &

# Go back to the root directory
cd ..

# Navigate to the frontend directory and install dependencies
cd frontend
npm install

# Run the frontend server
npm run dev