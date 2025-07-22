#!/bin/bash
# Simple setup script for local development
# 1. Copy environment template if not present
if [ ! -f .env ]; then
  cp .env.example .env
  echo "Created .env from template"
fi
# 2. Create Python virtual environment and install dependencies
python3 -m venv .venv
source .venv/bin/activate
pip install -r backend/requirements.txt
# 3. Install frontend dependencies
cd frontend && npm install --legacy-peer-deps && cd ..

echo "Setup complete"

