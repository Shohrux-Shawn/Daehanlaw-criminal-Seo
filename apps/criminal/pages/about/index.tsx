import React from 'react';
import Layout from '@/components/Layout';
import { SeoHead } from '@daehanlaw/ui';
import { SITE_CONFIG } from '@/site.config';
import CriminalLawLanding from '@/components/ui/criminal-law-landing';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';

export default function AboutPage() {
  return (
    <>
      <SeoHead
        config={SITE_CONFIG}
        title="그룹소개 | 부산 해운대 형사전문변호사 | 법무법인 대한중앙"
        description="법무법인 대한중앙 해운대사무소 그룹소개 — 부산 해운대 형사 전문 변호사의 변호 전략, 단계별 조력 시스템, 압수수색 대응, 대표 업무사례."
        canonicalPath="/about"
      />
      <BreadcrumbSchema items={[{ label: '홈', path: '/' }, { label: '그룹소개', path: '/about' }]} />
      <Layout>
        <CriminalLawLanding phoneNumber={SITE_CONFIG.phoneNumber} />
      </Layout>
    </>
  );
}
