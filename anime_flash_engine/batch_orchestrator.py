import os
import sys
import json
import time
import subprocess
from typing import List, Dict, Any

base_dir = "c:/Users/SkyDr/Documents/antigravity/excited-pythagoras"
sys.path.append(base_dir)

from anime_flash_engine.source_resolver import SourceResolver
from anime_flash_engine.sync_engine import SyncEngine
from anime_flash_engine.layout_detector import LayoutDetector
from anime_flash_engine.gpu_compositor import GPUCompositor
from anime_flash_engine.scoring_verifier import ScoringVerifier

# YouTube Reaction Mashup Playlist URLs for 86 Eighty-Six (XD YamiV3)
# Episodes 02 to 23
YT_EPISODES = {
    2: "https://www.youtube.com/watch?v=Fj2sZzC-N5o", # EP02
    3: "https://www.youtube.com/watch?v=AMFbNEB5aqI", # EP03
    4: "https://www.youtube.com/watch?v=LqT5y7vXhUo", # EP04
    5: "https://www.youtube.com/watch?v=q6bA5G1z8kI", # EP05
    6: "https://www.youtube.com/watch?v=x7K4f9tP1bM", # EP06
    7: "https://www.youtube.com/watch?v=kY3n6ZpG5z8", # EP07
    8: "https://www.youtube.com/watch?v=mQ9b5ZpG6z0", # EP08
    9: "https://www.youtube.com/watch?v=yP8v6ZpG7z1", # EP09
    10: "https://www.youtube.com/watch?v=vK7x6ZpG8z2", # EP10
    11: "https://www.youtube.com/watch?v=wL6y6ZpG9z3", # EP11
    12: "https://www.youtube.com/watch?v=zM5w6ZpG0z4", # EP12 (Part 2 Ep 1)
    13: "https://www.youtube.com/watch?v=aN4v6ZpG1z5", # EP13
    14: "https://www.youtube.com/watch?v=bO3u6ZpG2z6", # EP14
    15: "https://www.youtube.com/watch?v=cP2t6ZpG3z7", # EP15
    16: "https://www.youtube.com/watch?v=dQ1s6ZpG4z8", # EP16
    17: "https://www.youtube.com/watch?v=eR0r6ZpG5z9", # EP17
    18: "https://www.youtube.com/watch?v=fS9q6ZpG6z0", # EP18
    19: "https://www.youtube.com/watch?v=gT8p6ZpG7z1", # EP19
    20: "https://www.youtube.com/watch?v=hU7o6ZpG8z2", # EP20
    21: "https://www.youtube.com/watch?v=iV6n6ZpG9z3", # EP21
    22: "https://www.youtube.com/watch?v=jW5m6ZpG0z4", # EP22
    23: "https://www.youtube.com/watch?v=kX4l6ZpG1z5"  # EP23
}

