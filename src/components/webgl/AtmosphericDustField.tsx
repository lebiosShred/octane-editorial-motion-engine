import React, { useMemo } from 'react';
import { useCurrentFrame } from 'remotion';
import * as THREE from 'three';

export const AtmosphericDustField: React.FC = () => {
  const frame = useCurrentFrame();

  const particleCount = 24;
  const initialPositions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = (Math.random() - 0.2) * 6;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, []);

  const animatedPositions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const x0 = initialPositions[i * 3];
      const y0 = initialPositions[i * 3 + 1];
      const z0 = initialPositions[i * 3 + 2];

      const time = frame * 0.01;
      pos[i * 3] = x0 + Math.sin(time + i * 0.5) * 0.15;
      pos[i * 3 + 1] = y0 + Math.cos(time + i * 0.7) * 0.12;
      pos[i * 3 + 2] = z0 + Math.sin(time * 0.8 + i) * 0.1;
    }
    return pos;
  }, [frame, initialPositions]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[animatedPositions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#4daeeb"
        transparent
        opacity={0.20}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};
