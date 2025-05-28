from supabase import create_client
import json
import os
from dotenv import load_dotenv
from datetime import datetime
from pathlib import Path

# Load .env from project root
project_root = Path(__file__).resolve().parents[2]
load_dotenv(project_root / ".env")

supabase_url = os.getenv("SUPABASE_URL")
supabase_key = os.getenv("SUPABASE_KEY")

if not supabase_url or not supabase_key:
    raise ValueError("SUPABASE_URL or SUPABASE_KEY is missing in .env")

try:
    supabase = create_client(supabase_url, supabase_key)
except Exception as e:
    raise Exception(f"Failed to connect to Supabase: {str(e)}")

# Define paths
universities_json = project_root / "frontend/src/data/universities.json"

# Check if universities.json exists
if not universities_json.exists():
    raise FileNotFoundError(f"Cannot find {universities_json}")

# Load universities
with open(universities_json) as f:
    universities = json.load(f)

# Prepare universities data
universities_data = [
    {
        "id": uni["id"],
        "name": uni["name"],
        "shortname": uni["shortName"],
        "city": uni["city"],
        "province": uni["province"],
        "established": uni["established"],
        "type": uni["type"],
        "logo": uni["logo"],
        "website": uni["website"],
        "overview": uni["overview"],
        "fees": uni["fees"],
        "campuslife": uni["campusLife"],
        "placements": uni["placements"],
        "contact": uni["contact"],
        "news": uni["news"],
        "updatedat": uni["updatedAt"]
    }
    for uni in universities
]

# Insert universities
try:
    response = supabase.table("universities").upsert(universities_data).execute()
    print(f"Inserted/Updated {len(response.data)} universities")
except Exception as e:
    print(f"Error inserting universities: {str(e)}")
    raise

# Prepare admissions data
admissions_data = []
for uni in universities:
    if "admissions" in uni and "deadlines" in uni["admissions"]:
        for season, deadline in uni["admissions"]["deadlines"].items():
            admissions_data.append({
                "university_id": uni["id"],
                "adDate": datetime.now().strftime("%Y-%m-%d"),  # Placeholder
                "deadline": deadline,
                "details": {
                    "requirements": uni["admissions"]["requirements"],
                    "tests": uni["admissions"]["tests"],
                    "meritCriteria": uni["admissions"]["meritCriteria"]
                },
                "updatedAt": uni["updatedAt"]
            })

# Insert admissions
if admissions_data:
    try:
        response = supabase.table("admissions").upsert(admissions_data).execute()
        print(f"Inserted/Updated {len(response.data)} admissions")
    except Exception as e:
        print(f"Error inserting admissions: {str(e)}")
        raise

# Prepare programs data
programs_data = []
for uni in universities:
    for program in uni.get("programs", []):
        programs_data.append({
            "id": f"{uni['id']}-{program['id']}",  # Ensure unique ID
            "university_id": uni["id"],
            "name": program["name"],
            "degree": program["degree"],
            "faculty": program["faculty"],
            "duration": program["duration"],
            "creditHours": program["creditHours"],
            "description": program["description"],
            "requirements": program["requirements"],
            "careerProspects": program["careerProspects"]
        })

# Insert programs
if programs_data:
    try:
        response = supabase.table("programs").upsert(programs_data).execute()
        print(f"Inserted/Updated {len(response.data)} programs")
    except Exception as e:
        print(f"Error inserting programs: {str(e)}")
        raise