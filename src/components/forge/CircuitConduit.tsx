import React from 'react';
import { IndustrialTheme } from '../../types/theme';

interface CircuitConduitProps {
  labelStart?: string;
  labelEnd?: string;
  pulseOffset?: number;
  color?: string;
}

export const CircuitConduit: React.FC<CircuitConduitProps> = ({
  labelStart = '[ Leaf Input ]',
  labelEnd = '[ Target Cell ]',
  pulseOffset = 0,
  color = '#4daeeb'
}) => {
  const height = 36;
  const startY = 18;
  const endY = 18;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        padding: '6px 4px',
        gap: 14
      }}
    >
      {/* High-Contrast Start Badge */}
      <div
        style={{
          background: '#090A0C',
          color: '#FFFFFF',
          fontSize: 14,
          fontWeight: 900,
          fontFamily: IndustrialTheme.fonts.mono,
          letterSpacing: '0.04em',
          padding: '7px 16px',
          borderRadius: 8,
          border: `1.5px solid ${color}`,
          boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)',
          whiteSpace: 'nowrap'
        }}
      >
        {labelStart}
      </div>

      {/* High-Visibility Laser Conduit */}
      <div style={{ flex: 1, height, position: 'relative' }}>
        <svg width="100%" height={height} style={{ overflow: 'visible' }}>
          {/* Background Track */}
          <line
            x1="0%"
            y1={startY}
            x2="100%"
            y2={endY}
            stroke="#94A3B8"
            strokeWidth="3"
            strokeDasharray="6 4"
            opacity={0.6}
          />
          {/* Active Glowing Laser Conduit */}
          <line
            x1="0%"
            y1={startY}
            x2="100%"
            y2={endY}
            stroke={color}
            strokeWidth="3.5"
            strokeDasharray="12 6"
            strokeDashoffset={-pulseOffset}
            style={{ filter: `drop-shadow(0 0 8px ${color})` }}
          />
          {/* Endpoint Terminals */}
          <circle cx="0%" cy={startY} r="6" fill={color} stroke="#FFFFFF" strokeWidth="2.5" />
          <circle cx="100%" cy={endY} r="6" fill={color} stroke="#FFFFFF" strokeWidth="2.5" />
        </svg>
      </div>

      {/* High-Contrast End Badge */}
      <div
        style={{
          background: '#090A0C',
          color: '#FFFFFF',
          fontSize: 14,
          fontWeight: 900,
          fontFamily: IndustrialTheme.fonts.mono,
          letterSpacing: '0.04em',
          padding: '7px 16px',
          borderRadius: 8,
          border: `1.5px solid ${color}`,
          boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)',
          whiteSpace: 'nowrap'
        }}
      >
        {labelEnd}
      </div>
    </div>
  );
};
