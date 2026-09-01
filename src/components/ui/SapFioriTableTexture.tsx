import { useMemo } from 'react';
import * as THREE from 'three';

export const useSapFioriTableTexture = () => {
  return useMemo(() => {
    const width = 800;
    const height = 460;
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    // Background Card
    ctx.fillStyle = '#0B111E';
    ctx.roundRect ? ctx.roundRect(0, 0, width, height, 12) : ctx.fillRect(0, 0, width, height);
    ctx.fill();

    // SAP Header Bar
    ctx.fillStyle = '#003865';
    ctx.beginPath();
    ctx.roundRect ? ctx.roundRect(0, 0, width, 44, [12, 12, 0, 0]) : ctx.fillRect(0, 0, width, 44);
    ctx.fill();

    ctx.fillStyle = '#FFFFFF';
    ctx.font = '900 14px "Inter", sans-serif';
    ctx.fillText('SAP S/4HANA — Purchase Order Management [ME23N]', 20, 28);

    // Filter bar
    ctx.fillStyle = '#111827';
    ctx.fillRect(0, 44, width, 36);
    ctx.fillStyle = '#94A3B8';
    ctx.font = '600 11px "Inter", sans-serif';
    ctx.fillText('Filter: Status = Open / In Progress | Plant = 1000', 20, 66);

    // Table Header
    ctx.fillStyle = '#1E293B';
    ctx.fillRect(0, 80, width, 36);

    const cols = [
      { name: 'PO NUMBER', x: 20 },
      { name: 'VENDOR', x: 140 },
      { name: 'MATERIAL / ITEM', x: 300 },
      { name: 'DELIVERY STATUS', x: 500 },
      { name: 'NET VALUE', x: 680 },
    ];

    ctx.fillStyle = '#CBD5E1';
    ctx.font = '800 11px "JetBrains Mono", monospace';
    cols.forEach((col) => {
      ctx.fillText(col.name, col.x, 102);
    });

    // Rows
    const rows = [
      { po: 'PO-771829', vendor: 'Acme Metalworks', item: 'Titanium Bolts', status: 'ON TRACK', statColor: '#10B981', val: '$34,200', bg: '#0B111E' },
      { po: 'PO-882910', vendor: 'Global Logistics Inc', item: 'Industrial Turbines', status: 'DELAYED (+18d)', statColor: '#F59E0B', val: '$240,000', bg: 'rgba(245, 158, 11, 0.12)', border: '#F59E0B' },
      { po: 'PO-991204', vendor: 'Siemens Precision', item: 'Hydraulic Valves', status: 'IN TRANSIT', statColor: '#4daeeb', val: '$88,400', bg: '#0B111E' },
      { po: 'PO-104928', vendor: 'Nordic Sensors', item: 'Thermal Probes', status: 'ON TRACK', statColor: '#10B981', val: '$19,800', bg: '#0B111E' },
    ];

    let rowY = 116;
    rows.forEach((r) => {
      ctx.fillStyle = r.bg;
      ctx.fillRect(0, rowY, width, 48);

      if (r.border) {
        ctx.strokeStyle = r.border;
        ctx.lineWidth = 1.5;
        ctx.strokeRect(2, rowY + 1, width - 4, 46);
      }

      ctx.fillStyle = '#FFFFFF';
      ctx.font = '700 12px "JetBrains Mono", monospace';
      ctx.fillText(r.po, 20, rowY + 28);

      ctx.fillStyle = '#E2E8F0';
      ctx.font = '600 12px "Inter", sans-serif';
      ctx.fillText(r.vendor, 140, rowY + 28);
      ctx.fillText(r.item, 300, rowY + 28);

      // Status Pill
      ctx.fillStyle = r.statColor;
      ctx.font = '800 11px "JetBrains Mono", monospace';
      ctx.fillText(r.status, 500, rowY + 28);

      ctx.fillStyle = '#FFFFFF';
      ctx.font = '800 12px "JetBrains Mono", monospace';
      ctx.fillText(r.val, 680, rowY + 28);

      rowY += 48;
    });

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    texture.minFilter = THREE.LinearFilter;
    return texture;
  }, []);
};
