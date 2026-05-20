import type { GetStaticProps } from 'next';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { SITE_CONFIG } from '@/site.config';
import {
  SeoHead, CaseCard, ArticleCard, CtaButton,
} from '@daehanlaw/ui';
import { Boxes } from '@/components/ui/background-boxes';
import { BlogPostCard } from '@/components/ui/card-18';
import { ImageAutoSlider } from '@/components/ui/image-auto-slider';
import { HeroCarousel, type HeroSlide } from '@/components/ui/hero-carousel';

function stripHtml(html: string, max = 140): string {
  const plain = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  return plain.length > max ? plain.slice(0, max) + '…' : plain;
}

function resolveArticleImage(path: string | undefined): string {
  if (!path) return 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop';
  if (path.startsWith('http')) return path;
  return `https://api.daehanlaw.com/${path}`;
}

const HERO_SLIDES: HeroSlide[] = [
  { id: 1, title: '재산분할',   imageUrl: '/hero/pexels-rdne-7841412.jpg' },
  { id: 2, title: '양육권 분쟁', imageUrl: '/hero/pexels-karola-g-7876207.jpg' },
  { id: 3, title: '위자료 청구', imageUrl: '/hero/pexels-karola-g-7876148.jpg' },
  { id: 4, title: '이혼 소송',   imageUrl: '/hero/pexels-pavel-danilyuk-8111815.jpg' },
  { id: 5, title: '가사 조정',   imageUrl: '/hero/pexels-karola-g-7876148.jpg' },
];

function resolveAgentImage(path: string | undefined): string {
  if (!path) return '/attorney-placeholder.png';
  if (path.startsWith('http')) return path;
  return `https://api.daehanlaw.com/${path}`;
}
import {
  getApolloClient,
  GET_CASES, GET_ARTICLES, GET_AGENTS,
  type Case, type Article, type Agent,
} from '@daehanlaw/graphql';

interface HomeProps {
  cases: Case[];
  articles: Article[];
  agents: Agent[];
}

const HOME_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  name: '법무법인 대한중앙 형사전문센터',
  url: 'https://daehanlaw-criminal.com',
  telephone: '1533-7377',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '법원로 15',
    addressLocality: '서초구',
    addressRegion: '서울',
    addressCountry: 'KR',
  },
  areaServed: 'KR',
  serviceType: ['이혼소송', '재산분할', '양육권', '위자료'],
  priceRange: '상담 무료',
};

