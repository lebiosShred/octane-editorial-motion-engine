import os
import subprocess
import numpy as np
from scipy import signal
import wave

class SyncEngine:
    """
    Automated high-precision audio cross-correlation sync engine.
    Extracts audio fingerprints and computes exact offset between
    the YouTube reaction video and the clean anime source.
    """
    def __init__(self, work_dir: str = "."):
        self.work_dir = work_dir
        os.makedirs(self.work_dir, exist_ok=True)

    def extract_audio_wav(self, video_path: str, start_time: float = 0.0, duration: float = 45.0, out_name: str = "temp.wav") -> str:
        out_wav = os.path.join(self.work_dir, out_name)
        cmd = [
            "ffmpeg", "-y", "-v", "error",
            "-ss", str(start_time),
            "-t", str(duration),
            "-i", video_path,
            "-ac", "1",
            "-ar", "16000",
            out_wav
        ]
        subprocess.run(cmd, check=True)
        return out_wav

    def load_wav(self, wav_path: str) -> np.ndarray:
        with wave.open(wav_path, 'rb') as wf:
            frames = wf.readframes(wf.getnframes())
            data = np.frombuffer(frames, dtype=np.int16).astype(np.float32)
            # Normalize
            if np.max(np.abs(data)) > 0:
                data = data / np.max(np.abs(data))
            return data

    def compute_offset(self, yt_video_path: str, clean_anime_path: str, search_window: float = 240.0) -> float:
        """
        Computes the exact time offset (in seconds) that clean anime is shifted
        relative to the YouTube reaction video start.
        """
        print("[SyncEngine] Extracting audio fingerprints for cross-correlation...")
        yt_sample_wav = self.extract_audio_wav(yt_video_path, start_time=0.0, duration=30.0, out_name="yt_fingerprint.wav")
        clean_window_wav = self.extract_audio_wav(clean_anime_path, start_time=0.0, duration=search_window, out_name="clean_window.wav")

        yt_audio = self.load_wav(yt_sample_wav)
        clean_audio = self.load_wav(clean_window_wav)

        sr = 16000
        # Compute cross-correlation
        print("[SyncEngine] Running FFT cross-correlation...")
        corr = signal.correlate(clean_audio, yt_audio, mode='valid', method='fft')
        peak_idx = np.argmax(corr)

        offset_seconds = peak_idx / sr
        print(f"[SyncEngine] Detected exact anime offset: {offset_seconds:.3f}s ({offset_seconds/60:.2f} mins)")
        return offset_seconds

if __name__ == "__main__":
    scratch_p = "C:/Users/SkyDr/.gemini/antigravity/brain/4b5e0564-4902-4c06-8ca2-c8138fc2182e/scratch"
    engine = SyncEngine(work_dir=scratch_p)
    yt = os.path.join(scratch_p, "ep03_yt_1080p.mp4.mkv")
    clean = os.path.join(scratch_p, "ep03_fixed.mp4")
    if os.path.exists(yt) and os.path.exists(clean):
        offset = engine.compute_offset(yt, clean)
        print("EP03 Detected Offset:", offset)
