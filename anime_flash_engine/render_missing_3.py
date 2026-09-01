import os
import sys
import subprocess
import time

base_dir = "c:/Users/SkyDr/Documents/antigravity/excited-pythagoras"
if base_dir not in sys.path:
    sys.path.append(base_dir)

from anime_flash_engine.render_all_remaining import process_episode, YT_EPISODE_URLS

scratch_dir = "C:/Users/SkyDr/.gemini/antigravity/brain/4b5e0564-4902-4c06-8ca2-c8138fc2182e/scratch"

def download_with_retry(ep: int):
    out_p = os.path.join(scratch_dir, f"ep{ep:02d}_yt_1080p.mp4")
    if os.path.exists(out_p) and os.path.getsize(out_p) > 100*1024*1024:
        return out_p
    url = YT_EPISODE_URLS[ep]
    print(f"Downloading YouTube 1080p for Episode {ep:02d} with retries...")
    cmd = [
        "yt-dlp",
        "--remote-components", "ejs:github",
        "--retries", "10",
        "--fragment-retries", "10",
        "-f", "bestvideo[height<=1080]+bestaudio/best[height<=1080]/best",
        "--merge-output-format", "mp4",
        "-o", out_p,
        url
    ]
    subprocess.run(cmd, check=True)
    return out_p

if __name__ == "__main__":
    for ep in [13, 19, 23]:
        try:
            print(f"\n>>> PROCESSING REMAINING EPISODE {ep:02d} <<<")
            download_with_retry(ep)
            process_episode(ep)
        except Exception as e:
            print(f"Error on Episode {ep}: {e}")
