import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { RoundedBox } from '@react-three/drei';
import { CanvasText } from './CanvasText';

export const Act3_Governance3D: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Beats 10-14 (f1860 - f2718)
  const isApproved = frame >= 2610;
  const switchSpring = spring({
    frame: Math.max(0, frame - 2610),
    fps,
    config: { mass: 0.5, damping: 12, stiffness: 140 },
  });

  const packetTravel = interpolate(frame, [1860, 2300, 2610, 2710], [-2.4, 0, 0, 2.4], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const switchKnobX = interpolate(switchSpring, [0, 1], [-0.35, 0.35]);

  return (
    <group position={[0, 0, 0]}>
      {/* 3D Multi-Agent Pipeline Stage (Center-Left) */}
      <group position={[-0.8, 0, 0]}>
        {/* Step 1: SAP Delay Node */}
        <group position={[-1.8, 0.8, 0]}>
          <RoundedBox args={[1.6, 0.8, 0.2]} radius={0.06} smoothness={4}>
            <meshStandardMaterial color="#0B0F19" metalness={0.8} roughness={0.2} />
          </RoundedBox>
          <CanvasText
            position={[0, 0, 0.12]}
            text="SAP S/4HANA"
            subtext="[ STEP 1: DELAY DETECTED ]"
            color="#FFFFFF"
            subColor="#F59E0B"
            fontSize={24}
            subFontSize={16}
            width={320}
            height={100}
            scale={0.85}
          />
        </group>

        {/* Laser Conduit 1 */}
        <mesh position={[-0.9, 0.4, 0]} rotation={[0, 0, -Math.PI / 4]}>
          <cylinderGeometry args={[0.02, 0.02, 1.2, 8]} />
          <meshStandardMaterial color="#4daeeb" emissive="#4daeeb" emissiveIntensity={1.8} />
        </mesh>

        {/* Step 2: watsonx Autonomous Reasoning Node */}
        <group position={[0, 0, 0]}>
          <RoundedBox args={[1.8, 0.9, 0.25]} radius={0.06} smoothness={4}>
            <meshStandardMaterial
              color="#090A0C"
              emissive="#4daeeb"
              emissiveIntensity={0.5}
              metalness={0.8}
              roughness={0.2}
            />
          </RoundedBox>
          <CanvasText
            position={[0, 0, 0.15]}
            text="watsonx Agent"
            subtext="[ STEP 2: AUTO-DRAFT TICKET ]"
            color="#FFFFFF"
            subColor="#4daeeb"
            fontSize={26}
            subFontSize={16}
            width={360}
            height={110}
            scale={0.85}
          />
        </group>

        {/* Laser Conduit 2 */}
        <mesh position={[0.9, -0.4, 0]} rotation={[0, 0, -Math.PI / 4]}>
          <cylinderGeometry args={[0.02, 0.02, 1.2, 8]} />
          <meshStandardMaterial
            color={isApproved ? '#10B981' : '#F43F5E'}
            emissive={isApproved ? '#10B981' : '#F43F5E'}
            emissiveIntensity={1.8}
          />
        </mesh>

        {/* Step 3: ServiceNow Destination Node */}
        <group position={[1.8, -0.8, 0]}>
          <RoundedBox args={[1.6, 0.8, 0.2]} radius={0.06} smoothness={4}>
            <meshStandardMaterial color="#0B0F19" metalness={0.8} roughness={0.2} />
          </RoundedBox>
          <CanvasText
            position={[0, 0, 0.12]}
            text="ServiceNow P1"
            subtext={isApproved ? '[ STEP 3: ✓ COMMITTED ]' : '[ STEP 3: AWAITING GATE ]'}
            color="#FFFFFF"
            subColor={isApproved ? '#10B981' : '#F43F5E'}
            fontSize={24}
            subFontSize={16}
            width={320}
            height={100}
            scale={0.85}
          />
        </group>

        {/* Dynamic Laser Packet Sphere */}
        <mesh position={[packetTravel, 0, 0.18]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial
            color={isApproved ? '#10B981' : '#4daeeb'}
            emissive={isApproved ? '#10B981' : '#4daeeb'}
            emissiveIntensity={3.0}
          />
        </mesh>
      </group>

      {/* 3D Tactile Physical Governance Switch (Right) */}
      <group position={[2.4, 0.2, 0]}>
        <RoundedBox args={[1.6, 0.8, 0.3]} radius={0.08} smoothness={4}>
          <meshStandardMaterial
            color="#0B0F19"
            emissive={isApproved ? '#10B981' : '#F43F5E'}
            emissiveIntensity={0.4}
            metalness={0.9}
            roughness={0.2}
          />
        </RoundedBox>

        {/* Sliding Switch Knob */}
        <group position={[switchKnobX, 0, 0.18]}>
          <RoundedBox args={[0.55, 0.55, 0.2]} radius={0.06} smoothness={4}>
            <meshStandardMaterial
              color={isApproved ? '#10B981' : '#F43F5E'}
              emissive={isApproved ? '#10B981' : '#F43F5E'}
              emissiveIntensity={1.5}
              metalness={0.3}
              roughness={0.1}
            />
          </RoundedBox>
          <CanvasText
            position={[0, 0, 0.12]}
            text={isApproved ? '✓' : '✕'}
            color="#090A0C"
            fontSize={36}
            width={80}
            height={80}
            scale={0.8}
          />
        </group>

        <CanvasText
          position={[0, -0.7, 0]}
          text={isApproved ? 'AUTHORIZED (1-CLICK)' : 'GUARDRAIL: LOCKED'}
          subtext="Zero unverified changes without manager sign-off."
          color={isApproved ? '#10B981' : '#F43F5E'}
          subColor="#94A3B8"
          fontSize={22}
          subFontSize={14}
          width={440}
          height={90}
          scale={0.9}
        />
      </group>
    </group>
  );
};
