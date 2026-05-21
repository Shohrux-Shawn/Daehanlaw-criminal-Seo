import React, { useEffect, useRef, useState } from 'react';

interface Stat {
  value: number;
  suffix?: string;
  label: string;
  caption?: string;
}

const STATS: Stat[] = [
  { value: 1200, suffix: '+', label: '누적 변호 사건',      caption: '형사·민사 통합 수임 기준' },
  { value: 96,   suffix: '%',  label: '의뢰인 만족도',       caption: '상담 후 자체 조사' },
  { value: 30,   suffix: '분',  label: '평균 상담 응대시간',  caption: '신청 접수 → 변호사 연결' },
  { value: 24,   suffix: '시간', label: '24시간 긴급 상담',    caption: '구속·체포 상황 대응' },
];

function useCountUp(target: number, durationMs = 1400, start = false): number {
  const [val, setVal] = useState(0);
  const rafRef = useRef<number | undefined>(undefined);
  useEffect(() => {
    if (!start) return;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / durationMs);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.floor(eased * target));
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [target, durationMs, start]);
  return val;
}

function StatItem({ stat, inView }: { stat: Stat; inView: boolean }) {
  const v = useCountUp(stat.value, 1400, inView);
  return (
    <div className="text-center">
      <div className="flex items-baseline justify-center gap-1">
        <span className="text-[44px] sm:text-[56px] lg:text-[64px] font-black tracking-[-0.04em] text-[color:var(--ink-strong)] tabular-nums">
          {v.toLocaleString()}
        </span>
        {stat.suffix && (
          <span className="text-[20px] sm:text-[24px] font-bold text-[color:var(--gold-warm-deep)] tracking-tight">
            {stat.suffix}
          </span>
        )}
      </div>
      <p className="mt-3 text-[15px] sm:text-[16px] font-bold text-[color:var(--ink-strong)]">{stat.label}</p>
      {stat.caption && (
        <p className="mt-1 text-[12px] text-[color:var(--ink-muted)]">{stat.caption}</p>
      )}
    </div>
  );
}

export default function SectionStats() {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setInView(true)),
      { threshold: 0.2 },
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="bg-white py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-14 sm:mb-16">
          <p className="eyebrow mb-3">Numbers</p>
          <h2 className="heading-lg">
            숫자가 증명하는<br className="sm:hidden" /> 대한중앙의 변호 실적
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-6">
          {STATS.map((s) => (
            <StatItem key={s.label} stat={s} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
