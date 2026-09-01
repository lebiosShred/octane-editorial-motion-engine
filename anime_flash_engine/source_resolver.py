import os
import re
import json
import asyncio
import subprocess
import urllib.request
from typing import Dict, Any, Optional

class SourceResolver:
    """
    Automated stream and subtitle resolver using Anisuge / Megaplay
    and direct HLS endpoints with PNG/TS deobfuscation.
    """
    def __init__(self, work_dir: str = "."):
        self.work_dir = work_dir
        os.makedirs(self.work_dir, exist_ok=True)

    def resolve_anisuge(self, ep_num: int, season: int = 1) -> Dict[str, Any]:
        """
        Extract direct HLS stream and subtitle URLs from anisuge.tv
        Season 1: 86-nqcoh / ep-{ep_num}
        Season 2: 86-part-2-2x6y / ep-{ep_num}
        """
        from playwright.sync_api import sync_playwright

        if season == 1:
            url = f"https://anisuge.tv/watch/86-nqcoh/ep-{ep_num}"
        else:
            url = f"https://anisuge.tv/watch/86-part-2-2x6y/ep-{ep_num}"

        print(f"[SourceResolver] Resolving stream from Anisuge: {url}")
        stream_info = {"stream_url": None, "subtitles_url": None, "referer": "https://megaplay.buzz/"}

        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True, args=["--no-sandbox", "--disable-blink-features=AutomationControlled"])
            context = browser.new_context(
                user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
            )
            page = context.new_page()

            def on_response(resp):
                r_url = resp.url
                if "getSources" in r_url or "source" in r_url or ".m3u8" in r_url:
                    try:
                        data = json.loads(resp.text())
                        if "sources" in data and isinstance(data["sources"], list):
                            stream_info["stream_url"] = data["sources"][0].get("file")
                        elif "sources" in data and isinstance(data["sources"], dict):
                            stream_info["stream_url"] = data["sources"].get("file")
                        if "tracks" in data:
                            for t in data["tracks"]:
                                if t.get("label") == "English" or t.get("default"):
                                    stream_info["subtitles_url"] = t.get("file")
                    except Exception:
                        pass

            page.on("response", on_response)
            page.goto(url, wait_until="domcontentloaded")
            page.wait_for_timeout(3500)
            browser.close()

        print(f"[SourceResolver] Discovered stream: {stream_info['stream_url']}")
        return stream_info

    def download_clean_stream(self, stream_url: str, referer: str, output_path: str) -> str:
        """
        Download HLS stream with yt-dlp and apply Megaplay / MPEG-TS deobfuscation.
        """
        raw_output = os.path.join(self.work_dir, "raw_stream.ts")
        print(f"[SourceResolver] Downloading clean 1080p stream...")
        
        cmd = [
            "yt-dlp",
            "-N", "8",
            "-f", "bestvideo+bestaudio/best",
            "--no-warnings",
            "--quiet",
            "-o", raw_output
        ]
        if referer:
            cmd.extend(["--referer", referer])
        cmd.append(stream_url)

        subprocess.run(cmd, check=True)

        # Deobfuscate Megaplay PNG chunks
        with open(raw_output, "rb") as f:
            data = f.read()

        png_header = b"\x89PNG\r\n\x1a\n"
        if data.startswith(png_header):
            print("[SourceResolver] Deobfuscating Megaplay PNG stream headers...")
            png_positions = []
            idx = 0
            while True:
                pos = data.find(png_header, idx)
                if pos == -1:
                    break
                png_positions.append(pos)
                idx = pos + 8

            clean_chunks = []
            for i in range(len(png_positions)):
                start = png_positions[i] + 252
                end = png_positions[i+1] if i+1 < len(png_positions) else len(data)
                clean_chunks.append(data[start:end])
            clean_data = b"".join(clean_chunks)
        else:
            clean_data = data

        temp_ts = os.path.join(self.work_dir, "clean_fixed.ts")
        with open(temp_ts, "wb") as f:
            f.write(clean_data)

        # Fast remux to mp4
        print(f"[SourceResolver] Remuxing to clean MP4: {output_path}...")
        subprocess.run([
            "ffmpeg", "-y", "-v", "error",
            "-i", temp_ts,
            "-c", "copy",
            "-movflags", "+faststart",
            output_path
        ], check=True)

        return output_path

    def download_subtitles(self, sub_url: str, output_ass: str) -> str:
        """
        Download subtitles and convert to styled ASS format for 1080p rendering.
        """
        print(f"[SourceResolver] Fetching subtitles from: {sub_url}")
        vtt_path = os.path.join(self.work_dir, "subs.vtt")
        
        req = urllib.request.Request(
            sub_url,
            headers={
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
                "Referer": "https://megaplay.buzz/"
            }
        )
        with urllib.request.urlopen(req) as resp, open(vtt_path, "wb") as f:
            f.write(resp.read())

        # Convert to ASS
        temp_ass = os.path.join(self.work_dir, "subs_temp.ass")
        subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", vtt_path, temp_ass], check=True)

        with open(temp_ass, "r", encoding="utf-8") as f:
            lines = f.readlines()

        styled_lines = []
        for line in lines:
            if line.startswith("PlayResX:"):
                styled_lines.append("PlayResX: 1920\n")
            elif line.startswith("PlayResY:"):
                styled_lines.append("PlayResY: 1080\n")
            elif line.startswith("Style: Default"):
                styled_lines.append("Style: Default,Arial,52,&H00FFFFFF,&H000000FF,&H00000000,&H80000000,1,0,0,0,100,100,0,0,1,3.5,1.5,2,40,40,45,1\n")
            else:
                styled_lines.append(line)

        with open(output_ass, "w", encoding="utf-8") as f:
            f.writelines(styled_lines)

        print(f"[SourceResolver] Styled ASS subtitles saved to {output_ass}")
        return output_ass
