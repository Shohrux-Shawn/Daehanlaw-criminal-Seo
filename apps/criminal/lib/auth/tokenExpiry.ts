/**
 * Idle-based session expiry (2 hours). Mirrors the main-site implementation
 * at `daehanlaw-next/lib/auth/tokenExpiry.ts` so the same JWT works on both.
 */

const EXPIRY_SECONDS = 7200; // 2 hours

const COOKIE_NAMES = {
  agent: 'auth_agent_session',
} as const;

export function setAuthCookie(role: 'agent'): void {
  if (typeof document === 'undefined') return;
  document.cookie = `${COOKIE_NAMES[role]}=1; max-age=${EXPIRY_SECONDS}; path=/; SameSite=Lax`;
}

export function isAuthCookieValid(role: 'agent'): boolean {
  if (typeof document === 'undefined') return false;
  return document.cookie.split(';').some(c => c.trim().startsWith(`${COOKIE_NAMES[role]}=`));
}

export function clearAuthCookies(): void {
  if (typeof document === 'undefined') return;
  document.cookie = `${COOKIE_NAMES.agent}=; max-age=0; path=/; SameSite=Lax`;
}
