import subprocess
import os
import sys
import json
import cv2

base_dir = "c:/Users/SkyDr/Documents/antigravity/excited-pythagoras"
if base_dir not in sys.path:
    sys.path.append(base_dir)

from anime_flash_engine.reaction_master_engine import ReactionMasterEngine

engine = ReactionMasterEngine()

LAYOUT_TOP = {"x": 550, "y": 0, "w": 820, "h": 545}
LAYOUT_MID = {"x": 549, "y": 270, "w": 822, "h": 540}
LAYOUT_BOT = {"x": 549, "y": 540, "w": 822, "h": 540}

# 3-step rotating cycle mapping:
# mod 0 -> Top
# mod 1 -> Middle
# mod 2 -> Bottom
EPISODE_METADATA = {
    2:  {"layout": LAYOUT_BOT, "segs": [(37.838, None)], "url": "https://www.youtube.com/watch?v=0hK20eO_u1k"},
    3:  {"layout": LAYOUT_TOP, "segs": [(90.767, None)], "url": "https://www.youtube.com/watch?v=AMFbNEB5aqI"},
    4:  {"layout": LAYOUT_MID, "segs": [(8.013, 80.0), (100.973, None)], "url": "https://www.youtube.com/watch?v=E3K41tiNZPc"},
    5:  {"layout": LAYOUT_BOT, "segs": [(95.733, None)], "url": "https://www.youtube.com/watch?v=i725iVL4ug0"},
    6:  {"layout": LAYOUT_TOP, "segs": [(95.040, None)], "url": "https://www.youtube.com/watch?v=eAlFpZpr4Wk"},
    7:  {"layout": LAYOUT_MID, "segs": [(94.945, None)], "url": "https://www.youtube.com/watch?v=0_ukYCzyHCA"},
    8:  {"layout": LAYOUT_BOT, "segs": [(92.016, None)], "url": "https://www.youtube.com/watch?v=kUd-Ftn7zGY"},
    9:  {"layout": LAYOUT_TOP, "segs": [(94.945, None)], "url": "https://www.youtube.com/watch?v=ZGUnY7mBNhg"},
    10: {"layout": LAYOUT_MID, "segs": [(92.000, None)], "url": "https://www.youtube.com/watch?v=rgbGQ1oyIcs"},
    11: {"layout": LAYOUT_BOT, "segs": [(92.000, None)], "url": "https://www.youtube.com/watch?v=_aI8JVs3Lc4"},
    12: {"layout": LAYOUT_TOP, "segs": [(90.000, None)], "url": "https://www.youtube.com/watch?v=YzS0mCVDs8E"},
    13: {"layout": LAYOUT_MID, "segs": [(92.253, None)], "url": "https://www.youtube.com/watch?v=g5S2dCzRhVU"},
    14: {"layout": LAYOUT_BOT, "segs": [(93.600, None)], "url": "https://www.youtube.com/watch?v=8aL1YBUmlYc"},
    15: {"layout": LAYOUT_TOP, "segs": [(95.000, None)], "url": "https://www.youtube.com/watch?v=RAprpDhBIKE"},
    16: {"layout": LAYOUT_MID, "segs": [(92.000, None)], "url": "https://www.youtube.com/watch?v=WJodVmgznHE"},
    17: {"layout": LAYOUT_BOT, "segs": [(8.013, 80.0), (100.973, None)], "url": "https://www.youtube.com/watch?v=9tv2RumS_TQ"},
    18: {"layout": LAYOUT_TOP, "segs": [(8.013, 80.0), (100.973, None)], "url": "https://www.youtube.com/watch?v=2qzILrzw23k"},
    19: {"layout": LAYOUT_MID, "segs": [(92.000, None)], "url": "https://www.youtube.com/watch?v=2KO8wx4BkNs"},
    20: {"layout": LAYOUT_BOT, "segs": [(92.000, None)], "url": "https://www.youtube.com/watch?v=HSNipNfM1W0"},
    21: {"layout": LAYOUT_TOP, "segs": [(94.945, None)], "url": "https://www.youtube.com/watch?v=NzFa35h-IkM"},
    22: {"layout": LAYOUT_MID, "segs": [(92.000, None)], "url": "https://www.youtube.com/watch?v=c-nJ0H5QlMU"},
    23: {"layout": LAYOUT_BOT, "segs": [(95.000, None)], "url": "https://www.youtube.com/watch?v=v-mEsj6GIFs"},
}

def ensure_yt_source(ep, url):
    yt_p = os.path.join(engine.scratch_dir, f"ep{ep:02d}_yt_1080p.mp4")
    if os.path.exists(yt_p) and os.path.getsize(yt_p) > 20*1024*1024:
        return yt_p
    print(f"📥 Downloading raw 1080p source for EP{ep:02d}...")
    cmd = [
        "yt-dlp",
        "--remote-components", "ejs:github",
        "-f", "bestvideo[height<=1080]+bestaudio/best",
        "--merge-output-format", "mp4",
        "-o", yt_p,
        url
    ]
    try:
        subprocess.run(cmd, check=True)
    except Exception as e:
        print(f"Fallback to best for EP{ep:02d}: {e}")
        cmd = [
            "yt-dlp",
            "--remote-components", "ejs:github",
            "-f", "best",
            "--merge-output-format", "mp4",
            "-o", yt_p,
            url
        ]
        subprocess.run(cmd, check=True)
    return yt_p

# Re-render all episodes that deviated from the true 3-step cycle:
AFFECTED_EPISODES = [5, 6, 8, 9, 10, 14, 16, 17, 19, 21, 22, 23]

print(f"🚀 Launching Master Batch Correction for Episodes: {AFFECTED_EPISODES}")

for ep in AFFECTED_EPISODES:
    meta = EPISODE_METADATA[ep]
    layout = meta["layout"]
    segs = meta["segs"]
    url = meta["url"]
    
    yt_p = ensure_yt_source(ep, url)
    mkv_p = engine.find_mkv(ep)
    
    layout_name = "Top-Center" if layout == LAYOUT_TOP else ("Middle-Center" if layout == LAYOUT_MID else "Bottom-Center")
    print(f"\n=======================================================")
    print(f"🎬 RENDERING EPISODE {ep:02d} -> Layout: {layout_name} (y={layout['y']})")
    print(f"=======================================================")
    
    engine.render_episode(ep, yt_p, mkv_p, segs, layout)
    
    # Save verification frame
    comp_p = os.path.join(engine.output_dir, f"86_Eighty_Six_EP{ep:02d}_Clean_Reaction.mp4")
    cap = cv2.VideoCapture(comp_p)
    cap.set(cv2.CAP_PROP_POS_MSEC, 300 * 1000)
    ret, frame = cap.read()
    cap.release()
    if ret:
        cv2.imwrite(os.path.join(engine.scratch_dir, f"cycle_fixed_ep{ep:02d}.png"), frame)
        print(f"📸 Saved verified frame: cycle_fixed_ep{ep:02d}.png")

print("\n🎉 MASTER BATCH CYCLE ALIGNMENT COMPLETE!")
