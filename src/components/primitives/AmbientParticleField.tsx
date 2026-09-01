import React from 'react';

interface AmbientParticleFieldProps {
  count?: number;
  cameraPanX: number;
  cameraPanY: number;
}

export const AmbientParticleField: React.FC<AmbientParticleFieldProps> = ({
  count = 24,
  cameraPanX,
  cameraPanY,
}) => {
  // Deterministic particle coordinates
  const particles = Array.from({ length: count }, (_, i) => {
    const seed = i * 137.5;
    const x = ((seed * 19) % 3840) - 1920;
    const y = ((seed * 31) % 2160) - 1080;
    const size = (i % 3) + 1.5;
    const opacity = (i % 5) * 0.08 + 0.1;
    const depth = (i % 4) * 0.15 + 0.2;
    return { id: i, x, y, size, opacity, depth };
  });

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {particles.map((p) => {
        const panOffsetX = cameraPanX * p.depth;
        const panOffsetY = cameraPanY * p.depth;
        return (
          <div
            key={p.id}
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: p.size,
              height: p.size,
              borderRadius: '50%',
              backgroundColor: '#4daeeb',
              opacity: p.opacity,
              transform: `translate3d(${p.x + panOffsetX}px, ${p.y + panOffsetY}px, 0)`,
              boxShadow: '0 0 8px rgba(77, 174, 235, 0.4)',
            }}
          />
        );
      })}
    </div>
  );
};
