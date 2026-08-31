import React from 'react';
import { AbsoluteFill, Audio, interpolate, staticFile, useCurrentFrame, useVideoConfig, spring } from 'remotion';
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

  // Dynamic values aligned to original human voiceover (32.8s duration)
  const latencyVal = interpolate(currentTime, [0, 2.8], [0.0, 42.4], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bloatReduction = interpolate(currentTime, [19.8, 22.0], [48.0, 6.0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const subSecLatency = interpolate(currentTime, [22.5, 24.8], [42.4, 0.4], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const pulseOffset = (frame * 3) % 200;

  const getSceneSpring = (startSec: number) => {
    return spring({
      frame: frame - Math.round(startSec * fps),
      fps,
      config: { mass: 0.7, damping: 14, stiffness: 90 }
    });
  };

  const s1Spring = getSceneSpring(0.0);
  const s2Spring = getSceneSpring(3.6);
  const s3Spring = getSceneSpring(7.5);
  const s4Spring = getSceneSpring(11.5);
  const s5Spring = getSceneSpring(17.0);

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
          SCENE 1: THE LATENCY STALL (0.0s - 3.6s)
          Layout: Side-by-Side (Left Text + Right Card)
         ══════════════════════════════════════════════════════════════ */}
      {currentTime < 3.6 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 70,
            padding: '0 120px',
            opacity: interpolate(currentTime, [3.3, 3.6], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
            transform: `translate3d(0, ${(1 - s1Spring) * 30}px, 0)`
          }}
        >
          {/* Left Hero Copy */}
          <div style={{ flex: 1, maxWidth: 540 }}>
            <div style={{ fontSize: 52, fontWeight: 900, color: '#FFFFFF', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
              When your dashboard takes <span style={{ color: '#4daeeb', fontWeight: 900 }}>40 seconds</span> to open...
            </div>
          </div>

          {/* Right Single Card */}
          <div
            style={{
              width: 780,
              backgroundColor: '#FFFFFF',
              borderRadius: 24,
              boxShadow: '0 30px 80px rgba(0, 0, 0, 0.9), 0 0 40px rgba(77, 174, 235, 0.15)',
              padding: '34px 38px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <span style={{ fontSize: 20, fontWeight: 900, color: '#090A0C' }}>Planning Analytics Workspace</span>
              <span style={{ fontSize: 12, fontWeight: 900, fontFamily: IndustrialTheme.fonts.mono, color: '#4daeeb', background: 'rgba(77, 174, 235, 0.15)', border: '1.5px solid #4daeeb', padding: '4px 10px', borderRadius: 6 }}>
                THREAD LOCK DETECTED
              </span>
            </div>
            <div style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#FFFFFF', fontWeight: 800, marginBottom: 8 }}>
              Active Consolidation Latency
            </div>
            <div style={{ fontSize: 76, fontWeight: 900, color: '#4daeeb', fontFamily: IndustrialTheme.fonts.mono, letterSpacing: '-0.03em', lineHeight: 1 }}>
              {latencyVal.toFixed(1)}s
            </div>
            <div style={{ marginTop: 18, display: 'flex', justifyContent: 'space-between', fontSize: 15, color: '#475569', fontFamily: IndustrialTheme.fonts.mono, fontWeight: 700 }}>
              <span>Evaluating 8 Dimensions...</span>
              <span style={{ color: '#4daeeb', fontWeight: 900 }}>{Math.min(92, Math.round(latencyVal * 2.2))}% STALLED</span>
            </div>
            <div style={{ marginTop: 10, width: '100%', height: 10, backgroundColor: '#E2E8F0', borderRadius: 5, overflow: 'hidden' }}>
              <div style={{ width: `${Math.min(92, latencyVal * 2.2)}%`, height: '100%', backgroundColor: '#4daeeb' }} />
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          SCENE 2: THE HARDWARE ADVISORY (3.6s - 7.5s)
          Layout: De-Contained Floating 3D Characters + Bottom Text
         ══════════════════════════════════════════════════════════════ */}
      {currentTime >= 3.5 && currentTime < 7.5 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 28,
            opacity: interpolate(currentTime, [3.5, 3.8, 7.1, 7.5], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
            transform: `translate3d(0, ${(1 - s2Spring) * 30}px, 0)`
          }}
        >
          {/* Top: 3D Characters & Decoupled Speech Bubbles (Zero White Box!) */}
          <InfraTeamHumorCard />

          {/* Bottom Hero Copy */}
          <div style={{ maxWidth: 1100, textAlign: 'center' }}>
            <div style={{ fontSize: 48, fontWeight: 800, color: '#FFFFFF', lineHeight: 1.25, letterSpacing: '-0.02em' }}>
              Your infrastructure team will always tell you, <span style={{ color: '#4daeeb', fontWeight: 900 }}>"Just add more RAM."</span>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          SCENE 3: THE ROOT BOTTLENECK (7.5s - 11.5s)
          Layout: Side-by-Side (Left Text + Right Card)
         ══════════════════════════════════════════════════════════════ */}
      {currentTime >= 7.4 && currentTime < 11.5 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 70,
            padding: '0 120px',
            opacity: interpolate(currentTime, [7.4, 7.8, 11.1, 11.5], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
            transform: `translate3d(0, ${(1 - s3Spring) * 30}px, 0)`
          }}
        >
          {/* Left Hero Copy */}
          <div style={{ flex: 1, maxWidth: 540 }}>
            <div style={{ fontSize: 52, fontWeight: 900, color: '#FFFFFF', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
              The real bottleneck is <span style={{ color: '#4daeeb', fontWeight: 900 }}>overfeeding</span>.
            </div>
          </div>

          {/* Right Single Card */}
          <div
            style={{
              width: 820,
              backgroundColor: '#FFFFFF',
              borderRadius: 24,
              boxShadow: '0 30px 80px rgba(0, 0, 0, 0.9), 0 0 40px rgba(77, 174, 235, 0.15)',
              padding: '30px 34px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <span style={{ fontSize: 18, fontWeight: 900, color: '#090A0C' }}>Root Bottleneck: Overfeeding Architecture</span>
              <span style={{ fontSize: 12, fontWeight: 900, fontFamily: IndustrialTheme.fonts.mono, color: '#4daeeb', background: 'rgba(77, 174, 235, 0.15)', border: '1.5px solid #4daeeb', padding: '4px 10px', borderRadius: 6 }}>
                108M DERIVED CELLS
              </span>
            </div>
            <DimensionTopologyTree />
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          SCENE 4: MEMORY REGISTER LAYOUT (11.5s - 17.0s)
          Layout: Stacked (Top Card + Bottom Text)
         ══════════════════════════════════════════════════════════════ */}
      {currentTime >= 11.4 && currentTime < 17.0 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 36,
            opacity: interpolate(currentTime, [11.4, 11.8, 16.6, 17.0], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
            transform: `translate3d(0, ${(1 - s4Spring) * 30}px, 0)`
          }}
        >
          {/* Top Single Card */}
          <div
            style={{
              width: 880,
              backgroundColor: '#FFFFFF',
              borderRadius: 24,
              boxShadow: '0 30px 80px rgba(0, 0, 0, 0.9), 0 0 40px rgba(77, 174, 235, 0.15)',
              padding: '26px 32px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <span style={{ fontSize: 18, fontWeight: 900, color: '#090A0C' }}>Memory Register Layout</span>
              <span style={{ fontSize: 12, fontWeight: 900, fontFamily: IndustrialTheme.fonts.mono, color: '#4daeeb', background: 'rgba(77, 174, 235, 0.15)', border: '1.5px solid #4daeeb', padding: '4px 10px', borderRadius: 6 }}>
                EXPONENTIAL BLOAT
              </span>
            </div>
            <BitLatticeGrid populatedCount={6} totalCount={96} />
          </div>

          {/* Bottom Hero Copy */}
          <div style={{ maxWidth: 1200, textAlign: 'center' }}>
            <div style={{ fontSize: 42, fontWeight: 800, color: '#FFFFFF', lineHeight: 1.25, letterSpacing: '-0.02em' }}>
              Forcing your server to track millions of <span style={{ color: '#4daeeb', fontWeight: 900 }}>empty cells</span> as if they were active.
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          SCENE 5: TARGETED REMEDIATION (17.0s - 25.4s)
          Layout: Two-Column Cards + Bottom Text
         ══════════════════════════════════════════════════════════════ */}
      {currentTime >= 16.9 && currentTime < 25.4 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 34,
            opacity: interpolate(currentTime, [16.9, 17.3, 25.0, 25.4], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
            transform: `translate3d(0, ${(1 - s5Spring) * 30}px, 0)`
          }}
        >
          {/* Top Two Cards Side-by-Side */}
          <div style={{ display: 'flex', gap: 30, width: 1400, justifyContent: 'center' }}>
            {/* Feeder Code Card */}
            <div
              style={{
                flex: 1.1,
                backgroundColor: '#FFFFFF',
                borderRadius: 24,
                boxShadow: '0 30px 80px rgba(0, 0, 0, 0.9), 0 0 40px rgba(77, 174, 235, 0.15)',
                padding: '28px 32px',
                display: 'flex',
                flexDirection: 'column',
                gap: 14
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 18, fontWeight: 900, color: '#090A0C' }}>Targeted Conditional Feeder Engine</span>
                <span style={{ fontSize: 12, fontWeight: 900, fontFamily: IndustrialTheme.fonts.mono, color: '#4daeeb', background: 'rgba(77, 174, 235, 0.15)', border: '1.5px solid #4daeeb', padding: '4px 10px', borderRadius: 6 }}>
                  CONDITIONAL ACTIVE
                </span>
              </div>
              <div style={{ fontSize: 15, fontFamily: IndustrialTheme.fonts.mono, color: '#090A0C', lineHeight: 1.55, background: '#F8FAFC', padding: '18px 22px', borderRadius: 14, border: '1.5px solid rgba(0,0,0,0.08)', fontWeight: 600 }}>
                <div><span style={{ color: '#090A0C', fontWeight: 900 }}>['Units']</span> =&gt; DB(</div>
                <div style={{ paddingLeft: 18 }}><span style={{ color: '#4daeeb', fontWeight: 900 }}>IF</span>(DB('Control_Feeder_Flags', !Year, !Period, 'Active') == 1,</div>
                <div style={{ paddingLeft: 36 }}><span style={{ color: '#4daeeb', fontWeight: 900 }}>'Revenue_Cube'</span>, ''</div>
                <div style={{ paddingLeft: 18 }}>), !Version, !Year, !Period, 'Revenue');</div>
              </div>
              <div style={{ marginTop: 4 }}>
                <CircuitConduit
                  labelStart="[ Leaf Input ]"
                  labelEnd="[ Target Cell ]"
                  pulseOffset={pulseOffset}
                  color="#4daeeb"
                />
              </div>
            </div>

            {/* Diagnostic Results Card */}
            <div
              style={{
                flex: 0.9,
                backgroundColor: '#FFFFFF',
                borderRadius: 24,
                boxShadow: '0 30px 80px rgba(0, 0, 0, 0.9), 0 0 40px rgba(77, 174, 235, 0.15)',
                padding: '28px 32px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span style={{ fontSize: 18, fontWeight: 900, color: '#090A0C' }}>Diagnostic Remediation Result</span>
                <span style={{ fontSize: 12, fontWeight: 900, fontFamily: IndustrialTheme.fonts.mono, color: '#4daeeb', background: 'rgba(77, 174, 235, 0.15)', border: '1.5px solid #4daeeb', padding: '4px 10px', borderRadius: 6 }}>
                  SUB-SECOND SPEED
                </span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div style={{ background: '#F8FAFC', padding: 18, borderRadius: 14, border: '1.5px solid rgba(0,0,0,0.08)' }}>
                  <div style={{ fontSize: 13, color: '#475569', textTransform: 'uppercase', fontWeight: 800 }}>Server Memory</div>
                  <div style={{ fontSize: 36, fontWeight: 900, color: '#4daeeb', fontFamily: IndustrialTheme.fonts.mono, marginTop: 4 }}>
                    {bloatReduction.toFixed(1)} GB
                  </div>
                  <div style={{ fontSize: 13, color: '#4daeeb', fontWeight: 800, marginTop: 2 }}>-87% Bloat Collapse</div>
                </div>

                <div style={{ background: '#F8FAFC', padding: 18, borderRadius: 14, border: '1.5px solid rgba(0,0,0,0.08)' }}>
                  <div style={{ fontSize: 13, color: '#475569', textTransform: 'uppercase', fontWeight: 800 }}>Consolidated View</div>
                  <div style={{ fontSize: 36, fontWeight: 900, color: '#4daeeb', fontFamily: IndustrialTheme.fonts.mono, marginTop: 4 }}>
                    {subSecLatency.toFixed(1)}s
                  </div>
                  <div style={{ fontSize: 13, color: '#4daeeb', fontWeight: 800, marginTop: 2 }}>Sub-Second Speed</div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Hero Copy */}
          <div style={{ maxWidth: 1200, textAlign: 'center' }}>
            <div style={{ fontSize: 40, fontWeight: 800, color: '#FFFFFF', lineHeight: 1.25, letterSpacing: '-0.02em' }}>
              Targeted conditional feeders <span style={{ color: '#4daeeb', fontWeight: 900 }}>cut memory bloat</span> from 48GB to 6GB, restoring sub-second speed.
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          SCENE 6: CINEMATIC OUTRO CTA (25.4s - End)
         ══════════════════════════════════════════════════════════════ */}
      {currentTime >= 25.2 && <CtaOutroStage />}
    </AbsoluteFill>
  );
};
