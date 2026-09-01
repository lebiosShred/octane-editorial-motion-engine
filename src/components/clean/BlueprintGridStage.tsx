import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';

interface BlueprintGridStageProps {
  children: React.ReactNode;
  hudTag?: string;
  gridOpacity?: number;
}

export const BlueprintGridStage: React.FC<BlueprintGridStageProps> = ({
  children,
  hudTag = 'WATSONX_ARCH_STAGING // v4.2',
  gridOpacity = 0.045,
}) => {
  const frame = useCurrentFrame();

  // Subtle ambient breathing in grid illumination
  const ambientPulse = interpolate(
    Math.sin(frame * 0.04),
    [-1, 1],
    [gridOpacity * 0.8, gridOpacity * 1.2]
  );

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#000000',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* BACKGROUND BLUEPRINT GRID SVG */}
      <svg
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          opacity: ambientPulse,
        }}
      >
        <defs>
          <pattern
            id="blueprint-grid-pattern"
            width="80"
            height="80"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 80 0 L 0 0 0 80"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="1"
              strokeDasharray="3 6"
            />
            <circle cx="80" cy="80" r="1.5" fill="#FFFFFF" opacity="0.6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#blueprint-grid-pattern)" />
      </svg>

      {/* CORNER REGISTRATION CROSSHAIRS */}
      <div
        style={{
          position: 'absolute',
          top: 80,
          left: 60,
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 14,
          color: 'rgba(255, 255, 255, 0.25)',
          letterSpacing: '0.1em',
          pointerEvents: 'none',
        }}
      >
        + 00.00.00 // N 540
      </div>

      <div
        style={{
          position: 'absolute',
          top: 80,
          right: 60,
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 14,
          color: 'rgba(255, 255, 255, 0.25)',
          letterSpacing: '0.1em',
          pointerEvents: 'none',
        }}
      >
        [ 1080x1920 60FPS ] +
      </div>

      {/* TOP HUD TELEMETRY TAG */}
      <div
        style={{
          position: 'absolute',
          top: 130,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '6px 18px',
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: 20,
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            backgroundColor: '#4daeeb',
            boxShadow: '0 0 8px #4daeeb',
          }}
        />
        <span
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 13,
            fontWeight: 700,
            color: '#64748B',
            letterSpacing: '0.12em',
          }}
        >
          {hudTag}
        </span>
      </div>

      {/* FOREGROUND HERO CONTENT */}
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {children}
      </div>
    </div>
  );
};
