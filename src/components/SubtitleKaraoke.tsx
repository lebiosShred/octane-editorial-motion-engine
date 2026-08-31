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

  const windowSize = 3;
  const startIndex = Math.max(0, activeIndex - 1);
  const visibleWords = activeIndex >= 0 ? words.slice(startIndex, startIndex + windowSize) : [];

  if (visibleWords.length === 0) return null;

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 48,
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: 10,
        background: 'rgba(11, 12, 14, 0.88)',
        padding: '10px 24px',
        borderRadius: 24,
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 12px 32px rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(8px)',
        zIndex: 100,
        fontFamily: IndustrialTheme.fonts.sans,
        ...IndustrialTheme.typography.antialiased
      }}
    >
      {visibleWords.map((word, idx) => {
        const isCurrent = activeWord && word.start === activeWord.start;
        return (
          <span
            key={idx}
            style={{
              fontSize: 26,
              fontWeight: isCurrent ? 900 : 500,
              color: isCurrent ? '#FFFFFF' : 'rgba(255, 255, 255, 0.45)',
              textShadow: isCurrent ? '0 0 16px rgba(255, 255, 255, 0.5)' : 'none',
              transform: `scale(${isCurrent ? 1.04 : 1.0})`,
              transition: 'all 0.12s ease-out'
            }}
          >
            {word.word}
          </span>
        );
      })}
    </div>
  );
};
