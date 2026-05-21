import { useState } from 'react';
import type { GetStaticProps } from 'next';
import Layout from '@/components/Layout';
import { SITE_CONFIG } from '@/site.config';
import { mainSiteLink } from '@daehanlaw/config';
import { SeoHead } from '@daehanlaw/ui';

const ACCENT = '#1a2f5c';

interface Subgroup { label: string; items: string[]; }
interface Card { title: string; slug: string; subgroups: Subgroup[]; wide?: boolean; }
interface Section { id: string; label: string; cards: Card[]; }

const SECTIONS: Section[] = [
  {
    id: '형사', label: '형사',
    cards: [
      {
        title: '형사', slug: 'criminal',
        subgroups: [
          { label: '강력·폭력범죄',  items: ['살인 및 사망사고', '강도 및 절도', '폭행·상해죄', '협박 및 불법감금', '방화죄'] },
          { label: '재산·경제범죄',  items: ['사기죄', '횡령 및 배임죄', '컴퓨터 이용 사기', '보험 사기죄', '지식재산권 침해'] },
          { label: '일반 형사사건',  items: ['교통사고 형사처리', '명예훼손 및 모욕죄', '무고죄', '위증죄', '공문서 위조·변조'] },
        ],
      },
      {
        title: '마약', slug: 'drugs',
        subgroups: [
          { label: '마약·약물 관련 범죄', items: ['마약 매매 및 알선', '마약 수출입 및 제조', '마약 운반', '마약 투약 및 소지', '약물 복용 후 운전', '향정신성 의약품 관련 범죄'] },
        ],
      },
      {
        title: '성범죄', slug: 'sex-crimes',
        subgroups: [
          { label: '성범죄 피해 보호 및 디지털 성범죄', items: ['강간죄(성폭행)', '강제추행죄(성추행)', '공연음란죄', '공중밀집장소 추행', '미성년자 의제강간죄', '성매매 관련 범죄', '성범죄 피해자 보호', '성희롱', '아청법(아동청소년보호법)', '음란물 유포죄', '장애인 성폭행', '직장 내 성희롱', '카메라 등 이용 촬영죄'] },
        ],
      },
      {
        title: '학교폭력대응', slug: 'school-violence',
        subgroups: [
          { label: '소년법 및 학교폭력 사건', items: ['소년범죄', '학교폭력', '학교폭력대책심의위원회', '학교폭력 신고 절차', '학교폭력 행정소송'] },
        ],
      },
    ],
  },
  {
    id: '민사·가사', label: '민사·가사 및 교통',
    cards: [
      {
        title: '이혼', slug: 'divorce',
        subgroups: [
          { label: '가사 소송 및 법적 분쟁', items: ['사실혼 해소', '상간소송', '약혼 해제', '양육비 청구소송', '이혼 위자료', '재산분할 소송', '재판이혼', '접근금지 사전처분', '조정이혼', '친권자 변경', '협의이혼'] },
        ],
      },
      {
        title: '상속·가사', slug: 'inheritance-family',
        subgroups: [
          { label: '자산 승계 및 상속 법률자문', items: ['기여분 청구소송', '등록부 정정', '양육비', '유류분 반환청구소송', '유언', '인지청구', '입양', '자산관리', '증여', '친생자 부존재', '한정승인 및 상속포기', '후견인'] },
        ],
      },
      {
        title: '음주교통사고', slug: 'dui-traffic',
        subgroups: [
          { label: '음주운전 및 교통사고 형사·행정처리', items: ['12대 중과실', '교통사고·음주운전 행정처분', '교통사고 범칙점수', '교통사고처리특례법', '무면허 운전', '사고 후 미조치 및 뺑소니', '어린이 보호구역 교통사고', '음주운전 처벌'] },
          { label: '교통사고 민사소송 및 손해배상', items: ['교통사고 과실비율', '교통사고 보험소송', '교통사고 손해배상', '교통사고 증거 수집', '교통사망 사고', '합의 및 조정'] },
        ],
      },
      {
        title: '노동·산재', slug: 'labor-accident',
        subgroups: [
          { label: '인사·노무 법률자문',  items: ['노란봉투법', '부당노동행위', '인사·노무 컴플라이언스', '징계 및 해고', '취업규칙'] },
          { label: '노동분쟁 법적 대응', items: ['근로기준법 위반', '근로자 지위확인 소송', '부당해고 구제', '비정규직 권리 보호', '임금체불 신고 대응', '직장 내 괴롭힘 조사', '통상임금 소송', '파견법 위반'] },
        ],
      },
    ],
  },
  {
    id: '기업·행정', label: '기업·행정',
    cards: [
      {
        title: '헌법행정', slug: 'constitutional-admin',
        subgroups: [
          { label: '행정 및 공법 분쟁 대응', items: ['공무원 직위해제', '국가배상 청구권', '리콜', '소청심사', '영업정지 구제', '위헌법률심판 및 헌법소원', '유권해석', '집행정지', '행정소송', '행정심판 청구'] },
        ],
      },
      {
        title: '건설·부동산', slug: 'construction-real-estate',
        subgroups: [
          { label: '부동산 개발 관련',         items: ['건설공사 계약', '하자보수 분쟁', '재개발·재건축', '부동산 PF', '건설 분쟁'] },
          { label: '부동산 분쟁 및 권리 구제', items: ['임대차 분쟁', '부동산 경매', '매매', '소유권·등기', '명도소송'] },
        ],
      },
      {
        title: '기업 법무', slug: 'corporate-rehabilitation', wide: true,
        subgroups: [
          { label: '기업 구조 개편',             items: ['기업결합', '기업분할', '기업실사', '기업 인수합병', '적대적 M&A', '주식교환 및 주식이전', '합작투자'] },
          { label: '기업지배구조 및 주주권',     items: ['경영권 분쟁', '기업지배구조 개선', '주주 간 분쟁', '주주 행동주의'] },
          { label: '기업 거래 법률자문',          items: ['계약서 검토', '공공계약', '기업 거래 정책', '기업 법률자문', '정부조달'] },
          { label: '벤처 및 스타트업',           items: ['스타트업 법인설립', '스타트업 M&A', '스톡옵션'] },
        ],
      },
    ],
  },
];

