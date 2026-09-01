# Octane Editorial Motion Graphics & WebGL 3D Engine

Production-grade Remotion 60 FPS motion graphics suite engineered for high-retention enterprise technical commercials, real WebGL 3D architectural dioramas, content-adaptive kinetic typography, authentic software UI execution, and automated frame-by-frame perceptual visual QA.

---

## 🚀 Engine Innovations

1. **Automated Perceptual Frame Inspector & Visual Study Engine**:
   * Mimics the frame-by-frame visual analysis loop of a professional human motion designer.
   * Runs 6 automated computer vision checks via OpenCV and NumPy ([`scripts/perceptual_frame_inspector.py`](./scripts/perceptual_frame_inspector.py)):
     * **Text-to-Mesh Collision Detection**: Bounding box edge density checks.
     * **WCAG AAA Contrast Ratio**: Local luminance analysis ensuring text legibility.
     * **Broadcast Safe Area Guard**: 5% Action Safe and 10% Title Safe boundary compliance.
     * **Specular Glare & Clipping**: Overexposure histogram analysis.
     * **Spectral Residual Visual Saliency**: Mathematical eye-trace focal center heatmaps.
     * **Optical Motion Continuity**: Frame-to-frame velocity delta checks.
   * Generates interactive visual audit dashboards with heatmap overlays ([`scripts/generate_visual_audit_dashboard.py`](./scripts/generate_visual_audit_dashboard.py)).
2. **Pure WebGL 3D Architecture**: Powered by `@remotion/three`, `three`, `@react-three/fiber`, and `@react-three/drei`. Replaces flat 2.5D CSS DOM hacks with true 3D volumetric meshes, physical PBR shaders, dynamic 3-point studio lighting, and reflective ground perspective grids.
3. **16-Beat Temporal Storyboard Engine**: Dissects narration into high-density 2.0s – 3.5s micro-beats mapped to exact Whisper voiceover timestamps in [`BeatDirectorEngine.ts`](./src/engine/BeatDirectorEngine.ts). Eliminates static scene holds.
4. **Dynamic Context-Adaptive Layout Director**: [`DynamicLayoutDirector.tsx`](./src/components/layout/DynamicLayoutDirector.tsx) eliminates rigid top/bottom letterbox locks by switching across **5 visual layout archetypes** (`kinetic_hero`, `spatial_anchor`, `technical_hud`, `split_asymmetric`, `cinema_clean`).
5. **Authentic Product UI Fidelity**: Replaces abstract mockup shapes with high-DPI (2048x1024) WebGL canvas textures:
   * **VS Code Editor**: macOS window chrome, TypeScript syntax tokens, line numbers, and live schema error squiggles ([`TerminalEditorTexture.tsx`](./src/components/ui/TerminalEditorTexture.tsx)).
   * **SAP S/4HANA PO Table**: Enterprise Fiori table with status telemetry and amber delay highlights ([`SapFioriTableTexture.tsx`](./src/components/ui/SapFioriTableTexture.tsx)).
   * **ServiceNow Incident Form**: P1 critical ticket with watsonx AI reasoning summary and interactive authorization button ([`ServiceNowIncidentTexture.tsx`](./src/components/ui/ServiceNowIncidentTexture.tsx)).
   * **3D Mouse Cursor Choreography**: Vector mouse pointer with spring inertia and tactile click ripple ([`InteractiveCursor3D.tsx`](./src/components/webgl/InteractiveCursor3D.tsx)).
   * **OpenTelemetry Distributed Trace Explorer**: Jaeger-style span tree with parent-child hierarchy lines, HTTP status badges, and animated millisecond latency bars ([`OpenTelemetryWaterfallTexture.tsx`](./src/components/ui/OpenTelemetryWaterfallTexture.tsx)).
6. **Frame-Synchronized Audio Foley Layer**: [`AudioFoleyLayer.tsx`](./src/components/audio/AudioFoleyLayer.tsx) triggers 8 procedural 48kHz sound effects (sub-bass drop, whoosh dolly, glitch shatter, core ascension riser, socket rise, laser data chirp, tactile switch snap, hero impact slam) generated via [`scripts/synthesize_audio_foley.py`](./scripts/synthesize_audio_foley.py).

---

## 🎬 Composition Gallery

| Composition | Duration | Resolution | Description |
| :--- | :--- | :--- | :--- |
| **`WatsonxVideo`** | 56.8s (3,407 f) | 1920x1080 @ 60fps | 16-Beat WebGL 3D commercial for **IBM watsonx Orchestrate**. Features 3D server rack, fracturing VS Code editor, ascending 150+ agent catalog pedestal, tactile 1-click governance toggle with mouse click, and OpenTelemetry distributed trace waterfall. |
| **`WatsonxVideoVertical`** | 56.8s (3,407 f) | 1080x1920 @ 60fps | 9:16 Vertical format for mobile distribution and social video feeds. |
| **`WebGLSmokeTest`** | 2.0s (120 f) | 1920x1080 @ 60fps | Minimal WebGL 3D shader and lighting verification composition. |

---

## 🛠️ Quickstart

### Prerequisites
- Node.js 18+
- Python 3.10+
- FFmpeg installed in system PATH

### Installation
```bash
npm install
```

### Run Automated Perceptual Frame Inspection
```bash
npm run inspect:frames
```

### Generate Visual Audit Dashboard & Heatmaps
```bash
npm run inspect:report
```

### Synthesize Audio Foley Sound Effects
```bash
npm run sfx:synth
```

### Preview in Remotion Studio
```bash
npm run dev
```

### Render 60 FPS Master Video
```bash
npm run render
```

### Export Key Archetype Stills
```bash
npm run render:stills
```

---

## 📜 License & Ownership
Copyright © 2026 Octane Software Solutions. All rights reserved.
