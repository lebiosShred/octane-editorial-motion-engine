import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { IndustrialTheme } from '../../types/theme';

interface Scene1Props {
  currentTime: number;
}

export const Scene1_BrittleCodeCollapse: React.FC<Scene1Props> = ({ currentTime }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Word triggers:
  // "6 months" (~3.0s -> frame 180)
  // "custom glue code" (~6.0s -> frame 360)
  // "break the moment a schema changes" (~8.5s -> frame 510)
  const isBroken = currentTime >= 7.5;
  const breakSpring = spring({
    frame: Math.max(0, frame - Math.round(7.5 * fps)),
    fps,
    config: { mass: 0.8, damping: 12, stiffness: 100 },
  });

  const numberSpring = spring({
    frame: Math.max(0, frame - Math.round(2.5 * fps)),
    fps,
    config: { mass: 0.6, damping: 14, stiffness: 120 },
  });

  const stallDays = interpolate(currentTime, [0, 6.0], [0, 180], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Physical fracture displacement
  const fractureOffsetY = interpolate(breakSpring, [0, 1], [0, 220]);
  const fractureRotateZ = interpolate(breakSpring, [0, 1], [0, 28]);
  const fractureOpacity = interpolate(breakSpring, [0, 0.8, 1], [1, 0.6, 0]);

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
      {/* Left 3D Isometric Fracturing Terminal Ribbon */}
      <div
        style={{
          width: 720,
          transformStyle: 'preserve-3d',
          transform: 'rotateX(22deg) rotateY(-18deg) rotateZ(2deg) translateZ(60px)',
          position: 'relative',
        }}
      >
        {/* Terminal Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px 18px',
            background: 'rgba(15, 23, 42, 0.85)',
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            border: '1.5px solid rgba(255, 255, 255, 0.1)',
            borderBottom: 'none',
            backdropFilter: 'blur(16px)',
          }}
        >
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#F43F5E' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#F59E0B' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#10B981' }} />
            <span style={{ fontSize: 12, fontFamily: IndustrialTheme.fonts.mono, color: '#94A3B8', marginLeft: 10, fontWeight: 700 }}>
              custom_erp_bridge.ts
            </span>
          </div>
          <span
            style={{
              fontSize: 11,
              fontFamily: IndustrialTheme.fonts.mono,
              color: isBroken ? '#F43F5E' : '#4daeeb',
              background: isBroken ? 'rgba(244, 63, 94, 0.15)' : 'rgba(77, 174, 235, 0.15)',
              border: `1.5px solid ${isBroken ? '#F43F5E' : '#4daeeb'}`,
              padding: '2px 8px',
              borderRadius: 6,
              fontWeight: 900,
            }}
          >
            {isBroken ? 'CRITICAL SCHEMA MISMATCH' : 'POINT-TO-POINT WRAPPER'}
          </span>
        </div>

        {/* Top Stable Syntax Block */}
        <div
          style={{
            background: 'rgba(9, 10, 12, 0.92)',
            border: '1.5px solid rgba(255, 255, 255, 0.1)',
            borderTop: 'none',
            borderBottom: 'none',
            padding: '20px 24px',
            fontFamily: IndustrialTheme.fonts.mono,
            fontSize: 14,
            lineHeight: 1.7,
            color: '#E2E8F0',
            backdropFilter: 'blur(20px)',
          }}
        >
          <div style={{ color: '#64748B' }}>// Legacy SAP / Salesforce Auth Pipeline</div>
          <div><span style={{ color: '#F43F5E', fontWeight: 800 }}>const</span> sapAuth = <span style={{ color: '#4daeeb' }}>await</span> initSapClient(<span style={{ color: '#10B981' }}>'RFC_10928'</span>);</div>
          <div><span style={{ color: '#F43F5E', fontWeight: 800 }}>const</span> salesforceSync = <span style={{ color: '#4daeeb' }}>await</span> connectCrm();</div>
        </div>

        {/* Fracturing Mid-Section Syntax Block */}
        <div
          style={{
            background: isBroken ? 'rgba(69, 10, 10, 0.95)' : 'rgba(9, 10, 12, 0.92)',
            border: isBroken ? '2px solid #F43F5E' : '1.5px solid rgba(255, 255, 255, 0.1)',
            padding: '22px 24px',
            fontFamily: IndustrialTheme.fonts.mono,
            fontSize: 14,
            lineHeight: 1.7,
            color: isBroken ? '#FCA5A5' : '#E2E8F0',
            transform: `translate3d(0, ${fractureOffsetY}px, 0) rotateZ(${fractureRotateZ}deg)`,
            opacity: fractureOpacity,
            boxShadow: isBroken ? '0 0 40px rgba(244, 63, 94, 0.5)' : 'none',
            borderRadius: isBroken ? 12 : 0,
            transition: 'background 0.3s ease',
          }}
        >
          <div style={{ color: isBroken ? '#FCA5A5' : '#64748B' }}>
            {isBroken ? '>> ERROR: [500] ERP Object "PO_10928.line_items" mutated to array.' : '// Unhandled Schema Mutation'}
          </div>
          <div>
            <span style={{ color: '#F43F5E', fontWeight: 900 }}>sapAuth</span>.records.<span style={{ color: '#F59E0B' }}>map</span>(r =&gt; salesforceSync.push(r.<span style={{ color: '#F43F5E', fontWeight: 900 }}>field_id</span>));
          </div>
          {isBroken && (
            <div style={{ marginTop: 8, color: '#F43F5E', fontWeight: 900, letterSpacing: '0.08em' }}>
              FATAL: TypeError: Cannot read properties of undefined
            </div>
          )}
        </div>

        {/* Bottom Status Block */}
        <div
          style={{
            background: 'rgba(15, 23, 42, 0.85)',
            borderBottomLeftRadius: 16,
            borderBottomRightRadius: 16,
            border: '1.5px solid rgba(255, 255, 255, 0.1)',
            borderTop: 'none',
            padding: '12px 18px',
            fontSize: 12,
            fontFamily: IndustrialTheme.fonts.mono,
            color: '#64748B',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span>Fragile Point-to-Point Glue Code</span>
          <span style={{ color: '#F43F5E', fontWeight: 800 }}>Runtime Breakage</span>
        </div>
      </div>

      {/* Right 3D Massive Unboxed Telemetry Monument */}
      <div
        style={{
          width: 540,
          transformStyle: 'preserve-3d',
          transform: `rotateX(22deg) rotateY(-18deg) translateZ(${interpolate(numberSpring, [0, 1], [0, 100])}px)`,
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
            color: '#F43F5E',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom: 6,
          }}
        >
          [ Sunk Engineering Time ]
        </div>

        <div
          style={{
            fontSize: 120,
            fontWeight: 900,
            color: '#FFFFFF',
            fontFamily: IndustrialTheme.fonts.mono,
            lineHeight: 0.9,
            letterSpacing: '-0.04em',
            textShadow: '0 20px 60px rgba(0, 0, 0, 0.9), 0 0 50px rgba(244, 63, 94, 0.3)',
          }}
        >
          {Math.round(stallDays)}
          <span style={{ fontSize: 44, color: '#4daeeb', marginLeft: 16 }}>DAYS</span>
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
          Wasted writing custom API adapters, manual auth tokens, and broken schema parsers.
        </div>

        {/* 3D Volumetric Energy Bar */}
        <div
          style={{
            marginTop: 24,
            width: '100%',
            height: 8,
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: 4,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: `${Math.min(100, (stallDays / 180) * 100)}%`,
              height: '100%',
              backgroundColor: '#F43F5E',
              boxShadow: '0 0 16px #F43F5E',
            }}
          />
        </div>
      </div>
    </div>
  );
};
