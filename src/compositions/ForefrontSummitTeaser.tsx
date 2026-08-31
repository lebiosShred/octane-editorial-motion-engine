import React from 'react';
import { AbsoluteFill, Audio, Img, Sequence, Video, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

// Helper component for Standard Scene Text Motion
const KineticScene: React.FC<{
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  badge?: string;
  durationInFrames: number;
}> = ({ eyebrow, title, subtitle, badge, durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sp = spring({
    frame,
    fps,
    config: { mass: 0.5, damping: 12, stiffness: 140 }
  });

  const opacity = interpolate(
    frame,
    [0, 8, durationInFrames - 8, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const scale = interpolate(sp, [0, 1], [0.88, 1]);
  const translateY = interpolate(sp, [0, 1], [20, 0]);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
        opacity,
        transform: `scale(${scale}) translateY(${translateY}px)`
      }}
    >
      {eyebrow && (
        <div
          style={{
            fontSize: 18,
            fontWeight: 900,
            letterSpacing: '0.18em',
            fontFamily: "'JetBrains Mono', monospace",
            color: '#4daeeb',
            textTransform: 'uppercase',
            background: 'rgba(9, 10, 12, 0.9)',
            border: '1.5px solid #4daeeb',
            padding: '6px 20px',
            borderRadius: 8
          }}
        >
          {eyebrow}
        </div>
      )}
      <div
        style={{
          fontSize: 64,
          fontWeight: 900,
          letterSpacing: '-0.03em',
          textAlign: 'center',
          lineHeight: 1.1,
          maxWidth: 1300,
          textTransform: 'uppercase',
          textShadow: '0 10px 40px rgba(0,0,0,0.95)'
        }}
      >
        {title}
      </div>
      {subtitle && (
        <div
          style={{
            fontSize: 24,
            fontWeight: 800,
            letterSpacing: '0.08em',
            fontFamily: "'JetBrains Mono', monospace",
            color: '#FFFFFF',
            textTransform: 'uppercase',
            background: 'rgba(9, 10, 12, 0.85)',
            border: '1.5px solid rgba(77, 174, 235, 0.4)',
            padding: '6px 22px',
            borderRadius: 8
          }}
        >
          {subtitle}
        </div>
      )}
      {badge && (
        <div
          style={{
            fontSize: 16,
            fontWeight: 900,
            letterSpacing: '0.14em',
            fontFamily: "'JetBrains Mono', monospace",
            color: '#4daeeb',
            textTransform: 'uppercase',
            background: 'rgba(9, 10, 12, 0.9)',
            border: '1px solid #4daeeb',
            padding: '4px 16px',
            borderRadius: 6
          }}
        >
          {badge}
        </div>
      )}
    </div>
  );
};

// High-Velocity Logo Marquee Component
const FastLogoMarqueeScene: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sp = spring({
    frame,
    fps,
    config: { mass: 0.5, damping: 12, stiffness: 140 }
  });

  const opacity = interpolate(
    frame,
    [0, 8, durationInFrames - 8, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const scale = interpolate(sp, [0, 1], [0.88, 1]);
  const translateY = interpolate(sp, [0, 1], [20, 0]);

  // Brand logo sets
  const row1Logos = [
    'logos/unilever.svg',
    'logos/hsbc.svg',
    'logos/coca_cola.svg',
    'logos/optus.svg',
    'logos/lion.svg',
    'logos/unilever.svg',
    'logos/hsbc.svg',
    'logos/coca_cola.svg',
    'logos/optus.svg',
    'logos/lion.svg'
  ];

  const row2Logos = [
    'logos/adobe.svg',
    'logos/sanofi.svg',
    'logos/domain.svg',
    'logos/qbe.svg',
    'logos/boral.svg',
    'logos/adobe.svg',
    'logos/sanofi.svg',
    'logos/domain.svg',
    'logos/qbe.svg',
    'logos/boral.svg'
  ];

  // High velocity shift: 12px per frame
  const shift1 = (frame * 12) % 1350;
  const shift2 = (frame * 12) % 1350;

  const cardStyle: React.CSSProperties = {
    background: 'rgba(9, 10, 12, 0.92)',
    border: '1.5px solid rgba(77, 174, 235, 0.45)',
    borderRadius: 14,
    padding: '12px 32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 64,
    minWidth: 200,
    boxShadow: '0 10px 35px rgba(0,0,0,0.85)'
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
        gap: 22,
        opacity,
        transform: `scale(${scale}) translateY(${translateY}px)`
      }}
    >
      {/* Top Eyebrow */}
      <div
        style={{
          fontSize: 18,
          fontWeight: 900,
          letterSpacing: '0.18em',
          fontFamily: "'JetBrains Mono', monospace",
          color: '#4daeeb',
          textTransform: 'uppercase',
          background: 'rgba(9, 10, 12, 0.9)',
          border: '1.5px solid #4daeeb',
          padding: '6px 24px',
          borderRadius: 8
        }}
      >
        SHARING THE STAGE WITH CFOS FROM
      </div>

      {/* Dual High-Velocity Kinetic Logo Streams */}
      <div
        style={{
          width: '100%',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          padding: '8px 0',
          position: 'relative'
        }}
      >
        {/* Row 1: Leftward Velocity */}
        <div
          style={{
            display: 'flex',
            gap: 20,
            transform: `translateX(-${shift1}px)`,
            whiteSpace: 'nowrap'
          }}
        >
          {row1Logos.map((logo, idx) => (
            <div key={`r1-${idx}`} style={cardStyle}>
              <Img src={staticFile(logo)} style={{ height: 42, objectFit: 'contain' }} />
            </div>
          ))}
        </div>

        {/* Row 2: Rightward Velocity */}
        <div
          style={{
            display: 'flex',
            gap: 20,
            transform: `translateX(${shift2 - 1200}px)`,
            whiteSpace: 'nowrap'
          }}
        >
          {row2Logos.map((logo, idx) => (
            <div key={`r2-${idx}`} style={cardStyle}>
              <Img src={staticFile(logo)} style={{ height: 42, objectFit: 'contain' }} />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Subtitle */}
      <div
        style={{
          fontSize: 22,
          fontWeight: 800,
          letterSpacing: '0.08em',
          fontFamily: "'JetBrains Mono', monospace",
          color: '#FFFFFF',
          textTransform: 'uppercase',
          background: 'rgba(9, 10, 12, 0.85)',
          border: '1.5px solid rgba(77, 174, 235, 0.4)',
          padding: '6px 24px',
          borderRadius: 8
        }}
      >
        CFO LEADERSHIP PRIORITIES FOR 2026
      </div>
    </div>
  );
};

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

      {/* Original High-Energy Royalty-Free Trailer Audio */}
      <Audio src={staticFile('forefront_hype_music.mp3')} volume={1.0} />

      {/* ══════════════════════════════════════════════════════════════
          SCENE 1: EVENT IDENTITY & VENUE (0 - 150 frames / 0.0s - 5.0s)
          Footage: Authentic Sydney Harbour & Skyline
         ══════════════════════════════════════════════════════════════ */}
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
          subtitle="02 SEP 2026 • ICC SYDNEY"
          durationInFrames={150}
        />
      </Sequence>

      {/* ══════════════════════════════════════════════════════════════
          SCENE 2: FAST KINETIC LOGO MARQUEE (150 - 300 frames / 5.0s - 10.0s)
          Footage: Executive Boardroom
         ══════════════════════════════════════════════════════════════ */}
      <Sequence from={150} durationInFrames={150}>
        <Video src={staticFile('vid_boardroom.mp4')} style={videoStyle} />
        <AbsoluteFill style={{ background: 'radial-gradient(circle, rgba(0,0,0,0.25) 0%, rgba(9,10,12,0.75) 100%)' }} />
        <FastLogoMarqueeScene durationInFrames={150} />
      </Sequence>

      {/* ══════════════════════════════════════════════════════════════
          SCENE 3: OCTANE FEATURED KEYNOTE CASE STUDY (300 - 480 frames / 10.0s - 16.0s)
          Footage: Modern Technology Workspace
         ══════════════════════════════════════════════════════════════ */}
      <Sequence from={300} durationInFrames={180}>
        <Video src={staticFile('vid_office.mp4')} style={videoStyle} />
        <AbsoluteFill style={{ background: 'radial-gradient(circle, rgba(0,0,0,0.25) 0%, rgba(9,10,12,0.75) 100%)' }} />
        <KineticScene
          eyebrow="STREAM B: FP&A TRANSFORMATION • 12:10 PM"
          title={
            <>
              THE AGENTIC FINANCE <br />
              <span style={{ color: '#4daeeb' }}>DEPARTMENT</span>
            </>
          }
          subtitle="Finance Teams Firmly in the Loop"
          badge="FEATURED CASE STUDY BY STENY SEBASTIAN • OCTANE SOLUTIONS"
          durationInFrames={180}
        />
      </Sequence>

      {/* ══════════════════════════════════════════════════════════════
          SCENE 4: IBM PLANNING ANALYTICS + AGENTIC AI (480 - 645 frames / 16.0s - 21.5s)
          Footage: Financial Planning & Analytics Discussion
         ══════════════════════════════════════════════════════════════ */}
      <Sequence from={480} durationInFrames={165}>
        <Video src={staticFile('vid_boardroom.mp4')} style={videoStyle} />
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
          durationInFrames={165}
        />
      </Sequence>

      {/* ══════════════════════════════════════════════════════════════
          SCENE 5: DATE & VENUE (645 - 780 frames / 21.5s - 26.0s)
          Footage: Sydney ICC Coordinates
         ══════════════════════════════════════════════════════════════ */}
      <Sequence from={645} durationInFrames={135}>
        <Video src={staticFile('vid_sydney.mp4')} style={videoStyle} />
        <AbsoluteFill style={{ background: 'radial-gradient(circle, rgba(0,0,0,0.25) 0%, rgba(9,10,12,0.75) 100%)' }} />
        <KineticScene
          title="SEPTEMBER 2, 2026"
          subtitle="ICC Sydney • Darling Harbour"
          badge="FSI • RETAIL • HEALTHCARE • UTILITIES LEADERS"
          durationInFrames={135}
        />
      </Sequence>

      {/* ══════════════════════════════════════════════════════════════
          SCENE 6: OCTANE SPONSOR & SPEAKER CALLOUT (780 - 930 frames / 26.0s - 31.0s)
         ══════════════════════════════════════════════════════════════ */}
      <Sequence from={780} durationInFrames={150}>
        <AbsoluteFill
          style={{
            backgroundColor: '#000000',
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

          <KineticOutro durationInFrames={150} />
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

  const scale = interpolate(sp, [0, 1], [0.88, 1]);
  const translateY = interpolate(sp, [0, 1], [20, 0]);

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: 18,
        opacity,
        transform: `scale(${scale}) translateY(${translateY}px)`
      }}
    >
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
        OFFICIAL SPONSOR & KEYNOTE SPEAKER
      </div>

      <div
        style={{
          fontSize: 60,
          fontWeight: 900,
          letterSpacing: '-0.03em',
          lineHeight: 1.1,
          color: '#FFFFFF'
        }}
      >
        Octane Software Solutions
      </div>

      <div
        style={{
          fontSize: 22,
          color: '#94A3B8',
          maxWidth: 750,
          lineHeight: 1.5,
          fontWeight: 600
        }}
      >
        Enterprise Planning, Financial Transformation & Autonomous AI
      </div>

      <div
        style={{
          marginTop: 10,
          background: '#090A0C',
          border: '2px solid #4daeeb',
          padding: '18px 48px',
          borderRadius: 16,
          fontSize: 22,
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
        <span>MEET STENY SEBASTIAN & OUR ARCHITECTS</span>
      </div>
    </div>
  );
};
