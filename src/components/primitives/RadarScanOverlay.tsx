import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { IndustrialTheme } from '../../types/theme';

interface RadarScanOverlayProps {
  startSec: number;
  endSec: number;
  color?: string;
}

export const RadarScanOverlay: React.FC<RadarScanOverlayProps> = ({
  startSec,
  endSec,
  color = IndustrialTheme.signals.crimson
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentTime = frame / fps;

  if (currentTime < startSec || currentTime > endSec + 0.5) {
    return null;
  }

  const scanY = interpolate(currentTime, [startSec, endSec], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 20
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: `${scanY}%`,
          height: 2,
          backgroundColor: color,
          boxShadow: `0 0 12px ${color}, 0 -6px 20px ${color}40`,
          transform: 'translateY(-50%)'
        }}
      />
    </div>
  );
};
