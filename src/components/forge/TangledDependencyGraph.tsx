import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { IndustrialTheme } from '../../types/theme';

interface TangledDependencyGraphProps {
  stallDays: number;
}

export const TangledDependencyGraph: React.FC<TangledDependencyGraphProps> = ({ stallDays }) => {
  const frame = useCurrentFrame();
  const pulse = Math.sin(frame * 0.1) * 0.5 + 0.5;

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
      {/* Left: Tangled Architecture Mesh */}
      <div
        style={{
          flex: 1,
          height: 480,
          background: 'rgba(9, 10, 12, 0.95)',
          border: '1.5px solid rgba(244, 63, 94, 0.35)',
          borderRadius: 24,
          boxShadow: '0 40px 100px rgba(0, 0, 0, 0.9), 0 0 30px rgba(244, 63, 94, 0.12)',
          padding: '30px 34px',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 18, fontWeight: 900, color: '#FFFFFF' }}>
            Brittle Point-to-Point Glue Code
          </span>
          <span
            style={{
              fontSize: 12,
              fontWeight: 900,
              fontFamily: IndustrialTheme.fonts.mono,
              color: IndustrialTheme.signals.danger,
              background: IndustrialTheme.signals.dangerBg,
              border: `1.5px solid ${IndustrialTheme.signals.danger}`,
              padding: '4px 10px',
              borderRadius: 6,
              letterSpacing: '0.08em',
            }}
          >
            SCHEMA BREAK DETECTED
          </span>
        </div>

        {/* Tangled SVG mesh */}
        <div style={{ position: 'relative', width: '100%', height: 260 }}>
          <svg width="100%" height="100%" viewBox="0 0 500 240" style={{ overflow: 'visible' }}>
            {/* Tangled Chaos Paths */}
            <path
              d="M 50 40 C 150 180, 200 20, 320 160"
              fill="none"
              stroke={IndustrialTheme.signals.danger}
              strokeWidth={2}
              strokeDasharray="6 6"
              opacity={0.8}
            />
            <path
              d="M 50 180 C 120 40, 280 220, 420 60"
              fill="none"
              stroke={IndustrialTheme.signals.danger}
              strokeWidth={2.5}
              opacity={0.7}
            />
            <path
              d="M 120 120 C 220 240, 350 40, 440 180"
              fill="none"
              stroke="#F43F5E"
              strokeWidth={3}
              strokeDasharray="8 8"
              strokeDashoffset={-frame * 2}
              style={{ filter: 'drop-shadow(0 0 6px #F43F5E)' }}
            />

            {/* Fragile Nodes */}
            <g transform="translate(40, 30)">
              <rect width="90" height="34" rx="8" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
              <text x="45" y="22" fill="#FFFFFF" fontSize="11" fontWeight="800" textAnchor="middle" fontFamily="monospace">Custom Auth</text>
            </g>

            <g transform="translate(30, 160)">
              <rect width="110" height="34" rx="8" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
              <text x="55" y="22" fill="#FFFFFF" fontSize="11" fontWeight="800" textAnchor="middle" fontFamily="monospace">SAP Wrapper</text>
            </g>

            <g transform="translate(190, 85)">
              <rect width="120" height="38" rx="8" fill="#450A0A" stroke="#F43F5E" strokeWidth="2" />
              <text x="60" y="24" fill="#FCA5A5" fontSize="11" fontWeight="900" textAnchor="middle" fontFamily="monospace">API FAILURE</text>
            </g>

            <g transform="translate(370, 45)">
              <rect width="100" height="34" rx="8" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
              <text x="50" y="22" fill="#FFFFFF" fontSize="11" fontWeight="800" textAnchor="middle" fontFamily="monospace">Salesforce API</text>
            </g>

            <g transform="translate(380, 160)">
              <rect width="100" height="34" rx="8" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
              <text x="50" y="22" fill="#FFFFFF" fontSize="11" fontWeight="800" textAnchor="middle" fontFamily="monospace">Workday Sync</text>
            </g>
          </svg>
        </div>

        <div style={{ fontSize: 13, color: '#94A3B8', fontFamily: IndustrialTheme.fonts.mono }}>
          {'[Error: Schema mismatch on SAP RFC endpoint -> Pipeline execution terminated]'}
        </div>
      </div>

      {/* Right: Latency & Budget Stall Card */}
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
            Integration Timeline
          </span>
          <span
            style={{
              fontSize: 12,
              fontWeight: 900,
              fontFamily: IndustrialTheme.fonts.mono,
              color: '#F43F5E',
              background: 'rgba(244, 63, 94, 0.12)',
              border: '1.5px solid #F43F5E',
              padding: '4px 10px',
              borderRadius: 6,
            }}
          >
            6 MONTHS DELAY
          </span>
        </div>

        <div style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#64748B', fontWeight: 800, marginBottom: 8, fontFamily: IndustrialTheme.fonts.mono }}>
          Engineering Time Sunk
        </div>

        <div style={{ fontSize: 72, fontWeight: 900, color: '#090A0C', fontFamily: IndustrialTheme.fonts.mono, letterSpacing: '-0.03em', lineHeight: 1 }}>
          {Math.round(stallDays)} <span style={{ fontSize: 32, color: '#4daeeb' }}>Days</span>
        </div>

        <div style={{ marginTop: 22, display: 'flex', justifyContent: 'space-between', fontSize: 14, color: '#475569', fontFamily: IndustrialTheme.fonts.mono, fontWeight: 700 }}>
          <span>Connecting legacy silos...</span>
          <span style={{ color: '#F43F5E', fontWeight: 900 }}>{Math.min(100, Math.round((stallDays / 180) * 100))}% STALLED</span>
        </div>

        <div style={{ marginTop: 10, width: '100%', height: 10, backgroundColor: '#E2E8F0', borderRadius: 5, overflow: 'hidden' }}>
          <div style={{ width: `${Math.min(100, (stallDays / 180) * 100)}%`, height: '100%', backgroundColor: '#F43F5E' }} />
        </div>
      </div>
    </div>
  );
};
