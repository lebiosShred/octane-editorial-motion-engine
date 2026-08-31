export const IndustrialTheme = {
  surface: {
    base: '#0B0C0E',
    baseGradient: 'radial-gradient(ellipse at 50% 30%, rgba(35, 38, 48, 0.5) 0%, rgba(11, 12, 14, 0.98) 85%)',
    gridLine: 'rgba(255, 255, 255, 0.03)'
  },
  fonts: {
    sans: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    mono: "'JetBrains Mono', 'Fira Code', 'SF Mono', Consolas, monospace"
  },
  typography: {
    antialiased: {
      WebkitFontSmoothing: 'antialiased' as const,
      MozOsxFontSmoothing: 'grayscale' as const,
      textRendering: 'geometricPrecision' as const
    }
  },
  popout: {
    chassisBg: '#FFFFFF',
    chassisBorder: '1px solid rgba(0, 0, 0, 0.08)',
    chassisShadow: '0 50px 120px -20px rgba(0, 0, 0, 0.95), 0 20px 50px -10px rgba(0, 0, 0, 0.6)',
    recessedWell: '#F8FAFC',
    recessedBorder: '1px solid rgba(0, 0, 0, 0.06)',
    innerCard: '#FFFFFF',
    innerBorder: '1px solid rgba(0, 0, 0, 0.08)',
    innerShadow: '0 4px 12px rgba(0, 0, 0, 0.03)'
  },
  text: {
    hero: '#090A0C',
    primary: '#1E293B',
    secondary: '#64748B',
    tertiary: '#94A3B8',
    mono: '#475569'
  },
  signals: {
    amber: '#D97706',
    amberBg: '#FEF3C7',
    amberBorder: '#FDE68A',
    
    crimson: '#E11D48',
    crimsonBg: '#FFE4E6',
    crimsonBorder: '#FECDD3',
    
    mint: '#059669',
    mintBg: '#D1FAE5',
    mintBorder: '#A7F3D0',
    
    darkAction: '#0F172A',
    darkActionHover: '#1E293B'
  }
};
