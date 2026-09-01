import { useMemo } from 'react';
import * as THREE from 'three';

export const useTerminalEditorTexture = (isBroken: boolean) => {
  return useMemo(() => {
    const width = 1024;
    const height = 540;
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    // Background
    ctx.fillStyle = '#0D1117';
    ctx.roundRect ? ctx.roundRect(0, 0, width, height, 16) : ctx.fillRect(0, 0, width, height);
    ctx.fill();

    // Window Header Bar
    ctx.fillStyle = '#161B22';
    ctx.beginPath();
    ctx.roundRect ? ctx.roundRect(0, 0, width, 48, [16, 16, 0, 0]) : ctx.fillRect(0, 0, width, 48);
    ctx.fill();

    // macOS Window Controls
    const dots = [
      { color: '#FF5F56', x: 28 },
      { color: '#FFBD2E', x: 50 },
      { color: '#27C93F', x: 72 },
    ];
    dots.forEach((dot) => {
      ctx.fillStyle = dot.color;
      ctx.beginPath();
      ctx.arc(dot.x, 24, 7, 0, Math.PI * 2);
      ctx.fill();
    });

    // File Tab
    ctx.fillStyle = '#0D1117';
    ctx.roundRect ? ctx.roundRect(110, 8, 260, 40, [8, 8, 0, 0]) : ctx.fillRect(110, 8, 260, 40);
    ctx.fill();

    ctx.fillStyle = '#4daeeb';
    ctx.font = '900 13px "JetBrains Mono", monospace';
    ctx.fillText('TS', 126, 32);

    ctx.fillStyle = '#E6EDF3';
    ctx.font = '700 13px "JetBrains Mono", monospace';
    ctx.fillText('adapters/legacy_sap_sync.ts', 152, 32);

    // Code lines
    const lines = [
      { num: '1', tokens: [{ text: 'import', color: '#FF7B72' }, { text: ' { SapClient } ', color: '#E6EDF3' }, { text: 'from', color: '#FF7B72' }, { text: " '@legacy/sap-erp';", color: '#A5D6FF' }] },
      { num: '2', tokens: [{ text: 'import', color: '#FF7B72' }, { text: ' { mapPayload } ', color: '#E6EDF3' }, { text: 'from', color: '#FF7B72' }, { text: " './custom_mapper';", color: '#A5D6FF' }] },
      { num: '3', tokens: [{ text: '', color: '#E6EDF3' }] },
      { num: '4', tokens: [{ text: 'export async function', color: '#FF7B72' }, { text: ' syncPurchaseOrder', color: '#D2A8FF' }, { text: '(poId: string) {', color: '#E6EDF3' }] },
      { num: '5', tokens: [{ text: '  const', color: '#FF7B72' }, { text: ' raw = await SapClient.', color: '#E6EDF3' }, { text: 'getRawOrder', color: '#79C0FF' }, { text: '(poId);', color: '#E6EDF3' }] },
      {
        num: '6',
        tokens: isBroken
          ? [{ text: '  const', color: '#FF7B72' }, { text: ' data = ', color: '#E6EDF3' }, { text: 'raw.schema_v1.items;', color: '#FF7B72' }, { text: ' // ⚠ BREAK', color: '#F43F5E' }]
          : [{ text: '  const', color: '#FF7B72' }, { text: ' data = ', color: '#E6EDF3' }, { text: 'mapPayload', color: '#D2A8FF' }, { text: '(raw);', color: '#E6EDF3' }],
      },
      { num: '7', tokens: [{ text: '  return', color: '#FF7B72' }, { text: ' await crmService.', color: '#E6EDF3' }, { text: 'pushRecord', color: '#79C0FF' }, { text: '(data);', color: '#E6EDF3' }] },
      { num: '8', tokens: [{ text: '}', color: '#E6EDF3' }] },
    ];

    let startY = 86;
    lines.forEach((line) => {
      // Line number gutter
      ctx.fillStyle = '#484F58';
      ctx.font = '600 15px "JetBrains Mono", monospace';
      ctx.textAlign = 'right';
      ctx.fillText(line.num, 44, startY);

      // Code tokens
      ctx.textAlign = 'left';
      let startX = 68;
      line.tokens.forEach((tok) => {
        ctx.fillStyle = tok.color;
        ctx.font = '600 15px "JetBrains Mono", monospace';
        ctx.fillText(tok.text, startX, startY);
        startX += ctx.measureText(tok.text).width;
      });

      startY += 34;
    });

    // Error Tooltip if Broken
    if (isBroken) {
      const errBoxY = 360;
      ctx.fillStyle = 'rgba(63, 8, 12, 0.95)';
      ctx.strokeStyle = '#F43F5E';
      ctx.lineWidth = 2;
      ctx.roundRect ? ctx.roundRect(68, errBoxY, 520, 90, 8) : ctx.fillRect(68, errBoxY, 520, 90);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#F43F5E';
      ctx.font = '900 13px "JetBrains Mono", monospace';
      ctx.fillText('⚠ RUNTIME ERROR (ENDPOINT SCHEMA BREAK)', 86, errBoxY + 30);

      ctx.fillStyle = '#FCA5A5';
      ctx.font = '600 12px "JetBrains Mono", monospace';
      ctx.fillText('TypeError: Cannot read properties of undefined (reading schema_v1)', 86, errBoxY + 56);
      ctx.fillText('at adapters/legacy_sap_sync.ts:6:22', 86, errBoxY + 74);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    texture.minFilter = THREE.LinearFilter;
    return texture;
  }, [isBroken]);
};
