import React from 'react';
import { useCurrentFrame, spring, useVideoConfig, interpolate } from 'remotion';

export const PriceTagBadge: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Step 1: Price Tag drops in with swing (frame 0-22)
  const tagSpring = spring({
    frame,
    fps,
    config: { mass: 0.7, damping: 12, stiffness: 130 },
  });
  const tagY = interpolate(tagSpring, [0, 1], [-120, 0]);
  const tagRot = interpolate(tagSpring, [0, 1], [-8, 0]);
  const tagOpacity = interpolate(tagSpring, [0, 1], [0, 1]);

  // Step 2: "DEPLOY IN DAYS" slams in (frame 16-36)
  const textSpring = spring({
    frame: Math.max(0, frame - 16),
    fps,
    config: { mass: 0.8, damping: 12, stiffness: 140 },
  });
  const textScale = interpolate(textSpring, [0, 1], [0.7, 1.0]);
  const textOpacity = interpolate(textSpring, [0, 1], [0, 1]);

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
      {/* 1. Cyan Price Tag */}
      <div
        style={{
          position: 'relative',
          backgroundColor: '#4daeeb',
          color: '#000000',
          fontSize: 42,
          fontWeight: 900,
          padding: '16px 44px 16px 72px',
          borderRadius: 12,
          fontFamily: '"Inter", sans-serif',
          letterSpacing: '0.04em',
          transform: `translateY(${tagY}px) rotate(${tagRot}deg)`,
          opacity: tagOpacity,
          boxShadow: '0 12px 40px rgba(77, 174, 235, 0.5)',
        }}
      >
        {/* Tag Hole Circle */}
        <div
          style={{
            position: 'absolute',
            left: 24,
            top: '50%',
            transform: 'translateY(-50%)',
            width: 24,
            height: 24,
            borderRadius: '50%',
            backgroundColor: '#000000',
          }}
        />
        [ 11.2x FASTER ]
      </div>

      {/* 2. Giant Typography "DEPLOY IN DAYS" */}
      <div
        style={{
          marginTop: 48,
          fontSize: 140,
          fontWeight: 900,
          color: '#FFFFFF',
          lineHeight: 0.95,
          textAlign: 'center',
          fontFamily: '"Inter", sans-serif',
          letterSpacing: '-0.03em',
          transform: `scale(${textScale})`,
          opacity: textOpacity,
        }}
      >
        DEPLOY
        <br />
        IN DAYS
      </div>
    </div>
  );
};
