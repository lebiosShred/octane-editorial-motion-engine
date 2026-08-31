import React from 'react';

interface SpotlightCardProps {
  isActive: boolean;
  activeBorderColor?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  isActive,
  activeBorderColor = 'rgba(56, 189, 248, 0.4)',
  children,
  style = {}
}) => {
  return (
    <div
      style={{
        background: isActive ? 'rgba(2, 6, 23, 0.85)' : 'rgba(2, 6, 23, 0.4)',
        border: isActive ? `1px solid ${activeBorderColor}` : '1px solid rgba(255, 255, 255, 0.04)',
        borderTop: isActive ? `1px solid ${activeBorderColor}` : '1px solid rgba(255, 255, 255, 0.04)',
        borderRadius: 18,
        padding: 24,
        opacity: isActive ? 1.0 : 0.4,
        filter: isActive ? 'none' : 'blur(1.5px)',
        transform: isActive ? 'scale(1.02)' : 'scale(0.98)',
        transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
        ...style
      }}
    >
      {children}
    </div>
  );
};
