import React from 'react';
import { useCurrentFrame, spring, useVideoConfig, interpolate } from 'remotion';

interface SnappingConduitProps {
  breakFrame?: number; // Relative frame when the socket snaps apart
}

export const SnappingConduitSocket: React.FC<SnappingConduitProps> = ({ breakFrame = 60 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const enterSpring = spring({
    frame,
    fps,
    config: { mass: 0.7, damping: 14, stiffness: 120 },
  });
  const enterScale = interpolate(enterSpring, [0, 1], [0.8, 1.0]);
  const enterOpacity = interpolate(enterSpring, [0, 1], [0, 1]);

  // Snap / Disconnect spring
  const snapSpring = spring({
    frame: Math.max(0, frame - breakFrame),
    fps,
    config: { mass: 0.4, damping: 9, stiffness: 220 },
  });
  const separationX = interpolate(snapSpring, [0, 1], [0, 220]);
  const sparkOpacity = interpolate(
    frame - breakFrame,
    [0, 3, 12, 20],
    [0, 1, 0.8, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Micro vibration while connected under strain
  const isStraining = frame < breakFrame + 15;
  const strainJitter = isStraining && frame > breakFrame - 20
    ? (Math.sin(frame * 1.5) * (frame - (breakFrame - 20)) * 0.4)
    : 0;

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
      {/* 3D Physical Stage */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transformStyle: 'preserve-3d',
          transform: `scale(${enterScale}) rotateX(12deg) translateY(${strainJitter}px)`,
          opacity: enterOpacity,
          position: 'relative',
        }}
      >
        {/* Left Male Plug Socket */}
        <div
          style={{
            transform: `translateX(-${separationX}px) translateZ(20px)`,
            display: 'flex',
            alignItems: 'center',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Conduit Wire Left */}
          <div
            style={{
              width: 140,
              height: 10,
              background: 'linear-gradient(90deg, transparent 0%, #3B82F6 100%)',
              boxShadow: '0 0 20px #3B82F6',
              borderRadius: 5,
            }}
          />

          {/* Heavy Milled Aluminum Plug Head */}
          <div
            style={{
              width: 160,
              height: 120,
              background: 'linear-gradient(145deg, #2A3649 0%, #101622 100%)',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              borderRadius: 18,
              boxShadow: `
                0 25px 50px rgba(0, 0, 0, 0.9),
                inset 0 2px 2px rgba(255, 255, 255, 0.5),
                inset 0 -6px 14px rgba(0, 0, 0, 0.6)
              `,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 12,
            }}
          >
            <div
              style={{
                fontSize: 16,
                fontWeight: 900,
                color: '#60A5FA',
                fontFamily: '"JetBrains Mono", monospace',
                letterSpacing: '0.08em',
              }}
            >
              LLM_GATEWAY
            </div>
            <div
              style={{
                marginTop: 6,
                width: 100,
                height: 4,
                backgroundColor: frame >= breakFrame ? '#EF4444' : '#10B981',
                borderRadius: 2,
                boxShadow: frame >= breakFrame ? '0 0 10px #EF4444' : '0 0 10px #10B981',
              }}
            />
          </div>

          {/* Gold Connector Pins */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginLeft: 2 }}>
            <div
              style={{
                width: 24,
                height: 12,
                background: 'linear-gradient(90deg, #F59E0B 0%, #FBBF24 100%)',
                borderRadius: '0 4px 4px 0',
                boxShadow: '0 0 10px rgba(245, 158, 11, 0.6)',
              }}
            />
            <div
              style={{
                width: 24,
                height: 12,
                background: 'linear-gradient(90deg, #F59E0B 0%, #FBBF24 100%)',
                borderRadius: '0 4px 4px 0',
                boxShadow: '0 0 10px rgba(245, 158, 11, 0.6)',
              }}
            />
          </div>
        </div>

        {/* Central Electric Disconnect Arc Sparks */}
        <div
          style={{
            position: 'absolute',
            width: 180,
            height: 180,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: sparkOpacity,
            pointerEvents: 'none',
            zIndex: 20,
          }}
        >
          <svg width="180" height="180" viewBox="0 0 180 180">
            <path
              d="M 60,90 L 85,70 L 80,95 L 110,65 L 95,110 L 120,90"
              fill="none"
              stroke="#FDE047"
              strokeWidth="5"
              filter="drop-shadow(0 0 14px #EAB308)"
            />
            <path
              d="M 70,80 L 105,100 L 90,120 L 115,90"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="3"
            />
          </svg>
        </div>

        {/* Right Female Jack Socket */}
        <div
          style={{
            transform: `translateX(${separationX}px) translateZ(20px)`,
            display: 'flex',
            alignItems: 'center',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Jack Socket Receptor Housing */}
          <div
            style={{
              width: 160,
              height: 120,
              background: 'linear-gradient(145deg, #2A3649 0%, #101622 100%)',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              borderRadius: 18,
              boxShadow: `
                0 25px 50px rgba(0, 0, 0, 0.9),
                inset 0 2px 2px rgba(255, 255, 255, 0.5),
                inset 0 -6px 14px rgba(0, 0, 0, 0.6)
              `,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 12,
            }}
          >
            <div
              style={{
                fontSize: 16,
                fontWeight: 900,
                color: '#94A3B8',
                fontFamily: '"JetBrains Mono", monospace',
                letterSpacing: '0.08em',
              }}
            >
              LEGACY_CORE
            </div>
            <div
              style={{
                marginTop: 6,
                width: 100,
                height: 4,
                backgroundColor: frame >= breakFrame ? '#EF4444' : '#10B981',
                borderRadius: 2,
                boxShadow: frame >= breakFrame ? '0 0 10px #EF4444' : '0 0 10px #10B981',
              }}
            />
          </div>

          {/* Conduit Wire Right */}
          <div
            style={{
              width: 140,
              height: 10,
              background: 'linear-gradient(90deg, #3B82F6 0%, transparent 100%)',
              boxShadow: '0 0 20px #3B82F6',
              borderRadius: 5,
            }}
          />
        </div>

        {/* Warning Telemetry Pill below */}
        {frame >= breakFrame && (
          <div
            style={{
              position: 'absolute',
              top: 140,
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid #EF4444',
              borderRadius: 30,
              padding: '10px 28px',
              color: '#EF4444',
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: 20,
              fontWeight: 900,
              letterSpacing: '0.06em',
              boxShadow: '0 0 30px rgba(239, 68, 68, 0.4)',
              transform: 'translateZ(40px)',
            }}
          >
            [ DISCONNECT: AUTHENTICATION_FAILED ]
          </div>
        )}
      </div>
    </div>
  );
};
