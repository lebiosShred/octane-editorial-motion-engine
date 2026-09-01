import os
import sys

base_dir = "c:/Users/SkyDr/Documents/antigravity/excited-pythagoras"
if base_dir not in sys.path:
    sys.path.append(base_dir)

from anime_flash_engine.dynamic_piecewise_sync_engine import DynamicPiecewiseSyncEngine
from anime_flash_engine.render_all_remaining import find_mkv, get_yt_1080p, output_dir

if __name__ == "__main__":
    engine = DynamicPiecewiseSyncEngine()
    ep = 5
    mkv = find_mkv(ep)
    yt = get_yt_1080p(ep)
    out_f = os.path.join(output_dir, f"86_Eighty_Six_EP{ep:02d}_Clean_Reaction.mp4")
    
    print(f"Testing Dynamic Piecewise Engine on Episode {ep:02d}...")
    res = engine.render_piecewise_composite(yt, mkv, ep, out_f)
    print("Result:", res)
