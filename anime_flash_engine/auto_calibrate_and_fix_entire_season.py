import cv2
import numpy as np
import os
import sys
import json
import subprocess

base_dir = "c:/Users/SkyDr/Documents/antigravity/excited-pythagoras"
if base_dir not in sys.path:
    sys.path.append(base_dir)

from anime_flash_engine.reaction_master_engine import ReactionMasterEngine

engine = ReactionMasterEngine()
scratch_p = engine.scratch_dir
comp_dir = engine.output_dir

LAYOUT_TOP = {"x": 550, "y": 0, "w": 820, "h": 545, "name": "Top-Center"}
LAYOUT_MID = {"x": 549, "y": 270, "w": 822, "h": 540, "name": "Middle-Center"}
LAYOUT_BOT = {"x": 549, "y": 540, "w": 822, "h": 540, "name": "Bottom-Center"}

def get_layout(ep):
    mod = ep % 3
    if mod == 0:
        return LAYOUT_TOP
    elif mod == 1:
        return LAYOUT_MID
    else:
        return LAYOUT_BOT

EPISODE_URLS = {
    2:  "https://www.youtube.com/watch?v=0hK20eO_u1k",
    3:  "https://www.youtube.com/watch?v=AMFbNEB5aqI",
    4:  "https://www.youtube.com/watch?v=E3K41tiNZPc",
    5:  "https://www.youtube.com/watch?v=i725iVL4ug0",
    6:  "https://www.youtube.com/watch?v=eAlFpZpr4Wk",
    7:  "https://www.youtube.com/watch?v=0_ukYCzyHCA",
    8:  "https://www.youtube.com/watch?v=kUd-Ftn7zGY",
    9:  "https://www.youtube.com/watch?v=ZGUnY7mBNhg",
    10: "https://www.youtube.com/watch?v=rgbGQ1oyIcs",
    11: "https://www.youtube.com/watch?v=_aI8JVs3Lc4",
    12: "https://www.youtube.com/watch?v=YzS0mCVDs8E",
    13: "https://www.youtube.com/watch?v=g5S2dCzRhVU",
    14: "https://www.youtube.com/watch?v=8aL1YBUmlYc",
    15: "https://www.youtube.com/watch?v=RAprpDhBIKE",
    16: "https://www.youtube.com/watch?v=WJodVmgznHE",
    17: "https://www.youtube.com/watch?v=9tv2RumS_TQ",
    18: "https://www.youtube.com/watch?v=2qzILrzw23k",
    19: "https://www.youtube.com/watch?v=2KO8wx4BkNs",
    20: "https://www.youtube.com/watch?v=HSNipNfM1W0",
    21: "https://www.youtube.com/watch?v=NzFa35h-IkM",
    22: "https://www.youtube.com/watch?v=c-nJ0H5QlMU",
    23: "https://www.youtube.com/watch?v=v-mEsj6GIFs",
}

def ensure_yt_source(ep):
    yt_p = os.path.join(scratch_p, f"ep{ep:02d}_yt_1080p.mp4")
    if os.path.exists(yt_p) and os.path.getsize(yt_p) > 20*1024*1024:
        return yt_p
    url = EPISODE_URLS[ep]
    print(f"📥 Fetching YT source for EP{ep:02d}...")
    cmd = [
        "yt-dlp",
        "--remote-components", "ejs:github",
        "--extractor-args", "youtube:player_client=android_vr,web",
        "-f", "bestvideo[height<=1080]+bestaudio/best",
        "--merge-output-format", "mp4",
        "-o", yt_p,
        url
    ]
    subprocess.run(cmd, check=True)
    return yt_p

