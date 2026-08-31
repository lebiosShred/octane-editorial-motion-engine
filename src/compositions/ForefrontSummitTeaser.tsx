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
// KINETIC SCENE COMPONENT
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
        transform: `scale(${scale}) translateY(${translateY}px)`
      }}
    >
      {eyebrow && (
        <div
          style={{
            fontSize: 16,
            fontWeight: 800,
            letterSpacing: '0.2em',
            fontFamily: "'JetBrains Mono', monospace",
            color: '#4daeeb',
            textTransform: 'uppercase',
            marginBottom: 16,
            background: 'rgba(9, 10, 12, 0.85)',
            border: '1.5px solid #4daeeb',
            padding: '6px 20px',
            borderRadius: 6
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
          lineHeight: 1.05,
          textAlign: 'center',
          color: '#FFFFFF',
          textTransform: 'uppercase',
          maxWidth: 1400,
          textShadow: '0 8px 32px rgba(0,0,0,0.9)'
        }}
      >
        {title}
      </div>

      {subtitle && (
        <div
          style={{
            fontSize: 26,
            fontWeight: 700,
            color: '#CBD5E1',
            letterSpacing: '0.02em',
            marginTop: 20,
            background: 'rgba(9, 10, 12, 0.8)',
            padding: '8px 28px',
            borderRadius: 8,
            border: '1px solid rgba(255, 255, 255, 0.15)'
          }}
        >
          {subtitle}
        </div>
      )}

      {badge && (
        <div
          style={{
            fontSize: 14,
            fontWeight: 800,
            letterSpacing: '0.12em',
            fontFamily: "'JetBrains Mono', monospace",
            color: '#4daeeb',
            marginTop: 24,
            background: 'rgba(77, 174, 235, 0.12)',
            border: '1px solid rgba(77, 174, 235, 0.4)',
            padding: '6px 18px',
            borderRadius: 4
          }}
        >
          {badge}
        </div>
      )}
    </div>
  );
};

// ==========================================
// FAST LOGO MARQUEE SCENE (CONTINUOUS VELOCITY)
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
        gap: 32,
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
          gap: 28,
          padding: '20px 0',
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
          subtitle="02 SEP 2026 • ICC SYDNEY"
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

      {/* SCENE 4: DATE & VENUE (500 - 640 frames / 16.6 - 21.3s) */}
      <Sequence from={500} durationInFrames={140}>
        <Video src={staticFile('vid_sydney.mp4')} style={videoStyle} />
        <AbsoluteFill style={{ background: 'radial-gradient(circle, rgba(0,0,0,0.25) 0%, rgba(9,10,12,0.75) 100%)' }} />
        <KineticScene
          title="SEPTEMBER 2, 2026"
          subtitle="ICC Sydney • Darling Harbour"
          badge="FSI • RETAIL • HEALTHCARE • UTILITIES LEADERS"
          durationInFrames={140}
        />
      </Sequence>

      {/* SCENE 5: OCTANE SPONSOR OUTRO (640 - 780 frames / 21.3 - 26.0s) */}
      <Sequence from={640} durationInFrames={140}>
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
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 24,
        zIndex: 10,
        opacity,
        transform: `scale(${scale}) translateY(${translateY}px)`
      }}
    >
      <div
        style={{
          fontSize: 14,
          fontWeight: 800,
          letterSpacing: '0.22em',
          fontFamily: "'JetBrains Mono', monospace",
          color: '#4daeeb',
          textTransform: 'uppercase'
        }}
      >
        EVENT SPONSOR & EXHIBITOR
      </div>

      <div
        style={{
          fontSize: 68,
          fontWeight: 900,
          letterSpacing: '-0.04em',
          color: '#FFFFFF',
          textTransform: 'uppercase',
          textShadow: '0 0 50px rgba(77, 174, 235, 0.6)'
        }}
      >
        OCTANE <span style={{ color: '#4daeeb' }}>SOLUTIONS</span>
      </div>

      <div
        style={{
          fontSize: 22,
          fontWeight: 700,
          color: '#94A3B8',
          letterSpacing: '0.04em',
          marginTop: -4
        }}
      >
        Enterprise AI • Financial Planning & Analytics
      </div>

      <div
        style={{
          marginTop: 18,
          fontSize: 16,
          fontWeight: 800,
          fontFamily: "'JetBrains Mono', monospace",
          letterSpacing: '0.1em',
          color: '#090A0C',
          background: '#4daeeb',
          padding: '10px 32px',
          borderRadius: 8,
          boxShadow: '0 0 30px rgba(77, 174, 235, 0.5)'
        }}
      >
        OCTANESOLUTIONS.COM.AU
      </div>
    </div>
  );
};
