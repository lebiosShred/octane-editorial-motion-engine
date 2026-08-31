import React from 'react';
import { spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { IndustrialTheme } from '../../types/theme';

interface InfraTeamHumorCardProps {
  ramVal: number;
}

export const InfraTeamHumorCard: React.FC<InfraTeamHumorCardProps> = ({ ramVal }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentTime = frame / fps;

  const bubble1Progress = spring({
    frame: frame - Math.round(3.3 * fps),
    fps,
    config: { damping: 12, stiffness: 140 }
  });

  const bubble2Progress = spring({
    frame: frame - Math.round(4.0 * fps),
    fps,
    config: { damping: 12, stiffness: 140 }
  });

  const bubble3Progress = spring({
    frame: frame - Math.round(4.7 * fps),
    fps,
    config: { damping: 12, stiffness: 140 }
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', color: IndustrialTheme.text.secondary, fontWeight: 700 }}>
          Infrastructure Team Advisory
        </div>
        <div style={{ fontSize: 13, fontWeight: 800, color: IndustrialTheme.text.hero, fontFamily: 'monospace' }}>
          VM RAM: <span style={{ color: IndustrialTheme.signals.crimson }}>{Math.round(ramVal)} GB</span>
        </div>
      </div>

      {/* SVG Engineer Avatars & Comic Speech Bubbles */}
      <div
        style={{
          background: IndustrialTheme.popout.recessedWell,
          border: '1px solid rgba(0,0,0,0.06)',
          borderRadius: 14,
          padding: '16px 14px 10px 14px',
          position: 'relative',
          minHeight: 105,
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'flex-end'
        }}
      >
        {/* AVATAR 1: Lead SysAdmin */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
          {currentTime >= 3.3 && (
            <div
              style={{
                position: 'absolute',
                bottom: 54,
                transform: `scale(${Math.max(0, bubble1Progress)})`,
                transformOrigin: '50% 100%',
                background: IndustrialTheme.signals.amberBg,
                border: `1.5px solid ${IndustrialTheme.signals.amberBorder}`,
                borderRadius: 8,
                padding: '4px 8px',
                fontSize: 10,
                fontWeight: 800,
                color: IndustrialTheme.signals.amber,
                whiteSpace: 'nowrap',
                boxShadow: '0 4px 10px rgba(0,0,0,0.06)'
              }}
            >
              "More RAM!"
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
                  borderTop: `5px solid ${IndustrialTheme.signals.amberBorder}`
                }}
              />
            </div>
          )}
          <svg width="40" height="40" viewBox="0 0 42 42" fill="none">
            <circle cx="21" cy="14" r="7" fill="#334155" />
            <path d="M10 36 C10 26, 32 26, 32 36 Z" fill="#475569" />
            <path d="M14 14 C14 8, 28 8, 28 14" stroke="#0EA5E9" strokeWidth="1.5" fill="none" />
            <circle cx="14" cy="15" r="2" fill="#0EA5E9" />
          </svg>
          <span style={{ fontSize: 9, color: IndustrialTheme.text.tertiary, fontWeight: 600, marginTop: 2 }}>SysAdmin</span>
        </div>

        {/* AVATAR 2: Cloud Architect */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
          {currentTime >= 4.0 && (
            <div
              style={{
                position: 'absolute',
                bottom: 54,
                transform: `scale(${Math.max(0, bubble2Progress)})`,
                transformOrigin: '50% 100%',
                background: IndustrialTheme.signals.crimsonBg,
                border: `1.5px solid ${IndustrialTheme.signals.crimsonBorder}`,
                borderRadius: 8,
                padding: '4px 8px',
                fontSize: 10,
                fontWeight: 800,
                color: IndustrialTheme.signals.crimson,
                whiteSpace: 'nowrap',
                boxShadow: '0 4px 10px rgba(0,0,0,0.06)'
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
          <svg width="40" height="40" viewBox="0 0 42 42" fill="none">
            <circle cx="21" cy="14" r="7" fill="#1E293B" />
            <path d="M10 36 C10 26, 32 26, 32 36 Z" fill="#334155" />
            <circle cx="18" cy="14" r="2.5" stroke="#F59E0B" strokeWidth="1" />
            <circle cx="24" cy="14" r="2.5" stroke="#F59E0B" strokeWidth="1" />
            <line x1="20.5" y1="14" x2="21.5" y2="14" stroke="#F59E0B" strokeWidth="1" />
          </svg>
          <span style={{ fontSize: 9, color: IndustrialTheme.text.tertiary, fontWeight: 600, marginTop: 2 }}>Cloud Arch</span>
        </div>

        {/* AVATAR 3: DevOps Lead */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
          {currentTime >= 4.7 && (
            <div
              style={{
                position: 'absolute',
                bottom: 54,
                transform: `scale(${Math.max(0, bubble3Progress)})`,
                transformOrigin: '50% 100%',
                background: '#F1F5F9',
                border: '1.5px solid #CBD5E1',
                borderRadius: 8,
                padding: '4px 8px',
                fontSize: 10,
                fontWeight: 800,
                color: '#334155',
                whiteSpace: 'nowrap',
                boxShadow: '0 4px 10px rgba(0,0,0,0.06)'
              }}
            >
              "Spin up another VM!"
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
                  borderTop: '5px solid #CBD5E1'
                }}
              />
            </div>
          )}
          <svg width="40" height="40" viewBox="0 0 42 42" fill="none">
            <circle cx="21" cy="14" r="7" fill="#475569" />
            <path d="M10 36 C10 26, 32 26, 32 36 Z" fill="#64748B" />
          </svg>
          <span style={{ fontSize: 9, color: IndustrialTheme.text.tertiary, fontWeight: 600, marginTop: 2 }}>DevOps</span>
        </div>
      </div>

      {/* Narrative Punchline */}
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
