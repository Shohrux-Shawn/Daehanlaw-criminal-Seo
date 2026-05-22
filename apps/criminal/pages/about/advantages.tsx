import React from 'react';
import Layout from '@/components/Layout';
import { SeoHead } from '@daehanlaw/ui';
import { SITE_CONFIG } from '@/site.config';
import AdvantagesSections from '@/components/about/AdvantagesSections';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';

export default function AdvantagesPage() {
  return (
    <>
      <SeoHead
        config={SITE_CONFIG}
        title="대한중앙의 강점 | 부산 해운대 형사전문변호사"
        description="법무법인 대한중앙 해운대사무소의 형사 변호 강점 — 조사 동석부터 항소심까지, 의뢰인 한 분 한 분의 사건을 책임지는 형사 전담 변호사 팀의 변호 방식을 소개합니다."
        canonicalPath="/about/advantages"
      />
      <BreadcrumbSchema items={[{ label: '홈', path: '/' }, { label: '그룹소개', path: '/about' }, { label: '대한중앙의 강점', path: '/about/advantages' }]} />
      <Layout>
        <AdvantagesSections />
      </Layout>
    </>
  );
}
