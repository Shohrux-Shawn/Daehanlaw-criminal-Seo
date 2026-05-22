import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { ArrowLeft, Home } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="w-full h-screen bg-black overflow-x-hidden flex justify-center items-center relative">
      <MessageDisplay />
      <CharactersAnimation />
      <CircleAnimation />
    </div>
  );
}

/* ── 1. Message + CTAs ─────────────────────────────────────────── */
function MessageDisplay() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="absolute flex flex-col justify-center items-center w-[90%] h-[90%] z-[100]">
      <div
        className={`flex flex-col items-center transition-opacity duration-500 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="text-[28px] sm:text-[35px] font-semibold text-black m-[1%] tracking-tight">
          페이지를 찾을 수 없습니다
        </div>
        <div className="text-[72px] sm:text-[110px] font-black text-black m-[1%] tracking-[-0.04em] leading-none">
          404
        </div>
        <div className="text-[13px] sm:text-[15px] max-w-[520px] text-center text-black/80 m-[1%] leading-relaxed px-4">
          찾으시는 페이지가 삭제되었거나, 주소가 변경되었거나, 일시적으로 접근할 수 없는 상태입니다.
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-8">
          <button
            type="button"
            onClick={() => router.back()}
            className="group inline-flex items-center justify-center gap-2 text-black border-2 border-black hover:bg-black hover:text-white transition-all duration-300 ease-in-out px-6 py-2.5 h-auto text-[15px] font-semibold hover:scale-[1.03]"
          >
            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            이전 페이지
          </button>
          <Link
            href="/"
            className="group inline-flex items-center justify-center gap-2 text-white transition-all duration-300 ease-in-out px-6 py-2.5 h-auto text-[15px] font-semibold hover:scale-[1.03] no-underline"
            style={{ background: 'var(--gold-warm)' }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--gold-warm-deep)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--gold-warm)')}
          >
            <Home className="w-5 h-5 transition-transform group-hover:scale-110" />
            홈으로
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ── 2. Stick-figure horizontal runners ────────────────────────── */
type StickFigure = {
  top?: string;
  bottom?: string;
  src: string;
  transform?: string;
  speedX: number;
  speedRotation?: number;
};

function CharactersAnimation() {
  const charactersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stickFigures: StickFigure[] = [
      { top: '0%',     src: 'https://raw.githubusercontent.com/RicardoYare/imagenes/9ef29f5bbe075b1d1230a996d87bca313b9b6a63/sticks/stick0.svg', transform: 'rotateZ(-90deg)', speedX: 1500 },
      { top: '10%',    src: 'https://raw.githubusercontent.com/RicardoYare/imagenes/9ef29f5bbe075b1d1230a996d87bca313b9b6a63/sticks/stick1.svg', speedX: 3000, speedRotation: 2000 },
      { top: '20%',    src: 'https://raw.githubusercontent.com/RicardoYare/imagenes/9ef29f5bbe075b1d1230a996d87bca313b9b6a63/sticks/stick2.svg', speedX: 5000, speedRotation: 1000 },
      { top: '25%',    src: 'https://raw.githubusercontent.com/RicardoYare/imagenes/9ef29f5bbe075b1d1230a996d87bca313b9b6a63/sticks/stick0.svg', speedX: 2500, speedRotation: 1500 },
      { top: '35%',    src: 'https://raw.githubusercontent.com/RicardoYare/imagenes/9ef29f5bbe075b1d1230a996d87bca313b9b6a63/sticks/stick0.svg', speedX: 2000, speedRotation: 300 },
      { bottom: '5%',  src: 'https://raw.githubusercontent.com/RicardoYare/imagenes/9ef29f5bbe075b1d1230a996d87bca313b9b6a63/sticks/stick3.svg', speedX: 0 },
    ];

    const container = charactersRef.current;
    if (!container) return;

    container.innerHTML = '';

    stickFigures.forEach((figure, index) => {
      const stick = document.createElement('img');
      stick.classList.add('characters');
      stick.style.position = 'absolute';
      stick.style.width = '18%';
      stick.style.height = '18%';

      if (figure.top)    stick.style.top    = figure.top;
      if (figure.bottom) stick.style.bottom = figure.bottom;
      stick.src = figure.src;
      stick.onerror = () => { stick.style.display = 'none'; };
      if (figure.transform) stick.style.transform = figure.transform;

      container.appendChild(stick);

      if (index === 5) return;

      stick.animate(
        [{ left: '100%' }, { left: '-20%' }],
        { duration: figure.speedX, easing: 'linear', fill: 'forwards' },
      );

      if (index === 0) return;

      if (figure.speedRotation) {
        stick.animate(
          [{ transform: 'rotate(0deg)' }, { transform: 'rotate(-360deg)' }],
          { duration: figure.speedRotation, iterations: Infinity, easing: 'linear' },
        );
      }
    });

    return () => {
      container.innerHTML = '';
    };
  }, []);

  return <div ref={charactersRef} className="absolute w-[99%] h-[95%] pointer-events-none" />;
}

/* ── 3. Canvas circle fill animation ───────────────────────────── */
interface Circulo { x: number; y: number; size: number; }

function CircleAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestIdRef = useRef<number | undefined>(undefined);
  const timerRef = useRef(0);
  const circulosRef = useRef<Circulo[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const initArr = () => {
      circulosRef.current = [];
      for (let i = 0; i < 300; i++) {
        const randomX =
          Math.floor(Math.random() * (canvas.width * 3 - canvas.width * 1.2 + 1)) + canvas.width * 1.2;
        const randomY =
          Math.floor(Math.random() * (canvas.height - canvas.height * -0.2 + 1)) + canvas.height * -0.2;
        const size = canvas.width / 1000;
        circulosRef.current.push({ x: randomX, y: randomY, size });
      }
    };

    const draw = () => {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      timerRef.current++;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      const distanceX = canvas.width / 80;
      const growthRate = canvas.width / 1000;

      ctx.fillStyle = 'white';
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      circulosRef.current.forEach((c) => {
        ctx.beginPath();
        if (timerRef.current < 65) {
          c.x = c.x - distanceX;
          c.size = c.size + growthRate;
        }
        if (timerRef.current > 65 && timerRef.current < 500) {
          c.x = c.x - distanceX * 0.02;
          c.size = c.size + growthRate * 0.2;
        }
        ctx.arc(c.x, c.y, c.size, 0, Math.PI * 2);
        ctx.fill();
      });

      if (timerRef.current > 500) {
        if (requestIdRef.current) cancelAnimationFrame(requestIdRef.current);
        return;
      }
      requestIdRef.current = requestAnimationFrame(draw);
    };

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    timerRef.current = 0;
    initArr();
    draw();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      timerRef.current = 0;
      if (requestIdRef.current) cancelAnimationFrame(requestIdRef.current);
      initArr();
      draw();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (requestIdRef.current) cancelAnimationFrame(requestIdRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}
