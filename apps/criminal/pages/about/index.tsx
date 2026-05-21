import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import type { GetStaticProps } from 'next';
import Layout from '@/components/Layout';
import { SeoHead } from '@daehanlaw/ui';
import { SITE_CONFIG } from '@/site.config';
import { HeroSection } from '@/components/ui/hero-section-2';
import { getApolloClient, GET_CASES, type Case } from '@daehanlaw/graphql';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const GOLD  = '#c9a04c';
const NAVY  = '#0d1629';
const BG_CREAM  = '#f8f6f1';
const BG_WHITE  = '#ffffff';
const BG_COOL   = '#f0f3fa';
const BG_WARM   = '#fdf9f2';

/* ─── Data ───────────────────────────────────────────────────────────────── */


const WHY_ITEMS = [
  {
    imgSrc: '/icons/1.png',
    label: '형사·민사·가사 등',
    bold: '다양한 분야 전문가들',
  },
  {
    imgSrc: '/icons/2.png',
    label: '수사 단계부터 항소심까지',
    bold: '원스톱 변호 조력',
  },
  {
    imgSrc: '/icons/3.png',
    label: '사건 규모에 따른',
    bold: '1~15인 전문가 TF',
  },
];

const STRENGTHS = [
  {
    title: '사건별 형사사건\nTF 구성',
    body: '형사사건·수사 대응 경험이 풍부한 형사전문변호사가 다수 소속되어 있습니다. 의뢰인의 상황에 따라 최대 15인 규모의 전문가 TF를 구성하여 신속하게 원팀으로 대응합니다.',
    img: '/backgrounds/5.jpg',
    bgPos: 'center top',
  },
  {
    title: '형사전문변호사의\n전략 제시',
    body: '경찰·검찰 수사부터 1심·항소·상고까지의 풍부한 경험을 바탕으로 단계별 변호 전략을 수립합니다. 조사·변론 준비는 물론 모든 재판기일에 직접 출석해 사건 마무리까지 확실하게 조력합니다.',
    img: '/backgrounds/2.jpg',
    bgPos: 'center center',
  },
  {
    title: '파생 민사·행정\n동시 대응 가능',
    body: '형사 사건은 손해배상·해고·면허취소 등 민·행정 분쟁으로 이어지는 경우가 많습니다. 사건 진행 중 파생되는 모든 분쟁을 분야별 전문가와 협력해 통합 대응합니다.',
    img: '/backgrounds/3.jpg',
    bgPos: 'center center',
  },
];

const CRIMINAL_STEPS = [
  { num: '01', title: '수사기관\n조사 출석·대응',           sub: '경찰·검찰 조사 동행 및 진술 전략 수립' },
  { num: '02', title: '구속·체포영장\n실질심사 대응',       sub: '구속영장 기각·구속적부심 청구' },
  { num: '03', title: '검찰 기소 후\n공판기일 변론',         sub: '증거 검토·증인신문·변론요지서 제출' },
  { num: '04', title: '판결 선고 후\n항소·상고 검토',       sub: '불리한 판결 시 상소심 변호 진행' },
];

const APPEAL_STEPS = [
  { num: '01', title: '1심 판결문 분석\n및 상소 전략 수립',  sub: '' },
  { num: '02', title: '항소장·상고장\n작성 및 제출',        sub: '' },
  { num: '03', title: '항소심·상고심\n변론 및 증거 보강',    sub: '' },
  { num: '04', title: '대법원 판결\n또는 파기환송 대응',     sub: '' },
];

const SERVICES = [
  {
    title: '의뢰인의 권리 보장\n수사 단계 변호',
    items: [
      '경찰·검찰 조사 시 변호인 입회 및 진술 조력',
      '피의자신문조서 검토 및 반대 진술서 작성',
      '압수·수색·체포 영장 발부 단계 대응',
      '구속영장 실질심사 및 구속적부심 청구',
    ],
    img: '/backgrounds/1.jpg',
    bgPos: 'center center',
  },
  {
    title: '재판 단계\n공판 전 과정 동행',
    items: [
      '공소장 분석 및 변론 전략 수립',
      '증거 부동의·증인신문·반대신문 진행',
      '양형 자료 수집 및 양형 부당 주장',
      '판결 선고 후 항소·상고 여부 즉시 자문',
    ],
    img: '/backgrounds/8.jpg',
    bgPos: 'center top',
  },
];

