import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { IndustrialTheme } from '../../types/theme';

interface Scene4Props {
  currentTime: number;
}

export const Scene4_TraceWaterfall3D: React.FC<Scene4Props> = ({ currentTime }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Word triggers:
  // "full observability" (~44.0s -> frame 2640)
  // "100% audit compliance" (~47.0s -> frame 2820)
  // "deploy in days, not months" (~50.0s -> frame 3000)
  const speedSpring = spring({
    frame: Math.max(0, frame - Math.round(48.0 * fps)),
    fps,
    config: { mass: 0.6, damping: 12, stiffness: 120 },
  });

  const speedMultiplier = interpolate(currentTime, [47.0, 53.0], [1.0, 10.1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const spans = [
    { name: 'sap.order.query', duration: '24ms', width: 38, color: '#4daeeb', offset: 0 },
    { name: 'watsonx.agent.reason', duration: '142ms', width: 56, color: '#4daeeb', offset: 30 },
    { name: 'servicenow.ticket.draft', duration: '38ms', width: 44, color: '#10B981', offset: 52 },
    { name: 'governance.policy.audit', duration: '12ms', width: 24, color: '#F59E0B', offset: 74 },
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
      {/* Left 3D OpenTelemetry Waterfall Trace Canvas */}
      <div
        style={{
          width: 740,
          transformStyle: 'preserve-3d',
          transform: 'rotateX(22deg) rotateY(-18deg) translateZ(40px)',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 8,
          }}
        >
          <span style={{ fontSize: 13, fontWeight: 900, color: '#4daeeb', fontFamily: IndustrialTheme.fonts.mono }}>
            [ OPENTELEMETRY DISTRIBUTED TRACE ]
          </span>
          <span
            style={{
              fontSize: 11,
              fontFamily: IndustrialTheme.fonts.mono,
              color: '#10B981',
              background: 'rgba(16, 185, 129, 0.15)',
              border: '1.5px solid #10B981',
              padding: '3px 8px',
              borderRadius: 6,
              fontWeight: 900,
            }}
          >
            100% SPAN AUDIT VERIFIED
          </span>
        </div>

        {spans.map((span, idx) => {
          const spanProgress = interpolate(currentTime, [43.0 + idx * 0.8, 44.5 + idx * 0.8], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });

          return (
            <div
              key={idx}
              style={{
                background: 'rgba(15, 23, 42, 0.85)',
                border: '1.5px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 12,
                padding: '12px 18px',
                boxShadow: '0 15px 35px rgba(0, 0, 0, 0.8)',
                transform: `translateZ(${idx * 15}px)`,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 13, fontFamily: IndustrialTheme.fonts.mono, color: '#E2E8F0', fontWeight: 700 }}>
                  {span.name}
                </span>
                <span style={{ fontSize: 12, fontFamily: IndustrialTheme.fonts.mono, color: span.color, fontWeight: 900 }}>
                  {span.duration}
                </span>
              </div>

              {/* Span Waterfall Bar */}
              <div
                style={{
                  height: 6,
                  width: '100%',
                  backgroundColor: 'rgba(255, 255, 255, 0.06)',
                  borderRadius: 3,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    left: `${span.offset}%`,
                    width: `${span.width * spanProgress}%`,
                    height: '100%',
                    backgroundColor: span.color,
                    boxShadow: `0 0 12px ${span.color}`,
                    borderRadius: 3,
                  }}
                />
              </div>
            </div>
          );
        })}

        <div style={{ fontSize: 11, fontFamily: IndustrialTheme.fonts.mono, color: '#64748B', marginTop: 8 }}>
          Trace ID: 0x8f2a9c104e... | Full deterministic provenance logged to OpenTelemetry
        </div>
      </div>

      {/* Right 3D Massive Velocity Slam Monument */}
      <div
        style={{
          width: 560,
          transformStyle: 'preserve-3d',
          transform: `rotateX(22deg) rotateY(-18deg) translateZ(${interpolate(speedSpring, [0, 1], [0, 120])}px)`,
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
            color: '#10B981',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom: 6,
          }}
        >
          [ Deployment Velocity ]
        </div>

        <div
          style={{
            fontSize: 110,
            fontWeight: 900,
            color: '#FFFFFF',
            fontFamily: IndustrialTheme.fonts.mono,
            lineHeight: 0.9,
            letterSpacing: '-0.04em',
            textShadow: '0 20px 60px rgba(0, 0, 0, 0.9), 0 0 50px rgba(16, 185, 129, 0.4)',
          }}
        >
          {speedMultiplier.toFixed(1)}x
          <span style={{ fontSize: 40, color: '#10B981', marginLeft: 16 }}>FASTER</span>
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
          Pre-built agents and automated observability allow enterprise AI rollouts in days rather than quarters.
        </div>

        <div
          style={{
            marginTop: 24,
            padding: '10px 18px',
            borderRadius: 10,
            background: 'rgba(16, 185, 129, 0.12)',
            border: '1.5px solid #10B981',
            color: '#10B981',
            fontFamily: IndustrialTheme.fonts.mono,
            fontSize: 13,
            fontWeight: 800,
          }}
        >
          ✓ 100% Audit Trail Compliance Verified
        </div>
      </div>
    </div>
  );
};
