import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
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

  // Staged Memory Focus
  const isPhase1 = currentTime >= 14.5;
  const isPhase2 = currentTime >= 16.2;

  // Active Radar Scan line across full register
  const scanProgress = interpolate(currentTime, [16.2, 18.2], [0, totalCount], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });

  const cells = Array.from({ length: rows * cols });

  return (
    <div
      style={{
        background: IndustrialTheme.popout.recessedWell,
        border: IndustrialTheme.popout.recessedBorder,
        borderRadius: 16,
        padding: '18px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: 11,
        fontFamily: IndustrialTheme.fonts.sans,
        ...IndustrialTheme.typography.antialiased
      }}
    >
      {/* Streamlined Step Header with Zero Wrap */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(0,0,0,0.06)', paddingBottom: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <span style={{ fontSize: 10, fontWeight: 900, background: '#0F172A', color: '#FFFFFF', padding: '3px 7px', borderRadius: 4, fontFamily: IndustrialTheme.fonts.mono, whiteSpace: 'nowrap' }}>
            STEP 02
          </span>
          <span style={{ fontSize: 11, fontFamily: IndustrialTheme.fonts.mono, color: IndustrialTheme.text.secondary, fontWeight: 700, whiteSpace: 'nowrap' }}>
            MEMORY REGISTER
          </span>
        </div>

        {/* Dynamic Focus Callout Badge */}
        {!isPhase2 ? (
          <span style={{ fontSize: 10, fontWeight: 800, color: IndustrialTheme.signals.mint, background: IndustrialTheme.signals.mintBg, border: `1px solid ${IndustrialTheme.signals.mintBorder}`, padding: '3px 8px', borderRadius: 5, whiteSpace: 'nowrap', fontFamily: IndustrialTheme.fonts.mono }}>
            [ 6 LIVE CELLS ]
          </span>
        ) : (
          <span style={{ fontSize: 10, fontWeight: 800, color: IndustrialTheme.signals.crimson, background: IndustrialTheme.signals.crimsonBg, border: `1px solid ${IndustrialTheme.signals.crimsonBorder}`, padding: '3px 8px', borderRadius: 5, whiteSpace: 'nowrap', fontFamily: IndustrialTheme.fonts.mono }}>
            [ 250:1 OVERFEED ]
          </span>
        )}
      </div>

      {/* 16x6 Compact Matrix Grid with Balanced Density */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(16, 1fr)',
          gap: 4
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
            bg = IndustrialTheme.signals.mint;
            border = `1px solid ${IndustrialTheme.signals.mint}`;
            textColor = '#FFFFFF';
            cellOpacity = 1.0;
            cellScale = isPhase1 && !isPhase2 ? 1.15 : 1.0;
          } else if (isScannedGhost) {
            bg = IndustrialTheme.signals.crimsonBg;
            border = `1px solid ${IndustrialTheme.signals.crimsonBorder}`;
            textColor = IndustrialTheme.signals.crimson;
            cellOpacity = 1.0;
          }

          return (
            <div
              key={i}
              style={{
                height: 17,
                borderRadius: 3,
                backgroundColor: bg,
                border,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: 9.5,
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

      {/* Quantitative Bottom Metric */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#FFFFFF', padding: '7px 14px', borderRadius: 8, border: '1px solid rgba(0,0,0,0.06)' }}>
        <span style={{ fontSize: 11, color: IndustrialTheme.text.secondary, fontWeight: 600 }}>
          {isPhase2 ? 'Traversal Waste:' : 'Populated Data:'}
        </span>
        <span style={{ fontSize: 12, fontWeight: 900, color: isPhase2 ? IndustrialTheme.signals.crimson : IndustrialTheme.signals.mint, fontFamily: IndustrialTheme.fonts.mono }}>
          {isPhase2 ? '95.3% Empty Cells Scanned' : '6 Leaf Records'}
        </span>
      </div>
    </div>
  );
};
