import React from 'react';
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { IndustrialTheme } from '../../types/theme';

interface Scene2Props {
  currentTime: number;
}

export const Scene2_OrbitalCatalogPlatform: React.FC<Scene2Props> = ({ currentTime }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const getPillarSpring = (delaySec: number) => {
    return spring({
      frame: Math.max(0, frame - Math.round(delaySec * fps)),
      fps,
      config: { mass: 0.6, damping: 13, stiffness: 110 },
    });
  };

  const sapSpring = getPillarSpring(13.0);
  const salesforceSpring = getPillarSpring(14.5);
  const servicenowSpring = getPillarSpring(16.0);
  const workdaySpring = getPillarSpring(17.5);
  const mcpSpring = getPillarSpring(19.0);

  const pillars = [
    { name: 'SAP ERP', logo: 'assets/logos/sap.svg', width: 70, angle: 30, sp: sapSpring },
    { name: 'SALESFORCE', logo: 'assets/logos/salesforce.svg', width: 65, angle: 105, sp: salesforceSpring },
    { name: 'SERVICENOW', logo: 'assets/logos/servicenow.svg', width: 60, angle: 180, sp: servicenowSpring },
    { name: 'WORKDAY', logo: 'assets/logos/workday.svg', width: 80, angle: 255, sp: workdaySpring },
    { name: '+145 MCP', textOnly: true, angle: 330, sp: mcpSpring },
  ];

  return (
    <div
      style={{
        position: 'relative',
        width: 1400,
        height: 600,
        transformStyle: 'preserve-3d',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      {/* Left 3D Rising Pedestal Stage */}
      <div
        style={{
          width: 700,
          height: 500,
          position: 'relative',
          transformStyle: 'preserve-3d',
          transform: 'rotateX(55deg) rotateZ(-20deg) translateZ(40px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Outer Hexagonal Pedestal Ring */}
        <div
          style={{
            position: 'absolute',
            width: 480,
            height: 480,
            borderRadius: '50%',
            border: '2px solid rgba(77, 174, 235, 0.4)',
            boxShadow: '0 0 50px rgba(77, 174, 235, 0.2), inset 0 0 50px rgba(77, 174, 235, 0.1)',
            background: 'radial-gradient(circle, rgba(15, 23, 42, 0.8) 0%, rgba(0, 0, 0, 0.95) 75%)',
          }}
        />

        {/* Central 3D watsonx Core Hub */}
        <div
          style={{
            position: 'absolute',
            width: 150,
            height: 150,
            borderRadius: '50%',
            backgroundColor: '#FFFFFF',
            boxShadow: '0 0 60px rgba(77, 174, 235, 0.8), 0 20px 50px rgba(0, 0, 0, 0.9)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            transform: 'translateZ(90px)',
            transformStyle: 'preserve-3d',
            border: '3px solid #4daeeb',
          }}
        >
          <Img
            src={staticFile('assets/logos/ibm.svg')}
            style={{ width: 85, height: 38, objectFit: 'contain' }}
          />
          <div
            style={{
              fontSize: 10,
              fontWeight: 900,
              color: '#090A0C',
              fontFamily: IndustrialTheme.fonts.mono,
              marginTop: 4,
              letterSpacing: '0.1em',
            }}
          >
            ORCHESTRATE
          </div>
        </div>

        {/* Rising 3D Satellites along Z-Axis */}
        {pillars.map((p, idx) => {
          const rad = (p.angle * Math.PI) / 180;
          const radius = 200;
          const x = Math.cos(rad) * radius;
          const y = Math.sin(rad) * radius;
          const zElevation = interpolate(p.sp, [0, 1], [-80, 70]);
          const opacity = interpolate(p.sp, [0, 0.3, 1], [0, 1, 1]);

          return (
            <div
              key={idx}
              style={{
                position: 'absolute',
                transform: `translate3d(${x}px, ${y}px, ${zElevation}px)`,
                transformStyle: 'preserve-3d',
                opacity,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              {/* Laser Conduit Ray to Core */}
              <div
                style={{
                  position: 'absolute',
                  width: 2,
                  height: radius - 60,
                  background: 'linear-gradient(to top, #4daeeb, transparent)',
                  transformOrigin: 'top center',
                  transform: `rotate(${p.angle - 90}deg)`,
                  boxShadow: '0 0 10px #4daeeb',
                }}
              />

              {/* Physical Floating Platform Disc */}
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 16,
                  padding: '10px 16px',
                  boxShadow: '0 15px 35px rgba(0, 0, 0, 0.8), 0 0 20px rgba(77, 174, 235, 0.4)',
                  border: '2px solid #4daeeb',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {p.textOnly ? (
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 900,
                      color: '#4daeeb',
                      fontFamily: IndustrialTheme.fonts.mono,
                    }}
                  >
                    +145 MORE
                  </div>
                ) : (
                  <Img
                    src={staticFile(p.logo!)}
                    style={{ width: p.width, height: 32, objectFit: 'contain' }}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Right 3D Unboxed Kinetic Typography */}
      <div
        style={{
          width: 580,
          transformStyle: 'preserve-3d',
          transform: 'rotateX(22deg) rotateY(-18deg) translateZ(80px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
      >
        <div
          style={{
            fontSize: 14,
            fontWeight: 900,
            fontFamily: IndustrialTheme.fonts.mono,
            color: '#4daeeb',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom: 6,
          }}
        >
          [ Governed Marketplace ]
        </div>

        <div
          style={{
            fontSize: 110,
            fontWeight: 900,
            color: '#FFFFFF',
            fontFamily: IndustrialTheme.fonts.mono,
            lineHeight: 0.9,
            letterSpacing: '-0.04em',
            textShadow: '0 20px 60px rgba(0, 0, 0, 0.9), 0 0 50px rgba(77, 174, 235, 0.4)',
          }}
        >
          150+
          <span style={{ fontSize: 38, color: '#4daeeb', marginLeft: 16 }}>AGENTS</span>
        </div>

        <div
          style={{
            fontSize: 22,
            fontWeight: 800,
            color: '#94A3B8',
            marginTop: 18,
            lineHeight: 1.4,
          }}
        >
          Pre-built Model Context Protocol (MCP) connectors ready for instant enterprise deployment.
        </div>

        <div
          style={{
            marginTop: 24,
            display: 'flex',
            gap: 12,
            flexWrap: 'wrap',
          }}
        >
          <div
            style={{
              padding: '6px 14px',
              borderRadius: 8,
              background: 'rgba(77, 174, 235, 0.12)',
              border: '1.5px solid #4daeeb',
              color: '#4daeeb',
              fontFamily: IndustrialTheme.fonts.mono,
              fontSize: 13,
              fontWeight: 800,
            }}
          >
            ✓ Native ERP Tools
          </div>
          <div
            style={{
              padding: '6px 14px',
              borderRadius: 8,
              background: 'rgba(77, 174, 235, 0.12)',
              border: '1.5px solid #4daeeb',
              color: '#4daeeb',
              fontFamily: IndustrialTheme.fonts.mono,
              fontSize: 13,
              fontWeight: 800,
            }}
          >
            ✓ Zero Custom Adapters
          </div>
        </div>
      </div>
    </div>
  );
};
