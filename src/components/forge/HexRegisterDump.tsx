import React from 'react';

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
        background: '#020617',
        border: '1px solid rgba(255, 255, 255, 0.04)',
        borderRadius: 12,
        padding: '12px 16px',
        fontFamily: 'monospace',
        fontSize: 11,
        color: '#64748B',
        display: 'flex',
        flexDirection: 'column',
        gap: 6
      }}
    >
      <div style={{ fontSize: 9, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.15em', borderBottom: '1px solid rgba(255,255,255,0.04)', paddingBottom: 4 }}>
        SYSTEM REGISTER DUMP
      </div>
      {entries.map((e, idx) => (
        <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: '#38BDF8' }}>{e.address}</span>
          <span style={{ color: '#94A3B8' }}>{e.register}</span>
          <span style={{ color: '#F8FAFC' }}>{e.value}</span>
          <span style={{ color: e.status === 'ACTIVE' ? '#10B981' : e.status === 'OVERFED' ? '#F87171' : '#64748B' }}>
            [{e.status}]
          </span>
        </div>
      ))}
    </div>
  );
};
