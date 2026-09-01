import React from 'react';

/**
 * OpticalMateriality.tsx
 * Enterprise-grade 4-layer optical lighting and physical materiality system.
 * Eliminates flat digital CSS quads and implements authentic glass/titanium lighting.
 */

export const OPTICAL_MATERIALS = {
  // Dark Titanium Base (High-contrast, non-reflective slate)
  TITANIUM_PANEL: {
    background: 'linear-gradient(155deg, #182333 0%, #0c121b 100%)',
    border: '1px solid rgba(255, 255, 255, 0.16)',
    borderRadius: 24,
    boxShadow: `
      0 35px 70px -15px rgba(0, 0, 0, 0.95),
      0 15px 35px -10px rgba(0, 0, 0, 0.8),
      inset 0 1px 1px 0 rgba(255, 255, 255, 0.45),
      inset 0 -8px 20px rgba(0, 0, 0, 0.7)
    `,
  },

  // Frosted Glass Plate (Subsurface blur with top specular rim)
  FROSTED_GLASS_HERO: {
    background: 'linear-gradient(145deg, rgba(26, 36, 52, 0.85) 0%, rgba(13, 19, 29, 0.95) 100%)',
    backdropFilter: 'blur(24px)',
    border: '1px solid rgba(255, 255, 255, 0.22)',
    borderRadius: 28,
    boxShadow: `
      0 40px 90px -20px rgba(0, 0, 0, 0.95),
      0 20px 45px -10px rgba(0, 0, 0, 0.85),
      inset 0 1.5px 1.5px 0 rgba(255, 255, 255, 0.6),
      inset 0 -10px 24px rgba(0, 0, 0, 0.8)
    `,
  },

  // Error Alert Container (Crimson obsidian with red light bleeding)
  CRIMSON_OBSIDIAN: {
    background: 'linear-gradient(155deg, #221014 0%, #11080A 100%)',
    border: '1px solid rgba(239, 68, 68, 0.5)',
    borderRadius: 20,
    boxShadow: `
      0 30px 70px rgba(0, 0, 0, 0.95),
      0 0 45px rgba(239, 68, 68, 0.25),
      inset 0 1px 1px 0 rgba(255, 255, 255, 0.35),
      inset 0 -6px 14px rgba(0, 0, 0, 0.8)
    `,
  },

  // Tactile Glass Pill Button
  TACTILE_GLASS_PILL: (glowColor: string = 'rgba(77, 174, 235, 0.6)') => ({
    background: 'linear-gradient(140deg, #60c5ff 0%, #2080c4 100%)',
    color: '#000000',
    borderRadius: 60,
    border: '2px solid rgba(255, 255, 255, 0.85)',
    boxShadow: `
      0 25px 50px rgba(0, 0, 0, 0.9),
      0 10px 30px ${glowColor},
      inset 0 3px 3px rgba(255, 255, 255, 0.9),
      inset 0 -4px 8px rgba(0, 0, 0, 0.3)
    `,
  }),
};

/**
 * Top Glass Specular Highlight Component
 * Renders a razor-sharp 1px horizontal light catch along the top edge of any card.
 */
export const SpecularTopRim: React.FC<{ width?: string | number; opacity?: number }> = ({
  width = '80%',
  opacity = 0.6,
}) => (
  <div
    style={{
      position: 'absolute',
      top: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      width,
      height: 2,
      background: `linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, ${opacity}) 50%, transparent 100%)`,
      borderRadius: 2,
      pointerEvents: 'none',
    }}
  />
);
