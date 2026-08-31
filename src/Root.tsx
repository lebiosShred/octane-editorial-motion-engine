import React from 'react';
import { Composition, registerRoot } from 'remotion';
import { TM1FeederCommercial } from './compositions/TM1FeederCommercial';
import { KineticSpreadsheetsMontage } from './compositions/KineticSpreadsheetsMontage';
import timingData from '../public/voiceover.json';

export const Root: React.FC = () => {
  const durationInFrames = Math.ceil((timingData.duration_seconds + 1.2) * 30);

  return (
    <>
      {/* Master Expressive TM1 Feeder Commercial */}
      <Composition
        id="TM1FeederCommercial"
        component={TM1FeederCommercial}
        durationInFrames={durationInFrames}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Kinetic Spreadsheets Montage */}
      <Composition
        id="KineticSpreadsheetsMontage"
        component={KineticSpreadsheetsMontage}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};

registerRoot(Root);
