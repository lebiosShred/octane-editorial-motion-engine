import React from 'react';
import { IndustrialTheme } from '../../types/theme';

interface BoardNodeProps {
  x: number;
  y: number;
  width?: number | string;
  title?: string;
  badge?: string;
  badgeType?: 'crimson' | 'mint' | 'amber' | 'neutral';
  isActive?: boolean;
  opacity?: number;
  scale?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export const BoardNode: React.FC<BoardNodeProps> = ({
  x,
  y,
  width = 'auto',
  title,
  badge,
  badgeType = 'neutral',
  isActive = true,
  opacity = 1.0,
  scale = 1.0,
  children,
  style = {}
}) => {
  const badgeColors = {
    crimson: { color: IndustrialTheme.signals.crimson, bg: IndustrialTheme.signals.crimsonBg, border: IndustrialTheme.signals.crimsonBorder },
    mint: { color: IndustrialTheme.signals.mint, bg: IndustrialTheme.signals.mintBg, border: IndustrialTheme.signals.mintBorder },
    amber: { color: IndustrialTheme.signals.amber, bg: IndustrialTheme.signals.amberBg, border: IndustrialTheme.signals.amberBorder },
    neutral: { color: IndustrialTheme.text.secondary, bg: '#F1F5F9', border: '#E2E8F0' }
  };

  const currentBadge = badgeColors[badgeType];

  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${scale})`,
        width,
        background: IndustrialTheme.popout.chassisBg,
        border: IndustrialTheme.popout.chassisBorder,
        borderRadius: 20,
        boxShadow: IndustrialTheme.popout.chassisShadow,
        padding: '24px 28px',
        opacity: isActive ? opacity : opacity * 0.35,
        filter: isActive ? 'none' : 'blur(1.5px)',
        transition: 'all 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
        color: IndustrialTheme.text.hero,
        ...style
      }}
    >
      {/* Precision Corner Registration Ticks */}
      <div style={{ position: 'absolute', top: 6, left: 8, fontSize: 10, color: 'rgba(0,0,0,0.18)', fontFamily: 'monospace' }}>┌</div>
      <div style={{ position: 'absolute', top: 6, right: 8, fontSize: 10, color: 'rgba(0,0,0,0.18)', fontFamily: 'monospace' }}>┐</div>
      <div style={{ position: 'absolute', bottom: 6, left: 8, fontSize: 10, color: 'rgba(0,0,0,0.18)', fontFamily: 'monospace' }}>└</div>
      <div style={{ position: 'absolute', bottom: 6, right: 8, fontSize: 10, color: 'rgba(0,0,0,0.18)', fontFamily: 'monospace' }}>┘</div>

      {(title || badge) && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
            paddingBottom: 10,
            marginBottom: 16
          }}
        >
          {title && (
            <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '-0.02em', color: IndustrialTheme.text.hero }}>
              {title}
            </span>
          )}

          {badge && (
            <span
              style={{
                fontSize: 9,
                fontWeight: 800,
                letterSpacing: '0.08em',
                fontFamily: 'monospace',
                color: currentBadge.color,
                background: currentBadge.bg,
                border: `1px solid ${currentBadge.border}`,
                padding: '3px 8px',
                borderRadius: 5,
                textTransform: 'uppercase'
              }}
            >
              {badge}
            </span>
          )}
        </div>
      )}

      {children}
    </div>
  );
};
