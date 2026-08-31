import React from 'react';
import { IndustrialTheme } from '../../types/theme';

interface DimensionTopologyTreeProps {
  skuCount?: string;
  storeCount?: string;
  periodCount?: string;
  isOverfed?: boolean;
}

export const DimensionTopologyTree: React.FC<DimensionTopologyTreeProps> = ({
  skuCount = '15,000 SKUs',
  storeCount = '200 Stores',
  periodCount = '36 Periods',
  isOverfed = true
}) => {
  const nodes = [
    { name: 'Dim_Product', count: skuCount, level: 'Leaf Consolidation' },
    { name: 'Dim_Store', count: storeCount, level: 'Regional Rollup' },
    { name: 'Dim_Time', count: periodCount, level: 'Monthly Slice' }
  ];

  return (
    <div
      style={{
        background: IndustrialTheme.popout.recessedWell,
        border: IndustrialTheme.popout.recessedBorder,
        borderRadius: 18,
        padding: 22,
        display: 'flex',
        flexDirection: 'column',
        gap: 14
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(0,0,0,0.06)', paddingBottom: 10 }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: IndustrialTheme.text.secondary }}>
          Cube Topology Inspector
        </span>
        <span style={{ fontSize: 10, fontFamily: 'monospace', fontWeight: 700, color: IndustrialTheme.signals.crimson, background: IndustrialTheme.signals.crimsonBg, border: `1px solid ${IndustrialTheme.signals.crimsonBorder}`, padding: '3px 8px', borderRadius: 6 }}>
          UNFILTERED CONSOLIDATION
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, position: 'relative' }}>
        {nodes.map((node, idx) => (
          <div
            key={idx}
            style={{
              background: '#FFFFFF',
              border: '1px solid rgba(0,0,0,0.08)',
              borderRadius: 10,
              padding: '10px 14px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: IndustrialTheme.signals.crimson }} />
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: IndustrialTheme.text.hero, fontFamily: 'monospace' }}>
                  {node.name}
                </div>
                <div style={{ fontSize: 10, color: IndustrialTheme.text.tertiary }}>
                  {node.level}
                </div>
              </div>
            </div>
            <span style={{ fontSize: 12, fontWeight: 800, color: IndustrialTheme.signals.crimson, fontFamily: 'monospace' }}>
              {node.count}
            </span>
          </div>
        ))}
      </div>

      <div
        style={{
          background: IndustrialTheme.signals.crimsonBg,
          border: `1px solid ${IndustrialTheme.signals.crimsonBorder}`,
          borderRadius: 10,
          padding: '10px 14px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <span style={{ fontSize: 11, fontWeight: 600, color: IndustrialTheme.signals.crimson }}>
          Dimensional Multiplier:
        </span>
        <span style={{ fontSize: 12, fontWeight: 900, fontFamily: 'monospace', color: IndustrialTheme.signals.crimson }}>
          15k &times; 200 &times; 36 = 108M
        </span>
      </div>
    </div>
  );
};
