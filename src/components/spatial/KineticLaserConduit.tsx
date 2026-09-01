import React from 'react';
import { useCurrentFrame } from 'remotion';

interface KineticLaserConduitProps {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  color?: string;
  pulseSpeed?: number;
  isActive?: boolean;
  statusText?: string;
}

export const KineticLaserConduit: React.FC<KineticLaserConduitProps> = ({
  startX,
  startY,
  endX,
  endY,
  color = '#4daeeb',
  pulseSpeed = 6,
  isActive = true,
  statusText,
}) => {
  const frame = useCurrentFrame();

  const dx = endX - startX;
  const dy = endY - startY;
  const cx1 = startX + dx * 0.5;
  const cy1 = startY;
  const cx2 = startX + dx * 0.5;
  const cy2 = endY;

  const pathData = `M ${startX} ${startY} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${endX} ${endY}`;
  const strokeDashoffset = -(frame * pulseSpeed) % 200;

  return (
    <g>
      {/* Background Track Line */}
      <path
        d={pathData}
        fill="none"
        stroke={isActive ? 'rgba(77, 174, 235, 0.25)' : 'rgba(255, 255, 255, 0.08)'}
        strokeWidth={3}
        strokeLinecap="round"
      />

      {/* Active Glowing Laser Conduit */}
      {isActive && (
        <path
          d={pathData}
          fill="none"
          stroke={color}
          strokeWidth={4}
          strokeDasharray="24 60"
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{
            filter: `drop-shadow(0 0 8px ${color})`,
          }}
        />
      )}

      {/* Midpoint Status Tag */}
      {statusText && (
        <text
          x={startX + dx * 0.5}
          y={startY + dy * 0.5 - 10}
          fill={color}
          fontSize={11}
          fontWeight={900}
          fontFamily="'JetBrains Mono', monospace"
          textAnchor="middle"
          letterSpacing="0.1em"
        >
          {statusText}
        </text>
      )}
    </g>
  );
};
