import { useState, FormEvent } from 'react';
import { useMutation } from '@apollo/client/react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { AGENT_LOGIN, type AuthAgent } from '@daehanlaw/graphql';
import { SITE_CONFIG } from '@/site.config';

export default function AdminLoginPage() {
  const { isReady, login } = useAdminAuth(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [agentLogin, { loading, error }] = useMutation<{ agentLogin: AuthAgent }>(AGENT_LOGIN);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      const { data } = await agentLogin({
        variables: { input: { agentEmail: email, agentPassword: password } },
      });
      if (data?.agentLogin.accessToken) {
        login(data.agentLogin.accessToken, data.agentLogin.agentFullName);
      }
    } catch {
      // error UI handled below via the `error` from useMutation
    }
  }

  if (!isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <p className="text-sm">로드 중...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-10">
        <div className="text-center mb-8">
          <p className="text-sm font-bold text-gold-600">{SITE_CONFIG.siteName}</p>
          <h1 className="text-2xl font-bold text-navy-900 mt-1">관리자 로그인</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-xs font-semibold text-gray-600 mb-1.5">
              이메일
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="email"
              placeholder="admin@daehanlaw.com"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-300"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-xs font-semibold text-gray-600 mb-1.5">
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              placeholder="••••••••"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-300"
            />
          </div>

          {error && (
            <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
              이메일 또는 비밀번호가 올바르지 않습니다.
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-navy-900 hover:bg-navy-800 disabled:opacity-60 text-white font-semibold py-2.5 rounded-lg transition-colors"
          >
            {loading ? '로그인 중...' : '로그인'}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-gray-400">
          {SITE_CONFIG.practiceArea} 전문 법무법인 — 관리자 전용
        </p>
      </div>
    </div>
  );
}
