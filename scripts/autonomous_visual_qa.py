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
  {"name": "m2_day1_top", "frame": 310, "desc": "Step 4: DAY 1 Pin Pop-in with 140px Header Clearance"},
  {"name": "m2_day_tracking", "frame": 370, "desc": "Step 5: Dynamic Camera Tracking & Screen 1 Culling"},
  {"name": "m2_day180_stalled", "frame": 450, "desc": "Step 5B: DAY 180 Pin with 150px Clean Card Docking"},
  {"name": "m3_dark_terminal", "frame": 800, "desc": "Scene 2: Dark-Mode Code Terminal Inspector & HTTP 401 Disconnect"},
  {"name": "m4_fanning_deck", "frame": 1400, "desc": "Scene 3: Fanning 3D Glass Brand Deck (SAP, Salesforce, ServiceNow)"},
  {"name": "m5_toggle_pill", "frame": 2000, "desc": "Scene 4: 1-Click Governance Laser Toggle"},
  {"name": "m6_odometer", "frame": 2500, "desc": "Scene 5: Mechanical Chronograph Odometer (11.2x)"},
  {"name": "m7_outro_lockup", "frame": 3100, "desc": "Scene 6: Watsonx Orbital 3D Blueprint Lockup"},
]

def render_milestone_stills():
  print("📸 Extracting 9 keyframe milestone stills for automated visual QA...")
  for m in MILESTONE_FRAMES:
    out_path = os.path.join(STILLS_DIR, f"{m['name']}.png")
    cmd = f"npx remotion still CleanForefrontVideo {out_path} --frame={m['frame']} --gl=angle"
    print(f"  Rendering Frame {m['frame']} ({m['desc']})...")
    subprocess.run(cmd, shell=True, check=True, cwd=PROJECT_ROOT, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
  print("✅ All 9 milestone stills extracted successfully.\n")

def check_spatial_bounding_boxes(arr_gray, intra_box_merge_gap=28, min_inter_widget_gap=30):
  """
  Analyzes vertical luminance density profiles to detect active component blocks.
  Merges internal multi-line typography (intra_box_merge_gap <= 28px) and verifies
  that separate widgets maintain at least min_inter_widget_gap (>= 30px).
  """
  row_sums = np.sum(arr_gray > 30, axis=1)
  active_rows = np.where(row_sums > 20)[0]

  if len(active_rows) == 0:
    return True, 0, "Empty canvas"

  # Find discrete clusters (bounding segments along Y-axis)
  clusters = []
  current_cluster = [int(active_rows[0]), int(active_rows[0])]

  for r in active_rows[1:]:
    r_int = int(r)
    if r_int - current_cluster[1] <= intra_box_merge_gap:
      current_cluster[1] = r_int
    else:
      clusters.append(current_cluster)
      current_cluster = [r_int, r_int]
  clusters.append(current_cluster)

  # Check gaps between consecutive discrete widgets
  min_observed_gap = 9999
  for i in range(len(clusters) - 1):
    c1_bottom = clusters[i][1]
    c2_top = clusters[i + 1][0]
    gap = c2_top - c1_bottom
    if gap < min_observed_gap:
      min_observed_gap = gap
    
    if gap < min_inter_widget_gap:
      return False, int(gap), f"Collision detected: Widget {i} (bottom={c1_bottom}) and Widget {i+1} (top={c2_top}) have insufficient gap: {gap}px (min required: {min_inter_widget_gap}px)"

  return True, int(min_observed_gap if min_observed_gap != 9999 else 999), "Clear spatial hierarchy"

def audit_stills():
  print("🔍 Running Autonomous Multi-Stage Visual QA & Collision Engine...")
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

    contrast_pass = bool((min_lum <= 10) and (max_lum >= 180) and (3 <= mean_lum <= 100))

    # 3. Check Mobile Bottom Safe Margin (Bottom 200px should be clean for captions)
    bottom_strip = gray[1720:1920, :]
    bottom_active_pixels = np.count_nonzero(bottom_strip > 30)
    safe_margin_pass = bool((bottom_active_pixels / (200 * 1080)) < 0.05)

    # 4. Check Optical Gradient Physics
    foreground_pixels = gray[gray > 15]
    has_optical_lighting = bool(len(foreground_pixels) > 0 and float(np.std(foreground_pixels)) > 15)

    # 5. Check Spatial Bounding Boxes & Collision Avoidance
    spatial_pass, min_gap, spatial_msg = check_spatial_bounding_boxes(gray, intra_box_merge_gap=28, min_inter_widget_gap=30)

    m_status = "PASS" if (contrast_pass and safe_margin_pass and has_optical_lighting and spatial_pass) else "WARN"
    if not spatial_pass:
      m_status = "COLLISION_FAIL"
      all_passed = False

    results.append({
      "milestone": m["name"],
      "frame": int(m["frame"]),
      "description": m["desc"],
      "status": m_status,
      "max_luminance": round(max_lum, 1),
      "mean_luminance": round(mean_lum, 1),
      "safe_margin_clear": safe_margin_pass,
      "optical_lighting_active": has_optical_lighting,
      "spatial_clearance_pass": bool(spatial_pass),
      "min_observed_gap_px": int(min_gap),
      "spatial_diagnostic": str(spatial_msg),
    })
    
    print(f"  {'✅' if spatial_pass else '❌'} Milestone [{m['name']}]: {m_status} (Min Gap: {min_gap}px, Spatial: {spatial_msg})")

  report = {
    "engine_qa_status": "PASSED" if all_passed else "FAILED",
    "total_milestones": len(MILESTONE_FRAMES),
    "milestones": results
  }

  report_path = os.path.join(PROJECT_ROOT, "out", "visual_qa_scorecard.json")
  with open(report_path, "w") as f:
    json.dump(report, f, indent=2)

  print(f"\n📊 Visual QA & Collision Scorecard written to: {report_path}")
  return all_passed

if __name__ == "__main__":
  if len(sys.argv) > 1 and sys.argv[1] == "--audit-only":
    audit_stills()
  else:
    render_milestone_stills()
    audit_stills()
