import { interpolate, Easing } from 'remotion';
import React from 'react';

export interface CameraWaypoint {
  frame: number;
  scale: number;
  panX: number;
  panY: number;
  activeTargetId?: string;
  description?: string;
}

export interface DomainCalculation {
  dimensions: { name: string; count: number; unit: string }[];
  totalCombinations: number;
  formattedFormula: string;
}

/**
 * Stage 1: Domain Telemetry Research Calculator
 * Computes exact mathematical explosions across multidimensional entities.
 */
export function computeDimensionalExplosion(
  dimensions: { name: string; count: number; unit: string }[]
): DomainCalculation {
  const total = dimensions.reduce((acc, curr) => acc * curr.count, 1);
  const formula = dimensions.map(d => `${d.count.toLocaleString()} ${d.unit}`).join(' × ') + ` = ${total.toLocaleString()}`;
  return {
    dimensions,
    totalCombinations: total,
    formattedFormula: formula
  };
}

/**
 * Stage 3: Spatial Choreography & Camera Waypoint Interpolator
 * Computes frame-accurate scale and translation coordinates for guided micro-target tours.
 */
export function interpolateCameraWaypoints(
  currentFrame: number,
  waypoints: CameraWaypoint[]
): { scale: number; panX: number; panY: number; activeTargetId?: string } {
  if (waypoints.length === 0) {
    return { scale: 1.0, panX: 0, panY: 0 };
  }

  const frames = waypoints.map(w => w.frame);
  const scales = waypoints.map(w => w.scale);
  const panXs = waypoints.map(w => w.panX);
  const panYs = waypoints.map(w => w.panY);

  const scale = interpolate(currentFrame, frames, scales, {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.22, 1, 0.36, 1)
  });

  const panX = interpolate(currentFrame, frames, panXs, {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.22, 1, 0.36, 1)
  });

  const panY = interpolate(currentFrame, frames, panYs, {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.22, 1, 0.36, 1)
  });

  let activeTargetId: string | undefined = undefined;
  for (let i = 0; i < waypoints.length; i++) {
    if (currentFrame >= waypoints[i].frame) {
      activeTargetId = waypoints[i].activeTargetId;
    }
  }

  return { scale, panX, panY, activeTargetId };
}

/**
 * Helper to compute selective focus styles for sub-card slots.
 */
export function getSelectiveFocusStyle(isActive: boolean): React.CSSProperties {
  return {
    opacity: isActive ? 1.0 : 0.35,
    filter: isActive ? 'none' : 'blur(1.5px)',
    transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)'
  };
}
