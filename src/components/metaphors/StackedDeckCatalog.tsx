import React from 'react';
import { useCurrentFrame, spring, useVideoConfig, interpolate, Img, staticFile } from 'remotion';

interface CardData {
  id: string;
  name: string;
  logo: string;
  width: number;
  glowColor: string;
  finalX: number;
  finalRotZ: number;
  zElev: number;
}

const CARDS: CardData[] = [
  {
    id: 'sap',
    name: 'SAP',
    logo: 'assets/logos/sap_official.svg',
    width: 170,
    glowColor: 'rgba(0, 143, 211, 0.4)',
    finalX: -260,
    finalRotZ: -6,
    zElev: 20,
  },
  {
    id: 'salesforce',
    name: 'Salesforce',
    logo: 'assets/logos/salesforce_official.svg',
    width: 160,
    glowColor: 'rgba(0, 161, 224, 0.5)',
    finalX: 0,
    finalRotZ: 0,
    zElev: 50,
  },
  {
    id: 'servicenow',
    name: 'ServiceNow',
    logo: 'assets/logos/servicenow_official.svg',
    width: 200,
    glowColor: 'rgba(129, 181, 161, 0.4)',
    finalX: 260,
    finalRotZ: 6,
    zElev: 20,
  },
];

export const StackedDeckCatalog: React.FC = () => {
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

  // Fanning spring
  const fanSpring = spring({
    frame: Math.max(0, frame - 18),
    fps,
    config: { mass: 0.9, damping: 13, stiffness: 90 },
  });

  // Front pill badge entrance
  const pillSpring = spring({
    frame: Math.max(0, frame - 32),
    fps,
    config: { mass: 0.5, damping: 11, stiffness: 160 },
  });
  const pillScale = interpolate(pillSpring, [0, 1], [0.6, 1.0]);
  const pillOpacity = interpolate(pillSpring, [0, 1], [0, 1]);

  // Laser beam progress connecting cards
  const beamProgress = spring({
    frame: Math.max(0, frame - 40),
    fps,
    config: { mass: 0.7, damping: 14, stiffness: 100 },
  });

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
      {/* 3D Stage Container */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          transformStyle: 'preserve-3d',
          transform: `scale(${enterScale}) rotateX(14deg)`,
          opacity: enterOpacity,
          position: 'relative',
        }}
      >
        {/* Glowing Arched Fiber-Optic Conduits behind cards */}
        <svg
          style={{
            position: 'absolute',
            width: 700,
            height: 200,
            top: -50,
            pointerEvents: 'none',
            overflow: 'visible',
          }}
          viewBox="0 0 700 200"
        >
          <path
            d="M 120,100 Q 350,10 580,100"
            fill="none"
            stroke="rgba(77, 174, 235, 0.3)"
            strokeWidth="4"
          />
          <path
            d="M 120,100 Q 350,10 580,100"
            fill="none"
            stroke="#4daeeb"
            strokeWidth="4"
            strokeDasharray="460"
            strokeDashoffset={interpolate(beamProgress, [0, 1], [460, 0])}
            style={{
              filter: 'drop-shadow(0 0 12px #4daeeb)',
            }}
          />
        </svg>

        {/* Fanning Card Stack */}
        <div
          style={{
            position: 'relative',
            width: 320,
            height: 440,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transformStyle: 'preserve-3d',
          }}
        >
          {CARDS.map((c, index) => {
            const currentX = interpolate(fanSpring, [0, 1], [0, c.finalX]);
            const currentRotZ = interpolate(fanSpring, [0, 1], [0, c.finalRotZ]);
            const scale = index === 1 ? 1.05 : 0.95;

            return (
              <div
                key={c.id}
                style={{
                  position: 'absolute',
                  width: 250,
                  height: 380,
                  borderRadius: 24,
                  background: 'linear-gradient(155deg, #182333 0%, #0c121b 100%)',
                  border: '1px solid rgba(255, 255, 255, 0.18)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transformStyle: 'preserve-3d',
                  transform: `translateX(${currentX}px) translateZ(${c.zElev}px) rotateZ(${currentRotZ}deg) scale(${scale})`,
                  boxShadow: `
                    0 35px 70px -15px rgba(0, 0, 0, 0.95),
                    0 15px 35px -10px rgba(0, 0, 0, 0.8),
                    inset 0 2px 3px rgba(255, 255, 255, 0.35),
                    inset 0 -8px 20px rgba(0, 0, 0, 0.7),
                    0 0 40px ${c.glowColor}
                  `,
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

        {/* Front 3D Tactile Glass Pill Badge with 90px clean breathing space */}
        <div
          style={{
            marginTop: 90,
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
            border: '2px solid rgba(255, 255, 255, 0.8)',
            boxShadow: `
              0 30px 60px rgba(0, 0, 0, 0.95),
              0 15px 35px rgba(77, 174, 235, 0.7),
              inset 0 3px 3px rgba(255, 255, 255, 0.9)
            `,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Top Glass Rim */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '45%',
              background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0) 100%)',
              borderRadius: '60px 60px 0 0',
            }}
          />
          AGENT CATALOG
        </div>
      </div>
    </div>
  );
};
