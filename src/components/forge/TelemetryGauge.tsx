import React from 'react';
import { IndustrialTheme } from '../../types/theme';

interface TelemetryGaugeProps {
  label: string;
  value: number | string;
  ratioUnit?: string;
  statusText?: string;
  statusLevel?: 'target' | 'caution' | 'critical';
}

export const TelemetryGauge: React.FC<TelemetryGaugeProps> = ({
  label,
  value,
  ratioUnit = ':1',
  statusText = 'Critical (>250:1)',
  statusLevel = 'critical'
}) => {
  const statusColors = {
    target: IndustrialTheme.signals.mint,
    caution: IndustrialTheme.signals.amber,
    critical: IndustrialTheme.signals.crimson
  };

  const currentColor = statusColors[statusLevel];

  return (
    <div
      style={{
        background: IndustrialTheme.surface.recessedWell,
        border: IndustrialTheme.surface.recessedBorder,
        borderRadius: 16,
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        gap: 12
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 11, color: IndustrialTheme.text.secondary, textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600 }}>
          {label}
        </span>
        <span style={{ fontSize: 24, fontWeight: 800, color: currentColor, fontFamily: 'monospace', fontVariantNumeric: 'tabular-nums' }}>
          {value}{ratioUnit}
        </span>
      </div>

      <div style={{ position: 'relative', width: '100%', height: 6, backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 3, overflow: 'hidden', display: 'flex' }}>
        <div style={{ width: '15%', backgroundColor: IndustrialTheme.signals.mint }} />
        <div style={{ width: '25%', backgroundColor: IndustrialTheme.signals.amber }} />
        <div style={{ width: '60%', backgroundColor: IndustrialTheme.signals.crimson }} />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: IndustrialTheme.text.tertiary, textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'monospace' }}>
        <span>Target (&lt;5:1)</span>
        <span>Caution</span>
        <span style={{ color: currentColor, fontWeight: 700 }}>{statusText}</span>
      </div>
    </div>
  );
};
