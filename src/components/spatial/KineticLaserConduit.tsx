import React from 'react';
import { useCurrentFrame } from 'remotion';

interface KineticLaserConduitProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color?: string;
  drawProgress: number;
  opacity?: number;
}

export const KineticLaserConduit: React.FC<KineticLaserConduitProps> = ({
  x1,
  y1,
  x2,
  y2,
  color = '#E11D48',
  drawProgress,
  opacity = 1.0
}) => {
  const frame = useCurrentFrame();

  if (drawProgress <= 0.01 || opacity <= 0.01) {
    return null;
  }

  const minX = Math.min(x1, x2) - 80;
  const minY = Math.min(y1, y2) - 80;
  const width = Math.abs(x2 - x1) + 160;
  const height = Math.abs(y2 - y1) + 160;

  const startX = x1 - minX;
  const startY = y1 - minY;
  const endX = x2 - minX;
  const endY = y2 - minY;

  const dx = endX - startX;
  const dy = endY - startY;
  const pathD = `M ${startX} ${startY} C ${startX + dx * 0.45} ${startY}, ${startX + dx * 0.55} ${endY}, ${endX} ${endY}`;
  const totalLength = Math.sqrt(dx * dx + dy * dy) * 1.15;

  const markerId = `laser-arrow-${color.replace('#', '')}`;
  const pulseOffset = -(frame * 8);

  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: `translate(calc(-50% + ${minX}px), calc(-50% + ${minY}px))`,
        width,
        height,
        pointerEvents: 'none',
        zIndex: 5,
        opacity,
        transition: 'opacity 0.2s ease-out'
      }}
    >
      <svg width={width} height={height} style={{ overflow: 'visible' }}>
        <defs>
          <filter id="laserGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <marker
            id={markerId}
            viewBox="0 0 10 10"
            refX="6"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill={color} />
          </marker>
        </defs>

        {/* Outer Laser Glow Conduit */}
        <path
          d={pathD}
          fill="none"
          stroke={color}
          strokeWidth="3.5"
          strokeDasharray={totalLength}
          strokeDashoffset={totalLength * (1 - drawProgress)}
          strokeLinecap="round"
          filter="url(#laserGlow)"
          opacity={0.85}
          markerEnd={drawProgress > 0.9 ? `url(#${markerId})` : undefined}
        />

        {/* Inner High-Density Core Laser Line */}
        <path
          d={pathD}
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="1.2"
          strokeDasharray={totalLength}
          strokeDashoffset={totalLength * (1 - drawProgress)}
          strokeLinecap="round"
          opacity={0.9}
        />

        {/* Traveling Luminous Photon Streak (Pure High-Speed Dash Streak) */}
        {drawProgress > 0.7 && (
          <path
            d={pathD}
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            strokeDasharray="24 160"
            strokeDashoffset={pulseOffset}
            strokeLinecap="round"
            filter="url(#laserGlow)"
            opacity={0.95}
          />
        )}
      </svg>
    </div>
  );
};
