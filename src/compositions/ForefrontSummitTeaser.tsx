import React from 'react';
import { AbsoluteFill, Audio, Sequence, Video, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

// Helper component for Scene Text Motion
const KineticScene: React.FC<{
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  durationInFrames: number;
}> = ({ eyebrow, title, subtitle, durationInFrames }) => {
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
            background: 'rgba(9, 10, 12, 0.85)',
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
        {title}
      </div>
      {subtitle && (
        <div
          style={{
            fontSize: 24,
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
          {subtitle}
        </div>
      )}
    </div>
  );
};

export const ForefrontSummitTeaser: React.FC = () => {
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

      {/* Audio Track */}
      <Audio src={staticFile('forefront_hype_music.mp3')} volume={1.0} />

      {/* SCENE 1: EVENT TITLE (0 - 150 frames / 0.0s - 5.0s) */}
      <Sequence from={0} durationInFrames={150}>
        <Video src={staticFile('vid_sydney.mp4')} style={videoStyle} />
        <AbsoluteFill style={{ background: 'radial-gradient(circle, rgba(0,0,0,0.3) 0%, rgba(9,10,12,0.8) 100%)' }} />
        <KineticScene
          eyebrow="FOREFRONT EVENTS PRESENTS"
          title={
            <>
              Finance Transformation <br />
              <span style={{ color: '#4daeeb' }}>Summit NSW</span>
            </>
          }
          durationInFrames={150}
        />
      </Sequence>

      {/* SCENE 2: 200+ ATTENDEES (150 - 300 frames / 5.0s - 10.0s) */}
      <Sequence from={150} durationInFrames={150}>
        <Video src={staticFile('vid_boardroom.mp4')} style={videoStyle} />
        <AbsoluteFill style={{ background: 'radial-gradient(circle, rgba(0,0,0,0.25) 0%, rgba(9,10,12,0.75) 100%)' }} />
        <KineticScene
          title="200+ attendees"
          subtitle="Finance Leaders & CFOs"
          durationInFrames={150}
        />
      </Sequence>

      {/* SCENE 3: INDUSTRY KEYNOTES (300 - 465 frames / 10.0s - 15.5s) */}
      <Sequence from={300} durationInFrames={165}>
        <Video src={staticFile('vid_office.mp4')} style={videoStyle} />
        <AbsoluteFill style={{ background: 'radial-gradient(circle, rgba(0,0,0,0.25) 0%, rgba(9,10,12,0.75) 100%)' }} />
        <KineticScene
          title="Industry Keynotes"
          subtitle="Enterprise Transformation & Planning Strategy"
          durationInFrames={165}
        />
      </Sequence>

      {/* SCENE 4: IBM PLANNING ANALYTICS (465 - 630 frames / 15.5s - 21.0s) */}
      <Sequence from={465} durationInFrames={165}>
        <Video src={staticFile('vid_boardroom.mp4')} style={videoStyle} />
        <AbsoluteFill style={{ background: 'radial-gradient(circle, rgba(0,0,0,0.3) 0%, rgba(9,10,12,0.8) 100%)' }} />
        <KineticScene
          title={
            <>
              IBM Planning Analytics <br />
              <span style={{ color: '#4daeeb' }}>+ Agentic AI</span>
            </>
          }
          subtitle="Autonomous FP&A • Sub-Second Models"
          durationInFrames={165}
        />
      </Sequence>

      {/* SCENE 5: DATE & LOCATION (630 - 780 frames / 21.0s - 26.0s) */}
      <Sequence from={630} durationInFrames={150}>
        <Video src={staticFile('vid_sydney.mp4')} style={videoStyle} />
        <AbsoluteFill style={{ background: 'radial-gradient(circle, rgba(0,0,0,0.25) 0%, rgba(9,10,12,0.75) 100%)' }} />
        <KineticScene
          title="SEPTEMBER 2, 2026"
          subtitle="ICC Sydney • Darling Harbour"
          durationInFrames={150}
        />
      </Sequence>

      {/* SCENE 6: SPONSOR OUTRO (780 - 930 frames / 26.0s - 31.0s) */}
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
        gap: 20,
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
        OFFICIAL EVENT SPONSOR
      </div>

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
  );
};
