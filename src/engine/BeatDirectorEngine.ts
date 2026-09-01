export interface BeatSpec {
  id: string;
  beatIndex: number;
  startFrame: number;
  endFrame: number;
  durationFrames: number;
  narrationText: string;
  headline: {
    main: string;
    highlight: string;
  };
  camera: {
    position: [number, number, number];
    lookAt: [number, number, number];
    fov: number;
  };
}

export class BeatDirectorEngine {
  public static beats: BeatSpec[] = [
    // Act I: The Enterprise Bottleneck (Beats 1-5 | f0 - f900)
    {
      id: 'beat_01_stall',
      beatIndex: 0,
      startFrame: 0,
      endFrame: 198,
      durationFrames: 198,
      narrationText: 'Most Enterprise AI projects stall for one boring reason,',
      headline: { main: 'Enterprise AI projects stall for', highlight: 'one boring reason...' },
      camera: { position: [0, 1.5, 9], lookAt: [0, 0, 0], fov: 40 },
    },
    {
      id: 'beat_02_six_months',
      beatIndex: 1,
      startFrame: 198,
      endFrame: 444,
      durationFrames: 246,
      narrationText: 'connecting a language model to legacy software takes six months of custom engineering.',
      headline: { main: 'Connecting LLMs to legacy software takes', highlight: '6 months of custom code.' },
      camera: { position: [1.8, 1.2, 7], lookAt: [0.5, 0, 0], fov: 38 },
    },
    {
      id: 'beat_03_glue_code',
      beatIndex: 2,
      startFrame: 444,
      endFrame: 606,
      durationFrames: 162,
      narrationText: 'Every integration requires custom API glue code,',
      headline: { main: 'Every connection requires', highlight: 'custom API glue code.' },
      camera: { position: [-1.5, 0.8, 5.5], lookAt: [-0.8, 0, 0], fov: 34 },
    },
    {
      id: 'beat_04_brittle_auth',
      beatIndex: 3,
      startFrame: 606,
      endFrame: 768,
      durationFrames: 162,
      narrationText: 'brittle authentication handoffs, and manual error routines.',
      headline: { main: 'Brittle auth handoffs and', highlight: 'manual error routines.' },
      camera: { position: [-1.2, 0.4, 4.2], lookAt: [-0.5, 0.1, 0], fov: 32 },
    },
    {
      id: 'beat_05_schema_break',
      beatIndex: 4,
      startFrame: 768,
      endFrame: 930,
      durationFrames: 162,
      narrationText: 'When an endpoint changes, the entire pipeline breaks.',
      headline: { main: 'When an endpoint changes, the', highlight: 'entire pipeline breaks.' },
      camera: { position: [0, 1.8, 8], lookAt: [0, -0.4, 0], fov: 42 },
    },

    // Act II: The Governed Agent Catalog (Beats 6-9 | f930 - f1836)
    {
      id: 'beat_06_ibm_catalog',
      beatIndex: 5,
      startFrame: 930,
      endFrame: 1158,
      durationFrames: 228,
      narrationText: 'IBM solved this with the new watsonx Orchestrate agent catalog.',
      headline: { main: 'IBM watsonx Orchestrate introduces the', highlight: 'Governed Agent Catalog.' },
      camera: { position: [0, 3.5, 8.5], lookAt: [0, 0.5, 0], fov: 38 },
    },
    {
      id: 'beat_07_150_agents',
      beatIndex: 6,
      startFrame: 1158,
      endFrame: 1458,
      durationFrames: 300,
      narrationText: 'It provides a central governed marketplace with over 150 pre-built Enterprise agents and connectors',
      headline: { main: 'Central governed marketplace with', highlight: '150+ pre-built agents.' },
      camera: { position: [2.5, 2.8, 7.5], lookAt: [0, 0.2, 0], fov: 40 },
    },
    {
      id: 'beat_08_brand_sockets',
      beatIndex: 7,
      startFrame: 1458,
      endFrame: 1608,
      durationFrames: 150,
      narrationText: 'for SAP, Salesforce, ServiceNow, and Workday.',
      headline: { main: 'Out-of-the-box native connectors for', highlight: 'SAP, Salesforce & Workday.' },
      camera: { position: [-2.2, 2.2, 6.5], lookAt: [-0.5, 0, 0], fov: 36 },
    },
    {
      id: 'beat_09_mcp_template',
      beatIndex: 8,
      startFrame: 1608,
      endFrame: 1860,
      durationFrames: 252,
      narrationText: 'Instead of writing API wrappers from scratch, you select a pre-verified agent template.',
      headline: { main: 'Select verified templates with', highlight: 'zero custom code.' },
      camera: { position: [0, 1.8, 6.2], lookAt: [0, 0, 0], fov: 35 },
    },

    // Act III: Autonomous Execution & Human Guardrails (Beats 10-14 | f1860 - f2700)
    {
      id: 'beat_10_mcp_connect',
      beatIndex: 9,
      startFrame: 1860,
      endFrame: 2112,
      durationFrames: 252,
      narrationText: 'It connects securely using model context protocol and executes cross-system handoffs',
      headline: { main: 'Secure execution using', highlight: 'Model Context Protocol (MCP).' },
      camera: { position: [-1.8, 2.0, 7.5], lookAt: [0, 0, 0], fov: 38 },
    },
    {
      id: 'beat_11_guardrails',
      beatIndex: 10,
      startFrame: 2112,
      endFrame: 2316,
      durationFrames: 204,
      narrationText: 'with deterministic business rules and human approval checkpoints.',
      headline: { main: 'Deterministic business rules &', highlight: 'human approval checkpoints.' },
      camera: { position: [1.6, 1.5, 6.0], lookAt: [0.8, 0, 0], fov: 34 },
    },
    {
      id: 'beat_12_sap_delay',
      beatIndex: 11,
      startFrame: 2316,
      endFrame: 2424,
      durationFrames: 108,
      narrationText: 'If an order delays in SAP,',
      headline: { main: 'SAP order delay detected &', highlight: 'evaluated in real-time.' },
      camera: { position: [-2.0, 1.2, 5.0], lookAt: [-1.4, 0, 0], fov: 32 },
    },
    {
      id: 'beat_13_servicenow_draft',
      beatIndex: 12,
      startFrame: 2424,
      endFrame: 2610,
      durationFrames: 186,
      narrationText: 'the agent flags the issue and drafts a ticket in ServiceNow',
      headline: { main: 'watsonx agent autonomously drafts', highlight: 'ServiceNow ticket.' },
      camera: { position: [0, 1.4, 5.5], lookAt: [0, 0, 0], fov: 34 },
    },
    {
      id: 'beat_14_manager_signoff',
      beatIndex: 13,
      startFrame: 2610,
      endFrame: 2718,
      durationFrames: 108,
      narrationText: 'for one-click manager sign-off.',
      headline: { main: 'Protected by strict', highlight: '1-click manager authorization.' },
      camera: { position: [1.8, 0.8, 4.5], lookAt: [1.2, 0, 0], fov: 30 },
    },

    // Act IV: Distributed Observability & Velocity Payoff (Beats 15-16 | f2718 - f3407)
    {
      id: 'beat_15_opentelemetry',
      beatIndex: 14,
      startFrame: 2718,
      endFrame: 2994,
      durationFrames: 276,
      narrationText: 'Every step is logged on OpenTelemetry dashboards, giving IT complete visibility.',
      headline: { main: '100% execution spans logged to', highlight: 'OpenTelemetry dashboards.' },
      camera: { position: [-1.2, 1.8, 6.8], lookAt: [0, 0.2, 0], fov: 36 },
    },
    {
      id: 'beat_16_hero_velocity',
      beatIndex: 15,
      startFrame: 2994,
      endFrame: 3407,
      durationFrames: 413,
      narrationText: 'Stop building custom connectors from scratch, deploy production agents in days, not months.',
      headline: { main: 'Deploy production AI agents in', highlight: 'days, not months.' },
      camera: { position: [0, 2.2, 8.8], lookAt: [0, 0, 0], fov: 42 },
    },
  ];

  public static getCurrentBeat(currentFrame: number): BeatSpec {
    for (const beat of BeatDirectorEngine.beats) {
      if (currentFrame >= beat.startFrame && currentFrame < beat.endFrame) {
        return beat;
      }
    }
    return BeatDirectorEngine.beats[BeatDirectorEngine.beats.length - 1];
  }
}
