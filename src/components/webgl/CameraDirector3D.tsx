import React, { useRef } from 'react';
import { PerspectiveCamera } from '@react-three/drei';
import { useCurrentFrame, interpolate, Easing } from 'remotion';
import * as THREE from 'three';
import { BeatDirectorEngine, BeatSpec } from '../../engine/BeatDirectorEngine';

export const CameraDirector3D: React.FC = () => {
  const frame = useCurrentFrame();
  const beats = BeatDirectorEngine.beats;
  const currentBeat = BeatDirectorEngine.getCurrentBeat(frame);
  const currentIdx = currentBeat.beatIndex;
  const nextBeat = beats[Math.min(beats.length - 1, currentIdx + 1)];

  // Transition window (last 24 frames of the beat = 0.4s)
  const transitionFrames = Math.min(24, Math.floor(currentBeat.durationFrames * 0.25));
  const transitionStart = currentBeat.endFrame - transitionFrames;

  let posX = currentBeat.camera.position[0];
  let posY = currentBeat.camera.position[1];
  let posZ = currentBeat.camera.position[2];

  let targetX = currentBeat.camera.lookAt[0];
  let targetY = currentBeat.camera.lookAt[1];
  let targetZ = currentBeat.camera.lookAt[2];

  let fov = currentBeat.camera.fov;

  if (frame >= transitionStart && currentIdx < beats.length - 1) {
    const ease = Easing.bezier(0.22, 1, 0.36, 1);
    posX = interpolate(frame, [transitionStart, currentBeat.endFrame], [currentBeat.camera.position[0], nextBeat.camera.position[0]], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease });
    posY = interpolate(frame, [transitionStart, currentBeat.endFrame], [currentBeat.camera.position[1], nextBeat.camera.position[1]], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease });
    posZ = interpolate(frame, [transitionStart, currentBeat.endFrame], [currentBeat.camera.position[2], nextBeat.camera.position[2]], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease });

    targetX = interpolate(frame, [transitionStart, currentBeat.endFrame], [currentBeat.camera.lookAt[0], nextBeat.camera.lookAt[0]], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease });
    targetY = interpolate(frame, [transitionStart, currentBeat.endFrame], [currentBeat.camera.lookAt[1], nextBeat.camera.lookAt[1]], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease });
    targetZ = interpolate(frame, [transitionStart, currentBeat.endFrame], [currentBeat.camera.lookAt[2], nextBeat.camera.lookAt[2]], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease });

    fov = interpolate(frame, [transitionStart, currentBeat.endFrame], [currentBeat.camera.fov, nextBeat.camera.fov], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease });
  }

  // Organic micro-drift to prevent static frames
  const driftX = Math.sin(frame * 0.02) * 0.08;
  const driftY = Math.cos(frame * 0.018) * 0.06;

  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      position={[posX + driftX, posY + driftY, posZ]}
      fov={fov}
      near={0.1}
      far={1000}
      onUpdate={(c) => {
        c.lookAt(targetX, targetY, targetZ);
      }}
    />
  );
};
