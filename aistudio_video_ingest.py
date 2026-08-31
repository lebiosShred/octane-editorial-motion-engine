import os
import sys
import json
import argparse
import subprocess

def check_dependencies():
    """Verify required CLI tools exist."""
    tools = ['ffmpeg', 'yt-dlp']
    for tool in tools:
        try:
            subprocess.run([tool, '-version' if tool == 'ffmpeg' else '--version'], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)
        except Exception:
            print(f"[ERR] Required tool '{tool}' not found in PATH.")
            sys.exit(1)

def format_timestamp(seconds):
    """Formats seconds into MM:SS or HH:MM:SS format like Google AI Studio."""
    seconds = int(seconds)
    hours = seconds // 3600
    minutes = (seconds % 3600) // 60
    secs = seconds % 60
    if hours > 0:
        return f"{hours:02d}:{minutes:02d}:{secs:02d}"
    return f"{minutes:02d}:{secs:02d}"

def process_video(input_target, output_dir="aistudio_ingest"):
    """
    Replicates Google AI Studio Video Ingestion Pipeline:
    1. Downloads video/audio via yt-dlp (if URL).
    2. Extracts 1-FPS visual frame snapshots via ffmpeg.
    3. Extracts mono audio track (16kHz / 16Kbps) via ffmpeg.
    4. Generates a 1-to-1 timestamped manifest (MM:SS -> frame path).
    """
    check_dependencies()
    os.makedirs(output_dir, exist_ok=True)
    frames_dir = os.path.join(output_dir, "frames")
    os.makedirs(frames_dir, exist_ok=True)

    video_path = input_target

    # Step 1: Download if input is a URL
    if input_target.startswith("http://") or input_target.startswith("https://"):
        print(f"[1/4] Downloading YouTube video via yt-dlp: {input_target}...")
        download_path = os.path.join(output_dir, "input_video.mp4")
        cmd_dl = ["yt-dlp", "-f", "bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best", "-o", download_path, input_target]
        subprocess.run(cmd_dl, check=True)
        video_path = download_path

    if not os.path.exists(video_path):
        print(f"[ERR] Video file not found at: {video_path}")
        sys.exit(1)

    # Step 2: Sample 1-FPS Frames (Google AI Studio standard rate)
    print("[2/4] Extracting visual frames at exactly 1 FPS (Google AI Studio standard)...")
    cmd_frames = [
        "ffmpeg", "-y", "-i", video_path,
        "-vf", "fps=1",
        "-q:v", "2",
        os.path.join(frames_dir, "frame_%04d.jpg")
    ]
    subprocess.run(cmd_frames, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)

    # Step 3: Extract Audio Stream
    print("[3/4] Extracting mono audio track (16kHz)...")
    audio_path = os.path.join(output_dir, "audio.mp3")
    cmd_audio = [
        "ffmpeg", "-y", "-i", video_path,
        "-vn", "-ac", "1", "-ar", "16000", "-b:a", "16k",
        audio_path
    ]
    subprocess.run(cmd_audio, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)

    # Step 4: Build 1-to-1 AI Studio Manifest
    print("[4/4] Generating Google AI Studio MM:SS Timestamp Manifest...")
    frame_files = sorted([f for f in os.listdir(frames_dir) if f.endswith(".jpg")])
    
    manifest = {
        "pipeline_version": "Google AI Studio 1-FPS Replicator",
        "total_seconds": len(frame_files),
        "sampling_rate_fps": 1.0,
        "audio_file": audio_path,
        "timeline": []
    }

    for idx, frame_file in enumerate(frame_files):
        sec = idx + 1
        timestamp_str = format_timestamp(sec)
        manifest["timeline"].append({
            "second": sec,
            "timestamp": timestamp_str,
            "frame_file": os.path.join("frames", frame_file),
            "approx_tokens": 290  # ~258 vision + ~32 audio tokens
        })

    manifest_path = os.path.join(output_dir, "manifest.json")
    with open(manifest_path, "w", encoding="utf-8") as f:
        json.dump(manifest, f, indent=2)

    print(f"\n[OK] INGESTION COMPLETE! Replicated AI Studio pipeline successfully.")
    print(f"     - Output Folder: {os.path.abspath(output_dir)}")
    print(f"     - Total Frames (Seconds): {len(frame_files)}")
    print(f"     - Manifest File: {os.path.abspath(manifest_path)}")
    return manifest_path

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Replicate Google AI Studio Video Ingestion Pipeline (1-FPS + Audio + MM:SS Manifest)")
    parser.add_argument("input", help="YouTube URL or local MP4 video file path")
    parser.add_argument("--output", default="aistudio_ingest", help="Output directory name")
    args = parser.parse_args()

    process_video(args.input, args.output)
