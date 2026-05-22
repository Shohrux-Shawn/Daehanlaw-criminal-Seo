import Layout from '@/components/Layout';
import { SITE_CONFIG } from '@/site.config';
import { SeoHead, ContactForm } from '@daehanlaw/ui';

export default function ContactPage() {
  return (
    <Layout>
      <SeoHead
        config={SITE_CONFIG}
        title={`상담 신청 | 부산 해운대 형사전문변호사`}
        description="법무법인 대한중앙 해운대사무소에 형사사건 상담을 신청하세요. 구속·체포영장 대응, 수사·재판, 항소·상고까지 형사 전문 변호사가 직접 답변드립니다. 부산광역시 해운대구 해운대로 554."
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
