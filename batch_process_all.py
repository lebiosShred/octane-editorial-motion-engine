import os
import sys
import time
import asyncio
import subprocess

# Ensure engine package is in python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from anime_flash_engine.auto_stream_resolver import AutoStreamResolver
from anime_flash_engine.source_resolver import SourceResolver
from anime_flash_engine.sync_engine import SyncEngine
from anime_flash_engine.layout_detector import LayoutDetector
from anime_flash_engine.gpu_compositor import GPUCompositor

BASE_DIR = os.path.abspath("c:/Users/SkyDr/Documents/antigravity/excited-pythagoras")
YT_DIR = os.path.join(BASE_DIR, "downloads_86_mashups")
CLEAN_ANIME_DIR = os.path.join(BASE_DIR, "clean_anime_episodes")
OUTPUT_DIR = os.path.join(BASE_DIR, "clean_reaction_mashups")
CACHE_DIR = os.path.join(BASE_DIR, ".anime_flash_cache")

os.makedirs(CLEAN_ANIME_DIR, exist_ok=True)
os.makedirs(OUTPUT_DIR, exist_ok=True)
os.makedirs(CACHE_DIR, exist_ok=True)

auto_resolver = AutoStreamResolver(work_dir=CACHE_DIR)
source_downloader = SourceResolver(work_dir=CACHE_DIR)
sync_engine = SyncEngine(work_dir=CACHE_DIR)
compositor = GPUCompositor(use_gpu=True, work_dir=CACHE_DIR)
layout = LayoutDetector.get_layout("16_reactor_center_bottom")

async def process_episode(ep_num: int):
    print("\n" + "=" * 70)
    print(f" 🎬 PROCESSING EPISODE {ep_num:02d} / 23")
    print("=" * 70)

    ep_start = time.time()
    yt_mashup = os.path.join(YT_DIR, f"86_Eighty_Six_EP{ep_num:02d}_Mashup.mp4")
    clean_anime = os.path.join(CLEAN_ANIME_DIR, f"86_EP{ep_num:02d}_Clean.mp4")
    subs_ass = os.path.join(CLEAN_ANIME_DIR, f"86_EP{ep_num:02d}_Subs.ass")
    final_output = os.path.join(OUTPUT_DIR, f"86_Eighty_Six_EP{ep_num:02d}_Clean_Reaction.mp4")

    if os.path.exists(final_output) and os.path.getsize(final_output) > 50_000_000:
        print(f"[Skip] Episode {ep_num:02d} already processed: {final_output}")
        return True

    if not os.path.exists(yt_mashup):
        print(f"[Error] Missing YouTube mashup video for Episode {ep_num:02d}: {yt_mashup}")
        return False

    # 1. Download Clean Anime Video & Subtitles if not cached
    if not (os.path.exists(clean_anime) and os.path.getsize(clean_anime) > 50_000_000):
        info = await auto_resolver.resolve_episode(ep_num)
        if not info.get("stream_url"):
            print(f"[Error] Failed to resolve stream for Episode {ep_num:02d}")
            return False

        print(f"[Download] Fetching clean 1080p stream for Episode {ep_num:02d}...")
        source_downloader.download_clean_stream(
            stream_url=info["stream_url"],
            referer=info.get("referer", "https://www.miruro.to/"),
            output_path=clean_anime
        )

        if info.get("subtitles_url"):
            print(f"[Subtitles] Downloading & styling English subtitles for Episode {ep_num:02d}...")
            source_downloader.download_subtitles(info["subtitles_url"], subs_ass)

    # 2. Synchronize Dialogue & Cuts using Vectorized FFT Cross-Correlation
    print(f"[Sync] Computing sub-millisecond timeline alignment for Episode {ep_num:02d}...")
    segments = sync_engine.compute_alignment(yt_mashup, clean_anime)

    # 3. Pre-burn Subtitles & GPU NVENC Composite
    print(f"[Composite] Launching RTX 4060 Ti GPU NVENC composite for Episode {ep_num:02d}...")
    render_time = compositor.composite(
        yt_video_path=yt_mashup,
        clean_anime_path=clean_anime,
        subtitles_ass_path=subs_ass if os.path.exists(subs_ass) else None,
        segments=segments,
        layout=layout,
        output_path=final_output,
        crf_or_cq=18
    )

    total_ep_time = time.time() - ep_start
    print(f" ✔ Episode {ep_num:02d} completed in {total_ep_time:.1f}s (Render: {render_time:.1f}s)!")
    return True

async def main():
    print("=" * 70)
    print(" 🚀 AnimeFlash High-Throughput Batch Processor (Episodes 03 to 23)")
    print("=" * 70)

    total_batch_start = time.time()
    success_count = 0

    for ep in range(3, 24):
        try:
            ok = await process_episode(ep)
            if ok:
                success_count += 1
        except Exception as e:
            print(f"[Exception] Failed processing Episode {ep:02d}: {e}")
        time.sleep(1)

    total_batch_elapsed = time.time() - total_batch_start
    print("\n" + "=" * 70)
    print(" 🎉 BATCH PROCESSING FINISHED")
    print("=" * 70)
    print(f" • Successfully Processed: {success_count} / 21 Episodes")
    print(f" • Total Turnaround Time:   {total_batch_elapsed / 60:.1f} minutes")
    print(f" • Output Directory:        {OUTPUT_DIR}")
    print("=" * 70)

if __name__ == "__main__":
    asyncio.run(main())
