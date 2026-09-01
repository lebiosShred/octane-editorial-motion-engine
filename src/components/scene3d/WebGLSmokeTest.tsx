import React from 'react';
import { ThreeCanvas } from '@remotion/three';
import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';

const SmokeTestMesh: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const rotationY = interpolate(frame, [0, fps * 2], [0, Math.PI * 2]);
  const rotationX = interpolate(frame, [0, fps * 2], [0, Math.PI]);

  return (
    <mesh rotation={[rotationX, rotationY, 0]}>
      <boxGeometry args={[3, 3, 3]} />
      <meshStandardMaterial color="#4daeeb" metalness={0.7} roughness={0.2} />
    </mesh>
  );
};

export const WebGLSmokeTest: React.FC = () => {
  return (
    <div style={{ width: 1920, height: 1080, backgroundColor: '#000000' }}>
      <ThreeCanvas width={1920} height={1080}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} />
        <pointLight position={[-10, -10, -10]} color="#F43F5E" intensity={1} />
        <SmokeTestMesh />
      </ThreeCanvas>
    </div>
  );
};
