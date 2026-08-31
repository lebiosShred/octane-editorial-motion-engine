import React from 'react';

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
      {/* Neutral Dark Slate Studio Floor */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 35%, rgba(30, 41, 59, 0.3) 0%, rgba(7, 9, 14, 0.98) 75%)',
          pointerEvents: 'none'
        }}
      />

      {/* Precision 1px Studio Architectural Grid */}
      {showGrid && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
            backgroundSize: `${gridSize}px ${gridSize}px`,
            backgroundPosition: 'center center',
            opacity: 0.8,
            pointerEvents: 'none'
          }}
        />
      )}
    </>
  );
};
