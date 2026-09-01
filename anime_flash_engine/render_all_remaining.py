import os
import sys
import json
import time
import subprocess
import cv2
import numpy as np
from scipy import signal
import wave

base_dir = "c:/Users/SkyDr/Documents/antigravity/excited-pythagoras"
if base_dir not in sys.path:
    sys.path.append(base_dir)

scratch_dir = "C:/Users/SkyDr/.gemini/antigravity/brain/4b5e0564-4902-4c06-8ca2-c8138fc2182e/scratch"
output_dir = os.path.join(base_dir, "clean_reaction_mashups")
ember_dir = os.path.join(scratch_dir, "ember_episodes")

YT_EPISODE_URLS = {
    1: "https://www.youtube.com/watch?v=geW06bqw13U",
    2: "https://www.youtube.com/watch?v=grap2lHknDM",
    3: "https://www.youtube.com/watch?v=AMFbNEB5aqI",
    4: "https://www.youtube.com/watch?v=E3K41tiNZPc",
    5: "https://www.youtube.com/watch?v=i725iVL4ug0",
    6: "https://www.youtube.com/watch?v=eAlFpZpr4Wk",
    7: "https://www.youtube.com/watch?v=0_ukYCzyHCA",
    8: "https://www.youtube.com/watch?v=kUd-Ftn7zGY",
    9: "https://www.youtube.com/watch?v=ZGUnY7mBNhg",
    10: "https://www.youtube.com/watch?v=rgbGQ1oyIcs",
    11: "https://www.youtube.com/watch?v=_aI8JVs3Lc4",
    12: "https://www.youtube.com/watch?v=YzS0mCVDs8E",
    13: "https://www.youtube.com/watch?v=g5S2dCzRhVU",
    14: "https://www.youtube.com/watch?v=8aL1YBUmlYc",
    15: "https://www.youtube.com/watch?v=RAprpDhBIKE",
    16: "https://www.youtube.com/watch?v=WJodVmgznHE",
    17: "https://www.youtube.com/watch?v=9tv2RumS_TQ",
    18: "https://www.youtube.com/watch?v=2qzILrzw23k",
    19: "https://www.youtube.com/watch?v=2KO8wx4BkNs",
    20: "https://www.youtube.com/watch?v=HSNipNfM1W0",
    21: "https://www.youtube.com/watch?v=NzFa35h-IkM",
    22: "https://www.youtube.com/watch?v=c-nJ0H5QlMU",
    23: "https://www.youtube.com/watch?v=v-mEsj6GIFs"
}

def find_mkv(ep: int) -> str:
    for root, dirs, files in os.walk(ember_dir):
        for f in files:
            if f.startswith(f"S01E{ep:02d}") and f.endswith(".mkv"):
                return os.path.join(root, f)
    raise FileNotFoundError(f"MKV for Episode {ep} not found in {ember_dir}")

def get_yt_1080p(ep: int) -> str:
    out_p = os.path.join(scratch_dir, f"ep{ep:02d}_yt_1080p.mp4")
    if os.path.exists(out_p) and os.path.getsize(out_p) > 100*1024*1024:
        return out_p
    
    url = YT_EPISODE_URLS[ep]
    print(f"[YouTube] Downloading true 1080p mashup for Episode {ep:02d}...")
    cmd = [
        "yt-dlp",
        "--remote-components", "ejs:github",
        "-f", "bestvideo[height<=1080]+bestaudio/best[height<=1080]/best",
        "--merge-output-format", "mp4",
        "-o", out_p,
        url
    ]
    subprocess.run(cmd, check=True)
    return out_p

