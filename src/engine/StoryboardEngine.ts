export interface SceneDefinition {
  id: string;
  startSec: number;
  endSec: number;
  clusterIndex: number;
  cameraPanX: number;
  cameraPanY: number;
  cameraScale: number;
}

export class StoryboardEngine {
  public static defaultScenes: SceneDefinition[] = [
    { id: 'stall', startSec: 0, endSec: 10.0, clusterIndex: 1, cameraPanX: 1550, cameraPanY: 0, cameraScale: 1.0 },
    { id: 'multiplier', startSec: 10.0, endSec: 19.5, clusterIndex: 2, cameraPanX: 0, cameraPanY: 0, cameraScale: 1.0 },
    { id: 'remediation', startSec: 19.5, endSec: 28.2, clusterIndex: 3, cameraPanX: -1550, cameraPanY: 0, cameraScale: 1.0 },
    { id: 'outro', startSec: 28.2, endSec: 40.0, clusterIndex: 3, cameraPanX: -1550, cameraPanY: 0, cameraScale: 0.95 }
  ];

  public static getActiveScene(currentTime: number, scenes = StoryboardEngine.defaultScenes): SceneDefinition {
    const found = scenes.find(s => currentTime >= s.startSec && currentTime < s.endSec);
    return found || scenes[scenes.length - 1];
  }
}
