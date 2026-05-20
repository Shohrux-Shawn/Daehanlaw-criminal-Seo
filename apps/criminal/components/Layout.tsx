import { useState, type ReactNode } from 'react';
import { Navbar, Footer, QuickMenu, AiChatPanel } from '@daehanlaw/ui';
import { SITE_CONFIG } from '@/site.config';
import { ScrollToTop } from '@/components/ui/scroll-to-top';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar config={SITE_CONFIG} />
      {/* offset for fixed two-layer header: 36px top bar + 68px main bar */}
      <main className="flex-1 pt-[104px]">{children}</main>
      <Footer config={SITE_CONFIG} />
      <QuickMenu config={SITE_CONFIG} onOpenChat={() => setChatOpen(true)} />
      <AiChatPanel config={SITE_CONFIG} open={chatOpen} onClose={() => setChatOpen(false)} />
      <ScrollToTop />
    </div>
  );
}
