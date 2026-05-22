import React from 'react';
import Link from 'next/link';
import { MessageCircle, Phone, ArrowRight } from 'lucide-react';
import { AnimatedBorder } from '@/components/ui/animated-border';

interface SectionCtaBottomProps {
  phoneNumber: string;
}

export default function SectionCtaBottom({ phoneNumber }: SectionCtaBottomProps) {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28" style={{ background: 'var(--cream-section)' }}>
      {/* subtle decorative gold gradient */}
      <div
        aria-hidden
        className="absolute -right-32 -top-32 w-[500px] h-[500px] rounded-full opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, var(--gold-warm) 0%, transparent 70%)' }}
      />
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-12 text-center">
        <p className="eyebrow mb-3">Consultation</p>
        <h2 className="heading-xl mb-5">
          지금, 가장 가까운<br />
          형사 조력자와 시작하세요
        </h2>
        <p className="text-[15px] sm:text-[17px] text-[color:var(--ink-muted)] leading-relaxed max-w-2xl mx-auto mb-10">
          단 한 번의 진술이 사건의 방향을 바꿉니다. 망설이지 말고 지금 상담을 요청하세요.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/contact"
            className="relative inline-flex items-center justify-center gap-2 h-13 px-7 py-4 rounded-full bg-[color:var(--gold-warm)] hover:bg-[color:var(--gold-warm-deep)] text-white font-semibold text-[15px] shadow-sm transition-colors no-underline overflow-hidden"
          >
            <AnimatedBorder duration={3} dotSize={70} color="rgba(255,255,255,0.95)" />
            <MessageCircle className="w-4 h-4 relative" />
            <span className="relative">온라인 상담 신청</span>
            <ArrowRight className="w-4 h-4 ml-1 relative" />
          </Link>
          <a
            href={`tel:${phoneNumber}`}
            className="inline-flex items-center justify-center gap-2 h-13 px-7 py-4 rounded-full bg-white border border-[color:var(--gold-warm)] text-[color:var(--gold-warm-deep)] hover:bg-[color:var(--gold-warm)]/10 font-semibold text-[15px] transition-colors no-underline"
          >
            <Phone className="w-4 h-4" />
            {phoneNumber} 전화상담
          </a>
        </div>
      </div>
    </section>
  );
}
