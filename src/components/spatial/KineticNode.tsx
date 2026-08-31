import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { IndustrialTheme } from '../../types/theme';

interface KineticNodeProps {
  x: number;
  y: number;
  width: number;
  title: string;
  badge?: string;
  badgeType?: 'crimson' | 'mint' | 'amber' | 'slate';
  isActive?: boolean;
  entranceDelayFrames?: number;
  cameraPanX: number;
  cameraPanY: number;
  children: React.ReactNode;
}

export const KineticNode: React.FC<KineticNodeProps> = ({
  x,
  y,
  width,
  title,
  badge,
  badgeType = 'slate',
  isActive = true,
  entranceDelayFrames = 0,
  cameraPanX,
  cameraPanY,
  children
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── PHASE 1: CHASSIS SPRING ASSEMBLY ──
  const relFrame = Math.max(0, frame - entranceDelayFrames);
  const chassisSpring = spring({
    frame: relFrame,
    fps,
    config: { damping: 13, stiffness: 120, mass: 0.85 }
  });

  const chassisOpacity = interpolate(relFrame, [0, 8], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });

  // ── PHASE 2: HEADER & BADGE MICRO-STAGGER (+4 frames) ──
  const headerRel = Math.max(0, relFrame - 4);
  const headerSpring = spring({
    frame: headerRel,
    fps,
    config: { damping: 14, stiffness: 130 }
  });
  const headerOpacity = interpolate(headerRel, [0, 6], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });

  // ── PHASE 3 & 4: BODY CONTENT BLOOM (+8 frames) ──
  const bodyRel = Math.max(0, relFrame - 8);
  const bodySpring = spring({
    frame: bodyRel,
    fps,
    config: { damping: 14, stiffness: 120 }
  });
  const bodyOpacity = interpolate(bodyRel, [0, 8], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });

  // ── 2.5D INERTIAL PERSPECTIVE TILT ──
  const deltaX = (x + cameraPanX);
  const deltaY = (y + cameraPanY);

  const tiltY = interpolate(deltaX, [-1500, 1500], [5.0, -5.0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });

  const tiltX = interpolate(deltaY, [-900, 900], [-3.5, 3.5], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });

  // Organic micro-harmonic float
  const harmonicFloat = Math.sin((frame + (x * 0.05)) * 0.04) * 3;

  // ── SPECULAR LIGHT GLINT SWEEP ──
  const glintProgress = interpolate(relFrame, [6, 26], [-100, 220], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });

  // Badge Palette
  const badgeColors = {
    crimson: { bg: IndustrialTheme.signals.crimsonBg, text: IndustrialTheme.signals.crimson, border: IndustrialTheme.signals.crimsonBorder },
    mint: { bg: IndustrialTheme.signals.mintBg, text: IndustrialTheme.signals.mint, border: IndustrialTheme.signals.mintBorder },
    amber: { bg: IndustrialTheme.signals.amberBg, text: IndustrialTheme.signals.amber, border: IndustrialTheme.signals.amberBorder },
    slate: { bg: '#F1F5F9', text: '#475569', border: '#CBD5E1' }
  }[badgeType];

  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        width,
        perspective: 1200,
        transform: `translate3d(calc(-50% + ${x}px), calc(-50% + ${y + harmonicFloat}px), 0)`,
        pointerEvents: 'none',
        fontFamily: IndustrialTheme.fonts.sans,
        ...IndustrialTheme.typography.antialiased
      }}
    >
      {/* 2.5D Tilted Ceramic Chassis */}
      <div
        style={{
          width: '100%',
          background: IndustrialTheme.popout.chassisBg,
          border: isActive
            ? '1.5px solid rgba(15, 23, 42, 0.16)'
            : '1px solid rgba(0, 0, 0, 0.06)',
          borderRadius: 24,
          boxShadow: isActive
            ? '0 35px 80px -10px rgba(0, 0, 0, 0.55), 0 15px 35px -6px rgba(0, 0, 0, 0.35)'
            : '0 12px 28px -5px rgba(0, 0, 0, 0.25)',
          padding: '24px 30px',
          color: IndustrialTheme.text.hero,
          position: 'relative',
          opacity: chassisOpacity,
          transform: `scale(${chassisSpring}) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(0)`,
          transformOrigin: '50% 50%',
          transformStyle: 'preserve-3d',
          overflow: 'hidden',
          transition: 'box-shadow 0.3s ease-out, border 0.3s ease-out',
          backfaceVisibility: 'hidden',
          willChange: 'transform'
        }}
      >
        {/* Specular Light Sheen Glint Sweep */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            background: `linear-gradient(115deg, transparent 40%, rgba(255, 255, 255, 0.6) 50%, transparent 60%)`,
            transform: `translateX(${glintProgress}%)`,
            zIndex: 30
          }}
        />

        {/* Precision Corner Registration Ticks */}
        <div style={{ position: 'absolute', top: 8, left: 10, fontSize: 14, color: 'rgba(0,0,0,0.22)', fontFamily: IndustrialTheme.fonts.mono }}>┌</div>
        <div style={{ position: 'absolute', top: 8, right: 10, fontSize: 14, color: 'rgba(0,0,0,0.22)', fontFamily: IndustrialTheme.fonts.mono }}>┐</div>
        <div style={{ position: 'absolute', bottom: 8, left: 10, fontSize: 14, color: 'rgba(0,0,0,0.22)', fontFamily: IndustrialTheme.fonts.mono }}>└</div>
        <div style={{ position: 'absolute', bottom: 8, right: 10, fontSize: 14, color: 'rgba(0,0,0,0.22)', fontFamily: IndustrialTheme.fonts.mono }}>┘</div>

        {/* ── PHASE 2: HEADER & BADGE ── */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 16,
            opacity: headerOpacity,
            transform: `translateY(${interpolate(headerSpring, [0, 1], [8, 0])}px)`
          }}
        >
          <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-0.02em', color: IndustrialTheme.text.hero }}>
            {title}
          </div>
          {badge && (
            <span
              style={{
                fontSize: 12,
                fontWeight: 800,
                letterSpacing: '0.08em',
                fontFamily: IndustrialTheme.fonts.mono,
                color: badgeColors.text,
                background: badgeColors.bg,
                border: `1px solid ${badgeColors.border}`,
                padding: '4px 12px',
                borderRadius: 6,
                textTransform: 'uppercase'
              }}
            >
              {badge}
            </span>
          )}
        </div>

        {/* ── PHASE 3 & 4: BODY CONTENT ── */}
        <div
          style={{
            opacity: bodyOpacity,
            transform: `translateY(${interpolate(bodySpring, [0, 1], [10, 0])}px) scale(${interpolate(bodySpring, [0, 1], [0.97, 1])})`
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
