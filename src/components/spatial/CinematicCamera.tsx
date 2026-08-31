import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';

interface CinematicCameraProps {
  cameraPanX: number;
  cameraPanY: number;
  cameraScale: number;
  shakeFrames?: number[];
  children: React.ReactNode;
}

export const CinematicCamera: React.FC<CinematicCameraProps> = ({
  cameraPanX,
  cameraPanY,
  cameraScale,
  shakeFrames = [60, 408, 600, 780],
  children
}) => {
  const frame = useCurrentFrame();

  // Continuous micro-harmonic organic float (Rule 30 Anti-Static Frame Law)
  const harmonicFloatX = Math.sin(frame * 0.03) * 2.5;
  const harmonicFloatY = Math.cos(frame * 0.025) * 2.0;

  // Impact micro-shake calculation on key milestone frames
  let shakeX = 0;
  let shakeY = 0;
  for (const sFrame of shakeFrames) {
    if (frame >= sFrame && frame <= sFrame + 10) {
      const decay = interpolate(frame, [sFrame, sFrame + 10], [1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp'
      });
      const freq = (frame - sFrame) * 2.5;
      shakeX += Math.sin(freq) * 3.5 * decay;
      shakeY += Math.cos(freq * 1.3) * 3.0 * decay;
    }
  }

  const effectivePanX = cameraPanX + harmonicFloatX + shakeX;
  const effectivePanY = cameraPanY + harmonicFloatY + shakeY;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transform: `scale(${cameraScale}) translate3d(${effectivePanX}px, ${effectivePanY}px, 0)`,
        transformOrigin: '50% 50%',
        willChange: 'transform'
      }}
    >
      {children}
    </div>
  );
};
