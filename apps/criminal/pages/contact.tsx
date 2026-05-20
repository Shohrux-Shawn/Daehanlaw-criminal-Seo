import Layout from '@/components/Layout';
import { SITE_CONFIG } from '@/site.config';
import { SeoHead, ContactForm } from '@daehanlaw/ui';

export default function ContactPage() {
  return (
    <Layout>
      <SeoHead
        config={SITE_CONFIG}
        title={`${SITE_CONFIG.practiceArea} 상담 신청`}
        description={`${SITE_CONFIG.practiceArea} 전문변호사와 상담을 신청하세요. 재산분할, 양육권, 위자료 — 의뢰인의 권리를 지켜드립니다.`}
        canonicalPath="/contact"
      />
      {/* Page banner */}
      <div
        className="px-5 py-5"
        style={{ background: `linear-gradient(rgba(13,22,41,0.85), rgba(13,22,41,0.85)), url('/backgrounds/5.jpg') center/cover no-repeat` }}
      >
        <div className="max-w-2xl mx-auto px-2 sm:px-4 py-12">
          <h1 className="text-[28px] sm:text-[38px] font-black text-white tracking-tight leading-tight">
            상담 신청
          </h1>
          <p className="text-[14px] text-white/60 mt-2">
            {SITE_CONFIG.practiceArea} 전문 변호사가 직접 답변드립니다. 평일 09:00 – 18:00
          </p>
        </div>
      </div>

      <section className="py-12 sm:py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContactForm config={SITE_CONFIG} />
        </div>
      </section>
    </Layout>
  );
}
