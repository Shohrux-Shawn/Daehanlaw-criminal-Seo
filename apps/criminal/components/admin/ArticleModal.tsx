import { useState } from 'react';
import { useMutation } from '@apollo/client/react';
import {
  CREATE_ARTICLE,
  UPDATE_ARTICLE,
  UPDATE_ARTICLE_BY_ADMIN,
  type Article,
} from '@daehanlaw/graphql';
import { SITE_CONFIG } from '@/site.config';

// Categories the satellite admin can use. The backend supports many more, but
// FORM/NEWSLETTER/BROCHURE are document-attachment categories that need image
// upload — out of scope for the satellite v1. Add here later if needed.
const CATEGORY_OPTIONS = [
  { label: '기업 인사이트',     value: 'INSIGHT' },
  { label: '사례분석/최신동향', value: 'ANALYSIS' },
  { label: '법률정보',          value: 'LEGAL_INFO' },
  { label: '법률지식인',        value: 'KNOWLEDGE' },
  { label: '고객후기',          value: 'REVIEW' },
];

interface Props {
  onClose: () => void;
  onSaved: () => void;
  initialData?: Article;
}

export default function ArticleModal({ onClose, onSaved, initialData }: Props) {
  const isEdit = Boolean(initialData);

  const [form, setForm] = useState({
    articleTitle:    initialData?.articleTitle    ?? '',
    articleCategory: initialData?.articleCategory ?? 'LEGAL_INFO',
    articleContent:  initialData?.articleContent  ?? '',
  });
  const [error, setError] = useState('');

  // Satellite admin always writes/updates as "ADMIN" via the by-admin mutation,
  // because the satellite admin login could be the same JWT used for
  // main-site admin. The backend will accept it.
  const [createArticle, { loading: creating }] = useMutation(CREATE_ARTICLE);
  const [updateArticle, { loading: updating }] = useMutation(
    isEdit ? UPDATE_ARTICLE_BY_ADMIN : UPDATE_ARTICLE,
  );
  const loading = creating || updating;

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setError('');
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.articleTitle.trim()) {
      setError('제목을 입력해주세요.');
      return;
    }
    if (!form.articleContent.trim()) {
      setError('내용을 입력해주세요.');
      return;
    }
    setError('');

    try {
      if (isEdit) {
        await updateArticle({
          variables: {
            input: {
              _id:             initialData!._id,
              articleTitle:    form.articleTitle.trim(),
              articleCategory: form.articleCategory,
              articleContent:  form.articleContent,
              siteOrigin:      SITE_CONFIG.siteOrigin,
            },
          },
        });
      } else {
        await createArticle({
          variables: {
            input: {
              articleTitle:    form.articleTitle.trim(),
              articleCategory: form.articleCategory,
              articleContent:  form.articleContent,
              articleImage:    [],
              siteOrigin:      SITE_CONFIG.siteOrigin,
            },
          },
        });
      }
      onSaved();
    } catch (err: any) {
      setError(err?.message ?? '저장 중 오류가 발생했습니다.');
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-bold text-navy-900 text-lg">
            {isEdit ? '아티클 수정' : '새 아티클 작성'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="닫기"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col overflow-hidden">
          <div className="px-6 py-5 flex flex-col gap-4 overflow-y-auto">
            {/* Site origin — read-only badge so authors know which site this writes to */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">사이트</label>
              <div className="px-3 py-2 bg-navy-50 border border-navy-200 rounded-lg text-sm font-semibold text-navy-900">
                {SITE_CONFIG.siteName}
                <span className="ml-2 text-xs font-normal text-gray-500">
                  ({SITE_CONFIG.siteOrigin})
                </span>
              </div>
              <p className="text-[11px] text-gray-400 mt-1">
                이 글은 {SITE_CONFIG.siteName} 전용으로 저장됩니다.
              </p>
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">섹션 분류</label>
              <select
                name="articleCategory"
                value={form.articleCategory}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-300"
              >
                {CATEGORY_OPTIONS.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>

            {/* Title */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                제목 <span className="text-red-500">*</span>
              </label>
              <input
                name="articleTitle"
                type="text"
                value={form.articleTitle}
                onChange={handleChange}
                placeholder="아티클 제목을 입력하세요"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-300"
              />
            </div>

            {/* Content */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                내용 <span className="text-red-500">*</span>
              </label>
              <textarea
                name="articleContent"
                value={form.articleContent}
                onChange={handleChange}
                rows={12}
                placeholder="HTML 또는 일반 텍스트로 작성하세요. 이미지가 필요하면 메인 사이트 관리자에서 작성하세요."
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-navy-300 resize-y"
              />
              <p className="text-[11px] text-gray-400 mt-1">
                HTML 태그(예: &lt;p&gt;, &lt;h2&gt;, &lt;strong&gt;) 사용 가능
              </p>
            </div>

            {error && (
              <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}
          </div>

          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-navy-900 hover:bg-navy-800 text-white text-sm font-semibold rounded-lg disabled:opacity-60 transition-colors"
            >
              {loading ? '저장 중...' : '저장'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
