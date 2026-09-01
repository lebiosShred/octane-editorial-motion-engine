import React from 'react';
import { useCurrentFrame, spring, useVideoConfig, interpolate } from 'remotion';

export const StoryOpeningSequence: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ==========================================
  // STEP 1: Isolated "6" drops in (Frames 0 - 75)
  // ==========================================
  const sixEntranceSpring = spring({
    frame,
    fps,
    config: { mass: 0.6, damping: 12, stiffness: 140 },
  });
  const sixInitialScale = interpolate(sixEntranceSpring, [0, 1], [0.7, 1.0]);
  const sixInitialOpacity = interpolate(sixEntranceSpring, [0, 1], [0, 1]);

  // ==========================================
  // STEP 2: "6" moves UP + "MONTHS OF GLUE CODE" reveals (Frames 75 - 150)
  // ==========================================
  const step2Spring = spring({
    frame: Math.max(0, frame - 75),
    fps,
    config: { mass: 0.8, damping: 14, stiffness: 110 },
  });
  const sixYOffset = interpolate(step2Spring, [0, 1], [0, -180]);
  const subtitleY = interpolate(step2Spring, [0, 1], [40, 0]);
  const subtitleOpacity = interpolate(step2Spring, [0, 1], [0, 1]);

  // ==========================================
  // STEP 3: Vertical White Line draws deep down across Screen 1 & Screen 2 (Frames 150 - 240)
  // Line extends from Y = 700 all the way down to Y = 2400 (Length = 1700px)
  // ==========================================
  const lineSpring = spring({
    frame: Math.max(0, frame - 150),
    fps,
    config: { mass: 0.9, damping: 16, stiffness: 80 },
  });
  const lineHeight = interpolate(lineSpring, [0, 1], [0, 1750]);
  const lineOpacity = interpolate(lineSpring, [0, 1], [0, 1]);

  // ==========================================
  // STEP 4: "DAY 1" pin pops in at the top of the line (Frames 230 - 280)
  // ==========================================
  const pinPopSpring = spring({
    frame: Math.max(0, frame - 230),
    fps,
    config: { mass: 0.5, damping: 11, stiffness: 160 },
  });
  const pinScale = interpolate(pinPopSpring, [0, 1], [0, 1.0]);
  const pinOpacity = interpolate(pinPopSpring, [0, 1], [0, 1]);

  // ==========================================
  // STEP 5: "DAY 1" slides down the long line (Frames 280 - 430)
  // Pin travels from Y = 0 to Y = 1700
  // ==========================================
  const slideSpring = spring({
    frame: Math.max(0, frame - 280),
    fps,
    config: { mass: 1.0, damping: 16, stiffness: 80 },
  });
  const pinTravelY = interpolate(slideSpring, [0, 1], [0, 1700]);

  // Day counter ticks from 1 to 180 during travel
  const dayValue = Math.round(
    interpolate(frame, [280, 420], [1, 180], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );

  // ==========================================
  // CAMERA TRACKING (CameraY):
  // As the pin passes the bottom half of Screen 1, the camera smoothly tracks DOWN
  // pushing "6 MONTHS OF GLUE CODE" off-screen and centering Screen 2!
  // ==========================================
  const cameraTrackingY = interpolate(
    slideSpring,
    [0.15, 0.85],
    [0, 1480],
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
  const stalledScale = interpolate(stalledSpring, [0, 1], [0.75, 1.0]);
  const stalledOpacity = interpolate(stalledSpring, [0, 1], [0, 1]);

  // Warning state on Day 180
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
      {/* Continuous World Stage Canvas (Moves with CameraY) */}
      <div
        style={{
          width: '100%',
          height: '100%',
          transform: `translateY(-${cameraTrackingY}px) translateY(${impactShake}px)`,
          transformStyle: 'preserve-3d',
          position: 'relative',
        }}
      >
        {/* ========================================================= */}
        {/* SCREEN 1 REGION (Y = 0 to Y = 960)                         */}
        {/* ========================================================= */}
        <div
          style={{
            position: 'absolute',
            top: 420,
            left: 0,
            right: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            transform: `translateY(${sixYOffset}px)`,
          }}
        >
          {/* STEP 1: Isolated "6" */}
          <div
            style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: 480,
              fontWeight: 900,
              color: '#FFFFFF',
              lineHeight: 0.85,
              letterSpacing: '-0.06em',
              transform: `scale(${sixInitialScale})`,
              opacity: sixInitialOpacity,
              textShadow: '0 20px 60px rgba(0, 0, 0, 0.9), 0 0 80px rgba(77, 174, 235, 0.25)',
              userSelect: 'none',
            }}
          >
            6
          </div>

          {/* STEP 2: "MONTHS OF GLUE CODE" */}
          <div
            style={{
              marginTop: 12,
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
                fontSize: 68,
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

        {/* ========================================================= */}
        {/* CONTINUOUS TIMELINE CORRIDOR (Spans Screen 1 -> Screen 2) */}
        {/* ========================================================= */}
        <div
          style={{
            position: 'absolute',
            top: 720,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 400,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* STEP 3: Vertical White Line (1700px continuous length) */}
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
            {/* Glowing tracer tip during drawing */}
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

          {/* STEP 4 & 5: "DAY 1" -> "DAY 180" Sliding Motion Graphic Pin */}
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
            {/* 3D Tactile Pin Badge */}
            <div
              style={{
                background: isStalled
                  ? 'linear-gradient(145deg, #EF4444 0%, #B91C1C 100%)'
                  : 'linear-gradient(145deg, #60C5FF 0%, #2080C4 100%)',
                color: isStalled ? '#FFFFFF' : '#000000',
                fontSize: 34,
                fontWeight: 900,
                padding: '14px 40px',
                borderRadius: 40,
                fontFamily: '"Inter", sans-serif',
                letterSpacing: '0.04em',
                border: '1px solid rgba(255, 255, 255, 0.6)',
                boxShadow: isStalled
                  ? '0 15px 40px rgba(239, 68, 68, 0.8), inset 0 2px 2px rgba(255, 255, 255, 0.8)'
                  : '0 15px 40px rgba(77, 174, 235, 0.8), inset 0 2px 2px rgba(255, 255, 255, 0.8)',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Glass Top Rim */}
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

            {/* Downward Needle Pointer */}
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

          {/* ========================================================= */}
          {/* SCREEN 2 DESTINATION: [ PIPELINE STALLED ] CARD           */}
          {/* Sits at bottom of line (Y = 1750), perfectly centered in  */}
          {/* Screen 2 once the camera tracks down!                     */}
          {/* ========================================================= */}
          <div
            style={{
              position: 'absolute',
              top: 1760,
              transform: `scale(${stalledScale})`,
              opacity: stalledOpacity,
              width: 580,
              background: 'linear-gradient(155deg, #1A1215 0%, #0D090B 100%)',
              border: '2px solid rgba(239, 68, 68, 0.5)',
              borderRadius: 24,
              padding: '28px 36px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              boxShadow: '0 30px 70px rgba(0, 0, 0, 0.95), 0 0 50px rgba(239, 68, 68, 0.25)',
              zIndex: 5,
            }}
          >
            <div
              style={{
                fontSize: 34,
                fontWeight: 900,
                color: '#EF4444',
                fontFamily: '"JetBrains Mono", monospace',
                letterSpacing: '0.08em',
              }}
            >
              [ PIPELINE STALLED ]
            </div>
            <div
              style={{
                marginTop: 8,
                fontSize: 22,
                color: '#94A3B8',
                fontFamily: '"Inter", sans-serif',
                fontWeight: 600,
              }}
            >
              0 Agents In Production
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
