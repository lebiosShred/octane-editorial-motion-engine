import React from 'react';

interface BoardConnectorProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  label?: string;
  color?: string;
  drawProgress?: number;
  pulseOffset?: number;
}

export const BoardConnector: React.FC<BoardConnectorProps> = ({
  x1,
  y1,
  x2,
  y2,
  label,
  color = 'rgba(255, 255, 255, 0.4)',
  drawProgress = 1.0,
  pulseOffset = 0
}) => {
  const minX = Math.min(x1, x2) - 40;
  const minY = Math.min(y1, y2) - 40;
  const width = Math.max(Math.abs(x2 - x1) + 80, 80);
  const height = Math.max(Math.abs(y2 - y1) + 80, 80);

  const localX1 = x1 - minX;
  const localY1 = y1 - minY;
  const localX2 = x2 - minX;
  const localY2 = y2 - minY;

  const midX = (localX1 + localX2) / 2;
  const pathD = `M ${localX1} ${localY1} L ${midX} ${localY1} L ${midX} ${localY2} L ${localX2} ${localY2}`;

  const length = Math.abs(x2 - x1) + Math.abs(y2 - y1);
  const dashOffset = length * (1 - drawProgress);

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
        overflow: 'visible'
      }}
    >
      <svg width={width} height={height} style={{ overflow: 'visible' }}>
        <path
          d={pathD}
          fill="none"
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth="2"
          strokeDasharray="6 4"
        />

        <path
          d={pathD}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeDasharray={length}
          strokeDashoffset={dashOffset}
          style={{ transition: 'stroke-dashoffset 0.1s ease-out' }}
        />

        {drawProgress > 0.05 && (
          <circle cx={localX1} cy={localY1} r="4" fill={color} />
        )}
        {drawProgress >= 0.95 && (
          <>
            <circle cx={localX2} cy={localY2} r="4" fill={color} />
            <circle cx={localX2} cy={localY2} r="8" stroke={color} strokeWidth="1.5" fill="none" opacity="0.6" />
          </>
        )}
      </svg>

      {label && drawProgress >= 0.5 && (
        <div
          style={{
            position: 'absolute',
            left: midX,
            top: (localY1 + localY2) / 2,
            transform: 'translate(-50%, -50%)',
            background: 'rgba(11, 12, 14, 0.9)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: 6,
            padding: '2px 8px',
            fontSize: 9,
            fontFamily: 'monospace',
            fontWeight: 700,
            color: '#FFFFFF',
            whiteSpace: 'nowrap'
          }}
        >
          {label}
        </div>
      )}
    </div>
  );
};
