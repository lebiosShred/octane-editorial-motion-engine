import React from 'react';
import { useCurrentFrame, spring, useVideoConfig, interpolate } from 'remotion';

interface WatsonxOrbitalEmblemProps {
  isOutro?: boolean;
}

export const WatsonxOrbitalEmblem: React.FC<WatsonxOrbitalEmblemProps> = ({
  isOutro = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const emblemSpring = spring({
    frame,
    fps,
    config: { mass: 0.8, damping: 14, stiffness: 120 },
  });
  const emblemScale = interpolate(emblemSpring, [0, 1], [0.7, 1.0]);
  const emblemOpacity = interpolate(emblemSpring, [0, 1], [0, 1]);

  // Text reveal
  const textSpring = spring({
    frame: Math.max(0, frame - 15),
    fps,
    config: { mass: 0.6, damping: 12, stiffness: 140 },
  });
  const textOpacity = interpolate(textSpring, [0, 1], [0, 1]);
  const textY = interpolate(textSpring, [0, 1], [30, 0]);

  // Outro CTA button
  const buttonSpring = spring({
    frame: Math.max(0, frame - 30),
    fps,
    config: { mass: 0.5, damping: 11, stiffness: 160 },
  });
  const buttonScale = interpolate(buttonSpring, [0, 1], [0.7, 1.0]);
  const buttonOpacity = interpolate(buttonSpring, [0, 1], [0, 1]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        perspective: 1400,
        position: 'relative',
      }}
    >
      {/* 3D Master Lockup Stage */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          transformStyle: 'preserve-3d',
          transform: `scale(${emblemScale}) rotateX(10deg)`,
          opacity: emblemOpacity,
          position: 'relative',
        }}
      >
        {/* Header Lockup: Emblem + Text */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 24,
            transform: `scale(${emblemScale})`,
            opacity: emblemOpacity,
          }}
        >
          <svg width="140" height="140" viewBox="0 0 100 100">
            <path
              d="M 20,50 A 30,30 0 0,1 80,50"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <path
              d="M 80,50 A 30,30 0 0,1 20,50"
              fill="none"
              stroke="#4daeeb"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <circle cx="20" cy="50" r="6" fill="#FFFFFF" />
            <circle cx="50" cy="50" r="6" fill="#FFFFFF" />
            <circle cx="80" cy="50" r="6" fill="#4daeeb" />
          </svg>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ color: '#FFFFFF', fontSize: 54, fontWeight: 900, fontFamily: '"Inter", sans-serif' }}>
              watson<span style={{ color: '#4daeeb' }}>x</span>
            </span>
            <span style={{ color: '#94A3B8', fontSize: 32, fontWeight: 700, fontFamily: '"Inter", sans-serif' }}>
              Orchestrate
            </span>
          </div>
        </div>

        {/* Main CTA Headline with 80px clean vertical separation */}
        <div
          style={{
            marginTop: 80,
            fontSize: 84,
            fontWeight: 900,
            color: '#FFFFFF',
            textAlign: 'center',
            lineHeight: 1.05,
            fontFamily: '"Inter", sans-serif',
            transform: `translateY(${textY}px)`,
            opacity: textOpacity,
            maxWidth: 900,
            letterSpacing: '-0.02em',
          }}
        >
          READ THE FULL
          <br />
          BLUEPRINT
        </div>

        {/* Bottom Cyan Pill Button with 100px clean vertical separation */}
        <div
          style={{
            marginTop: 100,
            backgroundColor: '#4daeeb',
            color: '#000000',
            fontSize: 34,
            fontWeight: 900,
            padding: '18px 56px',
            borderRadius: 40,
            fontFamily: '"Inter", sans-serif',
            transform: `scale(${buttonScale})`,
            opacity: buttonOpacity,
            boxShadow: '0 20px 50px rgba(77, 174, 235, 0.5), inset 0 2px 2px rgba(255, 255, 255, 0.8)',
            border: '2px solid rgba(255, 255, 255, 0.8)',
          }}
        >
          ibm.com/watsonx
        </div>
      </div>
    </div>
  );
};
