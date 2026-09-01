import React from 'react';
import { Composition } from 'remotion';
import { WatsonxVideo } from './WatsonxVideo';
import { CleanForefrontVideo } from './CleanForefrontVideo';
import { WebGLSmokeTest } from './components/scene3d/WebGLSmokeTest';
import voiceData from '../public/voiceover.json';

const FPS = 60;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Clean Sequential Eye-Guidance Mobile Video (9:16 Vertical) */}
      <Composition
        id="CleanForefrontVideo"
        component={CleanForefrontVideo}
        fps={FPS}
        width={1080}
        height={1920}
        durationInFrames={3407}
      />

      {/* Clean Sequential Eye-Guidance Widescreen Video (16:9) */}
      <Composition
        id="CleanForefrontVideoWidescreen"
        component={CleanForefrontVideo}
        fps={FPS}
        width={1920}
        height={1080}
        durationInFrames={3407}
      />

      <Composition
        id="WebGLSmokeTest"
        component={WebGLSmokeTest}
        fps={FPS}
        durationInFrames={120}
        width={1920}
        height={1080}
      />

      <Composition
        id="WatsonxVideo"
        component={WatsonxVideo}
        fps={FPS}
        width={1920}
        height={1080}
        calculateMetadata={() => {
          const segments = voiceData?.word_segments || [];
          const lastWord = segments[segments.length - 1];
          const durationInSeconds = lastWord ? lastWord.end : 45.0;
          return {
            durationInFrames: Math.ceil((durationInSeconds + 2.0) * FPS),
          };
        }}
        defaultProps={{
          primaryColor: '#0f62fe',
          accentColor: '#4daeeb',
          textColor: '#0a0a0a',
          backgroundColor: '#ffffff',
        }}
      />
    </>
  );
};