def process_episode(ep: int):
    t0 = time.time()
    print(f"\n=======================================================")
    print(f"🎬 PROCESSING EPISODE {ep:02d} / 23")
    print(f"=======================================================")

    final_out = os.path.join(output_dir, f"86_Eighty_Six_EP{ep:02d}_Clean_Reaction.mp4")
    mkv_path = find_mkv(ep)
    yt_path = get_yt_1080p(ep)

    print(f"[Input] MKV: {os.path.basename(mkv_path)}")
    print(f"[Input] YouTube: {os.path.basename(yt_path)} ({os.path.getsize(yt_path)/(1024*1024):.1f} MB)")

    # 1. Extract Master Audio and Dialogue Subtitles
    wav_p = os.path.join(scratch_dir, f"ep{ep:02d}_bd_audio.wav")
    ass_p = os.path.join(scratch_dir, f"ep{ep:02d}_bd_subs.ass")
    subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", mkv_path, "-map", "0:a:1", "-ac", "1", "-ar", "16000", wav_p], check=True)
    subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", mkv_path, "-map", "0:s:1", ass_p], check=True)

    # 2. Layout Detection
    sample_p = os.path.join(scratch_dir, f"layout_sample_{ep}.png")
    subprocess.run(["ffmpeg", "-y", "-v", "error", "-ss", "300", "-i", yt_path, "-vframes", "1", "-q:v", "2", sample_p], check=True)
    img = cv2.imread(sample_p)

    top_crop = img[50:250, 600:1300]
    mid_crop = img[350:550, 600:1300]
    bot_crop = img[650:850, 600:1300]

    top_std = np.std(cv2.cvtColor(top_crop, cv2.COLOR_BGR2GRAY))
    mid_std = np.std(cv2.cvtColor(mid_crop, cv2.COLOR_BGR2GRAY))
    bot_std = np.std(cv2.cvtColor(bot_crop, cv2.COLOR_BGR2GRAY))

    if mid_std > 25.0 and (top_std < 20.0 or bot_std < 20.0):
        coords = {"x": 550, "y": 250, "w": 820, "h": 540}
        print(f"[Layout] Middle-Center Box (820x540 at 550, 250)")
    elif bot_std > top_std:
        coords = {"x": 549, "y": 579, "w": 822, "h": 462}
        print(f"[Layout] Bottom-Center Box (822x462 at 549, 579)")
    else:
        coords = {"x": 550, "y": 0, "w": 820, "h": 545}
        print(f"[Layout] Top-Center Box (Full-Bleed: 820x545 at 550, 0)")

    # 3. Audio Timeline Sync
    def load_norm(vid, start_t, dur):
        out_p = os.path.join(scratch_dir, f"temp_{ep}_{start_t}.wav")
        subprocess.run(["ffmpeg", "-y", "-v", "error", "-ss", str(start_t), "-t", str(dur), "-i", vid, "-ac", "1", "-ar", "16000", out_p], check=True)
        with wave.open(out_p, 'rb') as wf:
            data = np.frombuffer(wf.readframes(wf.getnframes()), dtype=np.int16).astype(np.float32)
            if np.max(np.abs(data)) > 0: data /= np.max(np.abs(data))
            return data

    with wave.open(wav_p, 'rb') as wf:
        clean_full = np.frombuffer(wf.readframes(wf.getnframes()), dtype=np.int16).astype(np.float32)
        if np.max(np.abs(clean_full)) > 0: clean_full /= np.max(np.abs(clean_full))

    offsets = {}
    for check_t in [30, 300, 1100]:
        try:
            a_yt = load_norm(yt_path, check_t, 15)
            corr = signal.correlate(clean_full, a_yt, mode='valid', method='fft')
            peak_idx = np.argmax(corr)
            clean_t = peak_idx / 16000.0
            offsets[check_t] = clean_t - check_t
        except Exception:
            offsets[check_t] = 0.0

    off_prologue = offsets[30]
    off_main = offsets[300]
    off_post = offsets[1100]
    print(f"[Sync] Prologue={off_prologue:.3f}s | Main={off_main:.3f}s | Post={off_post:.3f}s")

    # 4. Burn Dialogue Subtitles to pristine BDRip
    subbed_mp4 = os.path.join(scratch_dir, f"ep{ep:02d}_subbed_temp.mp4")
    cmd_sub = [
        "ffmpeg", "-y", "-v", "error",
        "-i", mkv_path,
        "-vf", f"subtitles=ep{ep:02d}_bd_subs.ass,format=yuv420p",
        "-c:v", "h264_nvenc", "-preset", "p4", "-cq", "18",
        "-an",
        subbed_mp4
    ]
    print("[Render] Burning English dialogue subtitles with NVENC...")
    subprocess.run(cmd_sub, cwd=scratch_dir, check=True)

    # 5. Composite Final Output
    print("[Render] Compositing reaction video with GPU NVENC...")
    if abs(off_main - off_prologue) > 40.0:
        cmd_comp = [
            "ffmpeg", "-y", "-v", "error",
            "-i", yt_path,
            "-ss", str(max(0.0, off_prologue)), "-t", "75", "-i", subbed_mp4,
            "-ss", str(max(0.0, 75.0 + off_main)), "-t", "975", "-i", subbed_mp4,
            "-ss", str(max(0.0, 1050.0 + off_post)), "-i", subbed_mp4,
            "-filter_complex",
            f"[1:v][2:v][3:v]concat=n=3:v=1:a=0[vclean];"
            f"[vclean]scale={coords['w']}:{coords['h']},fps=25[vscaled];"
            f"[0:v][vscaled]overlay={coords['x']}:{coords['y']}[outv]",
            "-map", "[outv]",
            "-map", "0:a",
            "-c:v", "h264_nvenc", "-preset", "p4", "-cq", "18",
            "-c:a", "copy",
            final_out
        ]
    else:
        cmd_comp = [
            "ffmpeg", "-y", "-v", "error",
            "-i", yt_path,
            "-ss", str(max(0.0, off_main)), "-i", subbed_mp4,
            "-filter_complex",
            f"[1:v]scale={coords['w']}:{coords['h']},fps=25[vscaled];"
            f"[0:v][vscaled]overlay={coords['x']}:{coords['y']}[outv]",
            "-map", "[outv]",
            "-map", "0:a",
            "-c:v", "h264_nvenc", "-preset", "p4", "-cq", "18",
            "-c:a", "copy",
            final_out
        ]
    subprocess.run(cmd_comp, check=True)

    # Verification Screenshots
    for ts in [30, 300, 600, 1100]:
        out_img = os.path.join(scratch_dir, f"ep{ep:02d}_verif_{ts}s.png")
        subprocess.run(["ffmpeg", "-y", "-v", "error", "-ss", str(ts), "-i", final_out, "-vframes", "1", "-q:v", "2", out_img], check=True)

    # Cleanup temp video
    if os.path.exists(subbed_mp4): os.remove(subbed_mp4)
    if os.path.exists(yt_path): os.remove(yt_path)

    elapsed = time.time() - t0
    print(f"✅ EPISODE {ep:02d} FINISHED in {elapsed:.1f}s -> {final_out}")

if __name__ == "__main__":
    episodes_to_run = [7, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
    for ep in episodes_to_run:
        try:
            process_episode(ep)
        except Exception as e:
            print(f"❌ Error on Episode {ep}: {e}")
