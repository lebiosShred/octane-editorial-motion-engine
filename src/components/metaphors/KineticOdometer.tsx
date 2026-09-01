import React from 'react';
import { useCurrentFrame, spring, useVideoConfig, interpolate } from 'remotion';

export const KineticOdometer: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const enterSpring = spring({
    frame,
    fps,
    config: { mass: 0.7, damping: 14, stiffness: 120 },
  });
  const enterScale = interpolate(enterSpring, [0, 1], [0.75, 1.0]);
  const enterOpacity = interpolate(enterSpring, [0, 1], [0, 1]);

  // Velocity Counter interpolation: 1.0x -> 11.2x
  const countProgress = spring({
    frame: Math.max(0, frame - 15),
    fps,
    config: { mass: 0.9, damping: 14, stiffness: 90 },
  });
  const currentSpeed = interpolate(countProgress, [0, 1], [1.0, 11.2]);

  // Rotating Chronograph Ring
  const ringRotation = interpolate(countProgress, [0, 1], [0, 540]);

  // Impact Slam on reaching 11.2x
  const impactFrame = Math.max(0, frame - 45);
  const impactShake =
    impactFrame > 0 && impactFrame < 15
      ? Math.sin(impactFrame * 2) * (15 - impactFrame) * 0.8
      : 0;

  // "DEPLOY IN DAYS" secondary punch
  const daysSpring = spring({
    frame: Math.max(0, frame - 35),
    fps,
    config: { mass: 0.5, damping: 11, stiffness: 160 },
  });
  const daysScale = interpolate(daysSpring, [0, 1], [0.6, 1.0]);
  const daysOpacity = interpolate(daysSpring, [0, 1], [0, 1]);

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
      {/* 3D Mechanical Stage */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          transformStyle: 'preserve-3d',
          transform: `scale(${enterScale}) translateY(${impactShake}px) rotateX(10deg)`,
          opacity: enterOpacity,
          position: 'relative',
        }}
      >
        {/* Chronograph Dial Housing */}
        <div
          style={{
            width: 540,
            height: 380,
            background: 'linear-gradient(155deg, #182333 0%, #0c121b 100%)',
            borderRadius: 36,
            border: '2px solid rgba(255, 255, 255, 0.2)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 32,
            boxShadow: `
              0 40px 90px -15px rgba(0, 0, 0, 0.95),
              inset 0 3px 3px rgba(255, 255, 255, 0.4),
              inset 0 -8px 20px rgba(0, 0, 0, 0.8),
              0 0 50px rgba(77, 174, 235, 0.25)
            `,
            transformStyle: 'preserve-3d',
            position: 'relative',
          }}
        >
          {/* Rotating Precision Chronograph Ring */}
          <svg
            style={{
              position: 'absolute',
              width: 480,
              height: 480,
              transform: `rotate(${ringRotation}deg)`,
              pointerEvents: 'none',
              opacity: 0.4,
            }}
            viewBox="0 0 480 480"
          >
            <circle
              cx="240"
              cy="240"
              r="220"
              fill="none"
              stroke="#4daeeb"
              strokeWidth="2"
              strokeDasharray="4 12"
            />
            <circle
              cx="240"
              cy="240"
              r="200"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="1"
              strokeDasharray="2 8"
            />
          </svg>

          {/* Top Telemetry Header */}
          <div
            style={{
              fontSize: 22,
              fontWeight: 900,
              color: '#4daeeb',
              fontFamily: '"JetBrains Mono", monospace',
              letterSpacing: '0.14em',
              marginBottom: 12,
              transform: 'translateZ(20px)',
            }}
          >
            [ VELOCITY_MULTIPLIER ]
          </div>

          {/* Giant Tumbling Mechanical Odometer Readout */}
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'center',
              transform: 'translateZ(50px)',
              filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.9))',
            }}
          >
            <span
              style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: 160,
                fontWeight: 900,
                color: '#FFFFFF',
                lineHeight: 0.9,
                letterSpacing: '-0.05em',
              }}
            >
              {currentSpeed.toFixed(1)}
            </span>
            <span
              style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: 100,
                fontWeight: 900,
                color: '#4daeeb',
                marginLeft: 4,
                lineHeight: 0.9,
              }}
            >
              x
            </span>
          </div>

          {/* Bottom Sub-label */}
          <div
            style={{
              marginTop: 16,
              fontSize: 24,
              fontWeight: 700,
              color: '#94A3B8',
              fontFamily: '"Inter", sans-serif',
              letterSpacing: '0.04em',
              transform: 'translateZ(20px)',
            }}
          >
            FASTER TIME-TO-VALUE
          </div>
        </div>

        {/* Big Bold "DEPLOY IN DAYS" Underneath */}
        <div
          style={{
            marginTop: 48,
            transformStyle: 'preserve-3d',
            transform: `translateZ(60px) scale(${daysScale})`,
            opacity: daysOpacity,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              fontSize: 82,
              fontWeight: 900,
              color: '#FFFFFF',
              fontFamily: '"Inter", sans-serif',
              letterSpacing: '-0.03em',
              textAlign: 'center',
              lineHeight: 1.0,
              textShadow: '0 10px 40px rgba(0, 0, 0, 0.9), 0 0 60px rgba(77, 174, 235, 0.3)',
            }}
          >
            DEPLOY IN DAYS.
          </div>
          <div
            style={{
              fontSize: 48,
              fontWeight: 800,
              color: '#64748B',
              fontFamily: '"Inter", sans-serif',
              letterSpacing: '-0.02em',
              marginTop: 12,
            }}
          >
            NOT QUARTERS.
          </div>
        </div>
      </div>
    </div>
  );
};
