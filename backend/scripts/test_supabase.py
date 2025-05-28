from supabase import create_client
from dotenv import load_dotenv
from pathlib import Path
import os

project_root = Path(__file__).resolve().parents[2]
load_dotenv(project_root / ".env")

supabase_url = os.getenv("SUPABASE_URL")
supabase_key = os.getenv("SUPABASE_KEY")

if not supabase_url or not supabase_key:
    raise ValueError("SUPABASE_URL or SUPABASE_KEY missing")

try:
    supabase = create_client(supabase_url, supabase_key)
    response = supabase.table("universities").select("id").limit(1).execute()
    print("Connection successful:", response.data)
except Exception as e:
    print("Connection failed:", str(e))