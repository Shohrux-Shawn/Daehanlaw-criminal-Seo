import React from 'react';
import CircularTestimonials from '@/components/ui/circular-testimonials';

const LAWYERS = [
  {
    name: '김 변호사',
    designation: '형사 전담 · 15년 경력',
    quote:
      '단 한 번의 진술이 사건의 방향을 바꿉니다. 수사 초기부터 함께해 의뢰인이 잃지 않아야 할 것을 지키겠습니다.',
    src: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=900&auto=format&fit=crop',
  },
  {
    name: '이 변호사',
    designation: '검찰 출신 · 강력범죄 전문',
    quote:
      '수사의 흐름을 정확히 읽고 의뢰인에게 가장 유리한 방어 전략을 설계합니다. 결과로 책임지는 변호사가 되겠습니다.',
    src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=900&auto=format&fit=crop',
  },
  {
    name: '박 변호사',
    designation: '경제·사기범죄 전담',
    quote:
      '복잡한 사실관계 속에서도 핵심 쟁점을 짚어 의뢰인의 무고함을 끝까지 증명해 내겠습니다.',
    src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=900&auto=format&fit=crop',
  },
  {
    name: '정 변호사',
    designation: '항소·상고심 전문',
    quote:
      '1심 판결로 끝이 아닙니다. 항소심·대법원까지 사건을 다시 바라보고 새로운 결과를 만들어내겠습니다.',
    src: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=900&auto=format&fit=crop',
  },
];

export default function SectionLawyerTestimonials() {
  return (
    <section className="py-16 sm:py-24" style={{ background: 'var(--cream-card)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-10 sm:mb-12">
          <p className="eyebrow mb-3">Our Lawyers</p>
          <h2 className="heading-lg">
            대한중앙 형사 변호인의 약속
          </h2>
          <p className="mt-4 text-[15px] text-[color:var(--ink-muted)] leading-relaxed max-w-2xl mx-auto">
            의뢰인의 자유와 권리를 끝까지 지키기 위해 우리 변호인들이 드리는 약속입니다.
          </p>
        </div>

        <div className="flex justify-center">
          <CircularTestimonials
            testimonials={LAWYERS}
            autoplay
            colors={{
              name: '#2a241d',          /* ink-strong */
              designation: '#8a6e4a',   /* gold-warm-deep */
              testimony: '#6b5f4f',     /* ink-muted */
              arrowBackground: '#b8956a', /* gold-warm */
              arrowForeground: '#ffffff',
              arrowHoverBackground: '#8a6e4a', /* gold-warm-deep */
            }}
            fontSizes={{
              name: '24px',
              designation: '14px',
              quote: '17px',
            }}
          />
        </div>
      </div>
    </section>
  );
}
