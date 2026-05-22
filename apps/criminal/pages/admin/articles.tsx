import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useQuery, useMutation } from '@apollo/client/react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { SITE_CONFIG } from '@/site.config';
import {
  ADMIN_GET_ARTICLES,
  DELETE_ARTICLE_BY_ADMIN,
  type Article,
  type Articles,
} from '@daehanlaw/graphql';
import { usePagination } from '@/lib/hooks/usePagination';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

const ArticleModal = dynamic(() => import('@/components/admin/ArticleModal'), { ssr: false });

const LIMIT = 20;

const CATEGORY_LABEL: Record<string, string> = {
  INSIGHT:    '기업 인사이트',
  ANALYSIS:   '사례분석/최신동향',
  LEGAL_INFO: '법률정보',
  KNOWLEDGE:  '법률지식인',
  REVIEW:     '고객후기',
  PRESS:      '언론보도',
  FORM:       '법률서식',
  NEWSLETTER: '뉴스레터',
  BROCHURE:   '브로슈어',
};

export default function AdminArticlesPage() {
  const { isReady, agentName, logout } = useAdminAuth();
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editArticle, setEditArticle] = useState<Article | null>(null);

  const queryVars = {
    input: {
      page,
      limit: LIMIT,
      sort: 'createdAt',
      direction: 'DESC',
      // Hardcoded: this admin only manages articles owned by THIS satellite.
      search: { siteOrigin: SITE_CONFIG.siteOrigin },
    },
  };

  const { data, loading, refetch } = useQuery<{ getAllArticlesByAdmin: Articles }>(
    ADMIN_GET_ARTICLES,
    { variables: queryVars, skip: !isReady },
  );

  const [deleteArticle] = useMutation(DELETE_ARTICLE_BY_ADMIN, {
    refetchQueries: [{ query: ADMIN_GET_ARTICLES, variables: queryVars }],
  });

  const articles = data?.getAllArticlesByAdmin?.list ?? [];
  const total = data?.getAllArticlesByAdmin?.metaCounter?.[0]?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / LIMIT));

  function handleDelete(article: Article) {
    if (window.confirm(`정말 "${article.articleTitle}"을(를) 삭제하시겠습니까?`)) {
      deleteArticle({ variables: { articleId: article._id } });
    }
  }

  if (!isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-500">
        <p className="text-sm">로그인 확인 중...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Topbar */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-gold-600 tracking-wider uppercase">
              {SITE_CONFIG.siteName} 관리자
            </p>
            <h1 className="text-lg font-bold text-navy-900">아티클 관리</h1>
          </div>
          <div className="flex items-center gap-3">
            {agentName && <span className="text-xs text-gray-500">{agentName}님</span>}
            <button
              onClick={logout}
              className="text-xs font-semibold text-gray-600 hover:text-gray-900 px-3 py-1.5 border border-gray-200 rounded-lg"
            >
              로그아웃
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-5">
          <p className="text-sm text-gray-500">
            총 <span className="font-semibold text-navy-900">{total}</span>건 (이 사이트의 아티클만 표시)
          </p>
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-gold-500 hover:bg-gold-600 text-white text-xs font-semibold rounded-lg transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            새 아티클 작성
          </button>
        </div>

        {loading ? (
          <div className="bg-white rounded-lg p-12 text-center text-gray-400 text-sm">로드 중...</div>
        ) : articles.length === 0 ? (
          <div className="bg-white rounded-lg p-12 text-center text-gray-400 text-sm">
            등록된 아티클이 없습니다. "새 아티클 작성"으로 첫 글을 작성해보세요.
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600">제목</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 whitespace-nowrap">카테고리</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 whitespace-nowrap">상태</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 whitespace-nowrap">등록일</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-gray-600"></th>
                </tr>
              </thead>
              <tbody>
                {articles.map((article, i) => (
                  <tr key={article._id} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-4 py-3 font-medium text-navy-900 max-w-md truncate">
                      {article.articleTitle}
                    </td>
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                      {CATEGORY_LABEL[article.articleCategory] ?? article.articleCategory}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold ${
                          article.articleStatus === 'DELETE'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-green-100 text-green-700'
                        }`}
                      >
                        {article.articleStatus === 'DELETE' ? '삭제됨' : '활성'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-400 whitespace-nowrap text-xs">
                      {article.createdAt
                        ? new Date(article.createdAt).toLocaleDateString('ko-KR')
                        : '-'}
                    </td>
                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      <button
                        onClick={() => setEditArticle(article)}
                        className="text-xs text-blue-500 hover:text-blue-700 font-medium mr-3"
                      >
                        수정
                      </button>
                      <button
                        onClick={() => handleDelete(article)}
                        className="text-xs text-red-500 hover:text-red-700 font-medium"
                      >
                        삭제
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {totalPages > 1 && (
          <AdminPagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        )}
      </main>

      {modalOpen && (
        <ArticleModal
          onClose={() => setModalOpen(false)}
          onSaved={() => {
            setModalOpen(false);
            refetch();
          }}
        />
      )}

      {editArticle && (
        <ArticleModal
          initialData={editArticle}
          onClose={() => setEditArticle(null)}
          onSaved={() => {
            setEditArticle(null);
            refetch();
          }}
        />
      )}
    </div>
  );
}

interface AdminPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function AdminPagination({ currentPage, totalPages, onPageChange }: AdminPaginationProps) {
  const { pages, showLeftEllipsis, showRightEllipsis } = usePagination({
    currentPage,
    totalPages,
    paginationItemsToDisplay: 7,
  });

  return (
    <Pagination className="mt-6">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
            aria-disabled={currentPage === 1}
            className={currentPage === 1 ? 'pointer-events-none opacity-40' : ''}
          />
        </PaginationItem>

        {showLeftEllipsis && (
          <>
            <PaginationItem>
              <PaginationLink onClick={() => onPageChange(1)} isActive={currentPage === 1}>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          </>
        )}

        {pages.map((p) => (
          <PaginationItem key={p}>
            <PaginationLink onClick={() => onPageChange(p)} isActive={currentPage === p}>
              {p}
            </PaginationLink>
          </PaginationItem>
        ))}

        {showRightEllipsis && (
          <>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                onClick={() => onPageChange(totalPages)}
                isActive={currentPage === totalPages}
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        <PaginationItem>
          <PaginationNext
            onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
            aria-disabled={currentPage === totalPages}
            className={currentPage === totalPages ? 'pointer-events-none opacity-40' : ''}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
