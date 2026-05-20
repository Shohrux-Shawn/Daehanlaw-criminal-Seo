/**
 * Decorative background layers. Place inside a `relative` parent with
 * your content at a higher z-index (e.g. `relative z-10`).
 */

interface BgProps {
  className?: string;
}

/** Subtle dotted grid — good for headers, cards, hero sections on light bg. */
export function DottedBackground({ className = '' }: BgProps) {
  return (
    <div
      className={`absolute inset-0 z-0 pointer-events-none ${className}`}
      style={{
        background: '#ffffff',
        backgroundImage:
          'radial-gradient(circle at 1px 1px, rgba(0, 0, 0, 0.12) 1px, transparent 0)',
        backgroundSize: '20px 20px',
      }}
      aria-hidden
    />
  );
}

/** Soft yellow radial glow — warm accent for white surfaces. */
export function YellowGlowBackground({ className = '' }: BgProps) {
  return (
    <div
      className={`absolute inset-0 z-0 pointer-events-none ${className}`}
      style={{
        backgroundImage: 'radial-gradient(circle at center, #FFF991 0%, transparent 70%)',
        opacity: 0.6,
        mixBlendMode: 'multiply',
      }}
      aria-hidden
    />
  );
}
