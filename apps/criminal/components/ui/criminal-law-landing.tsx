import React, { useEffect, useRef } from 'react';
import {
  Scale, Gavel, ShieldCheck, Search, Globe, Users, ArrowRight,
} from 'lucide-react';

/** New emerald/gold scheme. mainBlue token in tailwind.config maps to the emerald primary. */
const ACCENT = '#C8962E';
const FOREST = '#0F3D33';
const MIDEM  = '#14564A';

const SECTION =
  'relative z-10 mx-auto max-w-[1920px] px-[190px] text-center ' +
  'max-3xl:px-[80px] max-lg:px-[50px] max-md:px-[20px] ' +
  'py-[160px] max-lg:py-[86px] max-md:py-[60px]';

const H2 =
  'break-keep text-[52px] font-[800] leading-[1.3] tracking-[-2.08px] ' +
  'max-3xl:text-[46px] max-lg:text-[32px] max-md:text-[24px] max-md:tracking-[-0.96px]';

interface Props {
  heroBg?: string;
  strategyBandBg?: string;
  keyImages?: [string, string, string, string];
  phoneNumber?: string;
  stats?: Array<[string, string]>;
}

const DEFAULT_KEY_IMAGES: [string, string, string, string] = [
  'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=900',
  'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=900',
  'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?auto=format&fit=crop&q=80&w=900',
  'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&q=80&w=900',
];

const KEYS_DATA = (imgs: [string, string, string, string]) => [
  {
    no: 'KEY 01',
    Icon: Users,
    title: '사건별 전담 형사 TF 구성',
    lead: '의뢰인의 사건에 맞춰\n전문 변호사 팀을 즉시 매칭합니다',
    points: [
      '상담 직후 사건 규모·쟁점을 신속하게 파악',
      '경력 풍부한 형사 전문 변호사가 직접 책임 수행',
      '파생되는 민사·행정 위험까지 통합 대응',
      '회계·세무·노무 등 특수 분야 전문가와 협업',
    ],
    cta: '변호사 약력 확인하기',
    img: imgs[0],
  },
  {
    no: 'KEY 02',
    Icon: ShieldCheck,
    title: '수사 단계 동행 변호 시스템',
    lead: '경찰·검찰 조사 단계부터\n전담 변호인이 함께합니다',
    points: [
      '조사 전 진술 시뮬레이션 및 전략 수립',
      '경찰·검찰 조사에 변호인이 직접 입회·동행',
      '수사 시스템 변화를 실시간 모니터링',
      '24시간 긴급 상담 운영 체계 유지',
    ],
    cta: '변호사 약력 확인하기',
    img: imgs[1],
  },
  {
    no: 'KEY 03',
    Icon: Search,
    title: '증거 분석 · 디지털 포렌식',
    lead: '사건 초기 단계 종결을 위한\n증거 수집·분석 인프라',
    points: [
      '디지털 포렌식 전문가와 협업',
      '합법적 증거 수집을 위한 최신 분석 장비 운영',
      '수사기관 분석 결과 교차 검증',
      '증거로 법리를 강화해 초기 단계 종결 목표',
    ],
    cta: '증거조사 안내 보기',
    img: imgs[2],
  },
  {
    no: 'KEY 04',
    Icon: Globe,
    title: '전국 사무소 네트워크 즉시 연계',
    lead: '의뢰인 지역에 상관없이\n전국 어디서나 형사 변호 가능',
    points: [
      '전국 주요 도시 사무소를 통한 신속 대응',
      '모든 사무소에서 형사 전문 변호사가 직접 상담',
      '필요 시 협력 사무소와의 즉각 공조',
      '국제 사건도 협력 펌을 통해 대응',
    ],
    cta: '오시는 길 보기',
    img: imgs[3],
  },
];

const STAGES = [
  {
    t: '상담 단계',
    d: [
      '형사 전문 변호사와 대면·비대면 상담',
      '사건 검토 후 맞춤형 전략 수립',
      '경력 다수의 부장급 변호사 배정',
      '사안별 특수 분야 전문가 TF 구성',
    ],
  },
  {
    t: '경찰조사 단계',
    d: [
      '조사 전 사전 시뮬레이션 진행',
      '경찰조사 동행 및 변호인 입회',
      '조사 이후 수사기관과의 소통·대응',
      '쟁점별 의견서·증거 제출',
    ],
  },
  {
    t: '검찰조사 단계',
    d: [
      '사건 송치 후 검찰조사 동행·입회',
      '증거조사·디지털 포렌식을 통한 증거 분석',
      '법리적 논거 확립 및 의견 제출',
      '기소 시 공판 단계 대비 전략 수립',
    ],
  },
  {
    t: '재판 단계',
    d: [
      '구속 시 구속적부심·보석 전략 수립',
      '수사 단계의 누락·미진한 부분 보완',
      '증거 능력 검토 및 양형 요소 소명',
      '공판 변론 진행과 상소심 검토',
    ],
  },
];

