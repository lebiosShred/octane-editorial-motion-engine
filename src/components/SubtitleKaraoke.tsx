import React from 'react';
import { WordTiming } from '../types/motion';
import { IndustrialTheme } from '../types/theme';

interface SubtitleKaraokeProps {
  words: WordTiming[];
  currentTime: number;
}

export const SubtitleKaraoke: React.FC<SubtitleKaraokeProps> = ({ words, currentTime }) => {
  const activeWord = words.find(w => currentTime >= w.start && currentTime <= w.end);
  const activeIndex = words.findIndex(w => currentTime >= w.start && currentTime <= w.end);

  const windowSize = 4;
  const startIndex = Math.max(0, activeIndex - 1);
  const visibleWords = activeIndex >= 0 ? words.slice(startIndex, startIndex + windowSize) : [];

  // Dynamic Scene Telemetry Chapter Header
  let chapterTag = '[ SCENE 01 // SYSTEM BOTTLENECK ]';
  let chapterTone: 'amber' | 'crimson' | 'mint' = 'amber';

  if (currentTime >= 10.0 && currentTime < 19.5) {
    chapterTag = '[ SCENE 02 // CARTESIAN MULTIPLIER ]';
    chapterTone = 'crimson';
  } else if (currentTime >= 19.5 && currentTime < 28.2) {
    chapterTag = '[ SCENE 03 // TARGETED REMEDIATION ]';
    chapterTone = 'mint';
  } else if (currentTime >= 28.2) {
    chapterTag = '[ SCENE 04 // FP&A CRAFTSMANSHIP ]';
    chapterTone = 'mint';
  }

  const toneColors = {
    amber: { bg: IndustrialTheme.signals.amberBg, text: IndustrialTheme.signals.amber, border: IndustrialTheme.signals.amberBorder },
    crimson: { bg: IndustrialTheme.signals.crimsonBg, text: IndustrialTheme.signals.crimson, border: IndustrialTheme.signals.crimsonBorder },
    mint: { bg: IndustrialTheme.signals.mintBg, text: IndustrialTheme.signals.mint, border: IndustrialTheme.signals.mintBorder }
  }[chapterTone];

  if (visibleWords.length === 0) return null;

  return (
    <div
      style={{
        position: 'absolute',
        top: 28,
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        background: 'rgba(15, 23, 42, 0.88)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        borderRadius: 20,
        padding: '8px 22px',
        boxShadow: '0 16px 36px rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(12px)',
        zIndex: 100,
        fontFamily: IndustrialTheme.fonts.sans,
        ...IndustrialTheme.typography.antialiased
      }}
    >
      {/* Live Chapter Telemetry Tag */}
      <span
        style={{
          fontSize: 11,
          fontWeight: 900,
          fontFamily: IndustrialTheme.fonts.mono,
          color: toneColors.text,
          background: toneColors.bg,
          border: `1px solid ${toneColors.border}`,
          padding: '3px 8px',
          borderRadius: 5,
          letterSpacing: '0.08em',
          whiteSpace: 'nowrap',
          textTransform: 'uppercase'
        }}
      >
        {chapterTag}
      </span>

      {/* Synchronized Karaoke Word Sequence */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {visibleWords.map((word, idx) => {
          const isCurrent = activeWord && word.start === activeWord.start;
          return (
            <span
              key={idx}
              style={{
                fontSize: 20,
                fontWeight: isCurrent ? 900 : 500,
                color: isCurrent ? '#FFFFFF' : 'rgba(255, 255, 255, 0.4)',
                textShadow: isCurrent ? '0 0 16px rgba(255, 255, 255, 0.7)' : 'none',
                transform: `scale(${isCurrent ? 1.05 : 1.0})`,
                transition: 'all 0.1s ease-out'
              }}
            >
              {word.word}
            </span>
          );
        })}
      </div>
    </div>
  );
};
