import React from 'react';
import { EffectComposer, Bloom, Vignette, ChromaticAberration } from '@react-three/postprocessing';
import * as THREE from 'three';

export const PostProcessingRig: React.FC = () => {
  return (
    <EffectComposer multisampling={0} disableNormalPass>
      {/* 1. Selective Optical Bloom for glowing LEDs & Lasers */}
      <Bloom
        luminanceThreshold={0.4}
        luminanceSmoothing={0.7}
        intensity={1.2}
        radius={0.6}
      />

      {/* 2. Optical Glass Chromatic Aberration */}
      <ChromaticAberration
        offset={new THREE.Vector2(0.0015, 0.0015)}
        radialModulation={false}
        modulationOffset={0.15}
      />

      {/* 3. Filmic Vignette to deepen corner contrast */}
      <Vignette eskil={false} offset={0.15} darkness={0.85} />
    </EffectComposer>
  );
};
