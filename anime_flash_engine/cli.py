import os
import sys
import time
import argparse
from anime_flash_engine.source_resolver import SourceResolver
from anime_flash_engine.sync_engine import SyncEngine
from anime_flash_engine.layout_detector import LayoutDetector
from anime_flash_engine.gpu_compositor import GPUCompositor

def main():
    parser = argparse.ArgumentParser(
        description="AnimeFlash Engine: Ultra-Fast GPU-Accelerated Anime Reaction Mashup Cleaner"
    )
    parser.add_argument("--yt", required=True, help="YouTube video URL or local MP4 path")
    parser.add_argument("--anime", required=True, help="Anime episode URL (Anisuge, etc.) or local MP4 path")
    parser.add_argument("--output", default="output_reaction_clean.mp4", help="Output file path")
    parser.add_argument("--subs", default=None, help="Custom subtitle file (.vtt or .ass), or auto-download")
    parser.add_argument("--layout", default="16_reactor_center_bottom", help="Preset layout or custom coords x,y,w,h")
    parser.add_argument("--no-gpu", action="store_true", help="Disable NVIDIA NVENC hardware acceleration")
    parser.add_argument("--work-dir", default="./.anime_flash_cache", help="Temporary working cache directory")

    args = parser.parse_args()

    total_start = time.time()
    work_dir = os.path.abspath(args.work_dir)
    os.makedirs(work_dir, exist_ok=True)

    print("=" * 70)
    print(" 🚀 AnimeFlash High-Throughput Reaction Compositor Engine")
    print("=" * 70)

    resolver = SourceResolver(work_dir=work_dir)
    sync_engine = SyncEngine(work_dir=work_dir)
    compositor = GPUCompositor(use_gpu=not args.no_gpu)

    # 1. Acquire YouTube Video
    t0 = time.time()
    if os.path.exists(args.yt):
        yt_path = os.path.abspath(args.yt)
        print(f"[Pipeline] Using local YouTube mashup video: {yt_path}")
    else:
        print(f"[Pipeline] Downloading YouTube video from: {args.yt}")
        yt_path = os.path.join(work_dir, "yt_input.mp4")
        subprocess.run(["yt-dlp", "-f", "bestvideo[height<=1080]+bestaudio/best", "-o", yt_path, args.yt], check=True)
    t_yt = time.time() - t0

    # 2. Acquire Clean Anime Stream & Subtitles
    t0 = time.time()
    subs_path = args.subs
    if os.path.exists(args.anime):
        anime_path = os.path.abspath(args.anime)
        print(f"[Pipeline] Using local clean anime video: {anime_path}")
    else:
        print(f"[Pipeline] Resolving anime stream from: {args.anime}")
        info = resolver.resolve_anisuge(args.anime)
        anime_path = os.path.join(work_dir, "clean_anime.mp4")
        resolver.download_clean_stream(info["stream_url"], info.get("referer", "https://megaplay.buzz/"), anime_path)
        
        if not subs_path and info.get("subtitles_url"):
            subs_path = os.path.join(work_dir, "subtitles_styled.ass")
            resolver.download_subtitles(info["subtitles_url"], subs_path)
    t_anime = time.time() - t0

    # 3. Audio Fingerprinting & Timeline Synchronization
    t0 = time.time()
    segments = sync_engine.compute_alignment(yt_path, anime_path)
    t_sync = time.time() - t0

    # 4. Layout Resolution
    if "," in args.layout:
        coords = tuple(map(int, args.layout.split(",")))
        layout = LayoutDetector.get_layout(custom_coords=coords)
    else:
        layout = LayoutDetector.get_layout(preset_name=args.layout)

    # 5. GPU NVENC Composition
    t0 = time.time()
    compositor.composite(
        yt_video_path=yt_path,
        clean_anime_path=anime_path,
        subtitles_ass_path=subs_path,
        segments=segments,
        layout=layout,
        output_path=os.path.abspath(args.output)
    )
    t_render = time.time() - t0

    total_elapsed = time.time() - total_start
    print("=" * 70)
    print(" 📊 Performance & Telemetry Summary")
    print("=" * 70)
    print(f" • YouTube Acquisition:     {t_yt:.2f}s")
    print(f" • Anime Stream Resolve:    {t_anime:.2f}s")
    print(f" • Audio Cross-Correlation: {t_sync:.2f}s")
    print(f" • GPU NVENC Rendering:     {t_render:.2f}s")
    print(f" • Total End-to-End Time:   {total_elapsed:.2f}s")
    print(f" • Output File:             {os.path.abspath(args.output)}")
    print("=" * 70)

if __name__ == "__main__":
    main()
