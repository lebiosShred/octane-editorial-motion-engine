import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { IndustrialTheme } from '../../types/theme';

interface BitLatticeGridProps {
  rows?: number;
  cols?: number;
  populatedCount?: number;
  totalCount?: number;
  isOverfed?: boolean;
}

export const BitLatticeGrid: React.FC<BitLatticeGridProps> = ({
  rows = 8,
  cols = 16,
  populatedCount = 6,
  totalCount = 128,
  isOverfed = true
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentTime = frame / fps;

  // Staged Memory Focus:
  // Phase 1 (t = 14.8s - 16.5s): 6 populated cells glow mint
  // Phase 2 (t >= 16.5s): Radar scan sweep illuminates 122 ghost cells
  const isPhase1 = currentTime >= 14.8;
  const isPhase2 = currentTime >= 16.5;

  // Active Radar Scan line (Sweeps from index 0 to 127 between t = 16.5s and 18.5s)
  const scanProgress = interpolate(currentTime, [16.5, 18.5], [0, totalCount], {
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
        padding: 14,
        display: 'flex',
        flexDirection: 'column',
        gap: 10
      }}
    >
      {/* Header with Step 02 Badge & Dynamic Status Tag */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 9, fontWeight: 900, background: '#0F172A', color: '#FFFFFF', padding: '2px 6px', borderRadius: 4, fontFamily: 'monospace' }}>
            STEP 02
          </span>
          <span style={{ fontSize: 10, fontFamily: 'monospace', color: IndustrialTheme.text.secondary, fontWeight: 700 }}>
            MEMORY_LATTICE (16x8 REGISTER)
          </span>
        </div>

        {/* Dynamic Focus Callout Badge */}
        {!isPhase2 ? (
          <span style={{ fontSize: 9, fontWeight: 800, color: IndustrialTheme.signals.mint, background: IndustrialTheme.signals.mintBg, border: `1px solid ${IndustrialTheme.signals.mintBorder}`, padding: '2px 8px', borderRadius: 5 }}>
            [ 6 ACTIVE LEAF CELLS ]
          </span>
        ) : (
          <span style={{ fontSize: 9, fontWeight: 800, color: IndustrialTheme.signals.crimson, background: IndustrialTheme.signals.crimsonBg, border: `1px solid ${IndustrialTheme.signals.crimsonBorder}`, padding: '2px 8px', borderRadius: 5 }}>
            [ 122 GHOST CELLS (250:1 OVERFEED) ]
          </span>
        )}
      </div>

      {/* 16x8 Grid with Progressive Staged Illumination */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(16, 1fr)',
          gap: 4,
          position: 'relative'
        }}
      >
        {cells.map((_, i) => {
          const isPopulated = i < populatedCount;
          const isScannedGhost = isPhase2 && !isPopulated && i <= scanProgress;

          let bg = '#FFFFFF';
          let border = '1px solid rgba(0,0,0,0.06)';
          let textColor = 'transparent';
          let cellOpacity = 0.2;
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
          } else if (isPhase2) {
            cellOpacity = 0.35;
          }

          return (
            <div
              key={i}
              style={{
                width: 14,
                height: 14,
                borderRadius: 3,
                backgroundColor: bg,
                border,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: 8,
                fontFamily: 'monospace',
                color: textColor,
                fontWeight: 700,
                opacity: cellOpacity,
                transform: `scale(${cellScale})`,
                transition: 'background-color 0.15s ease-out, border 0.15s ease-out, opacity 0.2s ease-out'
              }}
            >
              {isPopulated ? '1' : isScannedGhost ? '0' : ''}
            </div>
          );
        })}
      </div>

      {/* Quantitative Bottom Summary */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#FFFFFF', padding: '6px 12px', borderRadius: 8, border: '1px solid rgba(0,0,0,0.06)' }}>
        <span style={{ fontSize: 10, color: IndustrialTheme.text.secondary, fontWeight: 600 }}>
          {isPhase2 ? 'Traversal Waste:' : 'Populated Data:'}
        </span>
        <span style={{ fontSize: 11, fontWeight: 900, color: isPhase2 ? IndustrialTheme.signals.crimson : IndustrialTheme.signals.mint, fontFamily: 'monospace' }}>
          {isPhase2 ? '95.3% Empty Cells Scanned' : '6 Leaf Records'}
        </span>
      </div>
    </div>
  );
};
