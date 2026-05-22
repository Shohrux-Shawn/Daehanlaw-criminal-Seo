import React, { useEffect, useRef, ReactNode } from 'react';

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: 'blue' | 'purple' | 'green' | 'red' | 'orange' | 'warm' | 'cream';
  size?: 'sm' | 'md' | 'lg';
  width?: string | number;
  height?: string | number;
  /** When true, ignores size prop and uses width/height or className for dimensions. */
  customSize?: boolean;
}

const glowColorMap = {
  blue:   { base: 220, spread: 200 },
  purple: { base: 280, spread: 300 },
  green:  { base: 120, spread: 200 },
  red:    { base: 0,   spread: 200 },
  orange: { base: 30,  spread: 200 },
  /** Warm gold — matches the criminal site's --gold-warm token (≈hsl(35, 35%, 56%)). */
  warm:   { base: 35,  spread: 60 },
  /** Soft cream — subtler, pairs well with cream-section backgrounds. */
  cream:  { base: 42,  spread: 50 },
};

const sizeMap = {
  sm: 'w-48 h-64',
  md: 'w-64 h-80',
  lg: 'w-80 h-96',
};

/* ──────────────────────────────────────────────────────────────────────────
 * Singleton pointer listener — one document.addEventListener for all cards,
 * writes coords to :root vars that every GlowCard's CSS reads.
 * ────────────────────────────────────────────────────────────────────────── */
let listenerAttached = false;

function attachPointerListener() {
  if (listenerAttached || typeof window === 'undefined') return;
  listenerAttached = true;

  const handler = (e: PointerEvent) => {
    const root = document.documentElement;
    root.style.setProperty('--glow-x', e.clientX.toFixed(0));
    root.style.setProperty('--glow-y', e.clientY.toFixed(0));
    root.style.setProperty('--glow-xp', (e.clientX / window.innerWidth).toFixed(3));
    root.style.setProperty('--glow-yp', (e.clientY / window.innerHeight).toFixed(3));
  };
  document.addEventListener('pointermove', handler, { passive: true });
  // No teardown — singleton lives for the page lifetime.
}

/* ──────────────────────────────────────────────────────────────────────────
 * Shared ::before / ::after style block (injected once into <head>)
 * ────────────────────────────────────────────────────────────────────────── */
let stylesInjected = false;

const sharedStyles = `
[data-glow]::before,
[data-glow]::after {
  pointer-events: none;
  content: "";
  position: absolute;
  inset: calc(var(--border-size) * -1);
  border: var(--border-size) solid transparent;
  border-radius: calc(var(--radius) * 1px);
  background-attachment: fixed;
  background-size: calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)));
  background-repeat: no-repeat;
  background-position: 50% 50%;
  mask: linear-gradient(transparent, transparent), linear-gradient(white, white);
  mask-clip: padding-box, border-box;
  mask-composite: intersect;
}
[data-glow]::before {
  background-image: radial-gradient(
    calc(var(--spotlight-size) * 0.75) calc(var(--spotlight-size) * 0.75) at
    calc(var(--glow-x, 0) * 1px)
    calc(var(--glow-y, 0) * 1px),
    hsl(var(--hue, 210) calc(var(--saturation, 100) * 1%) calc(var(--lightness, 50) * 1%) / var(--border-spot-opacity, 1)),
    transparent 100%
  );
  filter: brightness(1.6);
}
[data-glow]::after {
  background-image: radial-gradient(
    calc(var(--spotlight-size) * 0.5) calc(var(--spotlight-size) * 0.5) at
    calc(var(--glow-x, 0) * 1px)
    calc(var(--glow-y, 0) * 1px),
    hsl(0 100% 100% / var(--border-light-opacity, 0.85)),
    transparent 100%
  );
}
[data-glow] [data-glow] {
  position: absolute;
  inset: 0;
  will-change: filter;
  opacity: var(--outer, 1);
  border-radius: calc(var(--radius) * 1px);
  border-width: calc(var(--border-size) * 20);
  filter: blur(calc(var(--border-size) * 10));
  background: none;
  pointer-events: none;
  border: none;
}
[data-glow] > [data-glow]::before {
  inset: -10px;
  border-width: 10px;
}
`;

function injectSharedStyles() {
  if (stylesInjected || typeof document === 'undefined') return;
  stylesInjected = true;
  const styleTag = document.createElement('style');
  styleTag.setAttribute('data-glow-styles', '');
  styleTag.appendChild(document.createTextNode(sharedStyles));
  document.head.appendChild(styleTag);
}

/* ──────────────────────────────────────────────────────────────────────────
 * Component
 * ────────────────────────────────────────────────────────────────────────── */
const GlowCard: React.FC<GlowCardProps> = ({
  children,
  className = '',
  glowColor = 'warm',
  size = 'md',
  width,
  height,
  customSize = false,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    injectSharedStyles();
    attachPointerListener();
  }, []);

  const { base, spread } = glowColorMap[glowColor];
  const sizeClasses = customSize ? '' : sizeMap[size];

  const inlineStyle: React.CSSProperties & Record<string, string | number> = {
    '--base': base,
    '--spread': spread,
    '--radius': '14',
    '--border': '2',
    '--backdrop': 'transparent',
    '--backup-border': 'rgba(0,0,0,0.04)',
    '--size': '220',
    '--outer': '1',
    '--border-size': 'calc(var(--border, 2) * 1px)',
    '--spotlight-size': 'calc(var(--size, 220) * 1px)',
    '--hue': 'calc(var(--base) + (var(--glow-xp, 0) * var(--spread, 0)))',
    backgroundImage: `radial-gradient(
      var(--spotlight-size) var(--spotlight-size) at
      calc(var(--glow-x, 0) * 1px)
      calc(var(--glow-y, 0) * 1px),
      hsl(var(--hue, 210) calc(var(--saturation, 100) * 1%) calc(var(--lightness, 70) * 1%) / var(--bg-spot-opacity, 0.1)),
      transparent
    )`,
    // backgroundColor intentionally omitted so wrapper className (e.g. `bg-white`) wins.
    backgroundSize: 'calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)))',
    backgroundPosition: '50% 50%',
    backgroundAttachment: 'fixed',
    border: 'var(--border-size) solid var(--backup-border)',
    position: 'relative',
    touchAction: 'none',
  };

  if (width !== undefined) inlineStyle.width = typeof width === 'number' ? `${width}px` : width;
  if (height !== undefined) inlineStyle.height = typeof height === 'number' ? `${height}px` : height;

  return (
    <div
      ref={cardRef}
      data-glow
      style={inlineStyle}
      className={`${sizeClasses} ${!customSize ? 'aspect-[3/4]' : ''} rounded-2xl relative ${className}`.trim()}
    >
      <div data-glow />
      {children}
    </div>
  );
};

export { GlowCard };
