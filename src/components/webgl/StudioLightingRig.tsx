import React from 'react';
import { useCurrentFrame } from 'remotion';
import { BeatDirectorEngine } from '../../engine/BeatDirectorEngine';

export const StudioLightingRig: React.FC = () => {
  const frame = useCurrentFrame();
  const currentBeat = BeatDirectorEngine.getCurrentBeat(frame);
  const [tx, ty, tz] = currentBeat.camera.lookAt;

  return (
    <>
      {/* Soft Ambient Base */}
      <ambientLight intensity={0.65} color="#0B1220" />

      {/* 1. Key Light (High-intensity Directional) */}
      <directionalLight
        position={[6, 10, 8]}
        intensity={1.9}
        color="#FFFFFF"
      />

      {/* 2. Cool Blue Fill Bounce Light */}
      <directionalLight
        position={[-8, -4, 4]}
        intensity={0.6}
        color="#1E3A8A"
      />

      {/* 3. Razor Cyan Rim / Kicker Backlight (Separates 3D meshes from background) */}
      <directionalLight
        position={[0, 8, -8]}
        intensity={2.2}
        color="#4daeeb"
      />

      {/* 4. Emerald Accent Rim Kicker */}
      <directionalLight
        position={[8, -2, -6]}
        intensity={1.2}
        color="#10B981"
      />

      {/* 5. Dynamic Moving Follow Spotlight (Tracks active narrative target) */}
      <pointLight
        position={[tx, ty + 2.5, tz + 3.0]}
        intensity={1.6}
        color="#4daeeb"
        distance={10}
        decay={1.8}
      />
    </>
  );
};
