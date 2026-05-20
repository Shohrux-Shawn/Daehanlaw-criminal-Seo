import type { GetServerSideProps } from 'next';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { SITE_CONFIG } from '@/site.config';
import { mainSiteLink } from '@daehanlaw/config';
import { SeoHead } from '@daehanlaw/ui';
import { getApolloClient, GET_PROPERTIES, type Property } from '@daehanlaw/graphql';

const SUBGROUPS = [
  {
    label: '형사 사건 및 수사·재판 절차',
    items: [
      '폭행·상해', '절도', '사기', '횡령·배임', '명예훼손·모욕',
      '협박·공갈', '강도', '마약', '음주운전·교통사고', '도박',
      '구속·체포영장', '수사 단계 대응', '항소·상고',
    ],
  },
];

interface PracticeCriminalProps {
  propertyMap: Record<string, Pick<Property, 'propertyDesc'>>;
}

export default function PracticeCriminalPage({ propertyMap }: PracticeCriminalProps) {
  return (
    <Layout>
      <SeoHead
        config={SITE_CONFIG}
        title={`${SITE_CONFIG.practiceArea} 업무분야`}
        description={`대한중앙 ${SITE_CONFIG.practiceArea} 전문변호사의 주요 업무 분야를 확인하세요.`}
        canonicalPath="/practice/criminal"
      />
      {/* Page banner */}
      <div
        className="px-5 py-5"
        style={{ background: `linear-gradient(rgba(13,22,41,0.85), rgba(13,22,41,0.85)), url('/backgrounds/8.jpg') center/cover no-repeat` }}
      >
        <div className="max-w-4xl mx-auto px-2 sm:px-4 py-12">
            <h1 className="text-[28px] sm:text-[38px] font-black text-white tracking-tight leading-tight">
              {SITE_CONFIG.practiceArea} 업무분야
            </h1>
            <p className="text-[14px] text-white/60 mt-2">
              전문변호사가 직접 담당하는 주요 업무 영역입니다
            </p>
        </div>
      </div>

      <section className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {SUBGROUPS.map(group => (
            <div key={group.label} className="mb-10">
              <div className="flex items-center justify-between bg-navy-800 text-white px-5 py-3 rounded-t-lg">
                <span className="text-[14px] font-bold">{group.label}</span>
              </div>
              <ul className="border border-t-0 border-gray-200 rounded-b-lg divide-y divide-gray-100">
                {group.items.map(item => {
                  const prop = propertyMap[item];
                  const href = mainSiteLink(SITE_CONFIG, `/practice/criminal/${encodeURIComponent(item)}`);
                  return (
                    <li key={item}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex w-full items-center justify-between px-5 py-3.5 hover:bg-gray-50 transition-colors group no-underline"
                      >
                        <div>
                          <span className="text-[14px] text-gray-800 font-medium group-hover:text-navy-700 transition-colors">
                            {item} 개요
                          </span>
                          {prop?.propertyDesc && (
                            <p className="text-[12px] text-gray-400 mt-0.5 line-clamp-1">
                              {prop.propertyDesc}
                            </p>
                          )}
                        </div>
                        <svg className="w-4 h-4 text-gray-300 group-hover:text-navy-500 transition-colors flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<PracticeCriminalProps> = async () => {
  const client = getApolloClient(process.env.NEXT_PUBLIC_API_URL);
  const { data } = await client.query<any>({
    query: GET_PROPERTIES,
    variables: {
      input: { page: 1, limit: 100, sort: 'createdAt', direction: 'DESC', search: { typeList: ['CRIMINAL'] } },
    },
  }).catch(() => ({ data: null }));

  const list: Property[] = data?.getProperties?.list ?? [];
  const propertyMap = Object.fromEntries(
    list.map(p => [p.propertyTitle, { propertyDesc: p.propertyDesc }])
  );

  return { props: { propertyMap } };
};
