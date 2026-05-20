import type { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { SITE_CONFIG } from '@/site.config';
import { SeoHead, CtaButton } from '@daehanlaw/ui';
import { getApolloClient, GET_CASE, type Case } from '@daehanlaw/graphql';

interface Props {
  legalCase: Case | null;
}

const STATUS_LABEL: Record<string, string> = {
  WON:                  '승소',
  NOT_PROSECUTED:       '불기소',
  CLAIM_DISMISSED:      '청구기각',
  APPLICATION_DISMISSED:'신청기각',
};

const TYPE_LABEL: Record<string, string> = {
  DIVORCE_CENTER: '이혼전담센터',
  CIVIL:          '민사',
  CRIMINAL:       '형사',
  CORPORATE:      '기업법무',
};

const LOCATION_LABEL: Record<string, string> = {
  SEOUL:'서울', BUSAN:'부산', INCHEON:'인천', DAEGU:'대구',
  GWANGJU:'광주', DAEJEON:'대전', ULSAN:'울산', SUWON:'수원',
  SEONGNAM:'성남', GOYANG:'고양', YONGIN:'용인', CHANGWON:'창원',
  POHANG:'포항', JEONJU:'전주', CHEONAN:'천안', ASAN:'아산',
  CHEONGJU:'청주', YEOSU:'여수', GIMHAE:'김해', GYEONGJU:'경주',
  JEJU:'제주',
};

function formatDate(iso?: string): string {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function CaseDetailPage({ legalCase }: Props) {
  if (!legalCase) {
    return (
      <Layout>
        <SeoHead config={SITE_CONFIG} title="사건을 찾을 수 없습니다" description="" canonicalPath="/cases" />
        <section className="py-24 text-center">
          <h1 className="text-2xl font-bold text-navy-900">사건을 찾을 수 없습니다</h1>
          <p className="text-sm text-gray-500 mt-3">요청하신 사건이 삭제되었거나 존재하지 않습니다.</p>
          <div className="mt-8">
            <Link href="/cases" className="text-sm font-semibold text-navy-700 hover:text-navy-900 underline underline-offset-4">
              ← 사례 목록으로
            </Link>
          </div>
        </section>
      </Layout>
    );
  }

  const statusLabel   = STATUS_LABEL[legalCase.caseStatus]   ?? legalCase.caseStatus;
  const typeLabel     = TYPE_LABEL[legalCase.caseType]       ?? legalCase.caseType;
  const locationLabel = LOCATION_LABEL[legalCase.caseLocation] ?? legalCase.caseLocation;

  const caseSchema = {
    '@context': 'https://schema.org',
    '@type': 'LegalCase',
    name: legalCase.caseTitle,
    description: legalCase.caseDesc ?? '',
    url: `${SITE_CONFIG.siteUrl}/cases/${legalCase._id}`,
    publisher: { '@type': 'Organization', name: SITE_CONFIG.siteName, url: SITE_CONFIG.siteUrl },
  };

  return (
    <Layout>
      <SeoHead
        config={SITE_CONFIG}
        title={`${legalCase.caseTitle} | ${SITE_CONFIG.practiceArea} 승소사례`}
        description={legalCase.caseDesc ? legalCase.caseDesc.replace(/<[^>]*>/g, '').slice(0, 160) : `${SITE_CONFIG.practiceArea} 승소사례`}
        canonicalPath={`/cases/${legalCase._id}`}
        schema={caseSchema}
      />

      <article className="bg-white">
        {/* Header */}
        <header className="bg-gradient-to-b from-navy-50 to-white border-b border-gray-100">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <Link href="/cases" className="inline-flex items-center gap-1 text-xs font-semibold text-gray-500 hover:text-navy-700 mb-6">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              사례 목록
            </Link>

            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-navy-900/10 text-navy-900 tracking-wider uppercase">
                {typeLabel}
              </span>
              <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-gold-600/10 text-gold-700">
                {locationLabel}
              </span>
              <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-green-100 text-green-700">
                {statusLabel}
              </span>
              <span className="text-[12px] text-gray-400">{formatDate(legalCase.createdAt)}</span>
            </div>

            <h1 className="text-[24px] sm:text-[34px] font-black text-gray-900 tracking-[-0.5px] leading-tight">
              {legalCase.caseTitle}
            </h1>
          </div>
        </header>

        {/* Body */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          {legalCase.caseDesc ? (
            <div
              className="prose prose-navy max-w-none text-[15px] leading-[1.85] text-gray-800
                         prose-headings:text-navy-900 prose-headings:font-bold
                         prose-h2:text-[22px] prose-h2:mt-10 prose-h2:mb-4
                         prose-p:my-4 prose-strong:text-navy-900
                         prose-img:rounded-lg prose-img:my-6"
              dangerouslySetInnerHTML={{ __html: legalCase.caseDesc }}
            />
          ) : (
            <p className="text-gray-500 text-[15px]">상세 내용이 준비 중입니다.</p>
          )}
        </div>

        {/* CTA */}
        <section className="bg-slate-900 py-12 sm:py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-[20px] sm:text-[26px] font-black text-white mb-3 tracking-[-0.5px]">
              {SITE_CONFIG.practiceArea} 전문변호사와 직접 상담하세요
            </h2>
            <p className="text-[13px] text-white/60 mb-7 leading-relaxed">
              비슷한 상황이시라면 전문변호사가 직접 검토해 드립니다.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <CtaButton href="/contact" variant="primary">온라인 상담 신청</CtaButton>
              <a href={`tel:${SITE_CONFIG.phoneNumber}`} className="btn-outline text-[14px]">
                {SITE_CONFIG.phoneNumber} 전화상담
              </a>
            </div>
          </div>
        </section>
      </article>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: 'blocking',
});

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const id = typeof params?.id === 'string' ? params.id : null;
  if (!id) return { notFound: true };

  const client = getApolloClient(process.env.NEXT_PUBLIC_API_URL);
  const { data } = await client
    .query<{ getCase: Case }>({
      query: GET_CASE,
      variables: { caseId: id },
    })
    .catch(() => ({ data: null as any }));

  const legalCase = data?.getCase ?? null;

  if (!legalCase || legalCase.siteOrigin !== SITE_CONFIG.siteOrigin) {
    return { notFound: true, revalidate: 60 };
  }

  return {
    props: { legalCase },
    revalidate: 60 * 15,
  };
};
