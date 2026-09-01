import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { RoundedBox } from '@react-three/drei';
import { CanvasText } from './CanvasText';
import { useOpenTelemetryWaterfallTexture } from '../ui/OpenTelemetryWaterfallTexture';
import * as THREE from 'three';

export const Act4_Observability3D: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const heroSpring = spring({
    frame: Math.max(0, frame - 2994),
    fps,
    config: { mass: 0.8, damping: 10, stiffness: 120 },
  });

  const waterfallProgress = interpolate(frame, [2718, 2994], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const heroScale = interpolate(heroSpring, [0, 1], [0.2, 1.0]);
  const heroElevation = interpolate(heroSpring, [0, 1], [4, 0]);

  // OpenTelemetry Trace Texture
  const otelTexture = useOpenTelemetryWaterfallTexture(waterfallProgress);

  return (
    <group position={[0, 0, 0]}>
      {/* 3D Authentic OpenTelemetry Distributed Trace Tree (Left/Center) */}
      <group position={[-0.6, 0.4, 0]}>
        <mesh position={[0, 0, 0]}>
          <planeGeometry args={[4.2, 2.3]} />
          {otelTexture && (
            <meshStandardMaterial map={otelTexture} transparent side={THREE.DoubleSide} />
          )}
        </mesh>
      </group>

      {/* 3D Monumental 10.1x Speed Multiplier (Hero Climax at f2994) */}
      {frame >= 2994 && (
        <group position={[1.8, heroElevation - 0.2, 0.8]} scale={[heroScale, heroScale, heroScale]}>
          <RoundedBox args={[2.2, 1.4, 0.35]} radius={0.08} smoothness={4}>
            <meshStandardMaterial
              color="#0B0F19"
              emissive="#4daeeb"
              emissiveIntensity={0.6}
              metalness={0.9}
              roughness={0.1}
            />
          </RoundedBox>
          <CanvasText
            position={[0, 0, 0.2]}
            text="10.1x FASTER"
            subtext="[ PRODUCTION TIME: 18 DAYS vs 180 DAYS ]"
            color="#FFFFFF"
            subColor="#10B981"
            fontSize={36}
            subFontSize={13}
            width={480}
            height={130}
            scale={0.9}
          />
        </group>
      )}
    </group>
  );
};
