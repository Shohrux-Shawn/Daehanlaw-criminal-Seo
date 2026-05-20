import type { SiteConfig } from '@daehanlaw/config';
import Link from 'next/link';

interface HeroProps {
  config: SiteConfig;
}

export function Hero({ config }: HeroProps) {
  return (
    <section className="relative w-full py-24 sm:py-32 overflow-hidden bg-navy-900">

      {/* Background image overlay */}
      {config.heroImage && (
        <img
          src={config.heroImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-20"
          aria-hidden
        />
      )}

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, rgba(13,22,41,0.92) 0%, rgba(13,22,41,0.75) 50%, rgba(13,22,41,0.88) 100%)',
        }}
        aria-hidden
      />

      {/* Decorative circle */}
      <div
        className="absolute -right-32 -top-32 w-[500px] h-[500px] rounded-full opacity-[0.04]"
        style={{ background: 'radial-gradient(circle, #c9a04c 0%, transparent 70%)' }}
        aria-hidden
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/8 border border-white/10">
          <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse2" />
          <span className="text-[12px] font-bold text-gold-300 uppercase tracking-[0.15em]">
            {config.practiceArea} 전문 법무법인
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-[30px] sm:text-[44px] lg:text-[52px] font-black text-white leading-tight tracking-[-1px] mb-5 max-w-3xl animate-fade-in-up">
          {config.heroHeadline.split('\n').map((line, i) => (
            <span key={i}>
              {i === 0
                ? <span className="text-gold-400">{line}</span>
                : <><br />{line}</>
              }
            </span>
          ))}
        </h1>

        {/* Subheadline */}
        <p
          className="text-[15px] sm:text-[17px] text-white/70 max-w-2xl leading-relaxed mb-10 animate-fade-in-up"
          style={{ animationDelay: '0.15s' }}
        >
          {config.heroSubheadline}
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row gap-3 animate-fade-in-up"
          style={{ animationDelay: '0.25s' }}
        >
          <Link href="/contact" className="btn-primary text-[15px] px-8 py-4 rounded-xl">
            상담 신청
          </Link>
          <a
            href={`tel:${config.phoneNumber}`}
            className="btn-outline text-[15px] px-8 py-4 rounded-xl"
          >
            {config.phoneNumber} 전화상담
          </a>
        </div>

        {/* Trust indicators */}
        <div
          className="flex flex-wrap items-center gap-6 mt-12 animate-fade-in"
          style={{ animationDelay: '0.4s' }}
        >
          {[
            { label: '30년+', sub: '법무법인 역사' },
            { label: '1,000+', sub: '이혼·가사 사건' },
            { label: '98%', sub: '의뢰인 만족도' },
          ].map(({ label, sub }) => (
            <div key={sub} className="flex flex-col">
              <span className="text-[22px] font-black text-gold-400 leading-none">{label}</span>
              <span className="text-[11px] text-white/50 mt-1">{sub}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
