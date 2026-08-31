import React from 'react';

interface GuidedTourStageProps {
  scale: number;
  panX: number;
  panY: number;
  children: React.ReactNode;
}

export const GuidedTourStage: React.FC<GuidedTourStageProps> = ({
  scale,
  panX,
  panY,
  children
}) => {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transform: `scale(${scale}) translate(${panX}px, ${panY}px)`,
        transformOrigin: '50% 50%',
        transition: 'transform 0.05s linear'
      }}
    >
      {children}
    </div>
  );
};
