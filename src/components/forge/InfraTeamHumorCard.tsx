import React from 'react';
import { Img, staticFile, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { IndustrialTheme } from '../../types/theme';

export const InfraTeamHumorCard: React.FC<{ ramVal?: number }> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentTime = frame / fps;

  // Staggered spring animations aligned to narrator's IT delivery (t = 4.0s, 5.0s, 6.2s)
  const bubble1Progress = spring({
    frame: frame - Math.round(4.0 * fps),
    fps,
    config: { damping: 10, stiffness: 160 }
  });

  const bubble2Progress = spring({
    frame: frame - Math.round(5.0 * fps),
    fps,
    config: { damping: 10, stiffness: 160 }
  });

  const bubble3Progress = spring({
    frame: frame - Math.round(6.2 * fps),
    fps,
    config: { damping: 10, stiffness: 160 }
  });

  // Micro-floating organic bobbing for speech bubbles
  const bob1 = Math.sin((frame / fps) * 3.5) * 4;
  const bob2 = Math.cos((frame / fps) * 3.2) * 5;
  const bob3 = Math.sin((frame / fps) * 4.0) * 4;

  return (
    <div
      style={{
        position: 'relative',
        width: 780,
        height: 380,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end'
      }}
    >
      {/* Volumetric Cyan Back-Glow for RAM Stick (#4daeeb) */}
      <div
        style={{
          position: 'absolute',
          top: 40,
          left: '38%',
          width: 200,
          height: 200,
          background: 'radial-gradient(circle, rgba(77, 174, 235, 0.5) 0%, rgba(77, 174, 235, 0.15) 50%, transparent 75%)',
          filter: 'blur(18px)',
          pointerEvents: 'none'
        }}
      />

      {/* 3D Claymorphic Characters (De-Contained Floating Cutout) */}
      <Img
        src={staticFile('it_team_cutout.png')}
        style={{
          height: 380,
          objectFit: 'contain',
          filter: 'drop-shadow(0 25px 45px rgba(0, 0, 0, 0.8)) drop-shadow(0 0 25px rgba(77, 174, 235, 0.15))'
        }}
      />

      {/* ── SPEECH BUBBLE 1: SysAdmin (Left) ── */}
      {currentTime >= 3.8 && (
        <div
          style={{
            position: 'absolute',
            left: 20,
            top: 40 + bob1,
            transform: `scale(${Math.max(0, bubble1Progress)})`,
            transformOrigin: '70% 100%',
            background: '#FFFFFF',
            border: '2px solid #4daeeb',
            borderRadius: 12,
            padding: '10px 18px',
            fontSize: 16,
            fontWeight: 900,
            color: '#0F172A',
            fontFamily: IndustrialTheme.fonts.sans,
            whiteSpace: 'nowrap',
            boxShadow: '0 12px 30px rgba(77, 174, 235, 0.35)',
            zIndex: 10
          }}
        >
          <span style={{ color: '#4daeeb', marginRight: 4 }}>"</span>More RAM!<span style={{ color: '#4daeeb', marginLeft: 4 }}>"</span>
          <div
            style={{
              position: 'absolute',
              bottom: -8,
              right: 24,
              width: 0,
              height: 0,
              borderLeft: '8px solid transparent',
              borderRight: '8px solid transparent',
              borderTop: '8px solid #4daeeb'
            }}
          />
        </div>
      )}

      {/* ── SPEECH BUBBLE 2: Cloud Architect (Middle) ── */}
      {currentTime >= 4.8 && (
        <div
          style={{
            position: 'absolute',
            left: '35%',
            top: 0 + bob2,
            transform: `scale(${Math.max(0, bubble2Progress)})`,
            transformOrigin: '50% 100%',
            background: '#FFFFFF',
            border: '2px solid #4daeeb',
            borderRadius: 12,
            padding: '10px 18px',
            fontSize: 16,
            fontWeight: 900,
            color: '#0F172A',
            fontFamily: IndustrialTheme.fonts.sans,
            whiteSpace: 'nowrap',
            boxShadow: '0 12px 30px rgba(77, 174, 235, 0.35)',
            zIndex: 10
          }}
        >
          <span style={{ color: '#4daeeb', marginRight: 4 }}>"</span>Scale to 128 GB!<span style={{ color: '#4daeeb', marginLeft: 4 }}>"</span>
          <div
            style={{
              position: 'absolute',
              bottom: -8,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '8px solid transparent',
              borderRight: '8px solid transparent',
              borderTop: '8px solid #4daeeb'
            }}
          />
        </div>
      )}

      {/* ── SPEECH BUBBLE 3: DevOps (Right) ── */}
      {currentTime >= 6.0 && (
        <div
          style={{
            position: 'absolute',
            right: 10,
            top: 30 + bob3,
            transform: `scale(${Math.max(0, bubble3Progress)})`,
            transformOrigin: '30% 100%',
            background: '#FFFFFF',
            border: '2px solid #4daeeb',
            borderRadius: 12,
            padding: '10px 18px',
            fontSize: 16,
            fontWeight: 900,
            color: '#0F172A',
            fontFamily: IndustrialTheme.fonts.sans,
            whiteSpace: 'nowrap',
            boxShadow: '0 12px 30px rgba(77, 174, 235, 0.35)',
            zIndex: 10
          }}
        >
          <span style={{ color: '#4daeeb', marginRight: 4 }}>"</span>Spin up another VM!<span style={{ color: '#4daeeb', marginLeft: 4 }}>"</span>
          <div
            style={{
              position: 'absolute',
              bottom: -8,
              left: 24,
              width: 0,
              height: 0,
              borderLeft: '8px solid transparent',
              borderRight: '8px solid transparent',
              borderTop: '8px solid #4daeeb'
            }}
          />
        </div>
      )}
    </div>
  );
};
