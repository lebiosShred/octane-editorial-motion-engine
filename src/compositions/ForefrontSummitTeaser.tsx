import React from 'react';
import { AbsoluteFill, Audio, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

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

  // Text animation helper (slam in + subtle float)
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

  // Footage zoom helper
  const getZoom = (startSec: number, endSec: number) => {
    return interpolate(currentTime, [startSec, endSec], [1.0, 1.08], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp'
    });
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
      {/* Import Inter 900 Font */}
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

      {/* High-Energy Teaser Music (Direct from Reference Video) */}
      <Audio src={staticFile('craft_teaser_music.mp3')} volume={1.0} />

      {/* ══════════════════════════════════════════════════════════════
          SCENE 1: SYDNEY / EVENT INTRO (0.0s - 4.5s)
          Footage: Sydney Darling Harbour / ICC Dusk Skyline
          Text: FINANCE TRANSFORMATION SUMMIT NSW
         ══════════════════════════════════════════════════════════════ */}
      {currentTime < 4.5 && (
        <AbsoluteFill style={{ opacity: interpolate(currentTime, [4.2, 4.5], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) }}>
          <Img
            src={staticFile('broll_skyline.jpg')}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: `scale(${getZoom(0, 4.5)})`
            }}
          />
          {/* Cinematic Dark Overlay */}
          <AbsoluteFill style={{ background: 'radial-gradient(circle, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.7) 100%)' }} />

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
              ...getTextMotion(0.2, 4.5)
            }}
          >
            <div
              style={{
                fontSize: 20,
                fontWeight: 900,
                letterSpacing: '0.16em',
                fontFamily: "'JetBrains Mono', monospace",
                color: '#D8F209',
                textTransform: 'uppercase'
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
                textShadow: '0 10px 40px rgba(0,0,0,0.9)'
              }}
            >
              Finance Transformation <br />
              <span style={{ color: '#4daeeb' }}>Summit NSW</span>
            </div>
          </div>
        </AbsoluteFill>
      )}

      {/* ══════════════════════════════════════════════════════════════
          SCENE 2: 200+ LEADERS & CFOS (4.5s - 9.5s)
          Footage: ICC Sydney 1800+ Auditorium & Audience
          Text: 200+ ATTENDEES / FINANCE LEADERS & CFOS
         ══════════════════════════════════════════════════════════════ */}
      {currentTime >= 4.3 && currentTime < 9.5 && (
        <AbsoluteFill style={{ opacity: interpolate(currentTime, [4.3, 4.6, 9.2, 9.5], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) }}>
          <Img
            src={staticFile('broll_auditorium.jpg')}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: `scale(${getZoom(4.5, 9.5)})`
            }}
          />
          <AbsoluteFill style={{ background: 'radial-gradient(circle, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.65) 100%)' }} />

          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 12,
              ...getTextMotion(4.6, 9.5)
            }}
          >
            <div
              style={{
                fontSize: 96,
                fontWeight: 900,
                letterSpacing: '-0.04em',
                textAlign: 'center',
                lineHeight: 1.0,
                textShadow: '0 10px 40px rgba(0,0,0,0.9)'
              }}
            >
              200+ attendees
            </div>
            <div
              style={{
                fontSize: 28,
                fontWeight: 900,
                letterSpacing: '0.1em',
                fontFamily: "'JetBrains Mono', monospace",
                color: '#D8F209',
                textTransform: 'uppercase'
              }}
            >
              Finance Leaders & CFOs
            </div>
          </div>
        </AbsoluteFill>
      )}

      {/* ══════════════════════════════════════════════════════════════
          SCENE 3: KEYNOTE SPEAKERS & INNOVATION (9.5s - 15.0s)
          Footage: Keynote Speaker on Stage with Visuals
          Text: KEYNOTE SPEAKERS / FUTURE OF FP&A
         ══════════════════════════════════════════════════════════════ */}
      {currentTime >= 9.3 && currentTime < 15.0 && (
        <AbsoluteFill style={{ opacity: interpolate(currentTime, [9.3, 9.6, 14.7, 15.0], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) }}>
          <Img
            src={staticFile('broll_speaker.jpg')}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: `scale(${getZoom(9.5, 15.0)})`
            }}
          />
          <AbsoluteFill style={{ background: 'radial-gradient(circle, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.65) 100%)' }} />

          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 14,
              ...getTextMotion(9.6, 15.0)
            }}
          >
            <div
              style={{
                fontSize: 84,
                fontWeight: 900,
                letterSpacing: '-0.03em',
                textAlign: 'center',
                lineHeight: 1.0,
                textShadow: '0 10px 40px rgba(0,0,0,0.9)'
              }}
            >
              Industry Keynotes
            </div>
            <div
              style={{
                fontSize: 26,
                fontWeight: 900,
                letterSpacing: '0.08em',
                fontFamily: "'JetBrains Mono', monospace",
                color: '#4daeeb',
                textTransform: 'uppercase'
              }}
            >
              Enterprise Transformation & Planning Strategy
            </div>
          </div>
        </AbsoluteFill>
      )}

      {/* ══════════════════════════════════════════════════════════════
          SCENE 4: IBM PLANNING ANALYTICS & AGENTIC AI (15.0s - 21.0s)
          Footage: Modern AI Finance Dashboard on Tablet
          Text: IBM PLANNING ANALYTICS // AGENTIC AI
         ══════════════════════════════════════════════════════════════ */}
      {currentTime >= 14.8 && currentTime < 21.0 && (
        <AbsoluteFill style={{ opacity: interpolate(currentTime, [14.8, 15.1, 20.7, 21.0], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) }}>
          <Img
            src={staticFile('broll_ai_screen.jpg')}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: `scale(${getZoom(15.0, 21.0)})`
            }}
          />
          <AbsoluteFill style={{ background: 'radial-gradient(circle, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.7) 100%)' }} />

          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 16,
              ...getTextMotion(15.1, 21.0)
            }}
          >
            <div
              style={{
                fontSize: 64,
                fontWeight: 900,
                letterSpacing: '-0.03em',
                textAlign: 'center',
                lineHeight: 1.15,
                textShadow: '0 10px 40px rgba(0,0,0,0.9)'
              }}
            >
              IBM Planning Analytics <br />
              <span style={{ color: '#D8F209' }}>+ Agentic AI</span>
            </div>
            <div
              style={{
                fontSize: 22,
                fontWeight: 900,
                letterSpacing: '0.1em',
                fontFamily: "'JetBrains Mono', monospace",
                color: '#FFFFFF',
                textTransform: 'uppercase',
                background: 'rgba(77, 174, 235, 0.25)',
                border: '1.5px solid #4daeeb',
                padding: '6px 20px',
                borderRadius: 8
              }}
            >
              Autonomous FP&A • Sub-Second Models
            </div>
          </div>
        </AbsoluteFill>
      )}

      {/* ══════════════════════════════════════════════════════════════
          SCENE 5: DATE & VENUE COORDINATES (21.0s - 26.5s)
          Footage: Expo Booth Floor & Networking
          Text: SEPTEMBER 2, 2026 // ICC SYDNEY
         ══════════════════════════════════════════════════════════════ */}
      {currentTime >= 20.8 && currentTime < 26.5 && (
        <AbsoluteFill style={{ opacity: interpolate(currentTime, [20.8, 21.1, 26.2, 26.5], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) }}>
          <Img
            src={staticFile('broll_booth.jpg')}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: `scale(${getZoom(21.0, 26.5)})`
            }}
          />
          <AbsoluteFill style={{ background: 'radial-gradient(circle, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)' }} />

          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 14,
              ...getTextMotion(21.1, 26.5)
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
                textShadow: '0 10px 40px rgba(0,0,0,0.9)'
              }}
            >
              SEPTEMBER 2, 2026
            </div>
            <div
              style={{
                fontSize: 28,
                fontWeight: 900,
                letterSpacing: '0.12em',
                fontFamily: "'JetBrains Mono', monospace",
                color: '#D8F209',
                textTransform: 'uppercase'
              }}
            >
              ICC Sydney • Darling Harbour
            </div>
          </div>
        </AbsoluteFill>
      )}

      {/* ══════════════════════════════════════════════════════════════
          SCENE 6: SPONSOR OUTRO & BOOTH 19 (26.5s - End / 33.0s)
          Theme: Craft Hub Style Closing Logo + Octane Booth 19 Callout
         ══════════════════════════════════════════════════════════════ */}
      {currentTime >= 26.3 && (
        <AbsoluteFill
          style={{
            backgroundColor: '#06070B',
            opacity: interpolate(currentTime, [26.3, 26.7], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {/* Background Ambient Radial Glow */}
          <div
            style={{
              position: 'absolute',
              width: 900,
              height: 900,
              background: 'radial-gradient(circle, rgba(43, 25, 242, 0.35) 0%, rgba(77, 174, 235, 0.15) 50%, transparent 70%)',
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
              ...getTextMotion(26.6, 33.0)
            }}
          >
            {/* Sponsor Eyebrow Badge */}
            <div
              style={{
                background: '#D8F209',
                color: '#06070B',
                padding: '8px 24px',
                borderRadius: 6,
                fontSize: 14,
                fontWeight: 900,
                fontFamily: "'JetBrains Mono', monospace",
                letterSpacing: '0.14em',
                textTransform: 'uppercase'
              }}
            >
              PROUD EVENT SPONSOR
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
                boxShadow: '0 20px 60px rgba(77, 174, 235, 0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: 16
              }}
            >
              <span style={{ color: '#D8F209' }}>BOOTH 19</span>
              <span style={{ color: '#4daeeb' }}>•</span>
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
            fontSize: 14,
            fontWeight: 900,
            fontFamily: "'JetBrains Mono', monospace",
            letterSpacing: '0.12em',
            color: '#FFFFFF',
            background: 'rgba(0,0,0,0.6)',
            padding: '6px 14px',
            borderRadius: 6,
            border: '1px solid rgba(255,255,255,0.15)'
          }}
        >
          FOREFRONT // SYDNEY 2026
        </span>
      </div>
    </AbsoluteFill>
  );
};
