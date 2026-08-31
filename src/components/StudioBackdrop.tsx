import React from 'react';
import { IndustrialTheme } from '../types/theme';

interface StudioBackdropProps {
  gridSize?: number;
  showGrid?: boolean;
}

export const StudioBackdrop: React.FC<StudioBackdropProps> = ({
  gridSize = 40,
  showGrid = true
}) => {
  return (
    <>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: IndustrialTheme.surface.baseGradient,
          pointerEvents: 'none'
        }}
      />
      {showGrid && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `linear-gradient(${IndustrialTheme.surface.gridLine} 1px, transparent 1px), linear-gradient(90deg, ${IndustrialTheme.surface.gridLine} 1px, transparent 1px)`,
            backgroundSize: `${gridSize}px ${gridSize}px`,
            backgroundPosition: 'center center',
            opacity: 0.9,
            pointerEvents: 'none'
          }}
        />
      )}
    </>
  );
};
