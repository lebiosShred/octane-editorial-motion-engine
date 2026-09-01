# Octane Editorial Motion Graphics & WebGL 3D Engine

Production-grade Remotion 60 FPS motion graphics suite engineered for high-retention enterprise technical commercials, real WebGL 3D architectural dioramas, content-adaptive kinetic typography, and authentic software UI execution.

---

## 🚀 Engine Innovations

1. **Pure WebGL 3D Architecture**: Powered by `@remotion/three`, `three`, `@react-three/fiber`, and `@react-three/drei`. Replaces flat 2.5D CSS DOM hacks with true 3D volumetric meshes, physical PBR shaders, dynamic directional lights, and reflective ground perspective grids.
2. **16-Beat Temporal Storyboard Engine**: Dissects narration into high-density 2.0s – 3.5s micro-beats mapped to exact Whisper voiceover timestamps in [`BeatDirectorEngine.ts`](./src/engine/BeatDirectorEngine.ts). Eliminates static scene holds.
3. **Dynamic Context-Adaptive Layout Director**: [`DynamicLayoutDirector.tsx`](./src/components/layout/DynamicLayoutDirector.tsx) eliminates rigid top/bottom letterbox locks by switching across **5 visual layout archetypes**:
   * **`kinetic_hero`**: Full-screen centered bold typography (72px–96px) with glowing drop shadows; subtitles hide automatically.
   * **`spatial_anchor`**: Zero 2D text; callouts and labels float in WebGL 3D coordinate space.
   * **`technical_hud`**: Low-profile lower-left monospace telemetry bracket giving 85%+ screen space to 3D architecture.
   * **`split_asymmetric`**: High-contrast headline docked on the left 40% with the 3D diorama on the right 60%.
   * **`cinema_clean`**: Complete 2D UI blackout for 1.5s–2.0s during high-impact physics events (code shatter, switch flip).
4. **Authentic Product UI Fidelity**: Replaces abstract mockup shapes with high-DPI (2048x1024) WebGL canvas textures:
   * **VS Code Editor**: macOS window chrome, TypeScript syntax tokens, line numbers, and live schema error squiggles ([`TerminalEditorTexture.tsx`](./src/components/ui/TerminalEditorTexture.tsx)).
   * **SAP S/4HANA PO Table**: Enterprise Fiori table with status telemetry and amber delay highlights ([`SapFioriTableTexture.tsx`](./src/components/ui/SapFioriTableTexture.tsx)).
   * **ServiceNow Incident Form**: P1 critical ticket with watsonx AI reasoning summary and interactive authorization button ([`ServiceNowIncidentTexture.tsx`](./src/components/ui/ServiceNowIncidentTexture.tsx)).
   * **3D Mouse Cursor Choreography**: Vector mouse pointer with spring inertia and tactile click ripple ([`InteractiveCursor3D.tsx`](./src/components/webgl/InteractiveCursor3D.tsx)).
   * **OpenTelemetry Distributed Trace Explorer**: Jaeger-style span tree with parent-child hierarchy lines, HTTP status badges, and animated millisecond latency bars ([`OpenTelemetryWaterfallTexture.tsx`](./src/components/ui/OpenTelemetryWaterfallTexture.tsx)).
5. **Frame-Synchronized Audio Foley Layer**: [`AudioFoleyLayer.tsx`](./src/components/audio/AudioFoleyLayer.tsx) triggers 8 procedural 48kHz sound effects (sub-bass drop, whoosh dolly, glitch shatter, core ascension riser, socket rise, laser data chirp, tactile switch snap, hero impact slam) generated via [`scripts/synthesize_audio_foley.py`](./scripts/synthesize_audio_foley.py).

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

## 📐 Project Structure

```
src/
├── WatsonxVideo.tsx              # Master composition with ThreeCanvas & Lighting Rig
├── Root.tsx                      # Remotion composition registry
├── index.ts                      # Remotion entry point
├── engine/
│   └── BeatDirectorEngine.ts     # 16-Beat temporal timeline & camera coordinate director
├── components/
│   ├── audio/
│   │   └── AudioFoleyLayer.tsx   # Frame-synchronized SFX audio triggers
│   ├── layout/
│   │   └── DynamicLayoutDirector.tsx # 5 Content-adaptive layout archetypes
│   ├── ui/
│   │   ├── TerminalEditorTexture.tsx    # Authentic VS Code WebGL texture
│   │   ├── SapFioriTableTexture.tsx     # Authentic SAP S/4HANA PO table texture
│   │   ├── ServiceNowIncidentTexture.tsx # Authentic ServiceNow incident form texture
│   │   └── OpenTelemetryWaterfallTexture.tsx # Authentic Jaeger/OTel trace texture
│   ├── webgl/
│   │   ├── CameraDirector3D.tsx  # Dynamic 3D camera interpolator
│   │   ├── CanvasText.tsx        # Offline-safe WebGL canvas texture typography
│   │   ├── InteractiveCursor3D.tsx # 3D vector mouse cursor with spring click
│   │   ├── Act1_Bottleneck3D.tsx # 3D server rack + fracturing code slab
│   │   ├── Act2_Catalog3D.tsx    # 3D core hub + 4 rising brand platform sockets
│   │   ├── Act3_Governance3D.tsx # 3D laser conduits + tactile physical approval switch
│   │   └── Act4_Observability3D.tsx # 3D OpenTelemetry waterfall + 10.1x velocity slam
│   └── forge/
│       └── SubtitleKaraoke.tsx   # Context-aware karaoke subtitle bar
scripts/
└── synthesize_audio_foley.py     # Procedural audio synthesis engine
```

---

## 📜 License & Ownership
Copyright © 2026 Octane Software Solutions. All rights reserved.
