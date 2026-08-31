import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { IndustrialTheme } from '../../types/theme';

export const CtaOutroStage: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Outro triggers at t = 28.2s
  const outroFrame = Math.max(0, frame - Math.round(28.2 * fps));

  const cardScale = spring({
    frame: outroFrame,
    fps,
    config: { damping: 14, stiffness: 120 }
  });

  const cardOpacity = interpolate(outroFrame, [0, 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });

  const buttonGlow = (Math.sin(frame * 0.1) + 1) / 2;

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
          width: 760,
          background: IndustrialTheme.popout.chassisBg,
          border: IndustrialTheme.popout.chassisBorder,
          borderRadius: 24,
          boxShadow: '0 60px 140px -20px rgba(0, 0, 0, 0.95), 0 25px 60px -10px rgba(0, 0, 0, 0.7)',
          padding: '38px 46px',
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
        {/* Precision Corner Registration Ticks */}
        <div style={{ position: 'absolute', top: 8, left: 10, fontSize: 12, color: 'rgba(0,0,0,0.18)', fontFamily: 'monospace' }}>┌</div>
        <div style={{ position: 'absolute', top: 8, right: 10, fontSize: 12, color: 'rgba(0,0,0,0.18)', fontFamily: 'monospace' }}>┐</div>
        <div style={{ position: 'absolute', bottom: 8, left: 10, fontSize: 12, color: 'rgba(0,0,0,0.18)', fontFamily: 'monospace' }}>└</div>
        <div style={{ position: 'absolute', bottom: 8, right: 10, fontSize: 12, color: 'rgba(0,0,0,0.18)', fontFamily: 'monospace' }}>┘</div>

        {/* Top Status Pill */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
          <span
            style={{
              fontSize: 10,
              fontWeight: 800,
              letterSpacing: '0.1em',
              fontFamily: 'monospace',
              color: IndustrialTheme.signals.mint,
              background: IndustrialTheme.signals.mintBg,
              border: `1px solid ${IndustrialTheme.signals.mintBorder}`,
              padding: '4px 12px',
              borderRadius: 6,
              textTransform: 'uppercase'
            }}
          >
            OCTANE DIAGNOSTIC PROTOCOL
          </span>
        </div>

        {/* Main Headline */}
        <div
          style={{
            fontSize: 32,
            fontWeight: 900,
            color: IndustrialTheme.text.hero,
            letterSpacing: '-0.03em',
            lineHeight: 1.2,
            marginBottom: 14
          }}
        >
          Pinpoint Overfed Cubes in 10 Minutes.
        </div>

        {/* Value Proposition Description */}
        <div
          style={{
            fontSize: 14,
            color: IndustrialTheme.text.secondary,
            lineHeight: 1.6,
            maxWidth: 580,
            marginBottom: 28,
            fontWeight: 500
          }}
        >
          Run the diagnostic playbook to eliminate exponential zero-cell traversal, collapse RAM bloat, and restore sub-second consolidation speed.
        </div>

        {/* Hero Action CTA Button */}
        <div
          style={{
            background: '#0F172A',
            color: '#FFFFFF',
            fontSize: 15,
            fontWeight: 800,
            letterSpacing: '0.04em',
            padding: '16px 42px',
            borderRadius: 12,
            boxShadow: `0 12px 32px rgba(15, 23, 42, ${0.35 + buttonGlow * 0.15})`,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          <span>octanesolutions.com.au/playbook</span>
          <span style={{ color: IndustrialTheme.signals.mint, fontSize: 16 }}>→</span>
        </div>
      </div>
    </div>
  );
};
