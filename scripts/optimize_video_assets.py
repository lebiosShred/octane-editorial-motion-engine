import subprocess
import json
from pathlib import Path

PUBLIC_DIR = Path(__file__).parent.parent / "public"

def probe_video(file_path: Path):
    cmd = [
        "ffprobe", "-v", "quiet",
        "-print_format", "json",
        "-show_format", "-show_streams",
        str(file_path)
    ]
    res = subprocess.run(cmd, capture_output=True, text=True)
    if res.returncode != 0:
        return None
    try:
        return json.loads(res.stdout)
    except Exception:
        return None

def optimize_all_videos():
    print(f"🎬 Scanning video assets in {PUBLIC_DIR}...")
    mp4_files = list(PUBLIC_DIR.glob("vid_*.mp4"))
    if not mp4_files:
        print("No vid_*.mp4 files found.")
        return

    for vpath in mp4_files:
        info = probe_video(vpath)
        if not info:
            continue
        vstreams = [s for s in info.get("streams", []) if s.get("codec_type") == "video"]
        if not vstreams:
            continue
        v = vstreams[0]
        r_fps = v.get("r_frame_rate", "")
        pix_fmt = v.get("pix_fmt", "")
        print(f"Checking {vpath.name}: {r_fps} FPS, pix_fmt: {pix_fmt}")

        temp_out = vpath.with_name(f"{vpath.stem}_opt.mp4")
        cmd = [
            "ffmpeg", "-y",
            "-i", str(vpath),
            "-r", "30",
            "-c:v", "libx264",
            "-g", "1",
            "-keyint_min", "1",
            "-pix_fmt", "yuv420p",
            "-profile:v", "baseline",
            "-level", "3.0",
            "-movflags", "+faststart",
            "-an",
            str(temp_out)
        ]
        res = subprocess.run(cmd, capture_output=True)
        if res.returncode == 0:
            temp_out.replace(vpath)
            print(f"  ✅ Optimized {vpath.name} -> Constant 30fps All-Intra (I-frame only) + FastStart")
        else:
            print(f"  ❌ Failed to optimize {vpath.name}: {res.stderr.decode('utf-8', errors='ignore')}")

if __name__ == "__main__":
    optimize_all_videos()
