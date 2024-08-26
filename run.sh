#!/bin/bash

# Navigate to the backend directory and install dependencies
cd backend

# Run the backend server in the background
npm run dev &

# Go back to the root directory
cd ..

# Navigate to the frontend directory and install dependencies
cd frontend

# Run the frontend server
npm run dev