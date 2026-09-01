import voiceoverData from '../../public/voiceover.json';

export interface WordSegment {
  word: string;
  start: number;
  end: number;
  score?: number;
}

const segments: WordSegment[] = voiceoverData.word_segments || [];

/**
 * Clean a word for robust matching: lowercase, strip punctuation and trailing dashes.
 */
function cleanWord(w: string): string {
  return w
    .toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
    .trim();
}

/**
 * Returns the exact frame number (at given fps) when a specific word is spoken.
 * @param targetWord The keyword to find in the voiceover transcript.
 * @param occurrence Which occurrence of the word to match (0-indexed, default: 0).
 * @param fps Video frame rate (default: 60).
 */
export function getWordFrame(targetWord: string, occurrence = 0, fps = 60): number {
  const target = cleanWord(targetWord);
  let count = 0;

  for (const seg of segments) {
    if (cleanWord(seg.word) === target) {
      if (count === occurrence) {
        return Math.round(seg.start * fps);
      }
      count++;
    }
  }

  // Fallback if word not found
  console.warn(`[TranscriptController] Word "${targetWord}" (occurrence ${occurrence}) not found in transcript.`);
  return 0;
}

/**
 * Returns the exact start and end frame window for a phrase or word.
 */
export function getWordFrameRange(
  targetWord: string,
  occurrence = 0,
  fps = 60
): { startFrame: number; endFrame: number; durationFrames: number } {
  const target = cleanWord(targetWord);
  let count = 0;

  for (const seg of segments) {
    if (cleanWord(seg.word) === target) {
      if (count === occurrence) {
        const startFrame = Math.round(seg.start * fps);
        const endFrame = Math.round(seg.end * fps);
        return {
          startFrame,
          endFrame,
          durationFrames: Math.max(1, endFrame - startFrame),
        };
      }
      count++;
    }
  }

  return { startFrame: 0, endFrame: 60, durationFrames: 60 };
}

/**
 * Key milestones pre-calculated from voiceover.json at 60 FPS:
 */
export const MILESTONES = {
  HOOK_SIX: getWordFrame('six', 0), // "takes SIX months" ~ f336
  MONTHS_GLUE: getWordFrame('months', 0), // "months" ~ f355
  CUSTOM_API: getWordFrame('requires', 0), // "requires custom API" ~ f485
  PIPELINE_BREAKS: getWordFrame('breaks', 0), // "entire pipeline BREAKS" ~ f883
  IBM_SOLVED: getWordFrame('solved', 0), // "IBM SOLVED this" ~ f948
  ORCHESTRATE_CATALOG: getWordFrame('catalog', 0), // "agent CATALOG" ~ f1094
  PREBUILT_150: getWordFrame('150', 0), // "over 150 pre-built" ~ f1310
  BRAND_SAP: getWordFrame('SAP', 0), // "for SAP" ~ f1462
  BRAND_SALESFORCE: getWordFrame('Salesforce', 0), // "Salesforce" ~ f1513
  BRAND_SERVICENOW: getWordFrame('ServiceNow', 0), // "ServiceNow" ~ f1537
  BRAND_WORKDAY: getWordFrame('Workday', 0), // "and Workday" ~ f1566
  ONE_CLICK_APPROVAL: getWordFrame('click', 0), // "one-CLICK" ~ f2629
  ELEVEN_POINT_TWO: getWordFrame('eleven', 0) || 2700, // 11.2x velocity milestone
  DEPLOY_IN_DAYS: getWordFrame('days', 0) || 2900, // "deploy in DAYS"
  OUTRO_WATSONX: getWordFrame('watsonx', 0) || 3100, // "watsonx Orchestrate"
};
