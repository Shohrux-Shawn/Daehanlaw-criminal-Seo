import React from 'react';
import Link from 'next/link';
import { ArrowRight, Calendar } from 'lucide-react';
import type { Article } from '@daehanlaw/graphql';
import { GlowCard } from '@/components/ui/spotlight-card';

interface SectionInsightsProps {
  articles: Article[];
}

function stripHtml(html: string, max = 140): string {
  const plain = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  return plain.length > max ? plain.slice(0, max) + '…' : plain;
}

function resolveArticleImage(path: string | undefined): string {
  if (!path) return 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1200&auto=format&fit=crop';
  if (path.startsWith('http')) return path;
  return `https://api.daehanlaw.com/${path}`;
}

function fmtDate(d?: string): string {
  if (!d) return '';
  try { return new Date(d).toLocaleDateString('ko-KR'); } catch { return ''; }
}

export default function SectionInsights({ articles }: SectionInsightsProps) {
  if (articles.length === 0) return null;
  const [featured, ...rest] = articles.slice(0, 4);

  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div>
            <p className="eyebrow mb-3">Insights</p>
            <h2 className="heading-lg">
              형사 법률정보
            </h2>
            <p className="mt-4 text-[15px] text-[color:var(--ink-muted)] leading-relaxed max-w-xl">
              전문 변호사가 직접 작성한 최신 형사 법률 동향과 실무 가이드.
            </p>
          </div>
          <Link href="/articles" className="inline-flex items-center gap-2 text-[14px] font-semibold text-[color:var(--gold-warm-deep)] hover:text-[color:var(--ink-strong)] no-underline whitespace-nowrap">
            전체 글 보기 <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Featured */}
          <GlowCard customSize glowColor="warm" className="bg-white shadow-[0_8px_30px_rgba(60,40,20,0.06)] hover:shadow-[0_16px_40px_rgba(60,40,20,0.12)] transition-shadow overflow-hidden">
          <Link
            href={`/articles/${featured._id}`}
            className="group flex flex-col no-underline h-full"
          >
            <div className="aspect-[16/9] overflow-hidden bg-[#f5ede0]">
              <img
                src={resolveArticleImage(featured.articleImage?.[0])}
                alt={featured.articleTitle}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6 sm:p-8 flex flex-col flex-1">
              <div className="flex items-center gap-3 text-[12px] text-[color:var(--gold-warm-deep)] font-semibold mb-3">
                <span className="px-2.5 py-1 rounded-full bg-[color:var(--gold-warm)]/10 border border-[color:var(--gold-warm)]/30">법률정보</span>
                {featured.createdAt && (
                  <span className="inline-flex items-center gap-1 text-[color:var(--ink-muted)]">
                    <Calendar className="w-3 h-3" />
                    {fmtDate(featured.createdAt)}
                  </span>
                )}
              </div>
              <h3 className="text-[20px] sm:text-[22px] font-extrabold text-[color:var(--ink-strong)] tracking-tight leading-snug mb-3 line-clamp-2 group-hover:text-[color:var(--gold-warm-deep)] transition-colors">
                {featured.articleTitle}
              </h3>
              <p className="text-[14px] text-[color:var(--ink-muted)] leading-relaxed line-clamp-3 flex-1">
                {stripHtml(featured.articleContent ?? '', 180)}
              </p>
            </div>
          </Link>
          </GlowCard>

          {/* Side list */}
          <div className="flex flex-col gap-5">
            {rest.slice(0, 3).map((a) => (
              <GlowCard key={a._id} customSize glowColor="warm" className="bg-white shadow-[0_4px_18px_rgba(60,40,20,0.05)] hover:shadow-[0_10px_28px_rgba(60,40,20,0.1)] transition-shadow">
              <Link
                href={`/articles/${a._id}`}
                className="group flex gap-4 sm:gap-5 p-4 sm:p-5 no-underline h-full"
              >
                <div className="flex-shrink-0 w-28 sm:w-36 aspect-square rounded-xl overflow-hidden bg-[#f5ede0]">
                  <img
                    src={resolveArticleImage(a.articleImage?.[0])}
                    alt={a.articleTitle}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex flex-col justify-center flex-1 min-w-0">
                  {a.createdAt && (
                    <span className="text-[11px] text-[color:var(--ink-muted)] mb-1.5">{fmtDate(a.createdAt)}</span>
                  )}
                  <h3 className="text-[15px] sm:text-[16px] font-bold text-[color:var(--ink-strong)] tracking-tight leading-snug line-clamp-2 group-hover:text-[color:var(--gold-warm-deep)] transition-colors">
                    {a.articleTitle}
                  </h3>
                </div>
              </Link>
              </GlowCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
