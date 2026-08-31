export interface WordTiming {
  word: string;
  start: number;
  end: number;
  score?: number;
}

export interface VoiceoverData {
  text: string;
  duration: number;
  words: WordTiming[];
}

export interface Waypoint {
  id: string;
  timeStart: number;
  timeEnd: number;
  scale: number;
  panX: number;
  panY: number;
  description?: string;
}
