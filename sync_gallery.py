import csv
import json
import urllib.request
import os
import re

# --- CONFIGURATION ---
SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRxSVACJI48Iec-Bnx4bvscsjkKLHoHTPfKsBuotvpg8I0jPWBTDuVKLQxpjHHXcOSy1cdpBCyp9ary/pub?output=csv'
DATA_FILE = 'assets/gallery_data.json'

def sync():
    print(f"🚀 Starting gallery sync from Google Sheets...")
    try:
        # Fetching data using urllib
        with urllib.request.urlopen(SHEET_CSV_URL, timeout=30) as response:
            data = response.read().decode('utf-8')
        
        lines = data.strip().split('\n')
        reader = csv.reader(lines)
        next(reader) # Skip header
        
        projects = []
        for row in reader:
            if len(row) < 4:
                continue
                
            vehicle_name = row[1].strip()
            priority = int(row[2].strip()) if row[2].strip().isdigit() else 99
            raw_images = row[3].strip()
            
            # Extract Drive IDs using regex
            drive_ids = re.findall(r'/d/([a-zA-Z0-9_-]+)', raw_images)
            if not drive_ids:
                # Try handling direct IDs if they are comma separated
                drive_ids = [id.strip() for id in raw_images.split(',') if len(id.strip()) > 20]

            if vehicle_name and drive_ids:
                projects.append({
                    "name": vehicle_name,
                    "priority": priority,
                    "ids": drive_ids
                })
        
        projects.sort(key=lambda x: x['priority'])
        
        # Ensure assets directory exists
        os.makedirs('assets', exist_ok=True)
        
        with open(DATA_FILE, 'w', encoding='utf-8') as f:
            json.dump(projects, f, indent=2)
            
        print(f"✅ Successfully synced {len(projects)} projects to {DATA_FILE}")
        
    except Exception as e:
        print(f"❌ Error during sync: {e}")

if __name__ == "__main__":
    sync()
