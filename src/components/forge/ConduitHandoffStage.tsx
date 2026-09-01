import React from 'react';
import { useCurrentFrame } from 'remotion';
import { IndustrialTheme } from '../../types/theme';
import { KineticLaserConduit } from '../spatial/KineticLaserConduit';

export const ConduitHandoffStage: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 50,
        width: 1320,
      }}
    >
      {/* Left: Cross-System Laser Conduit Pipeline */}
      <div
        style={{
          flex: 1.1,
          height: 480,
          background: 'rgba(9, 10, 12, 0.95)',
          border: '1.5px solid rgba(77, 174, 235, 0.35)',
          borderRadius: 24,
          boxShadow: '0 40px 100px rgba(0, 0, 0, 0.9), 0 0 30px rgba(77, 174, 235, 0.12)',
          padding: '30px 34px',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 18, fontWeight: 900, color: '#FFFFFF' }}>
            Multi-Agent Cross-System Pipeline
          </span>
          <span
            style={{
              fontSize: 12,
              fontWeight: 900,
              fontFamily: IndustrialTheme.fonts.mono,
              color: '#4daeeb',
              background: 'rgba(77, 174, 235, 0.15)',
              border: '1.5px solid #4daeeb',
              padding: '4px 10px',
              borderRadius: 6,
            }}
          >
            ACTIVE DISPATCH
          </span>
        </div>

        {/* Conduit SVG Flow */}
        <div style={{ position: 'relative', width: '100%', height: 240 }}>
          <svg width="100%" height="100%" viewBox="0 0 540 220" style={{ overflow: 'visible' }}>
            {/* Conduits */}
            <KineticLaserConduit startX={130} startY={60} endX={270} endY={150} color="#4daeeb" pulseSpeed={7} />
            <KineticLaserConduit startX={270} startY={150} endX={410} endY={60} color="#10B981" pulseSpeed={7} />

            {/* Stage 1: SAP ERP Event */}
            <g transform="translate(40, 30)">
              <rect width="130" height="60" rx="12" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
              <text x="65" y="26" fill="#4daeeb" fontSize="10" fontWeight="900" textAnchor="middle" fontFamily="monospace">1. TRIGGER</text>
              <text x="65" y="46" fill="#FFFFFF" fontSize="12" fontWeight="800" textAnchor="middle" fontFamily="sans-serif">SAP Delay</text>
            </g>

            {/* Stage 2: watsonx Reasoner */}
            <g transform="translate(200, 120)">
              <rect width="140" height="60" rx="12" fill="#0F172A" stroke="#4daeeb" strokeWidth="2" />
              <text x="70" y="26" fill="#4daeeb" fontSize="10" fontWeight="900" textAnchor="middle" fontFamily="monospace">2. ORCHESTRATE</text>
              <text x="70" y="46" fill="#FFFFFF" fontSize="12" fontWeight="800" textAnchor="middle" fontFamily="sans-serif">Draft Ticket</text>
            </g>

            {/* Stage 3: ServiceNow Draft */}
            <g transform="translate(370, 30)">
              <rect width="130" height="60" rx="12" fill="#1E293B" stroke="#10B981" strokeWidth="1.5" />
              <text x="65" y="26" fill="#10B981" fontSize="10" fontWeight="900" textAnchor="middle" fontFamily="monospace">3. DESTINATION</text>
              <text x="65" y="46" fill="#FFFFFF" fontSize="12" fontWeight="800" textAnchor="middle" fontFamily="sans-serif">ServiceNow</text>
            </g>
          </svg>
        </div>

        <div style={{ fontSize: 13, color: '#94A3B8', fontFamily: IndustrialTheme.fonts.mono }}>
          {'> SAP order delay > 14d extracted -> Priority ServiceNow ticket drafted'}
        </div>
      </div>

      {/* Right: Governance Gatekeeper Card */}
      <div
        style={{
          width: 580,
          backgroundColor: '#FFFFFF',
          borderRadius: 24,
          boxShadow: '0 50px 120px -20px rgba(0, 0, 0, 0.95), 0 20px 50px -10px rgba(0, 0, 0, 0.6)',
          border: '2px solid #4daeeb',
          padding: '38px 42px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <span style={{ fontSize: 20, fontWeight: 900, color: '#090A0C' }}>
            Human Sign-Off Gate
          </span>
          <span
            style={{
              fontSize: 12,
              fontWeight: 900,
              fontFamily: IndustrialTheme.fonts.mono,
              color: '#10B981',
              background: 'rgba(16, 185, 129, 0.12)',
              border: '1.5px solid #10B981',
              padding: '4px 10px',
              borderRadius: 6,
            }}
          >
            STRICT GUARDRAIL
          </span>
        </div>

        <div style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#64748B', fontWeight: 800, marginBottom: 8, fontFamily: IndustrialTheme.fonts.mono }}>
          Authorization Policy
        </div>

        <div style={{ fontSize: 38, fontWeight: 900, color: '#090A0C', lineHeight: 1.1 }}>
          1-Click Manager Approval
        </div>

        <div style={{ marginTop: 18, background: '#F8FAFC', padding: '16px 20px', borderRadius: 14, border: '1px solid rgba(0,0,0,0.06)' }}>
          <div style={{ fontSize: 13, color: '#475569', fontWeight: 800, textTransform: 'uppercase' }}>Security Guarantee</div>
          <div style={{ fontSize: 16, fontWeight: 900, color: '#10B981', marginTop: 4 }}>
            Zero Unverified Database Mutations
          </div>
        </div>

        <div style={{ marginTop: 14, fontSize: 13, color: '#64748B', fontFamily: IndustrialTheme.fonts.mono }}>
          Enforces company spending limits and role-based policies.
        </div>
      </div>
    </div>
  );
};
