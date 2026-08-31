import React from 'react';
import { useCurrentFrame } from 'remotion';

interface AmbientParticleFieldProps {
  count?: number;
  cameraPanX?: number;
  cameraPanY?: number;
}

export const AmbientParticleField: React.FC<AmbientParticleFieldProps> = ({
  count = 24,
  cameraPanX = 0,
  cameraPanY = 0
}) => {
  const frame = useCurrentFrame();

  const particles = React.useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      x: ((i * 137.5) % 1920) - 960,
      y: ((i * 243.7) % 1080) - 540,
      size: 2 + (i % 3),
      depth: 0.2 + ((i % 5) * 0.15),
      speed: 0.02 + ((i % 4) * 0.01)
    }));
  }, [count]);

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 2 }}>
      {particles.map((p, idx) => {
        const floatY = Math.sin((frame * p.speed) + idx) * 15;
        const posX = p.x + (cameraPanX * p.depth);
        const posY = p.y + floatY + (cameraPanY * p.depth);

        return (
          <div
            key={idx}
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: p.size,
              height: p.size,
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.12)',
              boxShadow: '0 0 6px rgba(255, 255, 255, 0.2)',
              transform: `translate3d(calc(-50% + ${posX}px), calc(-50% + ${posY}px), 0)`
            }}
          />
        );
      })}
    </div>
  );
};
