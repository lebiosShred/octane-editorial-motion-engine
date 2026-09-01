import React from 'react';
import { WordSegment } from '../../types';

interface SubtitleKaraokeProps {
  words: WordSegment[];
  currentTime: number;
  visible?: boolean;
}

export const SubtitleKaraoke: React.FC<SubtitleKaraokeProps> = ({
  words,
  currentTime,
  visible = true,
}) => {
  if (!visible) return null;

  const activeWords = words.filter(
    (w) => currentTime >= w.start && currentTime <= w.end + 0.3
  );

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 36,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        padding: '0 80px',
        zIndex: 90,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          background: 'rgba(9, 10, 12, 0.92)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          color: '#FFFFFF',
          padding: '10px 24px',
          borderRadius: 12,
          fontSize: 18,
          fontWeight: 700,
          maxWidth: 1000,
          textAlign: 'center',
          boxShadow: '0 20px 40px rgba(0,0,0,0.85)',
          letterSpacing: '-0.01em',
        }}
      >
        {activeWords.length > 0 ? (
          activeWords.map((w, idx) => (
            <span key={idx} style={{ color: '#FFFFFF', margin: '0 4px' }}>
              {w.word}
            </span>
          ))
        ) : (
          <span style={{ color: '#94A3B8' }}>IBM watsonx Orchestrate</span>
        )}
      </div>
    </div>
  );
};
