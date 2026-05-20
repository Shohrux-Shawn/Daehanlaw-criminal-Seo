import { useState, useEffect, useRef, FormEvent } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useQuery } from '@apollo/client';
import { GET_CASES, GET_ARTICLES, GET_AGENTS } from '@daehanlaw/graphql';
import type { Case, Cases, Article, Articles, Agent, Agents } from '@daehanlaw/graphql';
import Layout from '@/components/Layout';
import { SeoHead } from '@daehanlaw/ui';
import { SITE_CONFIG } from '@/site.config';
import PageHero from '@/components/ui/PageHero';

/* ── Utilities ─────────────────────────────────────────────────────────────── */

function escapeRegex(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function highlight(text: string, kw: string) {
  if (!kw || !text) return escapeHtml(text);
  const safe   = escapeHtml(text);
  const safeKw = escapeHtml(kw);
  const re     = new RegExp(`(${escapeRegex(safeKw)})`, 'gi');
  return safe.replace(re, '<mark class="bg-gold-200 text-navy-900 rounded-sm px-0.5">$1</mark>');
}

function clientFilter<T extends object>(items: T[], fields: (keyof T)[], kw: string): T[] {
  if (!kw.trim()) return [];
  const q = kw.toLowerCase();
  return items.filter(item =>
    fields.some(f => String((item as Record<keyof T, unknown>)[f] ?? '').toLowerCase().includes(q)),
  );
}

/* ── Category mappings ─────────────────────────────────────────────────────── */

const CAT_HREF: Record<string, string> = {
  INSIGHT:    '/articles',
  ANALYSIS:   '/articles',
  LEGAL_INFO: '/articles',
  KNOWLEDGE:  '/articles',
  REVIEW:     '/cases',
};

const CAT_LABEL: Record<string, string> = {
  INSIGHT:    '인사이트',
  ANALYSIS:   '사례분석',
  LEGAL_INFO: '법률정보',
  KNOWLEDGE:  '법률지식인',
  REVIEW:     '고객후기',
};

/* ── Tabs ──────────────────────────────────────────────────────────────────── */

type TabKey = 'all' | 'cases' | 'legal_info' | 'agents' | 'review' | 'insight' | 'analysis';

const TABS: { key: TabKey; label: string }[] = [
  { key: 'all',        label: '전체' },
  { key: 'cases',      label: '업무사례' },
  { key: 'legal_info', label: '법률정보' },
  { key: 'agents',     label: '구성원' },
  { key: 'review',     label: '고객후기' },
  { key: 'insight',    label: '언론보도' },
  { key: 'analysis',   label: '사례분석/최신동향' },
];

/* ── Row components ────────────────────────────────────────────────────────── */

function CaseRow({ item, kw }: { item: Case; kw: string }) {
  return (
    <Link href="/cases" className="flex items-start gap-2 text-[13px] sm:text-[14px] text-gray-700 hover:text-navy-800 transition-colors group no-underline">
      <span className="flex-shrink-0 text-gray-400 mt-[1px]">•</span>
      <span className="flex items-center gap-1.5 flex-wrap">
        <span className="text-navy-700 font-medium text-[12px]">업무사례</span>
        <span className="text-gray-400">›</span>
        <span dangerouslySetInnerHTML={{ __html: highlight(item.caseTitle, kw) }} />
      </span>
    </Link>
  );
}

function ArticleRow({ item, kw }: { item: Article; kw: string }) {
  const href     = CAT_HREF[item.articleCategory]  ?? '/articles';
  const catLabel = CAT_LABEL[item.articleCategory] ?? item.articleCategory;
  return (
    <Link href={href} className="flex items-start gap-2 text-[13px] sm:text-[14px] text-gray-700 hover:text-navy-800 transition-colors no-underline">
      <span className="flex-shrink-0 text-gray-400 mt-[1px]">•</span>
      <span className="flex items-center gap-1.5 flex-wrap">
        <span className="text-navy-700 font-medium text-[12px]">{catLabel}</span>
        <span className="text-gray-400">›</span>
        <span dangerouslySetInnerHTML={{ __html: highlight(item.articleTitle, kw) }} />
      </span>
    </Link>
  );
}

function AgentRow({ item, kw }: { item: Agent; kw: string }) {
  return (
    <Link href="/attorneys" className="flex items-start gap-2 text-[13px] sm:text-[14px] text-gray-700 hover:text-navy-800 transition-colors no-underline">
      <span className="flex-shrink-0 text-gray-400 mt-[1px]">•</span>
      <span className="flex items-center gap-1.5 flex-wrap">
        <span className="text-navy-700 font-medium text-[12px]">구성원</span>
        <span className="text-gray-400">›</span>
        <span dangerouslySetInnerHTML={{ __html: highlight(item.agentFullName, kw) }} />
      </span>
    </Link>
  );
}

/* ── Expandable result section ─────────────────────────────────────────────── */

function ResultSection<T>({
  title, count, items, renderRow, initialShow = 6,
}: {
  title: string;
  count: number;
  items: T[];
  renderRow: (item: T) => React.ReactNode;
  initialShow?: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? items : items.slice(0, initialShow);

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-4 mb-5 sm:mb-6">
        <h2 className="text-[18px] sm:text-[20px] lg:text-[22px] font-black text-gray-900 tracking-[-0.25px] whitespace-nowrap">
          {title}
          <span className="text-navy-700 font-black"> ({count.toLocaleString()})</span>
        </h2>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[10px] sm:gap-3">
        {visible.map((item, idx) => (
          <div key={idx}>{renderRow(item)}</div>
        ))}
      </div>

      {items.length > initialShow && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setExpanded(p => !p)}
            className="px-10 py-2.5 border border-gray-300 text-[13px] font-semibold text-gray-600 hover:border-navy-400 hover:text-navy-800 transition-colors rounded"
          >
            {expanded ? '접기 −' : '더보기 +'}
          </button>
        </div>
      )}
    </div>
  );
}

