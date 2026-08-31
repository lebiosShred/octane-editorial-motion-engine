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
  const ledColors: Record<StatusLedState, { bg: string; border: string; glow: string }> = {
    active: { bg: IndustrialTheme.signals.tungsten, border: 'rgba(255, 255, 255, 0.4)', glow: 'rgba(255, 255, 255, 0.6)' },
    success: { bg: IndustrialTheme.signals.mint, border: IndustrialTheme.signals.mintBorder, glow: IndustrialTheme.signals.mint },
    warning: { bg: IndustrialTheme.signals.amber, border: IndustrialTheme.signals.amberBorder, glow: IndustrialTheme.signals.amber },
    error: { bg: IndustrialTheme.signals.crimson, border: IndustrialTheme.signals.crimsonBorder, glow: IndustrialTheme.signals.crimson },
    idle: { bg: IndustrialTheme.text.tertiary, border: 'rgba(255,255,255,0.1)', glow: 'transparent' }
  };

  const led = ledColors[statusLed];

  return (
    <div
      style={{
        position: 'relative',
        width,
        height,
        background: IndustrialTheme.surface.chassis,
        backdropFilter: 'blur(40px) saturate(180%)',
        border: IndustrialTheme.surface.chassisBorder,
        borderTop: IndustrialTheme.surface.chassisTopBevel,
        borderRadius: 24,
        boxShadow: IndustrialTheme.surface.chassisShadow,
        padding: '28px 34px',
        overflow: 'hidden',
        ...style
      }}
    >
      {showTicks && (
        <>
          <div style={{ position: 'absolute', top: 8, left: 10, fontSize: 10, color: 'rgba(255,255,255,0.2)', fontFamily: 'monospace' }}>┌</div>
          <div style={{ position: 'absolute', top: 8, right: 10, fontSize: 10, color: 'rgba(255,255,255,0.2)', fontFamily: 'monospace' }}>┐</div>
          <div style={{ position: 'absolute', bottom: 8, left: 10, fontSize: 10, color: 'rgba(255,255,255,0.2)', fontFamily: 'monospace' }}>└</div>
          <div style={{ position: 'absolute', bottom: 8, right: 10, fontSize: 10, color: 'rgba(255,255,255,0.2)', fontFamily: 'monospace' }}>┘</div>
        </>
      )}

      {(title || statusBadge) && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
            paddingBottom: 14,
            marginBottom: 22
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              style={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                backgroundColor: led.bg,
                boxShadow: `0 0 8px ${led.glow}`,
                border: `1px solid ${led.border}`
              }}
            />
            {title && (
              <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '-0.01em', color: IndustrialTheme.text.hero }}>
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
                color: led.bg,
                background: led.border,
                border: `1px solid ${led.border}`,
                padding: '3px 10px',
                borderRadius: 8,
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