const SAMPLE_CASES = [
  { badge: '무죄', title: '특수폭행 혐의\n무죄 판결 확정',     desc: '정당방위를 입증해 1심에서 무죄 판결을 받고 검찰 항소까지 기각시킨 사례입니다.', dark: true  },
  { badge: '불기소', title: '사기 고소사건\n혐의없음 처분',     desc: '거래의 채무불이행에 불과함을 입증해 검찰의 혐의없음 처분을 이끌어냈습니다.', dark: false },
  { badge: '집행유예', title: '음주운전 재범\n집행유예 선고',    desc: '치료의지·환경요인을 입증해 실형이 예상되던 사건에서 집행유예로 마무리했습니다.', dark: true  },
  { badge: '구속기각', title: '횡령 혐의 사건\n구속영장 기각',   desc: '도주·증거인멸 우려 없음을 적극 소명해 구속영장 기각을 이끌어냈습니다.', dark: false },
  { badge: '파기환송', title: '항소심 양형부당\n대법원 파기환송', desc: '대법원에서 양형 부당을 인정받아 파기환송된 사례입니다.', dark: true  },
  { badge: '감형', title: '마약 단순소지\n벌금형 감형 성공',     desc: '초범·자수·치료의지 등을 입증해 실형이 예상되던 사건을 벌금형으로 감형받았습니다.', dark: false },
];

