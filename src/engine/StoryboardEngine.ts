import { CameraWaypoint } from './AssetLifecycleEngine';

export interface SceneClusterSpec {
  id: string;
  clusterIndex: number;
  startSec: number;
  endSec: number;
  waypoint: CameraWaypoint;
  headline: {
    text: string;
    highlight: string;
  };
  subline: string;
}

export class StoryboardEngine {
  public static getScenes(): SceneClusterSpec[] {
    return StoryboardEngine.watsonxScenes;
  }

  public static watsonxScenes: SceneClusterSpec[] = [
    {
      id: 'bottleneck',
      clusterIndex: 0,
      startSec: 0,
      endSec: 12.0,
      waypoint: { frame: 0, scale: 1.0, panX: 0, panY: 0, activeClusterIndex: 0, description: 'Fragile API Mesh' },
      headline: {
        text: 'When connecting enterprise AI takes',
        highlight: '6 months of custom glue code...',
      },
      subline: 'Custom API scripts break the instant upstream ERP or CRM schemas mutate.',
    },
    {
      id: 'catalog',
      clusterIndex: 1,
      startSec: 12.0,
      endSec: 27.0,
      waypoint: { frame: 720, scale: 1.0, panX: -2400, panY: 0, activeClusterIndex: 1, description: 'Agent Catalog Core' },
      headline: {
        text: 'watsonx Orchestrate replaces custom APIs with a',
        highlight: 'Governed Agent Catalog.',
      },
      subline: '150+ pre-built MCP connectors for SAP, Salesforce, ServiceNow, and Workday.',
    },
    {
      id: 'workflow',
      clusterIndex: 2,
      startSec: 27.0,
      endSec: 43.0,
      waypoint: { frame: 1620, scale: 1.0, panX: -4800, panY: 0, activeClusterIndex: 2, description: 'Autonomous Governance' },
      headline: {
        text: 'Autonomous handoffs with strict',
        highlight: '1-click manager approval checkpoints.',
      },
      subline: 'Cross-system automation bounded by deterministic human-in-the-loop safety rails.',
    },
    {
      id: 'observability',
      clusterIndex: 3,
      startSec: 43.0,
      endSec: 56.83,
      waypoint: { frame: 2580, scale: 1.0, panX: -7200, panY: 0, activeClusterIndex: 3, description: 'Trace Observability' },
      headline: {
        text: 'Deploy production AI agents in',
        highlight: 'days, not months.',
      },
      subline: '100% OpenTelemetry execution span logging with verified audit compliance.',
    },
  ];

  public static getActiveCluster(currentTime: number, scenes = StoryboardEngine.watsonxScenes): SceneClusterSpec {
    const found = scenes.find((s) => currentTime >= s.startSec && currentTime < s.endSec);
    return found || scenes[scenes.length - 1];
  }
}
