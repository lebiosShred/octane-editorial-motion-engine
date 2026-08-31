import React from 'react';
import { Img, staticFile, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { IndustrialTheme } from '../../types/theme';

export const InfraTeamHumorCard: React.FC<{ ramVal?: number }> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentTime = frame / fps;

  // Staggered spring animations aligned to narrator's IT delivery (t = 4.2s, 5.2s, 6.4s)
  const bubble1Progress = spring({
    frame: frame - Math.round(4.2 * fps),
    fps,
    config: { damping: 10, stiffness: 160 }
  });

  const bubble2Progress = spring({
    frame: frame - Math.round(5.2 * fps),
    fps,
    config: { damping: 10, stiffness: 160 }
  });

  const bubble3Progress = spring({
    frame: frame - Math.round(6.4 * fps),
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
      {/* Volumetric Emerald Back-Glow for RAM Stick */}
      <div
        style={{
          position: 'absolute',
          top: 40,
          left: '38%',
          width: 180,
          height: 180,
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.45) 0%, rgba(16, 185, 129, 0.1) 50%, transparent 75%)',
          filter: 'blur(16px)',
          pointerEvents: 'none'
        }}
      />

      {/* 3D Claymorphic Characters (De-Contained Floating Cutout) */}
      <Img
        src={staticFile('it_team_cutout.png')}
        style={{
          height: 380,
          objectFit: 'contain',
          filter: 'drop-shadow(0 25px 45px rgba(0, 0, 0, 0.8)) drop-shadow(0 0 20px rgba(255, 255, 255, 0.05))'
        }}
      />

      {/* ── SPEECH BUBBLE 1: SysAdmin (Left) ── */}
      {currentTime >= 4.0 && (
        <div
          style={{
            position: 'absolute',
            left: 20,
            top: 40 + bob1,
            transform: `scale(${Math.max(0, bubble1Progress)})`,
            transformOrigin: '70% 100%',
            background: '#FEF3C7',
            border: '2px solid #F59E0B',
            borderRadius: 12,
            padding: '10px 18px',
            fontSize: 16,
            fontWeight: 900,
            color: '#B45309',
            fontFamily: IndustrialTheme.fonts.sans,
            whiteSpace: 'nowrap',
            boxShadow: '0 12px 30px rgba(245, 158, 11, 0.35)',
            zIndex: 10
          }}
        >
          "More RAM!"
          <div
            style={{
              position: 'absolute',
              bottom: -8,
              right: 24,
              width: 0,
              height: 0,
              borderLeft: '8px solid transparent',
              borderRight: '8px solid transparent',
              borderTop: '8px solid #F59E0B'
            }}
          />
        </div>
      )}

      {/* ── SPEECH BUBBLE 2: Cloud Architect (Middle) ── */}
      {currentTime >= 5.0 && (
        <div
          style={{
            position: 'absolute',
            left: '35%',
            top: 0 + bob2,
            transform: `scale(${Math.max(0, bubble2Progress)})`,
            transformOrigin: '50% 100%',
            background: '#FFE4E6',
            border: '2px solid #E11D48',
            borderRadius: 12,
            padding: '10px 18px',
            fontSize: 16,
            fontWeight: 900,
            color: '#BE123C',
            fontFamily: IndustrialTheme.fonts.sans,
            whiteSpace: 'nowrap',
            boxShadow: '0 12px 30px rgba(225, 29, 72, 0.35)',
            zIndex: 10
          }}
        >
          "Scale to 128 GB!"
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
              borderTop: '8px solid #E11D48'
            }}
          />
        </div>
      )}

      {/* ── SPEECH BUBBLE 3: DevOps (Right) ── */}
      {currentTime >= 6.2 && (
        <div
          style={{
            position: 'absolute',
            right: 10,
            top: 30 + bob3,
            transform: `scale(${Math.max(0, bubble3Progress)})`,
            transformOrigin: '30% 100%',
            background: '#E0F2FE',
            border: '2px solid #0284C7',
            borderRadius: 12,
            padding: '10px 18px',
            fontSize: 16,
            fontWeight: 900,
            color: '#0369A1',
            fontFamily: IndustrialTheme.fonts.sans,
            whiteSpace: 'nowrap',
            boxShadow: '0 12px 30px rgba(2, 132, 199, 0.35)',
            zIndex: 10
          }}
        >
          "Spin up another VM!"
          <div
            style={{
              position: 'absolute',
              bottom: -8,
              left: 24,
              width: 0,
              height: 0,
              borderLeft: '8px solid transparent',
              borderRight: '8px solid transparent',
              borderTop: '8px solid #0284C7'
            }}
          />
        </div>
      )}
    </div>
  );
};
