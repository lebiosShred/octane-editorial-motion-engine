import React from 'react';
import { useCurrentFrame, spring, useVideoConfig, interpolate } from 'remotion';

interface SnappingConduitSocketProps {
  breakFrame?: number;
}

export const SnappingConduitSocket: React.FC<SnappingConduitSocketProps> = ({
  breakFrame = 90,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const enterSpring = spring({
    frame,
    fps,
    config: { mass: 0.6, damping: 12, stiffness: 140 },
  });
  const enterScale = interpolate(enterSpring, [0, 1], [0.75, 1.0]);
  const enterOpacity = interpolate(enterSpring, [0, 1], [0, 1]);

  // Disconnect physics: sockets pull apart violently on breakFrame
  const breakProgress = spring({
    frame: Math.max(0, frame - breakFrame),
    fps,
    config: { mass: 0.5, damping: 10, stiffness: 180 },
  });

  const leftPullX = interpolate(breakProgress, [0, 1], [0, -180]);
  const rightPullX = interpolate(breakProgress, [0, 1], [0, 180]);
  const breakTilt = interpolate(breakProgress, [0, 1], [0, 12]);

  // Spark burst physics
  const sparkFrame = Math.max(0, frame - breakFrame);
  const sparkOpacity =
    sparkFrame > 0 && sparkFrame < 25
      ? interpolate(sparkFrame, [0, 5, 25], [0, 1, 0])
      : 0;

  // Shake effect on violent snap
  const snapShake =
    sparkFrame > 0 && sparkFrame < 15
      ? Math.sin(sparkFrame * 3) * (15 - sparkFrame) * 1.2
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
      {/* 3D Stage */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transformStyle: 'preserve-3d',
          transform: `scale(${enterScale}) translateY(${snapShake}px) rotateX(12deg)`,
          opacity: enterOpacity,
          position: 'relative',
        }}
      >
        {/* LEFT MALE INDUSTRIAL PLUG */}
        <div
          style={{
            transformStyle: 'preserve-3d',
            transform: `translateX(${leftPullX}px) rotateZ(-${breakTilt}deg)`,
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
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

          {/* Heavy Milled Aluminum Socket Body */}
          <div
            style={{
              width: 200,
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
          }}
        >
          {/* Spark Particle Rays */}
          <div
            style={{
              position: 'absolute',
              width: 140,
              height: 4,
              backgroundColor: '#EF4444',
              transform: 'rotate(25deg)',
              boxShadow: '0 0 25px #EF4444, 0 0 40px #F59E0B',
            }}
          />
          <div
            style={{
              position: 'absolute',
              width: 120,
              height: 3,
              backgroundColor: '#FBBF24',
              transform: 'rotate(-40deg)',
              boxShadow: '0 0 20px #FBBF24',
            }}
          />
          <div
            style={{
              position: 'absolute',
              width: 100,
              height: 3,
              backgroundColor: '#FFFFFF',
              transform: 'rotate(70deg)',
              boxShadow: '0 0 30px #FFFFFF',
            }}
          />
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              backgroundColor: '#EF4444',
              filter: 'blur(8px)',
              boxShadow: '0 0 40px #EF4444, 0 0 80px #F59E0B',
            }}
          />
        </div>

        {/* RIGHT FEMALE INDUSTRIAL RECEPTACLE */}
        <div
          style={{
            transformStyle: 'preserve-3d',
            transform: `translateX(${rightPullX}px) rotateZ(${breakTilt}deg)`,
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          {/* Socket Slots */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginRight: 2 }}>
            <div
              style={{
                width: 10,
                height: 14,
                backgroundColor: '#05080E',
                borderRadius: '2px 0 0 2px',
                boxShadow: 'inset 0 0 4px rgba(0,0,0,0.9)',
              }}
            />
            <div
              style={{
                width: 10,
                height: 14,
                backgroundColor: '#05080E',
                borderRadius: '2px 0 0 2px',
                boxShadow: 'inset 0 0 4px rgba(0,0,0,0.9)',
              }}
            />
          </div>

          {/* Heavy Socket Housing */}
          <div
            style={{
              width: 200,
              height: 120,
              background: 'linear-gradient(145deg, #1E2738 0%, #0A0E17 100%)',
              border: '2px solid rgba(255, 255, 255, 0.16)',
              borderRadius: 18,
              boxShadow: `
                0 25px 50px rgba(0, 0, 0, 0.9),
                inset 0 2px 2px rgba(255, 255, 255, 0.4),
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

        {/* Warning Telemetry Pill below with 90px clear vertical gap */}
        {frame >= breakFrame && (
          <div
            style={{
              position: 'absolute',
              top: 170,
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid #EF4444',
              borderRadius: 30,
              padding: '12px 32px',
              color: '#EF4444',
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: 20,
              fontWeight: 900,
              letterSpacing: '0.08em',
              boxShadow: '0 0 30px rgba(239, 68, 68, 0.4)',
              transform: 'translateZ(40px)',
              whiteSpace: 'nowrap',
            }}
          >
            [ DISCONNECT: AUTHENTICATION_FAILED ]
          </div>
        )}
      </div>
    </div>
  );
};
