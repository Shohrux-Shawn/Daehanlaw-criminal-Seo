import React from 'react';
import { About3 } from '@/components/ui/about-3';

export default function SectionAbout() {
  return (
    <About3
      title="대한중앙 형사전문센터"
      description="수사 초기부터 항소심까지 — 단계별 형사 변호 경험을 갖춘 전문 변호사 팀이 의뢰인의 자유와 권리를 끝까지 지킵니다."
      mainImage={{
        src: '/back.png',
        alt: '대한중앙 형사전문센터 변호사 상담 장면',
      }}
      secondaryImage={{
        src: '/hero.png',
        alt: '법무법인 대한중앙',
      }}
      breakout={{
        alt: 'icon',
        title: '24시간 긴급 상담',
        description:
          '구속·체포 등 긴급 상황에 즉시 대응할 수 있도록 전담 변호사가 24시간 상담을 진행합니다.',
        buttonText: '상담 신청',
        buttonUrl: '/contact',
      }}
      companies={[]}
      achievementsTitle="숫자가 증명하는 변호 실적"
      achievementsDescription="법무법인 대한중앙 형사전문센터의 누적 수임 사건과 실제 성과 데이터입니다."
      achievements={[
        { label: '누적 변호 사건',   value: '1,200+' },
        { label: '의뢰인 만족도',     value: '96%' },
        { label: '24시간 긴급 상담',  value: '24h' },
        { label: '전문 변호사',       value: '15+' },
      ]}
    />
  );
}
