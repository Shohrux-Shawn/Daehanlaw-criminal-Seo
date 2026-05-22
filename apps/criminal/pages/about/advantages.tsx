import React from 'react';
import Layout from '@/components/Layout';
import { SeoHead } from '@daehanlaw/ui';
import { SITE_CONFIG } from '@/site.config';
import AdvantagesSections from '@/components/about/AdvantagesSections';

export default function AdvantagesPage() {
  return (
    <>
      <SeoHead
        config={SITE_CONFIG}
        title="대한중앙의 강점 | 대한중앙 형사전문센터"
        description="조사 동석부터 항소심까지, 의뢰인 한 분 한 분의 사건을 책임지는 대한중앙 형사 전담 변호사 팀의 차별화된 변호 방식을 소개합니다."
        canonicalPath="/about/advantages"
      />
      <Layout>
        <AdvantagesSections />
      </Layout>
    </>
  );
}