/* ─── Cases Carousel ──────────────────────────────────────────────────────── */
function CasesCarousel({ cases }: { cases: Case[] }) {
  const [idx, setIdx] = useState(0);
  const VISIBLE = 3;

  const data = cases.length > 0
    ? cases.map((c, i) => ({
        badge: c.caseLocation || '사례',
        title: c.caseTitle,
        desc: c.caseDesc || '',
        dark: i % 2 === 0,
        href: `/cases`,
      }))
    : SAMPLE_CASES.map(c => ({ ...c, href: '/cases' }));

  useEffect(() => {
    const t = setInterval(() => setIdx(p => (p + 1) % data.length), 3200);
    return () => clearInterval(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.length]);

  const visible = Array.from({ length: VISIBLE }, (_, i) => data[(idx + i) % data.length]);

  return (
    <div className="relative overflow-hidden">
      <div className="flex gap-4">
        {visible.map((c, i) => (
          <Link
            key={`${c.badge}-${i}`}
            href={c.href}
            className="flex-shrink-0 flex flex-col gap-4 rounded-2xl p-7 no-underline transition-transform duration-200 hover:scale-[1.02]"
            style={{
              width: 'calc((100% - 32px) / 3)',
              minHeight: 340,
              background: c.dark ? GOLD : NAVY,
            }}
          >
            <div className="flex items-center justify-between">
              <span
                className="inline-flex h-8 items-center rounded-full px-3 text-[13px] font-bold text-white"
                style={{ border: '1px solid rgba(255,255,255,0.6)' }}
              >
                {c.badge}
              </span>
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full"
                style={{ border: '1px solid rgba(255,255,255,0.4)' }}
              >
                <span className="text-white text-sm">→</span>
              </div>
            </div>
            <h3 className="whitespace-pre-line text-[22px] font-bold leading-snug tracking-tight text-white max-lg:text-[18px]">
              {c.title}
            </h3>
            <p className="text-[14px] leading-relaxed text-white/70 line-clamp-3">
              {c.desc}
            </p>
          </Link>
        ))}
      </div>
      {/* Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {data.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className="transition-all duration-300 rounded-full"
            style={{ width: i === idx ? 28 : 8, height: 8, background: i === idx ? GOLD : '#ddd' }}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── Process Steps ───────────────────────────────────────────────────────── */
function ProcessSteps({ steps }: { steps: typeof CRIMINAL_STEPS }) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {steps.map((step, i) => (
        <div key={step.num} className="relative flex flex-col gap-3">
          {i < steps.length - 1 && (
            <div
              className="absolute top-[14px] left-[calc(50%+10px)] hidden md:block"
              style={{ width: 'calc(100% - 20px)', height: 1, background: `${GOLD}40` }}
            />
          )}
          <div
            className="flex flex-col gap-3 rounded-xl p-4 h-full"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(201,160,76,0.2)' }}
          >
            <span className="text-[26px] font-extrabold leading-none" style={{ color: GOLD }}>
              {step.num}
            </span>
            <p className="whitespace-pre-line text-[14px] font-medium leading-relaxed text-white/80">
              {step.title}
            </p>
            {step.sub && (
              <p className="text-[12px] text-white/40 leading-relaxed">{step.sub}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────────── */
interface AboutPageProps {
  cases: Case[];
}

export default function AboutPage({ cases }: AboutPageProps) {
  return (
    <>
      <SeoHead
        config={SITE_CONFIG}
        title="그룹소개 | 대한중앙 형사전문센터"
        description="형사 분야 전문 법무법인 대한중앙을 소개합니다. 검증된 무죄·불기소 실적과 풍부한 형사 변호 경력으로 의뢰인의 자유와 권리를 끝까지 지켜드립니다."
        canonicalPath="/about"
      />
      <Layout>

        {/* ── S1 · HERO ───────────────────────────────────────────────────── */}
        <div className="px-6 py-6">
          <div className="mx-auto max-w-[1500px] overflow-hidden rounded-2xl">
            <HeroSection
              brandName="법무법인 대한중앙"
              slogan="형사 전문 법률 그룹"
              title={
                <>
                  대한중앙의{' '}
                  <span style={{ color: GOLD }}>형사전문변호사</span>가<br />
                  당신의 곁에 서겠습니다
                </>
              }
              subtitle="단 한 번의 진술이 사건의 방향을 바꿉니다. 수사 초기부터 항소심까지, 형사전문변호사가 가장 가까운 든든한 조력자가 되겠습니다."
              callToAction={{ text: '상담 신청', href: '/contact' }}
              backgroundImage="/hero.png"
              contactInfo={{
                website: 'daehanlaw.com',
                phone: '1533-7377',
                address: ' 부산 해운대구 해운대로 554 라온제이빌딩 7층 ',

              }}
              style={{ minHeight: 180, maxHeight: 520 }}
            />
          </div>
        </div>

        {/* ── S2 · WHY CHOOSE US ──────────────────────────────────────────── */}
        <section className="py-[100px] px-6" style={{ background: `linear-gradient(rgba(248,246,241,0.93), rgba(248,246,241,0.93)), url('/backgrounds/7.jpg') center/cover no-repeat` }}>
          <div className="mx-auto max-w-[1200px]">
            <h2 className="text-[34px] font-extrabold leading-tight tracking-tight text-gray-900 mb-3 max-sm:text-[26px]">
              형사전문변호사 대한중앙을<br />선택해야 하는 이유
            </h2>
            <p className="text-[17px] text-gray-500 leading-relaxed mb-12 max-sm:text-[15px]">
              풍부한 형사사건 변호 경험을 토대로 맞춤형 전략 수립이 가능한 형사전문변호사를 만나보세요
            </p>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              {WHY_ITEMS.map((item, i) => (
                <Card
                  key={i}
                  className="flex flex-col items-center text-center gap-4 p-7 rounded-2xl border-border/60 shadow-md ring-1 ring-foreground/5"
                >
                  <img
                    src={item.imgSrc}
                    alt={item.bold}
                    className="w-24 h-24 flex-shrink-0 object-contain"
                  />
                  <div>
                    <p className="text-[13px] text-muted-foreground mb-1">{item.label}</p>
                    <p className="text-[20px] font-extrabold text-gray-900 leading-tight">{item.bold}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ── S3 · STRENGTHS ──────────────────────────────────────────────── */}
        <section className="py-[100px] px-6" style={{ background: BG_WHITE }}>
          <div className="mx-auto max-w-[1200px]">
            <h2 className="text-[34px] font-extrabold leading-tight tracking-tight text-gray-900 mb-3 max-sm:text-[26px]">
              대한중앙 형사그룹 강점
            </h2>
            <p className="text-[17px] text-gray-500 leading-relaxed mb-12 max-sm:text-[15px]">
              형사전문변호사가 의뢰인이 원하는 결과를 얻기 위해 최선을 다합니다
            </p>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {STRENGTHS.map((s, i) => (
                <Card
                  key={i}
                  className="flex flex-col rounded-2xl overflow-hidden border-border/60 shadow-md ring-1 ring-foreground/5"
                >
                  <div
                    className="w-full flex-shrink-0"
                    style={{ height: 180, background: `url('${s.img}') ${s.bgPos ?? 'center'}/cover no-repeat` }}
                  />
                  <CardContent className="flex flex-col gap-3 p-6 pt-6 flex-1">
                    <h3
                      className="whitespace-pre-line text-[20px] font-extrabold leading-tight"
                      style={{ color: GOLD }}
                    >
                      {s.title}
                    </h3>
                    <p className="text-[14px] text-gray-600 leading-relaxed">{s.body}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ── S4 · PROCESS ────────────────────────────────────────────────── */}
        <section className="py-6 px-5 sm:px-8">
          <div className="mx-auto max-w-[1300px] rounded-[60px] max-md:rounded-[40px] max-sm:rounded-[28px] py-[80px] px-10 max-sm:px-6 max-sm:py-[60px]" style={{ background: `linear-gradient(rgba(13,22,41,0.88), rgba(13,22,41,0.88)), url('/backgrounds/4.jpg') center/cover no-repeat` }}>
          <div className="mx-auto max-w-[1100px]">
            <h2 className="text-[34px] font-extrabold leading-tight tracking-tight text-white mb-3 max-sm:text-[26px]">
              수사·재판·상소심 절차
            </h2>
            <p className="text-[17px] text-white/50 leading-relaxed mb-12 max-sm:text-[15px]">
              형사전문변호사는 수사 단계부터 항소·상고까지 모든 절차에 함께합니다
            </p>

            <div className="flex flex-col gap-8">
              <div>
                <p className="mb-4 text-[15px] font-bold" style={{ color: GOLD }}>형사사건 진행 절차</p>
                <ProcessSteps steps={CRIMINAL_STEPS} />
              </div>
              <div>
                <p className="mb-4 text-[15px] font-bold" style={{ color: GOLD }}>항소·상고심 절차</p>
                <ProcessSteps steps={APPEAL_STEPS} />
              </div>
            </div>
          </div>
          </div>
        </section>

        {/* ── S5 · SERVICES ───────────────────────────────────────────────── */}
        <section className="py-[100px] px-6" style={{ background: BG_COOL }}>
          <div className="mx-auto max-w-[1200px]">
            <h2 className="text-[34px] font-extrabold leading-tight tracking-tight text-gray-900 mb-3 max-sm:text-[26px]">
              수사 초기부터 항소심까지<br />대한중앙만의 형사 변호
            </h2>
            <p className="text-[17px] text-gray-500 leading-relaxed mb-12 max-sm:text-[15px]">
              조사 동행부터 양형 자료 준비까지, 의뢰인을 위해 당연히 해야 할 일입니다
            </p>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {SERVICES.map((svc, i) => (
                <Card
                  key={i}
                  className="flex flex-col rounded-2xl overflow-hidden border-border/60 shadow-md ring-1 ring-foreground/5"
                >
                  <div
                    className="w-full flex-shrink-0"
                    style={{ height: 180, background: `url('${svc.img}') ${svc.bgPos ?? 'center'}/cover no-repeat` }}
                  />
                  <CardContent className="flex flex-col gap-4 p-7 pt-7 flex-1">
                    <h3
                      className="whitespace-pre-line text-[20px] font-extrabold leading-tight"
                      style={{ color: GOLD }}
                    >
                      {svc.title}
                    </h3>
                    <ul className="flex flex-col gap-2.5">
                      {svc.items.map(item => (
                        <li key={item} className="flex items-start gap-2.5">
                          <svg className="mt-0.5 w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke={GOLD} strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                          </svg>
                          <span className="text-[14px] text-gray-600 leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ── S6 · CASES ──────────────────────────────────────────────────── */}
        <section className="py-[100px] px-6" style={{ background: `linear-gradient(rgba(0,0,0,0.28), rgba(0,0,0,0.28)), url('/backgrounds/6.jpg') center/cover no-repeat` }}>
          <div className="mx-auto max-w-[1200px]">
            <div className="flex items-end justify-between mb-10 max-sm:mb-6">
              <div>
                <h2
                  className="text-[34px] font-extrabold leading-tight tracking-tight text-white mb-3 max-sm:text-[26px] inline-block"
                  style={{
                    background: 'rgba(155,20,20,0.62)',
                    padding: '6px 16px',
                    borderRadius: '6px',
                  }}
                >
                  수년간 축적한<br />형사사건 변호 실적
                </h2>
                <p
                  className="text-[17px] leading-relaxed max-sm:text-[15px] inline-block"
                  style={{
                    color: 'white',
                    background: 'rgba(155,20,20,0.62)',
                    padding: '5px 14px',
                    borderRadius: '6px',
                  }}
                >
                  실제 형사사건 데이터베이스를 기반으로 의뢰인에게 적합한 변호 전략을 제시합니다
                </p>
              </div>
              <Link
                href="/cases"
                className="hidden sm:flex flex-shrink-0 items-center justify-center rounded-full transition-all duration-300 no-underline group hover:scale-105"
                style={{ width: 80, height: 80, border: '1.5px solid rgba(255,255,255,0.45)' }}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="rgba(255,255,255,0.7)" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                </svg>
              </Link>
            </div>
            <CasesCarousel cases={cases} />
          </div>
        </section>

        {/* ── CTA ─────────────────────────────────────────────────────────── */}
        <section className="py-6 px-5 sm:px-8">
          <div className="mx-auto max-w-[1300px] rounded-[60px] max-md:rounded-[40px] max-sm:rounded-[28px] py-[70px] px-10 max-sm:px-6 max-sm:py-[50px]" style={{ background: `linear-gradient(rgba(13,22,41,0.86), rgba(13,22,41,0.86)), url('/backgrounds/5.jpg') center/cover no-repeat` }}>
          <div className="mx-auto max-w-[1100px] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8">
            <div>
              <h2 className="text-[30px] font-extrabold leading-tight text-white mb-2 max-sm:text-[24px]">
                형사전문변호사가<br />당신의 곁에 서겠습니다
              </h2>
              <p className="text-[16px] text-white/55">
                지금 바로 형사전문변호사와 상담을 시작하세요
              </p>
            </div>
            <Link
              href="/contact"
              className="flex-shrink-0 inline-flex h-[60px] px-10 items-center justify-center gap-3 rounded-full text-[16px] font-bold text-white no-underline transition-all duration-300 hover:scale-105 whitespace-nowrap"
              style={{ border: `1px solid rgba(201,160,76,0.55)`, background: 'rgba(201,160,76,0.12)' }}
            >
              상담 신청
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke={GOLD} strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>
          </div>
        </section>

      </Layout>
    </>
  );
}

export const getStaticProps: GetStaticProps<AboutPageProps> = async () => {
  const client = getApolloClient(process.env.NEXT_PUBLIC_API_URL);
  const { data } = await client.query<any>({
    query: GET_CASES,
    variables: {
      input: {
        page: 1,
        limit: 12,
        sort: 'createdAt',
        direction: 'DESC',
        search: { siteOrigin: SITE_CONFIG.siteOrigin },
      },
    },
  }).catch(() => ({ data: null }));

  return {
    props: { cases: data?.getCases?.list ?? [] },
    revalidate: 60 * 30,
  };
};
