import React from 'react';
import { useCurrentFrame, spring, useVideoConfig, interpolate, Img, staticFile } from 'remotion';

export const InteractiveTogglePill: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring: Crisp arrival into frame
  const enterSpring = spring({
    frame,
    fps,
    config: { mass: 0.7, damping: 14, stiffness: 130 },
  });
  const enterScale = interpolate(enterSpring, [0, 1], [0.8, 1.0]);
  const enterOpacity = interpolate(enterSpring, [0, 1], [0, 1]);

  // Logo spread spring: Moves logos cleanly into wide left/right anchors (390px spread)
  const logoSpreadSpring = spring({
    frame: Math.max(0, frame - 15),
    fps,
    config: { mass: 0.8, damping: 14, stiffness: 110 },
  });
  const leftX = interpolate(logoSpreadSpring, [0, 1], [0, -390]);
  const rightX = interpolate(logoSpreadSpring, [0, 1], [0, 390]);

  // Direct Laser Conduit Ignition
  const beamProgress = spring({
    frame: Math.max(0, frame - 25),
    fps,
    config: { mass: 0.6, damping: 12, stiffness: 140 },
  });
  const beamWidth = interpolate(beamProgress, [0, 1], [0, 860]);

  // Center 1-Click Pill Button Entrance
  const pillSpring = spring({
    frame: Math.max(0, frame - 38),
    fps,
    config: { mass: 0.5, damping: 11, stiffness: 160 },
  });
  const pillScale = interpolate(pillSpring, [0, 1], [0.6, 1.0]);
  const pillOpacity = interpolate(pillSpring, [0, 1], [0, 1]);

  // Click Trigger Event at Frame 95
  const isClicked = frame >= 95;
  const clickSpring = spring({
    frame: Math.max(0, frame - 95),
    fps,
    config: { mass: 0.35, damping: 8, stiffness: 240 },
  });

  const buttonDepress = interpolate(clickSpring, [0, 0.5, 1], [0, -8, 0]);
  const glowBurst = interpolate(clickSpring, [0, 0.3, 1], [0, 1, 0.6]);

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
      {/* 3D Physical Stage (Rock-Solid Hold with Zero Idle Wobble) */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transformStyle: 'preserve-3d',
          transform: `scale(${enterScale}) rotateX(8deg)`,
          opacity: enterOpacity,
          position: 'relative',
          width: 1000,
          height: 300,
        }}
      >
        {/* DIRECT HIGH-ENERGY LASER CONDUIT */}
        <div
          style={{
            position: 'absolute',
            width: beamWidth,
            height: 6,
            borderRadius: 3,
            background: isClicked
              ? 'linear-gradient(90deg, #10B981 0%, #FFFFFF 50%, #10B981 100%)'
              : 'linear-gradient(90deg, rgba(77,174,235,0.4) 0%, #FFFFFF 50%, rgba(77,174,235,0.4) 100%)',
            boxShadow: isClicked
              ? '0 0 30px #10B981, 0 0 60px rgba(16, 185, 129, 0.8)'
              : '0 0 25px #4daeeb, 0 0 50px rgba(77, 174, 235, 0.6)',
            transform: 'translateZ(10px)',
          }}
        />

        {/* UNCAGED LEFT LOGO: SAP (Generous 60px clearance from center pill) */}
        <div
          style={{
            position: 'absolute',
            transform: `translateX(${leftX}px) translateZ(40px)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            filter: 'drop-shadow(0 20px 40px rgba(0, 143, 211, 0.5)) drop-shadow(0 5px 15px rgba(0, 0, 0, 0.9))',
          }}
        >
          <Img
            src={staticFile('assets/logos/sap_official.svg')}
            style={{
              width: 170,
              height: 'auto',
              objectFit: 'contain',
            }}
          />
        </div>

        {/* UNCAGED RIGHT LOGO: ServiceNow (Generous 60px clearance from center pill) */}
        <div
          style={{
            position: 'absolute',
            transform: `translateX(${rightX}px) translateZ(40px)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            filter: 'drop-shadow(0 20px 40px rgba(129, 181, 161, 0.5)) drop-shadow(0 5px 15px rgba(0, 0, 0, 0.9))',
          }}
        >
          <Img
            src={staticFile('assets/logos/servicenow_official.svg')}
            style={{
              width: 210,
              height: 'auto',
              objectFit: 'contain',
            }}
          />
        </div>

        {/* CENTER 1-CLICK TACTILE 3D GLASS GOVERNANCE BUTTON */}
        <div
          style={{
            position: 'relative',
            transformStyle: 'preserve-3d',
            transform: `translateZ(${90 + buttonDepress}px) scale(${pillScale})`,
            opacity: pillOpacity,
            background: isClicked
              ? 'linear-gradient(145deg, #10B981 0%, #047857 100%)'
              : 'linear-gradient(145deg, #FFFFFF 0%, #E2E8F0 100%)',
            color: isClicked ? '#FFFFFF' : '#000000',
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            padding: '16px 36px',
            borderRadius: 22,
            border: isClicked
              ? '1.5px solid rgba(255, 255, 255, 0.85)'
              : '1.5px solid rgba(255, 255, 255, 0.95)',
            boxShadow: isClicked
              ? `0 30px 60px rgba(0, 0, 0, 0.95), 0 0 ${45 + glowBurst * 45}px rgba(16, 185, 129, 0.9), inset 0 2px 3px rgba(255, 255, 255, 0.85)`
              : '0 30px 60px rgba(0, 0, 0, 0.95), 0 10px 30px rgba(77, 174, 235, 0.4), inset 0 2px 3px rgba(255, 255, 255, 0.95)',
            cursor: 'pointer',
            transition: 'background 0.15s, border 0.15s',
            zIndex: 10,
          }}
        >
          {/* Active Status LED Ring */}
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: '50%',
              backgroundColor: isClicked ? '#FFFFFF' : '#3B82F6',
              boxShadow: isClicked
                ? '0 0 18px #FFFFFF, 0 0 30px #10B981'
                : '0 0 14px #3B82F6',
            }}
          />

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: 24,
                fontWeight: 900,
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
              }}
            >
              {isClicked ? 'GOVERNANCE APPROVED' : '1-CLICK APPROVAL'}
            </span>
            <span
              style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: 13,
                fontWeight: 700,
                opacity: 0.85,
                marginTop: 3,
                letterSpacing: '0.04em',
              }}
            >
              {isClicked ? 'SOC2_COMPLIANT // ACTIVE' : 'ZERO-TRUST SIGN-OFF'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
