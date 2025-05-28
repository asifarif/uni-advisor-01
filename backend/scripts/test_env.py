# backend/scripts/test_env.py
from dotenv import load_dotenv
from pathlib import Path
import os

project_root = Path(__file__).resolve().parents[2]
load_dotenv(project_root / ".env")
print(os.getenv("SUPABASE_URL"))
print(os.getenv("SUPABASE_KEY"))