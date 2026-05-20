import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import type { GetStaticProps } from 'next';
import Layout from '@/components/Layout';
import { SeoHead } from '@daehanlaw/ui';
import { SITE_CONFIG } from '@/site.config';
import { HeroSection } from '@/components/ui/hero-section-2';
import { getApolloClient, GET_CASES, type Case } from '@daehanlaw/graphql';

const GOLD  = '#c9a04c';
const NAVY  = '#0d1629';
const BG_CREAM  = '#f8f6f1';   // S2 – warm cream
const BG_WHITE  = '#ffffff';   // S3 – pure white
const BG_COOL   = '#f0f3fa';   // S5 – cool blue-tinted
const BG_WARM   = '#fdf9f2';   // S6 – golden warm

/* ─── Data ───────────────────────────────────────────────────────────────── */


const WHY_ITEMS = [
  {
    imgSrc: '/icons/1.png',
    label: '이혼·가사·민사 등',
    bold: '다양한 분야 전문가들',
  },
  {
    imgSrc: '/icons/2.png',
    label: '증거조사부터 경호까지',
    bold: '원스톱 조력',
  },
  {
    imgSrc: '/icons/3.png',
    label: '사건 규모에 따른',
    bold: '1~15인 전문가 TF',
  },
];

const STRENGTHS = [
  {
    title: '사건별 이혼소송\nTF 구성',
    body: '이혼소송·가사소송 대리 경험이 풍부한 이혼변호사가 다수 소속되어 있습니다. 의뢰인의 상황에 따라 최대 15인 규모의 전문가 TF를 구성하여 신속하게 원팀으로 대응합니다.',
    img: '/backgrounds/5.jpg',
    bgPos: 'center top',
  },
  {
    title: '이혼변호사의\n전략 제시',
    body: '조정이혼, 재판이혼 모두 경험을 바탕으로 전략을 수립합니다. 상담, 변론 준비는 물론 모든 재판기일에 직접 출석해 사건 마무리까지 확실하게 조력합니다.',
    img: '/backgrounds/2.jpg',
    bgPos: 'center center',
  },
  {
    title: '파생소송도\n대응 가능',
    body: '이혼은 단순히 혼인의 법적 해소로 끝나지 않는 경우가 많습니다. 위자료 청구, 재산분할, 가정폭력 형사처벌 등 민·형사 소송이 파생될 경우 분야별 전문가와 협력합니다.',
    img: '/backgrounds/3.jpg',
    bgPos: 'center center',
  },
];

const DIVORCE_STEPS = [
  { num: '01', title: '관할법원에\n이혼소장 제출',       sub: '등록기준지 또는 주소지 관할법원에 신고' },
  { num: '02', title: '가정법원\n사실조사 후 조정',      sub: '조정 성립시 이혼 신고' },
  { num: '03', title: '조정 불성립 시\n변론 기일에 쌍방 변론', sub: '불복 시 항소·상고' },
  { num: '04', title: '법원 판결 선고 후\n이혼 신고',    sub: '등록기준지 또는 주소지 관할 사무소에 신고' },
];

const ADULTERY_STEPS = [
  { num: '01', title: '상간자 불법행위\n위자료 배상 소장\n작성·관할법원 제출', sub: '' },
  { num: '02', title: '재판부 배당 및\n상대방 소장발송·\n답변서 제출',       sub: '' },
  { num: '03', title: '변론 및 조정기일\n확정 및 변론·조정 합의',           sub: '' },
  { num: '04', title: '조정 불성립 시\n법원 판결 선고',                     sub: '' },
];

const SERVICES = [
  {
    title: '의뢰인을 대신해\n합법적인 증거 수집',
    items: [
      '이혼소송·상간자소송 관련 사진, 대화 기록 탐색 분석',
      '의뢰인 GPS 정보 및 앱 사용 기록 분석해 특정 시간대 위치 확인',
      '전화, 메시지, 동영상, 음성 파일, 앱 검색어 등 활용 가능한 파일 분석',
      '삭제된 모바일 데이터 복구 및 분석',
    ],
    img: '/backgrounds/1.jpg',
    bgPos: 'center center',
  },
  {
    title: '신변보호를 위한\n경호원 투입',
    items: [
      '가정폭력 피해 입은 경우 일상생활 동행',
      '이동경로 사전 정찰 및 안전조사',
      '경호 대상자 법원 출석 및 조사 시 안심 지원 서비스 제공',
      '보호 과정 속 추가 범죄 발생할 경우 증거 수집',
    ],
    img: '/backgrounds/8.jpg',
    bgPos: 'center top',
  },
];

