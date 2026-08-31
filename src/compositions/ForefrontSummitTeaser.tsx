import React from 'react';
import {
  AbsoluteFill,
  Sequence,
  Video,
  Img,
  Audio,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate
} from 'remotion';

// ==========================================
// CINEMA KINETIC SCENE (UNBOXED VISUAL PSYCHOLOGY)
// ==========================================
interface KineticSceneProps {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  badge?: string;
  durationInFrames: number;
}

const KineticScene: React.FC<KineticSceneProps> = ({
  eyebrow,
  title,
  subtitle,
  badge,
  durationInFrames
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sp = spring({
    frame,
    fps,
    config: { mass: 0.45, damping: 10, stiffness: 140 }
  });

  const opacity = interpolate(
    frame,
    [0, 10, durationInFrames - 12, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const scale = interpolate(sp, [0, 1], [0.92, 1]);
  const translateY = interpolate(sp, [0, 1], [25, 0]);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
        opacity,
        transform: `scale(${scale}) translateY(${translateY}px)`,
        padding: '0 60px',
        textAlign: 'center'
      }}
    >
      {/* Kicker: Wide-Tracked Cinema Lead (No Pill Box) */}
      {eyebrow && (
        <div
          style={{
            fontSize: 18,
            fontWeight: 900,
            letterSpacing: '0.24em',
            fontFamily: "'JetBrains Mono', monospace",
            color: '#4daeeb',
            textTransform: 'uppercase',
            marginBottom: 20,
            textShadow: '0 4px 16px rgba(0,0,0,0.8)'
          }}
        >
          {eyebrow}
        </div>
      )}

      {/* Dominant Headline: Scale = Emotion (72px+) */}
      <div
        style={{
          fontSize: 72,
          fontWeight: 900,
          letterSpacing: '-0.04em',
          lineHeight: 1.04,
          color: '#FFFFFF',
          textTransform: 'uppercase',
          maxWidth: 1500,
          textShadow: '0 8px 36px rgba(0,0,0,0.95)'
        }}
      >
        {title}
      </div>

      {/* Subtitle: High-Contrast Punchline (No Clutter Box) */}
      {subtitle && (
        <div
          style={{
            fontSize: 26,
            fontWeight: 700,
            color: '#E2E8F0',
            letterSpacing: '-0.01em',
            marginTop: 24,
            maxWidth: 1100,
            textShadow: '0 4px 20px rgba(0,0,0,0.9)'
          }}
        >
          {subtitle}
        </div>
      )}

      {/* Context Badge: Clean Anchor */}
      {badge && (
        <div
          style={{
            fontSize: 15,
            fontWeight: 800,
            letterSpacing: '0.14em',
            fontFamily: "'JetBrains Mono', monospace",
            color: '#94A3B8',
            marginTop: 22,
            textTransform: 'uppercase',
            textShadow: '0 4px 16px rgba(0,0,0,0.8)'
          }}
        >
          {badge}
        </div>
      )}
    </div>
  );
};

