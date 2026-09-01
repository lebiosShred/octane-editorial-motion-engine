import React from 'react';
import { IndustrialTheme } from '../../types/theme';
import { CinematicCamera } from './CinematicCamera';
import { AmbientParticleField } from '../primitives/AmbientParticleField';

interface SpatialBoardProps {
  cameraScale: number;
  cameraPanX: number;
  cameraPanY: number;
  shakeFrames?: number[];
  children: React.ReactNode;
}

export const SpatialBoard: React.FC<SpatialBoardProps> = ({
  cameraScale,
  cameraPanX,
  cameraPanY,
  shakeFrames,
  children,
}) => {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        backgroundColor: IndustrialTheme.surface.base,
      }}
    >
      {/* Expansive Ambient Blackboard Floor */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: IndustrialTheme.surface.baseGradient,
          pointerEvents: 'none',
        }}
      />

      {/* Ambient Parallax Particle Dust Field */}
      <AmbientParticleField count={24} cameraPanX={cameraPanX} cameraPanY={cameraPanY} />

      {/* Infinite Drafting Grid with Parallax */}
      <div
        style={{
          position: 'absolute',
          inset: -2000,
          backgroundImage: `linear-gradient(${IndustrialTheme.surface.gridLine} 1px, transparent 1px), linear-gradient(90deg, ${IndustrialTheme.surface.gridLine} 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
          backgroundPosition: 'center center',
          pointerEvents: 'none',
          transform: `scale(${cameraScale}) translate3d(${cameraPanX * 0.3}px, ${cameraPanY * 0.3}px, 0)`,
          transformOrigin: '50% 50%',
        }}
      />

      {/* Cinematic Gliding Spatial Stage with Impact Camera Shake */}
      <CinematicCamera
        cameraScale={cameraScale}
        cameraPanX={cameraPanX}
        cameraPanY={cameraPanY}
        shakeFrames={shakeFrames}
      >
        {children}
      </CinematicCamera>
    </div>
  );
};
