import React from 'react';
import { useCurrentFrame, spring, useVideoConfig, interpolate } from 'remotion';
import { OPENING_SCENE_GEOMETRY, SPATIAL_TOKENS } from '../../utils/SpatialLayoutMatrix';
import { OPTICAL_MATERIALS, SpecularTopRim } from '../../utils/OpticalMateriality';

export const StoryOpeningSequence: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const geom = OPENING_SCENE_GEOMETRY;

  // ==========================================
  // STEP 1: Isolated Titanium "6" drops in (Frames 0 - 75)
  // ==========================================
  const sixEntranceSpring = spring({
    frame,
    fps,
    config: { mass: 0.6, damping: 12, stiffness: 140 },
  });
  const sixInitialScale = interpolate(sixEntranceSpring, [0, 1], [0.75, 1.0]);
  const sixInitialOpacity = interpolate(sixEntranceSpring, [0, 1], [0, 1]);

  // ==========================================
  // STEP 2: "6" moves UP + "MONTHS OF GLUE CODE" reveals (Frames 75 - 150)
  // ==========================================
  const step2Spring = spring({
    frame: Math.max(0, frame - 75),
    fps,
    config: { mass: 0.8, damping: 14, stiffness: 110 },
  });
  const headerInitialOffset = geom.headerInitialTop - geom.headerActiveTop;
  const headerY = interpolate(step2Spring, [0, 1], [headerInitialOffset, 0]);
  const subtitleOpacity = interpolate(step2Spring, [0, 1], [0, 1]);
  const subtitleY = interpolate(step2Spring, [0, 1], [30, 0]);

  // ==========================================
  // STEP 3: Vertical Neon Laser Line draws deep down across Screen 1 & Screen 2 (Frames 150 - 240)
  // ==========================================
  const lineSpring = spring({
    frame: Math.max(0, frame - 150),
    fps,
    config: { mass: 0.9, damping: 16, stiffness: 80 },
  });
  const lineHeight = interpolate(lineSpring, [0, 1], [0, geom.timelineLength]);
  const lineOpacity = interpolate(lineSpring, [0, 1], [0, 1]);

  // ==========================================
  // STEP 4: "DAY 1" Git Commit Tag pops in at top of timeline corridor (Frames 230 - 280)
  // ==========================================
  const pinPopSpring = spring({
    frame: Math.max(0, frame - 230),
    fps,
    config: { mass: 0.5, damping: 11, stiffness: 160 },
  });
  const pinScale = interpolate(pinPopSpring, [0, 1], [0, 1.0]);
  const pinOpacity = interpolate(pinPopSpring, [0, 1], [0, 1]);

  // ==========================================
  // STEP 5: "DAY 1" travels down the 2400px timeline (Frames 280 - 430)
  // ==========================================
  const slideSpring = spring({
    frame: Math.max(0, frame - 280),
    fps,
    config: { mass: 1.0, damping: 16, stiffness: 80 },
  });
  const pinTravelY = interpolate(slideSpring, [0, 1], [0, geom.timelineLength]);

  const dayValue = Math.round(
    interpolate(frame, [280, 420], [1, 180], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );

  // ==========================================
  // DYNAMIC CAMERA TRACKING (CameraY)
  // ==========================================
  const cameraTrackingY = interpolate(
    slideSpring,
    [0.15, 0.9],
    [0, geom.cameraMaxTrackingY],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Impact shake when hitting Day 180 (Frames 420 - 440)
  const impactFrame = Math.max(0, frame - 420);
  const impactShake =
    impactFrame > 0 && impactFrame < 18
      ? Math.sin(impactFrame * 2) * (18 - impactFrame) * 0.9
      : 0;

  // Stalled card reveal after impact (Frames 425 - 475)
  const stalledSpring = spring({
    frame: Math.max(0, frame - 425),
    fps,
    config: { mass: 0.6, damping: 12, stiffness: 140 },
  });
  const stalledScale = interpolate(stalledSpring, [0, 1], [0.8, 1.0]);
  const stalledOpacity = interpolate(stalledSpring, [0, 1], [0, 1]);

  const isStalled = frame >= 415;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#000000',
        perspective: 1400,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          transform: `translateY(-${cameraTrackingY}px) translateY(${impactShake}px)`,
          transformStyle: 'preserve-3d',
          position: 'relative',
        }}
      >
        {/* SCREEN 1 REGION: Typography Header */}
        <div
          style={{
            position: 'absolute',
            top: geom.headerActiveTop,
            left: 0,
            right: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            transform: `translateY(${headerY}px)`,
          }}
        >
          {/* 3D Titanium "6" with Specular Rim */}
          <div
            style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: geom.sixFontSize,
              fontWeight: 900,
              color: '#FFFFFF',
              lineHeight: 0.85,
              letterSpacing: '-0.06em',
              transform: `scale(${sixInitialScale})`,
              opacity: sixInitialOpacity,
              textShadow: '0 25px 60px rgba(0, 0, 0, 0.95), 0 0 80px rgba(77, 174, 235, 0.3)',
              userSelect: 'none',
              position: 'relative',
            }}
          >
            6
          </div>

          <div
            style={{
              marginTop: SPATIAL_TOKENS.RHYTHM.MICRO,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              transform: `translateY(${subtitleY}px)`,
              opacity: subtitleOpacity,
            }}
          >
            <div
              style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: geom.subtitleFontSize,
                fontWeight: 900,
                color: '#FFFFFF',
                textTransform: 'uppercase',
                letterSpacing: '-0.02em',
                textAlign: 'center',
                lineHeight: 1.1,
              }}
            >
              MONTHS OF GLUE CODE
            </div>
          </div>
        </div>

        {/* CONTINUOUS TIMELINE CORRIDOR */}
        <div
          style={{
            position: 'absolute',
            top: geom.timelineStartY,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 400,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* Vertical Neon Conduit Line */}
          <div
            style={{
              width: 6,
              height: lineHeight,
              background: 'linear-gradient(180deg, #FFFFFF 0%, #4daeeb 40%, #FFFFFF 80%, #4daeeb 100%)',
              borderRadius: 3,
              boxShadow: '0 0 20px rgba(255, 255, 255, 0.6), 0 0 35px rgba(77, 174, 235, 0.5)',
              opacity: lineOpacity,
              position: 'relative',
            }}
          >
            {lineSpring < 0.98 && (
              <div
                style={{
                  position: 'absolute',
                  bottom: -6,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  backgroundColor: '#FFFFFF',
                  boxShadow: '0 0 24px #4daeeb, 0 0 40px #FFFFFF',
                }}
              />
            )}
          </div>

          {/* TACTILE DAY COMMIT PIN */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              transform: `translateY(${pinTravelY}px) scale(${pinScale})`,
              opacity: pinOpacity,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              zIndex: 10,
            }}
          >
            <div
              style={{
                background: isStalled
                  ? 'linear-gradient(145deg, #EF4444 0%, #B91C1C 100%)'
                  : 'linear-gradient(145deg, #60C5FF 0%, #2080C4 100%)',
                color: isStalled ? '#FFFFFF' : '#000000',
                fontSize: 34,
                fontWeight: 900,
                padding: '14px 42px',
                borderRadius: 40,
                fontFamily: '"Inter", sans-serif',
                letterSpacing: '0.04em',
                border: '1.5px solid rgba(255, 255, 255, 0.7)',
                boxShadow: isStalled
                  ? '0 20px 50px rgba(239, 68, 68, 0.8), inset 0 2px 3px rgba(255, 255, 255, 0.85)'
                  : '0 20px 50px rgba(77, 174, 235, 0.8), inset 0 2px 3px rgba(255, 255, 255, 0.85)',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '45%',
                  background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0) 100%)',
                  borderRadius: '40px 40px 0 0',
                }}
              />
              DAY {dayValue}
            </div>

            <div
              style={{
                width: 0,
                height: 0,
                borderLeft: '10px solid transparent',
                borderRight: '10px solid transparent',
                borderTop: isStalled ? '12px solid #B91C1C' : '12px solid #2080C4',
                marginTop: -1,
                filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.5))',
              }}
            />
          </div>

          {/* SCREEN 2 DESTINATION: AUTHENTIC [ PIPELINE STALLED ] TELEMETRY CARD */}
          <div
            style={{
              position: 'absolute',
              top: geom.cardTopY,
              transform: `scale(${stalledScale})`,
              opacity: stalledOpacity,
              width: 640,
              ...OPTICAL_MATERIALS.CRIMSON_OBSIDIAN,
              padding: '28px 36px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              zIndex: 5,
              position: 'relative',
            }}
          >
            <SpecularTopRim />
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              }}
            >
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  backgroundColor: '#EF4444',
                  boxShadow: '0 0 14px #EF4444',
                }}
              />
              <div
                style={{
                  fontSize: 32,
                  fontWeight: 900,
                  color: '#EF4444',
                  fontFamily: '"JetBrains Mono", monospace',
                  letterSpacing: '0.08em',
                }}
              >
                [ PIPELINE STALLED ]
              </div>
            </div>

            <div
              style={{
                marginTop: 10,
                fontSize: 20,
                color: '#94A3B8',
                fontFamily: '"JetBrains Mono", monospace',
                fontWeight: 600,
                display: 'flex',
                gap: 16,
              }}
            >
              <span>AGENTS_IN_PROD: 0</span>
              <span>//</span>
              <span style={{ color: '#EF4444' }}>DEPLOYMENT_TIMEOUT</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
