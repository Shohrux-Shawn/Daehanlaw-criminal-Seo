import { useState, useEffect } from 'react';

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="맨 위로"
      className="fixed bottom-24 right-5 z-50 flex h-11 w-11 items-center justify-center
                 rounded-full bg-white/90 shadow-lg border border-gray-200
                 hover:bg-white transition-all duration-200"
    >
      <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24"
           stroke="currentColor" strokeWidth="2.2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
}
