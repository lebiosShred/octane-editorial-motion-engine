import React from 'react';

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
    active: { bg: '#38BDF8', border: 'rgba(56, 189, 248, 0.4)', glow: 'rgba(56, 189, 248, 0.6)' },
    success: { bg: '#10B981', border: 'rgba(16, 185, 129, 0.4)', glow: 'rgba(16, 185, 129, 0.6)' },
    warning: { bg: '#F59E0B', border: 'rgba(245, 158, 11, 0.4)', glow: 'rgba(245, 158, 11, 0.6)' },
    error: { bg: '#EF4444', border: 'rgba(239, 68, 68, 0.4)', glow: 'rgba(239, 68, 68, 0.6)' },
    idle: { bg: '#475569', border: 'rgba(71, 85, 105, 0.4)', glow: 'transparent' }
  };

  const led = ledColors[statusLed];

  return (
    <div
      style={{
        position: 'relative',
        width,
        height,
        background: 'rgba(15, 23, 42, 0.88)',
        backdropFilter: 'blur(40px) saturate(180%)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderTop: '1px solid rgba(255, 255, 255, 0.22)',
        borderRadius: 24,
        boxShadow: '0 40px 100px -20px rgba(0, 0, 0, 0.95), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
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
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: led.bg,
                boxShadow: '0 0 8px ' + led.glow,
                border: '1px solid ' + led.border
              }}
            />
            {title && (
              <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.02em', color: '#F8FAFC' }}>
                {title}
              </span>
            )}
            {subtitle && (
              <span style={{ fontSize: 12, color: '#64748B', marginLeft: 4 }}>
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
                border: '1px solid ' + led.border,
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
