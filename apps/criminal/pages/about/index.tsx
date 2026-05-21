import React from 'react';
import Layout from '@/components/Layout';
import { SeoHead } from '@daehanlaw/ui';
import { SITE_CONFIG } from '@/site.config';
import CriminalLawLanding from '@/components/ui/criminal-law-landing';

export default function AboutPage() {
  return (
    <>
      <SeoHead
        config={SITE_CONFIG}
        title="그룹소개 | 대한중앙 형사전문센터"
        description="대한중앙 형사전문센터의 형사 변호 전략, 단계별 조력 시스템, 압수수색 대응, 대표 업무사례를 한눈에 소개합니다."
        canonicalPath="/about"
      />
      <Layout>
        <CriminalLawLanding phoneNumber={SITE_CONFIG.phoneNumber} />
      </Layout>
    </>
  );
}
