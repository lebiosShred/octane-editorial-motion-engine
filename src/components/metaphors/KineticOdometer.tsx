import React from 'react';
import { useCurrentFrame, spring, useVideoConfig, interpolate } from 'remotion';
import { OPTICAL_MATERIALS, SpecularTopRim } from '../../utils/OpticalMateriality';

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
            width: 580,
            height: 400,
            ...OPTICAL_MATERIALS.TITANIUM_PANEL,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 32,
            transformStyle: 'preserve-3d',
            position: 'relative',
          }}
        >
          <SpecularTopRim />

          {/* Rotating Precision Chronograph Ring */}
          <svg
            style={{
              position: 'absolute',
              width: 500,
              height: 500,
              transform: `rotate(${ringRotation}deg)`,
              pointerEvents: 'none',
              opacity: 0.45,
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
                fontSize: 90,
                fontWeight: 900,
                color: '#4daeeb',
                lineHeight: 0.9,
                marginLeft: 4,
              }}
            >
              x
            </span>
          </div>

          {/* Subtext Tag */}
          <div
            style={{
              marginTop: 18,
              fontSize: 22,
              color: '#94A3B8',
              fontFamily: '"Inter", sans-serif',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              transform: 'translateZ(20px)',
            }}
          >
            Faster Time-To-Value
          </div>
        </div>

        {/* Bottom Tactile Pill Badge with 80px clean vertical breathing room */}
        <div
          style={{
            marginTop: 80,
            transformStyle: 'preserve-3d',
            transform: `translateZ(60px) scale(${daysScale})`,
            opacity: daysOpacity,
            background: 'linear-gradient(145deg, #1E293B 0%, #0F172A 100%)',
            border: '2px solid rgba(77, 174, 235, 0.6)',
            borderRadius: 40,
            padding: '16px 44px',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            boxShadow: '0 20px 45px rgba(0, 0, 0, 0.9), 0 0 30px rgba(77, 174, 235, 0.3)',
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              backgroundColor: '#4daeeb',
              boxShadow: '0 0 10px #4daeeb',
            }}
          />
          <span
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: 24,
              fontWeight: 900,
              letterSpacing: '0.06em',
            }}
          >
            DEPLOY IN DAYS, NOT MONTHS
          </span>
        </div>
      </div>
    </div>
  );
};