const FLOW = ['영장 발부', '현장 집행', '디지털 기기 확보', '데이터 선별', '증거물 확정'];

const STEPS = [
  {
    no: 'STEP 01',
    t: '집행 전 사전 대응',
    d: [
      '영장의 범위·대상 특정성 사전 검토',
      '포렌식 진단으로 데이터 유불리 식별',
      '예상 질의 기반 대응 시나리오 설계',
    ],
  },
  {
    no: 'STEP 02',
    t: '집행 및 전자정보 확보',
    d: [
      '참여권 행사로 위법 수집 차단',
      '수사기관 분석 도구 교차 검증',
      '실시간 대응 리포트·반박 메모 작성',
    ],
  },
  {
    no: 'STEP 03',
    t: '사후 증거 공방',
    d: [
      '절차적 결함 및 위법 수집 증거 탄핵',
      '데이터 재분석으로 수사 해석 오류 포착',
      '압수물 환부 신청과 사후 포렌식 대응',
    ],
  },
];

const VICTIM = {
  tags: ['#명예훼손', '#손해배상청구', '#성범죄고소', '#학교폭력', '#불법촬영', '#스토킹', '#뺑소니', '#보복운전'],
  outs: ['승소', '실형 선고', '징역형', '송치'],
};
const SUSPECT = {
  tags: ['#보이스피싱', '#음주운전', '#강제추행', '#절도', '#무면허운전', '#도박', '#아동학대', '#마약'],
  outs: ['무죄', '무혐의', '집행유예', '기소유예', '선고유예', '항소기각'],
};

const CASES: Array<[string, string]> = [
  ['업무상 횡령·배임·영업비밀 침해 등 기업 형사 사건 다수 수행', '업무상배임 불송치'],
  ['자본시장법 위반·주가조작 등 금융 형사 사건 다수 수행',       '자본시장법위반 불기소'],
  ['의료인 형사 사건·보험사기방지특별법 등 다수 수행',           '보험사기방지법 무죄'],
  ['허위 세금계산서·이중장부 등 조세 포탈 사건 다수 수행',       '특정범죄가중처벌법 무죄'],
  ['대마·향정신성의약품 등 마약류관리법 위반 사건 다수 수행',    '마약류관리법 불기소'],
  ['강간·강제추행·카메라촬영죄 등 성범죄 다수 수행',             '미성년자 강제추행 무죄'],
  ['특정경제범죄·보이스피싱·보험사기 등 사기 사건 다수 수행',    '특정경제범죄 불송치'],
  ['폭행·상해·공갈 등 폭력 범죄 다수 수행',                       '상해 무죄'],
];

