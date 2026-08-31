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
        bottom: 40,
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: 12,
        background: 'rgba(11, 12, 14, 0.92)',
        padding: '12px 28px',
        borderRadius: 28,
        border: '1px solid rgba(255, 255, 255, 0.12)',
        boxShadow: '0 16px 40px rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(10px)',
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
              fontSize: 32,
              fontWeight: isCurrent ? 900 : 500,
              color: isCurrent ? '#FFFFFF' : 'rgba(255, 255, 255, 0.45)',
              textShadow: isCurrent ? '0 0 20px rgba(255, 255, 255, 0.6)' : 'none',
              transform: `scale(${isCurrent ? 1.05 : 1.0})`,
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
