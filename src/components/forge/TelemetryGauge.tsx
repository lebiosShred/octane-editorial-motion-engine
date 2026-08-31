import React from 'react';

interface TelemetryGaugeProps {
  label: string;
  value: number | string;
  ratioUnit?: string;
  percentage?: number;
  statusText?: string;
  statusLevel?: 'target' | 'caution' | 'critical';
}

export const TelemetryGauge: React.FC<TelemetryGaugeProps> = ({
  label,
  value,
  ratioUnit = ':1',
  percentage = 85,
  statusText = 'Critical (>250:1)',
  statusLevel = 'critical'
}) => {
  const statusColors = {
    target: '#10B981',
    caution: '#F59E0B',
    critical: '#EF4444'
  };

  const currentColor = statusColors[statusLevel];

  return (
    <div
      style={{
        background: 'rgba(2, 6, 23, 0.8)',
        border: '1px solid rgba(255, 255, 255, 0.06)',
        borderRadius: 16,
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        gap: 12
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 11, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600 }}>
          {label}
        </span>
        <span style={{ fontSize: 24, fontWeight: 800, color: currentColor, fontFamily: 'monospace', fontVariantNumeric: 'tabular-nums' }}>
          {value}{ratioUnit}
        </span>
      </div>

      <div style={{ position: 'relative', width: '100%', height: 8, backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 4, overflow: 'hidden', display: 'flex' }}>
        <div style={{ width: '15%', backgroundColor: '#10B981' }} />
        <div style={{ width: '25%', backgroundColor: '#F59E0B' }} />
        <div style={{ width: '60%', backgroundColor: '#EF4444' }} />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'monospace' }}>
        <span>Target (&lt;5:1)</span>
        <span>Caution</span>
        <span style={{ color: currentColor, fontWeight: 700 }}>{statusText}</span>
      </div>
    </div>
  );
};
