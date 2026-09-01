import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { IndustrialTheme } from '../../types/theme';

interface TelemetryWaterfallTraceProps {
  speedMultiplier: number;
}

export const TelemetryWaterfallTrace: React.FC<TelemetryWaterfallTraceProps> = ({ speedMultiplier }) => {
  const frame = useCurrentFrame();

  const spans = [
    { name: 'sap.order.query', duration: '24ms', start: 0, width: 28, color: '#4daeeb' },
    { name: 'watsonx.agent.reason', duration: '142ms', start: 28, width: 44, color: '#60A5FA' },
    { name: 'servicenow.ticket.draft', duration: '38ms', start: 72, width: 22, color: '#10B981' },
    { name: 'governance.policy.audit', duration: '12ms', start: 94, width: 6, color: '#F59E0B' },
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
      {/* Left: OpenTelemetry Waterfall Trace Canvas */}
      <div
        style={{
          flex: 1.1,
          height: 480,
          background: 'rgba(9, 10, 12, 0.95)',
          border: '1.5px solid rgba(77, 174, 235, 0.35)',
          borderRadius: 24,
          boxShadow: '0 40px 100px rgba(0, 0, 0, 0.9), 0 0 30px rgba(77, 174, 235, 0.12)',
          padding: '28px 32px',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 18, fontWeight: 900, color: '#FFFFFF' }}>
            OpenTelemetry Execution Trace
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
            100% SPAN AUDIT
          </span>
        </div>

        {/* Trace Span Bars */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 10 }}>
          {spans.map((s, idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontFamily: IndustrialTheme.fonts.mono, color: '#94A3B8' }}>
                <span>{s.name}</span>
                <span style={{ color: s.color, fontWeight: 800 }}>{s.duration}</span>
              </div>
              <div style={{ width: '100%', height: 12, backgroundColor: 'rgba(255, 255, 255, 0.06)', borderRadius: 6, position: 'relative' }}>
                <div
                  style={{
                    position: 'absolute',
                    left: `${s.start}%`,
                    width: `${s.width}%`,
                    height: '100%',
                    backgroundColor: s.color,
                    borderRadius: 6,
                    boxShadow: `0 0 8px ${s.color}`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div style={{ fontSize: 13, color: '#64748B', fontFamily: IndustrialTheme.fonts.mono }}>
          Trace ID: 0x8f2a9... | Full deterministic provenance logged to OpenTelemetry
        </div>
      </div>

      {/* Right: Rollout Velocity Card */}
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
            Deployment Velocity
          </span>
          <span
            style={{
              fontSize: 12,
              fontWeight: 900,
              fontFamily: IndustrialTheme.fonts.mono,
              color: '#10B981',
              background: 'rgba(16, 185, 129, 0.12)',
              border: '1.5px solid #10B981',
              padding: '4px 10px',
              borderRadius: 6,
            }}
          >
            PRODUCTION READY
          </span>
        </div>

        <div style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#64748B', fontWeight: 800, marginBottom: 8, fontFamily: IndustrialTheme.fonts.mono }}>
          Setup Speed Multiplier
        </div>

        <div style={{ fontSize: 72, fontWeight: 900, color: '#090A0C', fontFamily: IndustrialTheme.fonts.mono, letterSpacing: '-0.03em', lineHeight: 1 }}>
          {speedMultiplier.toFixed(1)}x <span style={{ fontSize: 32, color: '#10B981' }}>Faster</span>
        </div>

        <div style={{ marginTop: 22, fontSize: 15, color: '#475569', lineHeight: 1.5 }}>
          Pre-built agents and automated observability allow deployment in days rather than quarters.
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
          ✓ 100% Audit Compliance Verified
        </div>
      </div>
    </div>
  );
};
