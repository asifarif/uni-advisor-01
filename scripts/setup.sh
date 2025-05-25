#!/bin/bash
# Development environment setup script

echo "🚀 Setting up development environment..."

# Frontend setup
echo "📦 Installing frontend dependencies..."
cd frontend
npm install
cp .env.example .env.local
echo "✅ Frontend setup complete"

# Backend setup (future)
echo "🐍 Setting up Python backend (future)..."
cd ../backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
echo "✅ Backend setup complete"

cd ..
echo "🎉 Setup complete! Check docs/SETUP.md for next steps."