const SAMPLE_CASES = [
  { badge: '승소', title: '재산분할 5억 원\n전액 인정 판결',   desc: '혼인 기간 20년, 상대방의 재산 은닉 시도에도 불구하고 전문가 감정을 통해 전액 인정받았습니다.', dark: true  },
  { badge: '승소', title: '단독 친권·양육권\n동시 획득',        desc: '상대방의 경제력에도 불구하고 아동 최선의 이익을 입증해 단독 친권 및 양육권을 확보했습니다.', dark: false },
  { badge: '결정', title: '억대 사실혼\n재산분할 성공',         desc: '사실혼 사이인 배우자와의 해소 속 억대 재산분할에 성공한 사례입니다.', dark: true  },
  { badge: '승소', title: '상간녀소송 청구\n전액 인용',         desc: '상간자를 상대로 소송을 진행해 청구 금액 전액이 인용되었습니다.', dark: false },
  { badge: '보호처분', title: '가정폭력 위기\n보호처분으로 방어', desc: '폭행 정도가 심하지 않음을 입증해 보호처분으로 방어에 성공한 사례입니다.', dark: true  },
  { badge: '감액', title: '재산분할 상대방\n청구 대폭 감액',    desc: '상대방의 재산분할 소제기에 대응하여 청구 금액을 대폭 감액하는데 성공했습니다.', dark: false },
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
function ProcessSteps({ steps }: { steps: typeof DIVORCE_STEPS }) {
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
        description="이혼·가사 분야 전문 법무법인 대한중앙을 소개합니다. 검증된 승소 실적과 15년 이혼 전문 경력으로 여러분의 새 출발을 돕겠습니다."
        canonicalPath="/about"
      />
      <Layout>

        {/* ── S1 · HERO ───────────────────────────────────────────────────── */}
        <div className="px-6 py-6">
          <div className="mx-auto max-w-[1500px] overflow-hidden rounded-2xl">
            <HeroSection
              brandName="법무법인 대한중앙"
              slogan="이혼 전문 법률 그룹"
              title={
                <>
                  대한중앙의{' '}
                  <span style={{ color: GOLD }}>이혼변호사</span>가<br />
                  당신의 곁에 서겠습니다
                </>
              }
              subtitle="하루 아침에 '남'이 되는 일, 쉽지 않고 어려운 걸 알기에 이혼변호사가 가장 가까운 든든한 조력자가 되겠습니다."
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
              이혼변호사 대한중앙을<br />선택해야 하는 이유
            </h2>
            <p className="text-[17px] text-gray-500 leading-relaxed mb-12 max-sm:text-[15px]">
              이혼소송 경험을 토대로 맞춤형 전략 수립이 가능한 이혼변호사를 만나보세요
            </p>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              {WHY_ITEMS.map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center text-center gap-4 p-7 bg-white rounded-2xl border border-border/60 shadow-md ring-1 ring-foreground/5"
                >
                  <img
                    src={item.imgSrc}
                    alt={item.bold}
                    className="w-24 h-24 flex-shrink-0 object-contain"
                  />
                  <div>
                    <p className="text-[13px] text-gray-500 mb-1">{item.label}</p>
                    <p className="text-[20px] font-extrabold text-gray-900 leading-tight">{item.bold}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── S3 · STRENGTHS ──────────────────────────────────────────────── */}
        <section className="py-[100px] px-6" style={{ background: BG_WHITE }}>
          <div className="mx-auto max-w-[1200px]">
            <h2 className="text-[34px] font-extrabold leading-tight tracking-tight text-gray-900 mb-3 max-sm:text-[26px]">
              대한중앙 이혼그룹 강점
            </h2>
            <p className="text-[17px] text-gray-500 leading-relaxed mb-12 max-sm:text-[15px]">
              이혼변호사가 의뢰인이 원하는 결과를 얻기 위해 최선을 다합니다
            </p>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {STRENGTHS.map((s, i) => (
                <div
                  key={i}
                  className="flex flex-col rounded-2xl overflow-hidden border border-border/60 shadow-md ring-1 ring-foreground/5 bg-white"
                >
                  {/* Image top */}
                  <div
                    className="w-full flex-shrink-0"
                    style={{ height: 180, background: `url('${s.img}') ${s.bgPos ?? 'center'}/cover no-repeat` }}
                  />
                  {/* Text body */}
                  <div className="flex flex-col gap-3 p-6 flex-1">
                    <h3
                      className="whitespace-pre-line text-[20px] font-extrabold leading-tight"
                      style={{ color: GOLD }}
                    >
                      {s.title}
                    </h3>
                    <p className="text-[14px] text-gray-600 leading-relaxed">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── S4 · PROCESS ────────────────────────────────────────────────── */}
        <section className="py-6 px-5 sm:px-8">
          <div className="mx-auto max-w-[1300px] rounded-[60px] max-md:rounded-[40px] max-sm:rounded-[28px] py-[80px] px-10 max-sm:px-6 max-sm:py-[60px]" style={{ background: `linear-gradient(rgba(13,22,41,0.88), rgba(13,22,41,0.88)), url('/backgrounds/4.jpg') center/cover no-repeat` }}>
          <div className="mx-auto max-w-[1100px]">
            <h2 className="text-[34px] font-extrabold leading-tight tracking-tight text-white mb-3 max-sm:text-[26px]">
              이혼소송·상간자소송 절차
            </h2>
            <p className="text-[17px] text-white/50 leading-relaxed mb-12 max-sm:text-[15px]">
              이혼변호사는 상담부터 소장 제출, 재판기일 출석, 선고까지 함께합니다
            </p>

            <div className="flex flex-col gap-8">
              <div>
                <p className="mb-4 text-[15px] font-bold" style={{ color: GOLD }}>이혼소송 절차</p>
                <ProcessSteps steps={DIVORCE_STEPS} />
              </div>
              <div>
                <p className="mb-4 text-[15px] font-bold" style={{ color: GOLD }}>상간자소송 절차</p>
                <ProcessSteps steps={ADULTERY_STEPS} />
              </div>
            </div>
          </div>
          </div>
        </section>

        {/* ── S5 · SERVICES ───────────────────────────────────────────────── */}
        <section className="py-[100px] px-6" style={{ background: BG_COOL }}>
          <div className="mx-auto max-w-[1200px]">
            <h2 className="text-[34px] font-extrabold leading-tight tracking-tight text-gray-900 mb-3 max-sm:text-[26px]">
              증거조사부터 경호까지<br />대한중앙만의 법률서비스
            </h2>
            <p className="text-[17px] text-gray-500 leading-relaxed mb-12 max-sm:text-[15px]">
              번거로운 증거수집부터 소중한 신변보호까지, 의뢰인을 위해 당연히 해야 할 일입니다
            </p>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {SERVICES.map((svc, i) => (
                <div
                  key={i}
                  className="flex flex-col rounded-2xl overflow-hidden bg-white border border-border/60 shadow-md ring-1 ring-foreground/5"
                >
                  <div
                    className="w-full flex-shrink-0"
                    style={{ height: 180, background: `url('${svc.img}') ${svc.bgPos ?? 'center'}/cover no-repeat` }}
                  />
                  <div className="flex flex-col gap-4 p-7 flex-1">
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
                  </div>
                </div>
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
                  수년간 축적한<br />이혼소송 사례
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
                  실제 이혼소송 데이터베이스를 기반으로 의뢰인에게 적합한 법적 솔루션을 제시합니다
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
                이혼 전문 변호사가<br />당신의 곁에 서겠습니다
              </h2>
              <p className="text-[16px] text-white/55">
                지금 바로 전문 변호사와 상담을 시작하세요
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
