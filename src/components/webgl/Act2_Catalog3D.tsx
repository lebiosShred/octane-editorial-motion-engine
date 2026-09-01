import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { RoundedBox } from '@react-three/drei';
import { CanvasText } from './CanvasText';

export const Act2_Catalog3D: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const getPillarSpring = (triggerFrame: number) => {
    return spring({
      frame: Math.max(0, frame - triggerFrame),
      fps,
      config: { mass: 0.5, damping: 12, stiffness: 120 },
    });
  };

  const sapSpring = getPillarSpring(1458);
  const salesforceSpring = getPillarSpring(1490);
  const servicenowSpring = getPillarSpring(1525);
  const workdaySpring = getPillarSpring(1560);

  const pillars = [
    { name: 'SAP S/4HANA', color: '#0070F2', angle: 30, sp: sapSpring },
    { name: 'SALESFORCE', color: '#00A1E0', angle: 120, sp: salesforceSpring },
    { name: 'SERVICENOW', color: '#81B5A1', angle: 210, sp: servicenowSpring },
    { name: 'WORKDAY', color: '#E28225', angle: 300, sp: workdaySpring },
  ];

  const coreRotation = frame * 0.015;

  return (
    <group position={[0, 0, 0]}>
      {/* 3D Pedestal Platform (Center-Left) */}
      <group position={[-1.2, -0.2, 0]}>
        {/* Base Cylinder Platform */}
        <mesh position={[0, -0.2, 0]}>
          <cylinderGeometry args={[2.2, 2.4, 0.4, 32]} />
          <meshStandardMaterial color="#0B0F19" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Orbit Ring */}
        <mesh position={[0, 0.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.8, 0.02, 16, 64]} />
          <meshStandardMaterial color="#4daeeb" emissive="#4daeeb" emissiveIntensity={1.8} />
        </mesh>

        {/* Central watsonx Core Hub */}
        <group position={[0, 0.6, 0]} rotation={[0, coreRotation, 0]}>
          <RoundedBox args={[0.9, 0.9, 0.9]} radius={0.1} smoothness={4}>
            <meshStandardMaterial
              color="#FFFFFF"
              emissive="#4daeeb"
              emissiveIntensity={0.6}
              metalness={0.2}
              roughness={0.1}
            />
          </RoundedBox>

          <CanvasText
            position={[0, 0, 0.48]}
            text="IBM"
            subtext="ORCHESTRATE"
            color="#090A0C"
            subColor="#0062FF"
            fontSize={36}
            subFontSize={20}
            width={240}
            height={100}
            scale={0.8}
          />
        </group>

        {/* 4 Rising Brand Platform Sockets */}
        {pillars.map((p, idx) => {
          const rad = (p.angle * Math.PI) / 180;
          const radius = 1.8;
          const x = Math.cos(rad) * radius;
          const z = Math.sin(rad) * radius;
          const y = interpolate(p.sp, [0, 1], [-1.2, 0.5]);
          const opacity = interpolate(p.sp, [0, 0.2, 1], [0, 1, 1]);

          return (
            <group key={idx} position={[x, y, z]}>
              {/* Laser Beam connecting Socket to Core */}
              <mesh position={[-x * 0.5, 0.1 - y * 0.5, -z * 0.5]} rotation={[0, -p.angle * (Math.PI / 180) + Math.PI / 2, 0]}>
                <cylinderGeometry args={[0.015, 0.015, radius, 8]} />
                <meshStandardMaterial
                  color="#4daeeb"
                  emissive="#4daeeb"
                  emissiveIntensity={2.0 * opacity}
                  transparent
                  opacity={opacity}
                />
              </mesh>

              {/* Physical Floating Socket Disc */}
              <RoundedBox args={[0.9, 0.22, 0.9]} radius={0.06} smoothness={4}>
                <meshStandardMaterial
                  color="#0F172A"
                  emissive={p.color}
                  emissiveIntensity={0.6}
                  metalness={0.8}
                  roughness={0.2}
                />
              </RoundedBox>

              <CanvasText
                position={[0, 0.14, 0]}
                rotation={[-Math.PI / 2, 0, 0]}
                text={p.name}
                color="#FFFFFF"
                fontSize={24}
                width={200}
                height={60}
                scale={0.8}
              />
            </group>
          );
        })}
      </group>

      {/* 3D Massive Unboxed 150+ AGENTS Monument (Right) */}
      <group position={[2.2, 0.2, 0]}>
        <CanvasText
          position={[0, 0.2, 0]}
          text="150+ AGENTS"
          subtext="[ GOVERNED ENTERPRISE CATALOG ]"
          color="#FFFFFF"
          subColor="#4daeeb"
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
