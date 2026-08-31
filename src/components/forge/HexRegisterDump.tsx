import React from 'react';
import { IndustrialTheme } from '../../types/theme';

interface HexRegisterDumpProps {
  entries?: { address: string; register: string; value: string; status?: string }[];
}

export const HexRegisterDump: React.FC<HexRegisterDumpProps> = ({
  entries = [
    { address: '0x7FFF4E20', register: 'REG_FEEDER_LOCK', value: '0x00000001', status: 'ACTIVE' },
    { address: '0x7FFF4E28', register: 'REG_ZERO_TRAVERSE', value: '0x0671B6A0', status: 'OVERFED' },
    { address: '0x7FFF4E30', register: 'REG_MEM_BLAT_GB', value: '0x00000030', status: '48.0 GB' }
  ]
}) => {
  return (
    <div
      style={{
        background: IndustrialTheme.surface.recessedWell,
        border: IndustrialTheme.surface.recessedBorder,
        borderRadius: 12,
        padding: '12px 16px',
        fontFamily: 'monospace',
        fontSize: 11,
        color: IndustrialTheme.text.secondary,
        display: 'flex',
        flexDirection: 'column',
        gap: 6
      }}
    >
      <div style={{ fontSize: 9, color: IndustrialTheme.text.tertiary, textTransform: 'uppercase', letterSpacing: '0.15em', borderBottom: '1px solid rgba(255,255,255,0.04)', paddingBottom: 4 }}>
        SYSTEM REGISTER DUMP
      </div>
      {entries.map((e, idx) => (
        <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: IndustrialTheme.text.primary }}>{e.address}</span>
          <span style={{ color: IndustrialTheme.text.secondary }}>{e.register}</span>
          <span style={{ color: IndustrialTheme.text.hero }}>{e.value}</span>
          <span style={{ color: e.status === 'ACTIVE' ? IndustrialTheme.signals.mint : e.status === 'OVERFED' ? IndustrialTheme.signals.crimson : IndustrialTheme.text.tertiary }}>
            [{e.status}]
          </span>
        </div>
      ))}
    </div>
  );
};
