/**
 * Advantages page sections — layout structure inspired by the
 * "LegalSense" Webflow Cloneable by DesignComet
 * (https://webflow.com — public cloneable). Layout patterns only;
 * all copy and assets are original to 대한중앙 형사전문센터.
 */
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, Quote, ShieldCheck, Gavel, Scale } from 'lucide-react';
import { HandWrittenTitle } from '@/components/ui/hand-writing-text';
import { GlowCard } from '@/components/ui/spotlight-card';

/* ============================================================
 * 1. HERO — split L/R
 * ============================================================ */
function AdvHero() {
  return (
    <section className="bg-[color:var(--cream-page)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16 sm:py-24 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <p className="eyebrow mb-4">Our Advantages</p>
            <h1 className="heading-xl mb-6">
              대한중앙의<br />
              형사 변호 강점
            </h1>
            <p className="text-[16px] sm:text-[17px] text-[color:var(--ink-muted)] leading-relaxed mb-8 max-w-xl">
              조사 동석부터 항소심까지, 의뢰인 한 분 한 분의 사건을 처음부터 끝까지 책임지는 형사 전담 변호사 팀의 차별화된 변호 방식을 소개합니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full bg-[color:var(--gold-warm)] hover:bg-[color:var(--gold-warm-deep)] text-white font-semibold text-[15px] transition-colors no-underline"
              >
                상담 신청 <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/attorneys"
                className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full bg-white border border-[color:var(--gold-warm)] text-[color:var(--gold-warm-deep)] hover:bg-[color:var(--gold-warm)]/10 font-semibold text-[15px] transition-colors no-underline"
              >
                더 알아보기
              </Link>
            </div>
          </div>
          <div className="relative aspect-[5/4] rounded-3xl overflow-hidden bg-[color:var(--cream-section)] shadow-[0_24px_64px_rgba(60,40,20,0.12)]">
            <img src="/back.png" alt="대한중앙 형사전문센터 변호사 상담 장면" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
 * 2. QUOTE banner
 * ============================================================ */
function AdvQuote() {
  return (
    <section className="bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 py-20 sm:py-24 text-center">
        <Quote className="w-10 h-10 mx-auto mb-6 text-[color:var(--gold-warm)]" strokeWidth={1.5} />
        <p className="text-[20px] sm:text-[24px] font-bold tracking-tight text-[color:var(--ink-strong)] leading-relaxed">
          “수사 첫 호출부터 1심 선고일까지, 어느 한 단계도 혼자가 되지 않았습니다.
          대한중앙의 변호인은 늘 한 발 앞서 준비해 주었습니다.”
        </p>
        <p className="mt-6 text-[14px] text-[color:var(--ink-muted)] font-medium">— 의뢰인 김 OO</p>
      </div>
    </section>
  );
}

/* ============================================================
 * 3. VALUE PROP — image left, text right
 * ============================================================ */
function AdvValueProp() {
  return (
    <section className="bg-[color:var(--cream-section)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-20 sm:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-white">
            <img src="/hero.png" alt="대한중앙 형사 전문 변호인 팀" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="eyebrow mb-4">Always on your side</p>
            <h2 className="heading-lg mb-6">
              변호인은 의뢰인의 곁에서<br />
              <span className="text-[color:var(--gold-warm-deep)]">단 한 걸음도 비켜서지 않습니다</span>
            </h2>
            <p className="text-[15px] sm:text-[16px] text-[color:var(--ink-muted)] leading-relaxed mb-6">
              경찰·검찰 조사 동석, 구속영장 실질심사, 공판 변론, 항소·상고심까지 — 한 사건의 모든 단계에 같은 변호사가 끝까지 함께합니다. 의뢰인은 매번 사건을 다시 설명할 필요가 없습니다.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-[15px] font-semibold text-[color:var(--gold-warm-deep)] hover:text-[color:var(--ink-strong)] no-underline"
            >
              변호 절차 자세히 보기 <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
 * 4. STATS — 3 columns
 * ============================================================ */
function AdvStats() {
  const stats = [
    { value: '1,200+', label: '누적 형사 변호 사건' },
    { value: '96%',    label: '의뢰인 만족도' },
    { value: '24시',   label: '긴급 상담 응대 체계' },
  ];
  return (
    <section className="bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 py-20 sm:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-12 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-[44px] sm:text-[56px] lg:text-[64px] font-black tracking-[-0.04em] text-[color:var(--ink-strong)]">
                {s.value}
              </p>
              <p className="mt-3 text-[14px] sm:text-[15px] text-[color:var(--ink-muted)] font-semibold">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
 * 5. SERVICES — carousel of 3 cards with arrow nav
 * ============================================================ */
const SERVICE_CARDS = [
  {
    Icon: ShieldCheck,
    title: '수사 단계 동행 변호',
    body: '경찰·검찰 조사에 변호인이 직접 동석해 진술 전 시뮬레이션부터 조사 후 의견서 제출까지 책임집니다.',
    img: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=900&auto=format&fit=crop',
  },
  {
    Icon: Gavel,
    title: '공판 단계 변론',
    body: '증거 검토, 증인신문, 양형 자료 수집까지 — 1심 판결을 좌우하는 모든 변론 활동을 전담 변호사가 진행합니다.',
    img: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=900&auto=format&fit=crop',
  },
  {
    Icon: Scale,
    title: '항소·상고심 변호',
    body: '1심 판결의 법리 오해와 양형 부당을 정밀하게 분석해 항소심·대법원에서 새로운 결과를 만들어냅니다.',
    img: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=900&auto=format&fit=crop',
  },
];

function AdvServices() {
  const [idx, setIdx] = useState(0);
  const total = SERVICE_CARDS.length;
  const prev = () => setIdx((i) => (i - 1 + total) % total);
  const next = () => setIdx((i) => (i + 1) % total);

  return (
    <section className="bg-[color:var(--cream-section)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-20 sm:py-28">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="eyebrow mb-3">Practice Stages</p>
            <h2 className="heading-lg">단계별 형사 변호</h2>
          </div>
          <div className="flex gap-3">
            <button
              onClick={prev}
              aria-label="이전"
              className="w-11 h-11 rounded-full bg-white border border-[color:var(--gold-warm)]/40 text-[color:var(--gold-warm-deep)] hover:bg-[color:var(--gold-warm)] hover:text-white hover:border-[color:var(--gold-warm)] transition-colors flex items-center justify-center"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={next}
              aria-label="다음"
              className="w-11 h-11 rounded-full bg-white border border-[color:var(--gold-warm)]/40 text-[color:var(--gold-warm-deep)] hover:bg-[color:var(--gold-warm)] hover:text-white hover:border-[color:var(--gold-warm)] transition-colors flex items-center justify-center"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {SERVICE_CARDS.map((card, i) => {
            const Icon = card.Icon;
            const isActive = i === idx;
            return (
              <GlowCard
                key={card.title}
                customSize
                glowColor="warm"
                className={`group flex flex-col bg-white overflow-hidden shadow-[0_8px_30px_rgba(60,40,20,0.06)] transition-shadow duration-300 ${
                  isActive ? 'md:shadow-[0_16px_40px_rgba(60,40,20,0.12)]' : ''
                }`}
              >
                <div className="aspect-[5/3] overflow-hidden bg-[color:var(--cream-section)]">
                  <img
                    src={card.img}
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 sm:p-7 flex-1 flex flex-col">
                  <div className="w-10 h-10 rounded-full bg-[color:var(--cream-section)] flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-[color:var(--gold-warm-deep)]" strokeWidth={2} />
                  </div>
                  <h3 className="text-[17px] sm:text-[18px] font-extrabold text-[color:var(--ink-strong)] tracking-tight mb-3">
                    {card.title}
                  </h3>
                  <p className="text-[13.5px] text-[color:var(--ink-muted)] leading-relaxed flex-1">
                    {card.body}
                  </p>
                </div>
              </GlowCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
 * 6. BESPOKE — text left, image right
 * ============================================================ */
function AdvBespoke() {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-20 sm:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <p className="eyebrow mb-4">Bespoke Defense</p>
            <h2 className="heading-lg mb-6">
              모든 사건은 처음부터<br />
              <span className="text-[color:var(--gold-warm-deep)]">새롭게 설계됩니다</span>
            </h2>
            <p className="text-[15px] sm:text-[16px] text-[color:var(--ink-muted)] leading-relaxed mb-5">
              두 건의 사건이 똑같이 흘러가는 경우는 없습니다. 사실관계, 증거의 흐름, 의뢰인의 진술 의도, 수사기관의 시각까지 — 변호 전략은 사건마다 처음부터 다시 설계되어야 합니다.
            </p>
            <p className="text-[15px] sm:text-[16px] text-[color:var(--ink-muted)] leading-relaxed mb-6">
              대한중앙은 정형화된 변호 매뉴얼 대신 의뢰인 한 분을 위한 단 하나의 전략을 짜냅니다.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-[15px] font-semibold text-[color:var(--gold-warm-deep)] hover:text-[color:var(--ink-strong)] no-underline"
            >
              상담 요청하기 <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-[color:var(--cream-section)]">
            <img
              src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1200&auto=format&fit=crop"
              alt="형사 변호 전략 설계"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
 * 7. DRIVE — text left, image right (zigzag with #6 visually feels like 2 stacked stories)
 * ============================================================ */
function AdvDrive() {
  return (
    <section className="bg-[color:var(--cream-page)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-20 sm:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="lg:order-2">
            <p className="eyebrow mb-4">Continuous Improvement</p>
            <h2 className="heading-lg mb-6">
              매월 판례를 분석하고<br />
              <span className="text-[color:var(--gold-warm-deep)]">매주 사건을 복기합니다</span>
            </h2>
            <p className="text-[15px] sm:text-[16px] text-[color:var(--ink-muted)] leading-relaxed mb-5">
              형사법은 살아 움직입니다. 새 판례, 변경된 양형기준, 디지털 증거의 새로운 해석 — 어느 하나라도 놓치면 의뢰인의 결과가 달라집니다.
            </p>
            <p className="text-[15px] sm:text-[16px] text-[color:var(--ink-muted)] leading-relaxed mb-6">
              대한중앙의 변호인들은 매주 사건을 복기하고 매월 주요 판례를 함께 분석합니다. 최신의 법리를 가장 먼저 적용하기 위해서입니다.
            </p>
            <Link
              href="/attorneys"
              className="inline-flex items-center gap-2 text-[15px] font-semibold text-[color:var(--gold-warm-deep)] hover:text-[color:var(--ink-strong)] no-underline"
            >
              변호사 약력 보기 <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-[color:var(--cream-section)] lg:order-1">
            <img
              src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1200&auto=format&fit=crop"
              alt="판례 분석과 사건 복기"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
 * 8. ARTICLES — 3-col grid (date + image + excerpt)
 * ============================================================ */
const STATIC_ARTICLES = [
  {
    date: '2026.05.18',
    title: '구속영장 발부 통보를 받았을 때, 첫 24시간 안에 해야 할 일',
    excerpt: '구속영장 실질심사를 앞두고 의뢰인이 가장 먼저 검토해야 할 4가지 사항을 정리했습니다.',
    img: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=900&auto=format&fit=crop',
  },
  {
    date: '2026.05.12',
    title: '경찰조사 출석 전, 변호인이 함께 점검하는 5가지',
    excerpt: '진술 한 줄이 사건 전체의 방향을 바꿉니다. 조사 전 변호인과 점검해야 할 핵심 항목입니다.',
    img: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=900&auto=format&fit=crop',
  },
  {
    date: '2026.05.04',
    title: '디지털 포렌식 증거, 그 한계와 반박 가능성',
    excerpt: '수사기관의 포렌식 결과는 절대적이지 않습니다. 변호인이 다시 확인하는 절차적 쟁점을 살펴봅니다.',
    img: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=900&auto=format&fit=crop',
  },
];

function AdvArticles() {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-20 sm:py-28">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="eyebrow mb-3">Articles</p>
            <h2 className="heading-lg">형사 법률정보</h2>
          </div>
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-[14px] font-semibold text-[color:var(--gold-warm-deep)] hover:text-[color:var(--ink-strong)] no-underline whitespace-nowrap"
          >
            전체 글 보기 <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STATIC_ARTICLES.map((a) => (
            <GlowCard key={a.title} customSize glowColor="warm" className="bg-white hover:shadow-[0_16px_40px_rgba(60,40,20,0.12)] transition-shadow overflow-hidden">
            <Link
              href="/articles"
              className="group flex flex-col no-underline h-full"
            >
              <div className="aspect-[16/10] overflow-hidden bg-[color:var(--cream-section)]">
                <img
                  src={a.img}
                  alt={a.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 sm:p-7 flex-1 flex flex-col">
                <p className="text-[12px] font-semibold text-[color:var(--gold-warm-deep)] mb-3">{a.date}</p>
                <h3 className="text-[16px] sm:text-[17px] font-extrabold text-[color:var(--ink-strong)] tracking-tight leading-snug mb-3 line-clamp-2 group-hover:text-[color:var(--gold-warm-deep)] transition-colors">
                  {a.title}
                </h3>
                <p className="text-[13px] text-[color:var(--ink-muted)] leading-relaxed line-clamp-3 flex-1">
                  {a.excerpt}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[color:var(--gold-warm-deep)]">
                  자세히 읽기 <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
 * 9. SIGNATURE — animated hand-written firm name (closing flourish)
 * ============================================================ */
function AdvSignature() {
  return (
    <section>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16">
        <div className="text-[color:var(--ink-strong)]">
          <HandWrittenTitle
            title="법무법인 대한중앙"
            subtitle="당신의 가장 가까운 형사 조력자"
            className="text-[color:var(--gold-warm-deep)]"
            logo={
              <img
                src="/favicon2.png"
                alt="법무법인 대한중앙 로고"
                className="h-20 sm:h-24 w-auto object-contain drop-shadow-[0_6px_18px_rgba(60,40,20,0.18)]"
              />
            }
          />
        </div>
      </div>
    </section>
  );
}

/* ============================================================
 * Composed export
 * ============================================================ */
export default function AdvantagesSections() {
  return (
    <>
      <AdvHero />
      <AdvQuote />
      <AdvValueProp />
      <AdvStats />
      <AdvServices />
      <AdvBespoke />
      <AdvDrive />
      <AdvArticles />
      <AdvSignature />
    </>
  );
}
