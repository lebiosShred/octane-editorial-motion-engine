import os
import sys
import time

base_dir = "c:/Users/SkyDr/Documents/antigravity/excited-pythagoras"
if base_dir not in sys.path:
    sys.path.append(base_dir)

from anime_flash_engine.reaction_master_engine import ReactionMasterEngine

engine = ReactionMasterEngine()

# Complete Batch Matrix for All Broken Episodes:
EPISODE_BATCH_CONFIGS = {
    3: {
        "segs": [(110.936, None)],
        "layout": {"x": 550, "y": 0, "w": 820, "h": 545},
        "url": "https://www.youtube.com/watch?v=AMFbNEB5aqI"
    },
    4: {
        "segs": [(3.460, 75.0), (95.780, 1030.0), (159.780, None)],
        "layout": {"x": 549, "y": 270, "w": 822, "h": 462},
        "url": "https://www.youtube.com/watch?v=E3K41tiNZPc"
    },
    5: {
        "segs": [(5.376, 142.623), (239.359, None)],
        "layout": {"x": 550, "y": 0, "w": 820, "h": 545},
        "url": "https://www.youtube.com/watch?v=i725iVL4ug0"
    },
    6: {
        "segs": [(4.250, 80.0), (177.161, None)],
        "layout": {"x": 549, "y": 270, "w": 822, "h": 462},
        "url": "https://www.youtube.com/watch?v=eAlFpZpr4Wk"
    },
    7: {
        "segs": [(6.250, 85.0), (183.271, None)],
        "layout": {"x": 549, "y": 270, "w": 822, "h": 462},
        "url": "https://www.youtube.com/watch?v=0_ukYCzyHCA"
    },
    8: {
        "segs": [(5.310, 80.0), (176.630, None)],
        "layout": {"x": 550, "y": 0, "w": 820, "h": 545},
        "url": "https://www.youtube.com/watch?v=kUd-Ftn7zGY"
    },
    10: {
        "segs": [(11.260, 85.0), (192.151, None)],
        "layout": {"x": 549, "y": 540, "w": 822, "h": 540},
        "url": "https://www.youtube.com/watch?v=rgbGQ1oyIcs"
    },
    12: {
        "segs": [(6.373, None)],
        "layout": {"x": 550, "y": 0, "w": 820, "h": 545},
        "url": "https://www.youtube.com/watch?v=YzS0mCVDs8E"
    },
    13: {
        "segs": [(92.253, None)],
        "layout": {"x": 550, "y": 0, "w": 820, "h": 545},
        "url": "https://www.youtube.com/watch?v=g5S2dCzRhVU"
    },
    14: {
        "segs": [(93.330, None)],
        "layout": {"x": 550, "y": 0, "w": 820, "h": 545},
        "url": "https://www.youtube.com/watch?v=8aL1YBUmlYc"
    },
    15: {
        "segs": [(8.280, 80.0), (182.449, None)],
        "layout": {"x": 550, "y": 0, "w": 820, "h": 545},
        "url": "https://www.youtube.com/watch?v=RAprpDhBIKE"
    },
    18: {
        "segs": [(8.013, 80.0), (180.973, None)],
        "layout": {"x": 550, "y": 0, "w": 820, "h": 545},
        "url": "https://www.youtube.com/watch?v=2qzILrzw23k"
    },
    19: {
        "segs": [(4.330, 80.0), (178.293, None)],
        "layout": {"x": 549, "y": 540, "w": 822, "h": 540},
        "url": "https://www.youtube.com/watch?v=2KO8wx4BkNs"
    },
    21: {
        "segs": [(105.035, None)],
        "layout": {"x": 549, "y": 270, "w": 822, "h": 462},
        "url": "https://www.youtube.com/watch?v=NzFa35h-IkM"
    }
}

def run_batch():
    t_start = time.time()
    print("=====================================================================")
    print(f"🚀 STARTING MASTER BATCH FIX ({len(EPISODE_BATCH_CONFIGS)} EPISODES)")
    print("=====================================================================")
    
    for ep, cfg in EPISODE_BATCH_CONFIGS.items():
        try:
            yt_file = os.path.join(engine.scratch_dir, f"ep{ep:02d}_yt_1080p.mp4")
            mkv_file = engine.find_mkv(ep)
            engine.render_episode(ep, yt_file, mkv_file, cfg["segs"], cfg["layout"])
        except Exception as e:
            print(f"❌ Error rendering EP{ep:02d}: {e}")
            
    total_time = time.time() - t_start
    print(f"\n🎉 MASTER BATCH RENDER COMPLETE IN {total_time/60.0:.2f} MINUTES!")

if __name__ == "__main__":
    run_batch()
