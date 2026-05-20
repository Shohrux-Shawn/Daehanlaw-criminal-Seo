import React, { useEffect, useState } from 'react';

export interface HeroSlide {
  id: number;
  title: string;
  imageUrl: string;
}

interface HeroCarouselProps {
  slides: HeroSlide[];
  /** px per second — default 35 */
  speed?: number;
  className?: string;
}

const CARD_W = 300;
const GAP    = 16;
const STEP   = CARD_W + GAP;

export function HeroCarousel({ slides, speed = 35, className = '' }: HeroCarouselProps) {
  const [paused, setPaused] = useState(false);
  const loopWidth = slides.length * STEP;
  const duration  = loopWidth / speed; // seconds
  const items     = [...slides, ...slides]; // duplicate for seamless loop

  // Inject @keyframes dynamically so loopWidth can be exact
  useEffect(() => {
    const id = 'hero-carousel-kf';
    let el = document.getElementById(id) as HTMLStyleElement | null;
    if (!el) {
      el = document.createElement('style');
      el.id = id;
      document.head.appendChild(el);
    }
    el.textContent = `@keyframes hCarousel { from { transform: translateX(0); } to { transform: translateX(-${loopWidth}px); } }`;
    return () => { el?.remove(); };
  }, [loopWidth]);

  return (
    <div
      className={`relative w-full overflow-hidden group/hslider ${className}`}
      style={{ paddingTop: 16, paddingBottom: 8 }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Scrolling track — CSS animation runs on compositor, never stutters */}
      <div
        className="flex"
        style={{
          gap: GAP,
          animation: `hCarousel ${duration}s linear infinite`,
          animationPlayState: paused ? 'paused' : 'running',
          willChange: 'transform',
        }}
      >
        {items.map((slide, idx) => (
          <div
            key={`${slide.id}-${idx}`}
            className="flex-shrink-0 relative rounded-2xl overflow-hidden shadow-2xl shadow-black/50"
            style={{ width: CARD_W, height: 560 }}
          >
            <img
              src={slide.imageUrl}
              alt={slide.title}
              className="w-full h-full object-cover object-top"
              loading={idx < 5 ? 'eager' : 'lazy'}
            />

            {/* Gradient overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(to top, rgba(13,22,41,0.88) 0%, rgba(13,22,41,0.25) 45%, transparent 70%)',
              }}
            />

            {/* Caption — centered at bottom */}
            <div className="absolute bottom-6 left-0 right-0 flex flex-col items-center gap-2">
              <span className="text-[15px] sm:text-[17px] font-bold text-white tracking-[-0.2px] text-center px-4 drop-shadow-lg">
                {slide.title}
              </span>
              <span
                className="h-[2px] w-8 rounded-full"
                style={{ background: '#c9a04c' }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
