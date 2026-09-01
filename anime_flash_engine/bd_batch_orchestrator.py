import os
import sys
import json
import time
import subprocess
import libtorrent as lt
from typing import Dict, Any

base_dir = "c:/Users/SkyDr/Documents/antigravity/excited-pythagoras"
sys.path.append(base_dir)

from anime_flash_engine.sync_engine import SyncEngine
from anime_flash_engine.layout_detector import LayoutDetector
from anime_flash_engine.gpu_compositor import GPUCompositor
from anime_flash_engine.scoring_verifier import ScoringVerifier

output_dir = os.path.join(base_dir, "clean_reaction_mashups")
scratch_dir = "C:/Users/SkyDr/.gemini/antigravity/brain/4b5e0564-4902-4c06-8ca2-c8138fc2182e/scratch"
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
# 26 files total: S01E01 to S01E23 + Specials
TORRENT_EP_MAP = {
    1: 22, 2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 7: 6, 8: 7, 9: 8, 10: 9, 11: 10,
    12: 12, 13: 13, 14: 14, 15: 15, 16: 16, 17: 17, 18: 18, 19: 20, 20: 21,
    21: 0, 22: 24, 23: 25
}

class BDBatchOrchestrator:
    def __init__(self):
        self.torrent_file = os.path.join(scratch_dir, "ember_86_batch.torrent")
        self.ember_download_dir = os.path.join(scratch_dir, "ember_episodes")
        self.detector = LayoutDetector(work_dir=scratch_dir)
        self.sync = SyncEngine(work_dir=scratch_dir)
        self.compositor = GPUCompositor(work_dir=scratch_dir)
        self.verifier = ScoringVerifier(work_dir=scratch_dir)

    def download_bd_episode(self, ep_num: int) -> str:
        """Download high-speed 1080p BDRip episode via libtorrent."""
        file_idx = TORRENT_EP_MAP[ep_num]
        ses = lt.session()
        ses.listen_on(6881, 6891)
        info = lt.torrent_info(self.torrent_file)
        
        rel_path = info.files().file_path(file_idx)
        full_path = os.path.join(self.ember_download_dir, rel_path)
        
        if os.path.exists(full_path) and os.path.getsize(full_path) == info.files().file_size(file_idx):
            print(f"[Torrent] Episode {ep_num:02d} already downloaded ({os.path.getsize(full_path)/(1024*1024):.1f} MB).")
            return full_path

        h = ses.add_torrent({'save_path': self.ember_download_dir, 'ti': info})
        priorities = [0] * info.num_files()
        priorities[file_idx] = 7
        h.prioritize_files(priorities)

        print(f"[Torrent] Downloading 1080p BDRip Episode {ep_num:02d} ({info.files().file_name(file_idx)})...")
        while not h.status().is_seeding:
            s = h.status()
            fp = h.file_progress()
            done = fp[file_idx]
            total = info.files().file_size(file_idx)
            pct = (done / total) * 100.0 if total > 0 else 0
            if pct >= 100.0:
                break
            time.sleep(1.0)

        print(f"[Torrent] Episode {ep_num:02d} BDRip Download Complete!")
        return full_path

    def download_yt_1080p(self, ep_num: int) -> str:
        """Download True 1080p YouTube mashup video using Deno JS challenge solver."""
        yt_url = YT_EPISODE_URLS[ep_num]
        out_video = os.path.join(scratch_dir, f"ep{ep_num:02d}_yt_1080p.mp4")
        if os.path.exists(out_video) and os.path.getsize(out_video) > 50*1024*1024:
            return out_video

        print(f"[YouTube] Downloading true 1080p YouTube mashup for Episode {ep_num:02d}...")
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

    def process_episode(self, ep_num: int) -> Dict[str, Any]:
        t0 = time.time()
        print(f"\n=======================================================")
        print(f"🎬 PROCESSING EPISODE {ep_num:02d} / 23 (Full BDRip 1080p Master)")
        print(f"=======================================================")

        final_out = os.path.join(output_dir, f"86_Eighty_Six_EP{ep_num:02d}_Clean_Reaction.mp4")

        # 1. Download clean 1080p BDRip + 1080p YouTube mashup
        bd_mkv = self.download_bd_episode(ep_num)
        yt_mp4 = self.download_yt_1080p(ep_num)

        # 2. Extract Japanese audio and English ASS subtitles
        ext_wav = os.path.join(scratch_dir, f"ep{ep_num:02d}_bd_audio.wav")
        ext_ass = os.path.join(scratch_dir, f"ep{ep_num:02d}_bd_subs.ass")
        subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", bd_mkv, "-map", "0:a:1", "-ac", "1", "-ar", "16000", ext_wav], check=True)
        subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", bd_mkv, "-map", "0:s:0", ext_ass], check=True)

        # 3. Detect Layout
        coords = self.detector.detect_coordinates(yt_mp4)
        print(f"[Pipeline] Layout: {coords}")

        # 4. Audio Cross-Correlation Alignment
        offset_sec = self.sync.compute_offset(yt_mp4, ext_wav)
        print(f"[Pipeline] Audio Offset: {offset_sec:.3f}s")

        # 5. Fast GPU NVENC pre-subbing with relative ASS path
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
        subprocess.run(cmd_sub, cwd=scratch_dir, check=True)

        # 6. Fast GPU NVENC Final Compositing
        self.compositor.composite_reaction(yt_mp4, subbed_mp4, offset_sec, coords, final_out)

        # 7. Quality Audit & Drift Verification
        score_rep = self.verifier.score_episode(ep_num, final_out, ext_wav, offset_sec)

        # 8. Clean up intermediate scratch files
        for tmp in [ext_wav, ext_ass, subbed_mp4, yt_mp4]:
            try:
                if os.path.exists(tmp): os.remove(tmp)
            except: pass

        elapsed = time.time() - t0
        score_rep["elapsed_seconds"] = round(elapsed, 1)
        print(f"✅ EPISODE {ep_num:02d} COMPLETE in {elapsed:.1f}s | Score: {score_rep['overall_score']}/100 | Status: {score_rep['status']}")
        return score_rep

if __name__ == "__main__":
    orchestrator = BDBatchOrchestrator()
    if len(sys.argv) > 1:
        target_ep = int(sys.argv[1])
        rep = orchestrator.process_episode(target_ep)
        print(json.dumps(rep, indent=2))
