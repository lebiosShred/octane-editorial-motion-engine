import React from 'react';

interface BoardConnectorProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color?: string;
  drawProgress?: number;
}

export const BoardConnector: React.FC<BoardConnectorProps> = ({
  x1,
  y1,
  x2,
  y2,
  color = 'rgba(255, 255, 255, 0.5)',
  drawProgress = 1.0
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
  const pathD = Math.abs(localY1 - localY2) < 5
    ? `M ${localX1} ${localY1} L ${localX2} ${localY2}`
    : `M ${localX1} ${localY1} L ${midX} ${localY1} L ${midX} ${localY2} L ${localX2} ${localY2}`;

  const length = Math.abs(x2 - x1) + Math.abs(y2 - y1);
  const dashOffset = length * (1 - drawProgress);

  const markerId = `arrow-${x1}-${y1}-${x2}-${y2}`.replace(/[.-]/g, '_');

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
        <defs>
          <marker
            id={markerId}
            viewBox="0 0 10 10"
            refX="6"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 1 L 8 5 L 0 9 z" fill={color} />
          </marker>
        </defs>

        <path
          d={pathD}
          fill="none"
          stroke="rgba(255, 255, 255, 0.06)"
          strokeWidth="2"
          strokeDasharray="6 4"
        />

        <path
          d={pathD}
          fill="none"
          stroke={color}
          strokeWidth="2.5"
          strokeDasharray={length}
          strokeDashoffset={dashOffset}
          markerEnd={drawProgress >= 0.95 ? `url(#${markerId})` : undefined}
          style={{
            filter: `drop-shadow(0 0 6px ${color})`,
            transition: 'stroke-dashoffset 0.1s ease-out'
          }}
        />

        {drawProgress > 0.05 && (
          <>
            <circle cx={localX1} cy={localY1} r="4" fill={color} />
            <circle cx={localX1} cy={localY1} r="8" stroke={color} strokeWidth="1.5" fill="none" opacity="0.5" />
          </>
        )}
      </svg>
    </div>
  );
};
