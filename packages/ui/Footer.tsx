import Link from 'next/link';
import { Youtube, Instagram } from 'lucide-react';
import type { SiteConfig } from '@daehanlaw/config';

interface FooterProps {
  config: SiteConfig;
}

export function Footer({ config }: FooterProps) {
  const main = config.mainSiteUrl;

  const FOOTER_LINKS = [
    { label: '서비스 이용약관',    href: `${main}/terms` },
    { label: '개인정보처리방침',   href: `${main}/privacy`, bold: true },
    { label: '면책공고',           href: `${main}/disclaimer` },
    { label: '유한책임',           href: `${main}/limited-liability` },
    { label: '이메일무단수집거부', href: `${main}/no-spam` },
    { label: '고객만족센터',       href: '/contact', internal: true },
  ];

  const COMPANY_INFO = {
    address:        '부산 해운대구 해운대로 554 라온제이빌딩 7층',
    businessNumber: '444-85-01147',
    phone:          config.phoneNumber,
    email:          'hanbyungchul@naver.com',
    representative: '한병철 변호사',
  };

  const SOCIAL_LINKS = [
    { label: 'Blog',      Icon: BlogIcon,  href: 'https://blog.naver.com/hanbyungchul' },
    { label: 'KakaoTalk', Icon: KakaoIcon, href: 'https://open.kakao.com/o/smlz9Hi' },
    { label: 'YouTube',   Icon: Youtube,   href: 'https://youtube.com/channel/UCA0AG-U7Tp9fDmzjqUmPLIw' },
    { label: 'Instagram', Icon: Instagram, href: 'https://instagram.com/daehanjoongang_haeundae' },
  ];

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Brand row */}
        <div className="flex items-center justify-between py-6 border-b border-gray-100">
          <div>
            <p className="text-[17px] font-bold text-navy-900 tracking-tight">법무법인 대한중앙</p>
            <p className="text-[11px] text-gray-400 mt-0.5">{config.siteName} · {config.practiceArea} 전문</p>
          </div>
        </div>

        {/* Policy links */}
        <div className="flex flex-wrap items-center gap-x-0 gap-y-2 py-4 border-b border-gray-100">
          {FOOTER_LINKS.map((link, i) => (
            <span key={link.href + link.label} className="flex items-center">
              {i > 0 && <span className="text-gray-300 mx-6 text-[16px]">|</span>}
              {link.internal ? (
                <Link
                  href={link.href}
                  className={`text-[15px] transition-colors hover:text-navy-700 no-underline inline-flex items-center min-h-11 py-2 ${
                    link.bold ? 'font-bold text-gray-800' : 'text-gray-600'
                  }`}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-[15px] transition-colors hover:text-navy-700 no-underline inline-flex items-center min-h-11 py-2 ${
                    link.bold ? 'font-bold text-gray-800' : 'text-gray-600'
                  }`}
                >
                  {link.label}
                </a>
              )}
            </span>
          ))}
        </div>

        {/* Company info */}
        <div className="py-4 border-b border-gray-100">
          {/* Desktop */}
          <div className="hidden sm:flex flex-wrap items-center gap-y-1 text-[14px] text-gray-500">
            <span><span className="text-gray-400">주소:</span>&nbsp;{COMPANY_INFO.address}</span>
            <span className="mx-3 text-gray-300">|</span>
            <span><span className="text-gray-400">사업자등록번호:</span>&nbsp;{COMPANY_INFO.businessNumber}</span>
            <span className="mx-3 text-gray-300">|</span>
            <span><span className="text-gray-400">대표번호:</span>&nbsp;{COMPANY_INFO.phone}</span>
            <span className="mx-3 text-gray-300">|</span>
            <span><span className="text-gray-400">이메일문의:</span>&nbsp;{COMPANY_INFO.email}</span>
            <span className="mx-3 text-gray-300">|</span>
            <span><span className="text-gray-400">광고책임변호사:</span>&nbsp;{COMPANY_INFO.representative}</span>
          </div>
          {/* Mobile */}
          <div className="flex flex-col gap-1 sm:hidden text-[12px] text-gray-500">
            <p><span className="text-gray-400">주소</span>&nbsp;{COMPANY_INFO.address}</p>
            <p>
              <span className="text-gray-400">사업자등록번호</span>&nbsp;{COMPANY_INFO.businessNumber}
              <span className="mx-2 text-gray-300">·</span>
              <span className="text-gray-400">대표번호</span>&nbsp;{COMPANY_INFO.phone}
            </p>
            <p>
              <span className="text-gray-400">이메일문의</span>&nbsp;{COMPANY_INFO.email}
              <span className="mx-2 text-gray-300">·</span>
              <span className="text-gray-400">광고책임변호사</span>&nbsp;{COMPANY_INFO.representative}
            </p>
          </div>
        </div>

        {/* Copyright */}
        <p className="py-3 text-[14px] text-gray-400 border-b border-gray-100">
          Copyright 법무법인 대한중앙 all rights reserved
        </p>

        {/* Social */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-5">
          <div className="flex items-center gap-2">
            {SOCIAL_LINKS.map(({ label, Icon, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 sm:w-9 sm:h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-gray-400 hover:text-gray-700 transition-colors"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}

function BlogIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm5.5 5v8h1.6l4-4.7V16h1.6V8h-1.6l-4 4.7V8H9.5Z" />
    </svg>
  );
}

function KakaoIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 3C6.48 3 2 6.58 2 11c0 2.83 1.84 5.32 4.63 6.77-.2.73-.72 2.66-.83 3.07-.14.52.19.51.4.37.17-.11 2.69-1.82 3.77-2.56.65.1 1.34.15 2.03.15 5.52 0 10-3.58 10-8S17.52 3 12 3Z" />
    </svg>
  );
}
