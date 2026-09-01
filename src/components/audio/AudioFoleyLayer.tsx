import React from 'react';
import { Sequence, Audio, staticFile } from 'remotion';

export const AudioFoleyLayer: React.FC = () => {
  return (
    <>
      {/* Beat 1: Opening Sub-Bass Drop (f0) */}
      <Sequence from={0} durationInFrames={72}>
        <Audio src={staticFile('sfx/sfx_bass_drop.wav')} volume={0.65} />
      </Sequence>

      {/* Beat 2: Whoosh Camera Dolly (f198) */}
      <Sequence from={198} durationInFrames={48}>
        <Audio src={staticFile('sfx/sfx_whoosh_dolly.wav')} volume={0.4} />
      </Sequence>

      {/* Beat 5: Glitch Schema Break & Shatter (f768) */}
      <Sequence from={768} durationInFrames={36}>
        <Audio src={staticFile('sfx/sfx_glitch_break.wav')} volume={0.7} />
      </Sequence>

      {/* Beat 6: Watsonx Core Ascend Riser (f930) */}
      <Sequence from={930} durationInFrames={90}>
        <Audio src={staticFile('sfx/sfx_core_ascend.wav')} volume={0.5} />
      </Sequence>

      {/* Beat 8: Platform Sockets Elevation (f1458) */}
      <Sequence from={1458} durationInFrames={30}>
        <Audio src={staticFile('sfx/sfx_socket_rise.wav')} volume={0.45} />
      </Sequence>

      {/* Beat 10: Laser Data Stream (f1860) */}
      <Sequence from={1860} durationInFrames={42}>
        <Audio src={staticFile('sfx/sfx_laser_stream.wav')} volume={0.4} />
      </Sequence>

      {/* Beat 14: Tactile Physical Switch Click (f2610) */}
      <Sequence from={2610} durationInFrames={18}>
        <Audio src={staticFile('sfx/sfx_switch_click.wav')} volume={0.8} />
      </Sequence>

      {/* Beat 16: Hero Impact Slam & Velocity Rumble (f2994) */}
      <Sequence from={2994} durationInFrames={84}>
        <Audio src={staticFile('sfx/sfx_hero_impact.wav')} volume={0.85} />
      </Sequence>
    </>
  );
};
