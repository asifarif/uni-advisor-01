# Setup Guide

## Prerequisites
- Node.js 18+ 
- Python 3.9+
- Git
- VS Code (recommended)

## Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env.local
# Edit .env.local with your Supabase credentials
npm run dev
```

## Backend Setup (Future phases)
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# Edit .env with your credentials
uvicorn app.main:app --reload
```

## Database Setup
1. Create Supabase project
2. Run migrations in `database/supabase/migrations/`
3. Seed data using scripts in `database/supabase/seed/`

## Development Workflow
1. Create feature branch
2. Make changes
3. Test locally
4. Create PR
5. Deploy to staging
6. Deploy to production
