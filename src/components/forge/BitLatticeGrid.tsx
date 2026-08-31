import React from 'react';

interface BitLatticeGridProps {
  rows?: number;
  cols?: number;
  populatedCount?: number;
  totalCount?: number;
  isOverfed?: boolean;
  activeColor?: string;
  emptyColor?: string;
}

export const BitLatticeGrid: React.FC<BitLatticeGridProps> = ({
  rows = 8,
  cols = 16,
  populatedCount = 12,
  totalCount = 128,
  isOverfed = false,
  activeColor = '#10B981',
  emptyColor = '#EF4444'
}) => {
  const cells = Array.from({ length: rows * cols });

  return (
    <div
      style={{
        background: 'rgba(2, 6, 23, 0.8)',
        border: '1px solid rgba(255, 255, 255, 0.06)',
        borderRadius: 14,
        padding: 14,
        display: 'flex',
        flexDirection: 'column',
        gap: 8
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 10, fontFamily: 'monospace', color: '#64748B' }}>
        <span>MEMORY_LATTICE (16x8 REGISTER)</span>
        <span style={{ color: isOverfed ? '#EF4444' : '#10B981' }}>
          {isOverfed ? 'ZERO_CELL_TRAVERSAL_DETECTED' : 'SCOPED_DENSE_COMPACT'}
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
            ? activeColor
            : isWasted
            ? 'rgba(239, 68, 68, 0.35)'
            : 'rgba(255, 255, 255, 0.04)';

          const border = isPopulated
            ? `1px solid ${activeColor}`
            : isWasted
            ? '1px solid rgba(239, 68, 68, 0.6)'
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
                color: isPopulated ? '#07090E' : isWasted ? '#F87171' : 'transparent',
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
