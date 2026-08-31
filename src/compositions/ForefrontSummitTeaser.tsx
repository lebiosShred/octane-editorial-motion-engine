import React from 'react';
import { AbsoluteFill, Audio, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

export const ForefrontSummitTeaser: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentTime = frame / fps;

  // Spring generators
  const getSpring = (startSec: number, damping = 12, stiffness = 120) => {
    return spring({
      frame: Math.max(0, frame - Math.round(startSec * fps)),
      fps,
      config: { mass: 0.6, damping, stiffness }
    });
  };

  const s1Spring = getSpring(0.0);
  const s2Spring = getSpring(3.8);
  const s3Spring = getSpring(12.5);
  const s4Spring = getSpring(17.0);
  const s5Spring = getSpring(25.5);
  const s6Spring = getSpring(32.2);

  // Dynamic values
  const leaderCount = interpolate(currentTime, [4.5, 7.5], [0, 200], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const pulseGlitch = (Math.sin(frame * 0.25) + 1) / 2;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#06070B',
        fontFamily: "'Inter', sans-serif",
        color: '#FFFFFF',
        overflow: 'hidden'
      }}
    >
      {/* Import Inter 900 & JetBrains Mono Fonts */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,400;0,600;0,700;0,800;0,900;1,800;1,900&family=JetBrains+Mono:wght@700;800;900&display=swap');
          * {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            text-rendering: geometricPrecision;
          }
        `}
      </style>

      {/* Voiceover Audio */}
      <Audio src={staticFile('forefront_voiceover.wav')} />

      {/* ══════════════════════════════════════════════════════════════
          SCENE 1: THE ARRIVAL (0.0s - 3.8s)
          Theme: High-Voltage Sydney Arrival + Skewed Badges
         ══════════════════════════════════════════════════════════════ */}
      {currentTime < 3.8 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 24,
            opacity: interpolate(currentTime, [3.4, 3.8], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
            transform: `scale(${0.9 + s1Spring * 0.1})`
          }}
        >
          {/* Top Skewed Event Pill */}
          <div
            style={{
              background: '#D8F209',
              color: '#06070B',
              padding: '10px 24px',
              borderRadius: 6,
              fontSize: 15,
              fontWeight: 900,
              fontFamily: "'JetBrains Mono', monospace",
              letterSpacing: '0.12em',
              transform: 'skewX(-8deg)',
              boxShadow: '0 0 30px rgba(216, 242, 9, 0.4)'
            }}
          >
            FINANCE TRANSFORMATION SUMMIT NSW
          </div>

          {/* Massive Kinetic Headline */}
          <div
            style={{
              fontSize: 82,
              fontWeight: 900,
              fontStyle: 'italic',
              letterSpacing: '-0.04em',
              textAlign: 'center',
              lineHeight: 1.05,
              textTransform: 'uppercase'
            }}
          >
            SYDNEY <span style={{ color: '#4daeeb' }}>//</span> <span style={{ color: '#D8F209' }}>SEPT 2</span>
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: '#94A3B8',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              fontFamily: "'JetBrains Mono', monospace"
            }}
          >
            ICC SYDNEY • INTERNATIONAL CONVENTION CENTRE
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          SCENE 2: THE SCALE & TRANSFORMATION SHIFT (3.8s - 12.5s)
          Theme: 200+ Leaders Gathering to Shape Enterprise Planning
         ══════════════════════════════════════════════════════════════ */}
      {currentTime >= 3.6 && currentTime < 12.5 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 36,
            opacity: interpolate(currentTime, [3.6, 4.0, 12.1, 12.5], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
            transform: `scale(${0.92 + s2Spring * 0.08})`
          }}
        >
          {/* Top Counter Card */}
          <div
            style={{
              display: 'flex',
              gap: 30,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <div
              style={{
                background: '#FFFFFF',
                color: '#06070B',
                borderRadius: 20,
                padding: '28px 46px',
                textAlign: 'center',
                boxShadow: '0 30px 80px rgba(0,0,0,0.9), 0 0 40px rgba(216, 242, 9, 0.2)',
                transform: 'skewX(-4deg)'
              }}
            >
              <div style={{ fontSize: 13, fontWeight: 900, fontFamily: "'JetBrains Mono', monospace", color: '#475569', letterSpacing: '0.1em' }}>
                EXPECTED ATTENDANCE
              </div>
              <div style={{ fontSize: 72, fontWeight: 900, fontFamily: "'JetBrains Mono', monospace", color: '#090A0C', lineHeight: 1, marginTop: 4 }}>
                {Math.round(leaderCount)}+
              </div>
              <div style={{ fontSize: 14, fontWeight: 800, color: '#4daeeb', marginTop: 4 }}>
                Finance Leaders & CFOs
              </div>
            </div>

            <div
              style={{
                background: 'linear-gradient(135deg, #1B0FDB, #2D14EC)',
                color: '#FFFFFF',
                borderRadius: 20,
                padding: '28px 46px',
                textAlign: 'center',
                boxShadow: '0 30px 80px rgba(0,0,0,0.9), 0 0 50px rgba(27, 15, 219, 0.4)',
                transform: 'skewX(-4deg)',
                border: '1.5px solid rgba(255,255,255,0.2)'
              }}
            >
              <div style={{ fontSize: 13, fontWeight: 900, fontFamily: "'JetBrains Mono', monospace", color: '#D8F209', letterSpacing: '0.1em' }}>
                TRANSFORMATION FOCUS
              </div>
              <div style={{ fontSize: 34, fontWeight: 900, fontStyle: 'italic', lineHeight: 1.2, marginTop: 8 }}>
                FUTURE OF FP&A
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'rgba(255,255,255,0.8)', marginTop: 8 }}>
                Next-Gen Cloud Architecture
              </div>
            </div>
          </div>

          {/* Hero Typography */}
          <div style={{ textAlign: 'center', maxWidth: 1100 }}>
            <div style={{ fontSize: 44, fontWeight: 900, fontStyle: 'italic', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
              Shaping the Future of <span style={{ color: '#D8F209' }}>Enterprise Planning</span> & <span style={{ color: '#4daeeb' }}>Decision Agility</span>.
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          SCENE 3: OCTANE IS PROUD TO SPONSOR (12.5s - 17.0s)
          Theme: Official Sponsorship Announcement + Forefront Summit Card
         ══════════════════════════════════════════════════════════════ */}
      {currentTime >= 12.3 && currentTime < 17.0 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 70,
            padding: '0 120px',
            opacity: interpolate(currentTime, [12.3, 12.7, 16.6, 17.0], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
            transform: `translate3d(0, ${(1 - s3Spring) * 30}px, 0)`
          }}
        >
          {/* Left Text */}
          <div style={{ flex: 1, maxWidth: 600 }}>
            <div
              style={{
                background: 'rgba(77, 174, 235, 0.15)',
                border: '1.5px solid #4daeeb',
                color: '#4daeeb',
                padding: '6px 16px',
                borderRadius: 6,
                fontSize: 13,
                fontWeight: 900,
                fontFamily: "'JetBrains Mono', monospace",
                display: 'inline-block',
                marginBottom: 16,
                letterSpacing: '0.1em'
              }}
            >
              OFFICIAL EVENT SPONSOR
            </div>
            <div style={{ fontSize: 48, fontWeight: 900, fontStyle: 'italic', lineHeight: 1.15, letterSpacing: '-0.03em' }}>
              Octane is Proud to Sponsor <span style={{ color: '#D8F209' }}>Forefront Sydney</span>.
            </div>
            <div style={{ fontSize: 18, color: '#94A3B8', marginTop: 16, lineHeight: 1.6, fontWeight: 500 }}>
              Supporting the finance leaders and innovators driving enterprise agility across Australia.
            </div>
          </div>

          {/* Right Card: Forefront Event Badge */}
          <div
            style={{
              width: 680,
              background: '#2B19F2',
              borderRadius: 24,
              padding: '36px 42px',
              boxShadow: '0 40px 100px rgba(0,0,0,0.95), 0 0 60px rgba(43, 25, 242, 0.4)',
              border: '2px solid rgba(216, 242, 9, 0.4)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Top Eyebrow */}
            <div style={{ fontSize: 13, fontWeight: 900, fontFamily: "'JetBrains Mono', monospace", color: '#D8F209', letterSpacing: '0.14em', marginBottom: 12 }}>
              SPONSORS OF THE
            </div>
            <div style={{ fontSize: 38, fontWeight: 900, color: '#FFFFFF', lineHeight: 1.15, marginBottom: 20 }}>
              Finance Transformation <span style={{ color: '#D8F209' }}>Summit NSW</span>
            </div>
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 18, fontWeight: 900, color: '#FFFFFF', fontFamily: "'JetBrains Mono', monospace" }}>2 SEPT 2026</div>
                <div style={{ fontSize: 13, color: '#94A3B8', marginTop: 2 }}>ICC Sydney: Darling Harbour</div>
              </div>
              <div
                style={{
                  background: '#090A0C',
                  color: '#4daeeb',
                  border: '1.5px solid #4daeeb',
                  padding: '8px 16px',
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 900,
                  fontFamily: "'JetBrains Mono', monospace"
                }}
              >
                BOOTH 19
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          SCENE 4: THE INNOVATION SHOWCASE (17.0s - 25.5s)
          Theme: IBM Planning Analytics + Agentic AI
         ══════════════════════════════════════════════════════════════ */}
      {currentTime >= 16.8 && currentTime < 25.5 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 32,
            opacity: interpolate(currentTime, [16.8, 17.2, 25.0, 25.5], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
            transform: `scale(${0.92 + s4Spring * 0.08})`
          }}
        >
          {/* Two Solution Cards */}
          <div style={{ display: 'flex', gap: 32, width: 1340, justifyContent: 'center' }}>
            {/* Card 1: IBM Planning Analytics */}
            <div
              style={{
                flex: 1,
                background: '#FFFFFF',
                color: '#090A0C',
                borderRadius: 22,
                padding: '32px 36px',
                boxShadow: '0 30px 80px rgba(0,0,0,0.9), 0 0 40px rgba(77, 174, 235, 0.2)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <span style={{ fontSize: 13, fontWeight: 900, fontFamily: "'JetBrains Mono', monospace", color: '#4daeeb', background: 'rgba(77, 174, 235, 0.12)', border: '1.5px solid #4daeeb', padding: '4px 10px', borderRadius: 6 }}>
                  ENTERPRISE MODELING
                </span>
                <span style={{ fontSize: 13, fontWeight: 900, fontFamily: "'JetBrains Mono', monospace", color: '#090A0C' }}>
                  SUB-SECOND
                </span>
              </div>
              <div style={{ fontSize: 26, fontWeight: 900, letterSpacing: '-0.02em', marginBottom: 10 }}>
                IBM Planning Analytics (TM1)
              </div>
              <div style={{ fontSize: 15, color: '#475569', lineHeight: 1.5, fontWeight: 500 }}>
                High-speed in-memory multi-dimensional calculations eliminating spreadsheet latency and data silos.
              </div>
            </div>

            {/* Card 2: Agentic AI for Finance */}
            <div
              style={{
                flex: 1,
                background: '#FFFFFF',
                color: '#090A0C',
                borderRadius: 22,
                padding: '32px 36px',
                boxShadow: '0 30px 80px rgba(0,0,0,0.9), 0 0 40px rgba(216, 242, 9, 0.25)',
                border: '1.5px solid rgba(216, 242, 9, 0.5)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <span style={{ fontSize: 13, fontWeight: 900, fontFamily: "'JetBrains Mono', monospace", color: '#06070B', background: '#D8F209', padding: '4px 10px', borderRadius: 6 }}>
                  AUTONOMOUS FP&A
                </span>
                <span style={{ fontSize: 13, fontWeight: 900, fontFamily: "'JetBrains Mono', monospace", color: '#4daeeb' }}>
                  AI AGENTS
                </span>
              </div>
              <div style={{ fontSize: 26, fontWeight: 900, letterSpacing: '-0.02em', marginBottom: 10 }}>
                Agentic AI Close & Forecast
              </div>
              <div style={{ fontSize: 15, color: '#475569', lineHeight: 1.5, fontWeight: 500 }}>
                Autonomous agents executing reconciliations, variance analysis, and instant natural language queries.
              </div>
            </div>
          </div>

          {/* Bottom Hero Copy */}
          <div style={{ textAlign: 'center', maxWidth: 1100 }}>
            <div style={{ fontSize: 38, fontWeight: 900, fontStyle: 'italic', lineHeight: 1.25, letterSpacing: '-0.02em' }}>
              Eliminating Month-End Bottlenecks & <span style={{ color: '#4daeeb' }}>Accelerating Financial Agility</span>.
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          SCENE 5: CONNECT WITH PEERS & ARCHITECTS (25.5s - 32.2s)
          Theme: Networking, Knowledge Exchange & FP&A in Action
         ══════════════════════════════════════════════════════════════ */}
      {currentTime >= 25.3 && currentTime < 32.2 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 36,
            opacity: interpolate(currentTime, [25.3, 25.7, 31.8, 32.2], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
            transform: `scale(${0.94 + s5Spring * 0.06})`
          }}
        >
          {/* Networking Feature Badges */}
          <div style={{ display: 'flex', gap: 20, justifyContent: 'center' }}>
            {['1-on-1 Solution Architecture', 'Peer Roundtable Insights', 'Live Agentic AI Demos'].map((item, idx) => (
              <div
                key={idx}
                style={{
                  background: '#090A0C',
                  border: '1.5px solid rgba(255,255,255,0.15)',
                  padding: '16px 28px',
                  borderRadius: 12,
                  fontSize: 16,
                  fontWeight: 800,
                  fontFamily: "'JetBrains Mono', monospace",
                  color: '#FFFFFF',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.8)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10
                }}
              >
                <span style={{ color: '#D8F209', fontSize: 18 }}>✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>

          {/* Hero Headline */}
          <div style={{ textAlign: 'center', maxWidth: 1100 }}>
            <div style={{ fontSize: 46, fontWeight: 900, fontStyle: 'italic', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
              Connect with Our Team & See <span style={{ color: '#D8F209' }}>Modern FP&A in Action</span>.
            </div>
            <div style={{ fontSize: 20, color: '#94A3B8', marginTop: 12, fontWeight: 600 }}>
              Exchange strategies with veteran enterprise modelers and solution architects.
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          SCENE 6: THE GRAND OUTRO FINALE & BOOTH 19 (32.2s - End)
          Theme: Ticket Chassis, Coordinates & Booth 19 CTA
         ══════════════════════════════════════════════════════════════ */}
      {currentTime >= 32.0 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: interpolate(currentTime, [32.0, 32.5], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
            transform: `scale(${0.9 + s6Spring * 0.1})`
          }}
        >
          {/* Master Event Ticket Chassis */}
          <div
            style={{
              width: 860,
              background: '#FFFFFF',
              borderRadius: 24,
              boxShadow: '0 60px 140px rgba(0,0,0,0.95), 0 0 60px rgba(77, 174, 235, 0.25)',
              padding: '42px 52px',
              color: '#090A0C',
              position: 'relative',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            {/* Top Pill */}
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 16 }}>
              <span
                style={{
                  background: '#2B19F2',
                  color: '#FFFFFF',
                  fontSize: 12,
                  fontWeight: 900,
                  fontFamily: "'JetBrains Mono', monospace",
                  padding: '5px 14px',
                  borderRadius: 6,
                  letterSpacing: '0.1em'
                }}
              >
                ICC SYDNEY
              </span>
              <span
                style={{
                  background: '#D8F209',
                  color: '#06070B',
                  fontSize: 12,
                  fontWeight: 900,
                  fontFamily: "'JetBrains Mono', monospace",
                  padding: '5px 14px',
                  borderRadius: 6,
                  letterSpacing: '0.1em'
                }}
              >
                2 SEPT 2026
              </span>
            </div>

            {/* Event Name */}
            <div style={{ fontSize: 38, fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.2, marginBottom: 8 }}>
              Finance Transformation Summit NSW
            </div>

            {/* Subtext */}
            <div style={{ fontSize: 16, color: '#64748B', maxWidth: 640, marginBottom: 28, fontWeight: 500 }}>
              Join Octane Software Solutions at Australia's premier gathering of FP&A leaders and transformation innovators.
            </div>

            {/* Hero Booth CTA Button */}
            <div
              style={{
                background: '#090A0C',
                color: '#FFFFFF',
                fontSize: 20,
                fontWeight: 900,
                fontFamily: "'JetBrains Mono', monospace",
                letterSpacing: '0.04em',
                padding: '20px 48px',
                borderRadius: 14,
                boxShadow: `0 16px 40px rgba(77, 174, 235, ${0.35 + pulseGlitch * 0.25})`,
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                border: '2px solid #4daeeb'
              }}
            >
              <span>DROP BY BOOTH 19</span>
              <span style={{ color: '#D8F209', fontSize: 24 }}>→</span>
              <span style={{ color: '#4daeeb' }}>COME SAY HELLO</span>
            </div>
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
