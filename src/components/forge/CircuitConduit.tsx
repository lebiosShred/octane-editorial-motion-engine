import React from 'react';

interface CircuitConduitProps {
  width?: number;
  height?: number;
  startX?: number;
  startY?: number;
  endX?: number;
  endY?: number;
  color?: string;
  pulseOffset?: number;
  labelStart?: string;
  labelEnd?: string;
}

export const CircuitConduit: React.FC<CircuitConduitProps> = ({
  width = 240,
  height = 24,
  startX = 10,
  startY = 12,
  endX = 230,
  endY = 12,
  color = '#38BDF8',
  pulseOffset = 0,
  labelStart,
  labelEnd
}) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      {labelStart && (
        <span style={{ fontSize: 11, color: '#94A3B8', fontFamily: 'monospace', whiteSpace: 'nowrap' }}>
          {labelStart}
        </span>
      )}

      <svg width={width} height={height} style={{ overflow: 'visible' }}>
        <line
          x1={startX}
          y1={startY}
          x2={endX}
          y2={endY}
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth="2"
        />
        <line
          x1={startX}
          y1={startY}
          x2={endX}
          y2={endY}
          stroke={color}
          strokeWidth="2"
          strokeDasharray="12 6"
          strokeDashoffset={pulseOffset}
        />
        <circle cx={startX} cy={startY} r="3" fill={color} />
        <circle cx={startX} cy={startY} r="6" stroke={color} strokeWidth="1" fill="none" opacity="0.5" />
        <circle cx={endX} cy={endY} r="3" fill={color} />
        <circle cx={endX} cy={endY} r="6" stroke={color} strokeWidth="1" fill="none" opacity="0.5" />
      </svg>

      {labelEnd && (
        <span style={{ fontSize: 11, color: '#10B981', fontFamily: 'monospace', whiteSpace: 'nowrap' }}>
          {labelEnd}
        </span>
      )}
    </div>
  );
};
