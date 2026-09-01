export const IndustrialTheme = {
  surface: {
    base: '#000000',
    baseGradient: '#000000',
    gridLine: 'rgba(255, 255, 255, 0.04)',
    surfaceCard: '#090A0C',
  },
  fonts: {
    sans: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    mono: "'JetBrains Mono', 'Fira Code', 'SF Mono', Consolas, monospace",
  },
  typography: {
    antialiased: {
      WebkitFontSmoothing: 'antialiased' as const,
      MozOsxFontSmoothing: 'grayscale' as const,
      textRendering: 'geometricPrecision' as const,
    },
  },
  popout: {
    chassisBg: '#FFFFFF',
    chassisBorder: '1px solid rgba(0, 0, 0, 0.08)',
    chassisShadow:
      '0 50px 120px -20px rgba(0, 0, 0, 0.95), 0 20px 50px -10px rgba(0, 0, 0, 0.6)',
    recessedWell: '#F8FAFC',
    recessedBorder: '1px solid rgba(0, 0, 0, 0.06)',
    innerCard: '#FFFFFF',
    innerBorder: '1px solid rgba(0, 0, 0, 0.08)',
    innerShadow: '0 4px 12px rgba(0, 0, 0, 0.03)',
  },
  text: {
    hero: '#090A0C',
    primary: '#1E293B',
    secondary: '#64748B',
    tertiary: '#94A3B8',
    mono: '#475569',
  },
  signals: {
    accent: '#4daeeb',
    accentBg: 'rgba(77, 174, 235, 0.12)',
    accentBorder: 'rgba(77, 174, 235, 0.35)',
    accentGlow: 'rgba(77, 174, 235, 0.45)',
    danger: '#F43F5E',
    dangerBg: 'rgba(244, 63, 94, 0.12)',
    dangerBorder: 'rgba(244, 63, 94, 0.35)',
    success: '#10B981',
    successBg: 'rgba(16, 185, 129, 0.12)',
    successBorder: 'rgba(16, 185, 129, 0.35)',
  },
};
