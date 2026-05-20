import Layout from '@/components/Layout';
import { SeoHead } from '@daehanlaw/ui';
import { SITE_CONFIG } from '@/site.config';
import PageHero from '@/components/ui/PageHero';
import { MapPin, Phone, Mail, Hash } from 'lucide-react';

export default function LocationPage() {
  return (
    <>
      <SeoHead
        config={SITE_CONFIG}
        title="오시는 길 | 대한중앙 형사전문센터"
        description="법무법인 대한중앙 해운대사무소 위치 안내. 부산 해운대구 해운대로 554 라온제이빌딩 7층. 전 세계 어디서나 365일 24시간 상담접수 가능합니다."
        canonicalPath="/about/location"
      />
      <Layout>

        <PageHero
          crumbs={[
            { label: '⌂', href: '/' },
            { label: '그룹소개', href: '/about' },
            { label: '오시는 길' },
          ]}
          title="오시는 길"
          label="LOCATION"
          description="전 세계 어디서나 365일 24시간 상담접수 가능합니다."
          backgroundImage="/back.jpg"
        />

        <section className="py-16 sm:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="mb-8">
              <span className="text-xs font-semibold tracking-[0.3em] uppercase text-navy-800 block mb-2" style={{ letterSpacing: '0.3em' }}>
                오시는 길
              </span>
              <h2 className="text-3xl font-extrabold text-navy-900" style={{ letterSpacing: '-0.5px' }}>
                법무법인 대한중앙 부산사무소
              </h2>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-md border border-gray-200">
              <iframe
                src="https://map.naver.com/p/entry/place/37098275?c=15.00,0,0,0,dh"
                className="w-full h-[420px] border-0 block"
                loading="lazy"
                title="법무법인 대한중앙 부산사무소 위치"
              />
              <div className="bg-white px-6 py-4 flex flex-wrap items-center justify-between gap-4 border-t border-gray-100">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center flex-shrink-0">
                    <MapPin size={14} className="text-white" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-navy-900 truncate">법무법인 대한중앙 해운대사무소</p>
                    <p className="text-xs text-gray-400 mt-0.5">부산광역시 해운대구 해운대로 554 라온제이빌딩 7층</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <a
                    href={`tel:${SITE_CONFIG.phoneNumber}`}
                    className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-gray-700 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <Phone size={12} />
                    {SITE_CONFIG.phoneNumber}
                  </a>
                  <a
                    href="https://map.naver.com/v5/search/부산+해운대구+해운대로+554+라온제이빌딩+7층"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#03c75a] rounded-lg hover:bg-[#02b350] transition-colors"
                  >
                    길찾기
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-4 text-xs text-gray-400">
              <span className="flex items-center gap-1"><Mail size={11} /> hanbyungchul@naver.com</span>
              <span className="flex items-center gap-1"><Hash size={11} /> 사업자등록번호 444-85-01147</span>
            </div>

            {/* Transit info */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: '🚇', title: '지하철', desc: '해운대역 2번 출구 도보 5분' },
                { icon: '🚌', title: '버스', desc: '해운대 현대아파트 정류장 하차' },
                { icon: '🚗', title: '자가용', desc: '라온제이빌딩 지하주차장 이용' },
              ].map(item => (
                <div key={item.title} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                  <span className="text-2xl mb-3 block">{item.icon}</span>
                  <h3 className="text-sm font-bold text-navy-900 mb-1">{item.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

          </div>
        </section>

      </Layout>
    </>
  );
}
