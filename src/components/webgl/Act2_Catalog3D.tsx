import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { Cylinder, RoundedBox } from '@react-three/drei';
import { CanvasText } from './CanvasText';

export const Act2_Catalog3D: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pedestalSpring = spring({
    frame: Math.max(0, frame - 930),
    fps,
    config: { mass: 0.8, damping: 14, stiffness: 100 },
  });

  const socketsSpring = spring({
    frame: Math.max(0, frame - 1458),
    fps,
    config: { mass: 0.6, damping: 12, stiffness: 120 },
  });

  const pedestalY = interpolate(pedestalSpring, [0, 1], [-4, -0.6]);
  const socketsElevation = interpolate(socketsSpring, [0, 1], [-3, 0]);

  const brands = [
    { name: 'SAP S/4HANA', sub: 'MCP: SSE // 14ms', pos: [-2.6, socketsElevation + 0.4, 0.4] as [number, number, number], color: '#0070F2' },
    { name: 'SALESFORCE CRM', sub: 'MCP: REST // 18ms', pos: [-0.9, socketsElevation + 0.8, -0.8] as [number, number, number], color: '#00A1E0' },
    { name: 'SERVICENOW', sub: 'MCP: JSON-RPC // 12ms', pos: [0.9, socketsElevation + 0.8, -0.8] as [number, number, number], color: '#81B5A1' },
    { name: 'WORKDAY HCM', sub: 'MCP: SSE // 16ms', pos: [2.6, socketsElevation + 0.4, 0.4] as [number, number, number], color: '#E28225' },
  ];

  return (
    <group position={[0, 0, 0]}>
      {/* Central 3D Monolithic Pedestal */}
      <group position={[0, pedestalY, 0]}>
        <Cylinder args={[2.0, 2.2, 1.2, 32]}>
          <meshStandardMaterial color="#0B0F19" metalness={0.9} roughness={0.15} />
        </Cylinder>

        {/* Watsonx Core Glowing Orb */}
        <mesh position={[0, 1.2, 0]}>
          <octahedronGeometry args={[0.5, 2]} />
          <meshStandardMaterial
            color="#4daeeb"
            emissive="#4daeeb"
            emissiveIntensity={2.5}
            wireframe
          />
        </mesh>

        <CanvasText
          position={[0, 0, 2.1]}
          text="IBM watsonx Orchestrate"
          subtext="[ CENTRAL GOVERNED AGENT REGISTRY: 150+ CONNECTORS ]"
          color="#FFFFFF"
          subColor="#4daeeb"
          fontSize={24}
          subFontSize={12}
          width={480}
          height={100}
          scale={0.9}
        />
      </group>

      {/* 4 Rising Brand Platform Sockets with Authentic MCP Telemetry */}
      {brands.map((b, i) => (
        <group key={i} position={b.pos}>
          <RoundedBox args={[1.5, 0.7, 0.2]} radius={0.06} smoothness={4}>
            <meshStandardMaterial
              color="#0B0F19"
              emissive={b.color}
              emissiveIntensity={0.5}
              metalness={0.8}
              roughness={0.2}
            />
          </RoundedBox>
          <CanvasText
            position={[0, 0, 0.12]}
            text={b.name}
            subtext={b.sub}
            color="#FFFFFF"
            subColor={b.color}
            fontSize={18}
            subFontSize={11}
            width={260}
            height={80}
            scale={0.8}
          />
        </group>
      ))}
    </group>
  );
};
