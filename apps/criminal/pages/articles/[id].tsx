import type { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { SITE_CONFIG } from '@/site.config';
import { SeoHead, CtaButton } from '@daehanlaw/ui';
import { mainSiteLink } from '@daehanlaw/config';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import {
  getApolloClient,
  GET_ARTICLE,
  type Article,
} from '@daehanlaw/graphql';

interface Props {
  article: Article | null;
}

const CATEGORY_LABEL: Record<string, string> = {
  INSIGHT:    '기업 인사이트',
  ANALYSIS:   '사례분석/최신동향',
  LEGAL_INFO: '법률정보',
  KNOWLEDGE:  '법률지식인',
  REVIEW:     '고객후기',
  PRESS:      '언론보도',
  FORM:       '법률서식',
  NEWSLETTER: '뉴스레터',
  BROCHURE:   '브로슈어',
};

function stripHtml(html: string, max = 160): string {
  const plain = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  return plain.length > max ? plain.slice(0, max - 1) + '…' : plain;
}

function formatDate(iso?: string): string {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('ko-KR', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
}

export default function ArticleDetailPage({ article }: Props) {
  if (!article) {
    return (
      <Layout>
        <SeoHead config={SITE_CONFIG} title="아티클을 찾을 수 없습니다" description="요청하신 페이지를 찾을 수 없습니다." canonicalPath="/articles" />
        <section className="py-24 sm:py-32">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-2xl font-bold text-navy-900">아티클을 찾을 수 없습니다</h1>
            <p className="text-sm text-gray-500 mt-3">
              요청하신 아티클이 삭제되었거나 존재하지 않습니다.
            </p>
            <div className="mt-8">
              <Link
                href="/articles"
                className="text-sm font-semibold text-navy-700 hover:text-navy-900 underline underline-offset-4"
              >
                ← 법률정보 목록으로
              </Link>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  const categoryLabel = CATEGORY_LABEL[article.articleCategory] ?? article.articleCategory;
  const description = stripHtml(article.articleContent ?? '', 160);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.articleTitle,
    description,
    datePublished: article.createdAt,
    dateModified: article.updatedAt ?? article.createdAt,
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.siteName,
      url: SITE_CONFIG.siteUrl,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_CONFIG.siteUrl}/articles/${article._id}`,
    },
  };

  return (
    <Layout>
      <SeoHead
        config={SITE_CONFIG}
        title={`${article.articleTitle} | 부산 해운대 형사전문변호사`}
        description={description}
        canonicalPath={`/articles/${article._id}`}
        schema={articleSchema}
      />
      <BreadcrumbSchema items={[{ label: '홈', path: '/' }, { label: '형사 법률정보', path: '/articles' }, { label: article.articleTitle, path: `/articles/${article._id}` }]} />

      <article className="bg-white">
        {/* Header */}
        <header className="bg-gradient-to-b from-navy-50 to-white border-b border-gray-100">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <Link
              href="/articles"
              className="inline-flex items-center gap-1 text-xs font-semibold text-gray-500 hover:text-navy-700 mb-6"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              법률정보 목록
            </Link>

            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-navy-900/10 text-navy-900 tracking-wider uppercase">
                {categoryLabel}
              </span>
              <span className="text-[12px] text-gray-400">{formatDate(article.createdAt)}</span>
            </div>

            <h1 className="text-[24px] sm:text-[34px] font-black text-gray-900 tracking-[-0.5px] leading-tight">
              {article.articleTitle}
            </h1>
          </div>
        </header>

        {/* Body */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div
            className="prose prose-navy max-w-none text-[15px] leading-[1.85] text-gray-800
                       prose-headings:text-navy-900 prose-headings:font-bold
                       prose-h2:text-[22px] prose-h2:mt-10 prose-h2:mb-4
                       prose-h3:text-[18px] prose-h3:mt-8 prose-h3:mb-3
                       prose-p:my-4
                       prose-a:text-navy-700 prose-a:no-underline hover:prose-a:underline
                       prose-strong:text-navy-900
                       prose-img:rounded-lg prose-img:my-6"
            dangerouslySetInnerHTML={{ __html: article.articleContent || '' }}
          />
        </div>

        {/* Bottom CTA */}
        <section className="bg-slate-900 py-12 sm:py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-[20px] sm:text-[26px] font-black text-white mb-3 tracking-[-0.5px]">
              {SITE_CONFIG.practiceArea} 분야 전문변호사와 직접 상담하세요
            </h2>
            <p className="text-[13px] sm:text-[14px] text-white/60 mb-7 leading-relaxed">
              궁금한 점이 있으시면 언제든지 연락 주세요. 전문변호사가 직접 상담해 드립니다.
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
            <p className="mt-6 text-[11px] text-white/40">
              <a
                href={mainSiteLink(SITE_CONFIG, `/articles/${article._id}`)}
                className="hover:text-white/70 underline underline-offset-4"
              >
                메인 사이트(daehanlaw.com)에서 같은 글 보기 →
              </a>
            </p>
          </div>
        </section>
      </article>
    </Layout>
  );
}

// SSG with on-demand generation — no paths pre-rendered at build time. The
// first request to a new article ID renders + caches; subsequent requests
// serve the cached page and revalidate every 15 minutes.
export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: 'blocking',
});

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const id = typeof params?.id === 'string' ? params.id : null;
  if (!id) return { notFound: true };

  const client = getApolloClient(process.env.NEXT_PUBLIC_API_URL);
  const { data } = await client
    .query<{ getArticle: Article }>({
      query: GET_ARTICLE,
      variables: { articleId: id },
    })
    .catch(() => ({ data: null as any }));

  const article = data?.getArticle ?? null;

  // Only show articles tagged for THIS satellite. Hide everything else (404).
  if (!article || article.siteOrigin !== SITE_CONFIG.siteOrigin) {
    return { notFound: true, revalidate: 60 };
  }

  return {
    props: { article },
    revalidate: 60 * 15, // 15 minutes
  };
};
