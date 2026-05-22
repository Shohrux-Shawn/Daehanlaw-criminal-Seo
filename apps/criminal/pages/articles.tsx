import type { GetStaticProps } from 'next';
import Layout from '@/components/Layout';
import { SITE_CONFIG } from '@/site.config';
import { SeoHead, ArticleCard } from '@daehanlaw/ui';
import { getApolloClient, GET_ARTICLES, type Article } from '@daehanlaw/graphql';

interface ArticlesPageProps {
  articles: Article[];
}

export default function ArticlesPage({ articles }: ArticlesPageProps) {
  return (
    <Layout>
      <SeoHead
        config={SITE_CONFIG}
        title={`형사 법률정보 | 부산 해운대 형사전문변호사`}
        description={`부산 해운대 형사 전문 변호사가 작성한 최신 형사 법률 정보와 사례 분석. 법무법인 대한중앙.`}
        canonicalPath="/articles"
      />
      <section className="py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h1 className="text-[26px] sm:text-[32px] font-black text-gray-900 tracking-[-0.5px]">
              {SITE_CONFIG.practiceArea} 법률정보
            </h1>
            <p className="text-[13px] text-gray-500 mt-2">
              총 {articles.length}건의 글
            </p>
          </div>
          {articles.length === 0 ? (
            <p className="text-center text-gray-400 py-16">등록된 글이 없습니다.</p>
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

export const getStaticProps: GetStaticProps<ArticlesPageProps> = async () => {
  const client = getApolloClient(process.env.NEXT_PUBLIC_API_URL);
  const { data } = await client.query<any>({
    query: GET_ARTICLES,
    variables: {
      input: {
        page: 1, limit: 60, sort: 'createdAt', direction: 'DESC',
        search: { siteOrigin: SITE_CONFIG.siteOrigin },
      },
    },
  }).catch(() => ({ data: null }));

  return {
    props: { articles: data?.getArticles?.list ?? [] },
    revalidate: 60,
  };
};
