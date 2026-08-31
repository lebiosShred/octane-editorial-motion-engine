import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';

interface KineticLaserConduitProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color?: string;
  drawProgress: number;
}

export const KineticLaserConduit: React.FC<KineticLaserConduitProps> = ({
  x1,
  y1,
  x2,
  y2,
  color = '#E11D48',
  drawProgress
}) => {
  const frame = useCurrentFrame();

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

  // Active Photon Pulse Packet
  const photonProgress = (frame * 5) % totalLength;
  const photonFraction = drawProgress > 0.8 ? (photonProgress / totalLength) : 0;
  const photonX = startX + dx * photonFraction;
  const photonY = startY + dy * photonFraction;

  // Port Arrival Shockwave Ripple Ring
  const rippleScale = interpolate((frame * 2.5) % 50, [0, 50], [1, 3.5]);
  const rippleOpacity = interpolate((frame * 2.5) % 50, [0, 50], [0.8, 0]);

  const markerId = `laser-arrow-${color.replace('#', '')}`;

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
        zIndex: 5
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

        {/* High-Velocity Photon Energy Pulse */}
        {drawProgress > 0.6 && (
          <g transform={`translate(${photonX}, ${photonY})`}>
            <circle r="6" fill={color} opacity={0.6} filter="url(#laserGlow)" />
            <circle r="3" fill="#FFFFFF" />
          </g>
        )}

        {/* Source Port Terminal */}
        <circle cx={startX} cy={startY} r="4" fill={color} />
        <circle cx={startX} cy={startY} r="2" fill="#FFFFFF" />

        {/* Destination Port Ripple Shockwave */}
        {drawProgress >= 0.95 && (
          <g transform={`translate(${endX}, ${endY})`}>
            <circle r={rippleScale * 4} fill="none" stroke={color} strokeWidth="1.5" opacity={rippleOpacity} />
            <circle r="4.5" fill={color} />
            <circle r="2" fill="#FFFFFF" />
          </g>
        )}
      </svg>
    </div>
  );
};