function itemHref(SITE_CONFIG: any, slug: string, item: string): string {
  if (slug === 'criminal') return `/practice/criminal`;
  return mainSiteLink(SITE_CONFIG, `/practice/${slug}/${encodeURIComponent(item)}`);
}

function cardHref(config: any, slug: string): string {
  if (slug === 'criminal') return '/practice/criminal';
  return mainSiteLink(config, `/practice/${slug}`);
}

function GroupCard({ card, config }: { card: Card; config: typeof SITE_CONFIG }) {
  const [openSet, setOpenSet] = useState<Set<string>>(new Set());
  const totalItems = card.subgroups.reduce((n, sg) => n + sg.items.length, 0);
  const isInternal = card.slug === 'criminal';
  const href = cardHref(config, card.slug);

  function toggle(label: string) {
    setOpenSet(prev => {
      const next = new Set(prev);
      next.has(label) ? next.delete(label) : next.add(label);
      return next;
    });
  }

  return (
    <div
      className={`flex flex-col bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden${card.wide ? ' md:col-span-2' : ''}`}
      style={{ borderTop: `3px solid ${ACCENT}` }}
    >
      {/* Card header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <h3 className="text-[18px] font-extrabold text-gray-900 tracking-[-0.3px]">{card.title}</h3>
          <span className="text-[11px] font-semibold text-gray-400 bg-gray-100 rounded-full px-2 py-0.5">{totalItems}개</span>
        </div>
        <a
          href={href}
          target={isInternal ? undefined : '_blank'}
          rel={isInternal ? undefined : 'noopener noreferrer'}
          className="flex items-center gap-1 px-4 py-1.5 text-[12px] font-semibold rounded-full border transition-all no-underline flex-shrink-0"
          style={{ borderColor: ACCENT, color: ACCENT }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = ACCENT; (e.currentTarget as HTMLElement).style.color = '#fff'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = ''; (e.currentTarget as HTMLElement).style.color = ACCENT; }}
        >
          바로가기 →
        </a>
      </div>

      {/* Subgroups accordion */}
      <div className="flex flex-col divide-y divide-gray-100">
        {card.subgroups.map(sg => {
          const open = openSet.has(sg.label);
          return (
            <div key={sg.label}>
              <button
                onClick={() => toggle(sg.label)}
                className={`w-full flex items-center justify-between px-6 py-[18px] text-left transition-colors ${open ? 'bg-[#1a2f5c]' : 'hover:bg-gray-50'}`}
              >
                <span className={`text-[13.5px] font-semibold tracking-[-0.25px] ${open ? 'text-white' : 'text-gray-700'}`}>
                  {sg.label}
                </span>
                <span className={`w-6 h-6 rounded-full border flex items-center justify-center flex-shrink-0 text-[22px] leading-none transition-colors ${open ? 'border-white/40 text-white' : 'border-gray-200 text-gray-400'}`}>
                  {open ? '×' : '+'}
                </span>
              </button>
              {open && (
                <div className="flex flex-col divide-y divide-gray-100 bg-slate-50">
                  {sg.items.map(item => {
                    const iHref = itemHref(config, card.slug, item);
                    const iInternal = card.slug === 'criminal';
                    return (
                      <a
                        key={item}
                        href={iHref}
                        target={iInternal ? undefined : '_blank'}
                        rel={iInternal ? undefined : 'noopener noreferrer'}
                        className="flex items-center justify-between pl-10 pr-6 py-[11px] hover:bg-blue-50 transition-colors group no-underline"
                      >
                        <span className="text-[14.5px] text-gray-600 group-hover:text-[#1a2f5c] tracking-[-0.25px]">{item}</span>
                        <span className="w-5 h-5 rounded-full border border-gray-200 flex items-center justify-center text-[18px] text-gray-400 group-hover:border-[#1a2f5c] group-hover:text-[#1a2f5c] group-hover:bg-[#1a2f5c]/5 transition-colors flex-shrink-0">→</span>
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function PracticeAllPage() {
  const [search, setSearch] = useState('');

  const allCards = SECTIONS.flatMap(s => s.cards);
  const filtered = search.trim()
    ? allCards.filter(c =>
        c.title.includes(search) ||
        c.subgroups.some(sg => sg.label.includes(search) || sg.items.some(i => i.includes(search)))
      )
    : null;

  return (
    <Layout>
      <SeoHead
        config={SITE_CONFIG}
        title="전체 업무분야"
        description="법무법인 대한중앙의 전체 업무분야를 확인하세요."
        canonicalPath="/practice/all"
      />

      {/* Search bar */}
      <div className="w-full bg-gray-50 border-b border-gray-100 py-8 px-4">
        <div className="max-w-[640px] mx-auto">
          <div className="flex items-center bg-white border-2 border-[#1a2f5c] rounded-full shadow-sm focus-within:border-[#1a2f5c] transition-colors overflow-hidden">
            <svg className="w-4 h-4 text-gray-300 ml-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="분야 또는 세부 항목 검색 (예: 사기, 폭행, 마약)"
              className="flex-1 px-4 py-3.5 text-[13.5px] text-gray-800 outline-none placeholder:text-gray-300 bg-transparent tracking-[-0.25px]"
            />
            {search && (
              <button onClick={() => setSearch('')} className="mr-3 text-gray-300 hover:text-gray-500 text-lg leading-none">×</button>
            )}
            <button className="flex items-center gap-1.5 px-5 py-3 bg-[#1a2f5c] text-white text-[13px] font-bold rounded-full hover:bg-[#152448] transition-colors flex-shrink-0 m-1">
              검색
            </button>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="w-full max-w-[1200px] mx-auto py-14 px-5 sm:px-10">

        {filtered !== null ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filtered.length === 0 ? (
              <p className="md:col-span-2 text-center text-gray-400 py-24 text-[14px]">
                &ldquo;{search}&rdquo;에 대한 분야가 없습니다
              </p>
            ) : (
              filtered.map(c => <GroupCard key={c.slug} card={c} config={SITE_CONFIG} />)
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-10">
            {SECTIONS.map(section => (
              <div key={section.id}>
                {/* Section header */}
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-4 h-4 rounded flex-shrink-0" style={{ background: ACCENT }} />
                  <h2 className="text-[15px] font-extrabold tracking-[0.5px] uppercase" style={{ color: ACCENT }}>
                    {section.label}
                  </h2>
                  <span className="text-[11px] font-semibold text-gray-400 bg-gray-100 rounded-full px-2 py-0.5">
                    {section.cards.length}개 분야
                  </span>
                  <div className="flex-1 h-px bg-gray-100" />
                </div>
                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {section.cards.map(c => <GroupCard key={c.slug} card={c} config={SITE_CONFIG} />)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => ({ props: {}, revalidate: 3600 });
