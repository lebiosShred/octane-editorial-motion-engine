import React from 'react';
import { Img, staticFile, useCurrentFrame } from 'remotion';
import { IndustrialTheme } from '../../types/theme';

export const OrbitalCatalogDock: React.FC = () => {
  const frame = useCurrentFrame();
  const rotation = frame * 0.4;

  const connectors = [
    { name: 'SAP S/4HANA ERP', logo: 'assets/logos/sap.svg', width: 75, angle: 0 },
    { name: 'SALESFORCE CRM', logo: 'assets/logos/salesforce.svg', width: 65, angle: 72 },
    { name: 'SERVICENOW ITSM', logo: 'assets/logos/servicenow.svg', width: 60, angle: 144 },
    { name: 'WORKDAY HCM', logo: 'assets/logos/workday.svg', width: 85, angle: 216 },
    { name: '+145 MCP AGENTS', textOnly: true, angle: 288 },
  ];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 50,
        width: 1320,
      }}
    >
      {/* Left: Orbital Kinetic Dock Canvas */}
      <div
        style={{
          flex: 1.1,
          height: 480,
          background: 'rgba(9, 10, 12, 0.95)',
          border: '1.5px solid rgba(77, 174, 235, 0.35)',
          borderRadius: 24,
          boxShadow: '0 40px 100px rgba(0, 0, 0, 0.9), 0 0 30px rgba(77, 174, 235, 0.12)',
          padding: '24px 30px',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10 }}>
          <span style={{ fontSize: 18, fontWeight: 900, color: '#FFFFFF' }}>
            Governed Agent Docking Architecture
          </span>
          <span
            style={{
              fontSize: 12,
              fontWeight: 900,
              fontFamily: IndustrialTheme.fonts.mono,
              color: '#4daeeb',
              background: 'rgba(77, 174, 235, 0.15)',
              border: '1.5px solid #4daeeb',
              padding: '4px 10px',
              borderRadius: 6,
            }}
          >
            ACTIVE MCP PROTOCOL
          </span>
        </div>

        {/* Central Core & Orbital Paths */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: 380,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Orbital Track */}
          <div
            style={{
              position: 'absolute',
              width: 320,
              height: 320,
              borderRadius: '50%',
              border: '1.5px dashed rgba(77, 174, 235, 0.25)',
            }}
          />

          {/* Central watsonx Hub */}
          <div
            style={{
              width: 140,
              height: 140,
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              border: '3px solid #4daeeb',
              boxShadow: '0 0 40px rgba(77, 174, 235, 0.4)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 20,
            }}
          >
            <Img
              src={staticFile('assets/logos/ibm.svg')}
              style={{ width: 80, height: 35, objectFit: 'contain' }}
            />
            <div
              style={{
                fontSize: 10,
                fontWeight: 900,
                color: '#090A0C',
                fontFamily: IndustrialTheme.fonts.mono,
                marginTop: 4,
              }}
            >
              ORCHESTRATE
            </div>
          </div>

          {/* Docked Satellites */}
          {connectors.map((c, i) => {
            const rad = ((c.angle + rotation) * Math.PI) / 180;
            const x = Math.cos(rad) * 160;
            const y = Math.sin(rad) * 120;

            return (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  transform: `translate3d(${x}px, ${y}px, 0)`,
                  backgroundColor: '#FFFFFF',
                  border: '1.5px solid rgba(0,0,0,0.08)',
                  borderRadius: 14,
                  boxShadow: '0 10px 25px rgba(0,0,0,0.4)',
                  padding: '8px 12px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 15,
                }}
              >
                {c.textOnly ? (
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 900,
                      color: '#4daeeb',
                      fontFamily: IndustrialTheme.fonts.mono,
                    }}
                  >
                    +145 MORE
                  </div>
                ) : (
                  <Img
                    src={staticFile(c.logo!)}
                    style={{ width: c.width, height: 30, objectFit: 'contain' }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Right: Agent Catalog Spec Card */}
      <div
        style={{
          width: 580,
          backgroundColor: '#FFFFFF',
          borderRadius: 24,
          boxShadow: '0 50px 120px -20px rgba(0, 0, 0, 0.95), 0 20px 50px -10px rgba(0, 0, 0, 0.6)',
          border: '1px solid rgba(0,0,0,0.08)',
          padding: '38px 42px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <span style={{ fontSize: 20, fontWeight: 900, color: '#090A0C' }}>
            Agent Catalog Repository
          </span>
          <span
            style={{
              fontSize: 12,
              fontWeight: 900,
              fontFamily: IndustrialTheme.fonts.mono,
              color: '#4daeeb',
              background: 'rgba(77, 174, 235, 0.15)',
              border: '1.5px solid #4daeeb',
              padding: '4px 10px',
              borderRadius: 6,
            }}
          >
            VERIFIED MCP
          </span>
        </div>

        <div style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#64748B', fontWeight: 800, marginBottom: 8, fontFamily: IndustrialTheme.fonts.mono }}>
          Pre-Built Connectors
        </div>

        <div style={{ fontSize: 72, fontWeight: 900, color: '#090A0C', fontFamily: IndustrialTheme.fonts.mono, letterSpacing: '-0.03em', lineHeight: 1 }}>
          150+ <span style={{ fontSize: 32, color: '#4daeeb' }}>Agents</span>
        </div>

        <div style={{ marginTop: 22, fontSize: 15, color: '#475569', lineHeight: 1.5 }}>
          Out-of-the-box native tools for SAP S/4HANA, Salesforce Sales Cloud, ServiceNow ITSM, and Workday HCM.
        </div>

        <div
          style={{
            marginTop: 18,
            background: '#F8FAFC',
            padding: '12px 16px',
            borderRadius: 12,
            border: '1px solid rgba(0,0,0,0.06)',
            fontSize: 13,
            color: '#090A0C',
            fontFamily: IndustrialTheme.fonts.mono,
            fontWeight: 700,
          }}
        >
          ✓ Zero custom glue code required
        </div>
      </div>
    </div>
  );
};