def find_exact_offset(ep, yt_p, mkv_p):
    cap_y = cv2.VideoCapture(yt_p)
    cap_m = cv2.VideoCapture(mkv_p)
    
    layout = get_layout(ep)
    y_s = layout["y"] + 45
    y_e = layout["y"] + layout["h"] - 45
    
    probe_points = [150, 300, 500, 750, 950]
    best_offsets = []
    
    for pt in probe_points:
        cap_y.set(cv2.CAP_PROP_POS_MSEC, pt * 1000)
        ret_y, frame_y = cap_y.read()
        if not ret_y:
            continue
        crop_y = frame_y[y_s:y_e, 560:1360]
        gray_y = cv2.cvtColor(cv2.resize(crop_y, (160, 90)), cv2.COLOR_BGR2GRAY)
        
        # Search coarse range: pt + 0s to pt + 180s in 1.0s increments
        min_coarse_diff = 1e9
        best_coarse_mkv = pt + 90
        
        for m_t in range(max(0, pt - 30), pt + 180, 2):
            cap_m.set(cv2.CAP_PROP_POS_MSEC, m_t * 1000)
            ret_m, frame_m = cap_m.read()
            if not ret_m:
                continue
            gray_m = cv2.cvtColor(cv2.resize(frame_m, (160, 90)), cv2.COLOR_BGR2GRAY)
            diff = np.mean(np.abs(gray_y.astype(float) - gray_m.astype(float)))
            if diff < min_coarse_diff:
                min_coarse_diff = diff
                best_coarse_mkv = m_t
                
        # Fine search with 0.04s precision (frame accurate)
        min_fine_diff = 1e9
        best_fine_mkv = best_coarse_mkv
        for m_t in np.arange(best_coarse_mkv - 3.0, best_coarse_mkv + 3.0, 0.04):
            cap_m.set(cv2.CAP_PROP_POS_MSEC, m_t * 1000)
            ret_m, frame_m = cap_m.read()
            if not ret_m:
                continue
            gray_m = cv2.cvtColor(cv2.resize(frame_m, (160, 90)), cv2.COLOR_BGR2GRAY)
            diff = np.mean(np.abs(gray_y.astype(float) - gray_m.astype(float)))
            if diff < min_fine_diff:
                min_fine_diff = diff
                best_fine_mkv = m_t
                
        off = best_fine_mkv - pt
        best_offsets.append(off)
        print(f"  [Probe {pt}s] Best MKV: {best_fine_mkv:.2f}s -> Offset: {off:.3f}s (Diff: {min_fine_diff:.1f})")
        
    cap_y.release()
    cap_m.release()
    
    if not best_offsets:
        return 90.0
    median_off = float(np.median(best_offsets))
    print(f"🎯 EP{ep:02d} Calibrated Offset: {median_off:.3f}s")
    return median_off

# Full calibration dictionary
EXACT_CALIBRATED_OFFSETS = {}

print("==================================================================")
print("🔍 PHASE 1: MEASURING FRAME-ACCURATE OFFSETS FOR ALL EPISODES")
print("==================================================================")

for ep in range(2, 24):
    print(f"\n--- CALIBRATING EPISODE {ep:02d} ---")
    yt_p = ensure_yt_source(ep)
    mkv_p = engine.find_mkv(ep)
    offset = find_exact_offset(ep, yt_p, mkv_p)
    EXACT_CALIBRATED_OFFSETS[ep] = offset

with open(os.path.join(scratch_p, "all_season_calibrated_offsets.json"), "w") as f:
    json.dump(EXACT_CALIBRATED_OFFSETS, f, indent=2)

print("\n==================================================================")
print("🎬 PHASE 2: BATCH RENDERING ALL EPISODES WITH CALIBRATED OFFSETS")
print("==================================================================")

for ep in range(2, 24):
    layout = get_layout(ep)
    offset = EXACT_CALIBRATED_OFFSETS[ep]
    yt_p = ensure_yt_source(ep)
    mkv_p = engine.find_mkv(ep)
    
    print(f"\n🎬 RENDERING EPISODE {ep:02d} -> Offset: {offset:.3f}s | Layout: {layout['name']}")
    engine.render_episode(ep, yt_p, mkv_p, [(offset, None)], layout)

print("\n🎉 ENTIRE SEASON 1 SUCCESSFULLY RE-RENDERED WITH FRAME-ACCURATE OFFSETS!")