// ==========================================
// SCENE 2: FAST LOGO MARQUEE (VISUAL PSYCHOLOGY SCALE)
// ==========================================
const FastLogoMarqueeScene: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sp = spring({
    frame,
    fps,
    config: { mass: 0.5, damping: 12, stiffness: 120 }
  });

  const opacity = interpolate(
    frame,
    [0, 10, durationInFrames - 10, durationInFrames],
    [0, 1, 1, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const scale = interpolate(sp, [0, 1], [0.94, 1]);
  const translateY = interpolate(sp, [0, 1], [20, 0]);

  // Master list of official corporate vectors
  const baseRow1 = [
    'logos/unilever.svg',
    'logos/hsbc.svg',
    'logos/coca_cola.svg',
    'logos/optus.svg',
    'logos/lion.svg'
  ];

  const baseRow2 = [
    'logos/domain.svg',
    'logos/adobe.svg',
    'logos/sanofi.svg',
    'logos/qbe.svg',
    'logos/boral.svg'
  ];

  // 4x Padded seamless logo streams (> 4500px width)
  const row1Logos = [...baseRow1, ...baseRow1, ...baseRow1, ...baseRow1];
  const row2Logos = [...baseRow2, ...baseRow2, ...baseRow2, ...baseRow2];

  // Continuous linear travel (ZERO modulo jump, ZERO stutter)
  const shift1 = interpolate(frame, [0, durationInFrames], [0, 950]);
  const shift2 = interpolate(frame, [0, durationInFrames], [-950, 0]);

  const logoImgStyle: React.CSSProperties = {
    height: 52,
    maxWidth: 240,
    objectFit: 'contain',
    filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.95))',
    margin: '0 45px'
  };

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 36,
        opacity,
        transform: `scale(${scale}) translateY(${translateY}px)`
      }}
    >
      {/* Commanding Display Headline (Scale = Emotion, No Box Trap) */}
      <div
        style={{
          fontSize: 52,
          fontWeight: 900,
          letterSpacing: '-0.03em',
          fontFamily: "'Inter', sans-serif",
          color: '#FFFFFF',
          textTransform: 'uppercase',
          textAlign: 'center',
          lineHeight: 1.08,
          maxWidth: 1300,
          textShadow: '0 8px 32px rgba(0,0,0,0.95)'
        }}
      >
        SHARING THE STAGE WITH <span style={{ color: '#4daeeb' }}>CFOS</span> FROM
      </div>

      {/* Floating Seamless Stream Tracks */}
      <div
        style={{
          width: '100%',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          gap: 28,
          padding: '24px 0',
          position: 'relative',
          background: 'linear-gradient(180deg, rgba(9,10,12,0) 0%, rgba(9,10,12,0.75) 50%, rgba(9,10,12,0) 100%)'
        }}
      >
        {/* Row 1: Smooth Leftward Drift */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            transform: `translateX(-${shift1}px)`,
            whiteSpace: 'nowrap'
          }}
        >
          {row1Logos.map((logo, idx) => (
            <Img key={`r1-${idx}`} src={staticFile(logo)} style={logoImgStyle} />
          ))}
        </div>

        {/* Row 2: Smooth Rightward Drift */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            transform: `translateX(${shift2 - 1200}px)`,
            whiteSpace: 'nowrap'
          }}
        >
          {row2Logos.map((logo, idx) => (
            <Img key={`r2-${idx}`} src={staticFile(logo)} style={logoImgStyle} />
          ))}
        </div>
      </div>

      {/* Bottom Grounding Subtitle */}
      <div
        style={{
          fontSize: 22,
          fontWeight: 800,
          letterSpacing: '0.06em',
          fontFamily: "'JetBrains Mono', monospace",
          color: '#CBD5E1',
          textTransform: 'uppercase',
          textShadow: '0 4px 16px rgba(0,0,0,0.9)'
        }}
      >
        CFO LEADERSHIP PRIORITIES FOR 2026
      </div>
    </div>
  );
};

