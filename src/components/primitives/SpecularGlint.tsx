import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';

interface SpecularGlintProps {
  startFrame?: number;
  durationFrames?: number;
  opacity?: number;
}

export const SpecularGlint: React.FC<SpecularGlintProps> = ({
  startFrame = 6,
  durationFrames = 20,
  opacity = 0.6
}) => {
  const frame = useCurrentFrame();

  const progress = interpolate(frame, [startFrame, startFrame + durationFrames], [-100, 220], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        background: `linear-gradient(115deg, transparent 40%, rgba(255, 255, 255, ${opacity}) 50%, transparent 60%)`,
        transform: `translateX(${progress}%)`,
        zIndex: 30
      }}
    />
  );
};
