import { useState, useEffect, useRef, FormEvent } from 'react';
import Link from 'next/link';
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
    content: `안녕하세요! 법무법인 대한중앙 ${config.practiceArea} AI 법률 상담 어시스턴트입니다. 재산분할, 양육권, 위자료 등 ${config.practiceArea} 관련 궁금한 사항을 편하게 물어보세요.`,
  };

  const [messages, setMessages] = useState<Message[]>([welcome]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  const userMessageCount = messages.filter(m => m.role === 'user').length;
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

    const newUserCount = next.filter(m => m.role === 'user').length;
    const firstUser = next.findIndex(m => m.role === 'user');
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
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: '죄송합니다. 잠시 후 다시 시도해 주세요.' }]);
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;

  return (
    <div
      ref={chatRef}
      className="fixed bottom-24 right-5 z-[60] flex flex-col w-[calc(100vw-2.5rem)] max-w-[400px] h-[min(600px,75vh)] bg-gradient-to-br from-slate-900 to-indigo-950 rounded-xl overflow-hidden shadow-2xl border border-indigo-500/20"
      aria-label="AI 법률 상담"
      role="dialog"
      aria-modal="true"
    >
      {/* Header */}
      <div className="bg-indigo-600/30 backdrop-blur-sm p-4 border-b border-indigo-500/30 flex justify-between items-center flex-shrink-0">
        <div className="flex items-center space-x-2">
          <Sparkles className="text-indigo-300 h-5 w-5" />
          <div>
            <p className="text-white font-medium text-[14px] leading-tight">AI 법률 상담</p>
            <p className="text-[11px] text-indigo-200/60 leading-tight mt-0.5">
              {config.practiceArea} 어시스턴트
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          aria-label="닫기"
          className="text-indigo-200 hover:text-white transition-colors p-2"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-slate-900/50">
        <div className="space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[85%] p-3 rounded-2xl animate-fade-in whitespace-pre-wrap ${
                  msg.role === 'user'
                    ? 'bg-indigo-600 text-white rounded-tr-none'
                    : 'bg-slate-700/60 text-slate-100 rounded-tl-none border border-slate-600/50'
                }`}
              >
                <p className="text-[13px] leading-relaxed">{msg.content}</p>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="max-w-[85%] p-3 rounded-2xl bg-slate-700/60 text-slate-100 rounded-tl-none border border-slate-600/50">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                  <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" style={{ animationDelay: '0.2s' }} />
                  <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* CTA after 3 questions */}
      {showCta && (
        <div className="flex items-center justify-center gap-3 px-4 py-3 bg-indigo-950/70 border-t border-indigo-500/30 flex-shrink-0">
          <a
            href={`tel:${config.phoneNumber}`}
            className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-[12px] font-bold rounded-full transition-colors"
          >
            📞 {config.phoneNumber}
          </a>
          <Link
            href="/contact"
            onClick={onClose}
            className="flex items-center gap-1.5 px-4 py-2 border border-indigo-400 text-indigo-200 hover:bg-indigo-500 hover:text-white text-[12px] font-bold rounded-full transition-colors"
          >
            📋 상담 예약
          </Link>
        </div>
      )}

      {/* Input form */}
      <form
        onSubmit={handleSubmit}
        className={`p-4 border-t transition-colors duration-200 flex-shrink-0 ${
          isFocused ? 'border-indigo-500/70 bg-slate-800/80' : 'border-slate-700/50 bg-slate-800/30'
        }`}
      >
        <div className="relative flex items-center">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="법률 질문을 입력해 주세요..."
            disabled={loading}
            className="w-full bg-slate-700/50 border border-slate-600/50 rounded-full py-3 pl-4 pr-12 text-white text-[13px] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/70 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={loading || input.trim() === ''}
            aria-label="전송"
            className={`absolute right-1 rounded-full p-2 transition-colors ${
              loading || input.trim() === ''
                ? 'text-slate-500 bg-slate-700/50 cursor-not-allowed'
                : 'text-white bg-indigo-600 hover:bg-indigo-500'
            }`}
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
          </button>
        </div>
      </form>

      <style>
        {`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
        `}
      </style>
    </div>
  );
}
