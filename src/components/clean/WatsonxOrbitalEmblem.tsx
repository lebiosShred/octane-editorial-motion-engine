import React from 'react';
import { useCurrentFrame, spring, useVideoConfig, interpolate } from 'remotion';

interface WatsonxOrbitalEmblemProps {
  isOutro?: boolean;
}

export const WatsonxOrbitalEmblem: React.FC<WatsonxOrbitalEmblemProps> = ({ isOutro = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Emblem rotation
  const rotation = (frame * 1.5) % 360;

  // Scale in
  const enterSpring = spring({
    frame,
    fps,
    config: { mass: 0.8, damping: 12, stiffness: 120 },
  });
  const emblemScale = interpolate(enterSpring, [0, 1], [0.4, 1.0]);
  const emblemOpacity = interpolate(enterSpring, [0, 1], [0, 1]);

  // Outro Text elements (frame 14-34)
  const textSpring = spring({
    frame: Math.max(0, frame - 14),
    fps,
    config: { mass: 0.6, damping: 14, stiffness: 140 },
  });
  const textY = interpolate(textSpring, [0, 1], [40, 0]);
  const textOpacity = interpolate(textSpring, [0, 1], [0, 1]);

  // Outro Button (frame 26-46)
  const btnSpring = spring({
    frame: Math.max(0, frame - 26),
    fps,
    config: { mass: 0.5, damping: 12, stiffness: 150 },
  });
  const btnScale = interpolate(btnSpring, [0, 1], [0.6, 1.0]);
  const btnOpacity = interpolate(btnSpring, [0, 1], [0, 1]);

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
      {!isOutro ? (
        // Clean Solo Emblem
        <div
          style={{
            transform: `scale(${emblemScale})`,
            opacity: emblemOpacity,
          }}
        >
          <svg width="340" height="340" viewBox="0 0 100 100">
            {/* Outer Arc 1 */}
            <path
              d="M 20,50 A 30,30 0 0,1 80,50"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="6"
              strokeLinecap="round"
              transform={`rotate(${rotation}, 50, 50)`}
            />
            {/* Outer Arc 2 */}
            <path
              d="M 80,50 A 30,30 0 0,1 20,50"
              fill="none"
              stroke="#4daeeb"
              strokeWidth="6"
              strokeLinecap="round"
              transform={`rotate(${rotation}, 50, 50)`}
            />
            {/* 3 Circular Nodes */}
            <circle cx="20" cy="50" r="6" fill="#FFFFFF" transform={`rotate(${rotation}, 50, 50)`} />
            <circle cx="50" cy="50" r="6" fill="#FFFFFF" />
            <circle cx="80" cy="50" r="6" fill="#4daeeb" transform={`rotate(${rotation}, 50, 50)`} />
          </svg>
        </div>
      ) : (
        // Outro Blueprint Lockup
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
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

          {/* Main CTA Headline */}
          <div
            style={{
              marginTop: 80,
              fontSize: 88,
              fontWeight: 900,
              color: '#FFFFFF',
              textAlign: 'center',
              lineHeight: 1.05,
              fontFamily: '"Inter", sans-serif',
              transform: `translateY(${textY}px)`,
              opacity: textOpacity,
              maxWidth: 900,
            }}
          >
            READ THE FULL
            <br />
            BLUEPRINT
          </div>

          {/* Bottom Cyan Pill Button */}
          <div
            style={{
              marginTop: 52,
              backgroundColor: '#4daeeb',
              color: '#000000',
              fontSize: 32,
              fontWeight: 900,
              padding: '20px 54px',
              borderRadius: 50,
              fontFamily: '"Inter", sans-serif',
              letterSpacing: '0.04em',
              transform: `scale(${btnScale})`,
              opacity: btnOpacity,
              boxShadow: '0 12px 40px rgba(77, 174, 235, 0.5)',
            }}
          >
            [ 6-MONTH BOTTLENECK SOLVED ]
          </div>
        </div>
      )}
    </div>
  );
};
