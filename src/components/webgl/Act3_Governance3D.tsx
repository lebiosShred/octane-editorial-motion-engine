import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { RoundedBox } from '@react-three/drei';
import { CanvasText } from './CanvasText';
import { useSapFioriTableTexture } from '../ui/SapFioriTableTexture';
import { useServiceNowIncidentTexture } from '../ui/ServiceNowIncidentTexture';
import { InteractiveCursor3D } from './InteractiveCursor3D';
import * as THREE from 'three';

export const Act3_Governance3D: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

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

  // Authentic UI Textures
  const sapTableTexture = useSapFioriTableTexture();
  const servicenowTexture = useServiceNowIncidentTexture(isApproved);

  return (
    <group position={[0, 0, 0]}>
      {/* 3D Multi-Agent Pipeline Stage (Center-Left) */}
      <group position={[-0.8, 0, 0]}>
        {/* Step 1: Authentic SAP Fiori PO Table */}
        <group position={[-1.8, 0.8, 0]}>
          <mesh position={[0, 0, 0]}>
            <planeGeometry args={[2.4, 1.4]} />
            {sapTableTexture && (
              <meshStandardMaterial map={sapTableTexture} transparent side={THREE.DoubleSide} />
            )}
          </mesh>
        </group>

        {/* Laser Conduit 1 */}
        <mesh position={[-0.6, 0.4, 0]} rotation={[0, 0, -Math.PI / 4]}>
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

        {/* Step 3: Authentic ServiceNow Incident Ticket */}
        <group position={[1.8, -0.7, 0]}>
          <mesh position={[0, 0, 0]}>
            <planeGeometry args={[2.4, 1.4]} />
            {servicenowTexture && (
              <meshStandardMaterial map={servicenowTexture} transparent side={THREE.DoubleSide} />
            )}
          </mesh>
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
      <group position={[2.6, 0.8, 0]}>
        <RoundedBox args={[1.5, 0.7, 0.25]} radius={0.08} smoothness={4}>
          <meshStandardMaterial
            color="#0B0F19"
            emissive={isApproved ? '#10B981' : '#F43F5E'}
            emissiveIntensity={0.4}
            metalness={0.9}
            roughness={0.2}
          />
        </RoundedBox>

        {/* Sliding Switch Knob */}
        <group position={[switchKnobX, 0, 0.16]}>
          <RoundedBox args={[0.5, 0.5, 0.18]} radius={0.06} smoothness={4}>
            <meshStandardMaterial
              color={isApproved ? '#10B981' : '#F43F5E'}
              emissive={isApproved ? '#10B981' : '#F43F5E'}
              emissiveIntensity={1.5}
              metalness={0.3}
              roughness={0.1}
            />
          </RoundedBox>
          <CanvasText
            position={[0, 0, 0.11]}
            text={isApproved ? '✓' : '✕'}
            color="#090A0C"
            fontSize={36}
            width={80}
            height={80}
            scale={0.8}
          />
        </group>

        <CanvasText
          position={[0, -0.6, 0]}
          text={isApproved ? 'AUTHORIZED (1-CLICK)' : 'GUARDRAIL: LOCKED'}
          subtext="Zero unverified changes without manager sign-off."
          color={isApproved ? '#10B981' : '#F43F5E'}
          subColor="#94A3B8"
          fontSize={20}
          subFontSize={13}
          width={400}
          height={80}
          scale={0.85}
        />
      </group>

      {/* 3D Interactive Mouse Cursor */}
      <InteractiveCursor3D />
    </group>
  );
};