const CriminalLawLanding: React.FC<Props> = ({
  heroBg = 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=1600',
  strategyBandBg = 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=1600',
  keyImages = DEFAULT_KEY_IMAGES,
  phoneNumber = '1533-7377',
  stats = [
    ['1,200+', '누적 형사 변호 사건'],
    ['96%',    '의뢰인 만족도'],
    ['24시',   '긴급 상담 응대'],
    ['전국',   '사무소 네트워크'],
  ],
}) => {
  const heroRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px) scale(0.98)';
    const t = setTimeout(() => {
      el.style.transition = 'all 1.2s cubic-bezier(0.16,1,0.3,1)';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0) scale(1)';
    }, 150);
    return () => clearTimeout(t);
  }, []);

  const KEYS = KEYS_DATA(keyImages);

  return (
    <div className="w-full font-sans text-[#1B1B1B]">
      {/* ===== HERO ===== */}
      <section
        className="relative pt-[115px] max-xs:pt-[90px] pb-[120px]"
        style={{ background: `linear-gradient(180deg, ${FOREST} 0%, ${MIDEM} 60%, #ffffff 100%)` }}
      >
        <div className="mx-auto max-w-[1920px] px-[190px] text-center text-white max-3xl:px-[80px] max-lg:px-[50px] max-md:px-[20px]">
          <p className="text-[60px] font-[800] leading-[1.3] tracking-[-2.4px] text-white max-lg:text-[48px] max-lg:tracking-[-1.92px] max-md:text-[28px]">
            <span className="block text-[52px] tracking-[-2.08px] max-lg:text-[36px] max-lg:tracking-[-1.44px] max-md:text-[24px]">
              결정적 순간,
            </span>
            가장 가까운 형사 조력자
          </p>
          <h1 className="mt-3 text-[28px] tracking-[-0.56px] text-white max-lg:text-[20px] max-lg:tracking-[-0.4px] max-md:mt-[20px] max-md:text-[16px] max-md:leading-snug max-md:tracking-[-0.32px]">
            수사 초기부터 항소심까지, 사건의 흐름을 꿰뚫는 형사 전문 변호사
          </h1>

          <div
            ref={heroRef}
            className="relative mx-auto mt-[100px] h-[502px] w-full max-w-[1540px] overflow-hidden rounded-[30px] max-lg:mt-[88px] max-lg:h-[304px] max-md:mt-10 max-md:h-[144px] max-md:rounded-[10px]"
          >
            <img src={heroBg} alt="대한중앙 형사전문센터" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0" style={{ background: `linear-gradient(90deg, ${FOREST}cc 0%, transparent 70%)` }} />
          </div>

          <div className="relative mx-auto mt-[160px] grid w-full max-w-[1350px] grid-cols-4 max-lg:mt-[86px] max-md:mb-[60px] max-md:mt-[0] max-md:w-[290px] max-md:grid-cols-2 max-md:gap-[54px]">
            {stats.map(([n, l]) => (
              <div key={l} className="flex flex-col items-center">
                <span className="text-[40px] font-[800]" style={{ color: ACCENT }}>{n}</span>
                <span className="mt-1 text-[15px] text-white/80">{l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== STRATEGY / KEY 01–04 ===== */}
      <section className="relative bg-[#F4F7F5]">
        <div className="absolute top-0 z-0 h-[600px] w-full overflow-hidden max-lg:h-[350px] max-md:h-[280px]">
          <img src={strategyBandBg} alt="대한중앙 형사 전략" className="h-full w-full object-cover opacity-25" />
        </div>
        <div className={SECTION}>
          <h2 className={H2} style={{ color: 'black' }}>대한중앙 형사 변호사의 전략</h2>
          <p className="mt-3 block break-keep text-[28px] leading-[1.4] tracking-[-0.56px] max-3xl:text-[24px] max-lg:mt-[16px] max-lg:text-[20px] max-md:text-[16px] max-md:tracking-[-0.32px] max-sm:px-5">
            의뢰인의 목소리를 끝까지 경청하고 사건의 본질을 꿰뚫는<br className="max-sm:hidden" />
            형사 전문 변호사가 직접 사건을 책임집니다
          </p>

          <ul className="mt-[180px] flex w-full flex-col gap-[100px] rounded-[30px] bg-white px-[100px] pt-[100px] max-3xl:px-[60px] max-lg:mt-[86px] max-lg:gap-[72px] max-lg:rounded-[20px] max-lg:px-[40px] max-lg:pt-[50px] max-md2:px-[20px] max-md:mt-[60px] max-md:gap-[60px] max-md:rounded-[12px] max-md:pt-[55px]">
            {KEYS.map((k, idx) => {
              const Icon = k.Icon;
              return (
                <li key={k.no} className="flex flex-col text-left leading-tight">
                  <span className="mb-[32px] w-full border-b border-solid border-black pb-1 text-[28px] font-[800] max-3xl:text-[26px] max-lg:text-[20px] max-sm:mb-[28px] max-sm:text-[16px]">
                    {k.no}
                  </span>
                  <div
                    className={`flex w-full gap-10 max-lg:gap-[24px] max-md:flex-col md:justify-between ${
                      idx % 2 === 0 ? 'md:flex-row-reverse' : ''
                    }`}
                  >
                    <div className="flex min-w-[452px] flex-col max-3xl:min-w-[400px] max-lg:mt-[24px] max-lg:min-w-[390px] max-md:mt-0 md:w-[40%]">
                      <h3 className="mb-[32px] flex items-center gap-2 text-[32px] font-[800] tracking-[-1.28px] text-mainBlue max-3xl:text-[28px] max-lg:mb-[20px] max-lg:text-[24px] max-sm:mb-[16px] max-sm:text-[20px]">
                        <Icon size={28} /> {k.title}
                      </h3>
                      <p className="mb-[32px] whitespace-pre-wrap text-[24px] font-[800] tracking-[-0.48px] max-lg:mb-[20px] max-lg:text-[20px] max-sm:mb-[16px] max-sm:text-[16px] max-sm:tracking-[-0.32px]">
                        {k.lead}
                      </p>
                      <ul className="mb-[50px] text-[20px] leading-[1.7] tracking-[-0.4px] max-3xl:text-[18px] max-lg:mb-[30px] max-lg:leading-[1.8] max-sm:mb-0 max-sm:break-keep max-sm:text-[14px] max-sm:leading-[2] max-sm:tracking-[-0.28px]">
                        {k.points.map((p) => <li key={p}>· {p}</li>)}
                      </ul>
                      <a
                        href="#"
                        className="gap-[40px] max-lg:gap-[28px] group flex items-center justify-between self-start border border-solid border-mainBlue px-[28px] py-[11px] text-[20px] font-[800] tracking-[-0.4px] text-mainBlue hover:bg-mainBlue transition-[background-color,color] ease-linear hover:text-white max-3xl:text-[18px] max-lg:px-[20px] max-lg:py-[9.5px] max-md:h-[32px] max-md:py-[6px] max-sm:text-[14px] max-sm:tracking-[-0.28px] max-md:hidden"
                      >
                        {k.cta}
                        <ArrowRight className="h-[22px] w-[22px] stroke-[2px] transition-[stroke] ease-linear group-hover:stroke-white max-lg:h-[18px] max-lg:w-[18px] max-md:h-[15px] max-md:w-[15px]" />
                      </a>
                    </div>
                    <div className="relative h-[420px] w-[60%] max-w-[670px] overflow-hidden rounded-[30px] bg-[#EAF2EE] max-3xl:h-[400px] max-lg:mt-[24px] max-lg:h-[336px] max-lg:rounded-[20px]">
                      <img src={k.img} alt={k.title} className="absolute inset-0 h-full w-full object-cover max-lg:hidden" />
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ===== PROCESS TIMELINE ===== */}
      <section className="relative" style={{ background: FOREST }}>
        <div className={SECTION}>
          <h2 className={H2} style={{ color: 'white' }}>형사 변호 단계별 조력 시스템</h2>
          <p className="mt-6 text-[28px] text-white/80 max-3xl:text-[24px] max-lg:text-[20px] max-md:text-[16px]">
            의뢰인이 바라는 결과를 위해, 형사 전문 변호사가 단계별로 밀착 대응합니다
          </p>
          <div className="mt-[80px] grid grid-cols-4 gap-6 max-lg:grid-cols-2 max-md:grid-cols-1">
            {STAGES.map((s, i) => (
              <div
                key={s.t}
                className="rounded-[20px] p-8 text-left"
                style={{ background: 'rgba(255,255,255,0.05)', border: `1px solid ${ACCENT}40` }}
              >
                <span className="text-[18px] font-[800]" style={{ color: ACCENT }}>0{i + 1}</span>
                <h3 className="mt-2 text-[24px] font-[800] text-white">{s.t}</h3>
                <ul className="mt-5 space-y-2 text-[15px] leading-[1.7] text-white/80">
                  {s.d.map((d) => <li key={d}>· {d}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SEARCH & SEIZURE ===== */}
      <section className="relative bg-[#F4F7F5]">
        <div className={SECTION}>
          <h2 className={H2} style={{ color: 'black' }}>압수수색 대응 전략</h2>
          <p className="mx-auto mt-6 max-w-[1100px] text-[20px] leading-[1.6] text-[#555656] max-md:text-[15px]">
            압수수색은 법원의 영장을 근거로 수사기관이 피의자·관련인의 전자기기와 자료를 확보한 뒤,
            데이터 복제·선별·분석 과정을 거쳐 사건의 핵심 증거를 추출하는 절차입니다.
          </p>
          <div className="my-20 flex flex-wrap items-center justify-center gap-4 max-md:my-[50px]">
            {FLOW.map((f, i) => (
              <React.Fragment key={f}>
                <div
                  className="rounded-full px-6 py-3 text-[16px] font-bold text-white max-md:text-[13px]"
                  style={{ background: '#1F6F5C' }}
                >
                  {f}
                </div>
                {i < FLOW.length - 1 && <ArrowRight size={20} style={{ color: ACCENT }} />}
              </React.Fragment>
            ))}
          </div>
          <h3 className="text-[28px] font-[800] text-mainBlue max-md:text-[20px]">
            대한중앙의 단계별 압수수색 조력
          </h3>
          <p className="mx-auto mt-3 max-w-[900px] text-[17px] text-[#555656]">
            형사 전문 변호사와 디지털 포렌식 전문가가 3단계 프레임을 통해, 수사기관의 증거 해석이 확정되기 전 반박 논리를 갖춥니다.
          </p>
          <div className="mt-12 grid grid-cols-3 gap-6 text-left max-lg:grid-cols-1">
            {STEPS.map((s) => (
              <div key={s.no} className="rounded-[20px] border bg-white p-8" style={{ borderColor: '#EAF2EE' }}>
                <span className="text-[16px] font-[800]" style={{ color: ACCENT }}>{s.no}</span>
                <h4 className="mt-2 text-[20px] font-[800]" style={{ color: FOREST }}>{s.t}</h4>
                <ul className="mt-4 space-y-2 text-[15px] leading-[1.7] text-[#555656]">
                  {s.d.map((d) => <li key={d}>· {d}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== VICTIM / SUSPECT ===== */}
      <section className="relative bg-[#F4F7F5]">
        <div className={SECTION}>
          <h2 className={H2} style={{ color: 'black' }}>어떤 상황에서든 형사 전문 변호사가 함께합니다</h2>
          <p className="mt-5 text-[28px] text-[#555656] max-3xl:text-[24px] max-lg:text-[20px] max-md:text-[16px]">
            의뢰인의 권익만을 생각하고 대응하는 형사 전문 변호사와 함께하세요
          </p>
          <div className="mt-16 grid grid-cols-2 gap-8 text-left max-md:grid-cols-1">
            {[
              { h: '범죄 피해자', sub: '가 되었어요', ...VICTIM },
              { h: '형사사건 피의자', sub: '가 되었어요', ...SUSPECT },
            ].map((col) => (
              <div key={col.h} className="rounded-[24px] bg-white p-10 max-md:p-6" style={{ border: '1px solid #EAF2EE' }}>
                <div
                  className="mx-auto flex w-fit items-center gap-7 px-[34px] py-4 text-[24px] font-extrabold tracking-tight text-white max-3xl:gap-6 max-3xl:px-7 max-3xl:text-[22px] max-xl:gap-4 max-xl:px-5"
                  style={{ background: FOREST }}
                >
                  <span style={{ color: ACCENT }}>{col.h}</span>{col.sub}
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {col.tags.map((t) => (
                    <span key={t} className="rounded-full px-3 py-1 text-[14px]" style={{ background: '#EAF2EE', color: MIDEM }}>
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  {col.outs.map((o) => (
                    <span key={o} className="rounded-md px-4 py-2 text-[15px] font-[800] text-black" style={{ background: ACCENT }}>
                      {o}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== REPRESENTATIVE CASES ===== */}
      <section className="relative bg-white">
        <div className={SECTION}>
          <h2 className={H2} style={{ color: 'black' }}>형사 변호 대표 업무사례</h2>
          <p className="mt-6 text-[28px] text-[#555656] max-3xl:text-[24px] max-lg:text-[20px] max-md:text-[15px]">
            대한중앙이 직접 수행해 의뢰인에게 유리한 결과를 이끌어낸 대표 사례입니다
          </p>
          <ul className="mt-14 grid grid-cols-2 gap-6 text-left max-lg:grid-cols-1">
            {CASES.map(([desc, result]) => (
              <li
                key={result}
                className="flex items-start justify-between gap-4 rounded-[16px] border bg-[#F4F7F5] p-7"
                style={{ borderColor: '#EAF2EE' }}
              >
                <div className="flex items-start gap-3">
                  <Gavel size={22} style={{ color: '#1F6F5C' }} className="mt-1 shrink-0" />
                  <p className="text-[17px] leading-[1.6] text-[#555656]">{desc}</p>
                </div>
                <span className="shrink-0 rounded-md px-3 py-1.5 text-[14px] font-[800] text-white" style={{ background: '#1F6F5C' }}>
                  {result}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* footer-spacing band kept from spec; Layout's Footer follows below */}
      <div className="relative mb-[155px] max-lg:mb-[20px]" aria-hidden />
    </div>
  );
};

export default CriminalLawLanding;
