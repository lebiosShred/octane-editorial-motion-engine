import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { IndustrialTheme } from '../../types/theme';

interface BitLatticeGridProps {
  rows?: number;
  cols?: number;
  populatedCount?: number;
  totalCount?: number;
}

export const BitLatticeGrid: React.FC<BitLatticeGridProps> = ({
  rows = 6,
  cols = 16,
  populatedCount = 6,
  totalCount = 96
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentTime = frame / fps;

  const isPhase1 = currentTime >= 12.5;
  const isPhase2 = currentTime >= 14.5;

  const scanProgress = interpolate(currentTime, [14.5, 17.5], [0, totalCount], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });

  const cells = Array.from({ length: rows * cols });

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
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(0,0,0,0.06)', paddingBottom: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <span style={{ fontSize: 12, fontWeight: 900, background: '#0F172A', color: '#FFFFFF', padding: '4px 9px', borderRadius: 5, fontFamily: IndustrialTheme.fonts.mono, whiteSpace: 'nowrap' }}>
            STEP 02
          </span>
          <span style={{ fontSize: 14, fontFamily: IndustrialTheme.fonts.mono, color: IndustrialTheme.text.secondary, fontWeight: 700, whiteSpace: 'nowrap' }}>
            MEMORY REGISTER
          </span>
        </div>

        <span style={{ fontSize: 12, fontWeight: 800, color: '#4daeeb', background: 'rgba(77, 174, 235, 0.12)', border: '1px solid rgba(77, 174, 235, 0.35)', padding: '4px 10px', borderRadius: 6, whiteSpace: 'nowrap', fontFamily: IndustrialTheme.fonts.mono }}>
          {!isPhase2 ? '[ 6 LIVE CELLS ]' : '[ 250:1 OVERFEED ]'}
        </span>
      </div>

      {/* Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(16, 1fr)',
          gap: 5
        }}
      >
        {cells.map((_, i) => {
          const isPopulated = i < populatedCount;
          const isScannedGhost = isPhase2 && !isPopulated && i <= scanProgress;

          let bg = '#FFFFFF';
          let border = '1px solid rgba(0,0,0,0.08)';
          let textColor = '#CBD5E1';
          let cellOpacity = 0.35;
          let cellScale = 1.0;

          if (isPopulated) {
            bg = '#4daeeb';
            border = '1.5px solid #4daeeb';
            textColor = '#FFFFFF';
            cellOpacity = 1.0;
            cellScale = isPhase1 && !isPhase2 ? 1.15 : 1.0;
          } else if (isScannedGhost) {
            bg = 'rgba(77, 174, 235, 0.2)';
            border = '1.5px solid rgba(77, 174, 235, 0.5)';
            textColor = '#4daeeb';
            cellOpacity = 1.0;
          }

          return (
            <div
              key={i}
              style={{
                height: 24,
                borderRadius: 4,
                backgroundColor: bg,
                border,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: 12,
                fontFamily: IndustrialTheme.fonts.mono,
                color: textColor,
                fontWeight: 800,
                opacity: cellOpacity,
                transform: `scale(${cellScale})`,
                transition: 'background-color 0.15s ease-out, opacity 0.2s ease-out'
              }}
            >
              {isPopulated ? '1' : '0'}
            </div>
          );
        })}
      </div>

      {/* Bottom Metric */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#FFFFFF', padding: '9px 16px', borderRadius: 10, border: '1px solid rgba(0,0,0,0.06)' }}>
        <span style={{ fontSize: 13, color: IndustrialTheme.text.secondary, fontWeight: 600 }}>
          {isPhase2 ? 'Traversal Waste:' : 'Populated Data:'}
        </span>
        <span style={{ fontSize: 14, fontWeight: 900, color: '#4daeeb', fontFamily: IndustrialTheme.fonts.mono }}>
          {isPhase2 ? '95.3% Empty Cells Scanned' : '6 Leaf Records'}
        </span>
      </div>
    </div>
  );
};
