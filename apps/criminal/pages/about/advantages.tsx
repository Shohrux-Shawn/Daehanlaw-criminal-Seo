import React from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { SeoHead } from '@daehanlaw/ui';
import { SITE_CONFIG } from '@/site.config';
import { useInView } from '@/lib/hooks/useInView';
import PageHero from '@/components/ui/PageHero';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

/* ── Data ─────────────────────────────────────────────────────────────────── */

const STRENGTHS = [
  {
    title: '인적역량',
    subtitle: '형사·민사·행정 전 분야를 아우르는 검증된 전문 변호사팀',
    items: [
      '형사 전문 변호사 15+',
      '사건별 1~15인 TF 조력',
      '형사·민사·행정 통합 대응',
      '특별수행본부·송무관리본부 운영',
      '월간 형사사건 수임 200+',
    ],
    note: '* 법무법인 대한중앙 형사전문센터 기준',
    src: '/group/KakaoTalk_20260324_165601027_01.jpg',
  },
  {
    title: '사건 처리 시스템',
    subtitle: '풍부한 사건 경험과 AI 시스템으로 완성도 높은 1:1 맞춤 대응',
    items: [
      '1:1 비밀 상담 보장',
      '상담변호사의 정확한 사건 진단',
      '사건 담당 변호사와 2차 심층상담',
      '원팀으로 사건 대응',
      'AI 기술 활용 전략 수립·유사판례 분석',
    ],
    src: '/group/KakaoTalk_20260324_165601027_13.jpg',
  },
  {
    title: '고객 중심 운영',
    subtitle: '수사·재판 단계별로 의뢰인의 상황을 내 것처럼 철저히 파악',
    items: [
      '수사·재판·항소심 단계별 전문 대응',
      '의뢰인 정보 완벽 보호',
      '365일 24시간 상담 접수',
      '이중 보증제(성무품질·회원 보증)',
      '실시간 온라인 소통',
    ],
    src: '/group/KakaoTalk_20260324_165601027_14.jpg',
  },
  {
    title: '전문 대응 인프라',
    subtitle: '언론과 방송이 검증한 대한중앙의 전문성과 신뢰',
    items: [
      '주요 방송·언론 출연 검증',
      '디지털포렌식·증거 분석',
      '신변보호·맞춤형 경호계획',
      '심리상담 & 심리치료 연계',
      '데이터 기반 양형 분석',
    ],
    src: '/group/KakaoTalk_20260324_165601027_20.jpg',
  },
];

/* ── Page ─────────────────────────────────────────────────────────────────── */

