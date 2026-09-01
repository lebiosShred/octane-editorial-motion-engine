import React from 'react';
import { useCurrentFrame, spring, useVideoConfig, interpolate } from 'remotion';

interface KineticNumberHookProps {
  number: string;
  label: string;
  sublabel?: string;
  showLine?: boolean;
}

export const KineticNumberHook: React.FC<KineticNumberHookProps> = ({
  number,
  label,
  sublabel,
  showLine = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Step 1: Big Number drops in (frame 0-20)
  const numSpring = spring({
    frame,
    fps,
    config: { mass: 0.8, damping: 12, stiffness: 120 },
  });
  const numScale = interpolate(numSpring, [0, 1], [0.6, 1.0]);
  const numOpacity = interpolate(numSpring, [0, 1], [0, 1]);
  const numY = interpolate(numSpring, [0, 1], [-120, 0]);

  // Step 2: Label fades in below (frame 14-34)
  const labelSpring = spring({
    frame: Math.max(0, frame - 14),
    fps,
    config: { mass: 0.6, damping: 14, stiffness: 140 },
  });
  const labelOpacity = interpolate(labelSpring, [0, 1], [0, 1]);
  const labelY = interpolate(labelSpring, [0, 1], [30, 0]);

  // Step 3: Vertical pointer line draws down (frame 28-50)
  const lineProgress = spring({
    frame: Math.max(0, frame - 28),
    fps,
    config: { mass: 0.5, damping: 15, stiffness: 150 },
  });
  const lineHeight = interpolate(lineProgress, [0, 1], [0, 260]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
      }}
    >
      {/* 1. Giant Number */}
      <div
        style={{
          fontSize: 480,
          fontWeight: 900,
          color: '#FFFFFF',
          lineHeight: 0.85,
          fontFamily: '"Inter", sans-serif',
          transform: `translateY(${numY}px) scale(${numScale})`,
          opacity: numOpacity,
          letterSpacing: '-0.04em',
        }}
      >
        {number}
      </div>

      {/* 2. Bold Cyan Label */}
      <div
        style={{
          marginTop: 48,
          fontSize: 72,
          fontWeight: 900,
          color: '#4daeeb',
          letterSpacing: '0.04em',
          textAlign: 'center',
          textTransform: 'uppercase',
          fontFamily: '"Inter", sans-serif',
          transform: `translateY(${labelY}px)`,
          opacity: labelOpacity,
          maxWidth: 900,
          lineHeight: 1.15,
        }}
      >
        {label}
      </div>

      {sublabel && (
        <div
          style={{
            marginTop: 20,
            fontSize: 26,
            fontWeight: 800,
            color: '#94A3B8',
            fontFamily: '"JetBrains Mono", monospace',
            opacity: labelOpacity,
            letterSpacing: '0.08em',
          }}
        >
          {sublabel}
        </div>
      )}

      {/* 3. Eye-Guide Vertical Line */}
      {showLine && (
        <div
          style={{
            marginTop: 64,
            width: 6,
            height: lineHeight,
            backgroundColor: '#FFFFFF',
            borderRadius: 3,
            boxShadow: '0 0 20px rgba(77, 174, 235, 0.8)',
          }}
        />
      )}
    </div>
  );
};
