import React from 'react';
import Link from 'next/link';
import { Shield, MessageCircle, Heart, MessageSquare, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AnimatedBorder } from '@/components/ui/animated-border';

interface ConsultHeroProps {
  badgeText: string;
  headlineLine1: string;
  headlineLine2: string;
  subtitle: string;
  primaryCta: { text: string; href: string };
  secondaryCta: { text: string; href: string };
  backgroundImageUrl?: string;
}

const DEFAULT_BG = 'https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1920&auto=format&fit=crop';

const FEATURES = [
  {
    icon: Heart,
    title: '공감형 상담',
    body: '의뢰인의 이야기에 귀 기울이며 공감에서 시작합니다.',
  },
  {
    icon: Shield,
    title: '안심 중심 대응',
    body: '수사부터 재판까지 체계적 전략으로 의뢰인의 권리를 지킵니다.',
  },
  {
    icon: MessageSquare,
    title: '명확한 소통',
    body: '어려운 법률도 알기 쉽게, 투명하게 안내드립니다.',
  },
];

const ConsultHero: React.FC<ConsultHeroProps> = ({
  badgeText,
  headlineLine1,
  headlineLine2,
  subtitle,
  primaryCta,
  secondaryCta,
  backgroundImageUrl = DEFAULT_BG,
}) => {
  return (
    <>
      <section className="relative w-full overflow-hidden bg-[#f5ede0] min-h-[680px] lg:min-h-[780px] flex items-center">
        {/* Background photo — full bleed */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${backgroundImageUrl}')` }}
        />
        {/* Soft left-side cream wash so the card stays readable, fades to 0 by ~55% */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(90deg, rgba(245,237,224,0.55) 0%, rgba(245,237,224,0.25) 30%, rgba(245,237,224,0) 55%)',
          }}
        />

        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16 sm:py-20 lg:py-24 pb-40 sm:pb-48 lg:pb-56">
          {/* Left content card */}
          <div className="max-w-xl">
            <div className="rounded-3xl bg-[#f7efe0]/92 backdrop-blur-md border border-[#e8dcc4]/60 shadow-[0_20px_60px_rgba(60,40,20,0.12)] p-8 sm:p-10 lg:p-12">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 mb-6">
                <Shield className="w-4 h-4 text-[#b8956a]" strokeWidth={2.2} />
                <span className="text-[13px] font-semibold text-[#6b5f4f] tracking-tight">
                  {badgeText}
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-[34px] sm:text-[42px] lg:text-[48px] font-black text-[#2a241d] leading-[1.15] tracking-[-0.03em] mb-5">
                {headlineLine1}
                <br />
                {headlineLine2}
              </h1>

              {/* Subtitle */}
              <p className="text-[14px] sm:text-[15px] text-[#6b5f4f] leading-relaxed mb-8">
                {subtitle}
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href={primaryCta.href} className="no-underline">
                  <Button
                    size="lg"
                    className="relative h-12 px-6 text-[15px] font-semibold rounded-full bg-[#b8956a] hover:bg-[#a07d52] text-white shadow-sm overflow-hidden"
                  >
                    <AnimatedBorder duration={3} dotSize={60} />
                    <MessageCircle className="w-4 h-4 mr-2 relative" />
                    <span className="relative">{primaryCta.text}</span>
                  </Button>
                </Link>
                <Link href={secondaryCta.href} className="no-underline">
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-12 px-6 text-[15px] font-semibold rounded-full border-[#b8956a] text-[#8a6e4a] hover:bg-[#b8956a]/10 hover:text-[#8a6e4a] bg-transparent"
                  >
                    {secondaryCta.text}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature cards — overlapping the hero bottom */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 -mt-44 sm:-mt-48 lg:-mt-52">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {FEATURES.map(({ icon: Icon, title, body }) => (
            <Card
              key={title}
              className="flex items-start gap-4 p-5 sm:p-6 rounded-2xl border-white/60 bg-[#faf5ec]/95 backdrop-blur shadow-[0_10px_40px_rgba(60,40,20,0.08)]"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#e8d4b8] flex items-center justify-center">
                <Icon className="w-5 h-5 text-[#8a6e4a]" strokeWidth={2.2} />
              </div>
              <div>
                <h3 className="text-[15px] font-bold text-[#2a241d] mb-1.5 tracking-tight">
                  {title}
                </h3>
                <p className="text-[12.5px] text-[#6b5f4f] leading-relaxed">
                  {body}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default ConsultHero;
