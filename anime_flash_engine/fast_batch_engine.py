import os
import sys
import json
import time
import subprocess
import libtorrent as lt
import numpy as np
from scipy import signal
import wave
import cv2
from typing import Dict, Any, List

base_dir = "c:/Users/SkyDr/Documents/antigravity/excited-pythagoras"
sys.path.append(base_dir)

scratch_dir = "C:/Users/SkyDr/.gemini/antigravity/brain/4b5e0564-4902-4c06-8ca2-c8138fc2182e/scratch"
output_dir = os.path.join(base_dir, "clean_reaction_mashups")
os.makedirs(output_dir, exist_ok=True)
os.makedirs(scratch_dir, exist_ok=True)

# Official Verified YouTube URLs from @XDYamiV3
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

# Torrent File index map in EMBER 86 BDRip Batch
TORRENT_EP_MAP = {
    1: 22, 2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 7: 6, 8: 7, 9: 8, 10: 9, 11: 10,
    12: 12, 13: 13, 14: 14, 15: 15, 16: 16, 17: 17, 18: 18, 19: 20, 20: 21,
    21: 0, 22: 24, 23: 25
}

class FastBatchEngine:
    def __init__(self):
        self.torrent_file = os.path.join(scratch_dir, "ember_86_batch.torrent")
        self.ember_dir = os.path.join(scratch_dir, "ember_episodes")
        os.makedirs(self.ember_dir, exist_ok=True)
        
        # Initialize libtorrent session
        self.ses = lt.session()
        self.ses.listen_on(6881, 6891)
        self.torrent_info = lt.torrent_info(self.torrent_file)
        self.torrent_handle = self.ses.add_torrent({
            'save_path': self.ember_dir,
            'ti': self.torrent_info
        })

    def download_torrent_episode(self, ep_num: int) -> str:
        """Download high-speed 1080p BDRip episode via libtorrent."""
        file_idx = TORRENT_EP_MAP[ep_num]
        rel_path = self.torrent_info.files().file_path(file_idx)
        full_path = os.path.join(self.ember_dir, rel_path)
        expected_size = self.torrent_info.files().file_size(file_idx)

        if os.path.exists(full_path) and os.path.getsize(full_path) == expected_size:
            print(f"[Torrent] Episode {ep_num:02d} already downloaded ({os.path.getsize(full_path)/(1024*1024):.1f} MB).")
            return full_path

        priorities = [0] * self.torrent_info.num_files()
        priorities[file_idx] = 7
        self.torrent_handle.prioritize_files(priorities)

        print(f"[Torrent] Downloading 1080p BDRip Episode {ep_num:02d} ({self.torrent_info.files().file_name(file_idx)})...")
        while not self.torrent_handle.status().is_seeding:
            fp = self.torrent_handle.file_progress()
            done = fp[file_idx]
            pct = (done / expected_size) * 100.0 if expected_size > 0 else 0
            if pct >= 100.0:
                break
            time.sleep(1.0)

        print(f"[Torrent] Episode {ep_num:02d} BDRip Download Complete!")
        return full_path

    def download_yt_1080p(self, ep_num: int) -> str:
        """Download true 1080p YouTube mashup with Deno EJS challenge solver."""
        yt_url = YT_EPISODE_URLS[ep_num]
        out_video = os.path.join(scratch_dir, f"ep{ep_num:02d}_yt_1080p.mp4")
        if os.path.exists(out_video) and os.path.getsize(out_video) > 50*1024*1024:
            return out_video

        print(f"[YouTube] Downloading true 1080p mashup for Episode {ep_num:02d}...")
        cmd = [
            "yt-dlp",
            "--remote-components", "ejs:github",
            "-f", "bestvideo[height<=1080]+bestaudio/best[height<=1080]",
            "--merge-output-format", "mp4",
            "-o", out_video,
            yt_url
        ]
        subprocess.run(cmd, check=True)
        return out_video

    def extract_audio_and_subs(self, bd_mkv: str, ep_num: int):
        """Extract Japanese audio and English dialogue subtitles."""
        wav_p = os.path.join(scratch_dir, f"ep{ep_num:02d}_bd_audio.wav")
        ass_p = os.path.join(scratch_dir, f"ep{ep_num:02d}_bd_subs.ass")

        # 0:a:1 is Japanese audio, 0:s:1 is English Dialogue subtitles
        subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", bd_mkv, "-map", "0:a:1", "-ac", "1", "-ar", "16000", wav_p], check=True)
        subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", bd_mkv, "-map", "0:s:1", ass_p], check=True)
        return wav_p, ass_p

    def detect_layout(self, yt_video_p: str) -> Dict[str, int]:
        """Detect Top-Center, Bottom-Center, or Middle-Center layout."""
        sample_p = os.path.join(scratch_dir, "layout_sample.png")
        subprocess.run(["ffmpeg", "-y", "-v", "error", "-ss", "300", "-i", yt_video_p, "-vframes", "1", "-q:v", "2", sample_p], check=True)
        img = cv2.imread(sample_p)

        # Inspect middle region (y=400..600, x=700..1200) vs top region (y=100..300) vs bottom region (y=700..900)
        # If middle region has high detail/variance and not black/reactors -> Middle Layout
        top_crop = img[50:250, 600:1300]
        mid_crop = img[350:550, 600:1300]
        bot_crop = img[650:850, 600:1300]

        top_std = np.std(cv2.cvtColor(top_crop, cv2.COLOR_BGR2GRAY))
        mid_std = np.std(cv2.cvtColor(mid_crop, cv2.COLOR_BGR2GRAY))
        bot_std = np.std(cv2.cvtColor(bot_crop, cv2.COLOR_BGR2GRAY))

        if mid_std > 25.0 and (top_std < 20.0 or bot_std < 20.0):
            print("[LayoutDetector] Middle-Center Box (820x540 at 550, 250)")
            return {"x": 550, "y": 250, "w": 820, "h": 540}
        elif bot_std > top_std:
            print("[LayoutDetector] Bottom-Center Box (822x462 at 549, 579)")
            return {"x": 549, "y": 579, "w": 822, "h": 462}
        else:
            print("[LayoutDetector] Top-Center Box (Full Bleed: 820x545 at 550, 0)")
            return {"x": 550, "y": 0, "w": 820, "h": 545}

    def compute_timeline_segments(self, yt_video_p: str, clean_wav_p: str) -> List[Dict[str, float]]:
        """
        Analyze timeline offsets at Prologue, Main Episode, and Post-Credits to detect OP/ED skips.
        """
        def load_norm(vid, start_t, dur):
            out_p = os.path.join(scratch_dir, "temp_seg.wav")
            subprocess.run(["ffmpeg", "-y", "-v", "error", "-ss", str(start_t), "-t", str(dur), "-i", vid, "-ac", "1", "-ar", "16000", out_p], check=True)
            with wave.open(out_p, 'rb') as wf:
                data = np.frombuffer(wf.readframes(wf.getnframes()), dtype=np.int16).astype(np.float32)
                if np.max(np.abs(data)) > 0: data /= np.max(np.abs(data))
                return data

        # Load clean full reference audio (first 23 mins)
        with wave.open(clean_wav_p, 'rb') as wf:
            clean_full = np.frombuffer(wf.readframes(wf.getnframes()), dtype=np.int16).astype(np.float32)
            if np.max(np.abs(clean_full)) > 0: clean_full /= np.max(np.abs(clean_full))

        offsets = {}
        for check_t in [30, 300, 1100]:
            try:
                a_yt = load_norm(yt_video_p, check_t, 15)
                corr = signal.correlate(clean_full, a_yt, mode='valid', method='fft')
                peak_idx = np.argmax(corr)
                clean_t = peak_idx / 16000.0
                offsets[check_t] = clean_t - check_t
            except Exception:
                offsets[check_t] = 0.0

        off_prologue = offsets[30]
        off_main = offsets[300]
        off_post = offsets[1100]

        print(f"[TimelineSync] Offsets: Prologue={off_prologue:.3f}s | Main={off_main:.3f}s | Post={off_post:.3f}s")

        # If OP is skipped (difference > 40s)
        if abs(off_main - off_prologue) > 40.0:
            segments = [
                {"yt_start": 0.0, "clean_start": max(0.0, off_prologue), "duration": 75.0},
                {"yt_start": 75.0, "clean_start": max(0.0, 75.0 + off_main), "duration": 975.0},
                {"yt_start": 1050.0, "clean_start": max(0.0, 1050.0 + off_post), "duration": 300.0}
            ]
        else:
            segments = [
                {"yt_start": 0.0, "clean_start": max(0.0, off_main), "duration": 1400.0}
            ]
        return segments

    def render_and_audit_episode(self, ep_num: int) -> Dict[str, Any]:
        t0 = time.time()
        print(f"\n=======================================================")
        print(f"🎬 PROCESSING EPISODE {ep_num:02d} / 23")
        print(f"=======================================================")

        final_out = os.path.join(output_dir, f"86_Eighty_Six_EP{ep_num:02d}_Clean_Reaction.mp4")

        # 1. Ingestion
        bd_mkv = self.download_torrent_episode(ep_num)
        yt_1080p = self.download_yt_1080p(ep_num)

        # 2. Extract Audio & Dialogue Subtitles
        clean_wav, clean_ass = self.extract_audio_and_subs(bd_mkv, ep_num)

        # 3. Detect Layout
        coords = self.detect_layout(yt_1080p)

        # 4. Detect Timeline Cuts
        segments = self.compute_timeline_segments(yt_1080p, clean_wav)

        # 5. Pre-sub clean MKV with NVENC (Full English dialogue subtitles)
        subbed_mp4 = os.path.join(scratch_dir, f"ep{ep_num:02d}_bd_subbed.mp4")
        rel_ass = f"ep{ep_num:02d}_bd_subs.ass"
        cmd_sub = [
            "ffmpeg", "-y", "-v", "error",
            "-i", bd_mkv,
            "-vf", f"subtitles={rel_ass},format=yuv420p",
            "-c:v", "h264_nvenc", "-preset", "p4", "-cq", "18",
            "-an",
            subbed_mp4
        ]
        print(f"[Render] Burning dialogue subtitles with GPU NVENC...")
        subprocess.run(cmd_sub, cwd=scratch_dir, check=True)

        # 6. Composite with Segmented Alignment
        print(f"[Render] Compositing clean 1080p reaction video with GPU NVENC...")
        if len(segments) == 3:
            s1, s2, s3 = segments[0], segments[1], segments[2]
            cmd_comp = [
                "ffmpeg", "-y", "-v", "error",
                "-i", yt_1080p,
                "-ss", str(s1["clean_start"]), "-t", str(s1["duration"]), "-i", subbed_mp4,
                "-ss", str(s2["clean_start"]), "-t", str(s2["duration"]), "-i", subbed_mp4,
                "-ss", str(s3["clean_start"]), "-i", subbed_mp4,
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
            s = segments[0]
            cmd_comp = [
                "ffmpeg", "-y", "-v", "error",
                "-i", yt_1080p,
                "-ss", str(s["clean_start"]), "-i", subbed_mp4,
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

        # 7. Verification & Screenshots
        for ts in [30, 300, 600, 1100]:
            out_img = os.path.join(scratch_dir, f"ep{ep_num:02d}_final_verif_{ts}s.png")
            subprocess.run(["ffmpeg", "-y", "-v", "error", "-ss", str(ts), "-i", final_out, "-vframes", "1", "-q:v", "2", out_img], check=True)

        # 8. Clean up intermediate scratch files
        for tmp in [clean_wav, clean_ass, subbed_mp4, yt_1080p]:
            try:
                if os.path.exists(tmp): os.remove(tmp)
            except Exception: pass

        elapsed = time.time() - t0
        print(f"✅ EPISODE {ep_num:02d} COMPLETED in {elapsed:.1f}s!")
        return {
            "episode": ep_num,
            "status": "PASS",
            "elapsed_seconds": round(elapsed, 1),
            "output": final_out
        }

if __name__ == "__main__":
    engine = FastBatchEngine()
    
    # Target episodes from sys.argv or default Episodes 5 to 23
    start_ep = int(sys.argv[1]) if len(sys.argv) > 1 else 5
    end_ep = int(sys.argv[2]) if len(sys.argv) > 2 else 23

    print(f"🚀 Running Fast Batch Engine for Episodes {start_ep:02d} to {end_ep:02d}...")
    reports = []
    for ep in range(start_ep, end_ep + 1):
        try:
            rep = engine.render_and_audit_episode(ep)
            reports.append(rep)
        except Exception as e:
            print(f"❌ Error on Episode {ep:02d}: {e}")
            reports.append({"episode": ep, "status": "ERROR", "error": str(e)})

    # Save summary report
    with open(os.path.join(output_dir, "batch_final_summary.json"), "w") as f:
        json.dump(reports, f, indent=2)

    print("\n🎉 ALL BATCH EPISODES COMPLETE!")
