import React from 'react';
import { interpolate, spring, useVideoConfig } from 'remotion';
import { BeatSpec } from '../../engine/BeatDirectorEngine';
import { IndustrialTheme } from '../../types/theme';

interface DynamicLayoutDirectorProps {
  currentBeat: BeatSpec;
  currentFrame: number;
}

export const DynamicLayoutDirector: React.FC<DynamicLayoutDirectorProps> = ({
  currentBeat,
  currentFrame,
}) => {
  const { fps } = useVideoConfig();
  const archetype = currentBeat.layoutArchetype;

  // Relative progress within the beat
  const beatLocalFrame = Math.max(0, currentFrame - currentBeat.startFrame);
  const enterSpring = spring({
    frame: beatLocalFrame,
    fps,
    config: { mass: 0.5, damping: 14, stiffness: 120 },
  });

  const translateY = interpolate(enterSpring, [0, 1], [30, 0]);
  const opacity = interpolate(enterSpring, [0, 0.4, 1], [0, 1, 1]);

  // Archetype 5: Cinema Clean (Zero 2D UI)
  if (archetype === 'cinema_clean') {
    return null;
  }

  // Archetype 1: Full-Screen Kinetic Hero
  if (archetype === 'kinetic_hero') {
    return (
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 140px',
          zIndex: 80,
          pointerEvents: 'none',
          opacity,
          transform: `translateY(${translateY}px)`,
        }}
      >
        <div
          style={{
            fontSize: 64,
            fontWeight: 900,
            color: '#FFFFFF',
            textAlign: 'center',
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            textShadow: '0 10px 40px rgba(0,0,0,0.95)',
            maxWidth: 1500,
            fontFamily: IndustrialTheme.fonts.sans,
          }}
        >
          {currentBeat.headline.main}{' '}
          <span
            style={{
              color: '#4daeeb',
              textShadow: '0 0 50px rgba(77, 174, 235, 0.6)',
            }}
          >
            {currentBeat.headline.highlight}
          </span>
        </div>
        {currentBeat.headline.sublabel && (
          <div
            style={{
              marginTop: 20,
              fontSize: 18,
              fontWeight: 700,
              color: '#94A3B8',
              fontFamily: IndustrialTheme.fonts.mono,
              background: 'rgba(11, 15, 25, 0.85)',
              border: '1px solid #334155',
              padding: '6px 18px',
              borderRadius: 8,
              letterSpacing: '0.05em',
            }}
          >
            {currentBeat.headline.sublabel}
          </div>
        )}
      </div>
    );
  }

  // Archetype 3: Technical Lower-Left HUD
  if (archetype === 'technical_hud') {
    return (
      <div
        style={{
          position: 'absolute',
          bottom: 70,
          left: 70,
          zIndex: 80,
          pointerEvents: 'none',
          opacity,
          transform: `translateY(${translateY}px)`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: 6,
        }}
      >
        <div
          style={{
            fontSize: 11,
            fontWeight: 900,
            fontFamily: IndustrialTheme.fonts.mono,
            color: '#4daeeb',
            background: 'rgba(77, 174, 235, 0.15)',
            border: '1.5px solid #4daeeb',
            padding: '4px 12px',
            borderRadius: 6,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}
        >
          [ {currentBeat.headline.main} ]
        </div>
        <div
          style={{
            fontSize: 22,
            fontWeight: 900,
            color: '#FFFFFF',
            fontFamily: IndustrialTheme.fonts.mono,
            textShadow: '0 4px 20px rgba(0,0,0,0.9)',
          }}
        >
          {currentBeat.headline.highlight}
        </div>
        {currentBeat.headline.sublabel && (
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: '#94A3B8',
              fontFamily: IndustrialTheme.fonts.mono,
            }}
          >
            // {currentBeat.headline.sublabel}
          </div>
        )}
      </div>
    );
  }

  // Archetype 4: Split Asymmetric (Left-docked headline)
  if (archetype === 'split_asymmetric') {
    return (
      <div
        style={{
          position: 'absolute',
          top: 60,
          left: 70,
          zIndex: 80,
          pointerEvents: 'none',
          opacity,
          transform: `translateY(${translateY}px)`,
          maxWidth: 700,
        }}
      >
        <div
          style={{
            fontSize: 38,
            fontWeight: 900,
            color: '#FFFFFF',
            lineHeight: 1.2,
            letterSpacing: '-0.025em',
            textShadow: '0 8px 30px rgba(0,0,0,0.9)',
            fontFamily: IndustrialTheme.fonts.sans,
          }}
        >
          {currentBeat.headline.main}{' '}
          <span style={{ color: '#4daeeb', fontWeight: 900 }}>
            {currentBeat.headline.highlight}
          </span>
        </div>
      </div>
    );
  }

  // Archetype 2: Spatial Anchor (Minimalist Top Watermark only)
  return (
    <div
      style={{
        position: 'absolute',
        top: 36,
        left: 60,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        zIndex: 90,
        opacity,
      }}
    >
      <span
        style={{
          fontSize: 12,
          fontFamily: IndustrialTheme.fonts.mono,
          fontWeight: 900,
          color: '#4daeeb',
          background: 'rgba(77, 174, 235, 0.15)',
          border: '1.5px solid #4daeeb',
          padding: '4px 10px',
          borderRadius: 6,
          letterSpacing: '0.1em',
        }}
      >
        IBM WATSONX
      </span>
      <span
        style={{
          fontSize: 12,
          fontWeight: 700,
          fontFamily: IndustrialTheme.fonts.mono,
          color: '#64748B',
        }}
      >
        {currentBeat.headline.main} {currentBeat.headline.highlight}
      </span>
    </div>
  );
};
