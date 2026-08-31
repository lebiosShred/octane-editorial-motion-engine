import React from 'react';
import { Composition } from 'remotion';
import { TM1FeederCommercial } from './compositions/TM1FeederCommercial';
import { KineticSpreadsheetsMontage } from './compositions/KineticSpreadsheetsMontage';

export const Root: React.FC = () => {
  return (
    <>
      {/* 34.3s Master TM1 Feeder Commercial (1029 frames @ 30fps) */}
      <Composition
        id="TM1FeederCommercial"
        component={TM1FeederCommercial}
        durationInFrames={1029}
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
