import React from 'react';
import { AbsoluteFill, Audio, Video, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

export const ForefrontSummitTeaser: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentTime = frame / fps;

  // Spring animation helper
  const getSpring = (startSec: number) => {
    return spring({
      frame: Math.max(0, frame - Math.round(startSec * fps)),
      fps,
      config: { mass: 0.5, damping: 12, stiffness: 140 }
    });
  };

  // Text animation helper (slam in + subtle scale)
  const getTextMotion = (startSec: number, endSec: number) => {
    const sp = getSpring(startSec);
    const opacity = interpolate(currentTime, [startSec, startSec + 0.25, endSec - 0.25, endSec], [0, 1, 1, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp'
    });
    const scale = interpolate(sp, [0, 1], [0.85, 1]);
    const translateY = interpolate(sp, [0, 1], [25, 0]);
    return { opacity, transform: `scale(${scale}) translateY(${translateY}px)` };
  };

  const videoStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    filter: 'brightness(0.9) contrast(1.1)'
  };

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#000000',
        fontFamily: "'Inter', sans-serif",
        color: '#FFFFFF',
        overflow: 'hidden'
      }}
    >
      {/* Import Inter 900 & JetBrains Mono Fonts */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@700;800;900&family=JetBrains+Mono:wght@800;900&display=swap');
          * {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            text-rendering: geometricPrecision;
          }
        `}
      </style>

      {/* Original High-Energy Royalty-Free Trailer Music */}
      <Audio src={staticFile('forefront_hype_music.mp3')} volume={1.0} />

      {/* ══════════════════════════════════════════════════════════════
          SCENE 1: EVENT TITLE & SYDNEY (0.0s - 5.0s)
          Real Footage: Sydney Harbour & City (vid_sydney.mp4)
          Text: FINANCE TRANSFORMATION SUMMIT NSW // SYDNEY
         ══════════════════════════════════════════════════════════════ */}
      {currentTime < 5.0 && (
        <AbsoluteFill style={{ opacity: interpolate(currentTime, [4.7, 5.0], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) }}>
          <Video src={staticFile('vid_sydney.mp4')} style={videoStyle} />
          {/* Subtle Octane Dark Vignette */}
          <AbsoluteFill style={{ background: 'radial-gradient(circle, rgba(0,0,0,0.3) 0%, rgba(9,10,12,0.8) 100%)' }} />

          {/* Centered Kinetic Text */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 16,
              ...getTextMotion(0.2, 5.0)
            }}
          >
            <div
              style={{
                fontSize: 18,
                fontWeight: 900,
                letterSpacing: '0.18em',
                fontFamily: "'JetBrains Mono', monospace",
                color: '#4daeeb',
                textTransform: 'uppercase',
                background: 'rgba(9, 10, 12, 0.85)',
                border: '1.5px solid #4daeeb',
                padding: '6px 20px',
                borderRadius: 8
              }}
            >
              FOREFRONT EVENTS PRESENTS
            </div>
            <div
              style={{
                fontSize: 68,
                fontWeight: 900,
                letterSpacing: '-0.03em',
                textAlign: 'center',
                lineHeight: 1.1,
                maxWidth: 1200,
                textTransform: 'uppercase',
                textShadow: '0 10px 40px rgba(0,0,0,0.95)'
              }}
            >
              Finance Transformation <br />
              <span style={{ color: '#4daeeb' }}>Summit NSW</span>
            </div>
          </div>
        </AbsoluteFill>
      )}

      {/* ══════════════════════════════════════════════════════════════
          SCENE 2: 200+ ATTENDEES & CFOS (5.0s - 10.0s)
          Real Footage: Boardroom Leadership Gathering (vid_boardroom.mp4)
          Text: 200+ ATTENDEES // FINANCE LEADERS & CFOS
         ══════════════════════════════════════════════════════════════ */}
      {currentTime >= 4.8 && currentTime < 10.0 && (
        <AbsoluteFill style={{ opacity: interpolate(currentTime, [4.8, 5.1, 9.7, 10.0], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) }}>
          <Video src={staticFile('vid_boardroom.mp4')} style={videoStyle} />
          <AbsoluteFill style={{ background: 'radial-gradient(circle, rgba(0,0,0,0.25) 0%, rgba(9,10,12,0.75) 100%)' }} />

          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 14,
              ...getTextMotion(5.1, 10.0)
            }}
          >
            <div
              style={{
                fontSize: 96,
                fontWeight: 900,
                letterSpacing: '-0.04em',
                textAlign: 'center',
                lineHeight: 1.0,
                textShadow: '0 10px 40px rgba(0,0,0,0.95)'
              }}
            >
              200+ attendees
            </div>
            <div
              style={{
                fontSize: 26,
                fontWeight: 900,
                letterSpacing: '0.12em',
                fontFamily: "'JetBrains Mono', monospace",
                color: '#4daeeb',
                textTransform: 'uppercase',
                background: 'rgba(9, 10, 12, 0.85)',
                border: '1.5px solid rgba(77, 174, 235, 0.5)',
                padding: '6px 20px',
                borderRadius: 8
              }}
            >
              Finance Leaders & CFOs
            </div>
          </div>
        </AbsoluteFill>
      )}

      {/* ══════════════════════════════════════════════════════════════
          SCENE 3: KEYNOTE PRESENTATION (10.0s - 15.5s)
          Real Footage: Modern Enterprise Workspace (vid_office.mp4)
          Text: INDUSTRY KEYNOTES // MODERN FP&A AGILITY
         ══════════════════════════════════════════════════════════════ */}
      {currentTime >= 9.8 && currentTime < 15.5 && (
        <AbsoluteFill style={{ opacity: interpolate(currentTime, [9.8, 10.1, 15.2, 15.5], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) }}>
          <Video src={staticFile('vid_office.mp4')} style={videoStyle} />
          <AbsoluteFill style={{ background: 'radial-gradient(circle, rgba(0,0,0,0.25) 0%, rgba(9,10,12,0.75) 100%)' }} />

          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 16,
              ...getTextMotion(10.1, 15.5)
            }}
          >
            <div
              style={{
                fontSize: 84,
                fontWeight: 900,
                letterSpacing: '-0.03em',
                textAlign: 'center',
                lineHeight: 1.0,
                textShadow: '0 10px 40px rgba(0,0,0,0.95)'
              }}
            >
              Industry Keynotes
            </div>
            <div
              style={{
                fontSize: 24,
                fontWeight: 900,
                letterSpacing: '0.1em',
                fontFamily: "'JetBrains Mono', monospace",
                color: '#4daeeb',
                textTransform: 'uppercase',
                background: 'rgba(9, 10, 12, 0.85)',
                border: '1.5px solid rgba(77, 174, 235, 0.5)',
                padding: '6px 20px',
                borderRadius: 8
              }}
            >
              Enterprise Transformation & Planning Strategy
            </div>
          </div>
        </AbsoluteFill>
      )}

      {/* ══════════════════════════════════════════════════════════════
          SCENE 4: IBM PLANNING ANALYTICS & AGENTIC AI (15.5s - 21.0s)
          Real Footage: Collaborative Planning & Modeling (vid_boardroom.mp4)
          Text: IBM PLANNING ANALYTICS + AGENTIC AI
         ══════════════════════════════════════════════════════════════ */}
      {currentTime >= 15.3 && currentTime < 21.0 && (
        <AbsoluteFill style={{ opacity: interpolate(currentTime, [15.3, 15.6, 20.7, 21.0], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) }}>
          <Video src={staticFile('vid_boardroom.mp4')} style={videoStyle} />
          <AbsoluteFill style={{ background: 'radial-gradient(circle, rgba(0,0,0,0.3) 0%, rgba(9,10,12,0.8) 100%)' }} />

          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 16,
              ...getTextMotion(15.6, 21.0)
            }}
          >
            <div
              style={{
                fontSize: 66,
                fontWeight: 900,
                letterSpacing: '-0.03em',
                textAlign: 'center',
                lineHeight: 1.15,
                textShadow: '0 10px 40px rgba(0,0,0,0.95)'
              }}
            >
              IBM Planning Analytics <br />
              <span style={{ color: '#4daeeb' }}>+ Agentic AI</span>
            </div>
            <div
              style={{
                fontSize: 22,
                fontWeight: 900,
                letterSpacing: '0.1em',
                fontFamily: "'JetBrains Mono', monospace",
                color: '#FFFFFF',
                textTransform: 'uppercase',
                background: 'rgba(9, 10, 12, 0.9)',
                border: '1.5px solid #4daeeb',
                padding: '8px 24px',
                borderRadius: 8
              }}
            >
              Autonomous FP&A • Sub-Second Models
            </div>
          </div>
        </AbsoluteFill>
      )}

      {/* ══════════════════════════════════════════════════════════════
          SCENE 5: DATE & VENUE COORDINATES (21.0s - 26.0s)
          Real Footage: Sydney Harbour & City (vid_sydney.mp4)
          Text: SEPTEMBER 2, 2026 // ICC SYDNEY
         ══════════════════════════════════════════════════════════════ */}
      {currentTime >= 20.8 && currentTime < 26.0 && (
        <AbsoluteFill style={{ opacity: interpolate(currentTime, [20.8, 21.1, 25.7, 26.0], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) }}>
          <Video src={staticFile('vid_sydney.mp4')} style={videoStyle} />
          <AbsoluteFill style={{ background: 'radial-gradient(circle, rgba(0,0,0,0.25) 0%, rgba(9,10,12,0.75) 100%)' }} />

          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 14,
              ...getTextMotion(21.1, 26.0)
            }}
          >
            <div
              style={{
                fontSize: 88,
                fontWeight: 900,
                letterSpacing: '-0.04em',
                textAlign: 'center',
                lineHeight: 1.0,
                textTransform: 'uppercase',
                textShadow: '0 10px 40px rgba(0,0,0,0.95)'
              }}
            >
              SEPTEMBER 2, 2026
            </div>
            <div
              style={{
                fontSize: 26,
                fontWeight: 900,
                letterSpacing: '0.12em',
                fontFamily: "'JetBrains Mono', monospace",
                color: '#4daeeb',
                textTransform: 'uppercase',
                background: 'rgba(9, 10, 12, 0.85)',
                border: '1.5px solid rgba(77, 174, 235, 0.5)',
                padding: '6px 22px',
                borderRadius: 8
              }}
            >
              ICC Sydney • Darling Harbour
            </div>
          </div>
        </AbsoluteFill>
      )}

      {/* ══════════════════════════════════════════════════════════════
          SCENE 6: SPONSOR OUTRO & BOOTH 19 (26.0s - End / 31.0s)
          Theme: Clean Octane Obsidian Void + Booth 19 Hero Callout
         ══════════════════════════════════════════════════════════════ */}
      {currentTime >= 25.8 && (
        <AbsoluteFill
          style={{
            backgroundColor: '#000000',
            opacity: interpolate(currentTime, [25.8, 26.2], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {/* Octane Radial Ambient Glow */}
          <div
            style={{
              position: 'absolute',
              width: 900,
              height: 900,
              background: 'radial-gradient(circle, rgba(77, 174, 235, 0.18) 0%, transparent 65%)',
              borderRadius: '50%'
            }}
          />

          <div
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: 20,
              ...getTextMotion(26.2, 31.0)
            }}
          >
            {/* Sponsor Eyebrow Badge */}
            <div
              style={{
                background: 'rgba(77, 174, 235, 0.12)',
                border: '1.5px solid #4daeeb',
                color: '#4daeeb',
                padding: '8px 24px',
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 900,
                fontFamily: "'JetBrains Mono', monospace",
                letterSpacing: '0.14em',
                textTransform: 'uppercase'
              }}
            >
              OFFICIAL EVENT SPONSOR
            </div>

            {/* Main Octane Brand Callout */}
            <div
              style={{
                fontSize: 64,
                fontWeight: 900,
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                color: '#FFFFFF'
              }}
            >
              Octane Software Solutions
            </div>

            {/* Subtext */}
            <div
              style={{
                fontSize: 22,
                color: '#94A3B8',
                maxWidth: 700,
                lineHeight: 1.5,
                fontWeight: 600
              }}
            >
              Enterprise Planning, Financial Transformation & Autonomous AI
            </div>

            {/* Hero Booth 19 Action Box */}
            <div
              style={{
                marginTop: 12,
                background: '#090A0C',
                border: '2px solid #4daeeb',
                padding: '20px 54px',
                borderRadius: 16,
                fontSize: 24,
                fontWeight: 900,
                fontFamily: "'JetBrains Mono', monospace",
                color: '#FFFFFF',
                boxShadow: '0 20px 60px rgba(77, 174, 235, 0.35)',
                display: 'flex',
                alignItems: 'center',
                gap: 16
              }}
            >
              <span style={{ color: '#4daeeb' }}>BOOTH 19</span>
              <span style={{ color: 'rgba(255,255,255,0.4)' }}>•</span>
              <span>COME FIND US & SAY HELLO</span>
            </div>
          </div>
        </AbsoluteFill>
      )}

      {/* Persistent Bottom-Right Watermark */}
      <div
        style={{
          position: 'absolute',
          bottom: 36,
          right: 48,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          opacity: 0.85
        }}
      >
        <span
          style={{
            fontSize: 13,
            fontWeight: 900,
            fontFamily: "'JetBrains Mono', monospace",
            letterSpacing: '0.12em',
            color: '#FFFFFF',
            background: 'rgba(9, 10, 12, 0.85)',
            padding: '6px 14px',
            borderRadius: 6,
            border: '1px solid rgba(77, 174, 235, 0.4)'
          }}
        >
          FOREFRONT // SYDNEY 2026
        </span>
      </div>
    </AbsoluteFill>
  );
};
