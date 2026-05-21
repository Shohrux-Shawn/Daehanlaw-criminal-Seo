import { Phone, Scale, Shield, Users, ArrowRight, Menu, X, ChevronUp } from "lucide-react"

const SITE_CONFIG = {
  practiceArea: "형사",
  siteName: "대한중앙 형사전문센터",
  phoneNumber: "1533-7377",
  heroHeadline: "형사 사건,\n15년 경력 형사전문변호사와 함께하세요",
  heroSubheadline:
    "구속·기소부터 항소·상고까지 — 의뢰인의 자유와 권리를 끝까지 지켜드리는 법무법인 대한중앙 형사 전문변호사 팀이 함께합니다.",
}

const CASES = [
  { id: 1, title: "사기 혐의 무죄 판결", category: "사기", result: "무죄", description: "5억원대 투자사기 혐의로 기소된 의뢰인, 철저한 증거 분석으로 무죄 판결" },
  { id: 2, title: "폭행치상 집행유예", category: "폭행", result: "집행유예", description: "상해 사건에서 정당방위 주장으로 실형 회피, 집행유예 선고" },
  { id: 3, title: "음주운전 벌금형 감경", category: "교통", result: "벌금감경", description: "음주운전 재범 사건에서 반성문과 합의로 벌금형으로 감경" },
  { id: 4, title: "횡령 혐의 불기소", category: "횡령", result: "불기소", description: "회사 자금 횡령 혐의, 업무상 정당한 사용 입증으로 불기소 처분" },
  { id: 5, title: "성범죄 무혐의", category: "성범죄", result: "무혐의", description: "허위 고소 사건에서 알리바이 증명으로 무혐의 처분" },
  { id: 6, title: "마약 초범 집행유예", category: "마약", result: "집행유예", description: "대마초 소지 초범 사건에서 재활 의지 입증으로 집행유예" },
]

const ARTICLES = [
  { id: 1, title: "형사 사건 대응, 초기 대응이 중요한 이유", date: "2024.01.15", tag: "인사이트" },
  { id: 2, title: "구속영장 기각을 위한 변호 전략", date: "2024.01.12", tag: "법률정보" },
  { id: 3, title: "사기죄 성립 요건과 방어 포인트", date: "2024.01.10", tag: "인사이트" },
]

