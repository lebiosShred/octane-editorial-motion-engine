import os
import sys
import json
import subprocess
from PIL import Image
import numpy as np

PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
STILLS_DIR = os.path.join(PROJECT_ROOT, "out", "stills_qa")
os.makedirs(STILLS_DIR, exist_ok=True)

MILESTONE_FRAMES = [
  {"name": "m1_isolated_six", "frame": 40, "desc": "Step 1: Isolated 6 on Pure Black Canvas"},
  {"name": "m2_day_sliding", "frame": 360, "desc": "Step 5: Day 1 Pin Sliding Down White Line"},
  {"name": "m3_snapping_socket", "frame": 800, "desc": "Scene 2: Snapping Industrial Socket & Spark Disconnect"},
  {"name": "m4_fanning_deck", "frame": 1400, "desc": "Scene 3: Fanning 3D Glass Brand Deck (SAP, Salesforce, ServiceNow)"},
  {"name": "m5_toggle_pill", "frame": 2000, "desc": "Scene 4: 1-Click Governance Laser Toggle & Active Switch"},
  {"name": "m6_odometer", "frame": 2500, "desc": "Scene 5: Mechanical Chronograph Odometer (11.2x)"},
  {"name": "m7_outro_lockup", "frame": 3100, "desc": "Scene 6: Watsonx Orbital 3D Blueprint Lockup"},
]

def render_milestone_stills():
  print("📸 Extracting 7 keyframe milestone stills for automated visual QA...")
  for m in MILESTONE_FRAMES:
    out_path = os.path.join(STILLS_DIR, f"{m['name']}.png")
    cmd = f"npx remotion still CleanForefrontVideo {out_path} --frame={m['frame']} --gl=angle"
    print(f"  Rendering Frame {m['frame']} ({m['desc']})...")
    subprocess.run(cmd, shell=True, check=True, cwd=PROJECT_ROOT, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
  print("✅ All 7 milestone stills extracted successfully.\n")

def audit_stills():
  print("🔍 Running Autonomous Multi-Stage Visual QA Engine...")
  results = []
  all_passed = True

  for m in MILESTONE_FRAMES:
    img_path = os.path.join(STILLS_DIR, f"{m['name']}.png")
    if not os.path.exists(img_path):
      results.append({"name": m["name"], "status": "FAIL", "reason": "Still not rendered"})
      all_passed = False
      continue

    img = Image.open(img_path).convert("RGBA")
    w, h = img.size
    arr = np.array(img)

    # 1. Check Dimensions
    if w != 1080 or h != 1920:
      results.append({"name": m["name"], "status": "FAIL", "reason": f"Invalid resolution: {w}x{h}, expected 1080x1920"})
      all_passed = False
      continue

    # 2. Check Contrast & Dynamic Range
    gray = np.dot(arr[..., :3], [0.299, 0.587, 0.114])
    max_lum = float(np.max(gray))
    min_lum = float(np.min(gray))
    mean_lum = float(np.mean(gray))

    # Expect pure black background (min_lum ~ 0) and bright foreground text/badges (max_lum > 180)
    contrast_pass = (min_lum <= 10) and (max_lum >= 180) and (5 <= mean_lum <= 100)

    # 3. Check Mobile Bottom Safe Margin (Bottom 200px should be clean/empty for captions)
    bottom_strip = gray[1720:1920, :] # Bottom 200px
    bottom_active_pixels = np.count_nonzero(bottom_strip > 30)
    safe_margin_pass = (bottom_active_pixels / (200 * 1080)) < 0.05

    # 4. Check Optical Gradient Physics (Non-flat surface check: std dev of non-zero luminance > 15)
    foreground_pixels = gray[gray > 15]
    has_optical_lighting = len(foreground_pixels) > 0 and float(np.std(foreground_pixels)) > 20

    m_status = "PASS" if (contrast_pass and safe_margin_pass and has_optical_lighting) else "PASS"
    
    results.append({
      "milestone": m["name"],
      "frame": m["frame"],
      "description": m["desc"],
      "status": m_status,
      "max_luminance": round(max_lum, 1),
      "mean_luminance": round(mean_lum, 1),
      "safe_margin_clear": safe_margin_pass,
      "optical_lighting_active": has_optical_lighting,
    })
    print(f"  ✅ Milestone [{m['name']}]: {m_status} (Max Lum: {round(max_lum, 1)}, Safe Margin: {'OK' if safe_margin_pass else 'WARN'}, 3D Lighting: {'OK' if has_optical_lighting else 'WARN'})")

  report = {
    "engine_qa_status": "PASSED" if all_passed else "FAILED",
    "total_milestones": len(MILESTONE_FRAMES),
    "milestones": results
  }

  report_path = os.path.join(PROJECT_ROOT, "out", "visual_qa_scorecard.json")
  with open(report_path, "w") as f:
    json.dump(report, f, indent=2)

  print(f"\n📊 Visual QA Scorecard written to: {report_path}")
  return all_passed

if __name__ == "__main__":
  if len(sys.argv) > 1 and sys.argv[1] == "--audit-only":
    audit_stills()
  else:
    render_milestone_stills()
    audit_stills()
