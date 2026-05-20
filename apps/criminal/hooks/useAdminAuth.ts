import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { isAuthCookieValid, setAuthCookie, clearAuthCookies } from '@/lib/auth/tokenExpiry';

interface UseAdminAuthReturn {
  isReady: boolean;
  agentName: string | null;
  login: (token: string, name: string) => void;
  logout: () => void;
}

/**
 * Admin auth hook for satellite. Mirrors `daehanlaw-next/hooks/useAdminAuth.ts`
 * so the same JWT works on both. The shared backend doesn't care which
 * frontend issued the request.
 *
 * @param requireAuth - true (default): redirect to login if no token.
 *                      false: redirect to articles if token already exists (login page).
 */
export function useAdminAuth(requireAuth = true): UseAdminAuthReturn {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);
  const [agentName, setAgentName] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const name = localStorage.getItem('adminAgentName');

    if (token && !isAuthCookieValid('agent')) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('adminAgentName');
      router.replace('/admin/login');
      return;
    }

    if (requireAuth) {
      if (!token) {
        router.replace('/admin/login');
      } else {
        setAgentName(name);
        setIsReady(true);
      }
    } else {
      if (token) {
        router.replace('/admin/articles');
      } else {
        setIsReady(true);
      }
    }

    const interval = setInterval(() => {
      const t = localStorage.getItem('accessToken');
      if (t && !isAuthCookieValid('agent')) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('adminAgentName');
        router.replace('/admin/login');
      }
    }, 60_000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function login(token: string, name: string) {
    localStorage.setItem('accessToken', token);
    localStorage.setItem('adminAgentName', name);
    setAuthCookie('agent');
    setAgentName(name);
    router.push('/admin/articles');
  }

  function logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('adminAgentName');
    clearAuthCookies();
    router.replace('/admin/login');
  }

  return { isReady, agentName, login, logout };
}
