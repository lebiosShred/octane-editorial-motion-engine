import { interpolate, Easing } from 'remotion';
import React from 'react';

export interface CameraWaypoint {
  frame: number;
  scale: number;
  panX: number;
  panY: number;
  activeClusterIndex?: number;
  description?: string;
}

/**
 * Spatial Choreography & Camera Waypoint Interpolator
 * Computes frame-accurate scale and translation coordinates with hold-and-sweep transitions.
 */
export function interpolateCameraWaypoints(
  currentFrame: number,
  scenes: { startSec: number; endSec: number; waypoint: CameraWaypoint }[],
  fps: number = 60
): { scale: number; panX: number; panY: number; activeClusterIndex: number } {
  if (scenes.length === 0) {
    return { scale: 1.0, panX: 0, panY: 0, activeClusterIndex: 0 };
  }

  // Determine current active scene
  const currentTime = currentFrame / fps;
  let activeIndex = 0;
  for (let i = 0; i < scenes.length; i++) {
    if (currentTime >= scenes[i].startSec && currentTime < scenes[i].endSec) {
      activeIndex = i;
      break;
    }
    if (currentTime >= scenes[scenes.length - 1].startSec) {
      activeIndex = scenes.length - 1;
    }
  }

  const currentScene = scenes[activeIndex];
  const nextScene = scenes[Math.min(scenes.length - 1, activeIndex + 1)];

  const startFrame = Math.round(currentScene.startSec * fps);
  const endFrame = Math.round(currentScene.endSec * fps);
  const transitionFrames = 30; // 0.5s transition window at 60fps
  const transitionStart = Math.max(startFrame, endFrame - transitionFrames);

  let panX = currentScene.waypoint.panX;
  let panY = currentScene.waypoint.panY;
  let scale = currentScene.waypoint.scale;

  if (currentFrame >= transitionStart && activeIndex < scenes.length - 1) {
    panX = interpolate(
      currentFrame,
      [transitionStart, endFrame],
      [currentScene.waypoint.panX, nextScene.waypoint.panX],
      {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.bezier(0.22, 1, 0.36, 1),
      }
    );
    panY = interpolate(
      currentFrame,
      [transitionStart, endFrame],
      [currentScene.waypoint.panY, nextScene.waypoint.panY],
      {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.bezier(0.22, 1, 0.36, 1),
      }
    );
    scale = interpolate(
      currentFrame,
      [transitionStart, endFrame],
      [currentScene.waypoint.scale, nextScene.waypoint.scale],
      {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.bezier(0.22, 1, 0.36, 1),
      }
    );
  }

  return { scale, panX, panY, activeClusterIndex: activeIndex };
}

/**
 * Selective focus helper: blurs and dims inactive scene clusters on the continuous stage.
 */
export function getSelectiveFocusStyle(isActive: boolean): React.CSSProperties {
  return {
    opacity: isActive ? 1.0 : 0.0,
    filter: isActive ? 'none' : 'blur(10px)',
    pointerEvents: isActive ? 'auto' : 'none',
  };
}
