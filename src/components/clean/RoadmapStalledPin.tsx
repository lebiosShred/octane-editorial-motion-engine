import React from 'react';
import { useCurrentFrame, spring, useVideoConfig, interpolate } from 'remotion';

export const RoadmapStalledPin: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Step 1: Vertical line drops from top
  const lineProgress = spring({
    frame,
    fps,
    config: { mass: 0.7, damping: 14, stiffness: 120 },
  });
  const lineHeight = interpolate(lineProgress, [0, 1], [0, 480]);

  // Step 2: Badge pops in (frame 16-36)
  const badgeSpring = spring({
    frame: Math.max(0, frame - 16),
    fps,
    config: { mass: 0.6, damping: 12, stiffness: 150 },
  });
  const badgeScale = interpolate(badgeSpring, [0, 1], [0.4, 1.0]);
  const badgeOpacity = interpolate(badgeSpring, [0, 1], [0, 1]);

  // Step 3: Card unfolds underneath (frame 28-48)
  const cardSpring = spring({
    frame: Math.max(0, frame - 28),
    fps,
    config: { mass: 0.6, damping: 14, stiffness: 130 },
  });
  const cardY = interpolate(cardSpring, [0, 1], [40, 0]);
  const cardOpacity = interpolate(cardSpring, [0, 1], [0, 1]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 120,
        width: '100%',
        height: '100%',
      }}
    >
      {/* 1. Top Vertical Line */}
      <div
        style={{
          width: 6,
          height: lineHeight,
          backgroundColor: '#FFFFFF',
          boxShadow: '0 0 16px rgba(255, 255, 255, 0.6)',
        }}
      />

      {/* 2. Cyan Pointer Badge */}
      <div
        style={{
          marginTop: -4,
          position: 'relative',
          backgroundColor: '#4daeeb',
          color: '#000000',
          fontSize: 48,
          fontWeight: 900,
          padding: '16px 48px',
          borderRadius: '12px 12px 0 0',
          fontFamily: '"Inter", sans-serif',
          letterSpacing: '0.04em',
          transform: `scale(${badgeScale})`,
          opacity: badgeOpacity,
          boxShadow: '0 8px 30px rgba(77, 174, 235, 0.5)',
        }}
      >
        DAY 180
        {/* Diamond pointer arrow at bottom */}
        <div
          style={{
            position: 'absolute',
            bottom: -16,
            left: '50%',
            transform: 'translateX(-50%) rotate(45deg)',
            width: 32,
            height: 32,
            backgroundColor: '#4daeeb',
            zIndex: -1,
          }}
        />
      </div>

      {/* 3. White Boxed Sign [ PIPELINE STALLED ] */}
      <div
        style={{
          marginTop: 36,
          border: '6px solid #FFFFFF',
          backgroundColor: '#0D1520',
          borderRadius: 14,
          padding: '40px 64px',
          textAlign: 'center',
          transform: `translateY(${cardY}px)`,
          opacity: cardOpacity,
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.9)',
        }}
      >
        <div
          style={{
            color: '#4daeeb',
            fontSize: 64,
            fontWeight: 900,
            fontFamily: '"Inter", sans-serif',
            letterSpacing: '0.06em',
            lineHeight: 1.2,
          }}
        >
          [ PIPELINE
          <br />
          STALLED ]
        </div>
      </div>
    </div>
  );
};
