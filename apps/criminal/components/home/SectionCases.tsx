import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Case } from '@daehanlaw/graphql';
import { GlowCard } from '@/components/ui/spotlight-card';

interface SectionCasesProps {
  cases: Case[];
}

const STATIC_FALLBACK = [
  { _id: 'demo-1', caseTitle: '특수폭행 무죄 판결', caseDesc: '정당방위 입증을 통해 1심 무죄, 검찰 항소 기각.',     caseStatus: '무죄' },
  { _id: 'demo-2', caseTitle: '사기 고소 혐의없음', caseDesc: '거래 채무불이행에 불과함을 입증, 검찰 혐의없음 처분.', caseStatus: '불기소' },
  { _id: 'demo-3', caseTitle: '음주운전 재범 집행유예', caseDesc: '치료의지·환경요인 입증으로 집행유예 선고.',         caseStatus: '집행유예' },
  { _id: 'demo-4', caseTitle: '횡령 구속영장 기각', caseDesc: '도주·증거인멸 우려 없음 소명, 영장 기각.',               caseStatus: '구속기각' },
  { _id: 'demo-5', caseTitle: '항소심 파기환송', caseDesc: '양형 부당 인정, 대법원 파기환송.',                          caseStatus: '파기환송' },
  { _id: 'demo-6', caseTitle: '마약 단순소지 벌금형', caseDesc: '초범·자수·치료의지 입증으로 벌금형 감형.',             caseStatus: '감형' },
];

function resultChipStyles(status?: string | null): string {
  const s = (status ?? '').trim();
  if (['승소', '무죄'].includes(s))          return 'bg-emerald-600/10 text-emerald-700 border border-emerald-600/30';
  if (['불기소', '구속기각'].includes(s))     return 'bg-sky-600/10 text-sky-700 border border-sky-600/30';
  if (['집행유예', '감형'].includes(s))       return 'bg-amber-600/10 text-amber-800 border border-amber-600/30';
  if (['파기환송', '결정'].includes(s))       return 'bg-purple-600/10 text-purple-700 border border-purple-600/30';
  return 'bg-[color:var(--gold-warm)]/10 text-[color:var(--gold-warm-deep)] border border-[color:var(--gold-warm)]/30';
}

export default function SectionCases({ cases }: SectionCasesProps) {
  const display = cases.length > 0 ? cases.slice(0, 6) : (STATIC_FALLBACK as unknown as Case[]);

  return (
    <section className="py-20 sm:py-28" style={{ background: 'var(--cream-section)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div>
            <p className="eyebrow mb-3">Case Results</p>
            <h2 className="heading-lg">
              형사사건<br className="sm:hidden" /> 주요 변호 실적
            </h2>
            <p className="mt-4 text-[15px] text-[color:var(--ink-muted)] leading-relaxed max-w-xl">
              누적 수임 사례 중 의뢰인에게 유리한 결과를 이끌어낸 실제 사건들입니다.
            </p>
          </div>
          <Link href="/cases" className="inline-flex items-center gap-2 text-[14px] font-semibold text-[color:var(--gold-warm-deep)] hover:text-[color:var(--ink-strong)] no-underline whitespace-nowrap">
            전체 사례 보기 <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {display.map((c) => (
            <GlowCard key={c._id} customSize glowColor="warm" className="bg-white shadow-[0_8px_30px_rgba(60,40,20,0.06)] hover:shadow-[0_16px_40px_rgba(60,40,20,0.12)] transition-shadow">
            <Link
              href={`/cases/${c._id}`}
              className="group flex flex-col p-7 no-underline h-full"
            >
              {c.caseStatus && (
                <span className={`inline-flex self-start items-center px-3 py-1 rounded-full text-[11px] font-bold tracking-wide mb-4 ${resultChipStyles(c.caseStatus as string)}`}>
                  {c.caseStatus}
                </span>
              )}
              <h3 className="text-[18px] sm:text-[19px] font-extrabold text-[color:var(--ink-strong)] tracking-tight leading-snug mb-3 line-clamp-2 group-hover:text-[color:var(--gold-warm-deep)] transition-colors">
                {c.caseTitle}
              </h3>
              <p className="text-[13.5px] text-[color:var(--ink-muted)] leading-relaxed line-clamp-3 flex-1">
                {c.caseDesc}
              </p>
              <div className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[color:var(--gold-warm-deep)] opacity-80 group-hover:opacity-100 transition-opacity">
                자세히 보기 <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  );
}
