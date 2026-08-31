# Octane Editorial Motion Engine Playbook

This playbook documents the definitive architectural standards, design tokens, spring physics, audio synchronization rules, and video performance invariants for the **Octane Editorial Motion Graphics Suite**.

---

## 1. Brand Palette & Visual Tokens

| Token | Hex Value | Role & Usage |
| :--- | :--- | :--- |
| **Octane Sky Blue** | `#4daeeb` | Primary accent, animated highlights, focus borders, active glows |
| **Pure Obsidian Void** | `#000000` | Canvas base background, camera stage void |
| **Obsidian Surface** | `#090A0C` | Elevated cards, topology nodes, floating blackboard containers |
| **Primary Typography** | `#FFFFFF` | Hero titles, primary metrics, high-contrast labels |
| **Secondary Typography** | `#94A3B8` | Body explanations, technical context, sub-bullets |
| **Muted Slate** | `#64748B` | Inactive nodes, secondary badges, structural grid lines |
| **Warning / Flaw** | `#F43F5E` | Overfeeding, architectural failure nodes, error indicators |
| **Success / Valid** | `#10B981` | Optimal calculation, clean memory state, validated cells |

> **Strict Color Invariant**: Neon lime (`#D8F209`), random purples, and arbitrary rainbow gradients are strictly banned. All compositions must adhere to the signature Octane Sky Blue + Obsidian dark aesthetic.

---

## 2. Typography & Contrast Hierarchy

1. **Font Pairings**:
   - **Kinetic Headers & Commercial Titles**: `Inter` (weights: 700, 800, 900) with tight tracking (`letterSpacing: '-0.03em'`).
   - **Telemetry, Code, Coordinates & Badges**: `JetBrains Mono` (weights: 700, 800, 900) with wide tracking (`letterSpacing: '0.12em'` to `'0.18em'`).
2. **Contrast & Legibility Guardrails**:
   - Monospace badges must always feature dark contrast backing (`background: 'rgba(9, 10, 12, 0.9)'`) and luminous solid borders (`border: '1.5px solid #4daeeb'`).
   - Leaf input and target cell badges must never be rendered as plain low-opacity text on bright footage. Minimum text size for secondary callouts is `22px`, and hero titles must be `64px+`.

---

## 3. Spring Physics & Motion Standards

All kinetic animations must be governed by Remotion spring physics for organic deceleration without linear robotic movements:

```typescript
const sp = spring({
  frame: Math.max(0, currentFrame - startFrame),
  fps: 30,
  config: {
    mass: 0.5,       // Lightweight, rapid response
    damping: 12,     // Quick stabilization, zero jarring oscillation
    stiffness: 140   // Snappy, authoritative kinetic impact
  }
});
```

- **Slam-In Text**: `interpolate(sp, [0, 1], [0.88, 1.0])` with subtle translateY `interpolate(sp, [0, 1], [20, 0])`.
- **Fades**: Continuous linear interpolation over 6-8 frames at scene boundaries for smooth crossfades.

---

## 4. Video Normalization & Zero-Lag Invariants

When embedding live-action stock footage inside Remotion via `<Video />`:

1. **Constant 30.000 FPS All-Intra (`-g 1`)**:
   - All source MP4 files must be pre-encoded with `-g 1 -keyint_min 1 -r 30 -c:v libx264 -pix_fmt yuv420p`.
   - **Rationale**: Setting every frame as an I-frame eliminates Chromium decoder frame drops and playback stutter during high-resolution rendering.
2. **Remotion `<Sequence>` Architecture**:
   - Never use conditional time-gated rendering (`{currentTime >= 5.0 && <Video />}`) for video clips.
   - Always wrap each scene in `<Sequence from={startFrame} durationInFrames={length}>` so Remotion explicitly locks the seek head to frame 0 of the sequence.
3. **FastStart Container Header**:
   - Post-process rendered MP4s with `-movflags +faststart` to place the `moov` atom at the beginning of the file for instant streaming buffer initialization.

---

## 5. Audio Pipeline & Timing Mathematical Sync

1. **Kokoro TTS + WhisperX Synchronized Explainers**:
   - Synthesize ultra-realistic voiceover via Kokoro TTS (`am_fenrir` / `am_michael` / `af_bella`).
   - Extract precise word-level JSON timestamps using WhisperX.
   - Map Remotion camera dollies and scene transitions directly to timestamp boundaries in `public/voiceover.json`.
2. **High-Energy Electronic Teaser Trailers**:
   - Pair live-action B-roll with dedicated, royalty-free high-energy electronic trailer tracks.
   - Hard cut typography slams exactly on 4-beat musical intervals (every ~5.0s / 150 frames @ 30 FPS).
