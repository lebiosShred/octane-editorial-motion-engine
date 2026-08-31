import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
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
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentTime = frame / fps;

  // Staged Focus Timeline (Cluster 2 active t = 10.0s - 19.5s)
  // Step 1 (Dim_Product): t = 10.0s
  // Step 2 (Dim_Store): t = 11.2s
  // Step 3 (Dim_Time): t = 12.4s
  // Step 4 (Multiplier 108M): t = 13.6s
  const p1 = currentTime >= 10.0;
  const p2 = currentTime >= 11.2;
  const p3 = currentTime >= 12.4;
  const p4 = currentTime >= 13.6;

  const multSpring = spring({
    frame: frame - Math.round(13.6 * fps),
    fps,
    config: { damping: 12, stiffness: 150 }
  });

  const nodes = [
    { name: 'Dim_Product', count: skuCount, level: 'Leaf Consolidation', active: p1 && (!p2 || p4), done: p2 },
    { name: 'Dim_Store', count: storeCount, level: 'Regional Rollup', active: p2 && (!p3 || p4), done: p3 },
    { name: 'Dim_Time', count: periodCount, level: 'Monthly Slice', active: p3 || p4, done: p4 }
  ];

  return (
    <div
      style={{
        background: IndustrialTheme.popout.recessedWell,
        border: IndustrialTheme.popout.recessedBorder,
        borderRadius: 18,
        padding: '18px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: 12
      }}
    >
      {/* Header with Step Guide Badge */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(0,0,0,0.06)', paddingBottom: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 9, fontWeight: 900, background: '#0F172A', color: '#FFFFFF', padding: '2px 6px', borderRadius: 4, fontFamily: 'monospace' }}>
            STEP 01
          </span>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: IndustrialTheme.text.secondary }}>
            Dimensional Multiplier
          </span>
        </div>
        <span style={{ fontSize: 9, fontFamily: 'monospace', fontWeight: 700, color: IndustrialTheme.signals.crimson, background: IndustrialTheme.signals.crimsonBg, border: `1px solid ${IndustrialTheme.signals.crimsonBorder}`, padding: '2px 7px', borderRadius: 5 }}>
          UNFILTERED TRAVERSAL
        </span>
      </div>

      {/* Progressive Row Spotlights */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, position: 'relative' }}>
        {nodes.map((node, idx) => {
          const isFocused = (idx === 0 && p1 && !p2) || (idx === 1 && p2 && !p3) || (idx === 2 && p3 && !p4) || p4;
          const rowOpacity = isFocused ? 1.0 : 0.3;
          const rowScale = isFocused && !p4 ? 1.02 : 1.0;

          return (
            <div
              key={idx}
              style={{
                background: '#FFFFFF',
                border: isFocused ? `1.5px solid ${IndustrialTheme.signals.crimsonBorder}` : '1px solid rgba(0,0,0,0.06)',
                borderRadius: 9,
                padding: '9px 13px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                boxShadow: isFocused ? '0 4px 12px rgba(225, 29, 72, 0.12)' : '0 1px 3px rgba(0,0,0,0.02)',
                opacity: rowOpacity,
                transform: `scale(${rowScale})`,
                transition: 'all 0.25s ease-out'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                <div
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    backgroundColor: isFocused ? IndustrialTheme.signals.crimson : '#CBD5E1',
                    boxShadow: isFocused ? '0 0 8px rgba(225, 29, 72, 0.6)' : 'none'
                  }}
                />
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: IndustrialTheme.text.hero, fontFamily: 'monospace' }}>
                    {node.name}
                  </div>
                  <div style={{ fontSize: 9, color: IndustrialTheme.text.tertiary }}>
                    {node.level}
                  </div>
                </div>
              </div>
              <span style={{ fontSize: 12, fontWeight: 800, color: isFocused ? IndustrialTheme.signals.crimson : IndustrialTheme.text.secondary, fontFamily: 'monospace' }}>
                {node.count}
              </span>
            </div>
          );
        })}
      </div>

      {/* Step 4: Multiplier Explosion Result Bar */}
      <div
        style={{
          background: p4 ? IndustrialTheme.signals.crimsonBg : 'rgba(0,0,0,0.02)',
          border: p4 ? `1.5px solid ${IndustrialTheme.signals.crimsonBorder}` : '1px dashed rgba(0,0,0,0.1)',
          borderRadius: 9,
          padding: '10px 14px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          opacity: p4 ? 1.0 : 0.25,
          transform: `scale(${p4 ? Math.max(0, multSpring) : 1})`,
          boxShadow: p4 ? '0 6px 18px rgba(225, 29, 72, 0.18)' : 'none'
        }}
      >
        <span style={{ fontSize: 10, fontWeight: 700, color: IndustrialTheme.signals.crimson, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          Cartesian Explosion:
        </span>
        <span style={{ fontSize: 13, fontWeight: 900, fontFamily: 'monospace', color: IndustrialTheme.signals.crimson }}>
          15k &times; 200 &times; 36 = 108M Cells
        </span>
      </div>
    </div>
  );
};
