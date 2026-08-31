import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { IndustrialTheme } from '../../types/theme';

interface CountUpNumberProps {
  startValue: number;
  endValue: number;
  startSec: number;
  endSec: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  fontSize?: number;
  color?: string;
  fontWeight?: number;
}

export const CountUpNumber: React.FC<CountUpNumberProps> = ({
  startValue,
  endValue,
  startSec,
  endSec,
  decimals = 1,
  prefix = '',
  suffix = '',
  fontSize = 36,
  color = IndustrialTheme.text.hero,
  fontWeight = 900
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentTime = frame / fps;

  const rawVal = interpolate(currentTime, [startSec, endSec], [startValue, endValue], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });

  const formattedVal = decimals > 0 ? rawVal.toFixed(decimals) : Math.round(rawVal).toLocaleString();

  return (
    <span
      style={{
        fontSize,
        fontWeight,
        color,
        fontFamily: IndustrialTheme.fonts.mono,
        fontVariantNumeric: 'tabular-nums',
        letterSpacing: '-0.02em',
        lineHeight: 1
      }}
    >
      {prefix}{formattedVal}{suffix}
    </span>
  );
};
