import React from 'react';
import { AbsoluteFill, Audio, interpolate, staticFile, useCurrentFrame, useVideoConfig, Easing } from 'remotion';
import timingData from '../../public/voiceover.json';
import { IndustrialTheme } from '../types/theme';
import { SubtitleKaraoke } from '../components/SubtitleKaraoke';
import { SpatialBoard } from '../components/spatial/SpatialBoard';
import { BoardNode } from '../components/spatial/BoardNode';
import { BoardConnector } from '../components/spatial/BoardConnector';
import { BitLatticeGrid } from '../components/forge/BitLatticeGrid';
import { DimensionTopologyTree } from '../components/forge/DimensionTopologyTree';
import { CircuitConduit } from '../components/forge/CircuitConduit';

export const TM1FeederCommercial: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentTime = frame / fps;

  // Calibrated Spatial Camera: Smoothly locks onto Cluster 1 (-1100), Cluster 2 (0), Cluster 3 (+1100), then pulls back to 0.72x
  const cameraScale = interpolate(
    currentTime,
    [0, 1.5, 6.5, 8.5, 15.5, 17.5, 24.5, 26.5, 34.0],
    [1.20, 1.25, 1.25, 1.25, 1.25, 1.25, 1.25, 0.72, 0.72],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.22, 1, 0.36, 1) }
  );

  const cameraPanX = interpolate(
    currentTime,
    [0, 1.5, 6.5, 8.5, 15.5, 17.5, 24.5, 26.5, 34.0],
    [1100, 1100, 1100, 0, 0, -1100, -1100, 0, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.22, 1, 0.36, 1) }
  );

  const cameraPanY = interpolate(
    currentTime,
    [0, 1.5, 6.5, 8.5, 15.5, 17.5, 24.5, 26.5, 34.0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.22, 1, 0.36, 1) }
  );

  // Dynamic values
  const latencyVal = interpolate(currentTime, [0, 2.5], [0.0, 42.4], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ramVal = interpolate(currentTime, [3.5, 6.0], [16, 64], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bloatReduction = interpolate(currentTime, [20.5, 23.5], [48.0, 6.2], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const subSecLatency = interpolate(currentTime, [22.0, 24.5], [42.4, 0.4], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Self-drawing clean docked laser lines
  const drawLine1 = interpolate(currentTime, [6.5, 8.5], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const drawLine2 = interpolate(currentTime, [15.5, 17.5], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
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

      {/* INFINITE BLACKBOARD DRAFTING CANVAS */}
      <SpatialBoard cameraScale={cameraScale} cameraPanX={cameraPanX} cameraPanY={cameraPanY}>

        {/* ── VECTOR CONNECTOR TRACES (CLEANLY DOCKED TO CARD PORTS) ── */}
        {/* Connector 1: Right Port of Cluster 1 Top Node (-860, -160) -> Left Port of Cluster 2 Top Node (-250, -160) */}
        <BoardConnector
          x1={-860}
          y1={-160}
          x2={-250}
          y2={-160}
          color={IndustrialTheme.signals.crimson}
          drawProgress={drawLine1}
        />

        {/* Connector 2: Right Port of Cluster 2 Top Node (+250, -160) -> Left Port of Cluster 3 Top Node (+850, -160) */}
        <BoardConnector
          x1={250}
          y1={-160}
          x2={850}
          y2={-160}
          color={IndustrialTheme.signals.mint}
          drawProgress={drawLine2}
        />

        {/* ═══════════════════════════════════════════════════════════
            CLUSTER 1: THE STALL & HARDWARE MYTH (X: -1100)
           ═══════════════════════════════════════════════════════════ */}
        <BoardNode
          x={-1100}
          y={-160}
          width={480}
          title="Planning Analytics Workspace"
          badge="THREAD LOCK DETECTED"
          badgeType="crimson"
          isActive={currentTime < 8.0 || currentTime >= 26.5}
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
        </BoardNode>

        <BoardNode
          x={-1100}
          y={170}
          width={480}
          title="Infrastructure Action"
          badge="HARDWARE MYTH"
          badgeType="amber"
          isActive={(currentTime >= 3.0 && currentTime < 8.0) || currentTime >= 26.5}
        >
          <div style={{ fontSize: 20, fontWeight: 800, color: IndustrialTheme.text.hero, marginBottom: 8 }}>
            Scaled VM Memory: <span style={{ color: IndustrialTheme.text.primary, fontFamily: 'monospace' }}>{Math.round(ramVal)} GB RAM</span>
          </div>
          <div style={{ background: IndustrialTheme.signals.crimsonBg, border: `1px solid ${IndustrialTheme.signals.crimsonBorder}`, borderRadius: 8, padding: '8px 12px' }}>
            <div style={{ fontSize: 11, color: IndustrialTheme.signals.crimson, fontWeight: 700 }}>
              RAM does not eliminate exponential zero-cell traversal.
            </div>
          </div>
        </BoardNode>

        {/* ═══════════════════════════════════════════════════════════
            CLUSTER 2: OVERFEEDING & MULTIPLIER EXPLOSION (X: 0)
           ═══════════════════════════════════════════════════════════ */}
        <BoardNode
          x={0}
          y={-160}
          width={500}
          title="Root Bottleneck: Overfeeding Architecture"
          badge="108M DERIVED CELLS"
          badgeType="crimson"
          isActive={(currentTime >= 7.5 && currentTime < 17.0) || currentTime >= 26.5}
        >
          <DimensionTopologyTree />
        </BoardNode>

        <BoardNode
          x={0}
          y={170}
          width={500}
          title="Memory Lattice (16x8 Register)"
          badge="CRITICAL OVERFEED"
          badgeType="crimson"
          isActive={(currentTime >= 7.5 && currentTime < 17.0) || currentTime >= 26.5}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: 11, color: IndustrialTheme.text.secondary, fontWeight: 700 }}>Fed to Populated Ratio</span>
            <span style={{ fontSize: 22, fontWeight: 900, color: IndustrialTheme.signals.crimson, fontFamily: 'monospace' }}>250:1</span>
          </div>
          <BitLatticeGrid populatedCount={6} totalCount={128} isOverfed={true} />
        </BoardNode>

        {/* ═══════════════════════════════════════════════════════════
            CLUSTER 3: TARGETED CONDITIONAL FEEDER & REMEDIATION (X: +1100)
           ═══════════════════════════════════════════════════════════ */}
        <BoardNode
          x={1100}
          y={-160}
          width={500}
          title="Targeted Conditional Feeder Engine"
          badge="CONDITIONAL ACTIVE"
          badgeType="mint"
          isActive={currentTime >= 16.5}
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
        </BoardNode>

        <BoardNode
          x={1100}
          y={170}
          width={500}
          title="Diagnostic Remediation Result"
          badge="SUB-SECOND SPEED"
          badgeType="mint"
          isActive={currentTime >= 16.5}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, alignItems: 'center' }}>
            <div style={{ background: IndustrialTheme.popout.recessedWell, padding: 12, borderRadius: 10, border: '1px solid rgba(0,0,0,0.06)' }}>
              <div style={{ fontSize: 10, color: IndustrialTheme.text.secondary, textTransform: 'uppercase', fontWeight: 700 }}>Server Memory</div>
              <div style={{ fontSize: 24, fontWeight: 900, color: IndustrialTheme.signals.mint, fontFamily: 'monospace' }}>
                {bloatReduction.toFixed(1)} GB
              </div>
              <div style={{ fontSize: 10, color: IndustrialTheme.signals.mint, fontWeight: 700 }}>-87% Bloat Collapse</div>
            </div>

            <div style={{ background: IndustrialTheme.popout.recessedWell, padding: 12, borderRadius: 10, border: '1px solid rgba(0,0,0,0.06)' }}>
              <div style={{ fontSize: 10, color: IndustrialTheme.text.secondary, textTransform: 'uppercase', fontWeight: 700 }}>Consolidated View</div>
              <div style={{ fontSize: 24, fontWeight: 900, color: IndustrialTheme.signals.mint, fontFamily: 'monospace' }}>
                {subSecLatency.toFixed(1)}s
              </div>
              <div style={{ fontSize: 10, color: IndustrialTheme.signals.mint, fontWeight: 700 }}>Sub-Second Speed</div>
            </div>
          </div>

          <div
            style={{
              marginTop: 14,
              background: '#0F172A',
              color: '#FFFFFF',
              fontSize: 11,
              fontWeight: 700,
              textAlign: 'center',
              padding: '10px 16px',
              borderRadius: 8,
              boxShadow: '0 4px 12px rgba(15, 23, 42, 0.2)'
            }}
          >
            octanesolutions.com.au/playbook
          </div>
        </BoardNode>

      </SpatialBoard>

      <SubtitleKaraoke words={timingData.words} currentTime={currentTime} />
    </AbsoluteFill>
  );
};
