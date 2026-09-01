import os
import subprocess
import cv2
import numpy as np
from typing import Dict

class LayoutDetector:
    """
    Automated visual layout detector for anime reaction mashups.
    Detects whether the central anime window is Top Center or Bottom Center
    and applies pixel-perfect full-bleed bounding boxes (zero leakage).
    """
    def __init__(self, work_dir: str = "."):
        self.work_dir = work_dir
        os.makedirs(self.work_dir, exist_ok=True)

    def detect_coordinates(self, video_path: str) -> Dict[str, int]:
        frame_path = os.path.join(self.work_dir, "layout_sample.png")
        subprocess.run([
            "ffmpeg", "-y", "-v", "error",
            "-ss", "10",
            "-i", video_path,
            "-vframes", "1",
            "-q:v", "2",
            frame_path
        ], check=True)

        img = cv2.imread(frame_path)
        h_img, w_img, _ = img.shape

        scale_x = w_img / 1920.0
        scale_y = h_img / 1080.0

        top_crop = img[int(10*scale_y):int(472*scale_y), int(549*scale_x):int(1371*scale_x)]
        bottom_crop = img[int(579*scale_y):int(1041*scale_y), int(549*scale_x):int(1371*scale_x)]

        top_hsv = cv2.cvtColor(top_crop, cv2.COLOR_BGR2HSV)
        bottom_hsv = cv2.cvtColor(bottom_crop, cv2.COLOR_BGR2HSV)
        
        top_black = np.mean(top_hsv[:, :, 2] < 30)
        bottom_black = np.mean(bottom_hsv[:, :, 2] < 30)

        # Top Center Box (Full bleed: y=0 to 545, x=550 to 1370)
        # Bottom Center Box: y=579 to 1041, x=549 to 1371
        if top_black > bottom_black:
            print("[LayoutDetector] Detected Top-Center Anime Box (Full Bleed: 820x545 at 550, 0)")
            return {"x": 550, "y": 0, "w": 820, "h": 545}
        else:
            print("[LayoutDetector] Detected Bottom-Center Anime Box (822x462 at 549, 579)")
            return {"x": 549, "y": 579, "w": 822, "h": 462}