// ==========================================
// MASTER TEASER COMPOSITION
// ==========================================
export const ForefrontSummitTeaser: React.FC = () => {
  const videoStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    filter: 'brightness(0.85) contrast(1.15)'
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

      <Audio src={staticFile('forefront_hype_music.mp3')} volume={1.0} />

      {/* SCENE 1: EVENT IDENTITY & VENUE (0 - 150 frames / 0 - 5.0s) */}
      <Sequence from={0} durationInFrames={150}>
        <Video src={staticFile('vid_sydney.mp4')} style={videoStyle} />
        <AbsoluteFill style={{ background: 'radial-gradient(circle, rgba(0,0,0,0.3) 0%, rgba(9,10,12,0.8) 100%)' }} />
        <KineticScene
          eyebrow="FOREFRONT EVENTS PRESENTS"
          title={
            <>
              Finance Transformation <br />
              <span style={{ color: '#4daeeb' }}>Summit NSW 2026</span>
            </>
          }
          subtitle="02 SEPTEMBER 2026 • ICC SYDNEY"
          badge="DARLING HARBOUR • EXECUTIVE STRATEGY KEYNOTES"
          durationInFrames={150}
        />
      </Sequence>

      {/* SCENE 2: FAST BORDERLESS LOGO MARQUEE (150 - 330 frames / 5.0 - 11.0s) */}
      <Sequence from={150} durationInFrames={180}>
        <Video src={staticFile('vid_boardroom.mp4')} style={videoStyle} />
        <AbsoluteFill style={{ background: 'radial-gradient(circle, rgba(0,0,0,0.25) 0%, rgba(9,10,12,0.75) 100%)' }} />
        <FastLogoMarqueeScene durationInFrames={180} />
      </Sequence>

      {/* SCENE 3: AUTONOMOUS FP&A ARCHITECTURE (330 - 500 frames / 11.0 - 16.6s) */}
      <Sequence from={330} durationInFrames={170}>
        <Video src={staticFile('vid_office.mp4')} style={videoStyle} />
        <AbsoluteFill style={{ background: 'radial-gradient(circle, rgba(0,0,0,0.3) 0%, rgba(9,10,12,0.8) 100%)' }} />
        <KineticScene
          eyebrow="AUTONOMOUS FP&A ARCHITECTURE"
          title={
            <>
              IBM Planning Analytics <br />
              <span style={{ color: '#4daeeb' }}>+ Agentic AI</span>
            </>
          }
          subtitle="Sub-Second Multi-Dimensional Models • Zero Spreadsheets"
          badge="OCTANE SOLUTIONS • AI FINANCE AUTOMATION"
          durationInFrames={170}
        />
      </Sequence>

      {/* SCENE 4: DATE & VENUE HERO (500 - 640 frames / 16.6 - 21.3s) */}
      <Sequence from={500} durationInFrames={140}>
        <Video src={staticFile('vid_sydney.mp4')} style={videoStyle} />
        <AbsoluteFill style={{ background: 'radial-gradient(circle, rgba(0,0,0,0.25) 0%, rgba(9,10,12,0.75) 100%)' }} />
        <KineticScene
          eyebrow="SAVE THE DATE"
          title="SEPTEMBER 2, 2026"
          subtitle="ICC Sydney • Darling Harbour"
          badge="FSI • RETAIL • HEALTHCARE • UTILITIES LEADERS"
          durationInFrames={140}
        />
      </Sequence>

      {/* SCENE 5: OCTANE SPONSOR OUTRO (640 - 780 frames / 21.3 - 26.0s) - CLEAN NO GLOW */}
      <Sequence from={640} durationInFrames={140}>
        <AbsoluteFill
          style={{
            backgroundColor: '#090A0C',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <KineticOutro durationInFrames={140} />
        </AbsoluteFill>
      </Sequence>

      {/* Persistent Bottom-Right Watermark */}
      <div
        style={{
          position: 'absolute',
          bottom: 36,
          right: 48,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          opacity: 0.85,
          zIndex: 100
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

// ==========================================
// CLEAN BROADCAST OUTRO (NO GLOW)
// ==========================================
const KineticOutro: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sp = spring({
    frame,
    fps,
    config: { mass: 0.5, damping: 12, stiffness: 140 }
  });

  const opacity = interpolate(
    frame,
    [0, 10, durationInFrames - 10, durationInFrames],
    [0, 1, 1, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const scale = interpolate(sp, [0, 1], [0.92, 1]);
  const translateY = interpolate(sp, [0, 1], [20, 0]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 22,
        zIndex: 10,
        opacity,
        transform: `scale(${scale}) translateY(${translateY}px)`,
        maxWidth: 1200,
        textAlign: 'center'
      }}
    >
      {/* Eyebrow */}
      <div
        style={{
          fontSize: 16,
          fontWeight: 900,
          letterSpacing: '0.24em',
          fontFamily: "'JetBrains Mono', monospace",
          color: '#4daeeb',
          textTransform: 'uppercase'
        }}
      >
        EVENT SPONSOR & EXHIBITOR
      </div>

      {/* Brand Title (Razor Sharp Typography - Zero Glow) */}
      <div
        style={{
          fontSize: 76,
          fontWeight: 900,
          letterSpacing: '-0.04em',
          color: '#FFFFFF',
          textTransform: 'uppercase',
          lineHeight: 1.02
        }}
      >
        OCTANE <span style={{ color: '#4daeeb' }}>SOLUTIONS</span>
      </div>

      {/* Verbatim Booth 19 Messaging */}
      <div
        style={{
          fontSize: 26,
          fontWeight: 700,
          color: '#E2E8F0',
          letterSpacing: '-0.01em',
          lineHeight: 1.35,
          maxWidth: 920,
          marginTop: 6
        }}
      >
        Catch us on <span style={{ color: '#4daeeb', fontWeight: 800 }}>Booth 19</span> to chat with us about IBM Planning Analytics and Agentic AI
      </div>

      {/* Clean Solid Website Button (No Shadow Glow) */}
      <div
        style={{
          marginTop: 16,
          fontSize: 16,
          fontWeight: 800,
          fontFamily: "'JetBrains Mono', monospace",
          letterSpacing: '0.1em',
          color: '#090A0C',
          background: '#4daeeb',
          padding: '10px 32px',
          borderRadius: 8
        }}
      >
        OCTANESOLUTIONS.COM.AU
      </div>
    </div>
  );
};
