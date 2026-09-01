import React from 'react';
import { useCurrentFrame, spring, useVideoConfig, interpolate } from 'remotion';

export const SequentialBrandCards: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Cards staggered slide-in (frame 0, 10, 20)
  const card1Spring = spring({
    frame,
    fps,
    config: { mass: 0.6, damping: 12, stiffness: 120 },
  });
  const card2Spring = spring({
    frame: Math.max(0, frame - 8),
    fps,
    config: { mass: 0.6, damping: 12, stiffness: 120 },
  });
  const card3Spring = spring({
    frame: Math.max(0, frame - 16),
    fps,
    config: { mass: 0.6, damping: 12, stiffness: 120 },
  });

  // Arched wire progress (frame 22-42)
  const wireSpring = spring({
    frame: Math.max(0, frame - 22),
    fps,
    config: { mass: 0.5, damping: 14, stiffness: 140 },
  });
  const wireOpacity = interpolate(wireSpring, [0, 1], [0, 1]);

  // Foreground Pill Badge pop (frame 30-50)
  const pillSpring = spring({
    frame: Math.max(0, frame - 30),
    fps,
    config: { mass: 0.6, damping: 12, stiffness: 150 },
  });
  const pillScale = interpolate(pillSpring, [0, 1], [0.5, 1.0]);
  const pillOpacity = interpolate(pillSpring, [0, 1], [0, 1]);

  const cards = [
    { name: 'SAP', color: '#0070F2', spring: card1Spring },
    { name: 'salesforce', color: '#00A1E0', spring: card2Spring },
    { name: 'servicenow', color: '#81B5A1', spring: card3Spring },
  ];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        position: 'relative',
      }}
    >
      {/* Arched Connector Wire SVGs */}
      <svg
        style={{
          position: 'absolute',
          top: '30%',
          width: 900,
          height: 220,
          opacity: wireOpacity,
          pointerEvents: 'none',
        }}
        viewBox="0 0 900 220"
      >
        <path
          d="M 220,200 C 220,50 450,50 450,200"
          fill="none"
          stroke="#4daeeb"
          strokeWidth="6"
          strokeDasharray="10 8"
        />
        <path
          d="M 450,200 C 450,50 680,50 680,200"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="6"
          strokeDasharray="10 8"
        />
      </svg>

      {/* 3 Side-by-Side Brand Cards */}
      <div
        style={{
          display: 'flex',
          gap: 24,
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1,
        }}
      >
        {cards.map((c, i) => {
          const yOffset = interpolate(c.spring, [0, 1], [100, 0]);
          const opacity = interpolate(c.spring, [0, 1], [0, 1]);
          return (
            <div
              key={i}
              style={{
                width: 270,
                height: 400,
                backgroundColor: '#0D1520',
                border: '3px solid #1E293B',
                borderRadius: 24,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 24,
                transform: `translateY(${yOffset}px)`,
                opacity,
                boxShadow: '0 16px 50px rgba(0, 0, 0, 0.8)',
              }}
            >
              {c.name === 'SAP' && (
                <div
                  style={{
                    backgroundColor: '#0070F2',
                    color: '#FFFFFF',
                    fontWeight: 900,
                    fontSize: 52,
                    padding: '16px 32px',
                    borderRadius: 8,
                    fontFamily: '"Inter", sans-serif',
                  }}
                >
                  SAP
                </div>
              )}
              {c.name === 'salesforce' && (
                <div
                  style={{
                    backgroundColor: '#00A1E0',
                    color: '#FFFFFF',
                    fontWeight: 800,
                    fontSize: 30,
                    padding: '24px 32px',
                    borderRadius: '50px',
                    fontFamily: '"Inter", sans-serif',
                    textAlign: 'center',
                  }}
                >
                  salesforce
                </div>
              )}
              {c.name === 'servicenow' && (
                <div
                  style={{
                    color: '#FFFFFF',
                    fontWeight: 800,
                    fontSize: 32,
                    fontFamily: '"Inter", sans-serif',
                    letterSpacing: '-0.02em',
                  }}
                >
                  servicenow.
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Front Pill Badge */}
      <div
        style={{
          marginTop: -48,
          zIndex: 10,
          backgroundColor: '#4daeeb',
          color: '#000000',
          fontSize: 42,
          fontWeight: 900,
          padding: '20px 64px',
          borderRadius: 50,
          fontFamily: '"Inter", sans-serif',
          letterSpacing: '0.04em',
          transform: `scale(${pillScale})`,
          opacity: pillOpacity,
          boxShadow: '0 12px 40px rgba(77, 174, 235, 0.6)',
        }}
      >
        AGENT CATALOG
      </div>
    </div>
  );
};
