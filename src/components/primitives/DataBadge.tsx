import React from 'react';
import { IndustrialTheme } from '../../types/theme';

export type BadgeTone = 'crimson' | 'mint' | 'amber' | 'slate' | 'cyan' | 'purple';

interface DataBadgeProps {
  label: string;
  tone?: BadgeTone;
  size?: 'sm' | 'md' | 'lg';
  mono?: boolean;
}

export const DataBadge: React.FC<DataBadgeProps> = ({
  label,
  tone = 'slate',
  size = 'md',
  mono = true
}) => {
  const tones = {
    crimson: { bg: IndustrialTheme.signals.crimsonBg, text: IndustrialTheme.signals.crimson, border: IndustrialTheme.signals.crimsonBorder },
    mint: { bg: IndustrialTheme.signals.mintBg, text: IndustrialTheme.signals.mint, border: IndustrialTheme.signals.mintBorder },
    amber: { bg: IndustrialTheme.signals.amberBg, text: IndustrialTheme.signals.amber, border: IndustrialTheme.signals.amberBorder },
    slate: { bg: '#F1F5F9', text: '#475569', border: '#CBD5E1' },
    cyan: { bg: '#E0F2FE', text: '#0284C7', border: '#BAE6FD' },
    purple: { bg: '#F3E8FF', text: '#7E22CE', border: '#E9D5FF' }
  }[tone];

  const sizeStyles = {
    sm: { fontSize: 10, padding: '2px 7px', borderRadius: 4 },
    md: { fontSize: 12, padding: '4px 10px', borderRadius: 6 },
    lg: { fontSize: 14, padding: '6px 14px', borderRadius: 8 }
  }[size];

  return (
    <span
      style={{
        ...sizeStyles,
        fontWeight: 800,
        letterSpacing: '0.06em',
        fontFamily: mono ? IndustrialTheme.fonts.mono : IndustrialTheme.fonts.sans,
        color: tones.text,
        background: tones.bg,
        border: `1px solid ${tones.border}`,
        textTransform: 'uppercase',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        whiteSpace: 'nowrap'
      }}
    >
      {label}
    </span>
  );
};
