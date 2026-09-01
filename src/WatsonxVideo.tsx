import React from 'react';
import { Audio, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { ThreeCanvas } from '@remotion/three';
import { IndustrialTheme } from './types/theme';
import { BeatDirectorEngine } from './engine/BeatDirectorEngine';
import { CameraDirector3D } from './components/webgl/CameraDirector3D';
import { Act1_Bottleneck3D } from './components/webgl/Act1_Bottleneck3D';
import { Act2_Catalog3D } from './components/webgl/Act2_Catalog3D';
import { Act3_Governance3D } from './components/webgl/Act3_Governance3D';
import { Act4_Observability3D } from './components/webgl/Act4_Observability3D';
import { SubtitleKaraoke } from './components/forge/SubtitleKaraoke';

import voiceoverData from '../public/voiceover.json';

export const WatsonxVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentTime = frame / fps;

  const currentBeat = BeatDirectorEngine.getCurrentBeat(frame);

  // Act determination
  // Act 1: Beats 1-5 (f0 - f930)
  // Act 2: Beats 6-9 (f930 - f1860)
  // Act 3: Beats 10-14 (f1860 - f2718)
  // Act 4: Beats 15-16 (f2718 - f3407)
  const isAct1 = frame < 930;
  const isAct2 = frame >= 930 && frame < 1860;
  const isAct3 = frame >= 1860 && frame < 2718;
  const isAct4 = frame >= 2718;

  return (
    <div
      style={{
        width: 1920,
        height: 1080,
        backgroundColor: '#000000',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: IndustrialTheme.fonts.sans,
      }}
    >
      {/* Master Voiceover Audio Track */}
      <Audio src={staticFile('voiceover.wav')} />

      {/* Expansive Ambient Radial Glow Floor */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 50%, #0B1020 0%, #000000 85%)',
          pointerEvents: 'none',
        }}
      />

      {/* WebGL 3D Master Viewport */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <ThreeCanvas width={1920} height={1080}>
          {/* Dynamic 3D Camera Director */}
          <CameraDirector3D />

          {/* Lighting Rig */}
          <ambientLight intensity={0.7} />
          <directionalLight position={[8, 12, 10]} intensity={1.8} />
          <pointLight position={[-6, 4, 6]} color="#4daeeb" intensity={1.2} />
          <pointLight position={[6, -2, 4]} color="#10B981" intensity={0.8} />

          {/* 3D Volumetric Ground Plane with Grid */}
          <gridHelper args={[60, 60, '#4daeeb', '#0F172A']} position={[0, -2.0, 0]} />
          <mesh position={[0, -2.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[60, 60]} />
            <meshStandardMaterial
              color="#020408"
              metalness={0.9}
              roughness={0.2}
            />
          </mesh>

          {/* Active 3D Act Geometries */}
          {isAct1 && <Act1_Bottleneck3D />}
          {isAct2 && <Act2_Catalog3D />}
          {isAct3 && <Act3_Governance3D />}
          {isAct4 && <Act4_Observability3D />}
        </ThreeCanvas>
      </div>

      {/* Floating Dynamic 16-Beat Headline */}
      <div
        style={{
          position: 'absolute',
          top: 60,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '0 120px',
          zIndex: 80,
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            fontSize: 42,
            fontWeight: 900,
            color: '#FFFFFF',
            textAlign: 'center',
            lineHeight: 1.2,
            letterSpacing: '-0.025em',
            textShadow: '0 10px 40px rgba(0,0,0,0.95)',
            maxWidth: 1400,
          }}
        >
          {currentBeat.headline.main}{' '}
          <span style={{ color: '#4daeeb', fontWeight: 900 }}>
            {currentBeat.headline.highlight}
          </span>
        </div>
      </div>

      {/* Minimal Top-Left Brand Pill */}
      <div
        style={{
          position: 'absolute',
          top: 36,
          left: 60,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          zIndex: 90,
        }}
      >
        <span
          style={{
            fontSize: 12,
            fontFamily: IndustrialTheme.fonts.mono,
            fontWeight: 900,
            color: '#4daeeb',
            background: 'rgba(77, 174, 235, 0.15)',
            border: '1.5px solid #4daeeb',
            padding: '4px 10px',
            borderRadius: 6,
            letterSpacing: '0.1em',
          }}
        >
          IBM WATSONX
        </span>
        <span
          style={{
            fontSize: 12,
            fontWeight: 700,
            fontFamily: IndustrialTheme.fonts.mono,
            color: '#64748B',
          }}
        >
          Orchestrate Agent Catalog
        </span>
      </div>

      {/* Floating High-Contrast Karaoke Subtitles */}
      <SubtitleKaraoke words={voiceoverData.word_segments} currentTime={currentTime} />
    </div>
  );
};
