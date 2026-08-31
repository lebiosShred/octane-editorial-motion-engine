import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { IndustrialTheme } from '../../types/theme';

export const CtaOutroStage: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Outro triggers at t = 28.0s (aligned with new 31.88s audio)
  const outroFrame = Math.max(0, frame - Math.round(28.0 * fps));

  const cardScale = spring({
    frame: outroFrame,
    fps,
    config: { damping: 14, stiffness: 120 }
  });

  const cardOpacity = interpolate(outroFrame, [0, 12], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });

  const buttonGlow = (Math.sin(frame * 0.15) + 1) / 2;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        pointerEvents: 'none',
        zIndex: 50
      }}
    >
      <div
        style={{
          width: 780,
          background: '#FFFFFF',
          borderRadius: 24,
          boxShadow: '0 60px 140px -20px rgba(0, 0, 0, 0.95), 0 0 50px rgba(77, 174, 235, 0.25)',
          padding: '42px 50px',
          transform: `scale(${cardScale})`,
          opacity: cardOpacity,
          color: IndustrialTheme.text.hero,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center'
        }}
      >
        {/* Top Status Pill */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
          <span
            style={{
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: '0.12em',
              fontFamily: IndustrialTheme.fonts.mono,
              color: '#4daeeb',
              background: 'rgba(77, 174, 235, 0.12)',
              border: '1px solid rgba(77, 174, 235, 0.35)',
              padding: '5px 14px',
              borderRadius: 6,
              textTransform: 'uppercase'
            }}
          >
            OCTANE TECHNICAL ARTICLE
          </span>
        </div>

        {/* Main Headline */}
        <div
          style={{
            fontSize: 34,
            fontWeight: 900,
            color: '#090A0C',
            letterSpacing: '-0.03em',
            lineHeight: 1.25,
            marginBottom: 16
          }}
        >
          Read the Complete Feeder Playbook.
        </div>

        {/* Value Proposition Description */}
        <div
          style={{
            fontSize: 16,
            color: IndustrialTheme.text.secondary,
            lineHeight: 1.6,
            maxWidth: 620,
            marginBottom: 32,
            fontWeight: 500
          }}
        >
          Master conditional feeder architecture, eliminate empty-cell traversal, and restore sub-second consolidation speeds.
        </div>

        {/* Hero Action CTA Button with upward pointer arrow */}
        <div
          style={{
            background: '#090A0C',
            color: '#FFFFFF',
            fontSize: 17,
            fontWeight: 800,
            letterSpacing: '0.02em',
            padding: '18px 46px',
            borderRadius: 14,
            boxShadow: `0 14px 36px rgba(77, 174, 235, ${0.3 + buttonGlow * 0.25})`,
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            border: '1.5px solid #4daeeb'
          }}
        >
          <span>Click the link above to read the whole blog</span>
          <span style={{ color: '#4daeeb', fontSize: 20, fontWeight: 900 }}>↑</span>
        </div>
      </div>
    </div>
  );
};
