import React from 'react';
import { Audio, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { ThreeCanvas } from '@remotion/three';
import { loadFont as loadJetBrainsMono } from '@remotion/google-fonts/JetBrainsMono';
import { loadFont as loadInter } from '@remotion/google-fonts/Inter';
import { IndustrialTheme } from './types/theme';
import { BeatDirectorEngine } from './engine/BeatDirectorEngine';
import { CameraDirector3D } from './components/webgl/CameraDirector3D';
import { Act1_Bottleneck3D } from './components/webgl/Act1_Bottleneck3D';
import { Act2_Catalog3D } from './components/webgl/Act2_Catalog3D';
import { Act3_Governance3D } from './components/webgl/Act3_Governance3D';
import { Act4_Observability3D } from './components/webgl/Act4_Observability3D';
import { DynamicLayoutDirector } from './components/layout/DynamicLayoutDirector';
import { SubtitleKaraoke } from './components/forge/SubtitleKaraoke';
import { AudioFoleyLayer } from './components/audio/AudioFoleyLayer';

import voiceoverData from '../public/voiceover.json';

// Preload high-density typography
loadJetBrainsMono();
loadInter();

export const WatsonxVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentTime = frame / fps;

  const currentBeat = BeatDirectorEngine.getCurrentBeat(frame);

  // Act determination
  const isAct1 = frame < 930;
  const isAct2 = frame >= 930 && frame < 1860;
  const isAct3 = frame >= 1860 && frame < 2718;
  const isAct4 = frame >= 2718;

  // Subtitle visibility
  const showSubtitles =
    currentBeat.layoutArchetype !== 'kinetic_hero' &&
    currentBeat.layoutArchetype !== 'cinema_clean';

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

      {/* Frame-Synchronized Audio Foley Layer */}
      <AudioFoleyLayer />

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

          {/* 3D Volumetric Ground Plane with Perspective Grid */}
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

      {/* Dynamic Context-Adaptive Layout Director */}
      <DynamicLayoutDirector currentBeat={currentBeat} currentFrame={frame} />

      {/* Dynamic Context-Aware Karaoke Subtitles */}
      <SubtitleKaraoke
        words={voiceoverData.word_segments}
        currentTime={currentTime}
        visible={showSubtitles}
      />
    </div>
  );
};
