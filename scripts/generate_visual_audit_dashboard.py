import os
import json
import cv2
import numpy as np

REPORT_PATH = "out/qa_report.json"
DASHBOARD_PATH = "out/visual_audit_dashboard.html"
HEATMAP_DIR = "out/stills/heatmaps"
os.makedirs(HEATMAP_DIR, exist_ok=True)

def generate_heatmap_overlay(img_path, output_path):
    img_bgr = cv2.imread(img_path)
    if img_bgr is None:
        return
    h, w, _ = img_bgr.shape
    gray = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2GRAY)
    
    # Generate Saliency Heatmap
    resized = cv2.resize(gray, (256, 256)).astype(np.float32)
    fft = np.fft.fft2(resized)
    mag = np.abs(fft)
    phase = np.angle(fft)
    log_mag = np.log(mag + 1e-6)
    
    kernel = np.ones((3, 3), np.float32) / 9.0
    avg_log_mag = cv2.filter2D(log_mag, -1, kernel)
    spectral_residual = log_mag - avg_log_mag
    
    exp_sr = np.exp(spectral_residual)
    inv_fft = np.fft.ifft2(exp_sr * (np.cos(phase) + 1j * np.sin(phase)))
    saliency_map = np.abs(inv_fft) ** 2
    saliency_map = cv2.GaussianBlur(saliency_map, (9, 9), 2.5)
    saliency_map = cv2.resize(saliency_map, (w, h))
    saliency_norm = ((saliency_map - saliency_map.min()) / (saliency_map.max() - saliency_map.min() + 1e-6) * 255).astype(np.uint8)
    
    color_heatmap = cv2.applyColorMap(saliency_norm, cv2.COLORMAP_JET)
    overlay = cv2.addWeighted(img_bgr, 0.6, color_heatmap, 0.4, 0)
    
    # Draw 5% and 10% Broadcast Safe Area Guides
    margin_5x = int(w * 0.05)
    margin_5y = int(h * 0.05)
    margin_10x = int(w * 0.10)
    margin_10y = int(h * 0.10)
    
    # Action Safe (5% - Yellow)
    cv2.rectangle(overlay, (margin_5x, margin_5y), (w - margin_5x, h - margin_5y), (0, 215, 255), 1)
    # Title Safe (10% - Cyan)
    cv2.rectangle(overlay, (margin_10x, margin_10y), (w - margin_10x, h - margin_10y), (235, 174, 77), 1)
    
    cv2.imwrite(output_path, overlay)

def build_dashboard():
    if not os.path.exists(REPORT_PATH):
        print(f"Report {REPORT_PATH} not found. Please run perceptual_frame_inspector.py first.")
        return

    with open(REPORT_PATH, "r") as f:
        report = json.load(f)

    html_cards = []
    for beat in report["beats_analyzed"]:
        img_filename = os.path.basename(beat["image_path"])
        heatmap_filename = f"heatmap_{img_filename}"
        heatmap_path = os.path.join(HEATMAP_DIR, heatmap_filename)
        
        generate_heatmap_overlay(beat["image_path"], heatmap_path)

        badge_color = "#10B981" if beat["beat_status"] == "PASS" else "#F59E0B"
        checks = beat["checks"]

        card_html = f"""
        <div class="beat-card">
          <div class="card-header">
            <span class="beat-title">{beat['id'].upper()} // {beat['name']} (f{beat['frame']})</span>
            <span class="badge" style="background: {badge_color}22; color: {badge_color}; border: 1px solid {badge_color};">{beat['beat_status']}</span>
          </div>
          <div class="image-row">
            <div class="img-box">
              <span class="img-label">Rendered Frame</span>
              <img src="stills/{img_filename}" alt="{beat['id']}" />
            </div>
            <div class="img-box">
              <span class="img-label">Saliency & Safe Margins</span>
              <img src="stills/heatmaps/{heatmap_filename}" alt="{beat['id']} Heatmap" />
            </div>
          </div>
          <div class="metrics-grid">
            <div class="metric">
              <span class="m-label">Archetype</span>
              <span class="m-val">{beat['archetype']}</span>
            </div>
            <div class="metric">
              <span class="m-label">Contrast Ratio</span>
              <span class="m-val">{checks['contrast']['contrast_ratio']}:1</span>
            </div>
            <div class="metric">
              <span class="m-label">Collision Score</span>
              <span class="m-val">{checks['collision']['collision_score']}</span>
            </div>
            <div class="metric">
              <span class="m-label">Clipped Pixels</span>
              <span class="m-val">{checks['specular_clipping']['clipped_pixel_ratio']*100:.2f}%</span>
            </div>
          </div>
        </div>
        """
        html_cards.append(card_html)

    html_doc = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Locus Perceptual Frame Audit Dashboard</title>
  <style>
    body {{
      background-color: #080C14;
      color: #E2E8F0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      margin: 0;
      padding: 40px;
    }}
    .header {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #1E293B;
      padding-bottom: 24px;
      margin-bottom: 36px;
    }}
    .title {{ font-size: 28px; font-weight: 800; color: #FFFFFF; }}
    .subtitle {{ font-size: 14px; color: #94A3B8; margin-top: 6px; font-family: monospace; }}
    .grid {{ display: grid; grid-template-columns: repeat(auto-fit, minmax(580px, 1fr)); gap: 28px; }}
    .beat-card {{
      background: #0F172A;
      border: 1px solid #1E293B;
      border-radius: 12px;
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }}
    .card-header {{ display: flex; justify-content: space-between; align-items: center; }}
    .beat-title {{ font-weight: 700; font-size: 16px; color: #F8FAFC; font-family: monospace; }}
    .badge {{ font-size: 11px; font-weight: 800; padding: 4px 10px; border-radius: 6px; font-family: monospace; }}
    .image-row {{ display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }}
    .img-box {{ display: flex; flex-direction: column; gap: 6px; }}
    .img-label {{ font-size: 11px; color: #64748B; font-weight: 600; text-transform: uppercase; font-family: monospace; }}
    .img-box img {{ width: 100%; border-radius: 6px; border: 1px solid #334155; }}
    .metrics-grid {{
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 8px;
      background: #090D16;
      padding: 12px;
      border-radius: 8px;
    }}
    .metric {{ display: flex; flex-direction: column; gap: 2px; }}
    .m-label {{ font-size: 10px; color: #64748B; font-weight: 600; text-transform: uppercase; }}
    .m-val {{ font-size: 13px; font-weight: 700; color: #4daeeb; font-family: monospace; }}
  </style>
</head>
<body>
  <div class="header">
    <div>
      <div class="title">🎬 Locus Automated Visual Frame Audit Dashboard</div>
      <div class="subtitle">Inspecting 16 Narrative Beats // Computer Vision Saliency & Collision Matrix</div>
    </div>
    <div>
      <span class="badge" style="background: #10B98122; color: #10B981; border: 1px solid #10B981; font-size: 14px; padding: 8px 16px;">
        STATUS: {report['overall_status']} ({len(report['beats_analyzed'])} BEATS)
      </span>
    </div>
  </div>
  <div class="grid">
    {''.join(html_cards)}
  </div>
</body>
</html>
"""
    with open(DASHBOARD_PATH, "w") as f:
        f.write(html_doc)
    print(f"Generated Visual Audit Dashboard at {DASHBOARD_PATH}")

if __name__ == "__main__":
    build_dashboard()
