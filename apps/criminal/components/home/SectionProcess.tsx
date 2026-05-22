import React from 'react';
import { PhoneCall, FileSearch, Handshake, ClipboardList, Gavel, ShieldCheck } from 'lucide-react';
import { GlowCard } from '@/components/ui/spotlight-card';

const STEPS = [
  { num: '01', Icon: PhoneCall,     title: '상담 신청',        body: '전화 또는 온라인으로 24시간 상담 신청 접수' },
  { num: '02', Icon: FileSearch,    title: '사건 분석',        title2: '', body: '담당 변호사가 사실관계·증거·쟁점을 초기 분석' },
  { num: '03', Icon: Handshake,     title: '수임 계약',        body: '변호 범위·비용을 명확히 설명 후 정식 계약' },
  { num: '04', Icon: ClipboardList, title: '변호 전략 수립',   body: '판례·증거 검토를 바탕으로 단계별 변호 전략 설계' },
  { num: '05', Icon: Gavel,         title: '수사·재판 대응',   body: '경찰·검찰 조사 동행, 공판 변론, 증인신문 진행' },
  { num: '06', Icon: ShieldCheck,   title: '판결·사후 관리',   body: '판결 후 항소·집행유예·사면 등 후속 조치 자문' },
];

export default function SectionProcess() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-14 sm:mb-16">
          <p className="eyebrow mb-3">Process</p>
          <h2 className="heading-lg">
            상담부터 판결까지<br className="sm:hidden" /> 변호 6단계
          </h2>
          <p className="mt-5 text-[15px] text-[color:var(--ink-muted)] leading-relaxed max-w-2xl mx-auto">
            대한중앙은 모든 단계에서 의뢰인과 직접 소통하며 사건을 끝까지 책임집니다.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {STEPS.map(({ num, Icon, title, body }) => (
            <GlowCard
              key={num}
              customSize
              glowColor="warm"
              className="flex flex-col p-6 bg-white hover:shadow-[0_12px_30px_rgba(60,40,20,0.08)] transition-shadow"
            >
              <div className="flex items-center justify-between mb-5">
                <span className="text-[26px] font-black tracking-[-0.04em] text-[color:var(--gold-warm-deep)]">{num}</span>
                <div className="w-10 h-10 rounded-full bg-[#f5ede0] flex items-center justify-center">
                  <Icon className="w-5 h-5 text-[color:var(--gold-warm-deep)]" strokeWidth={2} />
                </div>
              </div>
              <h3 className="text-[15px] sm:text-[16px] font-extrabold text-[color:var(--ink-strong)] tracking-tight mb-2">{title}</h3>
              <p className="text-[12.5px] text-[color:var(--ink-muted)] leading-relaxed">{body}</p>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  );
}
