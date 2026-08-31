import React from 'react';
import { AbsoluteFill, Audio, interpolate, staticFile, useCurrentFrame, useVideoConfig, spring } from 'remotion';
import timingData from '../../public/voiceover.json';
import { IndustrialTheme } from '../types/theme';
import { BitLatticeGrid } from '../components/forge/BitLatticeGrid';
import { DimensionTopologyTree } from '../components/forge/DimensionTopologyTree';
import { CircuitConduit } from '../components/forge/CircuitConduit';
import { InfraTeamHumorCard } from '../components/forge/InfraTeamHumorCard';
import { CtaOutroStage } from '../components/forge/CtaOutroStage';

export const TM1FeederCommercial: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentTime = frame / fps;

  // Dynamic values
  const latencyVal = interpolate(currentTime, [0, 2.8], [0.0, 42.4], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bloatReduction = interpolate(currentTime, [22.5, 26.0], [48.0, 6.2], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const subSecLatency = interpolate(currentTime, [25.5, 27.8], [42.4, 0.4], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const pulseOffset = (frame * 3) % 200;

  const getSceneSpring = (startSec: number) => {
    return spring({
      frame: frame - Math.round(startSec * fps),
      fps,
      config: { mass: 0.7, damping: 14, stiffness: 90 }
    });
  };

  const s1Spring = getSceneSpring(0.0);
  const s2Spring = getSceneSpring(3.5);
  const s3Spring = getSceneSpring(9.0);
  const s4Spring = getSceneSpring(14.0);
  const s5Spring = getSceneSpring(19.5);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#000000',
        fontFamily: IndustrialTheme.fonts.sans,
        ...IndustrialTheme.typography.antialiased,
        color: '#FFFFFF',
        overflow: 'hidden'
      }}
    >
      {/* Load Google Fonts (Inter + JetBrains Mono) */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@500;700;800;900&display=swap');
          * {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            text-rendering: geometricPrecision;
          }
        `}
      </style>

      <Audio src={staticFile('voiceover.wav')} />

      {/* ══════════════════════════════════════════════════════════════
          SCENE 1: THE LATENCY STALL (0.0s - 3.5s)
          Layout: Side-by-Side (Left Text + Right Card)
         ══════════════════════════════════════════════════════════════ */}
      {currentTime < 3.5 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 70,
            padding: '0 120px',
            opacity: interpolate(currentTime, [3.2, 3.5], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
            transform: `translate3d(0, ${(1 - s1Spring) * 30}px, 0)`
          }}
        >
          {/* Left Hero Copy */}
          <div style={{ flex: 1, maxWidth: 540 }}>
            <div style={{ fontSize: 52, fontWeight: 900, color: '#FFFFFF', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
              When your dashboard takes <span style={{ color: IndustrialTheme.signals.crimson, fontWeight: 900 }}>40 seconds</span> to open...
            </div>
          </div>

          {/* Right Single Card */}
          <div
            style={{
              width: 780,
              backgroundColor: '#FFFFFF',
              borderRadius: 24,
              boxShadow: '0 30px 80px rgba(0, 0, 0, 0.9), 0 0 40px rgba(255, 255, 255, 0.08)',
              padding: '34px 38px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <span style={{ fontSize: 20, fontWeight: 800, color: '#090A0C' }}>Planning Analytics Workspace</span>
              <span style={{ fontSize: 11, fontWeight: 800, fontFamily: IndustrialTheme.fonts.mono, color: IndustrialTheme.signals.crimson, background: IndustrialTheme.signals.crimsonBg, border: `1px solid ${IndustrialTheme.signals.crimsonBorder}`, padding: '3px 8px', borderRadius: 4 }}>
                THREAD LOCK DETECTED
              </span>
            </div>
            <div style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#64748B', fontWeight: 700, marginBottom: 8 }}>
              Active Consolidation Latency
            </div>
            <div style={{ fontSize: 76, fontWeight: 900, color: IndustrialTheme.signals.crimson, fontFamily: IndustrialTheme.fonts.mono, letterSpacing: '-0.03em', lineHeight: 1 }}>
              {latencyVal.toFixed(1)}s
            </div>
            <div style={{ marginTop: 18, display: 'flex', justifyContent: 'space-between', fontSize: 14, color: '#94A3B8', fontFamily: IndustrialTheme.fonts.mono }}>
              <span>Evaluating 8 Dimensions...</span>
              <span style={{ color: IndustrialTheme.signals.crimson, fontWeight: 700 }}>{Math.min(92, Math.round(latencyVal * 2.2))}% STALLED</span>
            </div>
            <div style={{ marginTop: 10, width: '100%', height: 8, backgroundColor: '#E2E8F0', borderRadius: 4, overflow: 'hidden' }}>
              <div style={{ width: `${Math.min(92, latencyVal * 2.2)}%`, height: '100%', backgroundColor: IndustrialTheme.signals.crimson }} />
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          SCENE 2: THE HARDWARE ADVISORY (3.5s - 9.0s)
          Layout: De-Contained Floating 3D Characters + Bottom Text
         ══════════════════════════════════════════════════════════════ */}
      {currentTime >= 3.4 && currentTime < 9.0 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 28,
            opacity: interpolate(currentTime, [3.4, 3.8, 8.6, 9.0], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
            transform: `translate3d(0, ${(1 - s2Spring) * 30}px, 0)`
          }}
        >
          {/* Top: 3D Characters & Decoupled Speech Bubbles (Zero White Box!) */}
          <InfraTeamHumorCard />

          {/* Bottom Hero Copy */}
          <div style={{ maxWidth: 1100, textAlign: 'center' }}>
            <div style={{ fontSize: 48, fontWeight: 800, color: '#FFFFFF', lineHeight: 1.25, letterSpacing: '-0.02em' }}>
              Your infrastructure team will always tell you, <span style={{ color: IndustrialTheme.signals.amber, fontWeight: 900 }}>"Just add more RAM."</span>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          SCENE 3: THE ROOT BOTTLENECK (9.0s - 14.0s)
          Layout: Side-by-Side (Left Text + Right Card)
         ══════════════════════════════════════════════════════════════ */}
      {currentTime >= 8.9 && currentTime < 14.0 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 70,
            padding: '0 120px',
            opacity: interpolate(currentTime, [8.9, 9.3, 13.6, 14.0], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
            transform: `translate3d(0, ${(1 - s3Spring) * 30}px, 0)`
          }}
        >
          {/* Left Hero Copy */}
          <div style={{ flex: 1, maxWidth: 540 }}>
            <div style={{ fontSize: 52, fontWeight: 900, color: '#FFFFFF', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
              The real bottleneck is <span style={{ color: IndustrialTheme.signals.crimson, fontWeight: 900 }}>overfeeding</span>.
            </div>
          </div>

          {/* Right Single Card */}
          <div
            style={{
              width: 820,
              backgroundColor: '#FFFFFF',
              borderRadius: 24,
              boxShadow: '0 30px 80px rgba(0, 0, 0, 0.9), 0 0 40px rgba(255, 255, 255, 0.08)',
              padding: '30px 34px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <span style={{ fontSize: 18, fontWeight: 800, color: '#090A0C' }}>Root Bottleneck: Overfeeding Architecture</span>
              <span style={{ fontSize: 11, fontWeight: 800, fontFamily: IndustrialTheme.fonts.mono, color: IndustrialTheme.signals.crimson, background: IndustrialTheme.signals.crimsonBg, border: `1px solid ${IndustrialTheme.signals.crimsonBorder}`, padding: '3px 8px', borderRadius: 4 }}>
                108M DERIVED CELLS
              </span>
            </div>
            <DimensionTopologyTree />
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          SCENE 4: MEMORY REGISTER LAYOUT (14.0s - 19.5s)
          Layout: Stacked (Top Card + Bottom Text)
         ══════════════════════════════════════════════════════════════ */}
      {currentTime >= 13.9 && currentTime < 19.5 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 36,
            opacity: interpolate(currentTime, [13.9, 14.3, 19.1, 19.5], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
            transform: `translate3d(0, ${(1 - s4Spring) * 30}px, 0)`
          }}
        >
          {/* Top Single Card */}
          <div
            style={{
              width: 880,
              backgroundColor: '#FFFFFF',
              borderRadius: 24,
              boxShadow: '0 30px 80px rgba(0, 0, 0, 0.9), 0 0 40px rgba(255, 255, 255, 0.08)',
              padding: '26px 32px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <span style={{ fontSize: 18, fontWeight: 800, color: '#090A0C' }}>Memory Register Layout</span>
              <span style={{ fontSize: 11, fontWeight: 800, fontFamily: IndustrialTheme.fonts.mono, color: IndustrialTheme.signals.crimson, background: IndustrialTheme.signals.crimsonBg, border: `1px solid ${IndustrialTheme.signals.crimsonBorder}`, padding: '3px 8px', borderRadius: 4 }}>
                EXPONENTIAL BLOAT
              </span>
            </div>
            <BitLatticeGrid populatedCount={6} totalCount={96} />
          </div>

          {/* Bottom Hero Copy */}
          <div style={{ maxWidth: 1200, textAlign: 'center' }}>
            <div style={{ fontSize: 42, fontWeight: 800, color: '#FFFFFF', lineHeight: 1.25, letterSpacing: '-0.02em' }}>
              Forcing your server to scan millions of <span style={{ color: IndustrialTheme.signals.crimson, fontWeight: 900 }}>empty cells</span> as if they were live data.
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          SCENE 5: TARGETED REMEDIATION (19.5s - 28.0s)
          Layout: Two-Column Cards + Bottom Text
         ══════════════════════════════════════════════════════════════ */}
      {currentTime >= 19.4 && currentTime < 28.0 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 34,
            opacity: interpolate(currentTime, [19.4, 19.8, 27.6, 28.0], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
            transform: `translate3d(0, ${(1 - s5Spring) * 30}px, 0)`
          }}
        >
          {/* Top Two Cards Side-by-Side */}
          <div style={{ display: 'flex', gap: 30, width: 1400, justifyContent: 'center' }}>
            {/* Feeder Code Card */}
            <div
              style={{
                flex: 1,
                backgroundColor: '#FFFFFF',
                borderRadius: 24,
                boxShadow: '0 30px 80px rgba(0, 0, 0, 0.9), 0 0 40px rgba(255, 255, 255, 0.08)',
                padding: '26px 30px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span style={{ fontSize: 16, fontWeight: 800, color: '#090A0C' }}>Targeted Conditional Feeder Engine</span>
                <span style={{ fontSize: 11, fontWeight: 800, fontFamily: IndustrialTheme.fonts.mono, color: IndustrialTheme.signals.mint, background: IndustrialTheme.signals.mintBg, border: `1px solid ${IndustrialTheme.signals.mintBorder}`, padding: '3px 8px', borderRadius: 4 }}>
                  CONDITIONAL ACTIVE
                </span>
              </div>
              <div style={{ fontSize: 14, fontFamily: IndustrialTheme.fonts.mono, color: '#1E293B', lineHeight: 1.5, background: '#F8FAFC', padding: 16, borderRadius: 12, border: '1px solid rgba(0,0,0,0.06)' }}>
                <div><span style={{ color: '#090A0C', fontWeight: 700 }}>['Units']</span> =&gt; DB(</div>
                <div style={{ paddingLeft: 16 }}><span style={{ color: IndustrialTheme.signals.amber, fontWeight: 700 }}>IF</span>(DB('Control_Feeder_Flags', !Year, !Period, 'Active') == 1,</div>
                <div style={{ paddingLeft: 32 }}><span style={{ color: IndustrialTheme.signals.mint, fontWeight: 700 }}>'Revenue_Cube'</span>, ''</div>
                <div style={{ paddingLeft: 16 }}>), !Version, !Year, !Period, 'Revenue');</div>
              </div>
              <div style={{ marginTop: 10 }}>
                <CircuitConduit
                  labelStart="[ Leaf Input ]"
                  labelEnd="[ Target Cell ]"
                  pulseOffset={pulseOffset}
                  color="#0F172A"
                />
              </div>
            </div>

            {/* Diagnostic Results Card */}
            <div
              style={{
                flex: 1,
                backgroundColor: '#FFFFFF',
                borderRadius: 24,
                boxShadow: '0 30px 80px rgba(0, 0, 0, 0.9), 0 0 40px rgba(255, 255, 255, 0.08)',
                padding: '26px 30px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span style={{ fontSize: 16, fontWeight: 800, color: '#090A0C' }}>Diagnostic Remediation Result</span>
                <span style={{ fontSize: 11, fontWeight: 800, fontFamily: IndustrialTheme.fonts.mono, color: IndustrialTheme.signals.mint, background: IndustrialTheme.signals.mintBg, border: `1px solid ${IndustrialTheme.signals.mintBorder}`, padding: '3px 8px', borderRadius: 4 }}>
                  SUB-SECOND SPEED
                </span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div style={{ background: '#F8FAFC', padding: 16, borderRadius: 12, border: '1px solid rgba(0,0,0,0.06)' }}>
                  <div style={{ fontSize: 12, color: '#64748B', textTransform: 'uppercase', fontWeight: 700 }}>Server Memory</div>
                  <div style={{ fontSize: 34, fontWeight: 900, color: IndustrialTheme.signals.mint, fontFamily: IndustrialTheme.fonts.mono }}>
                    {bloatReduction.toFixed(1)} GB
                  </div>
                  <div style={{ fontSize: 12, color: IndustrialTheme.signals.mint, fontWeight: 700 }}>-87% Bloat Collapse</div>
                </div>

                <div style={{ background: '#F8FAFC', padding: 16, borderRadius: 12, border: '1px solid rgba(0,0,0,0.06)' }}>
                  <div style={{ fontSize: 12, color: '#64748B', textTransform: 'uppercase', fontWeight: 700 }}>Consolidated View</div>
                  <div style={{ fontSize: 34, fontWeight: 900, color: IndustrialTheme.signals.mint, fontFamily: IndustrialTheme.fonts.mono }}>
                    {subSecLatency.toFixed(1)}s
                  </div>
                  <div style={{ fontSize: 12, color: IndustrialTheme.signals.mint, fontWeight: 700 }}>Sub-Second Speed</div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Hero Copy */}
          <div style={{ maxWidth: 1200, textAlign: 'center' }}>
            <div style={{ fontSize: 40, fontWeight: 800, color: '#FFFFFF', lineHeight: 1.25, letterSpacing: '-0.02em' }}>
              Targeted conditional feeders <span style={{ color: IndustrialTheme.signals.mint, fontWeight: 900 }}>collapse the bloat</span>, slashing RAM down to 6GB and restoring sub-second speed.
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          SCENE 6: CINEMATIC OUTRO CTA (28.0s - 39.0s)
         ══════════════════════════════════════════════════════════════ */}
      {currentTime >= 27.8 && <CtaOutroStage />}
    </AbsoluteFill>
  );
};
