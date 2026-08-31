import React from 'react';
import { Composition, registerRoot } from 'remotion';
import { TM1FeederCommercial } from './compositions/TM1FeederCommercial';
import timingData from '../public/voiceover.json';

export const Root: React.FC = () => {
  const durationInFrames = Math.ceil((timingData.duration_seconds + 1.2) * 30);

  return (
    <>
      {/* Master 16:9 Landscape (LinkedIn, YouTube, Desktop Web) */}
      <Composition
        id="TM1FeederCommercial"
        component={TM1FeederCommercial}
        durationInFrames={durationInFrames}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* 9:16 Vertical (TikTok, Instagram Reels, YouTube Shorts) */}
      <Composition
        id="TM1FeederCommercial-Vertical"
        component={TM1FeederCommercial}
        durationInFrames={durationInFrames}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* 1:1 Square (Instagram Feed, LinkedIn Carousel) */}
      <Composition
        id="TM1FeederCommercial-Square"
        component={TM1FeederCommercial}
        durationInFrames={durationInFrames}
        fps={30}
        width={1080}
        height={1080}
      />
    </>
  );
};

registerRoot(Root);