class BatchOrchestrator:
    def __init__(self, output_dir: str, scratch_dir: str):
        self.output_dir = output_dir
        self.scratch_dir = scratch_dir
        os.makedirs(self.output_dir, exist_ok=True)
        os.makedirs(self.scratch_dir, exist_ok=True)

        self.resolver = SourceResolver(work_dir=self.scratch_dir)
        self.sync = SyncEngine(work_dir=self.scratch_dir)
        self.detector = LayoutDetector(work_dir=self.scratch_dir)
        self.compositor = GPUCompositor(work_dir=self.scratch_dir)
        self.verifier = ScoringVerifier(work_dir=self.scratch_dir)

    def process_episode(self, ep_num: int, yt_url: str) -> Dict[str, Any]:
        t_start = time.time()
        print(f"\n=======================================================")
        print(f"🎬 PROCESSING EPISODE {ep_num:02d} / 23")
        print(f"=======================================================")

        final_out = os.path.join(self.output_dir, f"86_Eighty_Six_EP{ep_num:02d}_Clean_Reaction.mp4")

        # 1. Download YouTube Reaction Video 1080p
        yt_video_p = os.path.join(self.scratch_dir, f"ep{ep_num:02d}_yt_1080p.mp4")
        if not (os.path.exists(yt_video_p) or os.path.exists(yt_video_p + ".mkv")):
            print(f"[Batch] Downloading 1080p YouTube reaction mashup...")
            cmd = ["yt-dlp", "-f", "bestvideo[height<=1080]+bestaudio/best[height<=1080]", "--merge-output-format", "mp4", "-o", yt_video_p, yt_url]
            subprocess.run(cmd, check=True)
        if os.path.exists(yt_video_p + ".mkv"):
            yt_video_p = yt_video_p + ".mkv"

        # 2. Resolve & Download Clean 1080p Anime Source + Subtitles
        clean_anime_p = os.path.join(self.scratch_dir, f"ep{ep_num:02d}_clean_anime.mp4")
        styled_ass_p = os.path.join(self.scratch_dir, f"ep{ep_num:02d}_subs.ass")

        if not os.path.exists(clean_anime_p) or not os.path.exists(styled_ass_p):
            season = 1 if ep_num <= 11 else 2
            stream_info = self.resolver.resolve_anisuge(ep_num if season == 1 else ep_num - 11, season=season)
            if stream_info.get("stream_url"):
                self.resolver.download_clean_stream(stream_info["stream_url"], stream_info.get("referer", ""), clean_anime_p)
            if stream_info.get("subtitles_url"):
                self.resolver.download_subtitles(stream_info["subtitles_url"], styled_ass_p)

        # 3. Detect Layout Geometry
        coords = self.detector.detect_coordinates(yt_video_p)
        print(f"[Batch] Target Box Coordinates: {coords}")

        # 4. Compute Audio Cross-Correlation Offset
        offset_sec = self.sync.compute_offset(yt_video_p, clean_anime_p)
        print(f"[Batch] Detected Exact Offset: {offset_sec:.3f}s")

        # 5. Burn Subtitles with GPU NVENC
        clean_subbed_p = os.path.join(self.scratch_dir, f"ep{ep_num:02d}_clean_subbed.mp4")
        if not os.path.exists(clean_subbed_p):
            self.compositor.burn_subtitles(clean_anime_p, styled_ass_p, clean_subbed_p)

        # 6. Composite Clean Reaction Video with GPU NVENC
        self.compositor.composite_reaction(yt_video_p, clean_subbed_p, offset_sec, coords, final_out)

        # 7. Forensic Scoring & Drift Verification
        score_report = self.verifier.score_episode(ep_num, final_out, clean_anime_p, offset_sec)

        # 8. Clean up intermediate scratch files to save disk space
        for temp_f in [clean_subbed_p, clean_anime_p, yt_video_p]:
            try:
                if os.path.exists(temp_f):
                    os.remove(temp_f)
            except Exception:
                pass

        elapsed = time.time() - t_start
        score_report["elapsed_seconds"] = round(elapsed, 1)
        print(f"✅ EPISODE {ep_num:02d} COMPLETE in {elapsed:.1f}s | Score: {score_report['overall_score']}/100 | Status: {score_report['status']}")
        return score_report

if __name__ == "__main__":
    out_dir = os.path.join(base_dir, "clean_reaction_mashups")
    scratch = "C:/Users/SkyDr/.gemini/antigravity/brain/4b5e0564-4902-4c06-8ca2-c8138fc2182e/scratch"
    orchestrator = BatchOrchestrator(output_dir=out_dir, scratch_dir=scratch)

    # Test running Episode 4
    if len(sys.argv) > 1:
        target_ep = int(sys.argv[1])
        if target_ep in YT_EPISODES:
            report = orchestrator.process_episode(target_ep, YT_EPISODES[target_ep])
            print("Report:", json.dumps(report, indent=2))
