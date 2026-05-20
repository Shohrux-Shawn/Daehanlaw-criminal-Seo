import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Globe, Phone, MapPin } from 'lucide-react';

const GOLD = '#c9a04c';

interface HeroSectionProps {
  brandName?: string;
  slogan?: string;
  title: React.ReactNode;
  subtitle: string;
  callToAction: { text: string; href: string };
  backgroundImage: string;
  contactInfo: { website: string; phone: string; address: string };
  className?: string;
  style?: React.CSSProperties;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

function HeroSection({ className, style, brandName, slogan, title, subtitle, callToAction, backgroundImage, contactInfo }: HeroSectionProps) {
  return (
    <motion.section
      className={cn('relative flex w-full flex-col overflow-hidden bg-white md:flex-row', className)}
      style={style}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* ── Left: content ── */}
      <div className="flex w-full flex-col justify-between p-8 md:w-[42%] md:p-12 lg:p-16">
        <div>
          {/* Brand */}
          <motion.header className="mb-10" variants={itemVariants}>
            <div className="flex flex-col">
              {brandName && (
                <p className="text-[18px] font-extrabold tracking-tight" style={{ color: '#0d1629' }}>
                  {brandName}
                </p>
              )}
              {slogan && (
                <p className="text-[11px] tracking-[0.2em] uppercase mt-0.5" style={{ color: GOLD }}>
                  {slogan}
                </p>
              )}
            </div>
          </motion.header>

          <motion.div variants={containerVariants}>
            <motion.h1
              className="text-[36px] font-extrabold leading-tight tracking-tight text-gray-900 md:text-[44px]"
              variants={itemVariants}
            >
              {title}
            </motion.h1>

            {/* Gold divider */}
            <motion.div
              className="my-6 h-[3px] w-16 rounded-full"
              style={{ background: GOLD }}
              variants={itemVariants}
            />

            <motion.p
              className="mb-8 max-w-md text-[15px] leading-relaxed text-gray-500"
              variants={itemVariants}
            >
              {subtitle}
            </motion.p>

            <motion.a
              href={callToAction.href}
              className="inline-flex items-center gap-2 text-[13px] font-bold tracking-widest uppercase transition-opacity hover:opacity-70"
              style={{ color: GOLD }}
              variants={itemVariants}
            >
              {callToAction.text}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </motion.a>
          </motion.div>
        </div>

        {/* Footer: contact info */}
        <motion.footer className="mt-12" variants={itemVariants}>
          <div className="grid grid-cols-1 gap-4 text-[12px] text-gray-400 sm:grid-cols-3">
            <div className="flex items-center gap-2">
              <Globe size={14} style={{ color: GOLD, flexShrink: 0 }} />
              <span>{contactInfo.website}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={14} style={{ color: GOLD, flexShrink: 0 }} />
              <span>{contactInfo.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={14} style={{ color: GOLD, flexShrink: 0 }} />
              <span>{contactInfo.address}</span>
            </div>
          </div>
        </motion.footer>
      </div>

      {/* ── Right: image with diagonal clip-path animation ── */}
      <motion.div
        className="w-full min-h-[320px] bg-cover bg-center md:w-[58%] md:min-h-full"
        style={{ backgroundImage: `url(${backgroundImage})` }}
        initial={{ clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' }}
        animate={{ clipPath: 'polygon(12% 0, 100% 0, 100% 100%, 0% 100%)' }}
        transition={{ duration: 1.2, ease: 'circOut' }}
      />
    </motion.section>
  );
}

export { HeroSection };
