import Link from 'next/link';
import type { Article } from '@daehanlaw/graphql';

interface ArticleCardProps {
  article: Article;
  href?: string;
}

function stripHtml(html: string, max = 120): string {
  const plain = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  return plain.length > max ? plain.slice(0, max) + '…' : plain;
}

export function ArticleCard({ article, href }: ArticleCardProps) {
  const dest       = href ?? `/articles/${article._id}`;
  const isExternal = dest.startsWith('http');
  const cls        = 'card group block no-underline text-inherit border-t-[3px] border-t-navy-800 hover:border-navy-400 transition-colors duration-200';

  const inner = (
    <div className="p-6 flex flex-col gap-3 h-full">
      <h3 className="text-[15px] font-bold text-gray-900 leading-snug line-clamp-2 group-hover:text-navy-700 transition-colors">
        {article.articleTitle}
      </h3>
      {article.articleContent && (
        <p className="text-[13px] text-gray-500 leading-relaxed line-clamp-3">
          {stripHtml(article.articleContent)}
        </p>
      )}
      <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-50">
        <span className="text-[11px] text-gray-400">
          {article.createdAt ? new Date(article.createdAt).toLocaleDateString('ko-KR') : ''}
        </span>
        <span className="text-[11px] text-navy-600 font-semibold group-hover:translate-x-0.5 transition-transform">
          자세히 보기 →
        </span>
      </div>
    </div>
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
