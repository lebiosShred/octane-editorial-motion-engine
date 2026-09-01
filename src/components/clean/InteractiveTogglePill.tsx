import React from 'react';
import { useCurrentFrame, spring, useVideoConfig, interpolate, Img, staticFile } from 'remotion';
import { OPTICAL_MATERIALS, SpecularTopRim } from '../../utils/OpticalMateriality';

export const InteractiveTogglePill: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const enterSpring = spring({
    frame,
    fps,
    config: { mass: 0.8, damping: 14, stiffness: 120 },
  });
  const enterScale = interpolate(enterSpring, [0, 1], [0.75, 1.0]);
  const enterOpacity = interpolate(enterSpring, [0, 1], [0, 1]);

  // Card slide-apart springs
  const cardSpreadSpring = spring({
    frame: Math.max(0, frame - 15),
    fps,
    config: { mass: 0.9, damping: 14, stiffness: 90 },
  });
  const leftX = interpolate(cardSpreadSpring, [0, 1], [0, -280]);
  const rightX = interpolate(cardSpreadSpring, [0, 1], [0, 280]);

  // Laser beam ignition
  const beamProgress = spring({
    frame: Math.max(0, frame - 30),
    fps,
    config: { mass: 0.6, damping: 12, stiffness: 130 },
  });
  const beamWidth = interpolate(beamProgress, [0, 1], [0, 620]);

  // Center 1-Click Pill Button Entrance
  const pillSpring = spring({
    frame: Math.max(0, frame - 45),
    fps,
    config: { mass: 0.5, damping: 11, stiffness: 160 },
  });
  const pillScale = interpolate(pillSpring, [0, 1], [0.6, 1.0]);
  const pillOpacity = interpolate(pillSpring, [0, 1], [0, 1]);

  // Click Trigger Event at Frame 100
  const isClicked = frame >= 100;
  const clickSpring = spring({
    frame: Math.max(0, frame - 100),
    fps,
    config: { mass: 0.4, damping: 9, stiffness: 220 },
  });

  const buttonDepress = interpolate(clickSpring, [0, 0.5, 1], [0, -12, 0]);
  const glowBurst = interpolate(clickSpring, [0, 0.4, 1], [0, 1, 0.6]);

  // Continuous floating hover
  const hoverY = Math.sin(frame * 0.04) * 8;
  const hoverRotX = 12 + Math.sin(frame * 0.03) * 2;
  const hoverRotY = Math.cos(frame * 0.03) * 3;

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
          transform: `scale(${enterScale}) translateY(${hoverY}px) rotateX(${hoverRotX}deg) rotateY(${hoverRotY}deg)`,
          opacity: enterOpacity,
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
            background: isClicked
              ? 'linear-gradient(90deg, #10B981 0%, #FFFFFF 50%, #10B981 100%)'
              : 'linear-gradient(90deg, rgba(77,174,235,0.4) 0%, #FFFFFF 50%, rgba(77,174,235,0.4) 100%)',
            boxShadow: isClicked
              ? '0 0 35px #10B981, 0 0 70px rgba(16, 185, 129, 0.7)'
              : '0 0 30px #4daeeb, 0 0 60px rgba(77, 174, 235, 0.6)',
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
            ...OPTICAL_MATERIALS.TITANIUM_PANEL,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transformStyle: 'preserve-3d',
          }}
        >
          <SpecularTopRim />
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
            ...OPTICAL_MATERIALS.TITANIUM_PANEL,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transformStyle: 'preserve-3d',
          }}
        >
          <SpecularTopRim />
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
            transform: `translateZ(${80 + buttonDepress}px) scale(${pillScale})`,
            opacity: pillOpacity,
            background: isClicked
              ? 'linear-gradient(145deg, #10B981 0%, #059669 100%)'
              : 'linear-gradient(145deg, #FFFFFF 0%, #E2E8F0 100%)',
            color: isClicked ? '#FFFFFF' : '#000000',
            display: 'flex',
            alignItems: 'center',
            gap: 18,
            padding: '18px 38px',
            borderRadius: 20,
            border: isClicked
              ? '1.5px solid rgba(255, 255, 255, 0.8)'
              : '1.5px solid rgba(255, 255, 255, 0.9)',
            boxShadow: isClicked
              ? `0 30px 60px rgba(0, 0, 0, 0.95), 0 0 ${40 + glowBurst * 40}px rgba(16, 185, 129, 0.8), inset 0 2px 2px rgba(255, 255, 255, 0.8)`
              : '0 30px 60px rgba(0, 0, 0, 0.95), 0 10px 30px rgba(77, 174, 235, 0.4), inset 0 2px 2px rgba(255, 255, 255, 0.9)',
            cursor: 'pointer',
            transition: 'background 0.2s',
          }}
        >
          {/* Active Status LED Dot */}
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: '50%',
              backgroundColor: isClicked ? '#FFFFFF' : '#3B82F6',
              boxShadow: isClicked
                ? '0 0 16px #FFFFFF'
                : '0 0 12px #3B82F6',
            }}
          />

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: 26,
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
                fontSize: 14,
                fontWeight: 700,
                opacity: 0.8,
                marginTop: 2,
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
