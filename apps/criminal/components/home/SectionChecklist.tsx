import React from 'react';
import Link from 'next/link';
import {
  FileText,
  ShieldAlert,
  Gavel,
  Lock,
  ScrollText,
  PhoneCall,
  Scale,
  AlertTriangle,
  Search,
} from 'lucide-react';

const CHECKLIST = [
  { Icon: ShieldAlert,  label: '구속영장 발부 통보를 받았다' },
  { Icon: PhoneCall,    label: '경찰 조사 출석 요구를 받았다' },
  { Icon: Gavel,        label: '검찰 조사를 앞두고 있다' },
  { Icon: Lock,         label: '체포·압수수색을 당했다' },
  { Icon: ScrollText,   label: '공소장·기소장을 받았다' },
  { Icon: FileText,     label: '1심 판결 후 항소를 고민 중이다' },
  { Icon: Scale,        label: '피해자·고소인 입장에서 자문이 필요하다' },
  { Icon: AlertTriangle, label: '무고·허위 고소를 당했다' },
  { Icon: Search,       label: '수사 단계에서 변호인이 없다' },
];

export default function SectionChecklist() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-12 sm:mb-16">
          <p className="eyebrow mb-3">Pre-Consultation</p>
          <h2 className="heading-lg">
            형사전문변호사와<br />
            상담 전 확인사항
          </h2>
          <p className="mt-5 text-[15px] sm:text-[16px] text-[color:var(--ink-muted)] leading-relaxed">
            해당하는 항목이 있다면 지금 바로 상담을 요청하세요.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CHECKLIST.map(({ Icon, label }) => (
            <Link
              key={label}
              href="/contact"
              className="group flex items-center gap-5 p-6 sm:p-7 rounded-2xl border border-[#e8dcc4]/70 bg-white hover:bg-[color:var(--gold-warm)] hover:border-[color:var(--gold-warm)] transition-colors duration-300 no-underline"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#f5ede0] group-hover:bg-white/15 flex items-center justify-center transition-colors duration-300">
                <Icon className="w-6 h-6 text-[color:var(--gold-warm-deep)] group-hover:text-white transition-colors duration-300" strokeWidth={2} />
              </div>
              <span className="text-[15px] sm:text-[16px] font-bold text-[color:var(--ink-strong)] group-hover:text-white tracking-tight transition-colors duration-300">
                {label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
