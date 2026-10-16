#!/usr/bin/env bash
# ==========================================================
#  Lead Management System (Mini CRM) - One-Click Setup & Run
# ==========================================================
# Usage:
#   chmod +x start.sh
#   ./start.sh
#
# This script will:
#   1. Check prerequisites (Node.js, MongoDB)
#   2. Install backend & frontend dependencies
#   3. Create .env files from examples (if missing)
#   4. Start both backend and frontend servers
# ==========================================================

set -e

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$ROOT_DIR/backend"
FRONTEND_DIR="$ROOT_DIR/frontend"

echo ""
echo "🚀 Lead Management System - Setup & Run"
echo "========================================"

# --- 1. Check Node.js ---
if ! command -v node >/dev/null 2>&1; then
  echo "❌ Node.js is not installed. Please install Node.js v18+ from https://nodejs.org"
  exit 1
fi
echo "✅ Node.js found: $(node -v)"

# --- 2. Check MongoDB (informational only) ---
if command -v mongod >/dev/null 2>&1; then
  echo "✅ MongoDB found locally"
else
  echo "⚠️  Could not find 'mongod' on PATH."
  echo "   Make sure MongoDB is running (locally or via a cloud URI in backend/.env)"
fi

# --- 3. Backend setup ---
echo ""
echo "📦 Installing backend dependencies..."
cd "$BACKEND_DIR"
npm install

if [ ! -f ".env" ]; then
  cp .env.example .env
  echo "📝 Created backend/.env from .env.example"
fi

# --- 4. Frontend setup ---
echo ""
echo "📦 Installing frontend dependencies..."
cd "$FRONTEND_DIR"
npm install

if [ ! -f ".env" ]; then
  cp .env.example .env
  echo "📝 Created frontend/.env from .env.example"
fi

# --- 5. Start both servers ---
echo ""
echo "🟢 Starting backend (http://localhost:5000) ..."
cd "$BACKEND_DIR"
npm run dev > "$ROOT_DIR/backend.log" 2>&1 &
BACKEND_PID=$!

sleep 2

echo "🟢 Starting frontend (http://localhost:5173) ..."
cd "$FRONTEND_DIR"
npm run dev > "$ROOT_DIR/frontend.log" 2>&1 &
FRONTEND_PID=$!

echo ""
echo "========================================"
echo "✅ Backend running (PID $BACKEND_PID)  -> http://localhost:5000"
echo "✅ Frontend running (PID $FRONTEND_PID) -> http://localhost:5173"
echo ""
echo "📄 Logs: backend.log / frontend.log (in project root)"
echo "🛑 To stop both servers, run: kill $BACKEND_PID $FRONTEND_PID"
echo "========================================"
echo ""

# Keep script alive and forward Ctrl+C to kill both servers
trap "echo ''; echo '🛑 Stopping servers...'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit 0" INT TERM

wait
