#!/usr/bin/env bash
# Standardize local environment setup for RoyaltyX
set -e

# Create .env if missing
if [ ! -f .env ]; then
  cp .env.example .env
  echo "Created .env from .env.example"
fi

# Set up Python virtual environment
if [ ! -d backend/venv ]; then
  echo "Creating Python virtual environment..."
  python3 -m venv backend/venv
fi

echo "Installing backend dependencies..."
backend/venv/bin/pip install --upgrade pip >/dev/null
backend/venv/bin/pip install -r backend/requirements.txt >/dev/null

# Install frontend dependencies
echo "Installing frontend dependencies..."
cd frontend
npm install >/dev/null
cd ..

echo "Local environment setup complete"
