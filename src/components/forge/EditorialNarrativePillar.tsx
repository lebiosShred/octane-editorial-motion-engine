import React from 'react';
import { useCurrentFrame } from 'remotion';
import { WordTiming } from '../../types/motion';
import { IndustrialTheme } from '../../types/theme';

interface EditorialNarrativePillarProps {
  words: WordTiming[];
  currentTime: number;
}

export const EditorialNarrativePillar: React.FC<EditorialNarrativePillarProps> = ({
  words,
  currentTime
}) => {
  const frame = useCurrentFrame();

  // Find active word and sentence window
  const activeWord = words.find(w => currentTime >= w.start && currentTime <= w.end);
  const activeIndex = words.findIndex(w => currentTime >= w.start && currentTime <= w.end);

  const windowSize = 5;
  const startIndex = Math.max(0, activeIndex - 1);
  const visibleWords = activeIndex >= 0 ? words.slice(startIndex, startIndex + windowSize) : [];

  // 4-Stage Chapter Definition
  const chapters = [
    { num: '01', title: 'Latency Bottleneck', start: 0, end: 10.0, tone: 'amber' },
    { num: '02', title: 'Cartesian Multiplier', start: 10.0, end: 19.5, tone: 'crimson' },
    { num: '03', title: 'Targeted Remediation', start: 19.5, end: 28.2, tone: 'mint' },
    { num: '04', title: 'FP&A Architecture', start: 28.2, end: 40.0, tone: 'mint' }
  ];

  const activeChapterIndex = chapters.findIndex(c => currentTime >= c.start && currentTime < c.end);

  // Acoustic Equalizer Pulse simulation
  const audioBars = React.useMemo(() => {
    return Array.from({ length: 18 }).map((_, i) => ({
      freq: 0.15 + (i * 0.08),
      minH: 4,
      maxH: 26
    }));
  }, []);

  return (
    <div
      style={{
        position: 'absolute',
        left: 44,
        top: 44,
        bottom: 44,
        width: 440,
        backgroundColor: 'rgba(15, 23, 42, 0.94)',
        borderRadius: 24,
        border: '1px solid rgba(255, 255, 255, 0.12)',
        boxShadow: '0 24px 48px rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(20px)',
        padding: '32px 28px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        zIndex: 50,
        fontFamily: IndustrialTheme.fonts.sans,
        ...IndustrialTheme.typography.antialiased,
        overflow: 'hidden'
      }}
    >
      {/* ── TOP SECTION: BRAND & TELEMETRY BEACON ── */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                backgroundColor: IndustrialTheme.signals.mint,
                boxShadow: `0 0 10px ${IndustrialTheme.signals.mint}`
              }}
            />
            <span
              style={{
                fontSize: 13,
                fontWeight: 900,
                fontFamily: IndustrialTheme.fonts.mono,
                letterSpacing: '0.12em',
                color: '#94A3B8',
                textTransform: 'uppercase'
              }}
            >
              TM1 Telemetry Stream
            </span>
          </div>

          <span
            style={{
              fontSize: 11,
              fontWeight: 800,
              fontFamily: IndustrialTheme.fonts.mono,
              color: IndustrialTheme.signals.mint,
              background: IndustrialTheme.signals.mintBg,
              border: `1px solid ${IndustrialTheme.signals.mintBorder}`,
              padding: '2px 8px',
              borderRadius: 4,
              textTransform: 'uppercase'
            }}
          >
            LIVE
          </span>
        </div>

        {/* ── CHAPTER PROGRESS PIPELINE ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
          {chapters.map((ch, idx) => {
            const isActive = idx === activeChapterIndex;
            const isPast = idx < activeChapterIndex;
            const toneColor = ch.tone === 'crimson' ? IndustrialTheme.signals.crimson : ch.tone === 'amber' ? IndustrialTheme.signals.amber : IndustrialTheme.signals.mint;

            return (
              <div
                key={ch.num}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '10px 14px',
                  borderRadius: 10,
                  backgroundColor: isActive ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
                  border: isActive ? `1px solid rgba(255, 255, 255, 0.16)` : '1px solid transparent',
                  transition: 'all 0.3s ease'
                }}
              >
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 900,
                    fontFamily: IndustrialTheme.fonts.mono,
                    color: isActive ? toneColor : isPast ? '#64748B' : '#475569',
                    width: 24
                  }}
                >
                  {ch.num}
                </span>

                <span
                  style={{
                    fontSize: 14,
                    fontWeight: isActive ? 800 : 600,
                    color: isActive ? '#FFFFFF' : isPast ? '#94A3B8' : '#64748B',
                    flex: 1
                  }}
                >
                  {ch.title}
                </span>

                {isActive && (
                  <div
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      backgroundColor: toneColor,
                      boxShadow: `0 0 8px ${toneColor}`
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── MIDDLE SECTION: HERO KINETIC SENTENCE STREAM ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', margin: '14px 0' }}>
        <div style={{ fontSize: 11, fontWeight: 800, fontFamily: IndustrialTheme.fonts.mono, color: '#64748B', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>
          Executive Narrative
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 10px', minHeight: 120, alignItems: 'flex-start' }}>
          {visibleWords.map((word, idx) => {
            const isCurrent = activeWord && word.start === activeWord.start;
            return (
              <span
                key={idx}
                style={{
                  fontSize: 26,
                  fontWeight: isCurrent ? 900 : 600,
                  color: isCurrent ? '#FFFFFF' : 'rgba(255, 255, 255, 0.35)',
                  textShadow: isCurrent ? '0 0 20px rgba(255, 255, 255, 0.8), 0 0 36px rgba(56, 189, 248, 0.4)' : 'none',
                  transform: `scale(${isCurrent ? 1.06 : 1.0})`,
                  transition: 'all 0.12s ease-out',
                  lineHeight: 1.2
                }}
              >
                {word.word}
              </span>
            );
          })}
        </div>
      </div>

      {/* ── BOTTOM SECTION: ACOUSTIC AUDIO WAVEFORM ── */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <span style={{ fontSize: 11, fontWeight: 800, fontFamily: IndustrialTheme.fonts.mono, color: '#64748B', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Acoustic Signal
          </span>
          <span style={{ fontSize: 11, fontWeight: 700, fontFamily: IndustrialTheme.fonts.mono, color: '#94A3B8' }}>
            24.0 kHz
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 5, height: 28, background: 'rgba(0, 0, 0, 0.3)', padding: '4px 8px', borderRadius: 8 }}>
          {audioBars.map((bar, idx) => {
            const isSpeaking = activeWord !== undefined;
            const wave = isSpeaking ? Math.abs(Math.sin((frame * bar.freq) + idx)) : 0.1;
            const barHeight = bar.minH + wave * (bar.maxH - bar.minH);

            return (
              <div
                key={idx}
                style={{
                  flex: 1,
                  height: barHeight,
                  backgroundColor: isSpeaking ? IndustrialTheme.signals.mint : '#334155',
                  borderRadius: 2,
                  boxShadow: isSpeaking ? `0 0 6px ${IndustrialTheme.signals.mint}60` : 'none',
                  transition: 'height 0.05s ease'
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
