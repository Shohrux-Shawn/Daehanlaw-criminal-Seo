import { useState, useEffect, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { SiteConfig } from '@daehanlaw/config';

interface NavbarProps { config: SiteConfig; }
interface NavChild { label: string; href: string; external?: boolean; }
interface NavLink  { label: string; href: string; external?: boolean; children: NavChild[]; }

export function Navbar({ config }: NavbarProps) {
  const router = useRouter();

  const [isOpen,         setIsOpen]         = useState(false);
  const [hoveredMenu,    setHoveredMenu]     = useState<string | null>(null);
  const [mobileOpen,     setMobileOpen]     = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [searchOpen,     setSearchOpen]     = useState(false);
  const [searchQuery,    setSearchQuery]    = useState('');
  const [userName,       setUserName]       = useState<string | null>(null);

  useEffect(() => {
    const name  = typeof window !== 'undefined' ? localStorage.getItem('userName')        : null;
    const token = typeof window !== 'undefined' ? localStorage.getItem('userAccessToken') : null;
    setUserName(token && name ? name : null);
  }, [router.pathname]);

  useEffect(() => {
    setIsOpen(false);
    setHoveredMenu(null);
    setMobileOpen(false);
    setMobileExpanded(null);
    setSearchOpen(false);
    setSearchQuery('');
  }, [router.pathname]);

  function handleLogout() {
    localStorage.removeItem('userAccessToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    document.cookie = 'auth_user_session=; max-age=0; path=/';
    setUserName(null);
    router.push('/');
  }

  function openDropdown(href: string) { setIsOpen(true);  setHoveredMenu(href); }
  function closeDropdown()            { setIsOpen(false); setHoveredMenu(null); }

  function handleSearchSubmit(e: FormEvent) {
    e.preventDefault();
    const q = searchQuery.trim();
    if (!q) return;
    router.push(`/search?q=${encodeURIComponent(q)}`);
    setSearchOpen(false);
    setSearchQuery('');
  }

  const main = config.mainSiteUrl;
  const area = config.practiceArea;

  const navLinks: NavLink[] = [
    {
      label: '그룹소개', href: '/about',
      children: [
        { label: '그룹소개',        href: '/about' },
        { label: '대한중앙의 강점', href: '/about/advantages' },
        { label: '오시는 길',       href: '/about/location' },
        { label: '통합검색',        href: '/search' },
      ],
    },
    {
      label: '업무사례', href: '/cases',
      children: [
        { label: `${area} 주요 업무사례`, href: '/cases' },
        { label: '사례분석/최신동향',     href: '/cases/analysis' },
        { label: `${area} 법률정보`,      href: '/articles' },
        { label: '법률지식인',            href: '/cases/knowledge' },
        { label: '상담후기',              href: '/cases/reviews' },
        { label: '기업 인사이트',         href: '/cases/insights' },
      ],
    },
    {
      label: '업무분야', href: '/practice/divorce',
      children: [
        { label: `${area} 그룹 업무`, href: '/practice/divorce' },
        { label: '전체',              href: '/practice/all' },
        { label: '양육비계산기',      href: '/calculation' },
        { label: '위자료계산기',      href: '/practice/solatium' },
      ],
    },
    {
      label: '전문 변호사', href: '/attorneys',
      children: [
        { label: `${area} 전문변호사`, href: '/attorneys' },
      ],
    },
    {
      label: '소식/자료', href: `${main}/news`, external: true,
      children: [
        { label: '언론보도',          href: `${main}/news/press`,      external: true },
        { label: '공지사항',          href: `${main}/news/notices`,    external: true },
        { label: '법률 블로그',       href: `${main}/news/blog`,       external: true },
        { label: '법률서식',          href: `${main}/news/forms`,      external: true },
        { label: '뉴스레터/브로슈어', href: `${main}/news/newsletter`, external: true },
        { label: '세미나',            href: `${main}/news/seminar`,    external: true },
      ],
    },
  ];

  function isSectionActive(link: NavLink) {
    return router.pathname === link.href ||
      link.children.some(c => router.pathname === c.href || router.pathname.startsWith(c.href + '/'));
  }

  function ChildLink({ child, onClick }: { child: NavChild; onClick?: () => void }) {
    const active = router.pathname === child.href;
    const cls = `group flex items-center gap-2 text-[13px] leading-snug transition-all duration-150 no-underline ${
      active ? 'text-gold-400 font-semibold' : 'text-white/70 hover:text-white font-medium'
    }`;
    const inner = (
      <>
        <svg
          className={`w-3 h-3 flex-shrink-0 transition-all duration-150 ${
            active ? 'text-gold-400 translate-x-0.5' : 'text-white/20 group-hover:text-white/60 group-hover:translate-x-1'
          }`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7"/>
        </svg>
        <span className={`transition-all duration-150 ${!active ? 'group-hover:translate-x-0.5' : ''}`}>
          {child.label}
        </span>
      </>
    );
    if (child.external) {
      return <a href={child.href} target="_blank" rel="noopener noreferrer" onClick={onClick} className={cls}>{inner}</a>;
    }
    return <Link href={child.href} onClick={onClick} className={cls}>{inner}</Link>;
  }

  return (
    <>
      {/* Blur overlay — only when dropdown is open */}
      {isOpen && (
        <div
          aria-hidden="true"
          className="fixed inset-0 z-40 transition-opacity duration-300"
          style={{ background: 'rgba(212,204,204,0.6)', backdropFilter: 'blur(2px)' }}
          onMouseEnter={closeDropdown}
        />
      )}

      <header className="fixed top-0 left-0 right-0 z-50" onMouseLeave={closeDropdown}>

        {/* ── Top utility bar ─────────────────────────────────────────────── */}
        <div className="bg-[#111] text-white/50 text-[11px]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-end h-9 gap-2.5">
            {userName ? (
              <>
                {/* User-account pages live on the main site only. Cross-domain link. */}
                <a href={`${main}/mypage`} className="text-white/70 hover:text-white transition-colors whitespace-nowrap no-underline">{userName}님</a>
                <span className="text-white/15">|</span>
                <Link href="/contact" className="hover:text-white/80 transition-colors whitespace-nowrap no-underline">상담 예약</Link>
                <span className="text-white/15">|</span>
                <a href={`${main}/my-case-status`} className="hidden sm:inline hover:text-white/80 transition-colors whitespace-nowrap no-underline">나의 사건현황</a>
                <span className="hidden sm:inline text-white/15">|</span>
                <button onClick={handleLogout} className="hover:text-white/80 transition-colors whitespace-nowrap">로그아웃</button>
              </>
            ) : (
              <Link href="/login" className="hover:text-white/80 transition-colors whitespace-nowrap no-underline">로그인</Link>
            )}
            <span className="hidden sm:inline text-white/15">|</span>
            <a
              href="https://blog.naver.com/hanbyungchul"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline hover:text-white/80 transition-colors whitespace-nowrap no-underline"
            >
              법무법인 대한중앙 네이버
            </a>
            <span className="hidden lg:inline text-white/15">|</span>
            <a
              href={`tel:${config.phoneNumber}`}
              className="text-gold-400 font-semibold hover:text-gold-300 transition-colors tracking-wide whitespace-nowrap no-underline"
            >
              ☎ {config.phoneNumber}
            </a>
          </div>
        </div>

        {/* ── Main nav bar ────────────────────────────────────────────────── */}
        <div className={`transition-colors duration-300 ${isOpen ? 'bg-[#1a1a1a]' : 'bg-white border-b border-gray-100'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-[68px]">

              {/* Logo */}
              <Link href="/" className="flex items-center no-underline shrink-0">
                <img
                  src="/logo.png"
                  alt={config.siteName}
                  style={{ height: 36, width: 'auto' }}
                  className={`object-contain transition-all duration-300 ${isOpen ? 'invert' : ''}`}
                />
              </Link>

              {/* Desktop nav */}
              <ul className="hidden md:flex items-stretch h-[68px]">
                {navLinks.map(link => {
                  const active  = isSectionActive(link);
                  const hovered = hoveredMenu === link.href;
                  const cls = `relative flex items-center px-5 text-[13.5px] font-semibold tracking-wide transition-colors duration-200 border-b-2 no-underline ${
                    isOpen
                      ? hovered
                        ? 'text-white border-gold-400'
                        : 'text-white/30 border-transparent hover:text-white/60'
                      : active
                        ? 'text-navy-900 border-gold-500'
                        : 'text-gray-500 border-transparent hover:text-navy-800'
                  }`;
                  return (
                    <li key={link.href} className="flex items-stretch" onMouseEnter={() => openDropdown(link.href)}>
                      {link.external
                        ? <a href={link.href} target="_blank" rel="noopener noreferrer" className={cls}>{link.label}</a>
                        : <Link href={link.href} className={cls}>{link.label}</Link>
                      }
                    </li>
                  );
                })}
              </ul>

              {/* Search + CTA */}
              <div className="hidden md:flex items-center gap-2">
                {searchOpen && (
                  <form onSubmit={handleSearchSubmit}>
                    <input
                      autoFocus
                      type="text"
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      onKeyDown={e => e.key === 'Escape' && setSearchOpen(false)}
                      placeholder="검색어 입력 후 Enter"
                      className={`w-52 px-3 py-1.5 text-[12.5px] rounded-lg border outline-none transition-all ${
                        isOpen
                          ? 'bg-white/10 text-white border-white/20 placeholder-white/30 focus:border-white/50'
                          : 'bg-gray-50 text-gray-900 border-gray-200 placeholder-gray-400 focus:border-gray-400'
                      }`}
                    />
                  </form>
                )}
                <button
                  type="button"
                  onClick={() => setSearchOpen(p => !p)}
                  aria-label={searchOpen ? '검색 닫기' : '검색'}
                  className={`p-2 rounded-lg transition-colors ${isOpen ? 'text-white/60 hover:text-white' : 'text-gray-500 hover:text-navy-800'}`}
                >
                  {searchOpen
                    ? <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
                    : <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                  }
                </button>
                <Link
                  href="/contact"
                  className={`px-6 py-2.5 text-[13px] font-bold rounded-lg transition-all duration-300 no-underline ${
                    isOpen ? 'bg-white text-navy-900 hover:bg-white/90' : 'bg-navy-800 text-white hover:bg-navy-700 shadow-sm'
                  }`}
                >
                  상담
                </Link>
              </div>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(p => !p)}
                aria-label="메뉴"
                className={`md:hidden p-3 transition-colors ${isOpen ? 'text-white' : 'text-gray-600'}`}
              >
                {mobileOpen
                  ? <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
                  : <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/></svg>
                }
              </button>
            </div>
          </div>
        </div>

        {/* ── Mega dropdown ────────────────────────────────────────────────── */}
        <div
          className={`transition-[opacity,transform] duration-300 ease-out ${
            isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'
          }`}
          aria-hidden={!isOpen}
        >
          {/* Gold separator line */}
          <div className="h-[2px] bg-gradient-to-r from-transparent via-gold-500 to-transparent" />

          <div className="shadow-2xl" style={{ background: 'linear-gradient(180deg, #3b3939 0%, #4d4646 100%)' }}>
            <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-0 divide-x divide-white/[0.06]">
                {navLinks.map(link => {
                  const colHovered = hoveredMenu === link.href;
                  const headerCls = `block text-[11px] font-extrabold uppercase tracking-[0.18em] mb-3 transition-colors no-underline ${
                    colHovered ? 'text-white' : 'text-white/60'
                  }`;
                  return (
                    <div
                      key={link.href}
                      className={`px-8 first:pl-0 last:pr-0 transition-all duration-200 ${
                        colHovered ? 'opacity-100' : 'opacity-40 hover:opacity-70'
                      }`}
                    >
                      <div className="mb-5">
                        {link.external
                          ? <a href={link.href} target="_blank" rel="noopener noreferrer" tabIndex={isOpen ? 0 : -1} className={headerCls}>{link.label}</a>
                          : <Link href={link.href} tabIndex={isOpen ? 0 : -1} className={headerCls}>{link.label}</Link>
                        }
                        <div className={`h-[1.5px] rounded-full transition-all duration-300 ${colHovered ? 'bg-gold-500 w-full' : 'bg-white/20 w-full'}`} />
                      </div>
                      <ul className="space-y-[10px]">
                        {link.children.map(child => (
                          <li key={child.href}>
                            <ChildLink child={child} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

      </header>

      {/* ── Mobile menu ─────────────────────────────────────────────────────── */}
      {mobileOpen && (
        <>
          <div className="md:hidden fixed inset-0 z-[45] bg-black/20" onClick={() => setMobileOpen(false)} aria-hidden />
          <div className="md:hidden fixed left-0 right-0 top-[104px] z-[51] bg-white shadow-xl overflow-y-auto max-h-[calc(100vh-104px)]">

            {/* Mobile search */}
            <form onSubmit={handleSearchSubmit} className="px-5 py-3 border-b border-gray-100">
              <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-2.5">
                <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="검색어를 입력하세요"
                  className="flex-1 bg-transparent text-[13px] text-gray-900 placeholder-gray-400 outline-none"
                />
                {searchQuery && <button type="submit" className="text-[12px] text-navy-800 font-semibold">검색</button>}
              </div>
            </form>

            {/* Accordion nav */}
            <ul className="flex flex-col divide-y divide-gray-50">
              {navLinks.map(link => {
                const isExpanded = mobileExpanded === link.href;
                const active     = isSectionActive(link);
                return (
                  <li key={link.href}>
                    <button
                      onClick={() => setMobileExpanded(isExpanded ? null : link.href)}
                      className={`w-full flex items-center justify-between px-6 py-4 text-sm font-semibold transition-colors ${active ? 'text-navy-900' : 'text-gray-600'}`}
                    >
                      <span>{link.label}</span>
                      <svg className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                      </svg>
                    </button>
                    {isExpanded && (
                      <ul className="bg-gray-50 border-t border-gray-100 py-1">
                        {link.children.map(child => {
                          const childActive = router.pathname === child.href;
                          const mCls = `flex items-center gap-2 pl-10 pr-6 py-3 text-[13px] transition-colors no-underline ${
                            childActive ? 'text-gold-600 font-semibold' : 'text-gray-500 hover:text-navy-800'
                          }`;
                          const arrow = (
                            <svg className="w-3 h-3 flex-shrink-0 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7"/>
                            </svg>
                          );
                          const close = () => { setMobileOpen(false); setMobileExpanded(null); };
                          return (
                            <li key={child.href}>
                              {child.external
                                ? <a href={child.href} target="_blank" rel="noopener noreferrer" onClick={close} className={mCls}>{arrow}{child.label}</a>
                                : <Link href={child.href} onClick={close} className={mCls}>{arrow}{child.label}</Link>
                              }
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>

            {/* Bottom CTA */}
            <div className="px-6 py-5 flex flex-col gap-3 border-t border-gray-100">
              <a href={`tel:${config.phoneNumber}`} className="text-center text-gold-600 font-semibold py-4 border border-gold-300 rounded-xl text-sm">
                ☎ {config.phoneNumber}
              </a>
              <Link href="/contact" onClick={() => setMobileOpen(false)} className="block text-center px-4 py-4 bg-navy-800 text-white font-semibold rounded-xl hover:bg-navy-700 transition-colors text-sm no-underline">
                상담 신청
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
}
