import React from 'react';
import { AbsoluteFill, Audio, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig, Easing } from 'remotion';
import timingData from '../../public/voiceover.json';
import { IndustrialTheme } from '../types/theme';
import { StudioBackdrop } from '../components/StudioBackdrop';
import { SubtitleKaraoke } from '../components/SubtitleKaraoke';
import { ChassisFrame } from '../components/forge/ChassisFrame';
import { CircuitConduit } from '../components/forge/CircuitConduit';
import { BitLatticeGrid } from '../components/forge/BitLatticeGrid';
import { TelemetryGauge } from '../components/forge/TelemetryGauge';
import { HexRegisterDump } from '../components/forge/HexRegisterDump';

export const TM1FeederCommercial: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentTime = frame / fps;

  const cameraScale = interpolate(
    frame,
    [0, 30, 105, 135, 225, 255, 360, 390, 495, 525, 615, 645, 765, 795],
    [1.0, 1.30, 1.30, 1.25, 1.0, 1.35, 1.35, 1.32, 1.0, 1.30, 1.30, 1.35, 1.0, 1.0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.22, 1, 0.36, 1) }
  );

  const cameraPanX = interpolate(
    frame,
    [0, 30, 105, 135, 225, 255, 360, 390, 495, 525, 615, 645, 765, 795],
    [0, 160, 160, -220, 0, -200, -200, -200, 0, 180, 180, -220, 0, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.22, 1, 0.36, 1) }
  );

  const cameraPanY = interpolate(
    frame,
    [0, 30, 105, 135, 225, 255, 360, 390, 495, 525, 615, 645, 765, 795],
    [0, 0, 0, 0, 0, -40, -40, 60, 0, 0, 0, 0, 0, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.22, 1, 0.36, 1) }
  );

  const scene1Opacity = interpolate(currentTime, [0, 0.4, 7.1, 7.5], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const scene2Opacity = interpolate(currentTime, [7.5, 7.9, 16.1, 16.5], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const scene3Opacity = interpolate(currentTime, [16.5, 16.9, 25.1, 25.5], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const scene4Opacity = interpolate(currentTime, [25.5, 25.9, 34.0, 34.3], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const latencyVal = interpolate(currentTime, [0, 2.5], [0.0, 42.4], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ramVal = interpolate(currentTime, [3.5, 6.0], [16, 64], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const fedCellsVal = interpolate(currentTime, [7.5, 10.5], [0, 108000000], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bloatReduction = interpolate(currentTime, [20.5, 23.5], [48.0, 6.2], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const subSecLatency = interpolate(currentTime, [22.0, 24.5], [42.4, 0.4], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const pulseOffset = (frame * 3) % 200;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: IndustrialTheme.surface.base,
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Inter", sans-serif',
        color: IndustrialTheme.text.hero,
        overflow: 'hidden'
      }}
    >
      <Audio src={staticFile('voiceover.wav')} />
      <StudioBackdrop />

      {/* Broadcast Header HUD */}
      <div
        style={{
          position: 'absolute',
          top: 36,
          left: 64,
          right: 64,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 100
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: IndustrialTheme.text.hero, boxShadow: '0 0 8px rgba(255,255,255,0.6)' }} />
          <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: IndustrialTheme.text.secondary }}>
            Octane Telemetry Labs
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ fontSize: 11, fontFamily: 'monospace', color: IndustrialTheme.text.tertiary, letterSpacing: '0.1em' }}>
            {currentTime < 7.5 ? '• DIAGNOSTIC: LATENCY STALL' : currentTime < 16.5 ? '• ROOT CAUSE: OVERFEEDING' : currentTime < 25.5 ? '• REMEDIATION: TARGETED CONTROL' : '• AUDIT PLAYBOOK: READY'}
          </span>
        </div>
      </div>

      {/* GUIDED MICRO-TARGET TOUR STAGE */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transform: `scale(${cameraScale}) translate(${cameraPanX}px, ${cameraPanY}px)`,
          transformOrigin: '50% 50%'
        }}
      >
        {/* SCENE 1: THE STALL & HARDWARE MYTH (0.0s - 7.5s) */}
        {currentTime < 7.5 && (
          <div style={{ opacity: scene1Opacity, width: 1040 }}>
            <ChassisFrame
              title="Planning Analytics Workspace"
              subtitle="Executive P&L View"
              statusBadge={currentTime < 3.5 ? "THREAD_LOCK_DETECTED" : "RAM_SCALED_STILL_STALLED"}
              statusLed={currentTime < 3.5 ? "error" : "warning"}
            >
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 24, alignItems: 'center' }}>
                {/* Target 1: Active Consolidation Latency KPI */}
                <div
                  style={{
                    background: currentTime < 3.5 ? IndustrialTheme.surface.recessedWell : 'rgba(13, 14, 17, 0.4)',
                    border: currentTime < 3.5 ? `1px solid ${IndustrialTheme.signals.crimsonBorder}` : '1px solid rgba(255, 255, 255, 0.04)',
                    borderRadius: 18,
                    padding: 24,
                    opacity: currentTime < 3.5 ? 1.0 : 0.4,
                    filter: currentTime < 3.5 ? 'none' : 'blur(1.5px)',
                    transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)'
                  }}
                >
                  <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', color: IndustrialTheme.text.secondary, fontWeight: 600, marginBottom: 8 }}>
                    Active Consolidation Latency
                  </div>
                  <div style={{ fontSize: 56, fontWeight: 900, color: IndustrialTheme.signals.crimson, fontFamily: 'monospace', letterSpacing: '-0.03em', lineHeight: 1 }}>
                    {latencyVal.toFixed(1)}s
                  </div>
                  <div style={{ marginTop: 14, display: 'flex', justifyContent: 'space-between', fontSize: 10, color: IndustrialTheme.text.tertiary, fontFamily: 'monospace' }}>
                    <span>Evaluating 8 Dimensions...</span>
                    <span style={{ color: IndustrialTheme.signals.crimson }}>{Math.min(92, Math.round(latencyVal * 2.2))}% STALLED</span>
                  </div>
                  <div style={{ marginTop: 6, width: '100%', height: 4, backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 2, overflow: 'hidden' }}>
                    <div style={{ width: `${Math.min(92, latencyVal * 2.2)}%`, height: '100%', backgroundColor: IndustrialTheme.signals.crimson }} />
                  </div>
                </div>

                {/* Target 2: Infrastructure RAM Action */}
                <div
                  style={{
                    background: currentTime >= 3.5 ? IndustrialTheme.surface.recessedWell : 'rgba(13, 14, 17, 0.4)',
                    border: currentTime >= 3.5 ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(255, 255, 255, 0.04)',
                    borderRadius: 18,
                    padding: 24,
                    opacity: currentTime >= 3.5 ? 1.0 : 0.4,
                    filter: currentTime >= 3.5 ? 'none' : 'blur(1.5px)',
                    transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)'
                  }}
                >
                  <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', color: IndustrialTheme.text.secondary, fontWeight: 600, marginBottom: 8 }}>
                    Infrastructure Action
                  </div>
                  <div style={{ fontSize: 24, fontWeight: 700, color: IndustrialTheme.text.hero, marginBottom: 12 }}>
                    Scaled VM Memory: <span style={{ color: IndustrialTheme.text.primary, fontFamily: 'monospace' }}>{Math.round(ramVal)} GB RAM</span>
                  </div>
                  <div style={{ background: IndustrialTheme.signals.crimsonBg, border: `1px solid ${IndustrialTheme.signals.crimsonBorder}`, borderRadius: 10, padding: '10px 14px' }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: IndustrialTheme.signals.crimson, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 2 }}>
                      ✕ Hardware Myth Confirmed
                    </div>
                    <div style={{ fontSize: 11, color: IndustrialTheme.text.secondary, lineHeight: 1.4 }}>
                      RAM does not eliminate exponential zero-cell traversal.
                    </div>
                  </div>
                </div>
              </div>
            </ChassisFrame>
          </div>
        )}

        {/* SCENE 2: THE ROOT CAUSE (7.5s - 16.5s) */}
        {currentTime >= 7.5 && currentTime < 16.5 && (
          <div style={{ opacity: scene2Opacity, width: 1040 }}>
            <ChassisFrame
              title="Root Bottleneck: Overfeeding Architecture"
              subtitle="Millions of Empty Zeros Traversed"
              statusBadge="CRITICAL_OVERFEED"
              statusLed="error"
            >
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 24, alignItems: 'center' }}>
                <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', border: IndustrialTheme.surface.recessedBorder }}>
                  <Img src={staticFile('tm1_lag_video_hero.jpg')} style={{ width: '100%', height: 'auto', display: 'block' }} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {/* Target 3: 108M Fed Cells Ticker & Bit-Lattice */}
                  <div
                    style={{
                      background: currentTime < 12.0 ? IndustrialTheme.surface.recessedWell : 'rgba(13, 14, 17, 0.4)',
                      border: currentTime < 12.0 ? `1px solid ${IndustrialTheme.signals.crimsonBorder}` : '1px solid rgba(255, 255, 255, 0.04)',
                      borderRadius: 18,
                      padding: 20,
                      opacity: currentTime < 12.0 ? 1.0 : 0.4,
                      filter: currentTime < 12.0 ? 'none' : 'blur(1.5px)',
                      transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)'
                    }}
                  >
                    <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', color: IndustrialTheme.text.secondary, fontWeight: 600, marginBottom: 4 }}>
                      Rule-Derived Fed Cells
                    </div>
                    <div style={{ fontSize: 44, fontWeight: 900, color: IndustrialTheme.signals.crimson, fontFamily: 'monospace', letterSpacing: '-0.02em' }}>
                      {Math.round(fedCellsVal).toLocaleString()}
                    </div>
                    <div style={{ fontSize: 11, color: IndustrialTheme.text.tertiary, marginTop: 4, marginBottom: 12 }}>
                      15,000 SKUs &times; 200 Stores &times; 36 Periods fed at Consolidated Level
                    </div>
                    <BitLatticeGrid populatedCount={6} totalCount={128} isOverfed={true} />
                  </div>

                  {/* Target 4: 250:1 Ratio Gauge */}
                  <div
                    style={{
                      background: currentTime >= 12.0 ? IndustrialTheme.surface.recessedWell : 'rgba(13, 14, 17, 0.4)',
                      border: currentTime >= 12.0 ? `1px solid ${IndustrialTheme.signals.crimsonBorder}` : '1px solid rgba(255, 255, 255, 0.04)',
                      borderRadius: 18,
                      padding: 20,
                      opacity: currentTime >= 12.0 ? 1.0 : 0.4,
                      filter: currentTime >= 12.0 ? 'none' : 'blur(1.5px)',
                      transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)'
                    }}
                  >
                    <TelemetryGauge
                      label="Fed to Populated Ratio"
                      value="250"
                      statusLevel="critical"
                      statusText="Critical (>250:1)"
                    />
                  </div>
                </div>
              </div>
            </ChassisFrame>
          </div>
        )}

        {/* SCENE 3: THE REMEDIATION (16.5s - 25.5s) */}
        {currentTime >= 16.5 && currentTime < 25.5 && (
          <div style={{ opacity: scene3Opacity, width: 1040 }}>
            <ChassisFrame
              title="Targeted Conditional Feeder Engine"
              subtitle="2D Control Cube Scoped Execution"
              statusBadge="CONDITIONAL_ACTIVE"
              statusLed="success"
            >
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 24, alignItems: 'center' }}>
                {/* Target 5: Scoped Feeder Rule Syntax */}
                <div
                  style={{
                    background: currentTime < 20.5 ? IndustrialTheme.surface.recessedWell : 'rgba(13, 14, 17, 0.4)',
                    border: currentTime < 20.5 ? `1px solid ${IndustrialTheme.signals.mintBorder}` : '1px solid rgba(255, 255, 255, 0.04)',
                    borderRadius: 18,
                    padding: 22,
                    opacity: currentTime < 20.5 ? 1.0 : 0.4,
                    filter: currentTime < 20.5 ? 'none' : 'blur(1.5px)',
                    transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)'
                  }}
                >
                  <div style={{ fontSize: 10, color: IndustrialTheme.text.secondary, fontFamily: 'monospace', marginBottom: 8 }}>
                    # SCOPED CONDITIONAL FEEDER
                  </div>
                  <div style={{ fontSize: 12, fontFamily: 'monospace', color: IndustrialTheme.text.secondary, lineHeight: 1.6, background: '#08090B', padding: 14, borderRadius: 10, border: IndustrialTheme.surface.recessedBorder }}>
                    <div><span style={{ color: IndustrialTheme.text.hero }}>['Units']</span> =&gt; DB(</div>
                    <div style={{ paddingLeft: 16 }}><span style={{ color: IndustrialTheme.signals.amber }}>IF</span>(DB('Control_Feeder_Flags', !Year, !Period, 'Active') == 1,</div>
                    <div style={{ paddingLeft: 32 }}><span style={{ color: IndustrialTheme.signals.mint }}>'Revenue_Cube'</span>, ''</div>
                    <div style={{ paddingLeft: 16 }}>), !Version, !Year, !Period, 'Revenue');</div>
                  </div>

                  <div style={{ marginTop: 14 }}>
                    <CircuitConduit
                      labelStart="[ Leaf Input ]"
                      labelEnd="[ Target Cell ]"
                      pulseOffset={pulseOffset}
                      color={IndustrialTheme.signals.tungsten}
                    />
                  </div>
                </div>

                {/* Target 6: Memory Collapse & Sub-Second Latency */}
                <div
                  style={{
                    background: currentTime >= 20.5 ? IndustrialTheme.surface.recessedWell : 'rgba(13, 14, 17, 0.4)',
                    border: currentTime >= 20.5 ? `1px solid ${IndustrialTheme.signals.mintBorder}` : '1px solid rgba(255, 255, 255, 0.04)',
                    borderRadius: 18,
                    padding: 22,
                    opacity: currentTime >= 20.5 ? 1.0 : 0.4,
                    filter: currentTime >= 20.5 ? 'none' : 'blur(1.5px)',
                    transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)'
                  }}
                >
                  <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', color: IndustrialTheme.text.secondary, fontWeight: 600, marginBottom: 8 }}>
                    Server Memory Bloat (-87%)
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                    <div style={{ flex: 1, height: 8, backgroundColor: IndustrialTheme.signals.crimson, borderRadius: 4 }} />
                    <div style={{ flex: 1, height: 8, backgroundColor: IndustrialTheme.signals.mint, borderRadius: 4 }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontFamily: 'monospace', color: IndustrialTheme.text.secondary, marginBottom: 16 }}>
                    <span>48 GB</span>
                    <span style={{ color: IndustrialTheme.signals.mint, fontWeight: 700 }}>{bloatReduction.toFixed(1)} GB</span>
                  </div>

                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: 10, color: IndustrialTheme.text.tertiary, textTransform: 'uppercase' }}>Consolidated Latency</div>
                      <div style={{ fontSize: 26, fontWeight: 900, color: IndustrialTheme.signals.mint, fontFamily: 'monospace' }}>
                        {subSecLatency.toFixed(1)}s
                      </div>
                    </div>
                    <span style={{ background: IndustrialTheme.signals.mintBg, color: IndustrialTheme.signals.mint, border: `1px solid ${IndustrialTheme.signals.mintBorder}`, padding: '6px 12px', borderRadius: 8, fontSize: 11, fontWeight: 700 }}>
                      SUB-SECOND ⚡
                    </span>
                  </div>
                </div>
              </div>
            </ChassisFrame>
          </div>
        )}

        {/* SCENE 4: CTA & ACTION (25.5s - 34.3s) */}
        {currentTime >= 25.5 && (
          <div style={{ opacity: scene4Opacity, width: 1000 }}>
            <ChassisFrame
              title="Octane Feeder Diagnostic Playbook"
              subtitle="10-Minute Cube Feeder Audit Protocol"
              statusBadge="DIAGNOSTIC_READY"
              statusLed="success"
            >
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 24, alignItems: 'center' }}>
                <HexRegisterDump />

                <div
                  style={{
                    background: IndustrialTheme.surface.recessedWell,
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: 18,
                    padding: 24,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center'
                  }}
                >
                  <div style={{ width: 44, height: 44, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 20, marginBottom: 12 }}>
                    ⚡
                  </div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: IndustrialTheme.text.hero, letterSpacing: '-0.02em', marginBottom: 6 }}>
                    Audit Your Feeder Ratio
                  </div>
                  <div style={{ fontSize: 12, color: IndustrialTheme.text.secondary, lineHeight: 1.4, marginBottom: 16 }}>
                    Run the 10-minute diagnostic playbook to pinpoint overfed cubes and restore sub-second speed.
                  </div>
                  <div
                    style={{
                      background: IndustrialTheme.text.hero,
                      color: '#0B0C0E',
                      fontSize: 12,
                      fontWeight: 700,
                      padding: '10px 24px',
                      borderRadius: 10,
                      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)'
                    }}
                  >
                    octanesolutions.com.au/playbook
                  </div>
                </div>
              </div>
            </ChassisFrame>
          </div>
        )}
      </div>

      <SubtitleKaraoke words={timingData.words} currentTime={currentTime} />
    </AbsoluteFill>
  );
};
