import React from 'react';
import { Composition, registerRoot } from 'remotion';
import { TM1FeederCommercial } from './compositions/TM1FeederCommercial';
import { ForefrontSummitTeaser } from './compositions/ForefrontSummitTeaser';
import timingData from '../public/voiceover.json';

export const Root: React.FC = () => {
  const feederDurationFrames = Math.ceil((timingData.duration_seconds + 1.2) * 30);

  return (
    <>
      <Composition
        id="TM1FeederCommercial"
        component={TM1FeederCommercial}
        durationInFrames={feederDurationFrames}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="ForefrontSummitTeaser"
        component={ForefrontSummitTeaser}
        durationInFrames={930}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};

registerRoot(Root);
