import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { IndustrialTheme } from '../../types/theme';

interface Scene3Props {
  currentTime: number;
}

export const Scene3_GovernanceGate3D: React.FC<Scene3Props> = ({ currentTime }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Word triggers:
  // "delay detected in SAP" (~28.0s -> frame 1680)
  // "draft a ticket in ServiceNow" (~32.0s -> frame 1920)
  // "1-click manager approval" (~36.0s -> frame 2160)
  const isApproved = currentTime >= 36.0;
  const switchSpring = spring({
    frame: Math.max(0, frame - Math.round(36.0 * fps)),
    fps,
    config: { mass: 0.5, damping: 12, stiffness: 140 },
  });

  const packetProgress = interpolate(currentTime, [28.0, 35.5, 36.5, 42.0], [0, 50, 50, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const switchKnobX = interpolate(switchSpring, [0, 1], [0, 120]);

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
      {/* Left 3D Perspective Multi-Agent Pipeline */}
      <div
        style={{
          width: 760,
          transformStyle: 'preserve-3d',
          transform: 'rotateX(26deg) rotateY(-16deg) translateZ(40px)',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
        }}
      >
        {/* Step 1: SAP ERP Event Node */}
        <div
          style={{
            background: 'rgba(15, 23, 42, 0.9)',
            border: '2px solid rgba(77, 174, 235, 0.4)',
            borderRadius: 16,
            padding: '16px 22px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.8)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            transform: 'translateZ(30px)',
          }}
        >
          <div>
            <div style={{ fontSize: 11, fontWeight: 900, color: '#4daeeb', fontFamily: IndustrialTheme.fonts.mono }}>
              [ STEP 1: TRIGGER EVENT ]
            </div>
            <div style={{ fontSize: 16, fontWeight: 800, color: '#FFFFFF', marginTop: 4 }}>
              SAP S/4HANA PO_10928 Delay Detected
            </div>
          </div>
          <div
            style={{
              padding: '4px 10px',
              borderRadius: 6,
              background: 'rgba(244, 63, 94, 0.15)',
              border: '1.5px solid #F43F5E',
              color: '#F43F5E',
              fontFamily: IndustrialTheme.fonts.mono,
              fontSize: 11,
              fontWeight: 900,
            }}
          >
            &gt; 14 DAYS DELAY
          </div>
        </div>

        {/* 3D Vertical Laser Conduit between Step 1 and Step 2 */}
        <div style={{ height: 28, width: 4, backgroundColor: '#4daeeb', marginLeft: 40, boxShadow: '0 0 12px #4daeeb' }} />

        {/* Step 2: watsonx Autonomous Reasoning Node */}
        <div
          style={{
            background: 'rgba(15, 23, 42, 0.9)',
            border: '2px solid #4daeeb',
            borderRadius: 16,
            padding: '16px 22px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.8), 0 0 30px rgba(77, 174, 235, 0.3)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            transform: 'translateZ(60px)',
          }}
        >
          <div>
            <div style={{ fontSize: 11, fontWeight: 900, color: '#4daeeb', fontFamily: IndustrialTheme.fonts.mono }}>
              [ STEP 2: AUTONOMOUS ORCHESTRATION ]
            </div>
            <div style={{ fontSize: 16, fontWeight: 800, color: '#FFFFFF', marginTop: 4 }}>
              watsonx Agent drafts priority ServiceNow ticket
            </div>
          </div>
          <div
            style={{
              padding: '4px 10px',
              borderRadius: 6,
              background: 'rgba(77, 174, 235, 0.15)',
              border: '1.5px solid #4daeeb',
              color: '#4daeeb',
              fontFamily: IndustrialTheme.fonts.mono,
              fontSize: 11,
              fontWeight: 900,
            }}
          >
            DRAFT GENERATED
          </div>
        </div>

        {/* 3D Vertical Laser Conduit between Step 2 and Step 3 */}
        <div
          style={{
            height: 28,
            width: 4,
            backgroundColor: isApproved ? '#10B981' : '#F43F5E',
            marginLeft: 40,
            boxShadow: `0 0 12px ${isApproved ? '#10B981' : '#F43F5E'}`,
            transition: 'background 0.3s ease',
          }}
        />

        {/* Step 3: ServiceNow Destination Node */}
        <div
          style={{
            background: 'rgba(15, 23, 42, 0.9)',
            border: `2px solid ${isApproved ? '#10B981' : 'rgba(255, 255, 255, 0.15)'}`,
            borderRadius: 16,
            padding: '16px 22px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.8)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            transform: 'translateZ(30px)',
          }}
        >
          <div>
            <div style={{ fontSize: 11, fontWeight: 900, color: isApproved ? '#10B981' : '#94A3B8', fontFamily: IndustrialTheme.fonts.mono }}>
              [ STEP 3: DESTINATION SYSTEM ]
            </div>
            <div style={{ fontSize: 16, fontWeight: 800, color: '#FFFFFF', marginTop: 4 }}>
              ServiceNow Ticket Created (P1 Escalation)
            </div>
          </div>
          <div
            style={{
              padding: '4px 10px',
              borderRadius: 6,
              background: isApproved ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 255, 255, 0.08)',
              border: `1.5px solid ${isApproved ? '#10B981' : '#64748B'}`,
              color: isApproved ? '#10B981' : '#94A3B8',
              fontFamily: IndustrialTheme.fonts.mono,
              fontSize: 11,
              fontWeight: 900,
            }}
          >
            {isApproved ? 'TICKET #INC-8921 COMMITTED' : 'AWAITING SIGN-OFF'}
          </div>
        </div>
      </div>

      {/* Right 3D Tactile Physical Governance Switch */}
      <div
        style={{
          width: 540,
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
            color: '#10B981',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom: 6,
          }}
        >
          [ Governance Guardrail ]
        </div>

        <div
          style={{
            fontSize: 48,
            fontWeight: 900,
            color: '#FFFFFF',
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
          }}
        >
          1-Click Manager Approval Gate
        </div>

        <div
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: '#94A3B8',
            marginTop: 12,
            lineHeight: 1.4,
          }}
        >
          watsonx.governance blocks rogue actions. Zero automated database changes without explicit human signoff.
        </div>

        {/* Physical 3D Toggle Switch Housing */}
        <div
          style={{
            marginTop: 28,
            width: 240,
            height: 64,
            backgroundColor: '#0F172A',
            borderRadius: 32,
            border: `2px solid ${isApproved ? '#10B981' : '#F43F5E'}`,
            boxShadow: `0 10px 30px rgba(0, 0, 0, 0.8), 0 0 30px ${isApproved ? 'rgba(16, 185, 129, 0.4)' : 'rgba(244, 63, 94, 0.3)'}`,
            position: 'relative',
            padding: 4,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {/* Sliding Knob */}
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 28,
              backgroundColor: isApproved ? '#10B981' : '#F43F5E',
              boxShadow: `0 0 20px ${isApproved ? '#10B981' : '#F43F5E'}`,
              transform: `translate3d(${switchKnobX}px, 0, 0)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#090A0C',
              fontWeight: 900,
              fontSize: 18,
            }}
          >
            {isApproved ? '✓' : '✕'}
          </div>

          <div
            style={{
              position: 'absolute',
              right: isApproved ? 'auto' : 24,
              left: isApproved ? 24 : 'auto',
              fontFamily: IndustrialTheme.fonts.mono,
              fontSize: 13,
              fontWeight: 900,
              color: isApproved ? '#10B981' : '#F43F5E',
              letterSpacing: '0.1em',
            }}
          >
            {isApproved ? 'AUTHORIZED' : 'LOCKED'}
          </div>
        </div>
      </div>
    </div>
  );
};
