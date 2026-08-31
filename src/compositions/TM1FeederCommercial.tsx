import React from 'react';
import { AbsoluteFill, Audio, interpolate, staticFile, useCurrentFrame, useVideoConfig, Easing } from 'remotion';
import timingData from '../../public/voiceover.json';
import { IndustrialTheme } from '../types/theme';
import { SubtitleKaraoke } from '../components/SubtitleKaraoke';
import { SpatialBoard } from '../components/spatial/SpatialBoard';
import { KineticNode } from '../components/spatial/KineticNode';
import { KineticLaserConduit } from '../components/spatial/KineticLaserConduit';
import { BitLatticeGrid } from '../components/forge/BitLatticeGrid';
import { DimensionTopologyTree } from '../components/forge/DimensionTopologyTree';
import { CircuitConduit } from '../components/forge/CircuitConduit';
import { InfraTeamHumorCard } from '../components/forge/InfraTeamHumorCard';
import { CtaOutroStage } from '../components/forge/CtaOutroStage';

export const TM1FeederCommercial: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentTime = frame / fps;

  // ── INERTIAL DAMPED CAMERA PATH (Aligned to 38.7s narration) ──
  const cameraScale = interpolate(
    currentTime,
    [0, 1.5, 9.0, 11.5, 18.5, 20.5, 27.5, 28.5],
    [1.20, 1.25, 1.25, 1.25, 1.25, 1.25, 1.25, 1.10],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.22, 1, 0.36, 1) }
  );

  const cameraPanX = interpolate(
    currentTime,
    [0, 1.5, 9.0, 11.5, 18.5, 20.5, 27.5, 28.5],
    [1100, 1100, 1100, 0, 0, -1100, -1100, -1100],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.22, 1, 0.36, 1) }
  );

  const cameraPanY = interpolate(
    currentTime,
    [0, 1.5, 9.0, 11.5, 18.5, 20.5, 27.5, 28.5],
    [0, 0, 0, 0, 0, 0, 0, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.22, 1, 0.36, 1) }
  );

  // Dynamic values
  const latencyVal = interpolate(currentTime, [0, 2.8], [0.0, 42.4], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ramVal = interpolate(currentTime, [4.0, 7.8], [16, 64], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bloatReduction = interpolate(currentTime, [22.5, 26.0], [48.0, 6.2], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const subSecLatency = interpolate(currentTime, [25.5, 27.8], [42.4, 0.4], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Self-drawing kinetic laser conduits
  const drawLine1 = interpolate(currentTime, [8.8, 11.2], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const drawLine2 = interpolate(currentTime, [18.2, 20.2], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  
  // Downward laser bridge connecting Step 01 to Step 02 in Cluster 2
  const drawVerticalBridge = interpolate(currentTime, [13.8, 15.0], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const pulseOffset = (frame * 3) % 200;

  // Blackboard dimming during Outro (t >= 28.2s)
  const blackboardOpacity = interpolate(currentTime, [27.8, 28.8], [1.0, 0.12], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });

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

      {/* INFINITE BLACKBOARD DRAFTING CANVAS */}
      <div style={{ position: 'absolute', inset: 0, opacity: blackboardOpacity, transition: 'opacity 0.4s ease-out' }}>
        <SpatialBoard cameraScale={cameraScale} cameraPanX={cameraPanX} cameraPanY={cameraPanY}>

          {/* ── HORIZONTAL INTER-CLUSTER LASER CONDUITS ── */}
          <KineticLaserConduit
            x1={-860}
            y1={-160}
            x2={-250}
            y2={-160}
            color={IndustrialTheme.signals.crimson}
            drawProgress={drawLine1}
          />

          <KineticLaserConduit
            x1={250}
            y1={-160}
            x2={850}
            y2={-160}
            color={IndustrialTheme.signals.mint}
            drawProgress={drawLine2}
          />

          {/* ── VERTICAL CAUSAL LASER BRIDGE (Cluster 2 Step 01 -> Step 02) ── */}
          <KineticLaserConduit
            x1={0}
            y1={-10}
            x2={0}
            y2={65}
            color={IndustrialTheme.signals.crimson}
            drawProgress={drawVerticalBridge}
          />

          {/* ═══════════════════════════════════════════════════════════
              CLUSTER 1: THE STALL & 3D EDITORIAL HUMOR (X: -1100)
             ═══════════════════════════════════════════════════════════ */}
          <KineticNode
            x={-1100}
            y={-160}
            width={480}
            title="Planning Analytics Workspace"
            badge="THREAD LOCK DETECTED"
            badgeType="crimson"
            isActive={currentTime < 10.0}
            entranceDelayFrames={0}
            cameraPanX={cameraPanX}
            cameraPanY={cameraPanY}
          >
            <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', color: IndustrialTheme.text.secondary, fontWeight: 700, marginBottom: 6 }}>
              Active Consolidation Latency
            </div>
            <div style={{ fontSize: 54, fontWeight: 900, color: IndustrialTheme.signals.crimson, fontFamily: 'monospace', letterSpacing: '-0.03em', lineHeight: 1 }}>
              {latencyVal.toFixed(1)}s
            </div>
            <div style={{ marginTop: 12, display: 'flex', justifyContent: 'space-between', fontSize: 10, color: IndustrialTheme.text.tertiary, fontFamily: 'monospace' }}>
              <span>Evaluating 8 Dimensions...</span>
              <span style={{ color: IndustrialTheme.signals.crimson, fontWeight: 700 }}>{Math.min(92, Math.round(latencyVal * 2.2))}% STALLED</span>
            </div>
            <div style={{ marginTop: 6, width: '100%', height: 6, backgroundColor: '#E2E8F0', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{ width: `${Math.min(92, latencyVal * 2.2)}%`, height: '100%', backgroundColor: IndustrialTheme.signals.crimson }} />
            </div>
          </KineticNode>

          <KineticNode
            x={-1100}
            y={170}
            width={480}
            title="Infrastructure Advisory"
            badge="HARDWARE MYTH"
            badgeType="amber"
            isActive={currentTime >= 3.5 && currentTime < 10.0}
            entranceDelayFrames={Math.round(3.4 * fps)}
            cameraPanX={cameraPanX}
            cameraPanY={cameraPanY}
          >
            <InfraTeamHumorCard ramVal={ramVal} />
          </KineticNode>

          {/* ═══════════════════════════════════════════════════════════
              CLUSTER 2: OVERFEEDING & MULTIPLIER EXPLOSION (X: 0)
             ═══════════════════════════════════════════════════════════ */}
          <KineticNode
            x={0}
            y={-160}
            width={500}
            title="Root Bottleneck: Overfeeding Architecture"
            badge="108M DERIVED CELLS"
            badgeType="crimson"
            isActive={currentTime >= 10.0 && currentTime < 19.5}
            entranceDelayFrames={Math.round(9.8 * fps)}
            cameraPanX={cameraPanX}
            cameraPanY={cameraPanY}
          >
            <DimensionTopologyTree />
          </KineticNode>

          <KineticNode
            x={0}
            y={170}
            width={500}
            title="Memory Register Layout"
            badge="EXPONENTIAL BLOAT"
            badgeType="crimson"
            isActive={currentTime >= 14.5 && currentTime < 19.5}
            entranceDelayFrames={Math.round(14.5 * fps)}
            cameraPanX={cameraPanX}
            cameraPanY={cameraPanY}
          >
            <BitLatticeGrid populatedCount={6} totalCount={128} isOverfed={true} />
          </KineticNode>

          {/* ═══════════════════════════════════════════════════════════
              CLUSTER 3: TARGETED CONDITIONAL FEEDER & REMEDIATION (X: +1100)
             ═══════════════════════════════════════════════════════════ */}
          <KineticNode
            x={1100}
            y={-160}
            width={500}
            title="Targeted Conditional Feeder Engine"
            badge="CONDITIONAL ACTIVE"
            badgeType="mint"
            isActive={currentTime >= 19.0 && currentTime < 28.2}
            entranceDelayFrames={Math.round(19.0 * fps)}
            cameraPanX={cameraPanX}
            cameraPanY={cameraPanY}
          >
            <div style={{ fontSize: 11, fontFamily: 'monospace', color: IndustrialTheme.text.primary, lineHeight: 1.5, background: IndustrialTheme.popout.recessedWell, padding: 12, borderRadius: 8, border: '1px solid rgba(0,0,0,0.06)' }}>
              <div><span style={{ color: IndustrialTheme.text.hero, fontWeight: 700 }}>['Units']</span> =&gt; DB(</div>
              <div style={{ paddingLeft: 14 }}><span style={{ color: IndustrialTheme.signals.amber, fontWeight: 700 }}>IF</span>(DB('Control_Feeder_Flags', !Year, !Period, 'Active') == 1,</div>
              <div style={{ paddingLeft: 28 }}><span style={{ color: IndustrialTheme.signals.mint, fontWeight: 700 }}>'Revenue_Cube'</span>, ''</div>
              <div style={{ paddingLeft: 14 }}>), !Version, !Year, !Period, 'Revenue');</div>
            </div>
            <div style={{ marginTop: 10 }}>
              <CircuitConduit
                labelStart="[ Leaf Input ]"
                labelEnd="[ Target Cell ]"
                pulseOffset={pulseOffset}
                color="#0F172A"
              />
            </div>
          </KineticNode>

          <KineticNode
            x={1100}
            y={170}
            width={500}
            title="Diagnostic Remediation Result"
            badge="SUB-SECOND SPEED"
            badgeType="mint"
            isActive={currentTime >= 19.0 && currentTime < 28.2}
            entranceDelayFrames={Math.round(20.0 * fps)}
            cameraPanX={cameraPanX}
            cameraPanY={cameraPanY}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, alignItems: 'center' }}>
              <div style={{ background: IndustrialTheme.popout.recessedWell, padding: 14, borderRadius: 10, border: '1px solid rgba(0,0,0,0.06)' }}>
                <div style={{ fontSize: 10, color: IndustrialTheme.text.secondary, textTransform: 'uppercase', fontWeight: 700 }}>Server Memory</div>
                <div style={{ fontSize: 26, fontWeight: 900, color: IndustrialTheme.signals.mint, fontFamily: 'monospace' }}>
                  {bloatReduction.toFixed(1)} GB
                </div>
                <div style={{ fontSize: 10, color: IndustrialTheme.signals.mint, fontWeight: 700 }}>-87% Bloat Collapse</div>
              </div>

              <div style={{ background: IndustrialTheme.popout.recessedWell, padding: 14, borderRadius: 10, border: '1px solid rgba(0,0,0,0.06)' }}>
                <div style={{ fontSize: 10, color: IndustrialTheme.text.secondary, textTransform: 'uppercase', fontWeight: 700 }}>Consolidated View</div>
                <div style={{ fontSize: 26, fontWeight: 900, color: IndustrialTheme.signals.mint, fontFamily: 'monospace' }}>
                  {subSecLatency.toFixed(1)}s
                </div>
                <div style={{ fontSize: 10, color: IndustrialTheme.signals.mint, fontWeight: 700 }}>Sub-Second Speed</div>
              </div>
            </div>
          </KineticNode>

        </SpatialBoard>
      </div>

      {/* DEDICATED CINEMATIC OUTRO STAGE (t >= 28.2s) */}
      {currentTime >= 28.0 && <CtaOutroStage />}

      <SubtitleKaraoke words={timingData.words} currentTime={currentTime} />
    </AbsoluteFill>
  );
};