export default function Home({ cases, articles, agents }: HomeProps) {
  // Split the article list: first 4 → Insights section (featured + 3 grid)
  //                        remaining → Articles section (simple grid)
  const insightSlice = articles.slice(0, 4);
  const articleSlice = articles.slice(4);
  const [featured, ...restInsights] = insightSlice;
  return (
    <Layout>
      <SeoHead
        config={SITE_CONFIG}
        title={`${SITE_CONFIG.practiceArea} 전문 법무법인`}
        description={`${SITE_CONFIG.practiceArea} 분야 전문 변호사가 재산분할, 양육권, 위자료 등 모든 이혼·가사 분쟁을 신속하고 정확하게 해결해 드립니다.`}
        schema={HOME_SCHEMA}
      />

      {/* ── Hero with interactive image accordion ── */}
      <section className="relative overflow-hidden bg-navy-900">
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, rgba(13,22,41,0.95) 0%, rgba(13,22,41,0.75) 50%, rgba(13,22,41,0.92) 100%)',
          }}
          aria-hidden
        />
        {/* Decorative gold glow */}
        <div
          className="absolute -right-32 -top-32 w-[500px] h-[500px] rounded-full opacity-[0.06] pointer-events-none"
          style={{ background: 'radial-gradient(circle, #c9a04c 0%, transparent 70%)' }}
          aria-hidden
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
          <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-12 lg:gap-12">

            {/* Left — text + CTAs */}
            <div className="w-full lg:w-[44%] text-center lg:text-left lg:self-center">
              <div className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full bg-white/8 border border-white/10">
                <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse2" />
                <span className="text-[12px] font-bold text-gold-300 uppercase tracking-[0.15em]">
                  {SITE_CONFIG.practiceArea} 전문 법무법인
                </span>
              </div>

              <h1 className="text-[30px] sm:text-[40px] lg:text-[52px] font-black text-white leading-tight tracking-[-1px] mb-5 animate-fade-in-up">
                {SITE_CONFIG.heroHeadline.split('\n').map((line, i) => (
                  <span key={i}>
                    {i === 0 ? <span className="text-gold-400">{line}</span> : <><br />{line}</>}
                  </span>
                ))}
              </h1>

              <p
                className="text-[14px] sm:text-[16px] text-white/70 max-w-xl mx-auto lg:mx-0 leading-relaxed mb-8 animate-fade-in-up"
                style={{ animationDelay: '0.15s' }}
              >
                {SITE_CONFIG.heroSubheadline}
              </p>

              <div
                className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start animate-fade-in-up"
                style={{ animationDelay: '0.25s' }}
              >
                <CtaButton href="/contact" variant="primary">상담 신청</CtaButton>
                <a href={`tel:${SITE_CONFIG.phoneNumber}`} className="btn-outline text-[14px]">
                  {SITE_CONFIG.phoneNumber} 전화상담
                </a>
              </div>
            </div>

            {/* Right — auto-scrolling hero carousel */}
            <div className="w-full lg:w-[56%]">
              <HeroCarousel
                slides={HERO_SLIDES}
                speed={35}
                className="pb-2"
              />
            </div>

          </div>
        </div>
      </section>

      {/* ── Cases ── */}
      {cases.length > 0 && (
        <section className="py-16 sm:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-[22px] sm:text-[28px] font-black text-gray-900 tracking-[-0.5px]">
                  주요 승소 사례
                </h2>
                <p className="text-[13px] text-gray-500 mt-1">
                  대한중앙 {SITE_CONFIG.practiceArea} 전문변호사팀의 실제 사건 결과
                </p>
              </div>
              <Link href="/cases" className="text-[13px] font-semibold text-gray-600 hover:text-gray-900 no-underline inline-flex items-center min-h-11 px-2 py-2">
                전체 보기 →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {cases.slice(0, 6).map(c => <CaseCard key={c._id} legalCase={c} href={`/cases/${c._id}`} />)}
            </div>
          </div>
        </section>
      )}

      {/* ── Insights (featured + grid) ── */}
      {articles.length > 0 && (
        <section className="py-16 sm:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-[22px] sm:text-[28px] font-black text-gray-900 tracking-[-0.5px]">
                  {SITE_CONFIG.practiceArea} 인사이트
                </h2>
                <p className="text-[13px] text-gray-500 mt-1">
                  전문변호사가 정리한 최신 이슈와 법률 동향
                </p>
              </div>
              <Link href="/articles" className="text-[13px] font-semibold text-gray-600 hover:text-gray-900 no-underline inline-flex items-center min-h-11 px-2 py-2">
                전체 보기 →
              </Link>
            </div>

            {featured && (
              <div className="mb-8">
                <BlogPostCard
                  variant="featured"
                  tag="인사이트"
                  date={featured.createdAt ? new Date(featured.createdAt).toLocaleDateString('ko-KR') : ''}
                  title={featured.articleTitle}
                  description={stripHtml(featured.articleContent ?? '', 180)}
                  imageUrl={resolveArticleImage(featured.articleImage?.[0])}
                  href={`/articles/${featured._id}`}
                  readMoreText="전체 글 읽기"
                />
              </div>
            )}

            {restInsights.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {restInsights.slice(0, 3).map(a => (
                  <BlogPostCard
                    key={a._id}
                    variant="default"
                    tag="인사이트"
                    date={a.createdAt ? new Date(a.createdAt).toLocaleDateString('ko-KR') : ''}
                    title={a.articleTitle}
                    description={stripHtml(a.articleContent ?? '', 120)}
                    href={`/articles/${a._id}`}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── Articles (simple grid) ── */}
      {articleSlice.length > 0 && (
        <section className="py-16 sm:py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-[22px] sm:text-[28px] font-black text-gray-900 tracking-[-0.5px]">
                  {SITE_CONFIG.practiceArea} 법률정보
                </h2>
                <p className="text-[13px] text-gray-500 mt-1">
                  전문변호사가 직접 작성하는 최신 법률 동향
                </p>
              </div>
              <Link href="/articles" className="text-[13px] font-semibold text-gray-600 hover:text-gray-900 no-underline inline-flex items-center min-h-11 px-2 py-2">
                전체 보기 →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {articleSlice.slice(0, 6).map(a => <ArticleCard key={a._id} article={a} />)}
            </div>
          </div>
        </section>
      )}

      {/* ── Attorneys ── */}
      {agents.length > 0 && (
        <section className="py-16 sm:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-[22px] sm:text-[28px] font-black text-gray-900 tracking-[-0.5px]">
                  전문 변호사
                </h2>
                <p className="text-[13px] text-gray-500 mt-1">
                  이혼·가사 분야에서 수많은 승소를 이끌어낸 변호사진
                </p>
              </div>
              <Link href="/attorneys" className="text-[13px] font-semibold text-gray-600 hover:text-gray-900 no-underline inline-flex items-center min-h-11 px-2 py-2">
                전체 보기 →
              </Link>
            </div>
            <ImageAutoSlider
              images={agents.map(a => ({
                src: resolveAgentImage(a.agentImage?.[0]),
                name: a.agentFullName,
                label: 'LAWYER',
                id: a._id,
              }))}
              speed={35}
            />
          </div>
        </section>
      )}

      {/* ── Bottom CTA ── */}
      <section className="relative min-h-[360px] py-20 text-center bg-slate-900 overflow-hidden">
        {/* Animated boxes background */}
        <div className="absolute inset-0 w-full h-full">
          <Boxes />
        </div>
        {/* Radial mask so boxes fade toward edges */}
        <div className="absolute inset-0 w-full h-full bg-slate-900 z-10 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

        <div className="relative z-20 max-w-3xl mx-auto px-4">
          <h2 className="text-[24px] sm:text-[32px] font-black text-white mb-3 tracking-[-0.5px]">
            지금 바로 전문변호사와 상담하세요
          </h2>
          <p className="text-[14px] sm:text-[16px] text-white/70 mb-8 leading-relaxed">
            전화 또는 온라인으로 편하게 문의하세요.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <CtaButton href="/contact" variant="primary">온라인 상담 신청</CtaButton>
            <a
              href={`tel:${SITE_CONFIG.phoneNumber}`}
              className="btn-outline text-[14px]"
            >
              {SITE_CONFIG.phoneNumber} 전화상담
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const client = getApolloClient(process.env.NEXT_PUBLIC_API_URL);
  const baseSearch = { page: 1, limit: 12, sort: 'createdAt', direction: 'DESC' };

  const [casesRes, articlesRes, agentsRes] = await Promise.all([
    client.query<any>({
      query: GET_CASES,
      variables: { input: { ...baseSearch, search: { siteOrigin: SITE_CONFIG.siteOrigin } } },
    }).catch(() => ({ data: null })),
    client.query<any>({
      query: GET_ARTICLES,
      variables: { input: { ...baseSearch, search: { siteOrigin: SITE_CONFIG.siteOrigin } } },
    }).catch(() => ({ data: null })),
    client.query<any>({
      query: GET_AGENTS,
      variables: { input: { ...baseSearch, search: {} } },
    }).catch(() => ({ data: null })),
  ]);

  return {
    props: {
      cases:    casesRes.data?.getCases?.list ?? [],
      articles: articlesRes.data?.getArticles?.list ?? [],
      agents:   agentsRes.data?.getAgents?.list ?? [],
    },
    revalidate: 60, // ISR: refresh every 15 min
  };
};
