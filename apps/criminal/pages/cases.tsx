import type { GetStaticProps } from 'next';
import Layout from '@/components/Layout';
import { SITE_CONFIG } from '@/site.config';
import { mainSiteLink } from '@daehanlaw/config';
import { SeoHead, CaseCard } from '@daehanlaw/ui';
import { getApolloClient, GET_CASES, type Case } from '@daehanlaw/graphql';

interface CasesPageProps {
  cases: Case[];
}

export default function CasesPage({ cases }: CasesPageProps) {
  return (
    <Layout>
      <SeoHead
        config={SITE_CONFIG}
        title={`형사 주요 변호 사례 | 부산 해운대 형사전문변호사`}
        description={`법무법인 대한중앙 해운대사무소의 형사 사건 변호 사례 — 무죄·불기소·집행유예 등 의뢰인에게 유리한 결과를 이끌어낸 실제 사례입니다.`}
        canonicalPath="/cases"
      />
      {/* Page banner */}
      <div
        className="px-5 py-5"
        style={{ background: `linear-gradient(rgba(13,22,41,0.85), rgba(13,22,41,0.85)), url('/backgrounds/2.jpg') center/cover no-repeat` }}
      >
        <div className="max-w-6xl mx-auto px-2 sm:px-4 py-12">
          <h1 className="text-[28px] sm:text-[38px] font-black text-white tracking-tight leading-tight">
            {SITE_CONFIG.practiceArea} 주요 승소사례
          </h1>
          <p className="text-[14px] text-white/60 mt-2">
            실제 데이터베이스를 기반으로 의뢰인에게 적합한 법적 솔루션을 제시합니다
          </p>
        </div>
      </div>

      <section className="py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-[13px] text-gray-500">
              총 {cases.length}건의 사례
            </p>
          </div>
          {cases.length === 0 ? (
            <p className="text-center text-gray-400 py-16">등록된 사례가 없습니다.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {cases.map(c => <CaseCard key={c._id} legalCase={c} href={`/cases/${c._id}`} />)}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<CasesPageProps> = async () => {
  const client = getApolloClient(process.env.NEXT_PUBLIC_API_URL);
  const { data } = await client.query<any>({
    query: GET_CASES,
    variables: { input: { page: 1, limit: 60, sort: 'createdAt', direction: 'DESC', search: { siteOrigin: SITE_CONFIG.siteOrigin } } },
  }).catch(() => ({ data: null }));

  return {
    props: { cases: data?.getCases?.list ?? [] },
    revalidate: 60,
  };
};
