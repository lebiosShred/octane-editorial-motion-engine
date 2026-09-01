import cv2
import os
import json
import numpy as np

video_path = r"C:\Users\SkyDr\Downloads\Forefront Teaser video\Sample Video for mobile.mp4"
out_dir = r"out\forefront_frames"
os.makedirs(out_dir, exist_ok=True)

cap = cv2.VideoCapture(video_path)
total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
fps = cap.get(cv2.CAP_PROP_FPS)

print(f"Extracting {total_frames} frames @ {fps} fps from {video_path}...")

prev_gray = None
scene_cuts = []
frame_records = []

# Let's save all key frames and analyze scene transitions
for idx in range(total_frames):
    ret, frame = cap.read()
    if not ret:
        break
    
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    
    # Save every frame for forensic accuracy
    frame_filename = f"f_{idx:04d}.png"
    frame_path = os.path.join(out_dir, frame_filename)
    
    # Let's save at 4fps intervals (every 6 frames) + all cut points
    if idx % 6 == 0:
        cv2.imwrite(frame_path, frame)
    
    mean_lum = float(np.mean(gray))
    std_lum = float(np.std(gray))
    
    diff_val = 0.0
    if prev_gray is not None:
        diff = cv2.absdiff(gray, prev_gray)
        diff_val = float(np.mean(diff))
        if diff_val > 25.0:  # Major visual change/cut
            scene_cuts.append({
                "frame": idx,
                "time_sec": round(idx / fps, 3),
                "diff": round(diff_val, 2)
            })
            cv2.imwrite(os.path.join(out_dir, f"cut_{idx:04d}.png"), frame)
            
    prev_gray = gray
    frame_records.append({
        "frame": idx,
        "time_sec": round(idx / fps, 3),
        "mean_lum": round(mean_lum, 2),
        "diff": round(diff_val, 2)
    })

cap.release()

report = {
    "total_frames": total_frames,
    "fps": fps,
    "duration_sec": total_frames / fps,
    "scene_cuts_count": len(scene_cuts),
    "scene_cuts": scene_cuts,
}

with open("out/forefront_analysis.json", "w") as f:
    json.dump(report, f, indent=2)

print(f"Analysis complete! Detected {len(scene_cuts)} scene cuts across {total_frames} frames.")
for c in scene_cuts:
    print(f"Frame {c['frame']:04d} ({c['time_sec']:5.2f}s) | Cut Diff: {c['diff']}")
