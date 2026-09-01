import { useMemo } from 'react';
import * as THREE from 'three';

export const useServiceNowIncidentTexture = (isApproved: boolean) => {
  return useMemo(() => {
    const width = 800;
    const height = 460;
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    // Background Card
    ctx.fillStyle = '#0F172A';
    ctx.roundRect ? ctx.roundRect(0, 0, width, height, 12) : ctx.fillRect(0, 0, width, height);
    ctx.fill();

    // ServiceNow Header Bar
    ctx.fillStyle = '#1E293B';
    ctx.beginPath();
    ctx.roundRect ? ctx.roundRect(0, 0, width, 44, [12, 12, 0, 0]) : ctx.fillRect(0, 0, width, 44);
    ctx.fill();

    ctx.fillStyle = '#81B5A1';
    ctx.font = '900 13px "JetBrains Mono", monospace';
    ctx.fillText('SERVICENOW // INCIDENT MANAGEMENT', 20, 28);

    // Incident ID & Priority
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '800 16px "Inter", sans-serif';
    ctx.fillText('INC0094812 — PO-882910 Shipment Delay Escalation', 20, 78);

    // Priority Badge (P1 Critical)
    ctx.fillStyle = 'rgba(244, 63, 94, 0.2)';
    ctx.strokeStyle = '#F43F5E';
    ctx.lineWidth = 1.5;
    ctx.roundRect ? ctx.roundRect(580, 58, 190, 30, 6) : ctx.fillRect(580, 58, 190, 30);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#F43F5E';
    ctx.font = '900 11px "JetBrains Mono", monospace';
    ctx.fillText('PRIORITY: P1 - CRITICAL', 594, 78);

    // AI Generation Banner
    ctx.fillStyle = 'rgba(77, 174, 235, 0.12)';
    ctx.strokeStyle = '#4daeeb';
    ctx.lineWidth = 1;
    ctx.roundRect ? ctx.roundRect(20, 100, 760, 40, 6) : ctx.fillRect(20, 100, 760, 40);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#4daeeb';
    ctx.font = '800 11px "JetBrains Mono", monospace';
    ctx.fillText('⚡ AUTONOMOUSLY DRAFTED BY IBM WATSONX ORCHESTRATE AGENT', 34, 125);

    // Form fields
    ctx.fillStyle = '#94A3B8';
    ctx.font = '600 11px "Inter", sans-serif';
    ctx.fillText('Affected Component: SAP S/4HANA PO_882910', 20, 170);
    ctx.fillText('Impacted Vendor: Global Logistics Inc ($240,000 Order Value)', 20, 192);
    ctx.fillText('Automated Action: Expedite alternate carrier via Workday Procurement', 20, 214);

    // Description Box
    ctx.fillStyle = '#090D16';
    ctx.roundRect ? ctx.roundRect(20, 230, 760, 120, 6) : ctx.fillRect(20, 230, 760, 120);
    ctx.fill();

    ctx.fillStyle = '#E2E8F0';
    ctx.font = '500 12px "Inter", sans-serif';
    ctx.fillText('Agent reasoning summary:', 34, 255);
    ctx.fillStyle = '#94A3B8';
    ctx.fillText('SAP S/4HANA reported a +18-day delay on turbine components required for Q3 plant overhaul.', 34, 280);
    ctx.fillText('Drafted emergency rerouting ticket with supplier tier-2 vendor per MCP policy #402.', 34, 302);
    ctx.fillText('Requires human sign-off before committing database transaction.', 34, 324);

    // Interactive Authorization Button
    const btnBg = isApproved ? '#10B981' : '#0062FF';
    const btnText = isApproved ? '✓ 1-CLICK AUTHORIZED (COMMITTED)' : '⚡ 1-CLICK MANAGER APPROVAL';

    ctx.fillStyle = btnBg;
    ctx.roundRect ? ctx.roundRect(20, 370, 760, 60, 8) : ctx.fillRect(20, 370, 760, 60);
    ctx.fill();

    ctx.fillStyle = '#FFFFFF';
    ctx.font = '900 15px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText(btnText, width / 2, 406);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    texture.minFilter = THREE.LinearFilter;
    return texture;
  }, [isApproved]);
};
