import React from 'react';
import { Img, staticFile, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { IndustrialTheme } from '../../types/theme';

interface InfraTeamHumorCardProps {
  ramVal: number;
}

export const InfraTeamHumorCard: React.FC<InfraTeamHumorCardProps> = ({ ramVal }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentTime = frame / fps;

  // Staggered spring animations aligned to narrator's IT delivery (t = 4.2s, 5.4s, 6.6s)
  const bubble1Progress = spring({
    frame: frame - Math.round(4.2 * fps),
    fps,
    config: { damping: 12, stiffness: 140 }
  });

  const bubble2Progress = spring({
    frame: frame - Math.round(5.4 * fps),
    fps,
    config: { damping: 12, stiffness: 140 }
  });

  const bubble3Progress = spring({
    frame: frame - Math.round(6.6 * fps),
    fps,
    config: { damping: 12, stiffness: 140 }
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', color: IndustrialTheme.text.secondary, fontWeight: 700 }}>
          Infrastructure Team Advisory
        </div>
        <div style={{ fontSize: 13, fontWeight: 800, color: IndustrialTheme.text.hero, fontFamily: 'monospace' }}>
          VM RAM: <span style={{ color: IndustrialTheme.signals.crimson }}>{Math.round(ramVal)} GB</span>
        </div>
      </div>

      {/* 3D Claymorphic IT Illustration with Seamless #FFFFFF Blending & Anchored Speech Bubbles */}
      <div
        style={{
          background: '#FFFFFF',
          border: '1px solid rgba(0,0,0,0.06)',
          borderRadius: 14,
          position: 'relative',
          height: 195,
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-end'
        }}
      >
        {/* High-End 3D Claymorphic IT Team Artwork */}
        <Img
          src={staticFile('it_team_ram_illustration.png')}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 12%',
            mixBlendMode: 'multiply'
          }}
        />

        {/* ── SPEECH BUBBLE 1: SysAdmin (Left) ── */}
        {currentTime >= 4.2 && (
          <div
            style={{
              position: 'absolute',
              left: '4%',
              top: '4%',
              transform: `scale(${Math.max(0, bubble1Progress)})`,
              transformOrigin: '70% 100%',
              background: IndustrialTheme.signals.amberBg,
              border: `1.5px solid ${IndustrialTheme.signals.amberBorder}`,
              borderRadius: 8,
              padding: '4px 9px',
              fontSize: 10,
              fontWeight: 800,
              color: IndustrialTheme.signals.amber,
              whiteSpace: 'nowrap',
              boxShadow: '0 6px 14px rgba(245, 158, 11, 0.2)',
              zIndex: 10
            }}
          >
            "More RAM!"
            <div
              style={{
                position: 'absolute',
                bottom: -5,
                right: 14,
                width: 0,
                height: 0,
                borderLeft: '5px solid transparent',
                borderRight: '5px solid transparent',
                borderTop: `5px solid ${IndustrialTheme.signals.amberBorder}`
              }}
            />
          </div>
        )}

        {/* ── SPEECH BUBBLE 2: Cloud Architect (Middle) ── */}
        {currentTime >= 5.4 && (
          <div
            style={{
              position: 'absolute',
              left: '32%',
              top: '18%',
              transform: `scale(${Math.max(0, bubble2Progress)})`,
              transformOrigin: '50% 100%',
              background: IndustrialTheme.signals.crimsonBg,
              border: `1.5px solid ${IndustrialTheme.signals.crimsonBorder}`,
              borderRadius: 8,
              padding: '4px 9px',
              fontSize: 10,
              fontWeight: 800,
              color: IndustrialTheme.signals.crimson,
              whiteSpace: 'nowrap',
              boxShadow: '0 6px 14px rgba(225, 29, 72, 0.2)',
              zIndex: 10
            }}
          >
            "Scale to 128 GB!"
            <div
              style={{
                position: 'absolute',
                bottom: -5,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 0,
                height: 0,
                borderLeft: '5px solid transparent',
                borderRight: '5px solid transparent',
                borderTop: `5px solid ${IndustrialTheme.signals.crimsonBorder}`
              }}
            />
          </div>
        )}

        {/* ── SPEECH BUBBLE 3: DevOps (Right) ── */}
        {currentTime >= 6.6 && (
          <div
            style={{
              position: 'absolute',
              right: '4%',
              top: '4%',
              transform: `scale(${Math.max(0, bubble3Progress)})`,
              transformOrigin: '30% 100%',
              background: '#F1F5F9',
              border: '1.5px solid #94A3B8',
              borderRadius: 8,
              padding: '4px 9px',
              fontSize: 10,
              fontWeight: 800,
              color: '#1E293B',
              whiteSpace: 'nowrap',
              boxShadow: '0 6px 14px rgba(15, 23, 42, 0.15)',
              zIndex: 10
            }}
          >
            "Spin up another VM!"
            <div
              style={{
                position: 'absolute',
                bottom: -5,
                left: 14,
                width: 0,
                height: 0,
                borderLeft: '5px solid transparent',
                borderRight: '5px solid transparent',
                borderTop: '5px solid #94A3B8'
              }}
            />
          </div>
        )}
      </div>

      {/* Quantitative Narrative Punchline */}
      <div
        style={{
          background: IndustrialTheme.signals.crimsonBg,
          border: `1px solid ${IndustrialTheme.signals.crimsonBorder}`,
          borderRadius: 8,
          padding: '8px 12px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <span style={{ fontSize: 10, color: IndustrialTheme.signals.crimson, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          Hardware Myth:
        </span>
        <span style={{ fontSize: 11, color: IndustrialTheme.text.secondary, fontWeight: 600 }}>
          RAM cannot fix algorithmic zero-cell traversal.
        </span>
      </div>
    </div>
  );
};
