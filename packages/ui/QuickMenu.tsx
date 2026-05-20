import Link from 'next/link';
import { FileText, MessageCircle, Phone } from 'lucide-react';
import type { SiteConfig } from '@daehanlaw/config';

interface Props {
  config: SiteConfig;
  onOpenChat: () => void;
}

interface MenuItemProps {
  label: string;
  Icon: React.ElementType;
  href: string;
  isLink: boolean;
  iconColor?: string;
  brand: string;
  isLast: boolean;
}

function MenuItem({ label, Icon, href, isLink, iconColor, brand, isLast }: MenuItemProps) {
  const inner = (
    <span
      className={`flex flex-col items-center justify-center gap-1 py-3 w-full bg-white hover:bg-gray-50 transition-colors ${
        isLast ? 'rounded-b-xl' : 'border-b border-gray-100'
      }`}
    >
      <Icon size={20} className={iconColor ?? ''} style={!iconColor ? { color: brand } : undefined} strokeWidth={1.8} />
      <span className="text-[10px] text-gray-600 font-medium leading-tight">{label}</span>
    </span>
  );

  if (isLink) {
    return <Link href={href} className="block no-underline">{inner}</Link>;
  }
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel="noopener noreferrer"
      className="block no-underline"
    >
      {inner}
    </a>
  );
}

export function QuickMenu({ config, onOpenChat }: Props) {
  const brand = config.brandColor;

  const items = [
    { label: '온라인상담', Icon: FileText,     href: '/contact',                              isLink: true },
    { label: '카카오상담', Icon: MessageCircle, href: 'https://open.kakao.com/o/smlz9Hi',      isLink: false, iconColor: 'text-[#FEE500]' },
    { label: '전화상담',   Icon: Phone,        href: `tel:${config.phoneNumber}`,             isLink: false },
  ] as const;

  return (
    <>
      {/* Desktop full Quick Menu */}
      <div className="hidden md:flex fixed right-4 bottom-6 z-50 flex-col items-center gap-2">
        <div className="w-[92px] rounded-xl shadow-[0_8px_20px_rgba(0,0,0,0.15)] overflow-hidden border border-gray-100">
          <div
            className="w-full text-white text-[12px] font-bold text-center py-2 tracking-wide flex items-center justify-center"
            style={{ backgroundColor: brand }}
          >
            <span>Quick<br />Menu</span>
          </div>
          {items.map((item, i) => (
            <MenuItem
              key={item.label}
              label={item.label}
              Icon={item.Icon}
              href={item.href}
              isLink={item.isLink}
              iconColor={'iconColor' in item ? item.iconColor : undefined}
              brand={brand}
              isLast={i === items.length - 1}
            />
          ))}
        </div>

        <button
          onClick={onOpenChat}
          aria-label="AI 1:1 상담 열기"
          className="w-[75px] h-[75px] rounded-full bg-red-600 hover:bg-red-700 text-white flex flex-col items-center justify-center shadow-[0_4px_16px_rgba(220,38,38,0.4)] transition-colors"
        >
          <MessageCircle size={22} strokeWidth={1.8} />
          <span className="text-[11px] font-bold leading-tight mt-0.5">1:1 상담</span>
        </button>
      </div>

      {/* Mobile pill */}
      <button
        onClick={onOpenChat}
        aria-label="AI 1:1 상담 열기"
        className="md:hidden fixed right-4 bottom-4 z-50 flex items-center gap-2 px-5 py-3 min-h-11 bg-red-600 hover:bg-red-700 text-white text-[13px] font-bold rounded-full shadow-[0_4px_16px_rgba(220,38,38,0.4)] transition-colors"
      >
        <MessageCircle size={16} strokeWidth={1.8} />
        1:1 상담
      </button>
    </>
  );
}
