export interface WordSegment {
  word: string;
  start: number;
  end: number;
  score?: number;
}

export interface VoiceoverData {
  word_segments: WordSegment[];
  language?: string;
}

export interface WatsonxVideoProps {
  primaryColor?: string;
  accentColor?: string;
  textColor?: string;
  backgroundColor?: string;
}
