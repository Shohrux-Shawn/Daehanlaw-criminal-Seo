import React from 'react';
import type { GetStaticProps } from 'next';
import Layout from '@/components/Layout';
import { SITE_CONFIG } from '@/site.config';
import { SeoHead } from '@daehanlaw/ui';
import {
  getApolloClient,
  GET_CASES, GET_ARTICLES, GET_AGENTS,
  type Case, type Article, type Agent,
} from '@daehanlaw/graphql';

import ConsultHero from '@/components/ui/consult-hero';
import SectionAbout from '@/components/home/SectionAbout';
import SectionFeatures from '@/components/home/SectionFeatures';
import SectionCases from '@/components/home/SectionCases';
import SectionInsights from '@/components/home/SectionInsights';
import SectionProcess from '@/components/home/SectionProcess';
import SectionLawyerTestimonials from '@/components/home/SectionLawyerTestimonials';
import SectionCtaBottom from '@/components/home/SectionCtaBottom';

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
  serviceType: ['형사변호', '구속·체포영장 대응', '수사 단계 변호', '형사 항소·상고'],
  priceRange: '상담 무료',
};

export default function Home({ cases, articles, agents }: HomeProps) {
  const [headlineLine1, headlineLine2] = SITE_CONFIG.heroHeadline.split('\n');

  return (
    <Layout>
      <SeoHead
        config={SITE_CONFIG}
        title={`${SITE_CONFIG.practiceArea} 전문 법무법인`}
        description={`${SITE_CONFIG.practiceArea} 분야 전문 변호사가 구속·체포영장 대응, 수사·재판, 항소·상고까지 모든 형사 사건을 신속하고 정확하게 변호해 드립니다.`}
        schema={HOME_SCHEMA}
      />

      {/* S1 — Hero */}
      <ConsultHero
        badgeText="형사전문 변호인의 든든한 동행"
        headlineLine1={headlineLine1}
        headlineLine2={headlineLine2}
        subtitle={SITE_CONFIG.heroSubheadline}
        primaryCta={{ text: '지금 상담하기', href: '/contact' }}
        secondaryCta={{ text: '변호사 소개', href: '/attorneys' }}
        backgroundImageUrl="/back.png"
      />

      {/* S2 — About */}
      <SectionAbout />

      {/* S3 — Why-us features */}
      <SectionFeatures />

      {/* S4 — Major Cases (beige band) */}
      <SectionCases cases={cases} />

      {/* S4 — Criminal-law insights */}
      <SectionInsights articles={articles} />

      {/* S5 — 6-step defense process */}
      <SectionProcess />

      {/* S6 — Lawyer testimonials carousel */}
      <SectionLawyerTestimonials />

      {/* S7 — Bottom CTA */}
      <SectionCtaBottom phoneNumber={SITE_CONFIG.phoneNumber} />
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
    revalidate: 60,
  };
};