const ATTORNEYS = [
  { id: 1, name: "김대한 변호사", position: "대표변호사", specialty: "형사전문" },
  { id: 2, name: "이중앙 변호사", position: "파트너변호사", specialty: "성범죄전문" },
  { id: 3, name: "박법률 변호사", position: "파트너변호사", specialty: "마약전문" },
  { id: 4, name: "최정의 변호사", position: "소속변호사", specialty: "교통사고전문" },
]

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Top Bar */}
      <div className="bg-slate-900 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-xs">
          <span>법무법인 대한중앙</span>
          <a href={`tel:${SITE_CONFIG.phoneNumber}`} className="flex items-center gap-1 font-semibold text-amber-400">
            <Phone className="h-3 w-3" />
            {SITE_CONFIG.phoneNumber}
          </a>
        </div>
      </div>

      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <Scale className="h-6 w-6 text-slate-900" />
            <span className="text-lg font-bold text-slate-900">{SITE_CONFIG.siteName}</span>
          </div>
          <nav className="hidden items-center gap-8 md:flex">
            <a href="#" className="text-sm font-medium text-slate-600 hover:text-slate-900">소개</a>
            <a href="#" className="text-sm font-medium text-slate-600 hover:text-slate-900">업무분야</a>
            <a href="#" className="text-sm font-medium text-slate-600 hover:text-slate-900">승소사례</a>
            <a href="#" className="text-sm font-medium text-slate-600 hover:text-slate-900">법률정보</a>
            <a href="#" className="text-sm font-medium text-slate-600 hover:text-slate-900">변호사</a>
            <a href="#" className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
              상담신청
            </a>
          </nav>
          <button className="md:hidden">
            <Menu className="h-6 w-6 text-slate-900" />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
        <div className="absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-amber-500/5" />
        <div className="absolute -bottom-32 -left-32 h-[400px] w-[400px] rounded-full bg-amber-500/5" />
        
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:py-28 lg:py-32">
          <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:gap-16">
            <div className="w-full text-center lg:w-1/2 lg:text-left">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
                <span className="h-2 w-2 animate-pulse rounded-full bg-amber-400" />
                <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                  {SITE_CONFIG.practiceArea} 전문 법무법인
                </span>
              </div>
              
              <h1 className="mb-6 text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                <span className="text-amber-400">형사 사건,</span>
                <br />
                15년 경력 형사전문변호사와 함께하세요
              </h1>
              
              <p className="mb-8 text-base leading-relaxed text-white/70 sm:text-lg">
                {SITE_CONFIG.heroSubheadline}
              </p>
              
              <div className="flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
                <a
                  href="#"
                  className="inline-flex items-center justify-center rounded-lg bg-amber-500 px-6 py-3 text-sm font-bold text-slate-900 transition hover:bg-amber-400"
                >
                  상담 신청
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
                <a
                  href={`tel:${SITE_CONFIG.phoneNumber}`}
                  className="inline-flex items-center justify-center rounded-lg border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  {SITE_CONFIG.phoneNumber} 전화상담
                </a>
              </div>
            </div>

            {/* Hero Image Cards */}
            <div className="grid w-full grid-cols-2 gap-4 lg:w-1/2">
              <div className="space-y-4">
                <div className="relative h-48 overflow-hidden rounded-2xl bg-slate-800 shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-sm font-bold text-white">구속영장 기각</span>
                    <div className="mt-1 h-0.5 w-8 rounded-full bg-amber-400" />
                  </div>
                </div>
                <div className="relative h-64 overflow-hidden rounded-2xl bg-slate-700 shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-sm font-bold text-white">무죄 판결</span>
                    <div className="mt-1 h-0.5 w-8 rounded-full bg-amber-400" />
                  </div>
                </div>
              </div>
              <div className="mt-8 space-y-4">
                <div className="relative h-64 overflow-hidden rounded-2xl bg-slate-700 shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-sm font-bold text-white">불기소 처분</span>
                    <div className="mt-1 h-0.5 w-8 rounded-full bg-amber-400" />
                  </div>
                </div>
                <div className="relative h-48 overflow-hidden rounded-2xl bg-slate-800 shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-sm font-bold text-white">집행유예</span>
                    <div className="mt-1 h-0.5 w-8 rounded-full bg-amber-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-12 sm:grid-cols-4">
          <div className="text-center">
            <div className="text-3xl font-black text-slate-900 sm:text-4xl">15+</div>
            <div className="mt-1 text-sm text-slate-600">년 경력</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-black text-slate-900 sm:text-4xl">3,000+</div>
            <div className="mt-1 text-sm text-slate-600">상담 건수</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-black text-slate-900 sm:text-4xl">95%</div>
            <div className="mt-1 text-sm text-slate-600">고객 만족도</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-black text-slate-900 sm:text-4xl">500+</div>
            <div className="mt-1 text-sm text-slate-600">승소 사례</div>
          </div>
        </div>
      </section>

      {/* Cases Section */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">주요 승소 사례</h2>
              <p className="mt-2 text-sm text-slate-600">
                대한중앙 {SITE_CONFIG.practiceArea} 전문변호사팀의 실제 사건 결과
              </p>
            </div>
            <a href="#" className="hidden text-sm font-semibold text-slate-600 hover:text-slate-900 sm:flex sm:items-center">
              전체 보기
              <ArrowRight className="ml-1 h-4 w-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CASES.map((c) => (
              <a
                key={c.id}
                href="#"
                className="group rounded-xl border border-slate-200 bg-white p-6 transition hover:border-slate-300 hover:shadow-lg"
              >
                <div className="mb-3 flex items-center gap-2">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                    {c.category}
                  </span>
                  <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-700">
                    {c.result}
                  </span>
                </div>
                <h3 className="mb-2 text-lg font-bold text-slate-900 group-hover:text-amber-600">{c.title}</h3>
                <p className="text-sm leading-relaxed text-slate-600">{c.description}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Insights Section */}
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
                {SITE_CONFIG.practiceArea} 인사이트
              </h2>
              <p className="mt-2 text-sm text-slate-600">전문변호사가 정리한 최신 이슈와 법률 동향</p>
            </div>
            <a href="#" className="hidden text-sm font-semibold text-slate-600 hover:text-slate-900 sm:flex sm:items-center">
              전체 보기
              <ArrowRight className="ml-1 h-4 w-4" />
            </a>
          </div>

          {/* Featured Article */}
          <div className="mb-8 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-lg">
            <div className="flex flex-col md:flex-row">
              <div className="h-56 bg-slate-200 md:h-auto md:w-3/5">
                <div className="flex h-full items-center justify-center bg-gradient-to-br from-slate-300 to-slate-400">
                  <Scale className="h-16 w-16 text-slate-500" />
                </div>
              </div>
              <div className="flex flex-1 flex-col justify-between p-6 md:p-8">
                <div>
                  <div className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase text-slate-500">
                    <span className="rounded-full bg-amber-100 px-3 py-1 text-amber-700">인사이트</span>
                    <span>2024.01.15</span>
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-slate-900 lg:text-2xl">
                    형사 사건 대응, 초기 대응이 중요한 이유
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-600">
                    형사 사건에서 초기 대응은 사건의 방향을 결정짓는 중요한 요소입니다.
                    수사 초기 단계에서 적절한 법률 자문을 받지 못하면 불리한 진술이나 증거가 확보될 수 있습니다.
                  </p>
                </div>
                <div className="mt-6">
                  <button className="inline-flex items-center rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800">
                    전체 글 읽기
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Article Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ARTICLES.slice(1).map((a) => (
              <a
                key={a.id}
                href="#"
                className="group rounded-xl border border-slate-200 bg-white p-6 transition hover:border-slate-300 hover:shadow-lg"
              >
                <div className="mb-4 flex items-center gap-3 text-xs font-semibold text-slate-500">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">{a.tag}</span>
                  <span>{a.date}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-600">{a.title}</h3>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Attorneys Section */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">전문 변호사</h2>
              <p className="mt-2 text-sm text-slate-600">형사 분야에서 수많은 승소를 이끌어낸 변호사진</p>
            </div>
            <a href="#" className="hidden text-sm font-semibold text-slate-600 hover:text-slate-900 sm:flex sm:items-center">
              전체 보기
              <ArrowRight className="ml-1 h-4 w-4" />
            </a>
          </div>

          <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
            {ATTORNEYS.map((att) => (
              <a
                key={att.id}
                href="#"
                className="group overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:border-slate-300 hover:shadow-lg"
              >
                <div className="aspect-[3/4] bg-gradient-to-br from-slate-200 to-slate-300">
                  <div className="flex h-full items-center justify-center">
                    <Users className="h-12 w-12 text-slate-400" />
                  </div>
                </div>
                <div className="p-4 text-center">
                  <div className="text-xs font-semibold uppercase tracking-wide text-amber-600">LAWYER</div>
                  <h3 className="mt-1 text-base font-bold text-slate-900">{att.name}</h3>
                  <p className="mt-0.5 text-xs text-slate-500">{att.specialty}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-slate-900 py-20">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>
        <div className="relative mx-auto max-w-3xl px-4 text-center">
          <h2 className="mb-4 text-2xl font-black text-white sm:text-3xl">지금 바로 전문변호사와 상담하세요</h2>
          <p className="mb-8 text-base text-white/70">전화 또는 온라인으로 편하게 문의하세요.</p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href="#"
              className="inline-flex items-center justify-center rounded-lg bg-amber-500 px-6 py-3 text-sm font-bold text-slate-900 transition hover:bg-amber-400"
            >
              온라인 상담 신청
            </a>
            <a
              href={`tel:${SITE_CONFIG.phoneNumber}`}
              className="inline-flex items-center justify-center rounded-lg border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              {SITE_CONFIG.phoneNumber} 전화상담
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div className="md:col-span-2">
              <div className="mb-4 flex items-center gap-2">
                <Scale className="h-6 w-6 text-slate-900" />
                <span className="text-lg font-bold text-slate-900">{SITE_CONFIG.siteName}</span>
              </div>
              <p className="mb-4 text-sm text-slate-600">
                서울 서초구 법원로 15 법무법인 대한중앙
              </p>
              <p className="text-sm text-slate-600">
                대표전화: {SITE_CONFIG.phoneNumber}
              </p>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-bold text-slate-900">업무분야</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><a href="#" className="hover:text-slate-900">사기</a></li>
                <li><a href="#" className="hover:text-slate-900">폭행/상해</a></li>
                <li><a href="#" className="hover:text-slate-900">성범죄</a></li>
                <li><a href="#" className="hover:text-slate-900">마약</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-bold text-slate-900">정보</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><a href="#" className="hover:text-slate-900">승소사례</a></li>
                <li><a href="#" className="hover:text-slate-900">법률정보</a></li>
                <li><a href="#" className="hover:text-slate-900">변호사 소개</a></li>
                <li><a href="#" className="hover:text-slate-900">상담 신청</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-slate-200 pt-8 text-center text-xs text-slate-500">
            &copy; 2024 법무법인 대한중앙. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Quick Action Button */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3">
        <a
          href={`tel:${SITE_CONFIG.phoneNumber}`}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-500 text-slate-900 shadow-lg transition hover:bg-amber-400"
        >
          <Phone className="h-6 w-6" />
        </a>
      </div>
    </div>
  )
}
