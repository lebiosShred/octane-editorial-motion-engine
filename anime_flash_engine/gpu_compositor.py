import os
import subprocess
from typing import Dict

class GPUCompositor:
    """
    Hardware-accelerated GPU NVENC video compositor.
    Applies styled subtitles, scale filters, and overlay box placement.
    """
    def __init__(self, work_dir: str = "."):
        self.work_dir = work_dir
        os.makedirs(self.work_dir, exist_ok=True)

    def burn_subtitles(self, clean_anime_path: str, ass_path: str, output_path: str) -> str:
        """
        Burn styled ASS subtitles directly onto 1080p anime video with GPU NVENC.
        """
        print(f"[GPUCompositor] Burning styled subtitles onto clean anime with NVENC...")
        ass_escaped = ass_path.replace("\\", "/").replace(":", "\\:")
        cmd = [
            "ffmpeg", "-y", "-v", "error",
            "-i", clean_anime_path,
            "-vf", f"subtitles='{ass_escaped}'",
            "-c:v", "h264_nvenc", "-preset", "p4", "-cq", "18",
            "-c:a", "aac",
            output_path
        ]
        subprocess.run(cmd, check=True)
        return output_path

    def composite_reaction(self, yt_video_path: str, clean_subbed_path: str, offset_seconds: float, coords: Dict[str, int], output_path: str) -> str:
        """
        Single-pass hardware compositing: replaces the watermarked center window
        with 1080p clean subbed anime at detected coordinates.
        """
        print(f"[GPUCompositor] Compositing reaction video (Offset: {offset_seconds:.3f}s, Coords: {coords})...")
        os.makedirs(os.path.dirname(output_path), exist_ok=True)

        x, y, w, h = coords["x"], coords["y"], coords["w"], coords["h"]

        cmd = [
            "ffmpeg", "-y", "-v", "error",
            "-i", yt_video_path,
            "-ss", f"{offset_seconds:.3f}",
            "-i", clean_subbed_path,
            "-filter_complex",
            f"[1:v]scale={w}:{h},fps=25[vscaled];[0:v][vscaled]overlay={x}:{y}[outv]",
            "-map", "[outv]",
            "-map", "0:a",
            "-c:v", "h264_nvenc", "-preset", "p4", "-cq", "18",
            "-c:a", "copy",
            output_path
        ]
        subprocess.run(cmd, check=True)
        print(f"[GPUCompositor] Composite finished: {output_path}")
        return output_path
