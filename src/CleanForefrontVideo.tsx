import React from 'react';
import { Audio, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { loadFont as loadInter } from '@remotion/google-fonts/Inter';
import { loadFont as loadJetBrainsMono } from '@remotion/google-fonts/JetBrainsMono';
import { ContinuousWorldStage } from './components/engine/ContinuousWorldStage';
import { AudioFoleyLayer } from './components/audio/AudioFoleyLayer';
import voiceoverData from '../public/voiceover.json';

loadInter();
loadJetBrainsMono();

export const CleanForefrontVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentTime = frame / fps;

  // Dynamic Sidechain Music Bed Ducking
  const isSpeaking = voiceoverData.word_segments.some(
    (w) => currentTime >= w.start && currentTime <= w.end
  );
  const musicVolume = isSpeaking ? 0.22 : 0.42;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#000000',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: '"Inter", sans-serif',
      }}
    >
      {/* 1. Master Voiceover Track */}
      <Audio src={staticFile('voiceover.wav')} volume={1.0} />

      {/* 2. Rhythmic Ambient Music Bed */}
      <Audio src={staticFile('music/tech_pulse_ambient.wav')} volume={musicVolume} />

      {/* 3. Frame-Synchronized Audio Foley FX */}
      <AudioFoleyLayer />

      {/* 4. Master Continuous 3D World Stage (Zero Choppy Sequence Cuts) */}
      <ContinuousWorldStage />
    </div>
  );
};
