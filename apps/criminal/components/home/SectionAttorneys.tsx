import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Agent } from '@daehanlaw/graphql';

interface SectionAttorneysProps {
  agents: Agent[];
}

function resolveAgentImage(path: string | undefined): string {
  if (!path) return '/attorney-placeholder.png';
  if (path.startsWith('http')) return path;
  return `https://api.daehanlaw.com/${path}`;
}

export default function SectionAttorneys({ agents }: SectionAttorneysProps) {
  const list = agents.slice(0, 6);

  return (
    <section className="py-20 sm:py-28" style={{ background: 'var(--cream-section)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div>
            <p className="eyebrow mb-3">Our Attorneys</p>
            <h2 className="heading-lg">
              형사 전문<br className="sm:hidden" /> 변호사진
            </h2>
            <p className="mt-4 text-[15px] text-[color:var(--ink-muted)] leading-relaxed max-w-xl">
              수사 단계부터 항소심까지 — 의뢰인의 사건을 처음부터 끝까지 직접 담당하는 전문 변호사들입니다.
            </p>
          </div>
          <Link href="/attorneys" className="inline-flex items-center gap-2 text-[14px] font-semibold text-[color:var(--gold-warm-deep)] hover:text-[color:var(--ink-strong)] no-underline whitespace-nowrap">
            전체 변호사 보기 <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {list.length === 0 ? (
          <p className="text-center py-16 text-[color:var(--ink-muted)]">등록된 변호사가 없습니다.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
            {list.map((a) => (
              <a
                key={a._id}
                href={`https://www.daehanlaw.com/attorneys/${a._id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col rounded-2xl overflow-hidden bg-white border border-[#e8dcc4]/60 shadow-[0_8px_30px_rgba(60,40,20,0.06)] hover:shadow-[0_16px_40px_rgba(60,40,20,0.12)] hover:-translate-y-1 transition-all duration-300 no-underline"
              >
                <div className="aspect-[3/4] bg-[#f5ede0] overflow-hidden">
                  <img
                    src={resolveAgentImage(a.agentImage?.[0])}
                    alt={a.agentFullName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 sm:p-5">
                  <p className="text-[11px] font-bold tracking-[0.12em] text-[color:var(--gold-warm-deep)] uppercase mb-1">
                    Lawyer
                  </p>
                  <h3 className="text-[16px] sm:text-[17px] font-extrabold text-[color:var(--ink-strong)] tracking-tight">
                    {a.agentFullName}
                  </h3>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
