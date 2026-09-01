import { useMemo } from 'react';
import * as THREE from 'three';

export const useOpenTelemetryWaterfallTexture = (progress: number) => {
  return useMemo(() => {
    const width = 900;
    const height = 500;
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    // Background
    ctx.fillStyle = '#0B0F19';
    ctx.roundRect ? ctx.roundRect(0, 0, width, height, 12) : ctx.fillRect(0, 0, width, height);
    ctx.fill();

    // Jaeger / OTel Header Bar
    ctx.fillStyle = '#161F30';
    ctx.beginPath();
    ctx.roundRect ? ctx.roundRect(0, 0, width, 50, [12, 12, 0, 0]) : ctx.fillRect(0, 0, width, 50);
    ctx.fill();

    ctx.fillStyle = '#4daeeb';
    ctx.font = '900 13px "JetBrains Mono", monospace';
    ctx.fillText('OPENTELEMETRY // DISTRIBUTED TRACE EXPLORER', 20, 31);

    ctx.fillStyle = '#94A3B8';
    ctx.font = '700 11px "JetBrains Mono", monospace';
    ctx.fillText('Trace ID: 4bf92f3577b34da6 | 14 Spans | Total: 216ms | Status: 200 OK', 420, 31);

    // Timeline Bar Grid
    ctx.fillStyle = '#1E293B';
    ctx.fillRect(0, 50, width, 24);
    ctx.fillStyle = '#64748B';
    ctx.font = '600 10px "JetBrains Mono", monospace';
    ctx.fillText('0ms', 400, 66);
    ctx.fillText('50ms', 500, 66);
    ctx.fillText('100ms', 600, 66);
    ctx.fillText('150ms', 700, 66);
    ctx.fillText('200ms', 800, 66);

    // Span Rows
    const spans = [
      { name: 'watsonx.orchestrate.session', service: 'orchestrator-core', status: '200', startMs: 400, widthMs: 440, color: '#4daeeb', dur: '216ms', indent: 20 },
      { name: 'sap.s4hana.get_po_details', service: 'sap-mcp-agent', status: '200', startMs: 420, widthMs: 120, color: '#0070F2', dur: '24ms', indent: 40 },
      { name: 'watsonx.ai.reasoning_pipeline', service: 'watsonx-llm', status: '200', startMs: 540, widthMs: 240, color: '#7C3AED', dur: '142ms', indent: 40 },
      { name: 'servicenow.incident.draft', service: 'snow-connector', status: '201', startMs: 720, widthMs: 90, color: '#10B981', dur: '38ms', indent: 60 },
      { name: 'governance.audit_log.commit', service: 'audit-engine', status: '200', startMs: 800, widthMs: 40, color: '#F59E0B', dur: '12ms', indent: 40 },
    ];

    let rowY = 86;
    spans.forEach((s) => {
      // Row Background
      ctx.fillStyle = rowY % 2 === 0 ? '#0D1322' : '#0B0F19';
      ctx.fillRect(0, rowY, width, 68);

      // Hierarchy Line
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(s.indent - 8, rowY + 10);
      ctx.lineTo(s.indent - 8, rowY + 34);
      ctx.lineTo(s.indent, rowY + 34);
      ctx.stroke();

      // Span Name & Service
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '700 13px "JetBrains Mono", monospace';
      ctx.fillText(s.name, s.indent + 6, rowY + 28);

      ctx.fillStyle = '#94A3B8';
      ctx.font = '500 10px "Inter", sans-serif';
      ctx.fillText(`svc: ${s.service}`, s.indent + 6, rowY + 48);

      // HTTP Status Pill
      ctx.fillStyle = 'rgba(16, 185, 129, 0.18)';
      ctx.roundRect ? ctx.roundRect(310, rowY + 16, 54, 22, 4) : ctx.fillRect(310, rowY + 16, 54, 22);
      ctx.fill();
      ctx.fillStyle = '#10B981';
      ctx.font = '800 10px "JetBrains Mono", monospace';
      ctx.fillText(s.status, 324, rowY + 31);

      // Waterfall Duration Bar (animated by progress)
      const animatedWidth = Math.max(10, s.widthMs * Math.min(1, progress * 1.4));
      ctx.fillStyle = s.color;
      ctx.roundRect ? ctx.roundRect(s.startMs, rowY + 20, animatedWidth, 20, 4) : ctx.fillRect(s.startMs, rowY + 20, animatedWidth, 20);
      ctx.fill();

      // Duration Label
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '800 10px "JetBrains Mono", monospace';
      ctx.fillText(s.dur, s.startMs + animatedWidth + 8, rowY + 34);

      rowY += 72;
    });

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    texture.minFilter = THREE.LinearFilter;
    return texture;
  }, [progress]);
};
