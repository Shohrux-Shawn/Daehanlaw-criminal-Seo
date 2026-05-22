'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedBorderProps {
  /** Duration of one loop around the border in seconds. */
  duration?: number;
  /** Size of the traveling dot in pixels (also the corner radius the path follows). */
  dotSize?: number;
  /** Optional className override. */
  className?: string;
  /** Color of the traveling dot. Accepts any CSS color or var. */
  color?: string;
}

/**
 * Animated border accent — drops inside any `position: relative` element
 * (button, link, etc.) and traces a glowing dot around the border on loop.
 *
 * Requires the parent to be `relative` and have a `rounded-*` radius.
 */
export function AnimatedBorder({
  duration = 3,
  dotSize = 60,
  className,
  color = 'var(--gold-warm)',
}: AnimatedBorderProps) {
  return (
    <div
      aria-hidden
      className={cn(
        '-inset-px pointer-events-none absolute rounded-[inherit] border-[3px] border-transparent [mask-clip:padding-box,border-box]',
        '[mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]',
        className,
      )}
    >
      <motion.div
        className="absolute aspect-square"
        style={{
          width: dotSize,
          /* longer, brighter trail with white-hot core */
          backgroundImage: `linear-gradient(to right, transparent 0%, ${color} 40%, #ffffff 100%)`,
          filter: `drop-shadow(0 0 6px ${color}) drop-shadow(0 0 12px ${color})`,
          offsetPath: `rect(0 auto auto 0 round ${dotSize}px)`,
        }}
        animate={{ offsetDistance: ['0%', '100%'] }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration,
          ease: 'linear',
        }}
      />
    </div>
  );
}
