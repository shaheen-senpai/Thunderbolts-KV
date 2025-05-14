#!/bin/bash

# Start the frontend and backend servers
echo "Starting ChatGPT Clone..."

# Navigate to the project directory
cd "$(dirname "$0")"

# Function to clean up background processes when the script exits
cleanup() {
  echo "Shutting down servers..."
  kill $FRONTEND_PID $BACKEND_PID 2>/dev/null
  exit
}

# Set up the cleanup function to run on script termination
trap cleanup SIGINT SIGTERM

# Start the backend server
echo "Starting backend server..."
cd backend
./start.sh &
BACKEND_PID=$!
cd ..

# Wait a moment to allow the backend to start
sleep 2

# Start the frontend server
echo "Starting frontend server..."
cd frontend
npm start &
FRONTEND_PID=$!
cd ..

echo "Servers started!"
echo "Frontend: http://localhost:3000"
echo "Backend: http://localhost:5000"
echo "Press Ctrl+C to stop all servers"

# Wait for user to press Ctrl+C
wait $FRONTEND_PID
