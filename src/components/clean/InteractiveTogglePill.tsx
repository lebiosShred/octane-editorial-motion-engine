import React from 'react';
import { useCurrentFrame, spring, useVideoConfig, interpolate } from 'remotion';

export const InteractiveTogglePill: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Cards entrance / separation (frame 0-20)
  const enterSpring = spring({
    frame,
    fps,
    config: { mass: 0.7, damping: 14, stiffness: 120 },
  });
  const leftX = interpolate(enterSpring, [0, 1], [-200, -380]);
  const rightX = interpolate(enterSpring, [0, 1], [200, 380]);

  // Laser beam draw (frame 14-30)
  const beamProgress = spring({
    frame: Math.max(0, frame - 14),
    fps,
    config: { mass: 0.5, damping: 15, stiffness: 150 },
  });
  const beamWidth = interpolate(beamProgress, [0, 1], [0, 800]);

  // Center toggle pill entrance (frame 22-40)
  const pillSpring = spring({
    frame: Math.max(0, frame - 22),
    fps,
    config: { mass: 0.6, damping: 12, stiffness: 140 },
  });
  const pillScale = interpolate(pillSpring, [0, 1], [0.4, 1.0]);
  const pillOpacity = interpolate(pillSpring, [0, 1], [0, 1]);

  // Toggle switch flip (frame 38-54)
  const switchSpring = spring({
    frame: Math.max(0, frame - 38),
    fps,
    config: { mass: 0.4, damping: 10, stiffness: 160 },
  });
  const switchX = interpolate(switchSpring, [0, 1], [0, 32]);
  const switchColor = interpolate(switchSpring, [0, 1], [0, 1]);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        position: 'relative',
      }}
    >
      {/* Horizontal Cyan Data Laser Line */}
      <div
        style={{
          position: 'absolute',
          width: beamWidth,
          height: 6,
          backgroundColor: '#4daeeb',
          boxShadow: '0 0 24px #4daeeb',
          zIndex: 1,
        }}
      />

      {/* Left Card: SAP */}
      <div
        style={{
          position: 'absolute',
          transform: `translateX(${leftX}px)`,
          width: 220,
          height: 320,
          backgroundColor: '#0D1520',
          border: '3px solid #1E293B',
          borderRadius: 20,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 16px 50px rgba(0, 0, 0, 0.9)',
          zIndex: 2,
        }}
      >
        <div
          style={{
            backgroundColor: '#0070F2',
            color: '#FFFFFF',
            fontWeight: 900,
            fontSize: 42,
            padding: '12px 24px',
            borderRadius: 8,
            fontFamily: '"Inter", sans-serif',
          }}
        >
          SAP
        </div>
      </div>

      {/* Right Card: ServiceNow */}
      <div
        style={{
          position: 'absolute',
          transform: `translateX(${rightX}px)`,
          width: 220,
          height: 320,
          backgroundColor: '#0D1520',
          border: '3px solid #1E293B',
          borderRadius: 20,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 16px 50px rgba(0, 0, 0, 0.9)',
          zIndex: 2,
        }}
      >
        <div
          style={{
            color: '#FFFFFF',
            fontWeight: 800,
            fontSize: 26,
            fontFamily: '"Inter", sans-serif',
            letterSpacing: '-0.02em',
          }}
        >
          servicenow.
        </div>
      </div>

      {/* Center 1-Click Approval Toggle Button */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          backgroundColor: '#FFFFFF',
          color: '#000000',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          padding: '16px 32px',
          borderRadius: 14,
          transform: `scale(${pillScale})`,
          opacity: pillOpacity,
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.95)',
          fontFamily: '"Inter", sans-serif',
        }}
      >
        <span
          style={{
            fontSize: 26,
            fontWeight: 900,
            letterSpacing: '0.04em',
            color: '#0D1520',
          }}
        >
          [ 1-CLICK APPROVAL ]
        </span>

        {/* Tactile Toggle Switch */}
        <div
          style={{
            width: 68,
            height: 38,
            backgroundColor: switchColor > 0.5 ? '#10B981' : '#CBD5E1',
            borderRadius: 19,
            position: 'relative',
            padding: 3,
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              backgroundColor: '#FFFFFF',
              borderRadius: '50%',
              transform: `translateX(${switchX}px)`,
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
            }}
          />
        </div>
      </div>
    </div>
  );
};
