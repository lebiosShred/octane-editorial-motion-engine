import React from 'react';
import { IndustrialTheme } from '../../types/theme';

interface CircuitConduitProps {
  labelStart?: string;
  labelEnd?: string;
  pulseOffset?: number;
  color?: string;
}

export const CircuitConduit: React.FC<CircuitConduitProps> = ({
  labelStart = 'Source',
  labelEnd = 'Target',
  pulseOffset = 0,
  color = '#0F172A'
}) => {
  const height = 24;
  const startY = 12;
  const endY = 12;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        padding: '0 4px',
        fontSize: 10,
        fontFamily: 'monospace',
        color: IndustrialTheme.text.secondary
      }}
    >
      <span>{labelStart}</span>
      <div style={{ flex: 1, height, position: 'relative', margin: '0 8px' }}>
        <svg width="100%" height={height} style={{ overflow: 'visible' }}>
          <line
            x1="0%"
            y1={startY}
            x2="100%"
            y2={endY}
            stroke={color}
            strokeWidth="1.5"
            strokeDasharray="6 4"
            strokeDashoffset={-pulseOffset}
            opacity={0.7}
          />
          <circle cx="0%" cy={startY} r="2.5" fill={color} />
          <circle cx="100%" cy={endY} r="2.5" fill={color} />
        </svg>
      </div>
      <span>{labelEnd}</span>
    </div>
  );
};
