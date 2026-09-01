import os
import sys
import time

# Add root directory to python path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from anime_flash_engine.sync_engine import SyncEngine
from anime_flash_engine.layout_detector import LayoutDetector
from anime_flash_engine.gpu_compositor import GPUCompositor

def run_benchmark():
    print("========================================================================")
    print(" 🏁 Running AnimeFlash Engine Benchmark on NVIDIA GeForce RTX 4060 Ti")
    print("========================================================================")

    yt_video = "yt_video.mp4"
    clean_anime = "anime_clean_remuxed.mp4"
    subs_ass = "subtitles_styled.ass"
    output_benchmark = "output_benchmark_nvenc.mp4"

    assert os.path.exists(yt_video), "yt_video.mp4 missing"
    assert os.path.exists(clean_anime), "anime_clean_remuxed.mp4 missing"
    assert os.path.exists(subs_ass), "subtitles_styled.ass missing"

    sync_engine = SyncEngine(work_dir="./.anime_flash_cache")
    compositor = GPUCompositor(use_gpu=True)
    layout = LayoutDetector.get_layout("16_reactor_center_bottom")

    # Benchmark 1: Audio Cross-Correlation Sync
    t0 = time.time()
    segments = sync_engine.compute_alignment(yt_video, clean_anime)
    t_sync = time.time() - t0
    print(f"\n[Benchmark] Sync Detection completed in {t_sync:.2f}s ({len(segments)} segments detected).")

    # Benchmark 2: Full 20-Minute GPU NVENC Compositing
    t0 = time.time()
    render_time = compositor.composite(
        yt_video_path=yt_video,
        clean_anime_path=clean_anime,
        subtitles_ass_path=subs_ass,
        segments=segments,
        layout=layout,
        output_path=output_benchmark,
        crf_or_cq=19
    )
    t_render = time.time() - t0

    total_fps = (1211.21 * 25) / t_render
    speed_factor = 1211.21 / t_render

    print("\n" + "=" * 70)
    print(" 🚀 BENCHMARK RESULTS")
    print("=" * 70)
    print(f" • Input Video Duration:       1211.21s (20m 11s)")
    print(f" • Sync Computation Time:      {t_sync:.2f}s")
    print(f" • GPU NVENC Rendering Time:   {t_render:.2f}s")
    print(f" • Encoding Throughput:        {total_fps:.1f} frames/sec ({speed_factor:.1f}x Real-time)")
    print(f" • Total Engine Pipeline Time: {t_sync + t_render:.2f}s")
    print("=" * 70)

if __name__ == "__main__":
    run_benchmark()
