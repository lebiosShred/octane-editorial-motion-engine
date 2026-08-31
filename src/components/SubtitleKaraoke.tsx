import React from 'react';
import { WordTiming } from '../types/motion';

interface SubtitleKaraokeProps {
  words: WordTiming[];
  currentTime: number;
  highlightColor?: string;
  inactiveColor?: string;
}

export const SubtitleKaraoke: React.FC<SubtitleKaraokeProps> = ({
  words,
  currentTime,
  highlightColor = '#38BDF8',
  inactiveColor = '#64748B'
}) => {
  const activeWordIndex = words.findIndex(
    (w) => currentTime >= w.start && currentTime <= w.end
  );

  if (activeWordIndex === -1 && (currentTime <= 0.2 || currentTime >= (words[words.length - 1]?.end || 30) + 1)) {
    return null;
  }

  const startIdx = Math.max(0, activeWordIndex - 2);
  const endIdx = Math.min(words.length, startIdx + 5);
  const visibleWords = words.slice(startIdx, endIdx);

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 44,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000
      }}
    >
      <div
        style={{
          background: 'rgba(15, 23, 42, 0.85)',
          backdropFilter: 'blur(30px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: 30,
          padding: '10px 28px',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          boxShadow: '0 20px 40px rgba(0,0,0,0.6)'
        }}
      >
        {visibleWords.map((w, idx) => {
          const isActive = currentTime >= w.start && currentTime <= w.end;
          return (
            <span
              key={idx}
              style={{
                fontSize: 19,
                fontWeight: isActive ? 700 : 500,
                color: isActive ? highlightColor : inactiveColor,
                letterSpacing: '-0.02em',
                transform: isActive ? 'scale(1.06)' : 'scale(1)',
                display: 'inline-block'
              }}
            >
              {w.word}
            </span>
          );
        })}
      </div>
    </div>
  );
};
