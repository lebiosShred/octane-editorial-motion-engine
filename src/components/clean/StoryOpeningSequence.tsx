import React from 'react';
import { useCurrentFrame, spring, useVideoConfig, interpolate } from 'remotion';

export const StoryOpeningSequence: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ==========================================
  // STEP 1: Isolated "6" only (Frames 0 - 80)
  // ==========================================
  const sixEntranceSpring = spring({
    frame,
    fps,
    config: { mass: 0.6, damping: 12, stiffness: 140 },
  });
  const sixInitialScale = interpolate(sixEntranceSpring, [0, 1], [0.7, 1.0]);
  const sixInitialOpacity = interpolate(sixEntranceSpring, [0, 1], [0, 1]);

  // ==========================================
  // STEP 2: "6" moves UP + "MONTHS OF GLUE CODE" reveals (Frames 80 - 160)
  // ==========================================
  const step2Spring = spring({
    frame: Math.max(0, frame - 80),
    fps,
    config: { mass: 0.8, damping: 14, stiffness: 110 },
  });
  const sixY = interpolate(step2Spring, [0, 1], [0, -320]);
  const subtitleY = interpolate(step2Spring, [0, 1], [50, 0]);
  const subtitleOpacity = interpolate(step2Spring, [0, 1], [0, 1]);

  // Hierarchy Suppression: Dim "6" and title when line & pin become active
  const headerDim = interpolate(frame, [160, 220], [1.0, 0.35], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // ==========================================
  // STEP 3: Vertical White Line draws down slowly (Frames 160 - 240)
  // ==========================================
  const lineSpring = spring({
    frame: Math.max(0, frame - 160),
    fps,
    config: { mass: 0.8, damping: 16, stiffness: 90 },
  });
  const lineHeight = interpolate(lineSpring, [0, 1], [0, 480]);
  const lineOpacity = interpolate(lineSpring, [0, 1], [0, 1]);

  // ==========================================
  // STEP 4: "DAY 1" pops up on top of line (Frames 240 - 290)
  // ==========================================
  const pinPopSpring = spring({
    frame: Math.max(0, frame - 240),
    fps,
    config: { mass: 0.5, damping: 11, stiffness: 160 },
  });
  const pinScale = interpolate(pinPopSpring, [0, 1], [0, 1.0]);
  const pinOpacity = interpolate(pinPopSpring, [0, 1], [0, 1]);

  // ==========================================
  // STEP 5: "DAY 1" slides down the line -> DAY 180 (Frames 300 - 430)
  // ==========================================
  const slideSpring = spring({
    frame: Math.max(0, frame - 300),
    fps,
    config: { mass: 0.9, damping: 15, stiffness: 90 },
  });
  const pinSlideY = interpolate(slideSpring, [0, 1], [0, 450]);

  // Day counter ticks 1 -> 180 during slide
  const dayValue = Math.round(
    interpolate(frame, [300, 420], [1, 180], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );

  // Impact shake when hitting Day 180 (Frames 420 - 440)
  const impactFrame = Math.max(0, frame - 420);
  const impactShake =
    impactFrame > 0 && impactFrame < 18
      ? Math.sin(impactFrame * 2) * (18 - impactFrame) * 0.9
      : 0;

  // Stalled card reveal after impact (Frames 430 - 480)
  const stalledSpring = spring({
    frame: Math.max(0, frame - 430),
    fps,
    config: { mass: 0.6, damping: 12, stiffness: 140 },
  });
  const stalledScale = interpolate(stalledSpring, [0, 1], [0.8, 1.0]);
  const stalledOpacity = interpolate(stalledSpring, [0, 1], [0, 1]);

  // Warning state on Day 180
  const isStalled = frame >= 415;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000000',
        perspective: 1400,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* 3D Stage Container */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          transform: `translateY(${sixY}px) translateY(${impactShake}px)`,
          transformStyle: 'preserve-3d',
          position: 'relative',
        }}
      >
        {/* STEP 1 & 2: Header Group (Subject to Dimming in Step 3-5) */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            opacity: headerDim,
            transition: 'opacity 0.2s ease',
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

          {/* STEP 2: "MONTHS OF GLUE CODE" reveals underneath as 6 moves up */}
          <div
            style={{
              marginTop: 10,
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

        {/* STEP 3, 4 & 5: Vertical Line + Sliding Day Pin */}
        <div
          style={{
            position: 'absolute',
            top: 560,
            width: 400,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* STEP 3: Vertical White Line draws down */}
          <div
            style={{
              width: 6,
              height: lineHeight,
              background: 'linear-gradient(180deg, #FFFFFF 0%, #4daeeb 70%, rgba(77,174,235,0.4) 100%)',
              borderRadius: 3,
              boxShadow: '0 0 20px rgba(255, 255, 255, 0.6), 0 0 35px rgba(77, 174, 235, 0.5)',
              opacity: lineOpacity,
              position: 'relative',
            }}
          >
            {/* Glowing tracer tip while drawing */}
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
              transform: `translateY(${pinSlideY}px) scale(${pinScale})`,
              opacity: pinOpacity,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              zIndex: 10,
            }}
          >
            {/* 3D Tactile Pin Badge with Glass Highlight */}
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

          {/* Stalled Roadmap Card (Snaps in when Day 180 hits bottom) */}
          <div
            style={{
              position: 'absolute',
              top: 510,
              transform: `scale(${stalledScale})`,
              opacity: stalledOpacity,
              width: 580,
              background: 'linear-gradient(155deg, #1A1215 0%, #0D090B 100%)',
              border: '2px solid rgba(239, 68, 68, 0.5)',
              borderRadius: 24,
              padding: '24px 32px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              boxShadow: '0 30px 70px rgba(0, 0, 0, 0.95), 0 0 50px rgba(239, 68, 68, 0.25)',
              zIndex: 5,
            }}
          >
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
