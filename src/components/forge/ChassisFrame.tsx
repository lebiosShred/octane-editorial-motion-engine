import React from 'react';
import { IndustrialTheme } from '../../types/theme';

export type StatusLedState = 'active' | 'warning' | 'error' | 'success' | 'idle';

interface ChassisFrameProps {
  title?: string;
  subtitle?: string;
  statusBadge?: string;
  statusLed?: StatusLedState;
  width?: number | string;
  height?: number | string;
  children: React.ReactNode;
  style?: React.CSSProperties;
  showTicks?: boolean;
}

export const ChassisFrame: React.FC<ChassisFrameProps> = ({
  title,
  subtitle,
  statusBadge,
  statusLed = 'active',
  width = '100%',
  height = 'auto',
  children,
  style = {},
  showTicks = true
}) => {
  const badgeStyles: Record<StatusLedState, { color: string; bg: string; border: string; led: string }> = {
    active: { color: IndustrialTheme.text.hero, bg: '#F1F5F9', border: '#E2E8F0', led: '#0F172A' },
    success: { color: IndustrialTheme.signals.mint, bg: IndustrialTheme.signals.mintBg, border: IndustrialTheme.signals.mintBorder, led: IndustrialTheme.signals.mint },
    warning: { color: IndustrialTheme.signals.amber, bg: IndustrialTheme.signals.amberBg, border: IndustrialTheme.signals.amberBorder, led: IndustrialTheme.signals.amber },
    error: { color: IndustrialTheme.signals.crimson, bg: IndustrialTheme.signals.crimsonBg, border: IndustrialTheme.signals.crimsonBorder, led: IndustrialTheme.signals.crimson },
    idle: { color: IndustrialTheme.text.tertiary, bg: '#F8FAFC', border: '#E2E8F0', led: IndustrialTheme.text.tertiary }
  };

  const badge = badgeStyles[statusLed];

  return (
    <div
      style={{
        position: 'relative',
        width,
        height,
        background: IndustrialTheme.popout.chassisBg,
        border: IndustrialTheme.popout.chassisBorder,
        borderRadius: 24,
        boxShadow: IndustrialTheme.popout.chassisShadow,
        padding: '30px 36px',
        overflow: 'hidden',
        color: IndustrialTheme.text.hero,
        ...style
      }}
    >
      {/* Precision Corner Registration Tick Marks */}
      {showTicks && (
        <>
          <div style={{ position: 'absolute', top: 8, left: 10, fontSize: 10, color: 'rgba(0,0,0,0.18)', fontFamily: 'monospace' }}>┌</div>
          <div style={{ position: 'absolute', top: 8, right: 10, fontSize: 10, color: 'rgba(0,0,0,0.18)', fontFamily: 'monospace' }}>┐</div>
          <div style={{ position: 'absolute', bottom: 8, left: 10, fontSize: 10, color: 'rgba(0,0,0,0.18)', fontFamily: 'monospace' }}>└</div>
          <div style={{ position: 'absolute', bottom: 8, right: 10, fontSize: 10, color: 'rgba(0,0,0,0.18)', fontFamily: 'monospace' }}>┘</div>
        </>
      )}

      {/* Pristine Header */}
      {(title || statusBadge) && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
            paddingBottom: 14,
            marginBottom: 24
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {/* Status LED */}
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: badge.led,
                boxShadow: `0 0 6px ${badge.led}66`
              }}
            />
            {title && (
              <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: '-0.02em', color: IndustrialTheme.text.hero }}>
                {title}
              </span>
            )}
            {subtitle && (
              <span style={{ fontSize: 12, color: IndustrialTheme.text.secondary, marginLeft: 4 }}>
                &bull; {subtitle}
              </span>
            )}
          </div>

          {statusBadge && (
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: '0.08em',
                fontFamily: 'monospace',
                color: badge.color,
                background: badge.bg,
                border: `1px solid ${badge.border}`,
                padding: '4px 10px',
                borderRadius: 6,
                textTransform: 'uppercase'
              }}
            >
              {statusBadge}
            </span>
          )}
        </div>
      )}

      {children}
    </div>
  );
};
