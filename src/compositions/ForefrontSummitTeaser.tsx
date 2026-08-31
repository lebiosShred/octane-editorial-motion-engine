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

// High-Velocity Borderless Floating Logo Marquee Component
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

  // Official verified brand emblems
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
    'logos/domain.svg',
    'logos/adobe.svg',
    'logos/sanofi.svg',
    'logos/qbe.svg',
    'logos/boral.svg',
    'logos/domain.svg',
    'logos/adobe.svg',
    'logos/sanofi.svg',
    'logos/qbe.svg',
    'logos/boral.svg'
  ];

  // High velocity shift: 12px per frame
  const shift1 = (frame * 12) % 1500;
  const shift2 = (frame * 12) % 1500;

  const logoImgStyle: React.CSSProperties = {
    height: 54,
    maxWidth: 220,
    objectFit: 'contain',
    filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.95))',
    margin: '0 40px'
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
        gap: 28,
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

      {/* Floating Seamless Stream Tracks (No Black Boxes) */}
      <div
        style={{
          width: '100%',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
          padding: '16px 0',
          position: 'relative',
          background: 'linear-gradient(180deg, rgba(9,10,12,0) 0%, rgba(9,10,12,0.7) 50%, rgba(9,10,12,0) 100%)'
        }}
      >
        {/* Row 1: Leftward Velocity */}
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

        {/* Row 2: Rightward Velocity */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            transform: `translateX(${shift2 - 1300}px)`,
            whiteSpace: 'nowrap'
          }}
        >
          {row2Logos.map((logo, idx) => (
            <Img key={`r2-${idx}`} src={staticFile(logo)} style={logoImgStyle} />
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


const KeynoteSpotlightScene: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sp = spring({
    frame,
    fps,
    config: { mass: 0.5, damping: 12, stiffness: 130 }
  });

  const opacity = interpolate(
    frame,
    [0, 12, durationInFrames - 12, durationInFrames],
    [0, 1, 1, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const scale = interpolate(sp, [0, 1], [0.92, 1]);
  const translateY = interpolate(sp, [0, 1], [25, 0]);
  const floatY = Math.sin((frame / 40) * Math.PI) * 4;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
        opacity,
        transform: `scale(${scale}) translateY(${translateY}px)`
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 64,
          maxWidth: 1300,
          background: 'rgba(9, 10, 12, 0.82)',
          border: '1.5px solid rgba(77, 174, 235, 0.35)',
          padding: '48px 56px',
          borderRadius: 24,
          backdropFilter: 'blur(24px)',
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.75), 0 0 50px rgba(77, 174, 235, 0.15)'
        }}
      >
        {/* Left: Speaker Portrait with Glowing Glass Frame */}
        <div
          style={{
            position: 'relative',
            flexShrink: 0,
            transform: `translateY(${floatY}px)`
          }}
        >
          {/* Glowing Aura Ring */}
          <div
            style={{
              position: 'absolute',
              inset: -12,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(77, 174, 235, 0.5) 0%, transparent 70%)',
              filter: 'blur(10px)',
              zIndex: 0
            }}
          />
          {/* Circular Portrait Image Container */}
          <div
            style={{
              position: 'relative',
              width: 240,
              height: 240,
              borderRadius: '50%',
              overflow: 'hidden',
              border: '4px solid #4daeeb',
              boxShadow: '0 0 35px rgba(77, 174, 235, 0.5)',
              background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
              zIndex: 1
            }}
          >
            <Img
              src={staticFile('steny_sebastian.png')}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center 15%'
              }}
            />
          </div>
          {/* Featured Speaker Badge */}
          <div
            style={{
              position: 'absolute',
              bottom: -10,
              left: '50%',
              transform: 'translateX(-50%)',
              background: '#4daeeb',
              color: '#090A0C',
              fontSize: 12,
              fontWeight: 900,
              fontFamily: "'JetBrains Mono', monospace",
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              padding: '4px 14px',
              borderRadius: 20,
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.6)',
              zIndex: 2,
              whiteSpace: 'nowrap'
            }}
          >
            KEYNOTE SPEAKER
          </div>
        </div>

        {/* Right: Topic & Speaker Credentials */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 16
          }}
        >
          {/* Eyebrow */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              fontSize: 14,
              fontWeight: 900,
              letterSpacing: '0.12em',
              fontFamily: "'JetBrains Mono', monospace",
              color: '#4daeeb',
              textTransform: 'uppercase'
            }}
          >
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#4daeeb' }} />
            FEATURED CASE STUDY • OCTANE SOLUTIONS
          </div>

          {/* Keynote Title */}
          <div
            style={{
              fontSize: 48,
              fontWeight: 900,
              letterSpacing: '-0.03em',
              lineHeight: 1.08,
              color: '#FFFFFF',
              textTransform: 'uppercase'
            }}
          >
            THE AGENTIC FINANCE <br />
            <span style={{ color: '#4daeeb' }}>DEPARTMENT</span>
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: '#CBD5E1',
              letterSpacing: '-0.01em'
            }}
          >
            Finance Teams Firmly in the Loop
          </div>

          {/* Speaker Bio Lockup */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              marginTop: 8,
              paddingTop: 16,
              borderTop: '1px solid rgba(255, 255, 255, 0.12)'
            }}
          >
            <div>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#FFFFFF' }}>
                Steny Sebastian
              </div>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  fontFamily: "'JetBrains Mono', monospace",
                  color: '#94A3B8',
                  marginTop: 2
                }}
              >
                Principal, Data & AI Platforms • Octane Solutions
              </div>
            </div>
          </div>
        </div>
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

      {/* SCENE 1: EVENT IDENTITY & VENUE (0 - 150 frames) */}
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

      {/* SCENE 2: FAST BORDERLESS LOGO MARQUEE (150 - 300 frames) */}
      <Sequence from={150} durationInFrames={150}>
        <Video src={staticFile('vid_boardroom.mp4')} style={videoStyle} />
        <AbsoluteFill style={{ background: 'radial-gradient(circle, rgba(0,0,0,0.25) 0%, rgba(9,10,12,0.75) 100%)' }} />
        <FastLogoMarqueeScene durationInFrames={150} />
      </Sequence>

      {/* SCENE 3: OCTANE FEATURED KEYNOTE CASE STUDY (300 - 480 frames) */}
      <Sequence from={300} durationInFrames={180}>
        <Video src={staticFile('vid_office.mp4')} style={videoStyle} />
        <AbsoluteFill style={{ background: 'radial-gradient(circle, rgba(0,0,0,0.3) 0%, rgba(9,10,12,0.85) 100%)' }} />
        <KeynoteSpotlightScene durationInFrames={180} />
      </Sequence>

      {/* SCENE 4: IBM PLANNING ANALYTICS + AGENTIC AI (480 - 645 frames) */}
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

      {/* SCENE 5: DATE & VENUE (645 - 780 frames) */}
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

      {/* SCENE 6: OCTANE SPONSOR & SPEAKER CALLOUT (780 - 930 frames) */}
      <Sequence from={780} durationInFrames={150}>
        <AbsoluteFill
          style={{
            backgroundColor: '#000000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
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
