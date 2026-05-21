import React from 'react';
import { Gavel, Scale, ShieldCheck } from 'lucide-react';
import { Casestudy5 } from '@/components/ui/casestudy-5';

export default function SectionCaseStudy() {
  return (
    <Casestudy5
      readMoreText="사례 자세히 보기"
      featuredCasestudy={{
        logo: <Gavel className="h-7 w-7" strokeWidth={2} />,
        company: '형사 변호 · 무죄',
        tags: '특수폭행 / 정당방위 / 1심 무죄',
        title: '특수폭행 혐의, 1심 무죄 판결.',
        subtitle:
          '정당방위 입증을 통해 검찰 항소까지 기각시킨 사건. 사건 발생 직후 변호인이 합류해 진술 전략을 수립한 것이 결정적이었습니다.',
        image:
          'https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=1600&auto=format&fit=crop',
        link: '/cases',
      }}
      casestudies={[
        {
          logo: <Scale className="h-7 w-7" strokeWidth={2} />,
          company: '사기 고소 · 불기소',
          tags: '거래 분쟁 / 채무불이행 / 혐의없음',
          title: '사기 고소 사건, 혐의없음 처분.',
          subtitle:
            '거래의 채무불이행에 불과함을 입증해 검찰 단계에서 혐의없음 처분을 이끌어냈습니다.',
          link: '/cases',
        },
        {
          logo: <ShieldCheck className="h-7 w-7" strokeWidth={2} />,
          company: '음주운전 재범 · 집행유예',
          tags: '음주운전 재범 / 양형부당 / 집행유예',
          title: '실형 예상 사건, 집행유예 선고.',
          subtitle:
            '치료의지·환경요인을 종합적으로 입증해 실형이 예상되던 사건을 집행유예로 마무리했습니다.',
          link: '/cases',
        },
      ]}
    />
  );
}
