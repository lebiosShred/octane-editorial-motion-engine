import os
import subprocess
import json

base_dir = "c:/Users/SkyDr/Documents/antigravity/excited-pythagoras/clean_reaction_mashups"
files = sorted(os.listdir(base_dir))

report = []
print("=========================================================================================")
print("🎯 MASTER AUDIT OF ALL 22 EPISODES IN clean_reaction_mashups")
print("=========================================================================================")

for f in files:
    if not f.endswith(".mp4"): continue
    fp = os.path.join(base_dir, f)
    sz_mb = os.path.getsize(fp) / (1024 * 1024)
    
    # Run ffprobe
    cmd = [
        "ffprobe", "-v", "error",
        "-show_entries", "stream=width,height,r_frame_rate,duration,codec_name",
        "-show_entries", "format=duration,size",
        "-of", "json",
        fp
    ]
    res = subprocess.run(cmd, capture_output=True, text=True)
    meta = json.loads(res.stdout)
    
    vstream = next((s for s in meta.get("streams", []) if s.get("codec_name") in ["h264", "hevc"]), {})
    width = vstream.get("width", 0)
    height = vstream.get("height", 0)
    fps = vstream.get("r_frame_rate", "N/A")
    dur = float(meta.get("format", {}).get("duration", 0)) / 60.0
    
    status = "✅ PASS (1080p BDRip Master)" if (width == 1920 and height == 1080 and sz_mb > 500) else "⚠️ REVIEW"
    
    item = {
        "filename": f,
        "resolution": f"{width}x{height}",
        "fps": fps,
        "duration_minutes": round(dur, 2),
        "file_size_mb": round(sz_mb, 1),
        "status": status
    }
    report.append(item)
    print(f"{f:40s} | {width:4d}x{height:4d} | {fps:5s} | {dur:5.2f}m | {sz_mb:7.1f} MB | {status}")

with open(os.path.join(base_dir, "master_audit_results.json"), "w") as f:
    json.dump(report, f, indent=2)
