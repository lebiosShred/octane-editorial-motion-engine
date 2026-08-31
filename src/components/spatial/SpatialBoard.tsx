import React from 'react';
import { IndustrialTheme } from '../../types/theme';

interface SpatialBoardProps {
  cameraScale: number;
  cameraPanX: number;
  cameraPanY: number;
  children: React.ReactNode;
}

export const SpatialBoard: React.FC<SpatialBoardProps> = ({
  cameraScale,
  cameraPanX,
  cameraPanY,
  children
}) => {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        backgroundColor: IndustrialTheme.surface.base
      }}
    >
      {/* Expansive Ambient Blackboard Floor */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: IndustrialTheme.surface.baseGradient,
          pointerEvents: 'none'
        }}
      />

      {/* Infinite Drafting Grid */}
      <div
        style={{
          position: 'absolute',
          inset: -2000,
          backgroundImage: `linear-gradient(${IndustrialTheme.surface.gridLine} 1px, transparent 1px), linear-gradient(90deg, ${IndustrialTheme.surface.gridLine} 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
          backgroundPosition: 'center center',
          pointerEvents: 'none',
          transform: `scale(${cameraScale}) translate(${cameraPanX * 0.3}px, ${cameraPanY * 0.3}px)`,
          transformOrigin: '50% 50%'
        }}
      />

      {/* Gliding Spatial Stage */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transform: `scale(${cameraScale}) translate(${cameraPanX}px, ${cameraPanY}px)`,
          transformOrigin: '50% 50%'
        }}
      >
        {children}
      </div>
    </div>
  );
};
