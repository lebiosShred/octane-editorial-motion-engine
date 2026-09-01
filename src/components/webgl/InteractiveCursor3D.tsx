import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import * as THREE from 'three';

export const InteractiveCursor3D: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Active during frames 2500 - 2718
  if (frame < 2500 || frame > 2718) return null;

  // Flight trajectory toward the ServiceNow button
  const flightSpring = spring({
    frame: Math.max(0, frame - 2500),
    fps,
    config: { mass: 0.6, damping: 14, stiffness: 90 },
  });

  const posX = interpolate(flightSpring, [0, 1], [0.6, 1.8]);
  const posY = interpolate(flightSpring, [0, 1], [0.8, -0.7]);
  const posZ = interpolate(flightSpring, [0, 1], [0.8, 0.35]);

  // Click bounce at frame 2610
  const clickSpring = spring({
    frame: Math.max(0, frame - 2610),
    fps,
    config: { mass: 0.3, damping: 8, stiffness: 200 },
  });

  const scale = frame < 2610
    ? 1.0
    : interpolate(clickSpring, [0, 0.2, 1], [1.0, 0.78, 1.0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Click ripple ring
  const rippleScale = interpolate(clickSpring, [0, 1], [0.1, 1.2], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const rippleOpacity = interpolate(clickSpring, [0, 0.3, 1], [0, 0.9, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <group position={[posX, posY, posZ]}>
      {/* Click Ripple Wave */}
      {frame >= 2610 && (
        <mesh position={[0, 0, -0.02]} scale={[rippleScale, rippleScale, 1]}>
          <ringGeometry args={[0.15, 0.22, 32]} />
          <meshStandardMaterial
            color="#10B981"
            emissive="#10B981"
            emissiveIntensity={2.5}
            transparent
            opacity={rippleOpacity}
          />
        </mesh>
      )}

      {/* Vector Cursor Shape */}
      <group scale={[scale * 0.45, scale * 0.45, 1]} rotation={[0, 0, 0.35]}>
        <mesh position={[0, 0, 0]}>
          <coneGeometry args={[0.22, 0.5, 3]} />
          <meshStandardMaterial
            color="#FFFFFF"
            emissive="#4daeeb"
            emissiveIntensity={0.8}
            metalness={0.2}
            roughness={0.1}
          />
        </mesh>
      </group>
    </group>
  );
};
