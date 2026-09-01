import React, { useMemo } from 'react';
import * as THREE from 'three';

interface CanvasTextProps {
  text: string;
  subtext?: string;
  fontSize?: number;
  subFontSize?: number;
  color?: string;
  subColor?: string;
  bgColor?: string;
  borderColor?: string;
  width?: number;
  height?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  align?: 'center' | 'left' | 'right';
}

export const CanvasText: React.FC<CanvasTextProps> = ({
  text,
  subtext,
  fontSize = 38,
  subFontSize = 20,
  color = '#FFFFFF',
  subColor = '#94A3B8',
  bgColor = 'transparent',
  borderColor,
  width = 512,
  height = 140,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1.0,
  align = 'center',
}) => {
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    if (bgColor !== 'transparent') {
      ctx.fillStyle = bgColor;
      ctx.roundRect ? ctx.roundRect(0, 0, width, height, 16) : ctx.fillRect(0, 0, width, height);
      ctx.fill();
    }

    if (borderColor) {
      ctx.strokeStyle = borderColor;
      ctx.lineWidth = 4;
      ctx.roundRect ? ctx.roundRect(2, 2, width - 4, height - 4, 16) : ctx.strokeRect(2, 2, width - 4, height - 4);
      ctx.stroke();
    }

    ctx.fillStyle = color;
    ctx.font = `900 ${fontSize}px "JetBrains Mono", "SF Pro Display", sans-serif`;
    ctx.textAlign = align;
    ctx.textBaseline = subtext ? 'top' : 'middle';

    const textX = align === 'center' ? width / 2 : align === 'left' ? 24 : width - 24;
    const textY = subtext ? 20 : height / 2;

    ctx.fillText(text, textX, textY);

    if (subtext) {
      ctx.fillStyle = subColor;
      ctx.font = `700 ${subFontSize}px "JetBrains Mono", "SF Pro Display", sans-serif`;
      ctx.fillText(subtext, textX, textY + fontSize + 10);
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    tex.minFilter = THREE.LinearFilter;
    return tex;
  }, [text, subtext, fontSize, subFontSize, color, subColor, bgColor, borderColor, width, height, align]);

  if (!texture) return null;

  const planeWidth = (width / 220) * scale;
  const planeHeight = (height / 220) * scale;

  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={[planeWidth, planeHeight]} />
      <meshBasicMaterial map={texture} transparent alphaTest={0.01} side={THREE.DoubleSide} />
    </mesh>
  );
};
