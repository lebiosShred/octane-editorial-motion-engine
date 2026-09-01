import React, { useRef } from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { PerspectiveCamera } from '@react-three/drei';
import { BeatDirectorEngine } from '../../engine/BeatDirectorEngine';
import * as THREE from 'three';

export const CameraDirector3D: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  const currentBeat = BeatDirectorEngine.getCurrentBeat(frame);
  const nextBeat =
    BeatDirectorEngine.beats[
      Math.min(currentBeat.beatIndex + 1, BeatDirectorEngine.beats.length - 1)
    ];

  // Transition progress into the current beat
  const beatProgress = spring({
    frame: Math.max(0, frame - currentBeat.startFrame),
    fps,
    config: { mass: 0.7, damping: 14, stiffness: 100 },
  });

  // Previous beat spec for seamless interpolation
  const prevBeat =
    currentBeat.beatIndex > 0
      ? BeatDirectorEngine.beats[currentBeat.beatIndex - 1]
      : currentBeat;

  // Multi-axis position interpolation
  const posX = interpolate(beatProgress, [0, 1], [prevBeat.camera.position[0], currentBeat.camera.position[0]]);
  const posY = interpolate(beatProgress, [0, 1], [prevBeat.camera.position[1], currentBeat.camera.position[1]]);
  const posZ = interpolate(beatProgress, [0, 1], [prevBeat.camera.position[2], currentBeat.camera.position[2]]);

  // Multi-axis lookAt target interpolation
  const targetX = interpolate(beatProgress, [0, 1], [prevBeat.camera.lookAt[0], currentBeat.camera.lookAt[0]]);
  const targetY = interpolate(beatProgress, [0, 1], [prevBeat.camera.lookAt[1], currentBeat.camera.lookAt[1]]);
  const targetZ = interpolate(beatProgress, [0, 1], [prevBeat.camera.lookAt[2], currentBeat.camera.lookAt[2]]);

  // Field of View & Dutch angle roll interpolation
  const fov = interpolate(beatProgress, [0, 1], [prevBeat.camera.fov, currentBeat.camera.fov]);
  const prevRoll = prevBeat.camera.roll || 0;
  const currentRoll = currentBeat.camera.roll || 0;
  const roll = interpolate(beatProgress, [0, 1], [prevRoll, currentRoll]);

  // Continuous organic micro-drift (Lissajous breathing motion — zero dead freezes)
  const driftX = Math.sin(frame * 0.025) * 0.05;
  const driftY = Math.cos(frame * 0.035) * 0.035;
  const driftZ = Math.sin(frame * 0.02) * 0.04;

  const finalPosX = posX + driftX;
  const finalPosY = posY + driftY;
  const finalPosZ = posZ + driftZ;

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      position={[finalPosX, finalPosY, finalPosZ]}
      fov={fov}
      rotation={[0, 0, roll]}
      onUpdate={(c) => {
        c.lookAt(targetX, targetY, targetZ);
        c.rotateZ(roll);
      }}
    />
  );
};
