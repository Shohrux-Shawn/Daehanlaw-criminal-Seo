import React, { useEffect, useRef } from 'react';

interface HalideTopoHeroProps {
  brandMark: string;
  brandTagline?: string;
  brandLicense?: string;
  headlineLine1: string;
  headlineLine2: string;
  established?: string;
  subtitle: string;
  ctaText: string;
  ctaHref: string;
  imageUrls?: [string, string, string];
}

const DEFAULT_IMAGES: [string, string, string] = [
  'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=1200',
];

const HalideTopoHero: React.FC<HalideTopoHeroProps> = ({
  brandMark,
  brandTagline,
  brandLicense,
  headlineLine1,
  headlineLine2,
  established,
  subtitle,
  ctaText,
  ctaHref,
  imageUrls = DEFAULT_IMAGES,
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMouseMove = (e: MouseEvent) => {
      const x = (window.innerWidth / 2 - e.pageX) / 25;
      const y = (window.innerHeight / 2 - e.pageY) / 25;
      canvas.style.transform = `rotateX(${55 + y / 2}deg) rotateZ(${-25 + x / 2}deg)`;
      layersRef.current.forEach((layer, index) => {
        if (!layer) return;
        const depth = (index + 1) * 15;
        const moveX = x * (index + 1) * 0.2;
        const moveY = y * (index + 1) * 0.2;
        layer.style.transform = `translateZ(${depth}px) translate(${moveX}px, ${moveY}px)`;
      });
    };

    canvas.style.opacity = '0';
    canvas.style.transform = 'rotateX(90deg) rotateZ(0deg) scale(0.8)';

    const timeout = setTimeout(() => {
      canvas.style.transition = 'all 2.5s cubic-bezier(0.16, 1, 0.3, 1)';
      canvas.style.opacity = '1';
      canvas.style.transform = 'rotateX(55deg) rotateZ(-25deg) scale(1)';
    }, 300);

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <section className="halide-hero">
      <style jsx>{`
        .halide-hero {
          --bg: #0b1220;
          --silver: #f4ecd6;
          --accent: #c8a449;
          --accent-2: #b91c1c;
          --grain-opacity: 0.10;
          position: relative;
          background: radial-gradient(circle at 50% 30%, #16233f 0%, var(--bg) 70%);
          color: var(--silver);
          overflow: hidden;
          height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          isolation: isolate;
        }

        .halide-hero :global(.halide-grain) {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 5;
          opacity: var(--grain-opacity);
        }

        .halide-hero :global(.viewport) {
          perspective: 2000px;
          width: 100%;
          height: 100%;
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          z-index: 1;
        }

        .halide-hero :global(.canvas-3d) {
          position: relative;
          width: min(800px, 90vw);
          height: min(500px, 60vh);
          transform-style: preserve-3d;
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .halide-hero :global(.layer) {
          position: absolute;
          inset: 0;
          border: 1px solid rgba(200, 164, 73, 0.25);
          background-size: cover;
          background-position: center;
          transition: transform 0.5s ease;
        }

        .halide-hero :global(.layer-1) { background-image: var(--img-1); }
        .halide-hero :global(.layer-2) { background-image: var(--img-2); opacity: 0.7; mix-blend-mode: screen; }
        .halide-hero :global(.layer-3) { background-image: var(--img-3); opacity: 0.45; mix-blend-mode: overlay; }

        .halide-hero :global(.contours) {
          position: absolute;
          width: 200%;
          height: 200%;
          top: -50%;
          left: -50%;
          background-image: repeating-radial-gradient(
            circle at 50% 50%,
            transparent 0,
            transparent 40px,
            rgba(200, 164, 73, 0.10) 41px,
            transparent 42px
          );
          transform: translateZ(120px);
          pointer-events: none;
        }

        .halide-hero :global(.interface-grid) {
          position: absolute;
          inset: 0;
          padding: clamp(1.5rem, 4vw, 4rem);
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: auto 1fr auto;
          gap: 1rem;
          z-index: 10;
          pointer-events: none;
        }

        .halide-hero :global(.brand-mark) {
          font-weight: 700;
          color: var(--accent);
          letter-spacing: 0.12em;
          font-family: 'Pretendard', 'Noto Sans KR', sans-serif;
        }

        .halide-hero :global(.brand-meta) {
          text-align: right;
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          color: var(--accent);
          font-size: 0.7rem;
          line-height: 1.6;
        }

        .halide-hero :global(.hero-title) {
          grid-column: 1 / -1;
          align-self: center;
          font-size: clamp(2.5rem, 8vw, 7.5rem);
          line-height: 0.92;
          letter-spacing: -0.03em;
          font-weight: 900;
          background: linear-gradient(90deg, #f4ecd6, var(--accent), #f4ecd6);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          margin: 0;
        }

        .halide-hero :global(.bottom-row) {
          grid-column: 1 / -1;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 1.5rem;
          flex-wrap: wrap;
        }

        .halide-hero :global(.bottom-meta) {
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 0.75rem;
          line-height: 1.6;
          max-width: 32rem;
        }

        .halide-hero :global(.cta-button) {
          pointer-events: auto;
          background: var(--accent);
          color: var(--bg);
          padding: 1rem 2rem;
          text-decoration: none;
          font-weight: 700;
          letter-spacing: 0.04em;
          clip-path: polygon(0 0, 100% 0, 100% 70%, 85% 100%, 0 100%);
          transition: 0.3s;
          display: inline-block;
        }

        .halide-hero :global(.cta-button:hover) {
          background: var(--accent-2);
          color: #fff;
          transform: translateY(-5px);
        }

        .halide-hero :global(.scroll-hint) {
          position: absolute;
          bottom: 1.5rem;
          left: 50%;
          width: 1px;
          height: 60px;
          background: linear-gradient(to bottom, var(--accent), transparent);
          animation: halide-flow 2s infinite ease-in-out;
          z-index: 10;
        }

        @keyframes halide-flow {
          0%, 100% { transform: scaleY(0); transform-origin: top; }
          50% { transform: scaleY(1); transform-origin: top; }
          51% { transform: scaleY(1); transform-origin: bottom; }
        }
      `}</style>

      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <filter id="halide-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>

      <div className="halide-grain" style={{ filter: 'url(#halide-grain)' }} />

      <div className="interface-grid">
        <div className="brand-mark">{brandMark}</div>
        <div className="brand-meta">
          {brandLicense && <div>{brandLicense}</div>}
          {brandTagline && <div>{brandTagline}</div>}
        </div>

        <h1 className="hero-title">
          {headlineLine1}
          <br />
          {headlineLine2}
        </h1>

        <div className="bottom-row">
          <div className="bottom-meta">
            {established && <p>[ {established} ]</p>}
            <p>{subtitle}</p>
          </div>
          <a href={ctaHref} className="cta-button">{ctaText}</a>
        </div>
      </div>

      <div
        className="viewport"
        style={{
          // CSS variables consumed by the .layer-N background-images
          ['--img-1' as any]: `url('${imageUrls[0]}')`,
          ['--img-2' as any]: `url('${imageUrls[1]}')`,
          ['--img-3' as any]: `url('${imageUrls[2]}')`,
        }}
      >
        <div className="canvas-3d" ref={canvasRef}>
          <div className="layer layer-1" ref={(el) => { if (el) layersRef.current[0] = el; }} />
          <div className="layer layer-2" ref={(el) => { if (el) layersRef.current[1] = el; }} />
          <div className="layer layer-3" ref={(el) => { if (el) layersRef.current[2] = el; }} />
          <div className="contours" />
        </div>
      </div>

      <div className="scroll-hint" />
    </section>
  );
};

export default HalideTopoHero;
