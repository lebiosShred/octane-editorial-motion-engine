import os
import subprocess
import time

TARGET_DIR = os.path.abspath("c:/Users/SkyDr/Documents/antigravity/excited-pythagoras/downloads_86_mashups")
os.makedirs(TARGET_DIR, exist_ok=True)

EPISODES = [
    (3, "https://www.youtube.com/watch?v=AMFbNEB5aqI"),
    (4, "https://www.youtube.com/watch?v=E3K41tiNZPc"),
    (5, "https://www.youtube.com/watch?v=i725iVL4ug0"),
    (6, "https://www.youtube.com/watch?v=eAlFpZpr4Wk"),
    (7, "https://www.youtube.com/watch?v=0_ukYCzyHCA"),
    (8, "https://www.youtube.com/watch?v=kUd-Ftn7zGY"),
    (9, "https://www.youtube.com/watch?v=ZGUnY7mBNhg"),
    (10, "https://www.youtube.com/watch?v=rgbGQ1oyIcs"),
    (11, "https://www.youtube.com/watch?v=_aI8JVs3Lc4"),
    (12, "https://www.youtube.com/watch?v=YzS0mCVDs8E"),
    (13, "https://www.youtube.com/watch?v=g5S2dCzRhVU"),
    (14, "https://www.youtube.com/watch?v=8aL1YBUmlYc"),
    (15, "https://www.youtube.com/watch?v=RAprpDhBIKE"),
    (16, "https://www.youtube.com/watch?v=WJodVmgznHE"),
    (17, "https://www.youtube.com/watch?v=9tv2RumS_TQ"),
    (18, "https://www.youtube.com/watch?v=2qzILrzw23k"),
    (19, "https://www.youtube.com/watch?v=2KO8wx4BkNs"),
    (20, "https://www.youtube.com/watch?v=HSNipNfM1W0"),
    (21, "https://www.youtube.com/watch?v=NzFa35h-IkM"),
    (22, "https://www.youtube.com/watch?v=c-nJ0H5QlMU"),
    (23, "https://www.youtube.com/watch?v=v-mEsj6GIFs")
]

def download_episode(ep_num: int, url: str) -> bool:
    final_mp4 = os.path.join(TARGET_DIR, f"86_Eighty_Six_EP{ep_num:02d}_Mashup.mp4")

    if os.path.exists(final_mp4) and os.path.getsize(final_mp4) > 50_000_000:
        print(f"[Skip] Episode {ep_num:02d} already downloaded ({os.path.getsize(final_mp4)/(1024*1024):.1f} MB).")
        return True

    print(f"\n[Start] Downloading Episode {ep_num:02d} in 1080p ({url})...")
    cmd = [
        "yt-dlp",
        "--js-runtimes", "node",
        "-f", "137+140/bestvideo[height<=1080]+bestaudio/best",
        "--merge-output-format", "mp4",
        "--no-warnings",
        "--quiet",
        "-o", final_mp4,
        url
    ]
    res = subprocess.run(cmd)
    if res.returncode == 0 and os.path.exists(final_mp4):
        size_mb = os.path.getsize(final_mp4) / (1024 * 1024)
        print(f"[Done] Episode {ep_num:02d} downloaded successfully ({size_mb:.1f} MB)!")
        return True
    else:
        print(f"[Error] Failed to download Episode {ep_num:02d}")
        return False

def main():
    print("=" * 70)
    print(f" 📥 Batch Downloading 86 Eighty-Six Episodes 03 - 23 ({len(EPISODES)} videos in 1080p)")
    print("=" * 70)

    start_time = time.time()
    for ep, url in EPISODES:
        download_episode(ep, url)
        time.sleep(1)

    elapsed = time.time() - start_time
    print("\n" + "=" * 70)
    print(f" 🎉 All downloads completed in {elapsed:.1f}s!")
    print(f" Output folder: {TARGET_DIR}")
    print("=" * 70)

if __name__ == "__main__":
    main()
