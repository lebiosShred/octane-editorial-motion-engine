# Octane Editorial Motion Graphics & Commercial Engine

Production-grade Remotion motion graphics suite engineered for high-retention B2B SaaS product commercials, technical architectural explainers, and high-impact event teasers.

---

## 🎬 Composition Gallery

| Composition | Duration | Resolution | Description |
| :--- | :--- | :--- | :--- |
| **`TM1FeederCommercial`** | 35.8s (1074 f) | 1920x1080 @ 30fps | Mathematical B2B product commercial for the **TM1 Feeder Diagnostic Playbook**. Features Kokoro voiceover, 3D dolly zoom, kinetic topology, and high-contrast leaf/target cell telemetry. |
| **`ForefrontSummitTeaser`** | 31.0s (930 f) | 1920x1080 @ 30fps | High-energy event teaser for the **Finance Transformation Summit NSW 2026**. Features real live-action B-roll, All-Intra 30fps keyframes, Inter 900 kinetic typography, and Booth 19 sponsor callout. |

---

## 🚀 Quickstart

### Prerequisites
- Node.js 18+
- Python 3.10+
- FFmpeg & FFprobe (installed and accessible in system PATH)

### Installation
```bash
npm install
```

### Preview Compositions in Remotion Studio
```bash
npm start
```

### Render Master MP4s
```bash
# Render B2B TM1 Feeder Commercial
npm run render:feeder

# Render Forefront Summit Teaser
npm run render:forefront

# Batch Render All Compositions
npm run render:all
```

---

## 🛠️ Video Asset Optimization Tooling

To ensure zero dropped frames and fluid playback inside Remotion, all video clips must be converted to **Constant 30 FPS All-Intra (I-frame only)**:

```bash
npm run optimize:videos
```

This CLI script scans `public/vid_*.mp4`, probes stream metadata, and re-encodes any non-compliant video to:
- Codec: H.264 Baseline Profile (Level 3.0)
- Pixel Format: `yuv420p`
- Framerate: Constant 30.000 FPS
- Keyframe Interval: `-g 1` (All-Intra)
- Container: MP4 FastStart (`+faststart`)

---

## 📐 Design System & Standards

- **Brand Palette**: Octane Sky Blue (`#4daeeb`), Obsidian (`#000000` / `#090A0C`), White (`#FFFFFF`).
- **Typography**: Inter (Kinetic Headers) + JetBrains Mono (Telemetry & Badges).
- **Physics**: Configured spring dynamics (`mass: 0.5, damping: 12, stiffness: 140`).
- For complete motion guidelines, see [`PLAYBOOK.md`](./PLAYBOOK.md).

---

## 📜 License & Ownership
Copyright © 2026 Octane Software Solutions. All rights reserved.
