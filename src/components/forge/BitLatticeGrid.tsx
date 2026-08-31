import React from 'react';
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
  populatedCount = 12,
  totalCount = 128,
  isOverfed = false
}) => {
  const cells = Array.from({ length: rows * cols });

  return (
    <div
      style={{
        background: IndustrialTheme.surface.recessedWell,
        border: IndustrialTheme.surface.recessedBorder,
        borderRadius: 14,
        padding: 14,
        display: 'flex',
        flexDirection: 'column',
        gap: 8
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 10, fontFamily: 'monospace', color: IndustrialTheme.text.tertiary }}>
        <span>MEMORY_LATTICE (16x8 REGISTER)</span>
        <span style={{ color: isOverfed ? IndustrialTheme.signals.crimson : IndustrialTheme.signals.mint, fontWeight: 700 }}>
          {isOverfed ? 'ZERO_CELL_TRAVERSAL' : 'SCOPED_DENSE_COMPACT'}
        </span>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(16, 1fr)',
          gap: 4
        }}
      >
        {cells.map((_, i) => {
          const isPopulated = i < populatedCount;
          const isWasted = isOverfed && !isPopulated && i < totalCount;
          
          const bg = isPopulated
            ? IndustrialTheme.signals.mint
            : isWasted
            ? 'rgba(244, 63, 94, 0.25)'
            : 'rgba(255, 255, 255, 0.03)';

          const border = isPopulated
            ? `1px solid ${IndustrialTheme.signals.mint}`
            : isWasted
            ? `1px solid ${IndustrialTheme.signals.crimsonBorder}`
            : '1px solid transparent';

          return (
            <div
              key={i}
              style={{
                width: 14,
                height: 14,
                borderRadius: 2,
                backgroundColor: bg,
                border,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: 8,
                fontFamily: 'monospace',
                color: isPopulated ? '#0B0C0E' : isWasted ? IndustrialTheme.signals.crimson : 'transparent',
                fontWeight: 700
              }}
            >
              {isPopulated ? '1' : isWasted ? '0' : ''}
            </div>
          );
        })}
      </div>
    </div>
  );
};
