import React from 'react';
import { useCurrentFrame, spring, useVideoConfig, interpolate, Img, staticFile } from 'remotion';

export const SequentialBrandCards: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Continuous subtle 3D floating hover
  const hoverY = Math.sin(frame * 0.04) * 8;
  const hoverRotX = 12 + Math.sin(frame * 0.03) * 2;
  const hoverRotY = -4 + Math.cos(frame * 0.035) * 3;

  // Staggered card entrance springs
  const card1Spring = spring({
    frame,
    fps,
    config: { mass: 0.7, damping: 14, stiffness: 130 },
  });
  const card2Spring = spring({
    frame: Math.max(0, frame - 10),
    fps,
    config: { mass: 0.7, damping: 14, stiffness: 130 },
  });
  const card3Spring = spring({
    frame: Math.max(0, frame - 20),
    fps,
    config: { mass: 0.7, damping: 14, stiffness: 130 },
  });

  // Glowing wire entrance
  const wireSpring = spring({
    frame: Math.max(0, frame - 24),
    fps,
    config: { mass: 0.5, damping: 15, stiffness: 140 },
  });
  const wireOpacity = interpolate(wireSpring, [0, 1], [0, 1]);

  // Front 3D Pill Badge pop
  const pillSpring = spring({
    frame: Math.max(0, frame - 32),
    fps,
    config: { mass: 0.6, damping: 12, stiffness: 150 },
  });
  const pillScale = interpolate(pillSpring, [0, 1], [0.4, 1.0]);
  const pillOpacity = interpolate(pillSpring, [0, 1], [0, 1]);

  // Animated light pulse on conduits
  const pulseDash = (frame * 6) % 200;

  const cards = [
    {
      name: 'SAP',
      logo: 'assets/logos/sap_official.svg',
      width: 170,
      spring: card1Spring,
      zElev: 20,
      glowColor: 'rgba(0, 143, 211, 0.25)',
    },
    {
      name: 'salesforce',
      logo: 'assets/logos/salesforce_official.svg',
      width: 180,
      spring: card2Spring,
      zElev: 50,
      glowColor: 'rgba(0, 161, 224, 0.35)',
    },
    {
      name: 'servicenow',
      logo: 'assets/logos/servicenow_official.svg',
      width: 200,
      spring: card3Spring,
      zElev: 20,
      glowColor: 'rgba(129, 181, 161, 0.25)',
    },
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
        perspective: 1400,
        position: 'relative',
      }}
    >
      {/* 3D Physical Stage */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          transformStyle: 'preserve-3d',
          transform: `translateY(${hoverY}px) rotateX(${hoverRotX}deg) rotateY(${hoverRotY}deg)`,
          position: 'relative',
        }}
      >
        {/* Glowing 3D Fiber-Optic Connector Conduit SVGs */}
        <svg
          style={{
            position: 'absolute',
            top: -110,
            width: 960,
            height: 240,
            opacity: wireOpacity,
            pointerEvents: 'none',
            transform: 'translateZ(10px)',
            overflow: 'visible',
          }}
          viewBox="0 0 960 240"
        >
          <defs>
            <linearGradient id="neonCyan" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4daeeb" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
              <stop offset="100%" stopColor="#4daeeb" stopOpacity="0.8" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* SAP to Salesforce Conduit */}
          <path
            d="M 230,220 C 230,30 480,30 480,220"
            fill="none"
            stroke="rgba(77, 174, 235, 0.3)"
            strokeWidth="8"
          />
          <path
            d="M 230,220 C 230,30 480,30 480,220"
            fill="none"
            stroke="url(#neonCyan)"
            strokeWidth="4"
            filter="url(#glow)"
            strokeDasharray="40 160"
            strokeDashoffset={-pulseDash}
          />

          {/* Salesforce to ServiceNow Conduit */}
          <path
            d="M 480,220 C 480,30 730,30 730,220"
            fill="none"
            stroke="rgba(255, 255, 255, 0.25)"
            strokeWidth="8"
          />
          <path
            d="M 480,220 C 480,30 730,30 730,220"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="4"
            filter="url(#glow)"
            strokeDasharray="40 160"
            strokeDashoffset={-pulseDash + 80}
          />
        </svg>

        {/* 3 Heavy 3D Physical Cards */}
        <div
          style={{
            display: 'flex',
            gap: 28,
            alignItems: 'center',
            justifyContent: 'center',
            transformStyle: 'preserve-3d',
          }}
        >
          {cards.map((c, i) => {
            const yOffset = interpolate(c.spring, [0, 1], [140, 0]);
            const opacity = interpolate(c.spring, [0, 1], [0, 1]);
            const scale = interpolate(c.spring, [0, 1], [0.8, 1.0]);

            return (
              <div
                key={i}
                style={{
                  width: 280,
                  height: 420,
                  background: 'linear-gradient(155deg, #182333 0%, #0c121b 100%)',
                  borderRadius: 28,
                  border: '1px solid rgba(255, 255, 255, 0.16)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 24,
                  transformStyle: 'preserve-3d',
                  transform: `translateY(${yOffset}px) translateZ(${c.zElev}px) scale(${scale})`,
                  opacity,
                  boxShadow: `
                    0 35px 70px -15px rgba(0, 0, 0, 0.95),
                    0 15px 35px -10px rgba(0, 0, 0, 0.8),
                    inset 0 2px 3px rgba(255, 255, 255, 0.35),
                    inset 0 -8px 20px rgba(0, 0, 0, 0.7),
                    0 0 40px ${c.glowColor}
                  `,
                  position: 'relative',
                }}
              >
                {/* Top Glass Specular Rim Highlight */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 20,
                    right: 20,
                    height: 2,
                    background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.6) 50%, transparent 100%)',
                    borderRadius: 2,
                  }}
                />

                {/* Floating 3D Logo Plate */}
                <div
                  style={{
                    transform: 'translateZ(35px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    filter: 'drop-shadow(0 15px 25px rgba(0, 0, 0, 0.7))',
                  }}
                >
                  <Img
                    src={staticFile(c.logo)}
                    style={{
                      width: c.width,
                      height: 'auto',
                      objectFit: 'contain',
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Front 3D Tactile Glass Pill Badge */}
        <div
          style={{
            marginTop: -54,
            transformStyle: 'preserve-3d',
            transform: `translateZ(85px) scale(${pillScale})`,
            opacity: pillOpacity,
            background: 'linear-gradient(140deg, #60c5ff 0%, #2080c4 100%)',
            color: '#000000',
            fontSize: 44,
            fontWeight: 900,
            padding: '22px 68px',
            borderRadius: 60,
            fontFamily: '"Inter", sans-serif',
            letterSpacing: '0.04em',
            border: '1px solid rgba(255, 255, 255, 0.4)',
            boxShadow: `
              0 25px 60px rgba(0, 0, 0, 0.95),
              0 12px 35px rgba(77, 174, 235, 0.6),
              inset 0 3px 3px rgba(255, 255, 255, 0.8),
              inset 0 -6px 14px rgba(0, 0, 0, 0.35)
            `,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Top Glass Sheen Overlay */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '45%',
              background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0) 100%)',
              borderRadius: '60px 60px 0 0',
              pointerEvents: 'none',
            }}
          />
          AGENT CATALOG
        </div>
      </div>
    </div>
  );
};
