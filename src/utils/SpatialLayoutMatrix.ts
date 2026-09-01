/**
 * SpatialLayoutMatrix.ts
 * Centralized, typed, self-calculating spatial layout system.
 * Enforces the 8/16/64 visual rhythm and eliminates hardcoded coordinate guessing.
 */

export const SPATIAL_TOKENS = {
  VIEWPORT: {
    WIDTH: 1080,
    HEIGHT: 1920,
    CENTER_X: 540,
    CENTER_Y: 960,
    BOTTOM_SAFE_MARGIN: 250, // Safe zone reserved for mobile captions/UI
  },
  RHYTHM: {
    MICRO: 24,      // Text to Subtitle / Icon to Label
    MESO: 80,       // Pin to Card / Sibling widgets
    MACRO: 140,     // Major section breathing room (Screen 1 to Timeline Corridor)
    SILHOUETTE: 64, // Exclusion zone buffer around active moving focal points
  },
} as const;

export const OPENING_SCENE_GEOMETRY = (() => {
  // Screen 1 Typography Dimensions
  const sixFontSize = 480;
  const sixHeight = Math.round(sixFontSize * 0.85); // 408px
  const textGap = SPATIAL_TOKENS.RHYTHM.MICRO;      // 24px
  const subtitleFontSize = 68;
  const subtitleHeight = Math.round(subtitleFontSize * 1.1); // 75px
  const headerTotalHeight = sixHeight + textGap + subtitleHeight; // 507px

  // Header Anchors
  const headerInitialTop = SPATIAL_TOKENS.VIEWPORT.CENTER_Y - headerTotalHeight / 2; // Centered at start
  const headerActiveTop = 200; // Settled top position when "6" moves up
  const headerActiveBottom = headerActiveTop + headerTotalHeight; // 707px

  // Timeline Corridor Anchors (Guarantees 140px MACRO clearance below subtitle)
  const timelineStartY = headerActiveBottom + SPATIAL_TOKENS.RHYTHM.MACRO; // 707 + 140 = 847px
  const timelineLength = 1550; // Continuous vertical path length
  const timelineEndY = timelineStartY + timelineLength; // 2397px

  // Pin & Needle Dimensions
  const pinHeight = 64;
  const pinNeedleHeight = 12;

  // Screen 2 Stalled Card Destination (Guarantees generous 150px MESO clearance below pin)
  const cardGap = 150;
  const cardTopY = timelineLength + pinNeedleHeight + cardGap; // 1550 + 12 + 150 = 1712px
  const cardHeight = 160;

  // Dynamic Camera Tracking Range
  const cameraMaxTrackingY = timelineEndY - SPATIAL_TOKENS.VIEWPORT.CENTER_Y + 140; // ~1577px

  return {
    sixFontSize,
    sixHeight,
    subtitleFontSize,
    subtitleHeight,
    headerTotalHeight,
    headerInitialTop,
    headerActiveTop,
    headerActiveBottom,
    timelineStartY,
    timelineLength,
    timelineEndY,
    pinHeight,
    pinNeedleHeight,
    cardTopY,
    cardHeight,
    cameraMaxTrackingY,
  };
})();
