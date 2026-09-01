import os
import sys
import subprocess
import json
import numpy as np
from scipy import signal
import wave

class ReactionMasterEngine:
    def __init__(self, base_dir=None, scratch_dir=None, output_dir=None):
        self.base_dir = base_dir or "c:/Users/SkyDr/Documents/antigravity/excited-pythagoras"
        self.scratch_dir = scratch_dir or "C:/Users/SkyDr/.gemini/antigravity/brain/4b5e0564-4902-4c06-8ca2-c8138fc2182e/scratch"
        self.output_dir = output_dir or os.path.join(self.base_dir, "clean_reaction_mashups")
        os.makedirs(self.scratch_dir, exist_ok=True)
        os.makedirs(self.output_dir, exist_ok=True)
        
    def probe_media(self, filepath):
        if not os.path.exists(filepath):
            return None
        cmd = [
            "ffprobe", "-v", "error",
            "-show_entries", "format=duration,size,bit_rate:stream=index,codec_type,codec_name,width,height,r_frame_rate,bit_rate,nb_frames",
            "-of", "json",
            filepath
        ]
        res = subprocess.run(cmd, capture_output=True, text=True)
        try:
            data = json.loads(res.stdout)
            v_stream = next((s for s in data.get("streams", []) if s.get("codec_type") == "video"), {})
            a_stream = next((s for s in data.get("streams", []) if s.get("codec_type") == "audio"), {})
            fmt = data.get("format", {})
            return {
                "duration": float(fmt.get("duration", 0)),
                "size_mb": float(fmt.get("size", 0)) / (1024 * 1024),
                "v_width": int(v_stream.get("width", 0)),
                "v_height": int(v_stream.get("height", 0)),
                "v_codec": v_stream.get("codec_name", ""),
                "v_bitrate_kbps": float(v_stream.get("bit_rate", 0)) / 1000 if v_stream.get("bit_rate") else 0,
                "a_codec": a_stream.get("codec_name", ""),
                "a_bitrate_kbps": float(a_stream.get("bit_rate", 0)) / 1000 if a_stream.get("bit_rate") else 0,
            }
        except Exception as e:
            return None

    def ensure_true_1080p_source(self, ep: int, url: str):
        out_mp4 = os.path.join(self.scratch_dir, f"ep{ep:02d}_yt_1080p.mp4")
        
        # Check if already 1080p
        info = self.probe_media(out_mp4)
        if info and info["v_height"] >= 1080:
            print(f"[1080p Guard] EP{ep:02d} source is already True 1080p ({info['v_width']}x{info['v_height']}).")
            return out_mp4
            
        print(f"[1080p Guard] Fetching True 1080p DASH stream for EP{ep:02d} from {url}...")
        if os.path.exists(out_mp4):
            os.remove(out_mp4)
            
        cmd = [
            "yt-dlp",
            "--remote-components", "ejs:github",
            "--extractor-args", "youtube:player_client=web,android,ios",
            "-f", "bestvideo[height=1080][ext=mp4]+bestaudio[ext=m4a]/bestvideo[height=1080]+bestaudio/best[height=1080]",
            "--merge-output-format", "mp4",
            "-o", out_mp4,
            url
        ]
        subprocess.run(cmd, check=True)
        
        info_after = self.probe_media(out_mp4)
        print(f"[1080p Guard] Downloaded EP{ep:02d}: {info_after['v_width']}x{info_after['v_height']} ({info_after['size_mb']:.1f} MB, {info_after['v_bitrate_kbps']:.1f} kbps)")
        return out_mp4

    def find_mkv(self, ep: int):
        ember_root = os.path.join(self.scratch_dir, "ember_episodes")
        pattern = f"S01E{ep:02d}-"
        for root, dirs, files in os.walk(ember_root):
            for file in files:
                if pattern in file and file.endswith(".mkv"):
                    return os.path.join(root, file)
        raise FileNotFoundError(f"Clean BDRip MKV not found for Episode {ep:02d}")

    def extract_and_burn_subtitles(self, ep: int, mkv_p: str):
        ass_p = os.path.join(self.scratch_dir, f"ep{ep:02d}_dialogue.ass")
        subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", mkv_p, "-map", "0:s:1", ass_p], check=True)
        
        subbed_mp4 = os.path.join(self.scratch_dir, f"ep{ep:02d}_subbed.mp4")
        rel_ass = os.path.basename(ass_p)
        print(f"[Subtitles] Burning English dialogue subtitles for EP{ep:02d} with NVENC...")
        subprocess.run([
            "ffmpeg", "-y", "-v", "error",
            "-i", mkv_p,
            "-vf", f"subtitles={rel_ass},format=yuv420p",
            "-c:v", "h264_nvenc", "-preset", "p4", "-cq", "18",
            "-an",
            subbed_mp4
        ], cwd=self.scratch_dir, check=True)
        return subbed_mp4

    def render_episode(self, ep: int, yt_p: str, mkv_p: str, segs: list, layout: dict, gutter_mask: dict = None):
        print(f"\n=======================================================")
        print(f"🎬 MASTER ENGINE COMPOSITE: EPISODE {ep:02d}")
        print(f"=======================================================")
        
        yt_info = self.probe_media(yt_p)
        yt_dur = yt_info["duration"]
        print(f"[Duration Guard] Clamping composite duration to exact source: {yt_dur:.3f}s")
        
        subbed_mp4 = self.extract_and_burn_subtitles(ep, mkv_p)
        out_final = os.path.join(self.output_dir, f"86_Eighty_Six_EP{ep:02d}_Clean_Reaction.mp4")
        
        # Build Filtergraph
        cmd = ["ffmpeg", "-y", "-v", "error", "-i", yt_p]
        
        filter_parts = []
        seg_labels = []
        for idx, (clean_start, length) in enumerate(segs):
            cmd.extend(["-ss", f"{clean_start:.3f}"])
            if length is not None:
                cmd.extend(["-t", f"{length:.3f}"])
            cmd.extend(["-i", subbed_mp4])
            seg_labels.append(f"[{idx+1}:v]")
            
        n_segs = len(segs)
        if n_segs > 1:
            concat_str = "".join(seg_labels) + f"concat=n={n_segs}:v=1:a=0[vclean];"
            filter_parts.append(concat_str)
            scale_in = "[vclean]"
        else:
            scale_in = "[1:v]"
            
        filter_parts.append("[0:v]scale=1920:1080[vbase];")
        filter_parts.append(f"{scale_in}scale={layout['w']}:{layout['h']},fps=25[vscaled];")
        filter_parts.append(f"[vbase][vscaled]overlay={layout['x']}:{layout['y']}[vover1]")
        
        last_v = "[vover1]"
        if gutter_mask:
            # Draw aesthetic dark matte over empty reactor slot / exposed background
            mx, my, mw, mh = gutter_mask["x"], gutter_mask["y"], gutter_mask["w"], gutter_mask["h"]
            filter_parts.append(f";{last_v}drawbox=x={mx}:y={my}:w={mw}:h={mh}:color=black@1.0:t=fill[vfinal]")
            last_v = "[vfinal]"
            print(f"[Gutter Mask] Applied solid dark matte over empty slot ({mx}, {my}, {mw}x{mh})")
            
        full_filter = "".join(filter_parts)
        
        cmd.extend([
            "-filter_complex", full_filter,
            "-map", last_v,
            "-map", "0:a",
            "-t", f"{yt_dur:.3f}",   # HARD DURATION CLAMPING (Eliminates frozen / silent tails)
            "-c:v", "h264_nvenc", "-preset", "p4", "-cq", "18",
            "-c:a", "copy",
            out_final
        ])
        
        print(f"[Render] Encoding with GPU NVENC (Target Duration: {yt_dur:.2f}s)...")
        subprocess.run(cmd, check=True)
        
        # Verify rendered output
        out_info = self.probe_media(out_final)
        print(f"✅ Render Complete! Output Duration: {out_info['duration']:.3f}s | Diff from Source: {out_info['duration']-yt_dur:+.3f}s")
        return out_final
