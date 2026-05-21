import type { GetStaticProps } from 'next';
import Layout from '@/components/Layout';
import { SITE_CONFIG } from '@/site.config';
import { SeoHead, AttorneyCard } from '@daehanlaw/ui';
import { getApolloClient, GET_AGENTS, type Agent } from '@daehanlaw/graphql';

interface AttorneysPageProps {
  agents: Agent[];
}

export default function AttorneysPage({ agents }: AttorneysPageProps) {
  return (
    <Layout>
      <SeoHead
        config={SITE_CONFIG}
        title={`${SITE_CONFIG.practiceArea} 전문변호사`}
        description={`${SITE_CONFIG.practiceArea} 분야 전문 변호사진을 소개합니다.`}
        canonicalPath="/attorneys"
      />
      {/* Page banner */}
      <div
        className="px-5 py-5"
        style={{ background: `linear-gradient(rgba(13,22,41,0.85), rgba(13,22,41,0.85)), url('/backgrounds/3.jpg') center/cover no-repeat` }}
      >
        <div className="max-w-6xl mx-auto px-2 sm:px-4 py-12">
          <h1 className="text-[28px] sm:text-[38px] font-black text-white tracking-tight leading-tight">
            {SITE_CONFIG.practiceArea} 전문 변호사
          </h1>
          <p className="text-[14px] text-white/60 mt-2">
            형사 분야 전문 변호사가 수사 단계부터 항소심까지 직접 담당합니다
          </p>
        </div>
      </div>

      <section className="py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-[13px] text-gray-500">
              총 {agents.length}명의 변호사
            </p>
          </div>
          {agents.length === 0 ? (
            <p className="text-center text-gray-400 py-16">등록된 변호사가 없습니다.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {agents.map(a => (
                <a
                  key={a._id}
                  href={`https://www.daehanlaw.com/attorneys/${a._id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block no-underline"
                >
                  <AttorneyCard agent={a} />
                </a>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<AttorneysPageProps> = async () => {
  const client = getApolloClient(process.env.NEXT_PUBLIC_API_URL);
  const { data } = await client.query<any>({
    query: GET_AGENTS,
    variables: { input: { page: 1, limit: 60, sort: 'createdAt', direction: 'DESC', search: {} } },
  }).catch(() => ({ data: null }));

  return {
    props: { agents: data?.getAgents?.list ?? [] },
    revalidate: 60 * 15,
  };
};
