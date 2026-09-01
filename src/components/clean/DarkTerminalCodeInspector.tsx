import React from 'react';
import { useCurrentFrame, spring, useVideoConfig, interpolate } from 'remotion';
import { OPTICAL_MATERIALS, SpecularTopRim } from '../../utils/OpticalMateriality';

interface DarkTerminalCodeInspectorProps {
  breakFrame?: number;
}

export const DarkTerminalCodeInspector: React.FC<DarkTerminalCodeInspectorProps> = ({
  breakFrame = 90,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const enterSpring = spring({
    frame,
    fps,
    config: { mass: 0.8, damping: 14, stiffness: 120 },
  });
  const enterScale = interpolate(enterSpring, [0, 1], [0.8, 1.0]);
  const enterOpacity = interpolate(enterSpring, [0, 1], [0, 1]);

  // Disconnect / Failure physics
  const isFailed = frame >= breakFrame;
  const failureSpring = spring({
    frame: Math.max(0, frame - breakFrame),
    fps,
    config: { mass: 0.5, damping: 10, stiffness: 180 },
  });

  const failureY = interpolate(failureSpring, [0, 1], [0, 8]);
  const shakeFrame = Math.max(0, frame - breakFrame);
  const failureShake =
    shakeFrame > 0 && shakeFrame < 18
      ? Math.sin(shakeFrame * 3) * (18 - shakeFrame) * 0.9
      : 0;

  // Banner pop spring
  const bannerSpring = spring({
    frame: Math.max(0, frame - (breakFrame + 5)),
    fps,
    config: { mass: 0.6, damping: 12, stiffness: 140 },
  });
  const bannerScale = interpolate(bannerSpring, [0, 1], [0.75, 1.0]);
  const bannerOpacity = interpolate(bannerSpring, [0, 1], [0, 1]);

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
      {/* 3D Master Terminal Stage */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          transformStyle: 'preserve-3d',
          transform: `scale(${enterScale}) translateY(${failureY + failureShake}px) rotateX(12deg)`,
          opacity: enterOpacity,
          position: 'relative',
          width: 840,
        }}
      >
        {/* HERO DARK-MODE CODE TERMINAL WINDOW */}
        <div
          style={{
            width: '100%',
            ...OPTICAL_MATERIALS.TITANIUM_PANEL,
            border: isFailed
              ? '1px solid rgba(239, 68, 68, 0.6)'
              : '1px solid rgba(255, 255, 255, 0.18)',
            boxShadow: isFailed
              ? '0 35px 80px -15px rgba(0, 0, 0, 0.95), 0 0 60px rgba(239, 68, 68, 0.3)'
              : '0 35px 80px -15px rgba(0, 0, 0, 0.95), 0 0 50px rgba(77, 174, 235, 0.15)',
            position: 'relative',
            overflow: 'hidden',
            transition: 'border 0.2s, box-shadow 0.2s',
          }}
        >
          <SpecularTopRim />

          {/* Terminal Window Header Bar */}
          <div
            style={{
              padding: '16px 24px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'rgba(255, 255, 255, 0.02)',
            }}
          >
            {/* Traffic Light Buttons */}
            <div style={{ display: 'flex', gap: 10 }}>
              <div
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: '50%',
                  backgroundColor: '#EF4444',
                  boxShadow: '0 0 8px rgba(239, 68, 68, 0.6)',
                }}
              />
              <div
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: '50%',
                  backgroundColor: '#F59E0B',
                  boxShadow: '0 0 8px rgba(245, 158, 11, 0.5)',
                }}
              />
              <div
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: '50%',
                  backgroundColor: '#10B981',
                  boxShadow: '0 0 8px rgba(16, 185, 129, 0.5)',
                }}
              />
            </div>

            {/* HTTP Method + Endpoint Route */}
            <div
              style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: 16,
                fontWeight: 700,
                color: '#94A3B8',
                letterSpacing: '0.04em',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <span style={{ color: isFailed ? '#EF4444' : '#60A5FA' }}>POST</span>
              <span>/api/v1/auth/gateway/token</span>
            </div>

            {/* Protocol Tag */}
            <div
              style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: 13,
                color: '#64748B',
                background: 'rgba(255, 255, 255, 0.04)',
                padding: '4px 10px',
                borderRadius: 6,
              }}
            >
              TLS 1.3
            </div>
          </div>

          {/* Terminal Code Body */}
          <div
            style={{
              padding: '24px 32px',
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: 18,
              lineHeight: 1.6,
              color: '#E2E8F0',
            }}
          >
            <div style={{ color: '#64748B' }}>// Request Payload (JSON Auth Handshake)</div>
            <div>
              <span style={{ color: '#93C5FD' }}>{'{'}</span>
            </div>
            <div style={{ paddingLeft: 24 }}>
              <span style={{ color: '#60A5FA' }}>"client_id"</span>
              <span style={{ color: '#94A3B8' }}>: </span>
              <span style={{ color: '#34D399' }}>"ibm_watsonx_orchestrate"</span>
              <span style={{ color: '#94A3B8' }}>,</span>
            </div>
            <div style={{ paddingLeft: 24 }}>
              <span style={{ color: '#60A5FA' }}>"target_cluster"</span>
              <span style={{ color: '#94A3B8' }}>: </span>
              <span style={{ color: '#34D399' }}>"sap_hana_enterprise_v2"</span>
              <span style={{ color: '#94A3B8' }}>,</span>
            </div>
            <div style={{ paddingLeft: 24 }}>
              <span style={{ color: '#60A5FA' }}>"status"</span>
              <span style={{ color: '#94A3B8' }}>: </span>
              {isFailed ? (
                <span
                  style={{
                    color: '#EF4444',
                    fontWeight: 800,
                    textShadow: '0 0 10px rgba(239, 68, 68, 0.6)',
                  }}
                >
                  "AUTH_FAILED: TOKEN_EXPIRED"
                </span>
              ) : (
                <span style={{ color: '#10B981' }}>"CONNECTING..."</span>
              )}
            </div>
            <div>
              <span style={{ color: '#93C5FD' }}>{'}'}</span>
            </div>
          </div>
        </div>

        {/* BOTTOM REALISTIC ERROR TELEMETRY BANNER (90px Vertical Breathing Room) */}
        {isFailed && (
          <div
            style={{
              marginTop: 90,
              ...OPTICAL_MATERIALS.CRIMSON_OBSIDIAN,
              padding: '16px 36px',
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              transform: `scale(${bannerScale})`,
              opacity: bannerOpacity,
              whiteSpace: 'nowrap',
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                backgroundColor: '#EF4444',
                boxShadow: '0 0 12px #EF4444',
              }}
            />
            <div
              style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: 22,
                fontWeight: 900,
                color: '#EF4444',
                letterSpacing: '0.06em',
              }}
            >
              [ HTTP 401 UNAUTHORIZED: PIPELINE_DISCONNECTED ]
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
