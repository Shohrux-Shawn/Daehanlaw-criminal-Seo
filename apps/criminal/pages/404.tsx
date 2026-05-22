import dynamic from 'next/dynamic';
import { SeoHead } from '@daehanlaw/ui';
import { SITE_CONFIG } from '@/site.config';

// Loaded client-side only — uses window, canvas, and the Web Animations API.
const NotFoundPage = dynamic(() => import('@/components/ui/page-not-found'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen bg-black flex items-center justify-center">
      <span className="text-white/40 text-sm">Loading…</span>
    </div>
  ),
});

export default function NotFound() {
  return (
    <>
      <SeoHead
        config={SITE_CONFIG}
        title="페이지를 찾을 수 없습니다 | 대한중앙 형사전문센터"
        description="요청하신 페이지를 찾을 수 없습니다."
        canonicalPath="/404"
      />
      <NotFoundPage />
    </>
  );
}
