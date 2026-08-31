import React from 'react';
import { spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { IndustrialTheme } from '../../types/theme';

interface DimensionTopologyTreeProps {
  skuCount?: string;
  storeCount?: string;
  periodCount?: string;
}

export const DimensionTopologyTree: React.FC<DimensionTopologyTreeProps> = ({
  skuCount = '15,000 SKUs',
  storeCount = '200 Stores',
  periodCount = '36 Periods'
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentTime = frame / fps;

  // Staged Focus Timeline
  const p1 = currentTime >= 8.5;
  const p2 = currentTime >= 9.6;
  const p3 = currentTime >= 10.7;
  const p4 = currentTime >= 11.5;

  const multSpring = spring({
    frame: frame - Math.round(11.5 * fps),
    fps,
    config: { damping: 12, stiffness: 150 }
  });

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
        padding: '18px 22px',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        fontFamily: IndustrialTheme.fonts.sans,
        ...IndustrialTheme.typography.antialiased
      }}
    >
      {/* Step Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(0,0,0,0.06)', paddingBottom: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <span style={{ fontSize: 12, fontWeight: 900, background: '#0F172A', color: '#FFFFFF', padding: '4px 9px', borderRadius: 5, fontFamily: IndustrialTheme.fonts.mono }}>
            STEP 01
          </span>
          <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: IndustrialTheme.text.secondary }}>
            Dimensional Multiplier
          </span>
        </div>
        <span style={{ fontSize: 12, fontFamily: IndustrialTheme.fonts.mono, fontWeight: 700, color: '#4daeeb', background: 'rgba(77, 174, 235, 0.12)', border: '1px solid rgba(77, 174, 235, 0.35)', padding: '4px 10px', borderRadius: 6 }}>
          UNFILTERED
        </span>
      </div>

      {/* Rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
        {nodes.map((node, idx) => {
          const isFocused = (idx === 0 && p1 && !p2) || (idx === 1 && p2 && !p3) || (idx === 2 && p3 && !p4) || p4;
          const rowOpacity = isFocused ? 1.0 : 0.48;
          const rowScale = isFocused && !p4 ? 1.015 : 1.0;

          return (
            <div
              key={idx}
              style={{
                background: '#FFFFFF',
                border: isFocused ? '1.5px solid rgba(77, 174, 235, 0.5)' : '1px solid rgba(0,0,0,0.06)',
                borderRadius: 10,
                padding: '11px 16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                boxShadow: isFocused ? '0 4px 16px rgba(77, 174, 235, 0.15)' : '0 1px 3px rgba(0,0,0,0.02)',
                opacity: rowOpacity,
                transform: `scale(${rowScale})`,
                transition: 'all 0.2s ease-out'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: isFocused ? '#4daeeb' : '#94A3B8'
                  }}
                />
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: IndustrialTheme.text.hero, fontFamily: IndustrialTheme.fonts.mono }}>
                    {node.name}
                  </div>
                  <div style={{ fontSize: 12, color: IndustrialTheme.text.tertiary }}>
                    {node.level}
                  </div>
                </div>
              </div>
              <span style={{ fontSize: 16, fontWeight: 800, color: isFocused ? '#4daeeb' : IndustrialTheme.text.primary, fontFamily: IndustrialTheme.fonts.mono }}>
                {node.count}
              </span>
            </div>
          );
        })}
      </div>

      {/* Cartesian Explosion Result Bar */}
      <div
        style={{
          background: p4 ? 'rgba(77, 174, 235, 0.12)' : 'rgba(0,0,0,0.02)',
          border: p4 ? '1.5px solid rgba(77, 174, 235, 0.45)' : '1px dashed rgba(0,0,0,0.1)',
          borderRadius: 10,
          padding: '11px 16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          opacity: p4 ? 1.0 : 0.35,
          transform: `scale(${p4 ? Math.max(0, multSpring) : 1})`,
          boxShadow: p4 ? '0 6px 20px rgba(77, 174, 235, 0.2)' : 'none'
        }}
      >
        <span style={{ fontSize: 13, fontWeight: 700, color: '#4daeeb', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          Cartesian Explosion:
        </span>
        <span style={{ fontSize: 16, fontWeight: 900, fontFamily: IndustrialTheme.fonts.mono, color: '#4daeeb' }}>
          15k &times; 200 &times; 36 = 108M Cells
        </span>
      </div>
    </div>
  );
};
