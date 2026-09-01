import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { RoundedBox } from '@react-three/drei';
import { CanvasText } from './CanvasText';

export const Act1_Bottleneck3D: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Beat triggers
  const isBroken = frame >= 768;
  const breakSpring = spring({
    frame: Math.max(0, frame - 768),
    fps,
    config: { mass: 0.8, damping: 10, stiffness: 90 },
  });

  const numberSpring = spring({
    frame: Math.max(0, frame - 198),
    fps,
    config: { mass: 0.6, damping: 14, stiffness: 110 },
  });

  const stallDays = interpolate(frame, [0, 360], [0, 180], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const daysElevation = interpolate(numberSpring, [0, 1], [-4, 0]);

  // Fragment physics
  const frag1Y = interpolate(breakSpring, [0, 1], [0, -3.5]);
  const frag1RotZ = interpolate(breakSpring, [0, 1], [0, -0.4]);

  const frag2Y = interpolate(breakSpring, [0, 1], [0, -4.2]);
  const frag2RotZ = interpolate(breakSpring, [0, 1], [0, 0.5]);

  return (
    <group position={[0, 0, 0]}>
      {/* 3D Server Monolith (Left) */}
      <group position={[-2.4, 0, -1]}>
        <RoundedBox args={[1.4, 3.2, 0.8]} radius={0.08} smoothness={4}>
          <meshStandardMaterial color="#0B0F19" metalness={0.8} roughness={0.2} />
        </RoundedBox>

        {/* Server Rack Status LED Array */}
        {[-1.0, -0.5, 0.0, 0.5, 1.0].map((yPos, i) => {
          const ledColor = isBroken ? (i % 2 === 0 ? '#F43F5E' : '#F59E0B') : '#4daeeb';
          return (
            <mesh key={i} position={[0, yPos, 0.42]}>
              <boxGeometry args={[1.1, 0.12, 0.04]} />
              <meshStandardMaterial
                color={ledColor}
                emissive={ledColor}
                emissiveIntensity={isBroken ? 2.5 : 1.2}
              />
            </mesh>
          );
        })}

        {/* Floating Server 3D Label */}
        <CanvasText
          position={[0, 1.9, 0]}
          text={isBroken ? 'CRITICAL SCHEMA BREAK' : 'ERP_CORE_SERVER [RACK_01]'}
          color={isBroken ? '#F43F5E' : '#4daeeb'}
          bgColor="rgba(11, 15, 25, 0.85)"
          borderColor={isBroken ? '#F43F5E' : '#4daeeb'}
          fontSize={22}
          width={400}
          height={64}
          scale={0.8}
        />
      </group>

      {/* 3D Point-to-Point Wire Conduits */}
      <group position={[-1.2, 0, 0]}>
        <mesh position={[0, 0.4, 0]} rotation={[0, 0, 0.2]}>
          <cylinderGeometry args={[0.025, 0.025, 1.8, 8]} />
          <meshStandardMaterial
            color={isBroken ? '#F43F5E' : '#4daeeb'}
            emissive={isBroken ? '#F43F5E' : '#4daeeb'}
            emissiveIntensity={1.5}
          />
        </mesh>
        <mesh position={[0, -0.4, 0]} rotation={[0, 0, -0.2]}>
          <cylinderGeometry args={[0.025, 0.025, 1.8, 8]} />
          <meshStandardMaterial
            color={isBroken ? '#F43F5E' : '#64748B'}
            emissive={isBroken ? '#F43F5E' : '#000000'}
            emissiveIntensity={isBroken ? 1.5 : 0}
          />
        </mesh>
      </group>

      {/* 3D Fracturing Code Slab Mesh (Center-Left) */}
      <group position={[-0.2, 0, 0.5]}>
        {/* Top Stable Half of Slab */}
        <RoundedBox args={[2.4, 1.2, 0.12]} radius={0.04} smoothness={4} position={[0, 0.65, 0]}>
          <meshStandardMaterial color="#090A0C" metalness={0.9} roughness={0.15} />
        </RoundedBox>

        <CanvasText
          position={[0, 0.65, 0.08]}
          text="const sapAuth = initSap();"
          subtext="const syncCrm = connect();"
          color="#E2E8F0"
          subColor="#4daeeb"
          fontSize={24}
          subFontSize={24}
          width={460}
          height={140}
          align="left"
          scale={1.0}
        />

        {/* Bottom Fracturing Fragments */}
        <group position={[0, -0.65, 0]}>
          {/* Fragment 1 (Left Split) */}
          <group position={[-0.6, frag1Y, 0]} rotation={[0, 0, frag1RotZ]}>
            <RoundedBox args={[1.15, 1.1, 0.12]} radius={0.03} smoothness={4}>
              <meshStandardMaterial
                color={isBroken ? '#3F080C' : '#090A0C'}
                emissive={isBroken ? '#F43F5E' : '#000000'}
                emissiveIntensity={isBroken ? 1.2 : 0}
                metalness={0.8}
                roughness={0.2}
              />
            </RoundedBox>
            <CanvasText
              position={[0, 0, 0.08]}
              text={isBroken ? 'ERR: 500' : 'sapAuth.map()'}
              color={isBroken ? '#FCA5A5' : '#94A3B8'}
              fontSize={24}
              width={220}
              height={80}
              scale={0.9}
            />
          </group>

          {/* Fragment 2 (Right Split) */}
          <group position={[0.6, frag2Y, 0]} rotation={[0, 0, frag2RotZ]}>
            <RoundedBox args={[1.15, 1.1, 0.12]} radius={0.03} smoothness={4}>
              <meshStandardMaterial
                color={isBroken ? '#3F080C' : '#090A0C'}
                emissive={isBroken ? '#F43F5E' : '#000000'}
                emissiveIntensity={isBroken ? 1.2 : 0}
                metalness={0.8}
                roughness={0.2}
              />
            </RoundedBox>
            <CanvasText
              position={[0, 0, 0.08]}
              text={isBroken ? 'MUTATION' : 'push(field_id)'}
              color={isBroken ? '#FCA5A5' : '#94A3B8'}
              fontSize={24}
              width={220}
              height={80}
              scale={0.9}
            />
          </group>
        </group>
      </group>

      {/* 3D Massive Unboxed 180 DAYS Monument (Right) */}
      <group position={[2.2, daysElevation, 0]}>
        <CanvasText
          position={[0, 0.2, 0]}
          text={`${Math.round(stallDays)} DAYS`}
          subtext="[ SUNK TIME ON CUSTOM GLUE CODE ]"
          color="#FFFFFF"
          subColor="#F43F5E"
          fontSize={54}
          subFontSize={18}
          width={540}
          height={160}
          scale={1.1}
        />
      </group>
    </group>
  );
};