export default function AdvantagesPage() {
  const [introRef,    introInView]    = useInView();
  const [strengthRef, strengthInView] = useInView();

  return (
    <>
      <SeoHead
        config={SITE_CONFIG}
        title="대한중앙의 강점 | 대한중앙 형사전문센터"
        description="법무법인 대한중앙 형사전문센터는 매순간 고객만 생각합니다. 인적역량, 사건처리 시스템, 고객 중심 운영, 전문 대응 인프라를 소개합니다."
        canonicalPath="/about/advantages"
      />
      <Layout>

        {/* ── Hero ──────────────────────────────────────────────────────── */}
        <PageHero
          crumbs={[
            { label: '⌂', href: '/' },
            { label: '그룹소개', href: '/about' },
            { label: '대한중앙의 강점' },
          ]}
          title={
            <>
              법무법인 대한중앙은 매순간{' '}
              <em className="not-italic text-gold-500">&apos;고객만&apos;</em>
              {' '}생각합니다
            </>
          }
          label="Our Advantage"
          backgroundImage="/back.jpg"
        />

        {/* ── Intro ─────────────────────────────────────────────────────── */}
        <section
          ref={introRef as React.RefObject<HTMLElement>}
          className={`py-20 bg-white transition-all duration-700 ${
            introInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

              {/* Left: text */}
              <div className="flex flex-col gap-6 order-2 lg:order-1">
                <div className="w-10 h-1 bg-gold-400 rounded-full" />
                <p className="text-base text-gray-700 leading-relaxed" style={{ letterSpacing: '-0.25px' }}>
                  법무법인 대한중앙 형사전문센터는 글로벌 로펌 수준의 선진 시스템을 바탕으로,{' '}
                  <strong className="font-semibold text-gray-900">누구나 신뢰할 수 있는 형사 법률 서비스</strong>를 제공합니다.
                </p>
                <p className="text-base text-gray-700 leading-relaxed" style={{ letterSpacing: '-0.25px' }}>
                  대한중앙의 핵심은 탄탄한 인적 역량과 안정적인 시스템을 기반으로{' '}
                  <strong className="font-semibold text-gray-900">고객에게 끝까지 책임지는 법률 서비스를 제공하는 데</strong> 있습니다.
                  여기에 <strong className="font-semibold text-gray-900">IT·AI 기반 업무 프로세스</strong>를 접목하여 사건 처리의 정확성과 대응 속도를 한층 더 강화했습니다.
                </p>
                <p className="text-base text-gray-700 leading-relaxed" style={{ letterSpacing: '-0.25px' }}>
                  각 사건마다 다수의 변호사가 함께 전략을 수립하고, 유사 판례를 체계적으로 분석하며,
                  협상·조정·소송까지 유기적으로 대응하는{' '}
                  <strong className="font-semibold text-gray-900">&apos;원팀(One-Team)&apos;</strong> 시스템으로 움직입니다.
                </p>
                <p className="text-base text-gray-700 leading-relaxed" style={{ letterSpacing: '-0.25px' }}>
                  형사 사건이라는 중요한 순간, 대한중앙은{' '}
                  <strong className="font-semibold text-gray-900">고객의 입장에서 끝까지 함께하는 든든한 동행자</strong>가 되겠습니다.
                </p>
              </div>

              {/* Right: image */}
              <div className="order-1 lg:order-2">
                <img
                  src="/hero.png"
                  alt="대한중앙의 강점"
                  className="w-full h-auto object-cover rounded-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── Strengths grid ────────────────────────────────────────────── */}
        <section
          ref={strengthRef as React.RefObject<HTMLElement>}
          className={`py-16 sm:py-24 bg-gray-50 transition-all duration-700 ${
            strengthInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="text-center mb-12">
              <p className="text-[11px] font-semibold uppercase mb-3 text-navy-700" style={{ letterSpacing: '0.12em' }}>
                Why Daehan
              </p>
              <h2 className="text-[22px] sm:text-[28px] font-black text-gray-900" style={{ letterSpacing: '-0.5px' }}>
                법무법인 대한중앙의 4가지 강점
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {STRENGTHS.map(s => (
                <Card
                  key={s.title}
                  className="group flex flex-col overflow-hidden border-0 hover:-translate-y-1 hover:shadow-md transition-all duration-300"
                >
                  <div className="w-full bg-gray-100">
                    <img
                      src={s.src}
                      alt={s.title}
                      className="w-full h-auto object-contain block"
                    />
                  </div>

                  <CardContent className="p-5 pt-5 flex flex-col flex-1">
                    <h3 className="text-[16px] font-black text-gray-900 mb-1 tracking-[-0.3px]">
                      {s.title}
                    </h3>
                    <p className="text-[12px] text-muted-foreground leading-snug mb-4">{s.subtitle}</p>

                    <Separator className="w-7 h-px mb-4 bg-gold-400" />

                    <ul className="space-y-2 flex-1 mb-4">
                      {s.items.map(item => (
                        <li key={item} className="flex items-start gap-2 text-[12px] text-gray-600 leading-snug">
                          <svg className="w-3 h-3 mt-0.5 flex-shrink-0 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                          </svg>
                          {item}
                        </li>
                      ))}
                      {s.note && <li className="text-[11px] text-gray-400 pt-1 pl-5">{s.note}</li>}
                    </ul>

                    <div className="flex items-center gap-1.5 mt-auto pt-3 border-t border-border">
                      <span className="text-[12px] font-semibold text-navy-700">자세히 보기</span>
                      <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200 text-navy-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                      </svg>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA banner ────────────────────────────────────────────────── */}
        <div
          className="relative overflow-hidden"
          style={{ background: 'linear-gradient(105deg, #0d1629 0%, #1a2e4a 55%, #1e3a6e 100%)', minHeight: 220 }}
        >
          <div
            className="absolute inset-0 opacity-[0.07] pointer-events-none"
            style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }}
          />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 flex flex-col sm:flex-row items-center justify-between gap-8">
            <div>
              <p className="text-[12px] sm:text-[13px] font-medium text-white/60 mb-2" style={{ letterSpacing: '0.06em' }}>
                대한중앙과 함께하세요.
              </p>
              <h3 className="text-[22px] sm:text-[28px] lg:text-[34px] font-black text-white leading-tight" style={{ letterSpacing: '-0.5px' }}>
                당신을 위한{' '}
                <span className="text-gold-300">형사 전문 법률서비스</span>가
                <br className="hidden sm:block" />
                {' '}준비되어 있습니다
              </h3>
            </div>
            <Link
              href="/contact"
              className="flex-shrink-0 inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white font-bold text-[14px] hover:bg-gold-50 hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg shadow-black/20 no-underline text-navy-900"
              style={{ letterSpacing: '-0.25px' }}
            >
              전문 변호사 상담예약
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>
        </div>

      </Layout>
    </>
  );
}
