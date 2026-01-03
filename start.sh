#!/bin/bash

echo "🚀 Starting Champ Code Academy Tutor Portal"
echo "=========================================="

# Install backend dependencies
echo "📦 Installing backend dependencies..."
/usr/bin/python3 -m pip install -r backend/requirements.txt --user

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
npm install

echo ""
echo "🎯 Starting Backend Server (FastAPI) on port 8000..."
echo "🎯 Starting Frontend Server (Next.js) on port 3000..."
echo ""
echo "📋 Login Credentials:"
echo "   Username: tutor"
echo "   Password: password"
echo ""
echo "🌐 Application URLs:"
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:8000"
echo "   API Docs: http://localhost:8000/docs"
echo ""
echo "Press Ctrl+C to stop all servers"
echo ""

# Start backend in background
cd backend
/usr/bin/python3 app.py &
BACKEND_PID=$!
cd ..

# Start frontend
npm run dev

# Kill backend when frontend stops
kill $BACKEND_PID