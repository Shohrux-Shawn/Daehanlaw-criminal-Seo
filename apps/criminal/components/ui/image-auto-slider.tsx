import React, { useRef, useEffect, useState, useCallback } from 'react';

export interface SliderImage {
  src: string;
  name?: string;
  label?: string;
  id?: string;
}

interface ImageAutoSliderProps {
  images: SliderImage[];
  /** px per second — default 40 */
  speed?: number;
  /** card width class — default "w-48 md:w-56 lg:w-64" */
  cardWidth?: string;
  /** card height class — default "h-64 md:h-72 lg:h-80" */
  cardHeight?: string;
  className?: string;
}

const CARD_PX = 236; // approx card + gap width used for step size

export const ImageAutoSlider: React.FC<ImageAutoSliderProps> = ({
  images,
  speed = 40,
  cardWidth = 'w-48 md:w-56 lg:w-64',
  cardHeight = 'h-64 md:h-72 lg:h-80',
  className = '',
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);
  const offsetRef = useRef(0);
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(false);

  const slides = [...images, ...images];
  const loopWidth = images.length * CARD_PX;

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    let last = performance.now();

    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;

      if (!pausedRef.current && trackRef.current) {
        offsetRef.current += speed * dt;
        if (offsetRef.current >= loopWidth) offsetRef.current -= loopWidth;
        trackRef.current.style.transform = `translateX(-${offsetRef.current}px)`;
      }

      animRef.current = requestAnimationFrame(tick);
    };

    animRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animRef.current);
  }, [speed, loopWidth]);

  const step = useCallback((dir: 1 | -1) => {
    offsetRef.current = (offsetRef.current + dir * CARD_PX + loopWidth) % loopWidth;
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-${offsetRef.current}px)`;
    }
  }, [loopWidth]);

  return (
    <div
      className={`relative w-full overflow-hidden group/slider ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Track */}
      <div ref={trackRef} className="flex gap-4 w-max will-change-transform">
        {slides.map((img, idx) => {
          const inner = (
            <>
              <img
                src={img.src}
                alt={img.name ?? `Attorney ${idx + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                loading="lazy"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to top, rgba(13,22,41,0.85) 0%, rgba(13,22,41,0.2) 50%, transparent 70%)',
                }}
              />
              {(img.name || img.label) && (
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  {img.label && (
                    <p className="text-[10px] font-semibold text-amber-400 uppercase tracking-widest mb-0.5">
                      {img.label}
                    </p>
                  )}
                  {img.name && (
                    <p className="text-[14px] font-bold text-white">{img.name}</p>
                  )}
                </div>
              )}
            </>
          );

          const cardClass = `flex-shrink-0 ${cardWidth} ${cardHeight} rounded-2xl overflow-hidden relative group shadow-lg`;

          return img.id ? (
            <a
              key={idx}
              href={`https://www.daehanlaw.com/attorneys/${img.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`${cardClass} block no-underline`}
              draggable={false}
            >
              {inner}
            </a>
          ) : (
            <div key={idx} className={cardClass}>
              {inner}
            </div>
          );
        })}
      </div>

      {/* Left arrow */}
      <button
        onClick={() => step(-1)}
        aria-label="Previous"
        className="absolute left-10 top-1/2 -translate-y-1/2 z-10
                   flex items-center justify-center w-11 h-11 rounded-full
                   bg-white/90 shadow-lg border border-white/60
                   opacity-0 group-hover/slider:opacity-100
                   transition-opacity duration-200 hover:bg-white"
      >
        <svg className="w-5 h-5 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Right arrow */}
      <button
        onClick={() => step(1)}
        aria-label="Next"
        className="absolute right-10 top-1/2 -translate-y-1/2 z-10
                   flex items-center justify-center w-11 h-11 rounded-full
                   bg-white/90 shadow-lg border border-white/60
                   opacity-0 group-hover/slider:opacity-100
                   transition-opacity duration-200 hover:bg-white"
      >
        <svg className="w-5 h-5 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};
