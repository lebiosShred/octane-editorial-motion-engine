import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { RoundedBox } from '@react-three/drei';
import { CanvasText } from './CanvasText';

export const Act4_Observability3D: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Beats 15-16 (f2718 - f3407)
  const slamSpring = spring({
    frame: Math.max(0, frame - 2994),
    fps,
    config: { mass: 0.8, damping: 11, stiffness: 130 },
  });

  const speedMultiplier = interpolate(frame, [2994, 3200], [1.0, 10.1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const slamElevation = interpolate(slamSpring, [0, 1], [4, 0]);
  const shockwaveScale = interpolate(slamSpring, [0.4, 1], [0.1, 2.5], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const shockwaveOpacity = interpolate(slamSpring, [0.4, 0.8, 1], [1, 0.8, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const spans = [
    { name: 'sap.order.query', duration: '24ms', color: '#4daeeb', width: 1.4, offset: -0.6, z: 0 },
    { name: 'watsonx.agent.reason', duration: '142ms', color: '#4daeeb', width: 2.2, offset: 0.1, z: 0.2 },
    { name: 'servicenow.ticket.draft', duration: '38ms', color: '#10B981', width: 1.6, offset: 0.8, z: 0.4 },
    { name: 'governance.policy.audit', duration: '12ms', color: '#F59E0B', width: 0.9, offset: 1.4, z: 0.6 },
  ];

  return (
    <group position={[0, 0, 0]}>
      {/* 3D OpenTelemetry Waterfall Spans (Left) */}
      <group position={[-1.6, 0.2, 0]}>
        <CanvasText
          position={[0, 1.4, 0]}
          text="OPENTELEMETRY TRACE"
          subtext="[ 100% EXECUTION AUDIT LOGGED ]"
          color="#4daeeb"
          subColor="#10B981"
          fontSize={22}
          subFontSize={14}
          width={400}
          height={80}
          scale={0.9}
        />

        {spans.map((span, idx) => {
          const spanProgress = interpolate(frame, [2718 + idx * 40, 2760 + idx * 40], [0.1, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });

          return (
            <group key={idx} position={[0, 0.8 - idx * 0.5, span.z]}>
              {/* Span Track Background */}
              <RoundedBox args={[3.2, 0.32, 0.08]} radius={0.02} smoothness={4}>
                <meshStandardMaterial color="#0B0F19" metalness={0.8} roughness={0.2} />
              </RoundedBox>

              {/* Active Span Fill */}
              <mesh position={[span.offset, 0, 0.05]}>
                <boxGeometry args={[span.width * spanProgress, 0.22, 0.04]} />
                <meshStandardMaterial
                  color={span.color}
                  emissive={span.color}
                  emissiveIntensity={1.8}
                />
              </mesh>

              {/* Monospace Labels in WebGL */}
              <CanvasText
                position={[-0.8, 0, 0.08]}
                text={span.name}
                color="#FFFFFF"
                fontSize={18}
                width={200}
                height={50}
                align="left"
                scale={0.8}
              />
              <CanvasText
                position={[1.0, 0, 0.08]}
                text={span.duration}
                color={span.color}
                fontSize={20}
                width={120}
                height={50}
                align="right"
                scale={0.8}
              />
            </group>
          );
        })}
      </group>

      {/* 3D Hero Slam Velocity Monument (Right) */}
      <group position={[1.8, slamElevation, 0]}>
        {/* Shockwave Ring */}
        <mesh position={[0, -0.8, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[shockwaveScale, shockwaveScale, 1]}>
          <ringGeometry args={[0.8, 0.95, 32]} />
          <meshStandardMaterial
            color="#10B981"
            emissive="#10B981"
            emissiveIntensity={3.0}
            transparent
            opacity={shockwaveOpacity}
          />
        </mesh>

        <CanvasText
          position={[0, 0.2, 0]}
          text={`${speedMultiplier.toFixed(1)}x FASTER`}
          subtext="[ DEPLOY PRODUCTION AGENTS IN DAYS ]"
          color="#FFFFFF"
          subColor="#10B981"
          fontSize={54}
          subFontSize={18}
          width={560}
          height={160}
          scale={1.1}
        />
      </group>
    </group>
  );
};
