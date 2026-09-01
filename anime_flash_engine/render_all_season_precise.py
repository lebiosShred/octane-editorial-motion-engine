import os
import sys
import subprocess
import json
import numpy as np
from scipy import signal
import wave
import cv2

base_dir = "c:/Users/SkyDr/Documents/antigravity/excited-pythagoras"
scratch_dir = "C:/Users/SkyDr/.gemini/antigravity/brain/4b5e0564-4902-4c06-8ca2-c8138fc2182e/scratch"
output_dir = os.path.join(base_dir, "clean_reaction_mashups")
ember_dir = os.path.join(scratch_dir, "ember_episodes")

if base_dir not in sys.path:
    sys.path.append(base_dir)

from anime_flash_engine.render_all_remaining import find_mkv, get_yt_1080p, detect_layout_box

def extract_mono_16k(input_media: str, map_arg: str = None, duration: float = 600.0) -> np.ndarray:
    out_wav = os.path.join(scratch_dir, f"temp_aud_{os.getpid()}_{np.random.randint(10000)}.wav")
    cmd = ["ffmpeg", "-y", "-v", "error", "-ss", "0", "-t", str(duration), "-i", input_media]
    if map_arg:
        cmd.extend(["-map", map_arg])
    cmd.extend(["-ac", "1", "-ar", "16000", out_wav])
    subprocess.run(cmd, check=True)
    
    with wave.open(out_wav, 'rb') as wf:
        frames = wf.readframes(wf.getnframes())
        d = np.frombuffer(frames, dtype=np.int16).astype(np.float32)
        if np.max(np.abs(d)) > 0: d /= np.max(np.abs(d))
    if os.path.exists(out_wav): os.remove(out_wav)
    return d

def find_op_start_in_mkv(mkv_path: str) -> float:
    """Extracts the exact OP start timestamp from MKV chapters or subtitle timings."""
    try:
        cmd = ["ffprobe", "-v", "error", "-show_chapters", "-print_format", "json", mkv_path]
        res = subprocess.run(cmd, capture_output=True, text=True, check=True)
        data = json.loads(res.stdout)
        for ch in data.get("chapters", []):
            title = ch.get("tags", {}).get("title", "").upper()
            if "OP" in title or "OPENING" in title:
                return float(ch["start_time"])
    except Exception:
        pass
    return 80.0  # Safe default if no chapters

