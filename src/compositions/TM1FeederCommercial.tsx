import React from 'react';
import { AbsoluteFill, Audio, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig, Easing } from 'remotion';
import timingData from '../../public/voiceover.json';

export const TM1FeederCommercial: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentTime = frame / fps;

  // =========================================================================
  // GUIDED MICRO-TARGET EDITORIAL CAMERA ENGINE (PAN & ZOOM TOUR)
  // =========================================================================

  // Camera Zoom (Scale) across the 7 Waypoints
  const camScale = interpolate(
    currentTime,
    [0.0, 0.8, 3.2, 3.8, 7.2, 7.5, 8.2, 11.5, 12.2, 16.2, 16.5, 17.2, 20.0, 20.8, 25.2, 25.5, 29.0, 30.0],
    [1.0, 1.30, 1.30, 1.25, 1.25, 1.0, 1.35, 1.35, 1.32, 1.32, 1.0, 1.30, 1.30, 1.35, 1.35, 1.0, 1.0, 1.02],
    { extrapolateRight: 'clamp', easing: Easing.bezier(0.22, 1, 0.36, 1) }
  );

  // Camera Pan X (TranslateX) across Targets
  const camPanX = interpolate(
    currentTime,
    [0.0, 0.8, 3.2, 3.8, 7.2, 7.5, 8.2, 11.5, 12.2, 16.2, 16.5, 17.2, 20.0, 20.8, 25.2, 25.5, 29.5, 34.3],
    [0, 160, 160, -220, -220, 0, -200, -200, -200, -200, 0, 180, 180, -220, -220, 0, 0, 0],
    { extrapolateRight: 'clamp', easing: Easing.bezier(0.22, 1, 0.36, 1) }
  );

  // Camera Pan Y (TranslateY) across Targets
  const camPanY = interpolate(
    currentTime,
    [0.0, 0.8, 3.2, 3.8, 7.2, 7.5, 8.2, 11.5, 12.2, 16.2, 16.5, 17.2, 20.0, 20.8, 25.2, 25.5, 29.5, 34.3],
    [0, 0, 0, 0, 0, 0, -40, -40, 60, 60, 0, 0, 0, 0, 0, 0, 0, 0],
    { extrapolateRight: 'clamp', easing: Easing.bezier(0.22, 1, 0.36, 1) }
  );

  // Subtitle Word Highlighting
  const activeWordIndex = timingData.words.findIndex(
    (w: any) => currentTime >= w.start && currentTime <= w.end
  );
  const startIdx = Math.max(0, activeWordIndex - 2);
  const endIdx = Math.min(timingData.words.length, startIdx + 5);
  const visibleWords = activeWordIndex >= 0 ? timingData.words.slice(startIdx, endIdx) : [];

  // =========================================================================
  // SCENE 1 TIMINGS (0.0s - 7.5s)
  // =========================================================================
  const s1Progress = interpolate(frame, [0, 16], [0, 1], { extrapolateRight: 'clamp' });
  const s1Exit = interpolate(frame, [215, 225], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const s1Timer = interpolate(currentTime, [0.4, 3.5], [0.0, 42.4], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.25, 0.1, 0.25, 1) });
  const s1TimerColor = s1Timer > 20.0 ? '#F87171' : '#38BDF8';
  const s1LoadingWidth = interpolate(currentTime, [0.4, 3.5], [0, 92], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  
  const s1RamAmount = currentTime < 4.2 ? 8 : currentTime < 5.0 ? 16 : currentTime < 5.8 ? 32 : 64;
  const isS1Target1Active = currentTime < 3.5;
  const isS1Target2Active = currentTime >= 3.5;

  // =========================================================================
  // SCENE 2 TIMINGS (7.5s - 16.5s)
  // =========================================================================
  const s2Enter = spring({ frame: frame - 225, fps, config: { damping: 16, stiffness: 100 } });
  const s2Exit = interpolate(frame, [480, 495], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const s2CellCount = Math.floor(interpolate(currentTime, [7.5, 11.5], [0, 108000000], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1) }));
  const s2RatioNeedle = interpolate(currentTime, [8.5, 12.5], [1, 250], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1) });
  
  const isS2Target1Active = currentTime >= 7.5 && currentTime < 12.0;
  const isS2Target2Active = currentTime >= 12.0;

  // =========================================================================
  // SCENE 3 TIMINGS (16.5s - 25.5s)
  // =========================================================================
  const s3Enter = spring({ frame: frame - 495, fps, config: { damping: 16, stiffness: 100 } });
  const s3Exit = interpolate(frame, [750, 765], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const s3LaserOffset = interpolate(currentTime, [16.5, 18.0], [280, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1) });
  const s3RamBarScale = interpolate(currentTime, [18.0, 19.5], [1.0, 0.13], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1) });
  const s3SpeedSnap = currentTime >= 18.2 ? '0.4s' : '42.4s';
  
  const isS3Target1Active = currentTime >= 16.5 && currentTime < 20.5;
  const isS3Target2Active = currentTime >= 20.5;

  // =========================================================================
  // SCENE 4 TIMINGS (25.5s - 34.3s)
  // =========================================================================
  const s4Enter = spring({ frame: frame - 765, fps, config: { damping: 16, stiffness: 100 } });
  const s4CtaScale = spring({ frame: frame - 880, fps, config: { damping: 16, stiffness: 100 } });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#07090E',
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Inter", sans-serif',
        color: '#F8FAFC',
        overflow: 'hidden'
      }}
    >
      {/* Lossless Master Voiceover */}
      <Audio src={staticFile('voiceover.wav')} />

      {/* Atmospheric Neutral Slate Studio Floor - Locked Static Background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 35%, rgba(30, 41, 59, 0.3) 0%, rgba(7, 9, 14, 0.98) 75%)',
          pointerEvents: 'none'
        }}
      />
      
      {/* Precision 1px Studio Architectural Grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          backgroundPosition: 'center center',
          opacity: 0.8,
          pointerEvents: 'none'
        }}
      />

      {/* Fixed Static Viewport Header */}
      <div style={{ position: 'absolute', top: 36, left: 64, right: 64, display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 1000 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#38BDF8' }} />
          <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#94A3B8' }}>
            OCTANE TELEMETRY LABS
          </span>
        </div>
        <div style={{ background: 'rgba(15, 23, 42, 0.65)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: '6px 16px', fontSize: 12, color: '#64748B', display: 'flex', alignItems: 'center', gap: 8, backdropFilter: 'blur(20px)' }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: currentTime >= 16.5 ? '#10B981' : '#F59E0B' }} />
          {currentTime < 7.5 ? 'DIAGNOSTIC: LATENCY STALL' : currentTime < 16.5 ? 'ROOT CAUSE: OVERFEEDING' : currentTime < 25.5 ? 'REMEDIATION: TARGETED CONTROL' : 'FLIGHT CHECK: COMPLETED'}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* VIRTUAL CAMERA STAGE (DYNAMIC MACRO-TO-MICRO ZOOM & PAN TOUR)             */}
      {/* ========================================================================= */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transform: `scale(${camScale}) translate(${camPanX}px, ${camPanY}px)`,
          transformOrigin: '50% 50%',
          transition: 'transform 0.05s linear'
        }}
      >

        {/* ========================================================================= */}
        {/* SCENE 1: THE 40S DASHBOARD STALL & RAM MYTH (0.0s - 7.5s)                 */}
        {/* ========================================================================= */}
        {currentTime < 7.6 && (
          <div
            style={{
              position: 'absolute',
              width: 1040,
              background: 'rgba(15, 23, 42, 0.88)',
              backdropFilter: 'blur(30px) saturate(180%)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderTop: '1px solid rgba(255, 255, 255, 0.18)',
              borderRadius: 24,
              boxShadow: '0 40px 100px -20px rgba(0,0,0,0.95), 0 0 0 1px rgba(0,0,0,0.5)',
              padding: '32px 38px',
              opacity: s1Progress * s1Exit,
              zIndex: 10
            }}
          >
            {/* Unibody Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: 16, marginBottom: 28 }}>
              <div style={{ display: 'flex', gap: 7, alignItems: 'center' }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#334155' }} />
                <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#334155' }} />
                <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#334155' }} />
                <span style={{ fontSize: 13, color: '#94A3B8', fontWeight: 600, marginLeft: 10 }}>Planning Analytics Workspace &bull; Executive P&amp;L View</span>
              </div>
              <span style={{ fontSize: 11, color: '#F87171', background: 'rgba(239, 68, 68, 0.12)', border: '1px solid rgba(239, 68, 68, 0.2)', padding: '3px 10px', borderRadius: 10, fontWeight: 700, letterSpacing: '0.05em' }}>
                {isS1Target2Active ? 'RAM_INCREASED_STILL_STALLED' : 'THREAD_LOCK_DETECTED'}
              </span>
            </div>

            {/* Two-Target Guided Inspection Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 32, alignItems: 'center' }}>
              
              {/* TARGET 1: Latency Stopwatch (Spotlighted 0.0s - 3.5s) */}
              <div
                style={{
                  background: isS1Target1Active ? 'rgba(2, 6, 23, 0.8)' : 'rgba(2, 6, 23, 0.4)',
                  border: isS1Target1Active ? '1px solid rgba(56, 189, 248, 0.4)' : '1px solid rgba(255, 255, 255, 0.04)',
                  borderRadius: 18,
                  padding: 24,
                  opacity: isS1Target1Active ? 1.0 : 0.45,
                  filter: isS1Target1Active ? 'none' : 'blur(1.5px)',
                  transform: isS1Target1Active ? 'scale(1.02)' : 'scale(0.98)',
                  transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)'
                }}
              >
                <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#64748B', marginBottom: 6, fontWeight: 600 }}>
                  Active Consolidation Latency
                </div>
                <div style={{ fontSize: 64, fontWeight: 800, fontFamily: 'monospace', letterSpacing: '-0.04em', color: s1TimerColor, fontVariantNumeric: 'tabular-nums', lineHeight: 1.1 }}>
                  {s1Timer.toFixed(1)}s
                </div>
                <div style={{ marginTop: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#64748B', marginBottom: 8, fontFamily: 'monospace' }}>
                    <span>Evaluating 8 Dimensions...</span>
                    <span style={{ color: '#F87171' }}>{s1LoadingWidth.toFixed(0)}% STALLED</span>
                  </div>
                  <div style={{ width: '100%', height: 6, backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 3, overflow: 'hidden' }}>
                    <div style={{ width: `${s1LoadingWidth}%`, height: '100%', backgroundColor: s1TimerColor }} />
                  </div>
                </div>
              </div>

              {/* TARGET 2: Infrastructure RAM Spec (Spotlighted 3.5s - 7.5s) */}
              <div
                style={{
                  background: isS1Target2Active ? 'rgba(2, 6, 23, 0.85)' : 'rgba(2, 6, 23, 0.4)',
                  border: isS1Target2Active ? '1px solid rgba(56, 189, 248, 0.4)' : '1px solid rgba(255, 255, 255, 0.04)',
                  borderTop: isS1Target2Active ? '1px solid rgba(56, 189, 248, 0.6)' : '1px solid rgba(255, 255, 255, 0.04)',
                  borderRadius: 18,
                  padding: 24,
                  opacity: isS1Target2Active ? 1.0 : 0.4,
                  filter: isS1Target2Active ? 'none' : 'blur(1.5px)',
                  transform: isS1Target2Active ? 'scale(1.02)' : 'scale(0.98)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 14,
                  transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)'
                }}
              >
                <div>
                  <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#38BDF8', fontWeight: 700, marginBottom: 4 }}>
                    Infrastructure Action
                  </div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: '#F8FAFC' }}>
                    Scaled VM Memory: <span style={{ color: '#38BDF8', fontFamily: 'monospace' }}>{s1RamAmount} GB RAM</span>
                  </div>
                </div>
                <div style={{ background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.25)', borderRadius: 10, padding: '10px 14px' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#F87171', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    ❌ Hardware Myth Confirmed
                  </div>
                  <div style={{ fontSize: 12, color: '#94A3B8', marginTop: 4, lineHeight: 1.4 }}>
                    RAM does not eliminate exponential zero-cell traversal.
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SCENE 2: OVERFEEDING 108M CELL EXPLOSION (7.5s - 16.5s)                   */}
        {/* ========================================================================= */}
        {currentTime >= 7.4 && currentTime < 16.6 && (
          <div
            style={{
              position: 'absolute',
              width: 1060,
              background: 'rgba(15, 23, 42, 0.88)',
              backdropFilter: 'blur(30px) saturate(180%)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderTop: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: 24,
              boxShadow: '0 40px 100px -20px rgba(0,0,0,0.95), 0 0 0 1px rgba(0,0,0,0.5)',
              padding: '28px 34px',
              opacity: s2Enter * s2Exit,
              zIndex: 20
            }}
          >
            {/* Unibody Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: 14, marginBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: '#F87171' }}>Root Bottleneck: Overfeeding Architecture</span>
                <span style={{ fontSize: 12, color: '#64748B' }}>&bull; Millions of Empty Zeros Traversed</span>
              </div>
              <span style={{ fontSize: 11, color: '#F87171', background: 'rgba(239, 68, 68, 0.12)', border: '1px solid rgba(239, 68, 68, 0.2)', padding: '3px 10px', borderRadius: 10, fontWeight: 700 }}>CRITICAL_OVERFEED</span>
            </div>

            {/* Two-Target Guided Inspection Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, alignItems: 'center' }}>
              {/* 3D Cutaway Model */}
              <div style={{ height: 320, borderRadius: 16, overflow: 'hidden', background: 'rgba(2, 6, 23, 0.7)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <Img src={staticFile('tm1_lag_video_hero.jpg')} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>

              {/* Sequential Telemetry Targets */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                
                {/* TARGET 3: 108M Cell Ticker (Spotlighted 7.5s - 12.0s) */}
                <div
                  style={{
                    background: isS2Target1Active ? 'rgba(2, 6, 23, 0.85)' : 'rgba(2, 6, 23, 0.4)',
                    border: isS2Target1Active ? '1px solid rgba(239, 68, 68, 0.4)' : '1px solid rgba(255, 255, 255, 0.04)',
                    borderRadius: 16,
                    padding: 20,
                    opacity: isS2Target1Active ? 1.0 : 0.4,
                    filter: isS2Target1Active ? 'none' : 'blur(1.5px)',
                    transform: isS2Target1Active ? 'scale(1.02)' : 'scale(0.98)',
                    transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)'
                  }}
                >
                  <div style={{ fontSize: 11, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600, marginBottom: 4 }}>
                    Rule-Derived Fed Cells
                  </div>
                  <div style={{ fontSize: 38, fontWeight: 800, fontFamily: 'monospace', color: '#F87171', fontVariantNumeric: 'tabular-nums' }}>
                    {s2CellCount.toLocaleString()}
                  </div>
                  <div style={{ fontSize: 12, color: '#64748B', marginTop: 4 }}>
                    15,000 SKUs &times; 200 Stores &times; 36 Periods fed at Consolidated Level
                  </div>
                </div>

                {/* TARGET 4: 250:1 Ratio Gauge (Spotlighted 12.0s - 16.5s) */}
                <div
                  style={{
                    background: isS2Target2Active ? 'rgba(2, 6, 23, 0.85)' : 'rgba(2, 6, 23, 0.4)',
                    border: isS2Target2Active ? '1px solid rgba(239, 68, 68, 0.4)' : '1px solid rgba(255, 255, 255, 0.04)',
                    borderRadius: 16,
                    padding: 20,
                    opacity: isS2Target2Active ? 1.0 : 0.4,
                    filter: isS2Target2Active ? 'none' : 'blur(1.5px)',
                    transform: isS2Target2Active ? 'scale(1.02)' : 'scale(0.98)',
                    transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                    <span style={{ fontSize: 11, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600 }}>Fed to Populated Ratio</span>
                    <span style={{ fontSize: 20, fontWeight: 800, color: '#F87171', fontFamily: 'monospace' }}>{s2RatioNeedle.toFixed(0)}:1</span>
                  </div>
                  <div style={{ width: '100%', height: 6, backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 3, overflow: 'hidden', display: 'flex' }}>
                    <div style={{ width: '15%', backgroundColor: '#10B981' }} />
                    <div style={{ width: '25%', backgroundColor: '#F59E0B' }} />
                    <div style={{ width: '60%', backgroundColor: '#EF4444' }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#475569', marginTop: 6, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    <span>Target (&lt;5:1)</span>
                    <span>Caution</span>
                    <span style={{ color: '#EF4444', fontWeight: 700 }}>Critical (&gt;250:1)</span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SCENE 3: TARGETED CONDITIONAL FEEDERS (16.5s - 25.5s)                     */}
        {/* ========================================================================= */}
        {currentTime >= 16.4 && currentTime < 25.6 && (
          <div
            style={{
              position: 'absolute',
              width: 1060,
              background: 'rgba(15, 23, 42, 0.88)',
              backdropFilter: 'blur(30px) saturate(180%)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderTop: '1px solid rgba(56, 189, 248, 0.3)',
              borderRadius: 24,
              boxShadow: '0 40px 100px -20px rgba(0,0,0,0.95), 0 0 0 1px rgba(0,0,0,0.5)',
              padding: '28px 34px',
              opacity: s3Enter * s3Exit,
              zIndex: 30
            }}
          >
            {/* Unibody Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: 14, marginBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: '#38BDF8' }}>Targeted Conditional Feeder Engine</span>
                <span style={{ fontSize: 12, color: '#64748B' }}>&bull; 2D Control Cube Scoped Execution</span>
              </div>
              <span style={{ fontSize: 11, color: '#10B981', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.25)', padding: '3px 10px', borderRadius: 10, fontWeight: 700 }}>CONDITIONAL_ACTIVE</span>
            </div>

            {/* Two-Target Guided Inspection Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 28, alignItems: 'center' }}>
              
              {/* TARGET 5: Scoped Feeder Syntax Rule (Spotlighted 16.5s - 20.5s) */}
              <div
                style={{
                  background: isS3Target1Active ? 'rgba(2, 6, 23, 0.85)' : 'rgba(2, 6, 23, 0.4)',
                  border: isS3Target1Active ? '1px solid rgba(56, 189, 248, 0.4)' : '1px solid rgba(255, 255, 255, 0.04)',
                  borderRadius: 16,
                  padding: 20,
                  opacity: isS3Target1Active ? 1.0 : 0.4,
                  filter: isS3Target1Active ? 'none' : 'blur(1.5px)',
                  transform: isS3Target1Active ? 'scale(1.02)' : 'scale(0.98)',
                  transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)'
                }}
              >
                <div style={{ fontFamily: 'monospace', fontSize: 12, color: '#94A3B8', lineHeight: 1.6 }}>
                  <div style={{ color: '#38BDF8' }}># SCOPED CONDITIONAL FEEDER</div>
                  <div>[&apos;Units&apos;] =&gt; DB(</div>
                  <div style={{ paddingLeft: 16, color: '#38BDF8' }}>IF(DB(&apos;Control_Feeder_Flags&apos;, !Year, !Period, &apos;Active&apos;) == 1,</div>
                  <div style={{ paddingLeft: 32, color: '#10B981' }}>&apos;Revenue_Cube&apos;, &apos;&apos;</div>
                  <div style={{ paddingLeft: 16 }}>), !Version, !Year, !Period, &apos;Revenue&apos;);</div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: 'rgba(7,9,14,0.8)', borderRadius: 8, marginTop: 16, border: '1px solid rgba(255,255,255,0.04)' }}>
                  <span style={{ fontSize: 11, color: '#94A3B8', fontFamily: 'monospace' }}>[ Leaf Input ]</span>
                  <svg width="160" height="10">
                    <line x1="0" y1="5" x2="160" y2="5" stroke="#38BDF8" strokeWidth="2" strokeDasharray="8 4" strokeDashoffset={s3LaserOffset} />
                  </svg>
                  <span style={{ fontSize: 11, color: '#10B981', fontFamily: 'monospace' }}>[ Target Cell ]</span>
                </div>
              </div>

              {/* TARGET 6: Memory Collapse & Sub-Second Latency (Spotlighted 20.5s - 25.5s) */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 16,
                  opacity: isS3Target2Active ? 1.0 : 0.4,
                  filter: isS3Target2Active ? 'none' : 'blur(1.5px)',
                  transform: isS3Target2Active ? 'scale(1.02)' : 'scale(0.98)',
                  transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)'
                }}
              >
                <div style={{ background: isS3Target2Active ? 'rgba(2, 6, 23, 0.85)' : 'rgba(2, 6, 23, 0.4)', border: isS3Target2Active ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid rgba(255, 255, 255, 0.04)', borderRadius: 16, padding: 20 }}>
                  <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#38BDF8', fontWeight: 600, marginBottom: 12 }}>
                    Server Memory Bloat (-87%)
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 20, height: 90 }}>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: '100%', height: 70 * s3RamBarScale, backgroundColor: '#EF4444', borderRadius: 4 }} />
                      <span style={{ fontSize: 11, color: '#64748B', fontFamily: 'monospace' }}>48 GB</span>
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: '100%', height: 10, backgroundColor: '#10B981', borderRadius: 4 }} />
                      <span style={{ fontSize: 11, color: '#10B981', fontWeight: 700, fontFamily: 'monospace' }}>6.2 GB</span>
                    </div>
                  </div>
                </div>

                <div style={{ background: isS3Target2Active ? 'rgba(2, 6, 23, 0.85)' : 'rgba(2, 6, 23, 0.4)', border: isS3Target2Active ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid rgba(255, 255, 255, 0.04)', borderRadius: 16, padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: 10, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Consolidated Latency</div>
                    <div style={{ fontSize: 26, fontWeight: 800, color: '#10B981', fontFamily: 'monospace' }}>{s3SpeedSnap}</div>
                  </div>
                  <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.25)', borderRadius: 8, padding: '6px 12px', color: '#10B981', fontWeight: 700, fontSize: 11 }}>
                    SUB-SECOND ⚡
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SCENE 4: SWISS TI TERMINAL & CENTROID CTA (25.5s - 34.3s)                 */}
        {/* ========================================================================= */}
        {currentTime >= 25.4 && (
          <div
            style={{
              position: 'absolute',
              width: 880,
              opacity: s4Enter,
              zIndex: 40
            }}
          >
            {currentTime < 29.5 ? (
              /* High-End Monospaced TurboIntegrator Terminal */
              <div
                style={{
                  background: 'rgba(2, 6, 23, 0.95)',
                  backdropFilter: 'blur(40px)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderTop: '1px solid rgba(56, 189, 248, 0.4)',
                  borderRadius: 24,
                  padding: 32,
                  boxShadow: '0 40px 100px -20px rgba(0,0,0,0.95)',
                  fontFamily: 'monospace'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: 14, marginBottom: 20 }}>
                  <span style={{ color: '#38BDF8', fontWeight: 700, fontSize: 13 }}>TI_Process: Audit_Cube_Feeder_Ratio</span>
                  <span style={{ color: '#10B981', fontSize: 12 }}>EXECUTION_SUCCESS</span>
                </div>
                <div style={{ fontSize: 13, lineHeight: 1.8, color: '#94A3B8' }}>
                  <div style={{ color: '#475569' }}># QUERY SYSTEM CONTROL CUBE</div>
                  <div>nPopulated = CellGetN(&apos;&#125;StatsByCube&apos;, &apos;Revenue&apos;, &apos;Populated Cells&apos;);</div>
                  <div>nFed = CellGetN(&apos;&#125;StatsByCube&apos;, &apos;Revenue&apos;, &apos;Fed Cells&apos;);</div>
                  <div style={{ color: '#38BDF8' }}>nRatio = nFed / nPopulated;</div>
                  <div style={{ margin: '14px 0', color: '#F8FAFC' }}>
                    &gt; LogOutput(&apos;INFO&apos;, &apos;CUBE: Revenue | RATIO: 4.8:1 | STATUS: HEALTHY&apos;);
                  </div>
                  <div style={{ color: '#10B981', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', padding: '6px 12px', borderRadius: 6, display: 'inline-block' }}>
                    DIAGNOSTIC PASSED: Fed Ratio strictly below 5:1 threshold.
                  </div>
                </div>
              </div>
            ) : (
              /* Centroid Octane CTA Card (Frosted Slate & Titanium Precision) */
              <div
                style={{
                  background: 'rgba(15, 23, 42, 0.92)',
                  backdropFilter: 'blur(40px) saturate(180%)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderTop: '1px solid rgba(56, 189, 248, 0.4)',
                  borderRadius: 26,
                  padding: '52px 64px',
                  textAlign: 'center',
                  boxShadow: '0 40px 100px -20px rgba(0,0,0,0.95)',
                  transform: `scale(${0.94 + Math.min(1, s4CtaScale) * 0.06})`
                }}
              >
                <div style={{ display: 'inline-block', background: 'rgba(56, 189, 248, 0.08)', border: '1px solid rgba(56, 189, 248, 0.25)', borderRadius: 20, padding: '6px 20px', fontSize: 12, fontWeight: 700, color: '#38BDF8', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 20 }}>
                  Diagnostic Playbook
                </div>

                <h2 style={{ fontSize: 36, fontWeight: 800, lineHeight: 1.25, margin: '0 0 16px 0', color: '#F8FAFC', letterSpacing: '-0.03em' }}>
                  Eliminate TM1 Overfeeding &amp; Memory Bloat
                </h2>

                <p style={{ fontSize: 16, color: '#94A3B8', margin: '0 0 28px 0', lineHeight: 1.5, letterSpacing: '-0.01em' }}>
                  Audit your cube&apos;s fed-to-populated cell ratio and restore sub-second response times in under 10 minutes.
                </p>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <div style={{ background: '#38BDF8', color: '#07090E', fontWeight: 700, fontSize: 16, padding: '14px 36px', borderRadius: 12, letterSpacing: '-0.01em' }}>
                    Read The Playbook &rarr;
                  </div>
                </div>

                <div style={{ marginTop: 24, fontSize: 13, color: '#475569', fontWeight: 600 }}>
                  octanesolutions.com.au/tm1-flight-check
                </div>
              </div>
            )}
          </div>
        )}

      </div>

      {/* ========================================================================= */}
      {/* CRISP SWISS SUBTITLES (BOTTOM VIEWPORT, ZERO BLUR)                        */}
      {/* ========================================================================= */}
      {visibleWords.length > 0 && currentTime < 29.5 && (
        <div style={{ position: 'absolute', bottom: 44, left: 0, right: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div
            style={{
              background: 'rgba(15, 23, 42, 0.85)',
              backdropFilter: 'blur(30px)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: 30,
              padding: '10px 28px',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              boxShadow: '0 20px 40px rgba(0,0,0,0.6)'
            }}
          >
            {visibleWords.map((w: any, idx: number) => {
              const isActive = currentTime >= w.start && currentTime <= w.end;
              return (
                <span
                  key={idx}
                  style={{
                    fontSize: 19,
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? '#38BDF8' : '#64748B',
                    letterSpacing: '-0.02em',
                    transform: isActive ? 'scale(1.06)' : 'scale(1)',
                    display: 'inline-block'
                  }}
                >
                  {w.word}
                </span>
              );
            })}
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
