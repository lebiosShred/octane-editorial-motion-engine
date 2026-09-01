import React from 'react';
import { useCurrentFrame, spring, useVideoConfig, interpolate, Img, staticFile } from 'remotion';

export const InteractiveTogglePill: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Continuous subtle 3D floating hover
  const hoverY = Math.sin(frame * 0.04) * 8;
  const hoverRotX = 10 + Math.sin(frame * 0.03) * 2;
  const hoverRotY = Math.cos(frame * 0.035) * 3;

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
  const switchX = interpolate(switchSpring, [0, 1], [0, 34]);
  const switchColor = interpolate(switchSpring, [0, 1], [0, 1]);

  return (
    <div
      style={{
        display: 'flex',
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
          transform: `translateY(${hoverY}px) rotateX(${hoverRotX}deg) rotateY(${hoverRotY}deg)`,
          position: 'relative',
        }}
      >
        {/* Horizontal 3D Cyan Laser Conduit */}
        <div
          style={{
            position: 'absolute',
            width: beamWidth,
            height: 8,
            borderRadius: 4,
            background: 'linear-gradient(90deg, rgba(77,174,235,0.4) 0%, #FFFFFF 50%, rgba(77,174,235,0.4) 100%)',
            boxShadow: '0 0 30px #4daeeb, 0 0 60px rgba(77, 174, 235, 0.6)',
            transform: 'translateZ(10px)',
          }}
        />

        {/* Left Card: SAP */}
        <div
          style={{
            position: 'absolute',
            transform: `translateX(${leftX}px) translateZ(30px)`,
            width: 250,
            height: 360,
            background: 'linear-gradient(155deg, #182333 0%, #0c121b 100%)',
            border: '1px solid rgba(255, 255, 255, 0.16)',
            borderRadius: 24,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: `
              0 35px 70px -15px rgba(0, 0, 0, 0.95),
              inset 0 2px 3px rgba(255, 255, 255, 0.35),
              inset 0 -8px 20px rgba(0, 0, 0, 0.7),
              0 0 40px rgba(0, 143, 211, 0.25)
            `,
            transformStyle: 'preserve-3d',
          }}
        >
          <div style={{ transform: 'translateZ(25px)', filter: 'drop-shadow(0 12px 20px rgba(0, 0, 0, 0.7))' }}>
            <Img
              src={staticFile('assets/logos/sap_official.svg')}
              style={{ width: 160, height: 'auto', objectFit: 'contain' }}
            />
          </div>
        </div>

        {/* Right Card: ServiceNow */}
        <div
          style={{
            position: 'absolute',
            transform: `translateX(${rightX}px) translateZ(30px)`,
            width: 250,
            height: 360,
            background: 'linear-gradient(155deg, #182333 0%, #0c121b 100%)',
            border: '1px solid rgba(255, 255, 255, 0.16)',
            borderRadius: 24,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: `
              0 35px 70px -15px rgba(0, 0, 0, 0.95),
              inset 0 2px 3px rgba(255, 255, 255, 0.35),
              inset 0 -8px 20px rgba(0, 0, 0, 0.7),
              0 0 40px rgba(129, 181, 161, 0.25)
            `,
            transformStyle: 'preserve-3d',
          }}
        >
          <div style={{ transform: 'translateZ(25px)', filter: 'drop-shadow(0 12px 20px rgba(0, 0, 0, 0.7))' }}>
            <Img
              src={staticFile('assets/logos/servicenow_official.svg')}
              style={{ width: 190, height: 'auto', objectFit: 'contain' }}
            />
          </div>
        </div>

        {/* Center 1-Click Approval 3D Tactile Button */}
        <div
          style={{
            position: 'relative',
            transformStyle: 'preserve-3d',
            transform: `translateZ(80px) scale(${pillScale})`,
            opacity: pillOpacity,
            background: 'linear-gradient(145deg, #FFFFFF 0%, #E2E8F0 100%)',
            color: '#000000',
            display: 'flex',
            alignItems: 'center',
            gap: 18,
            padding: '18px 36px',
            borderRadius: 18,
            border: '1px solid rgba(255, 255, 255, 0.9)',
            boxShadow: `
              0 30px 60px rgba(0, 0, 0, 0.95),
              0 10px 25px rgba(0, 0, 0, 0.6),
              inset 0 2px 3px rgba(255, 255, 255, 1.0),
              inset 0 -4px 10px rgba(0, 0, 0, 0.15)
            `,
            fontFamily: '"Inter", sans-serif',
          }}
        >
          <span
            style={{
              fontSize: 28,
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
              width: 72,
              height: 40,
              backgroundColor: switchColor > 0.5 ? '#10B981' : '#94A3B8',
              borderRadius: 20,
              position: 'relative',
              padding: 3,
              boxShadow: 'inset 0 2px 6px rgba(0, 0, 0, 0.4)',
              transition: 'background-color 0.2s ease',
            }}
          >
            <div
              style={{
                width: 34,
                height: 34,
                backgroundColor: '#FFFFFF',
                borderRadius: '50%',
                transform: `translateX(${switchX}px)`,
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.4), inset 0 1px 2px rgba(255, 255, 255, 0.8)',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
