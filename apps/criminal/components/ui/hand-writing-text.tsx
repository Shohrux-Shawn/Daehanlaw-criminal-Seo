'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface HandWrittenTitleProps {
  title?: string;
  subtitle?: string;
  logo?: ReactNode;
  className?: string;
}

function HandWrittenTitle({
  title = 'Hand Written',
  subtitle = '',
  logo,
  className = '',
}: HandWrittenTitleProps) {
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 2.5, ease: [0.43, 0.13, 0.23, 0.96] as const },
        opacity: { duration: 0.5 },
      },
    },
  };

  return (
    <div className={`relative w-full max-w-4xl mx-auto py-20 sm:py-24 ${className}`}>
      <div className="absolute inset-0">
        <motion.svg
          width="100%"
          height="100%"
          viewBox="0 0 1200 600"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="w-full h-full"
        >
          <motion.path
            d="M 950 90
               C 1250 300, 1050 480, 600 520
               C 250 520, 150 480, 150 300
               C 150 120, 350 80, 600 80
               C 850 80, 950 180, 950 180"
            fill="none"
            strokeWidth="12"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={draw}
            className="opacity-90"
          />
        </motion.svg>
      </div>
      <div className="relative text-center z-10 flex flex-col items-center justify-center">
        <motion.h2
          className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {title}
        </motion.h2>
        {logo && (
          <motion.div
            className="my-5 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            {logo}
          </motion.div>
        )}
        {subtitle && (
          <motion.p
            className="mt-2 text-lg sm:text-xl text-[color:var(--ink-muted)]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </div>
  );
}

export { HandWrittenTitle };
