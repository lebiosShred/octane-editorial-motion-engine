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

  // ── INERTIAL DAMPED CAMERA PATH (Native 1:1 Pixel Mapping with Cinema Pan) ──
  const cameraScale = interpolate(
    currentTime,
    [0, 1.5, 9.0, 11.5, 18.5, 20.5, 27.5, 28.5],
    [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.95],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.22, 1, 0.36, 1) }
  );

  const cameraPanX = interpolate(
    currentTime,
    [0, 1.5, 9.0, 11.5, 18.5, 20.5, 27.5, 28.5],
    [1550, 1550, 1550, 0, 0, -1550, -1550, -1550],
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

  // Self-drawing kinetic laser conduits with STRICT TRANSITION-ONLY OPACITY (Zero Bleed!)
  const drawLine1 = interpolate(currentTime, [8.8, 11.0], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const conduit1Opacity = interpolate(currentTime, [8.8, 9.2, 10.8, 11.4], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const drawLine2 = interpolate(currentTime, [18.2, 20.2], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const conduit2Opacity = interpolate(currentTime, [18.2, 18.6, 20.0, 20.6], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  
  // Downward laser bridge connecting Step 01 to Step 02 in Cluster 2 (Through open vertical gutter: Y=-65 to Y=65)
  const drawVerticalBridge = interpolate(currentTime, [14.0, 15.0], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const verticalBridgeOpacity = interpolate(currentTime, [14.0, 14.3, 19.0, 19.5], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
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
        fontFamily: IndustrialTheme.fonts.sans,
        ...IndustrialTheme.typography.antialiased,
        color: IndustrialTheme.text.hero,
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

      {/* INFINITE BLACKBOARD DRAFTING CANVAS */}
      <div style={{ position: 'absolute', inset: 0, opacity: blackboardOpacity, transition: 'opacity 0.4s ease-out' }}>
        <SpatialBoard cameraScale={cameraScale} cameraPanX={cameraPanX} cameraPanY={cameraPanY}>

          {/* ── HORIZONTAL INTER-CLUSTER LASER CONDUITS (TRANSITION ONLY: Zero Bleed) ── */}
          <KineticLaserConduit
            x1={-1100}
            y1={-245}
            x2={-450}
            y2={-245}
            color={IndustrialTheme.signals.crimson}
            drawProgress={drawLine1}
            opacity={conduit1Opacity}
          />

          <KineticLaserConduit
            x1={450}
            y1={-245}
            x2={1100}
            y2={-245}
            color={IndustrialTheme.signals.mint}
            drawProgress={drawLine2}
            opacity={conduit2Opacity}
          />

          {/* ── VERTICAL CAUSAL LASER BRIDGE (Through Open Vertical Gutter: Y=-65 to Y=65) ── */}
          <KineticLaserConduit
            x1={0}
            y1={-65}
            x2={0}
            y2={65}
            color={IndustrialTheme.signals.crimson}
            drawProgress={drawVerticalBridge}
            opacity={verticalBridgeOpacity}
          />

          {/* ═══════════════════════════════════════════════════════════
              CLUSTER 1: THE STALL & 3D EDITORIAL HUMOR (X: -1550)
             ═══════════════════════════════════════════════════════════ */}
          <KineticNode
            x={-1550}
            y={-245}
            width={840}
            title="Planning Analytics Workspace"
            badge="THREAD LOCK DETECTED"
            badgeType="crimson"
            isActive={currentTime < 10.0}
            entranceDelayFrames={0}
            cameraPanX={cameraPanX}
            cameraPanY={cameraPanY}
          >
            <div style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.12em', color: IndustrialTheme.text.secondary, fontWeight: 700, marginBottom: 8 }}>
              Active Consolidation Latency
            </div>
            <div style={{ fontSize: 68, fontWeight: 900, color: IndustrialTheme.signals.crimson, fontFamily: IndustrialTheme.fonts.mono, letterSpacing: '-0.03em', lineHeight: 1 }}>
              {latencyVal.toFixed(1)}s
            </div>
            <div style={{ marginTop: 14, display: 'flex', justifyContent: 'space-between', fontSize: 13, color: IndustrialTheme.text.tertiary, fontFamily: IndustrialTheme.fonts.mono }}>
              <span>Evaluating 8 Dimensions...</span>
              <span style={{ color: IndustrialTheme.signals.crimson, fontWeight: 700 }}>{Math.min(92, Math.round(latencyVal * 2.2))}% STALLED</span>
            </div>
            <div style={{ marginTop: 8, width: '100%', height: 7, backgroundColor: '#E2E8F0', borderRadius: 4, overflow: 'hidden' }}>
              <div style={{ width: `${Math.min(92, latencyVal * 2.2)}%`, height: '100%', backgroundColor: IndustrialTheme.signals.crimson }} />
            </div>
          </KineticNode>

          <KineticNode
            x={-1550}
            y={245}
            width={840}
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
            y={-245}
            width={880}
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
            y={245}
            width={880}
            title="Memory Register Layout"
            badge="EXPONENTIAL BLOAT"
            badgeType="crimson"
            isActive={currentTime >= 14.5 && currentTime < 19.5}
            entranceDelayFrames={Math.round(14.5 * fps)}
            cameraPanX={cameraPanX}
            cameraPanY={cameraPanY}
          >
            <BitLatticeGrid populatedCount={6} totalCount={96} />
          </KineticNode>

          {/* ═══════════════════════════════════════════════════════════
              CLUSTER 3: TARGETED CONDITIONAL FEEDER & REMEDIATION (X: +1550)
             ═══════════════════════════════════════════════════════════ */}
          <KineticNode
            x={1550}
            y={-245}
            width={880}
            title="Targeted Conditional Feeder Engine"
            badge="CONDITIONAL ACTIVE"
            badgeType="mint"
            isActive={currentTime >= 19.0 && currentTime < 28.2}
            entranceDelayFrames={Math.round(19.0 * fps)}
            cameraPanX={cameraPanX}
            cameraPanY={cameraPanY}
          >
            <div style={{ fontSize: 15, fontFamily: IndustrialTheme.fonts.mono, color: IndustrialTheme.text.primary, lineHeight: 1.6, background: IndustrialTheme.popout.recessedWell, padding: 18, borderRadius: 12, border: '1px solid rgba(0,0,0,0.06)' }}>
              <div><span style={{ color: IndustrialTheme.text.hero, fontWeight: 700 }}>['Units']</span> =&gt; DB(</div>
              <div style={{ paddingLeft: 18 }}><span style={{ color: IndustrialTheme.signals.amber, fontWeight: 700 }}>IF</span>(DB('Control_Feeder_Flags', !Year, !Period, 'Active') == 1,</div>
              <div style={{ paddingLeft: 36 }}><span style={{ color: IndustrialTheme.signals.mint, fontWeight: 700 }}>'Revenue_Cube'</span>, ''</div>
              <div style={{ paddingLeft: 18 }}>), !Version, !Year, !Period, 'Revenue');</div>
            </div>
            <div style={{ marginTop: 12 }}>
              <CircuitConduit
                labelStart="[ Leaf Input ]"
                labelEnd="[ Target Cell ]"
                pulseOffset={pulseOffset}
                color="#0F172A"
              />
            </div>
          </KineticNode>

          <KineticNode
            x={1550}
            y={245}
            width={880}
            title="Diagnostic Remediation Result"
            badge="SUB-SECOND SPEED"
            badgeType="mint"
            isActive={currentTime >= 19.0 && currentTime < 28.2}
            entranceDelayFrames={Math.round(20.0 * fps)}
            cameraPanX={cameraPanX}
            cameraPanY={cameraPanY}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, alignItems: 'center' }}>
              <div style={{ background: IndustrialTheme.popout.recessedWell, padding: 18, borderRadius: 12, border: '1px solid rgba(0,0,0,0.06)' }}>
                <div style={{ fontSize: 13, color: IndustrialTheme.text.secondary, textTransform: 'uppercase', fontWeight: 700 }}>Server Memory</div>
                <div style={{ fontSize: 36, fontWeight: 900, color: IndustrialTheme.signals.mint, fontFamily: IndustrialTheme.fonts.mono }}>
                  {bloatReduction.toFixed(1)} GB
                </div>
                <div style={{ fontSize: 13, color: IndustrialTheme.signals.mint, fontWeight: 700 }}>-87% Bloat Collapse</div>
              </div>

              <div style={{ background: IndustrialTheme.popout.recessedWell, padding: 18, borderRadius: 12, border: '1px solid rgba(0,0,0,0.06)' }}>
                <div style={{ fontSize: 13, color: IndustrialTheme.text.secondary, textTransform: 'uppercase', fontWeight: 700 }}>Consolidated View</div>
                <div style={{ fontSize: 36, fontWeight: 900, color: IndustrialTheme.signals.mint, fontFamily: IndustrialTheme.fonts.mono }}>
                  {subSecLatency.toFixed(1)}s
                </div>
                <div style={{ fontSize: 13, color: IndustrialTheme.signals.mint, fontWeight: 700 }}>Sub-Second Speed</div>
              </div>
            </div>
          </KineticNode>

        </SpatialBoard>
      </div>

      {/* DEDICATED CINEMATIC OUTRO STAGE (t >= 28.2s) */}
      {currentTime >= 28.0 && <CtaOutroStage />}

      {/* TOP-ANCHORED 1:1 CONTEXTUAL KINETIC NARRATIVE HUD */}
      <SubtitleKaraoke words={timingData.words} currentTime={currentTime} />
    </AbsoluteFill>
  );
};
