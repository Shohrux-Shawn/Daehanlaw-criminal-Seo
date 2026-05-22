import { useState, useEffect, useRef, useMemo, FormEvent } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { X, Send, Sparkles, Loader2 } from 'lucide-react';
import type { SiteConfig } from '@daehanlaw/config';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface Props {
  config: SiteConfig;
  open: boolean;
  onClose: () => void;
}

export function AiChatPanel({ config, open, onClose }: Props) {
  const welcome: Message = {
    role: 'assistant',
    content: `👋 안녕하세요! 법무법인 대한중앙 ${config.practiceArea} AI 법률 상담 어시스턴트입니다. ${config.practiceArea} 관련 궁금한 사항을 편하게 물어보세요.`,
  };

  const [messages, setMessages] = useState<Message[]>([welcome]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  // Pre-computed particle config — stable across re-renders
  const particles = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        key: i,
        left: Math.random() * 100,
        x1: Math.random() * 200 - 100,
        x2: Math.random() * 200 - 100,
        duration: 5 + Math.random() * 3,
        delay: i * 0.4,
      })),
    [],
  );

  const userMessageCount = messages.filter((m) => m.role === 'user').length;
  const showCta = userMessageCount >= 3;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onMouseDown(e: MouseEvent) {
      if (chatRef.current && !chatRef.current.contains(e.target as Node)) onClose();
    }
    document.addEventListener('mousedown', onMouseDown);
    return () => document.removeEventListener('mousedown', onMouseDown);
  }, [open, onClose]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const next: Message[] = [...messages, { role: 'user', content: text }];
    setMessages(next);
    setInput('');
    setLoading(true);

    const newUserCount = next.filter((m) => m.role === 'user').length;
    const firstUser = next.findIndex((m) => m.role === 'user');
    const apiMessages = firstUser >= 0 ? next.slice(firstUser) : next;

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: apiMessages,
          messageCount: newUserCount,
          practiceArea: config.practiceArea,
          phoneNumber: config.phoneNumber,
        }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: '죄송합니다. 잠시 후 다시 시도해 주세요.' },
      ]);
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;

  return (
    <div
      ref={chatRef}
      className="fixed bottom-24 right-5 z-[60] w-[calc(100vw-2.5rem)] max-w-[400px] h-[min(600px,75vh)] rounded-2xl overflow-hidden p-[2px]"
      aria-label="AI 법률 상담"
      role="dialog"
      aria-modal="true"
    >
      {/* Animated outer border ring */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-[color:var(--gold-warm)]/50"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
      />

      {/* Inner card — warm cream */}
      <div className="relative flex flex-col w-full h-full rounded-xl border border-[color:var(--cream-section)] overflow-hidden bg-[color:var(--cream-page)] backdrop-blur-xl shadow-[0_24px_60px_rgba(60,40,20,0.18)]">
        {/* Soft cream gradient wash */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          style={{
            backgroundImage:
              'linear-gradient(135deg, var(--cream-page) 0%, var(--cream-card) 50%, var(--cream-section) 100%)',
            backgroundSize: '200% 200%',
            opacity: 0.85,
          }}
        />

        {/* Floating particles — gold on cream */}
        {particles.map((p) => (
          <motion.div
            key={p.key}
            className="absolute w-1 h-1 rounded-full bg-[color:var(--gold-warm)]/40 pointer-events-none"
            animate={{
              y: ['0%', '-140%'],
              x: [p.x1, p.x2],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: 'easeInOut',
            }}
            style={{ left: `${p.left}%`, bottom: '-10%' }}
          />
        ))}

        {/* Header */}
        <div className="relative z-10 flex justify-between items-center px-4 py-3 border-b border-[color:var(--cream-section)] flex-shrink-0 bg-white/40 backdrop-blur-sm">
          <div className="flex items-center gap-2 min-w-0">
            <Sparkles className="h-5 w-5 text-[color:var(--gold-warm-deep)] flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-[color:var(--ink-strong)] font-semibold text-[14px] leading-tight">AI 법률 상담</p>
              <p className="text-[11px] text-[color:var(--ink-muted)] leading-tight mt-0.5 truncate">
                {config.practiceArea} 어시스턴트
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="닫기"
            className="text-[color:var(--ink-muted)] hover:text-[color:var(--ink-strong)] transition-colors p-2 -mr-2 flex-shrink-0"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Messages */}
        <div className="relative z-10 flex-1 overflow-y-auto px-4 py-4">
          <div className="flex flex-col space-y-3 text-sm">
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl shadow-sm backdrop-blur-md whitespace-pre-wrap ${
                  msg.role === 'assistant'
                    ? 'bg-white text-[color:var(--ink-strong)] self-start rounded-tl-md border border-[color:var(--cream-section)]'
                    : 'bg-[color:var(--gold-warm)] text-white font-semibold self-end rounded-tr-md'
                }`}
              >
                <p className="text-[13px] leading-relaxed">{msg.content}</p>
              </motion.div>
            ))}

            {loading && (
              <motion.div
                className="flex items-center gap-1 px-3.5 py-2.5 rounded-2xl max-w-fit bg-white border border-[color:var(--cream-section)] self-start rounded-tl-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0.6, 1] }}
                transition={{ repeat: Infinity, duration: 1.2 }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--gold-warm)] animate-pulse" />
                <span
                  className="w-1.5 h-1.5 rounded-full bg-[color:var(--gold-warm)] animate-pulse"
                  style={{ animationDelay: '0.2s' }}
                />
                <span
                  className="w-1.5 h-1.5 rounded-full bg-[color:var(--gold-warm)] animate-pulse"
                  style={{ animationDelay: '0.4s' }}
                />
              </motion.div>
            )}
            <div ref={bottomRef} />
          </div>
        </div>

        {/* 3-question CTA */}
        {showCta && (
          <div className="relative z-10 flex items-center justify-center gap-3 px-4 py-3 border-t border-[color:var(--cream-section)] bg-white/60 backdrop-blur-sm flex-shrink-0">
            <a
              href={`tel:${config.phoneNumber}`}
              className="flex items-center gap-1.5 px-4 py-2 bg-[color:var(--gold-warm)] hover:bg-[color:var(--gold-warm-deep)] text-white text-[12px] font-bold rounded-full transition-colors no-underline"
            >
              📞 {config.phoneNumber}
            </a>
            <Link
              href="/contact"
              onClick={onClose}
              className="flex items-center gap-1.5 px-4 py-2 border border-[color:var(--gold-warm)] text-[color:var(--gold-warm-deep)] hover:bg-[color:var(--gold-warm)] hover:text-white text-[12px] font-bold rounded-full transition-colors no-underline"
            >
              📋 상담 예약
            </Link>
          </div>
        )}

        {/* Input form */}
        <form
          onSubmit={handleSubmit}
          className={`relative z-10 flex items-center gap-2 p-3 border-t flex-shrink-0 transition-colors ${
            isFocused
              ? 'border-[color:var(--gold-warm)]/50 bg-white/80'
              : 'border-[color:var(--cream-section)] bg-white/50'
          } backdrop-blur-sm`}
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="법률 질문을 입력해 주세요..."
            disabled={loading}
            className="flex-1 px-3.5 py-2.5 text-[13px] bg-white rounded-full border border-[color:var(--cream-section)] text-[color:var(--ink-strong)] placeholder:text-[color:var(--ink-muted)]/60 focus:outline-none focus:border-[color:var(--gold-warm)] disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={loading || input.trim() === ''}
            aria-label="전송"
            className={`flex-shrink-0 p-2.5 rounded-full transition-colors ${
              loading || input.trim() === ''
                ? 'bg-[color:var(--cream-section)] text-[color:var(--ink-muted)]/40 cursor-not-allowed'
                : 'bg-[color:var(--gold-warm)] hover:bg-[color:var(--gold-warm-deep)] text-white'
            }`}
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </button>
        </form>
      </div>
    </div>
  );
}
