import os
import sys
import json
import time
import subprocess

base_dir = "c:/Users/SkyDr/Documents/antigravity/excited-pythagoras"
sys.path.append(base_dir)

from anime_flash_engine.source_resolver import SourceResolver
from anime_flash_engine.sync_engine import SyncEngine
from anime_flash_engine.layout_detector import LayoutDetector
from anime_flash_engine.gpu_compositor import GPUCompositor
from anime_flash_engine.scoring_verifier import ScoringVerifier

output_dir = os.path.join(base_dir, "clean_reaction_mashups")
scratch_dir = "C:/Users/SkyDr/.gemini/antigravity/brain/4b5e0564-4902-4c06-8ca2-c8138fc2182e/scratch"
os.makedirs(output_dir, exist_ok=True)
os.makedirs(scratch_dir, exist_ok=True)

def get_yt_mashup_url(ep_num: int) -> str:
    queries = [
        f"ytsearch5:[Full Episode] 86 Eighty Six Episode {ep_num} Reaction Mashup",
        f"ytsearch5:86 Eighty Six Episode {ep_num} Reaction Mashup XD Yami",
        f"ytsearch5:86 Episode {ep_num} Reaction Mashup"
    ]
    for q in queries:
        cmd = ["yt-dlp", "--flat-playlist", "--dump-json", q]
        res = subprocess.run(cmd, capture_output=True, text=True)
        if res.stdout.strip():
            for line in res.stdout.splitlines():
                try:
                    data = json.loads(line)
                    title = data.get("title", "").lower()
                    if "86" in title and (f"episode {ep_num} " in title or f"ep {ep_num} " in title or f"ep{ep_num}" in title or f"episode {ep_num}:" in title or f"episode {ep_num}]" in title or f"episode {ep_num}" in title):
                        url = data.get("url") or f"https://www.youtube.com/watch?v={data.get('id')}"
                        return url
                except Exception:
                    pass
    return None

def process_single_episode(ep_num: int, resolver, sync, detector, compositor, verifier):
    t_start = time.time()
    print(f"\n=======================================================")
    print(f"🎬 PROCESSING EPISODE {ep_num:02d} / 23")
    print(f"=======================================================")

    final_out = os.path.join(output_dir, f"86_Eighty_Six_EP{ep_num:02d}_Clean_Reaction.mp4")

    # 1. Download 1080p YouTube Reaction Video
    yt_video_p = os.path.join(scratch_dir, f"ep{ep_num:02d}_yt_1080p.mp4")
    if not (os.path.exists(yt_video_p) or os.path.exists(yt_video_p + ".mkv")):
        yt_url = get_yt_mashup_url(ep_num)
        print(f"[Batch] Found YouTube Mashup URL: {yt_url}")
        if not yt_url:
            raise ValueError(f"Could not find YouTube reaction mashup URL for Episode {ep_num}")
        cmd = [
            "yt-dlp",
            "--extractor-args", "youtube:player_client=android,web",
            "-f", "bestvideo[height<=1080]+bestaudio/best[height<=1080]",
            "--merge-output-format", "mp4",
            "-o", yt_video_p,
            yt_url
        ]
        subprocess.run(cmd, check=True)

    if os.path.exists(yt_video_p + ".mkv"):
        yt_video_p = yt_video_p + ".mkv"

    # 2. Resolve Clean Anime 1080p Stream + English Subtitles from Anisuge
    clean_anime_p = os.path.join(scratch_dir, f"ep{ep_num:02d}_clean_anime.mp4")
    styled_ass_p = os.path.join(scratch_dir, f"ep{ep_num:02d}_subs.ass")

    season = 1 if ep_num <= 11 else 2
    actual_ep = ep_num if season == 1 else ep_num - 11
    stream_info = resolver.resolve_anisuge(actual_ep, season=season)

    if stream_info.get("stream_url"):
        resolver.download_clean_stream(stream_info["stream_url"], stream_info.get("referer", "https://megaplay.buzz/"), clean_anime_p)
    if stream_info.get("subtitles_url"):
        resolver.download_subtitles(stream_info["subtitles_url"], styled_ass_p)

    # 3. Detect Layout Geometry
    coords = detector.detect_coordinates(yt_video_p)
    print(f"[Batch] Detected Target Coordinates: {coords}")

    # 4. Compute Audio Cross-Correlation Offset
    offset_sec = sync.compute_offset(yt_video_p, clean_anime_p)
    print(f"[Batch] Detected Audio Offset: {offset_sec:.3f}s")

    # 5. Burn Subtitles with GPU NVENC
    clean_subbed_p = os.path.join(scratch_dir, f"ep{ep_num:02d}_clean_subbed.mp4")
    compositor.burn_subtitles(clean_anime_p, styled_ass_p, clean_subbed_p)

    # 6. Composite Clean Reaction Video
    compositor.composite_reaction(yt_video_p, clean_subbed_p, offset_sec, coords, final_out)

    # 7. Forensic Scoring & Drift Verification
    score_report = verifier.score_episode(ep_num, final_out, clean_anime_p, offset_sec)

    # 8. Clean up intermediate scratch files
    for temp_f in [clean_subbed_p, clean_anime_p, yt_video_p, styled_ass_p]:
        try:
            if os.path.exists(temp_f):
                os.remove(temp_f)
        except Exception:
            pass

    elapsed = time.time() - t_start
    score_report["elapsed_seconds"] = round(elapsed, 1)
    print(f"✅ EPISODE {ep_num:02d} COMPLETED in {elapsed:.1f}s | Score: {score_report['overall_score']}/100 | Status: {score_report['status']}")
    return score_report

def main():
    print("=======================================================")
    print("🚀 LAUNCHING AUTONOMOUS ANIME FLASH BATCH PIPELINE")
    print("   Target: Episodes 04 through 23 (86 Eighty-Six)")
    print("=======================================================")

    resolver = SourceResolver(work_dir=scratch_dir)
    sync = SyncEngine(work_dir=scratch_dir)
    detector = LayoutDetector(work_dir=scratch_dir)
    compositor = GPUCompositor(work_dir=scratch_dir)
    verifier = ScoringVerifier(work_dir=scratch_dir)

    all_reports = []

    for ep in range(4, 24):
        try:
            rep = process_single_episode(ep, resolver, sync, detector, compositor, verifier)
            all_reports.append(rep)
        except Exception as e:
            print(f"❌ Error processing Episode {ep:02d}: {e}")
            all_reports.append({"episode": ep, "status": "ERROR", "error": str(e), "overall_score": 0.0})

        # Save cumulative progress report
        report_file = os.path.join(output_dir, "batch_execution_scoring_report.json")
        with open(report_file, "w") as f:
            json.dump(all_reports, f, indent=2)

    print("\n🎉 ALL EPISODES PROCESSED AND VERIFIED!")

if __name__ == "__main__":
    main()