/* ── Page ──────────────────────────────────────────────────────────────────── */

export default function SearchPage() {
  const router  = useRouter();
  const keyword = String(router.query.q ?? '').trim();

  const [inputValue, setInputValue] = useState(keyword);
  const [activeTab,  setActiveTab]  = useState<TabKey>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { setInputValue(keyword); }, [keyword]);
  useEffect(() => { setActiveTab('all'); },   [keyword]);

  const skip = !keyword;

  const { data: casesData,    loading: lCases }    = useQuery<{ getCases: Cases }>(GET_CASES, {
    variables: { input: { page: 1, limit: 200, sort: 'createdAt', direction: 'DESC', search: { siteOrigin: SITE_CONFIG.siteOrigin } } },
    skip,
  });
  const { data: articlesData, loading: lArticles } = useQuery<{ getArticles: Articles }>(GET_ARTICLES, {
    variables: { input: { page: 1, limit: 200, sort: 'createdAt', direction: 'DESC', search: { siteOrigin: SITE_CONFIG.siteOrigin } } },
    skip,
  });
  const { data: agentsData,   loading: lAgents }   = useQuery<{ getAgents: Agents }>(GET_AGENTS, {
    variables: { input: { page: 1, limit: 50, sort: 'createdAt', direction: 'DESC', search: {} } },
    skip,
  });

  const loading = lCases || lArticles || lAgents;

  const allCases    = casesData?.getCases?.list    ?? [];
  const allArticles = articlesData?.getArticles?.list ?? [];
  const allAgents   = agentsData?.getAgents?.list  ?? [];

  const matchCases    = clientFilter<Case>(allCases,    ['caseTitle', 'caseDesc', 'caseType'] as (keyof Case)[], keyword);
  const matchArticles = clientFilter<Article>(allArticles, ['articleTitle', 'articleContent', 'articleCategory'] as (keyof Article)[], keyword);
  const matchAgents   = clientFilter<Agent>(allAgents,  ['agentFullName', 'agentDesc'] as (keyof Agent)[], keyword);

  const byCategory = (cat: string) => matchArticles.filter(a => a.articleCategory === cat);
  const legal    = byCategory('LEGAL_INFO');
  const reviews  = byCategory('REVIEW');
  const insights = byCategory('INSIGHT');
  const analysis = byCategory('ANALYSIS');
  const others   = matchArticles.filter(a => !['LEGAL_INFO','REVIEW','INSIGHT','ANALYSIS'].includes(a.articleCategory));

  const totalCount = matchCases.length + matchArticles.length + matchAgents.length;

  const tabCount: Record<TabKey, number> = {
    all:        totalCount,
    cases:      matchCases.length,
    legal_info: legal.length,
    agents:     matchAgents.length,
    review:     reviews.length,
    insight:    insights.length,
    analysis:   analysis.length + others.length,
  };

  function handleSubmit(e?: FormEvent) {
    e?.preventDefault();
    if (inputValue.trim()) {
      router.push(`/search?q=${encodeURIComponent(inputValue.trim())}`);
    }
  }

  const showSection = (key: TabKey) => activeTab === 'all' || activeTab === key;

  return (
    <>
      <SeoHead
        config={SITE_CONFIG}
        title={keyword ? `"${keyword}" 검색결과 | 통합검색` : '통합검색 | 대한중앙 형사전문센터'}
        description="대한중앙 형사전문센터 통합검색. 변호사, 업무사례, 법률정보 등을 검색하세요."
        canonicalPath="/search"
      />
      <Layout>

        <PageHero
          crumbs={[{ label: '⌂', href: '/' }, { label: '통합검색' }]}
          title="통합검색"
          label="SEARCH"
          backgroundImage="/back.jpg"
        />

        {/* Search box */}
        <div className="w-full bg-[#f3f5f9] py-8 sm:py-10">
          <div className="max-w-[760px] mx-auto px-5 sm:px-10 flex flex-col items-center gap-3.5">
            <form
              onSubmit={handleSubmit}
              className="w-full flex items-center bg-white rounded-full overflow-hidden shadow-sm"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                placeholder="변호사, 승소사례, 법률정보 등을 검색해보세요"
                className="flex-1 min-w-0 px-6 py-3.5 sm:py-4 text-[14px] sm:text-[15px] text-gray-800 outline-none placeholder:text-gray-400 bg-transparent"
              />
              <button
                type="submit"
                className="flex-shrink-0 flex items-center gap-1.5 px-6 py-3.5 sm:py-4 text-[14px] font-bold text-white rounded-full transition-opacity hover:opacity-90 bg-navy-900"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
                검색
              </button>
            </form>

            {keyword && !loading && (
              <p className="text-[14px] sm:text-[15px] text-gray-600 text-center tracking-[-0.25px]">
                총 <strong className="font-black text-navy-800">{totalCount.toLocaleString()}건</strong>의 검색 결과가 있습니다
              </p>
            )}
            {keyword && loading && (
              <p className="text-[14px] sm:text-[15px] text-gray-400 text-center">검색 중...</p>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="max-w-[1920px] mx-auto px-5 sm:px-[60px] lg:px-[120px] pb-20 sm:pb-[100px]">

          {/* Tabs */}
          {keyword && (
            <div className="w-full border-b border-gray-200 mt-12 sm:mt-14 overflow-x-auto">
              <div className="flex items-stretch min-w-max">
                {TABS.map(tab => {
                  const cnt      = tabCount[tab.key];
                  const isActive = activeTab === tab.key;
                  return (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key)}
                      className={[
                        'flex items-baseline gap-1 px-4 sm:px-5 py-3 sm:py-3.5',
                        'text-[13px] sm:text-[14px] whitespace-nowrap border-b-2 transition-colors',
                        isActive
                          ? 'font-bold text-white border-navy-900 bg-navy-900'
                          : 'font-medium text-gray-500 border-transparent hover:text-gray-800',
                      ].join(' ')}
                    >
                      <span>{tab.label}</span>
                      {!loading && (
                        <span className="text-[11px] sm:text-[12px] font-normal opacity-75">
                          ({cnt.toLocaleString()})
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Results */}
          <div className="mt-10 sm:mt-12">

            {!keyword && (
              <div className="py-20 text-center">
                <svg className="w-14 h-14 text-gray-200 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
                <p className="text-[16px] font-semibold text-gray-500 mb-1.5">검색어를 입력해주세요</p>
                <p className="text-[13px] text-gray-400">변호사, 업무사례, 법률정보 등을 검색할 수 있습니다.</p>
              </div>
            )}

            {keyword && loading && (
              <div className="py-20 text-center text-gray-400">
                <svg className="w-8 h-8 animate-spin mx-auto mb-3" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
                검색 중...
              </div>
            )}

            {keyword && !loading && totalCount === 0 && (
              <div className="py-20 text-center">
                <svg className="w-14 h-14 text-gray-200 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
                <p className="text-[16px] font-semibold text-gray-700 mb-1.5">
                  &quot;{keyword}&quot;에 대한 검색 결과가 없습니다
                </p>
                <p className="text-[13px] text-gray-400">다른 키워드로 검색해보세요.</p>
              </div>
            )}

            {keyword && !loading && totalCount > 0 && (
              <div className="space-y-12 sm:space-y-14">
                {showSection('cases') && matchCases.length > 0 && (
                  <ResultSection title="업무사례" count={matchCases.length} items={matchCases}
                    renderRow={item => <CaseRow item={item} kw={keyword} />} />
                )}
                {showSection('legal_info') && legal.length > 0 && (
                  <ResultSection title="법률정보" count={legal.length} items={legal}
                    renderRow={item => <ArticleRow item={item} kw={keyword} />} />
                )}
                {showSection('agents') && matchAgents.length > 0 && (
                  <ResultSection title="구성원" count={matchAgents.length} items={matchAgents}
                    renderRow={item => <AgentRow item={item} kw={keyword} />} />
                )}
                {showSection('review') && reviews.length > 0 && (
                  <ResultSection title="고객후기" count={reviews.length} items={reviews}
                    renderRow={item => <ArticleRow item={item} kw={keyword} />} />
                )}
                {showSection('insight') && insights.length > 0 && (
                  <ResultSection title="언론보도" count={insights.length} items={insights}
                    renderRow={item => <ArticleRow item={item} kw={keyword} />} />
                )}
                {showSection('analysis') && (analysis.length + others.length) > 0 && (
                  <ResultSection title="사례분석/최신동향" count={analysis.length + others.length} items={[...analysis, ...others]}
                    renderRow={item => <ArticleRow item={item} kw={keyword} />} />
                )}
              </div>
            )}

          </div>
        </div>

      </Layout>
    </>
  );
}
