# 🎬 Octane Editorial Motion Graphics Engine

> **High-Retention Guided Micro-Target Storytelling & Remotion Motion Graphics Suite**

A production-grade motion design engine built with **React**, **TypeScript**, and **Remotion 4.x**, engineered specifically for high-converting B2B technical product commercials, keynote animations, and SaaS product tours.

---

## 💎 Core Architectural Principles

### 1. 🔍 Guided Micro-Target Inspection (Macro-to-Micro Tour)
Never present wide, static dashboards that cause visual fatigue. The engine acts as a **guided spotlight / magnifying glass**:
- **Tight Micro-Zooms (1.30x - 1.40x)**: Focuses on a single active metric or KPI.
- **Focal Spotlighting**: The active target is illuminated at 100% opacity with active micro-animations; surrounding UI elements gracefully dim to 40% opacity with a soft 1.5px blur.
- **Sequential Panning**: The exact millisecond the narrative shifts, the virtual camera smoothly pans across the canvas to the next target with cubic bezier deceleration (`Easing.bezier(0.22, 1, 0.36, 1)`).

### 2. 🛡️ Locked Rigid Tripod Camera (Zero DVD Screensaver Bouncing)
- **Zero Floaty Physics**: Permanently bans arbitrary `Math.sin`/`Math.cos` hover oscillations and floating sine drifts.
- **Rock-Solid Stability**: Elements are grounded on a studio floor inside a single monolithic unibody chassis.

### 3. 🎨 Anti-Slop Tactile Materials (Swiss / Linear / Apple Caliber)
- **Zero Cheesy Neon Glows**: Replaces blurry text shadows with 1px hairline micro-etched specular borders (`linear-gradient`).
- **Tactile Glassmorphism**: Deep frosted slate materials (`backdropFilter: blur(30px) saturate(180%)`).
- **Swiss Typography**: Crisp SF Pro Display / Inter with tight -0.03em tracking and tabular numbers for jitter-free ticking counters.

### 4. 🎙️ Offline Synchronized Audio Pipeline
- High-energy, ultra-realistic voiceover synthesized locally using **Kokoro TTS (24kHz)**.
- Millisecond word-level timestamps extracted via **Faster-Whisper** to drive frame-exact subtitle karaoke highlighting and state transitions.

---

## 📁 Repository Structure

```
octane-editorial-motion-engine/
├── src/
│   ├── components/
│   │   ├── GuidedTourStage.tsx          # Virtual camera waypoint pan/zoom orchestrator
│   │   ├── SpotlightCard.tsx            # Frosted glassmorphism card with 1px specular highlight & active/inactive states
│   │   ├── StudioBackdrop.tsx           # Neutral dark slate floor + 1px architectural grid
│   │   └── SubtitleKaraoke.tsx          # Word-exact WhisperX audio subtitle renderer
│   ├── compositions/
│   │   ├── TM1FeederCommercial.tsx      # Master 34.3s B2B commercial composition
│   │   └── KineticSpreadsheetsMontage.tsx
│   ├── types/
│   │   └── motion.ts                    # Waypoint, Target, and Audio types
│   ├── index.ts                         # Library exports
│   └── Root.tsx                         # Remotion Root composition registry
├── scripts/
│   ├── generate_audio_pipeline.py       # Offline Kokoro TTS (24kHz) + WhisperX word timestamps
│   └── render_video.py                  # Automated 1080p rendering and CDN publishing CLI
├── public/
│   ├── voiceover.wav                    # Master voiceover audio
│   ├── voiceover.json                   # WhisperX timestamps
│   └── tm1_lag_video_hero.jpg           # 3D cutaway asset
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🚀 Quickstart Guide

### 1. Install Dependencies
```bash
npm install
```

### 2. Preview Compositions in Remotion Studio
```bash
npm start
```

### 3. Synthesize New Audio & Extract Timestamps (Offline)
```bash
npm run audio
```

### 4. Render Production 1080p MP4
```bash
npm run render
```

---

## 📜 License
MIT License (c) 2026 Octane Software Solutions.
