import React from 'react';
import Layout from '@/components/Layout';
import { SeoHead } from '@daehanlaw/ui';
import { SITE_CONFIG } from '@/site.config';
import {
  MapPin, Phone, Mail, Clock, Train, Footprints, Building2, Compass,
  Landmark, Scale, Gavel, MessageCircle, Navigation, ArrowRight,
} from 'lucide-react';
import { GlowCard } from '@/components/ui/spotlight-card';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';

const ADDR_LINE_1 = '부산광역시 해운대구';
const ADDR_LINE_2 = '해운대로 554';
const ADDR_LINE_3 = '라온제이빌딩 7층';
const ADDR_FULL = `${ADDR_LINE_1} ${ADDR_LINE_2} ${ADDR_LINE_3}`;
const NAVER_QUERY = encodeURIComponent('부산 해운대구 해운대로 554 라온제이빌딩 7층');

/* ============================================================
 * 1. TYPOGRAPHIC HERO — address as massive design element
 * ============================================================ */
function HeroAddress() {
  return (
    <section className="relative overflow-hidden bg-[color:var(--cream-page)]">
      {/* faint map-grid texture */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.08]"
        style={{
          backgroundImage:
            'linear-gradient(to right, var(--ink-strong) 1px, transparent 1px), linear-gradient(to bottom, var(--ink-strong) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      {/* gold radial glow */}
      <div
        aria-hidden
        className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-25 pointer-events-none"
        style={{ background: 'radial-gradient(circle, var(--gold-warm) 0%, transparent 65%)' }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-20 sm:py-28 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          {/* Left — massive address */}
          <div className="lg:col-span-8">
            <p className="eyebrow mb-6">Location · 오시는 길</p>
            <h1 className="text-[40px] sm:text-[64px] lg:text-[88px] font-black leading-[1.02] tracking-[-0.04em] text-[color:var(--ink-strong)]">
              {ADDR_LINE_1},
              <br />
              <span className="text-[color:var(--gold-warm-deep)]">{ADDR_LINE_2}</span>
              <br />
              {ADDR_LINE_3}
            </h1>
            <p className="mt-8 text-[15px] sm:text-[17px] text-[color:var(--ink-muted)] leading-relaxed max-w-xl">
              부산 해운대 한복판, 부산지방법원·검찰청과 가까운 거리에 위치합니다.
              구속·체포 등 긴급한 상황에도 의뢰인이 가장 빠르게 닿을 수 있는 자리입니다.
            </p>
          </div>

          {/* Right — meta info card */}
          <div className="lg:col-span-4">
            <div className="bg-white border border-[color:var(--cream-section)] rounded-3xl p-7 shadow-[0_24px_60px_rgba(60,40,20,0.08)]">
              <div className="flex items-start gap-3 pb-5 border-b border-[color:var(--cream-section)]">
                <Building2 className="w-5 h-5 mt-0.5 text-[color:var(--gold-warm-deep)]" strokeWidth={2} />
                <div>
                  <p className="text-[12px] font-semibold tracking-[0.1em] uppercase text-[color:var(--gold-warm-deep)] mb-1">Office</p>
                  <p className="text-[14px] font-bold text-[color:var(--ink-strong)]">법무법인 대한중앙 부산사무소</p>
                </div>
              </div>
              <div className="flex items-start gap-3 py-5 border-b border-[color:var(--cream-section)]">
                <Phone className="w-5 h-5 mt-0.5 text-[color:var(--gold-warm-deep)]" strokeWidth={2} />
                <div>
                  <p className="text-[12px] font-semibold tracking-[0.1em] uppercase text-[color:var(--gold-warm-deep)] mb-1">Phone</p>
                  <a href={`tel:${SITE_CONFIG.phoneNumber}`} className="text-[14px] font-bold text-[color:var(--ink-strong)] hover:underline no-underline">
                    {SITE_CONFIG.phoneNumber}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3 py-5 border-b border-[color:var(--cream-section)]">
                <Mail className="w-5 h-5 mt-0.5 text-[color:var(--gold-warm-deep)]" strokeWidth={2} />
                <div>
                  <p className="text-[12px] font-semibold tracking-[0.1em] uppercase text-[color:var(--gold-warm-deep)] mb-1">Email</p>
                  <p className="text-[14px] font-bold text-[color:var(--ink-strong)] break-all">hanbyungchul@naver.com</p>
                </div>
              </div>
              <div className="flex items-start gap-3 pt-5">
                <Clock className="w-5 h-5 mt-0.5 text-[color:var(--gold-warm-deep)]" strokeWidth={2} />
                <div>
                  <p className="text-[12px] font-semibold tracking-[0.1em] uppercase text-[color:var(--gold-warm-deep)] mb-1">Hours</p>
                  <p className="text-[14px] font-bold text-[color:var(--ink-strong)]">365일 24시간 상담 접수</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
 * 2. PHOTO + MAP — asymmetric split
 * ============================================================ */
function PhotoMap() {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-20 sm:py-28">
        {/* Map — full width */}
        <div className="relative rounded-3xl overflow-hidden border border-[color:var(--cream-section)] shadow-[0_24px_60px_rgba(60,40,20,0.08)]">
          <iframe
            src="https://map.naver.com/p/entry/place/37098275?c=15.00,0,0,0,dh"
            className="w-full h-[480px] sm:h-[560px] lg:h-[640px] border-0 block"
            loading="lazy"
            title="법무법인 대한중앙 부산사무소 위치"
          />
        </div>

        {/* Action row */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 bg-[color:var(--cream-page)] rounded-2xl px-6 py-5">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-full bg-[color:var(--gold-warm)] flex items-center justify-center flex-shrink-0">
              <MapPin size={16} className="text-white" />
            </div>
            <p className="text-[14px] font-bold text-[color:var(--ink-strong)] truncate">{ADDR_FULL}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <a
              href={`tel:${SITE_CONFIG.phoneNumber}`}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-[13px] font-semibold text-[color:var(--ink-strong)] bg-white border border-[color:var(--cream-section)] rounded-full hover:border-[color:var(--gold-warm)] transition-colors no-underline"
            >
              <Phone size={13} /> 전화
            </a>
            <a
              href={`https://map.naver.com/v5/search/${NAVER_QUERY}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-[13px] font-semibold text-white rounded-full transition-colors no-underline"
              style={{ background: '#03c75a' }}
            >
              <Navigation size={13} /> 네이버 길찾기
            </a>
            <a
              href={`https://maps.google.com/?q=${NAVER_QUERY}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-[13px] font-semibold text-[color:var(--ink-strong)] bg-white border border-[color:var(--cream-section)] rounded-full hover:border-[color:var(--gold-warm)] transition-colors no-underline"
            >
              <Compass size={13} /> 구글 지도
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
 * 3. WAYFINDING JOURNEY — 4 illustrated steps
 * ============================================================ */
const STEPS = [
  { Icon: Train,       label: '지하철 2호선',    title: '동백역 1번 출구',   sub: '도착 즉시 안내' },
  { Icon: Footprints,  label: '도보 5분',         title: '해운대로 방면',     sub: '약 350m · 신호등 1회' },
  { Icon: Building2,   label: '도착',             title: '라온제이빌딩',       sub: '1층 안내데스크에서 호명' },
  { Icon: ArrowRight,  label: '엘리베이터',       title: '7층 사무소',         sub: '엘리베이터에서 7층 선택' },
];

function Wayfinding() {
  return (
    <section className="bg-[color:var(--cream-section)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-20 sm:py-28">
        <div className="text-center mb-12 sm:mb-14">
          <p className="eyebrow mb-3">Wayfinding</p>
          <h2 className="heading-lg">
            지하철에서 사무소까지<br className="sm:hidden" /> 단 4단계
          </h2>
          <p className="mt-4 text-[15px] text-[color:var(--ink-muted)] leading-relaxed max-w-2xl mx-auto">
            처음 오시는 분도 헤매지 않도록, 역에서 사무소까지의 길을 단계별로 안내해 드립니다.
          </p>
        </div>

        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* connector line (desktop only) */}
          <div
            aria-hidden
            className="hidden lg:block absolute top-[44px] left-[12%] right-[12%] h-px"
            style={{
              background: 'repeating-linear-gradient(to right, var(--gold-warm) 0, var(--gold-warm) 6px, transparent 6px, transparent 14px)',
            }}
          />

          {STEPS.map((s, i) => {
            const Icon = s.Icon;
            return (
              <GlowCard key={s.title} customSize glowColor="warm" className="relative bg-white p-6 sm:p-7 shadow-[0_8px_30px_rgba(60,40,20,0.05)]">
                <div className="absolute -top-3 left-7 bg-[color:var(--gold-warm)] text-white text-[11px] font-black tracking-wider px-3 py-1 rounded-full">
                  STEP {String(i + 1).padStart(2, '0')}
                </div>
                <div className="w-16 h-16 rounded-2xl bg-[color:var(--cream-page)] flex items-center justify-center mb-5 mt-2">
                  <Icon className="w-7 h-7 text-[color:var(--gold-warm-deep)]" strokeWidth={1.8} />
                </div>
                <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-[color:var(--gold-warm-deep)] mb-1.5">
                  {s.label}
                </p>
                <h3 className="text-[17px] font-extrabold text-[color:var(--ink-strong)] tracking-tight mb-2">
                  {s.title}
                </h3>
                <p className="text-[13px] text-[color:var(--ink-muted)] leading-relaxed">
                  {s.sub}
                </p>
              </GlowCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
 * 4. NEARBY LEGAL LANDMARKS — criminal-law differentiator
 * ============================================================ */
const LANDMARKS = [
  { Icon: Landmark, name: '부산지방법원',   dist: '약 5.2km',  note: '항소·상고심 변론 출입' },
  { Icon: Scale,    name: '부산지방검찰청', dist: '약 4.8km',  note: '검찰조사 동행 가능 거리' },
  { Icon: Gavel,    name: '해운대경찰서',    dist: '약 1.1km',  note: '체포·구속 시 즉시 출동' },
  { Icon: Building2, name: '동부지원·동부지청', dist: '약 6.4km', note: '동부 관할 사건 대응' },
];

function NearbyLandmarks() {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-20 sm:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-3">Why this location</p>
            <h2 className="heading-lg mb-6">
              주요 사법기관과<br />
              <span className="text-[color:var(--gold-warm-deep)]">가까이 있는 자리</span>
            </h2>
            <p className="text-[15px] text-[color:var(--ink-muted)] leading-relaxed mb-4">
              형사 사건은 시간과의 싸움입니다. 사무소 위치를 정할 때 가장 먼저 고려한 것은
              <strong className="text-[color:var(--ink-strong)]"> &lsquo;수사기관과의 거리&rsquo;</strong>였습니다.
            </p>
            <p className="text-[15px] text-[color:var(--ink-muted)] leading-relaxed">
              조사 동행, 영장 실질심사, 공판 출석까지 변호인이 즉시 움직일 수 있는 거리에 있어야 의뢰인의 결과가 달라집니다.
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="space-y-3">
              {LANDMARKS.map((l) => {
                const Icon = l.Icon;
                return (
                  <GlowCard
                    key={l.name}
                    customSize
                    glowColor="warm"
                    className="group flex items-center justify-between gap-4 p-5 sm:p-6 bg-[color:var(--cream-page)] transition-colors"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-[0_4px_12px_rgba(60,40,20,0.06)]">
                        <Icon className="w-5 h-5 text-[color:var(--gold-warm-deep)]" strokeWidth={2} />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-[16px] font-extrabold text-[color:var(--ink-strong)] tracking-tight truncate">{l.name}</h3>
                        <p className="text-[12.5px] text-[color:var(--ink-muted)] mt-0.5">{l.note}</p>
                      </div>
                    </div>
                    <span className="flex-shrink-0 text-[13px] font-bold text-[color:var(--gold-warm-deep)] tabular-nums">{l.dist}</span>
                  </GlowCard>
                );
              })}
            </div>
            <p className="mt-4 text-[12px] text-[color:var(--ink-muted)]/70">* 직선 거리 기준 · 실제 이동 시간은 교통 상황에 따라 다를 수 있습니다</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
 * 5. MULTI-CHANNEL CONTACT — phone / online / kakao / visit
 * ============================================================ */
const CHANNELS = [
  { Icon: Phone,          label: '전화 상담',     desc: '평일·휴일 24시간 연결',                 cta: '바로 걸기',          href: `tel:${SITE_CONFIG.phoneNumber}` },
  { Icon: MessageCircle,  label: '온라인 상담',   desc: '사건 개요를 미리 정리해 보내주세요',  cta: '온라인 폼 열기',      href: '/contact' },
  { Icon: Mail,           label: '이메일',         desc: '자료가 많은 사건은 이메일이 빠릅니다', cta: '메일 보내기',         href: 'mailto:hanbyungchul@naver.com' },
  { Icon: MapPin,         label: '직접 방문',     desc: '예약 후 사무소에서 대면 상담',         cta: '예약 페이지로',      href: '/contact' },
];

function ContactChannels() {
  return (
    <section className="bg-[color:var(--cream-section)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-20 sm:py-28">
        <div className="text-center mb-12">
          <p className="eyebrow mb-3">Reach Us</p>
          <h2 className="heading-lg">
            가장 편한 방법으로<br className="sm:hidden" /> 연락 주세요
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CHANNELS.map(({ Icon, label, desc, cta, href }) => (
            <GlowCard key={label} customSize glowColor="warm" className="bg-white hover:shadow-[0_16px_40px_rgba(60,40,20,0.10)] transition-shadow">
              <a
                href={href}
                {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="group flex flex-col p-7 no-underline h-full"
              >
                <div className="w-12 h-12 rounded-2xl bg-[color:var(--cream-page)] group-hover:bg-[color:var(--gold-warm)] flex items-center justify-center mb-5 transition-colors">
                  <Icon className="w-5 h-5 text-[color:var(--gold-warm-deep)] group-hover:text-white transition-colors" strokeWidth={2} />
                </div>
                <h3 className="text-[16px] font-extrabold text-[color:var(--ink-strong)] tracking-tight mb-2">{label}</h3>
                <p className="text-[13px] text-[color:var(--ink-muted)] leading-relaxed flex-1 mb-5">{desc}</p>
                <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[color:var(--gold-warm-deep)]">
                  {cta} <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </a>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
 * 6. 24H AVAILABILITY CTA
 * ============================================================ */
function CtaBanner() {
  return (
    <section className="relative overflow-hidden bg-[color:var(--ink-strong)] text-white">
      <div
        aria-hidden
        className="absolute -right-32 -top-32 w-[500px] h-[500px] rounded-full opacity-25 pointer-events-none"
        style={{ background: 'radial-gradient(circle, var(--gold-warm) 0%, transparent 70%)' }}
      />
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-12 py-20 sm:py-24 text-center">
        <Clock className="w-10 h-10 mx-auto mb-5 text-[color:var(--gold-warm)]" strokeWidth={1.5} />
        <h2 className="text-[28px] sm:text-[36px] font-black tracking-[-0.03em] leading-[1.2] mb-4">
          방문이 어려운 시간에도<br />
          전화 한 통이면 변호인이 움직입니다
        </h2>
        <p className="text-[14px] sm:text-[16px] text-white/70 leading-relaxed max-w-2xl mx-auto mb-8">
          새벽, 휴일, 출장 중 — 어떤 상황에서든 24시간 긴급 상담 라인은 연결됩니다.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={`tel:${SITE_CONFIG.phoneNumber}`}
            className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full bg-[color:var(--gold-warm)] hover:bg-[color:var(--gold-warm-deep)] text-white font-semibold text-[15px] transition-colors no-underline"
          >
            <Phone className="w-4 h-4" /> {SITE_CONFIG.phoneNumber} 긴급 상담
          </a>
          <a
            href="/contact"
            className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full bg-white/10 border border-white/30 hover:bg-white/15 text-white font-semibold text-[15px] transition-colors no-underline"
          >
            <MessageCircle className="w-4 h-4" /> 온라인 상담
          </a>
        </div>
      </div>
    </section>
  );
}

/* ============================================================ */

export default function LocationPage() {
  return (
    <>
      <SeoHead
        config={SITE_CONFIG}
        title="오시는 길 | 부산 해운대 형사전문변호사 | 법무법인 대한중앙"
        description="법무법인 대한중앙 해운대사무소 위치 안내. 부산광역시 해운대구 해운대로 554 라온제이빌딩 7층. 부산지방법원·검찰청과 가까운 거리, 365일 24시간 상담 접수."
        canonicalPath="/about/location"
      />
      <BreadcrumbSchema items={[{ label: '홈', path: '/' }, { label: '그룹소개', path: '/about' }, { label: '오시는 길', path: '/about/location' }]} />
      <Layout>
        <HeroAddress />
        <PhotoMap />
        <Wayfinding />
        <NearbyLandmarks />
        <ContactChannels />
        <CtaBanner />
      </Layout>
    </>
  );
}