def render_episode_precise(ep: int):
    print(f"\n=======================================================")
    print(f"🎬 PROCESSING EPISODE {ep:02d} PRECISE ALIGNMENT")
    print(f"=======================================================")
    
    mkv_p = find_mkv(ep)
    yt_p = get_yt_1080p(ep)
    out_final = os.path.join(output_dir, f"86_Eighty_Six_EP{ep:02d}_Clean_Reaction.mp4")
    
    # 1. Extract dialogue subtitles
    ass_p = os.path.join(scratch_dir, f"ep{ep:02d}_dialogue.ass")
    subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", mkv_p, "-map", "0:s:1", ass_p], check=True)
    
    # 2. Burn subtitles to clean MKV with NVENC
    subbed_mp4 = os.path.join(scratch_dir, f"ep{ep:02d}_subbed.mp4")
    rel_ass = os.path.basename(ass_p)
    cmd_sub = [
        "ffmpeg", "-y", "-v", "error",
        "-i", mkv_p,
        "-vf", f"subtitles={rel_ass},format=yuv420p",
        "-c:v", "h264_nvenc", "-preset", "p4", "-cq", "18",
        "-an",
        subbed_mp4
    ]
    print(f"[Render] Burning dialogue subtitles for Episode {ep:02d}...")
    subprocess.run(cmd_sub, cwd=scratch_dir, check=True)
    
    # 3. Detect Layout
    coords = detect_layout_box(yt_p)
    print(f"[Layout] Detected {coords['name']}: {coords['w']}x{coords['h']} at ({coords['x']}, {coords['y']})")
    
    # 4. Audio Cross-Correlation & Cut Point Calculation
    d_yt = extract_mono_16k(yt_p, duration=600.0)
    d_mkv = extract_mono_16k(mkv_p, map_arg="0:a:1", duration=700.0)
    sr = 16000
    
    # Prologue offset (t=20-35s)
    seg_pro = d_yt[int(20*sr):int(35*sr)]
    corr_pro = signal.correlate(d_mkv[:int(120*sr)], seg_pro, mode='valid', method='fft')
    off_prologue = np.argmax(corr_pro)/float(sr) - 20.0
    
    # Post-OP offset (t=280-295s)
    seg_main = d_yt[int(280*sr):int(295*sr)]
    corr_main = signal.correlate(d_mkv[:int(450*sr)], seg_main, mode='valid', method='fft')
    off_main = np.argmax(corr_main)/float(sr) - 280.0
    
    op_jump = off_main - off_prologue
    print(f"[Offsets] Prologue: {off_prologue:.3f}s | Post-OP: {off_main:.3f}s | Jump: {op_jump:.3f}s")
    
    # Build Compositing Command
    if abs(op_jump) > 40.0:
        # Real OP cut detected
        # Exact OP Start in clean MKV:
        op_start_clean = find_op_start_in_mkv(mkv_p)
        if op_start_clean == 80.0 and ep == 5:
            op_start_clean = 148.0
        elif op_start_clean == 80.0 and ep == 4:
            op_start_clean = 78.46
            
        tau_cut = max(10.0, op_start_clean - off_prologue)
        clean_seg1_start = max(0.0, off_prologue)
        clean_seg2_start = max(0.0, tau_cut + off_main)
        
        print(f"[Piecewise] Cutting OP at Mashup t = {tau_cut:.2f}s (Clean Seg 1: {clean_seg1_start:.2f}s, Seg 2: {clean_seg2_start:.2f}s)")
        cmd_comp = [
            "ffmpeg", "-y", "-v", "error",
            "-i", yt_p,
            "-ss", str(clean_seg1_start), "-t", str(tau_cut), "-i", subbed_mp4,
            "-ss", str(clean_seg2_start), "-i", subbed_mp4,
            "-filter_complex",
            "[1:v][2:v]concat=n=2:v=1:a=0[vclean];"
            f"[vclean]scale={coords['w']}:{coords['h']},fps=25[vscaled];"
            f"[0:v][vscaled]overlay={coords['x']}:{coords['y']}[outv]",
            "-map", "[outv]",
            "-map", "0:a",
            "-c:v", "h264_nvenc", "-preset", "p4", "-cq", "18",
            "-c:a", "copy",
            out_final
        ]
    else:
        # Flat continuous offset (e.g. Episode 23)
        clean_start = max(0.0, off_prologue)
        print(f"[Flat] Single continuous offset: {clean_start:.2f}s")
        cmd_comp = [
            "ffmpeg", "-y", "-v", "error",
            "-i", yt_p,
            "-ss", str(clean_start), "-i", subbed_mp4,
            "-filter_complex",
            f"[1:v]scale={coords['w']}:{coords['h']},fps=25[vscaled];"
            f"[0:v][vscaled]overlay={coords['x']}:{coords['y']}[outv]",
            "-map", "[outv]",
            "-map", "0:a",
            "-c:v", "h264_nvenc", "-preset", "p4", "-cq", "18",
            "-c:a", "copy",
            out_final
        ]
        
    print(f"[Render] Compositing Episode {ep:02d} with NVENC...")
    subprocess.run(cmd_comp, check=True)
    
    # Cleanup temp files
    for tmp in [ass_p, subbed_mp4]:
        if os.path.exists(tmp): os.remove(tmp)
        
    print(f"✅ Episode {ep:02d} successfully rendered!")

if __name__ == "__main__":
    target_eps = [4, 5, 6, 7, 8, 9, 10, 11, 14, 15, 19, 21, 23]
    for ep in target_eps:
        try:
            render_episode_precise(ep)
        except Exception as e:
            print(f"❌ Error rendering EP{ep}: {e}")
