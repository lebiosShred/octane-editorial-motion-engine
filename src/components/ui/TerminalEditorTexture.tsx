import { useMemo } from 'react';
import * as THREE from 'three';

export const useTerminalEditorTexture = (isBroken: boolean) => {
  return useMemo(() => {
    const width = 820;
    const height = 540;
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    // Window Background with subtle border
    ctx.fillStyle = '#0D1117';
    ctx.strokeStyle = '#30363D';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.roundRect ? ctx.roundRect(0, 0, width, height, 16) : ctx.fillRect(0, 0, width, height);
    ctx.fill();
    ctx.stroke();

    // Window Header Bar
    ctx.fillStyle = '#161B22';
    ctx.beginPath();
    ctx.roundRect ? ctx.roundRect(0, 0, width, 52, [16, 16, 0, 0]) : ctx.fillRect(0, 0, width, 52);
    ctx.fill();

    // macOS Window Controls
    const dots = [
      { color: '#FF5F56', x: 30 },
      { color: '#FFBD2E', x: 54 },
      { color: '#27C93F', x: 78 },
    ];
    dots.forEach((dot) => {
      ctx.fillStyle = dot.color;
      ctx.beginPath();
      ctx.arc(dot.x, 26, 7, 0, Math.PI * 2);
      ctx.fill();
    });

    // Active File Tab
    ctx.fillStyle = '#0D1117';
    ctx.beginPath();
    ctx.roundRect ? ctx.roundRect(115, 10, 310, 42, [8, 8, 0, 0]) : ctx.fillRect(115, 10, 310, 42);
    ctx.fill();

    ctx.fillStyle = '#4daeeb';
    ctx.font = '900 15px "JetBrains Mono", monospace';
    ctx.fillText('TS', 135, 36);

    ctx.fillStyle = '#E6EDF3';
    ctx.font = '700 15px "JetBrains Mono", monospace';
    ctx.fillText('adapters/legacy_sap_sync.ts', 165, 36);

    // Code lines
    const lines = [
      { num: '1', tokens: [{ text: 'import', color: '#FF7B72' }, { text: ' { SapClient } ', color: '#E6EDF3' }, { text: 'from', color: '#FF7B72' }, { text: " '@sap/erp';", color: '#A5D6FF' }] },
      { num: '2', tokens: [{ text: 'import', color: '#FF7B72' }, { text: ' { mapPayload } ', color: '#E6EDF3' }, { text: 'from', color: '#FF7B72' }, { text: " './mapper';", color: '#A5D6FF' }] },
      { num: '3', tokens: [{ text: '', color: '#E6EDF3' }] },
      { num: '4', tokens: [{ text: 'export async function', color: '#FF7B72' }, { text: ' syncOrder', color: '#D2A8FF' }, { text: '(id: string) {', color: '#E6EDF3' }] },
      { num: '5', tokens: [{ text: '  const', color: '#FF7B72' }, { text: ' raw = await SapClient.', color: '#E6EDF3' }, { text: 'getOrder', color: '#79C0FF' }, { text: '(id);', color: '#E6EDF3' }] },
      {
        num: '6',
        tokens: isBroken
          ? [{ text: '  const', color: '#FF7B72' }, { text: ' data = ', color: '#E6EDF3' }, { text: 'raw.schema_v1.items;', color: '#FF7B72' }, { text: ' // ⚠ BREAK', color: '#F43F5E' }]
          : [{ text: '  const', color: '#FF7B72' }, { text: ' data = ', color: '#E6EDF3' }, { text: 'mapPayload', color: '#D2A8FF' }, { text: '(raw);', color: '#E6EDF3' }],
      },
      { num: '7', tokens: [{ text: '  return', color: '#FF7B72' }, { text: ' await crm.', color: '#E6EDF3' }, { text: 'pushRecord', color: '#79C0FF' }, { text: '(data);', color: '#E6EDF3' }] },
      { num: '8', tokens: [{ text: '}', color: '#E6EDF3' }] },
    ];

    let startY = 100;
    lines.forEach((line) => {
      // Line number gutter
      ctx.fillStyle = '#6E7681';
      ctx.font = '600 19px "JetBrains Mono", monospace';
      ctx.textAlign = 'right';
      ctx.fillText(line.num, 48, startY);

      // Code tokens
      ctx.textAlign = 'left';
      let startX = 75;
      line.tokens.forEach((tok) => {
        ctx.fillStyle = tok.color;
        ctx.font = '600 19px "JetBrains Mono", monospace';
        ctx.fillText(tok.text, startX, startY);
        startX += ctx.measureText(tok.text).width;
      });

      startY += 40;
    });

    // Error Tooltip if Broken
    if (isBroken) {
      const errBoxY = 410;
      ctx.fillStyle = 'rgba(63, 8, 12, 0.96)';
      ctx.strokeStyle = '#F43F5E';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect ? ctx.roundRect(48, errBoxY, width - 96, 96, 10) : ctx.fillRect(48, errBoxY, width - 96, 96);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#F43F5E';
      ctx.font = '900 15px "JetBrains Mono", monospace';
      ctx.fillText('⚠ CRITICAL RUNTIME ERROR: ENDPOINT SCHEMA BREAK', 68, errBoxY + 32);

      ctx.fillStyle = '#FCA5A5';
      ctx.font = '600 14px "JetBrains Mono", monospace';
      ctx.fillText('TypeError: Cannot read properties of undefined (reading schema_v1)', 68, errBoxY + 60);
      ctx.fillText('at adapters/legacy_sap_sync.ts:6:22', 68, errBoxY + 82);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    texture.minFilter = THREE.LinearFilter;
    return texture;
  }, [isBroken]);
};
