import type { GetStaticProps } from 'next';
import Layout from '@/components/Layout';
import { SITE_CONFIG } from '@/site.config';
import { SeoHead, ArticleCard } from '@daehanlaw/ui';
import { getApolloClient, GET_ARTICLES, type Article } from '@daehanlaw/graphql';

const CATEGORY = 'ANALYSIS';
const SECTION_LABEL = '사례분석/최신동향';
const SECTION_SUBTITLE = '분야별 전문성을 갖춘 변호사가 사례와 법적 이슈를 분석합니다.';

interface Props { articles: Article[] }

export default function AnalysisPage({ articles }: Props) {
  return (
    <Layout>
      <SeoHead
        config={SITE_CONFIG}
        title={`${SITE_CONFIG.practiceArea} ${SECTION_LABEL}`}
        description={`${SITE_CONFIG.practiceArea} 분야 ${SECTION_LABEL} — ${SECTION_SUBTITLE}`}
        canonicalPath="/cases/analysis"
      />
      <section className="py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h1 className="text-[26px] sm:text-[32px] font-black text-gray-900 tracking-[-0.5px]">
              {SITE_CONFIG.practiceArea} {SECTION_LABEL}
            </h1>
            <p className="text-[13px] text-gray-500 mt-2">총 {articles.length}건</p>
          </div>
          {articles.length === 0 ? (
            <p className="text-center text-gray-400 py-16">아직 등록된 글이 없습니다.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {articles.map(a => <ArticleCard key={a._id} article={a} href={`/articles/${a._id}`} />)}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const client = getApolloClient(process.env.NEXT_PUBLIC_API_URL);
  const { data } = await client.query<any>({
    query: GET_ARTICLES,
    variables: {
      input: {
        page: 1, limit: 60, sort: 'createdAt', direction: 'DESC',
        search: { siteOrigin: SITE_CONFIG.siteOrigin, articleCategory: CATEGORY },
      },
    },
  }).catch(() => ({ data: null }));
  return {
    props: { articles: data?.getArticles?.list ?? [] },
    revalidate: 60,
  };
};
