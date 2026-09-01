import React from 'react';
import { useCurrentFrame, interpolate, useVideoConfig } from 'remotion';
import { StoryOpeningSequence } from '../clean/StoryOpeningSequence';
import { DarkTerminalCodeInspector } from '../clean/DarkTerminalCodeInspector';
import { StackedDeckCatalog } from '../metaphors/StackedDeckCatalog';
import { InteractiveTogglePill } from '../clean/InteractiveTogglePill';
import { KineticOdometer } from '../metaphors/KineticOdometer';
import { WatsonxOrbitalEmblem } from '../clean/WatsonxOrbitalEmblem';
import { BlueprintGridStage } from '../clean/BlueprintGridStage';

export const ContinuousWorldStage: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Master Global Virtual Camera Tracking
  // Camera seamlessly pans and zooms to keep active storytelling anchors framed perfectly
  const camZoom = interpolate(
    frame,
    [0, 80, 600, 1050, 1650, 2250, 2800, 3407],
    [1.0, 1.05, 1.0, 1.04, 1.0, 1.06, 1.02, 1.0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const camY = interpolate(
    frame,
    [0, 160, 420, 600, 1050, 1650, 2250, 2800, 3407],
    [0, -20, 20, 0, 0, 0, 0, 0, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Subtle continuous 3D pitch and yaw
  const camTiltX = Math.sin(frame * 0.02) * 1.5;
  const camTiltY = Math.cos(frame * 0.025) * 1.5;

  return (
    <BlueprintGridStage hudTag="WATSONX // ENTERPRISE_ORCHESTRATION_ENGINE">
      {/* Continuous 3D World Stage */}
      <div
        style={{
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          transform: `scale(${camZoom}) translateY(${camY}px) rotateX(${camTiltX}deg) rotateY(${camTiltY}deg)`,
          position: 'relative',
        }}
      >
        {/* ========================================================================= */}
        {/* SCENE 1: The 5-Step Story Opening Journey (f0 - f600 | 0.0s - 10.0s)       */}
        {/* Isolated "6" -> Glide up + Months -> White Line -> Day 1 Pin -> Day 180   */}
        {/* ========================================================================= */}
        {frame < 640 && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              opacity: interpolate(frame, [570, 630], [1, 0], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
              transform: `scale(${interpolate(frame, [570, 630], [1, 0.9], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              })})`,
              pointerEvents: frame >= 600 ? 'none' : 'auto',
            }}
          >
            <StoryOpeningSequence />
          </div>
        )}

        {/* ========================================================================= */}
        {/* SCENE 2: Dark-Mode Code Terminal Inspector (f600 - f1080 | 10.0s - 18.0s)  */}
        {/* "Brittle authentication & custom API glue code -> 401 Disconnect"         */}
        {/* ========================================================================= */}
        {frame >= 580 && frame < 1120 && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              opacity: interpolate(frame, [580, 630, 1050, 1110], [0, 1, 1, 0], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
              transform: `scale(${interpolate(frame, [580, 630, 1050, 1110], [0.9, 1, 1, 0.9], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              })})`,
              pointerEvents: frame < 600 || frame >= 1080 ? 'none' : 'auto',
            }}
          >
            <DarkTerminalCodeInspector breakFrame={120} />
          </div>
        )}

        {/* ========================================================================= */}
        {/* SCENE 3: Fanning 3D Glass Brand Deck (f1080 - f1680 | 18.0s - 28.0s)      */}
        {/* "IBM solved this with watsonx Orchestrate... 150+ pre-built agents"       */}
        {/* ========================================================================= */}
        {frame >= 1060 && frame < 1720 && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              opacity: interpolate(frame, [1060, 1110, 1650, 1710], [0, 1, 1, 0], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
              transform: `scale(${interpolate(frame, [1060, 1110, 1650, 1710], [0.9, 1, 1, 0.95], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              })})`,
              pointerEvents: frame < 1080 || frame >= 1680 ? 'none' : 'auto',
            }}
          >
            <StackedDeckCatalog />
          </div>
        )}

        {/* ========================================================================= */}
        {/* SCENE 4: 1-Click Governance Laser Toggle (f1680 - f2280 | 28.0s - 38.0s)  */}
        {/* "Instead of writing API wrappers... 1-click manager approval"             */}
        {/* ========================================================================= */}
        {frame >= 1660 && frame < 2320 && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              opacity: interpolate(frame, [1660, 1710, 2250, 2310], [0, 1, 1, 0], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
              transform: `scale(${interpolate(frame, [1660, 1710, 2250, 2310], [0.9, 1, 1, 0.95], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              })})`,
              pointerEvents: frame < 1680 || frame >= 2280 ? 'none' : 'auto',
            }}
          >
            <InteractiveTogglePill />
          </div>
        )}

        {/* ========================================================================= */}
        {/* SCENE 5: Mechanical Chronograph Odometer (f2280 - f2840 | 38.0s - 47.3s)   */}
        {/* "11.2x Faster Time-To-Value | Deploy In Days"                              */}
        {/* ========================================================================= */}
        {frame >= 2260 && frame < 2880 && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              opacity: interpolate(frame, [2260, 2310, 2800, 2860], [0, 1, 1, 0], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
              transform: `scale(${interpolate(frame, [2260, 2310, 2800, 2860], [0.9, 1, 1, 0.95], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              })})`,
              pointerEvents: frame < 2280 || frame >= 2840 ? 'none' : 'auto',
            }}
          >
            <KineticOdometer />
          </div>
        )}

        {/* ========================================================================= */}
        {/* SCENE 6: 3D Orbital Emblem & Blueprint Outro (f2840 - f3407 | 47.3s - 56.8s)*/}
        {/* "Build with watsonx Orchestrate | ibm.com/watsonx"                         */}
        {/* ========================================================================= */}
        {frame >= 2820 && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              opacity: interpolate(frame, [2820, 2880], [0, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
              transform: `scale(${interpolate(frame, [2820, 2880], [0.9, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              })})`,
            }}
          >
            <WatsonxOrbitalEmblem isOutro={true} />
          </div>
        )}
      </div>
    </BlueprintGridStage>
  );
};
