# Octane Editorial Motion Graphics & WebGL 3D Engine

Production-grade Remotion 60 FPS motion graphics suite engineered for high-retention enterprise technical explainers, pure WebGL 3D architectural dioramas, and sentence-synchronized kinetic commercials.

---

## 🚀 Engine Innovations

1. **Pure WebGL 3D Architecture**: Powered by `@remotion/three`, `three`, `@react-three/fiber` (v9+), and `@react-three/drei`. Replaces flat 2.5D CSS DOM hacks with true 3D volumetric meshes, physical PBR shaders, dynamic directional lights, and reflective ground perspective grids.
2. **16-Beat Temporal Storyboard Engine**: Dissects narration into high-density 2.0s – 3.5s micro-beats mapped to exact Whisper voiceover timestamps in [`BeatDirectorEngine.ts`](./src/engine/BeatDirectorEngine.ts). Eliminates static scene holds.
3. **Continuous 3D Camera Choreography**: [`CameraDirector3D.tsx`](./src/components/webgl/CameraDirector3D.tsx) drives smooth cubic-bezier camera transitions across 3D coordinate space with subtle organic micro-drift.
4. **Offline-Safe Canvas Texture Rendering**: [`CanvasText.tsx`](./src/components/webgl/CanvasText.tsx) renders crisp, vector monospace code syntax and telemetry labels synchronously into WebGL textures without external font CDN dependencies.

---

## 🎬 Composition Gallery

| Composition | Duration | Resolution | Description |
| :--- | :--- | :--- | :--- |
| **`WatsonxVideo`** | 56.8s (3,407 f) | 1920x1080 @ 60fps | 16-Beat WebGL 3D commercial for **IBM watsonx Orchestrate**. Features 3D server rack, fracturing code mesh, ascending 150+ agent catalog pedestal, tactile 1-click governance toggle, and OpenTelemetry waterfall. |
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

### Preview in Remotion Studio
```bash
npm run dev
```

### Render 60 FPS Master MP4
```bash
# Render Master 16-Beat 3D Video
npm run render
```

---

## 📐 WebGL 3D Architecture Structure

```
src/
├── WatsonxVideo.tsx              # Master composition with ThreeCanvas & Lighting Rig
├── Root.tsx                      # Remotion composition registry
├── index.ts                      # Remotion entry point
├── engine/
│   └── BeatDirectorEngine.ts     # 16-Beat temporal timeline & camera coordinate director
└── components/
    ├── webgl/
    │   ├── CameraDirector3D.tsx  # Dynamic 3D camera interpolator
    │   ├── CanvasText.tsx        # Offline-safe WebGL canvas texture typography
    │   ├── Act1_Bottleneck3D.tsx # 3D server rack + fracturing code slab
    │   ├── Act2_Catalog3D.tsx    # 3D core hub + 4 rising brand platform sockets
    │   ├── Act3_Governance3D.tsx # 3D laser conduits + tactile physical approval switch
    │   └── Act4_Observability3D.tsx # 3D OpenTelemetry waterfall + 10.1x velocity slam
    └── forge/
        └── SubtitleKaraoke.tsx   # Word-synchronized karaoke subtitle bar
```

---

## 📜 License & Ownership
Copyright © 2026 Octane Software Solutions. All rights reserved.
