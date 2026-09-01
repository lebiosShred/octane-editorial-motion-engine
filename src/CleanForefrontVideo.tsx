import React from 'react';
import { Audio, staticFile, useCurrentFrame, useVideoConfig, Sequence } from 'remotion';
import { loadFont as loadInter } from '@remotion/google-fonts/Inter';
import { loadFont as loadJetBrainsMono } from '@remotion/google-fonts/JetBrainsMono';
import { KineticNumberHook } from './components/clean/KineticNumberHook';
import { RoadmapStalledPin } from './components/clean/RoadmapStalledPin';
import { SequentialBrandCards } from './components/clean/SequentialBrandCards';
import { InteractiveTogglePill } from './components/clean/InteractiveTogglePill';
import { PriceTagBadge } from './components/clean/PriceTagBadge';
import { WatsonxOrbitalEmblem } from './components/clean/WatsonxOrbitalEmblem';
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

      {/* Scene 1: The Six-Month Hook (f0 - f360 | 0.0s - 6.0s) */}
      <Sequence from={0} durationInFrames={360}>
        <KineticNumberHook
          number="6"
          label="MONTHS OF GLUE CODE"
          sublabel="ZERO STANDARD ADAPTERS"
        />
      </Sequence>

      {/* Scene 2: The Stalled Roadmap Pin (f360 - f720 | 6.0s - 12.0s) */}
      <Sequence from={360} durationInFrames={360}>
        <RoadmapStalledPin />
      </Sequence>

      {/* Scene 3: The 3-Brand Agent Carousel (f720 - f1200 | 12.0s - 20.0s) */}
      <Sequence from={720} durationInFrames={480}>
        <SequentialBrandCards />
      </Sequence>

      {/* Scene 4: Zero Glue Code & 150+ Pre-built Badge (f1200 - f1680 | 20.0s - 28.0s) */}
      <Sequence from={1200} durationInFrames={480}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
          }}
        >
          <div
            style={{
              fontSize: 96,
              fontWeight: 900,
              color: '#FFFFFF',
              textAlign: 'center',
              letterSpacing: '-0.02em',
              lineHeight: 1.0,
              marginBottom: 40,
            }}
          >
            ZERO
            <br />
            GLUE CODE
          </div>
          <div style={{ transform: 'scale(0.9)', margin: '-30px 0' }}>
            <SequentialBrandCards />
          </div>
          <div
            style={{
              marginTop: 48,
              border: '5px solid #FFFFFF',
              borderRadius: 14,
              padding: '20px 48px',
              color: '#FFFFFF',
              fontSize: 44,
              fontWeight: 900,
              fontFamily: '"Inter", sans-serif',
              letterSpacing: '0.04em',
              boxShadow: '0 12px 40px rgba(0, 0, 0, 0.8)',
            }}
          >
            [ 150+ PRE-BUILT AGENTS ]
          </div>
        </div>
      </Sequence>

      {/* Scene 5: 1-Click Governance Toggle (f1680 - f2160 | 28.0s - 36.0s) */}
      <Sequence from={1680} durationInFrames={480}>
        <InteractiveTogglePill />
      </Sequence>

      {/* Scene 6: Price Tag Badge & Velocity Slam (f2160 - f2640 | 36.0s - 44.0s) */}
      <Sequence from={2160} durationInFrames={480}>
        <PriceTagBadge />
      </Sequence>

      {/* Scene 7: watsonx Orbital Emblem Reveal (f2640 - f2940 | 44.0s - 49.0s) */}
      <Sequence from={2640} durationInFrames={300}>
        <WatsonxOrbitalEmblem isOutro={false} />
      </Sequence>

      {/* Scene 8: Blueprint CTA & Outro Lockup (f2940 - f3407 | 49.0s - 56.8s) */}
      <Sequence from={2940} durationInFrames={467}>
        <WatsonxOrbitalEmblem isOutro={true} />
      </Sequence>
    </div>
  );
};
