import Link from 'next/link';
import type { Case } from '@daehanlaw/graphql';

interface CaseCardProps {
  legalCase: Case;
  href?: string;
}

const STATUS_LABEL: Record<string, string> = {
  WON:                   '승소',
  NOT_PROSECUTED:        '불기소',
  CLAIM_DISMISSED:       '청구기각',
  APPLICATION_DISMISSED: '신청 기각',
  CONSULTATION_DONE:     '자문 완료',
  LEGAL_ADVICE:          '법률 자문',
};

const STATUS_COLOR: Record<string, string> = {
  WON:                   'text-red-600 bg-red-50 border-red-200',
  NOT_PROSECUTED:        'text-blue-600 bg-blue-50 border-blue-200',
  CLAIM_DISMISSED:       'text-purple-600 bg-purple-50 border-purple-200',
  APPLICATION_DISMISSED: 'text-purple-600 bg-purple-50 border-purple-200',
  CONSULTATION_DONE:     'text-green-600 bg-green-50 border-green-200',
  LEGAL_ADVICE:          'text-green-600 bg-green-50 border-green-200',
};

const STATUS_HOVER_BORDER: Record<string, string> = {
  WON:                   'hover:border-red-400',
  NOT_PROSECUTED:        'hover:border-blue-400',
  CLAIM_DISMISSED:       'hover:border-purple-400',
  APPLICATION_DISMISSED: 'hover:border-purple-400',
  CONSULTATION_DONE:     'hover:border-green-400',
  LEGAL_ADVICE:          'hover:border-green-400',
};

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

export function CaseCard({ legalCase, href }: CaseCardProps) {
  const statusKey      = legalCase.caseStatus ?? '';
  const statusLabel    = STATUS_LABEL[statusKey] ?? statusKey;
  const statusCls      = STATUS_COLOR[statusKey] ?? 'text-gray-600 bg-gray-50 border-gray-200';
  const hoverBorderCls = STATUS_HOVER_BORDER[statusKey] ?? 'hover:border-gold-400';
  const dest           = href ?? `/cases/${legalCase._id}`;
  const isExternal     = dest.startsWith('http');
  const cls            = `card group flex flex-col p-6 h-full no-underline text-inherit ${hoverBorderCls}`;

  const inner = (
    <>
      <div className="mb-3 flex items-center justify-between">
        {legalCase.caseLocation && (
          <span className="text-[11px] text-gray-400">{legalCase.caseLocation}</span>
        )}
        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${statusCls}`}>
          {statusLabel}
        </span>
      </div>

      <p className="text-[14px] font-bold text-gray-900 leading-snug line-clamp-2 mb-3 group-hover:text-navy-700 transition-colors">
        {legalCase.caseTitle}
      </p>

      {legalCase.caseDesc && (
        <p className="text-[12px] text-gray-500 leading-relaxed line-clamp-3 mt-auto">
          {stripHtml(legalCase.caseDesc)}
        </p>
      )}
    </>
  );

  if (isExternal) {
    return (
      <a href={dest} target="_blank" rel="noopener noreferrer" className={cls}>
        {inner}
      </a>
    );
  }

  return (
    <Link href={dest} className={cls}>
      {inner}
    </Link>
  );
}
