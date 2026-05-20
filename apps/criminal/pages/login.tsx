import { useState, FormEvent } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import { useMutation } from '@apollo/client';
import { USER_LOGIN, USER_SIGNUP } from '@daehanlaw/graphql';
import { SeoHead } from '@daehanlaw/ui';
import { SITE_CONFIG } from '@/site.config';

type Mode = 'login' | 'signup';

interface FormState {
  memberFullName: string;
  memberEmail: string;
  memberPhone: string;
  memberPassword: string;
  passwordConfirm: string;
}

const initialForm: FormState = {
  memberFullName: '',
  memberEmail: '',
  memberPhone: '',
  memberPassword: '',
  passwordConfirm: '',
};

function setSession() {
  if (typeof document !== 'undefined') {
    document.cookie = 'auth_user_session=1; max-age=7200; path=/; SameSite=Lax';
  }
}

function translateError(msg: string): string {
  const lower = msg.toLowerCase();
  if (lower.includes('404') || lower.includes('password') || lower.includes('not found')) {
    return '이메일 또는 비밀번호가 올바르지 않습니다.';
  }
  if (lower.includes('exist') || lower.includes('duplicate')) {
    return '이미 등록된 이메일입니다.';
  }
  return msg;
}

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>('login');
  const [form, setForm] = useState<FormState>(initialForm);
  const [error, setError] = useState<string | null>(null);

  const [userLogin, { loading: loginLoading }] = useMutation(USER_LOGIN);
  const [userSignup, { loading: signupLoading }] = useMutation(USER_SIGNUP);
  const loading = loginLoading || signupLoading;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (error) setError(null);
  }

  function switchMode(next: Mode) {
    setMode(next);
    setForm(initialForm);
    setError(null);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (mode === 'signup') {
      if (form.memberPassword.length < 6) {
        setError('비밀번호는 6자 이상이어야 합니다.');
        return;
      }
      if (form.memberPassword !== form.passwordConfirm) {
        setError('비밀번호가 일치하지 않습니다.');
        return;
      }
    }

    try {
      if (mode === 'login') {
        const { data } = await userLogin({
          variables: {
            input: {
              memberEmail: form.memberEmail.trim(),
              memberPassword: form.memberPassword,
            },
          },
        });
        const t = data?.userLogin;
        if (!t?.accessToken) throw new Error('No token');
        localStorage.setItem('userAccessToken', t.accessToken);
        localStorage.setItem('userName', t.memberFullName ?? '');
        localStorage.setItem('userEmail', t.memberEmail ?? '');
      } else {
        const { data } = await userSignup({
          variables: {
            input: {
              memberFullName: form.memberFullName.trim(),
              memberEmail: form.memberEmail.trim(),
              memberPhone: form.memberPhone.trim(),
              memberPassword: form.memberPassword,
            },
          },
        });
        const t = data?.userSignup;
        if (!t?.accessToken) throw new Error('No token');
        localStorage.setItem('userAccessToken', t.accessToken);
        localStorage.setItem('userName', t.memberFullName ?? '');
        localStorage.setItem('userEmail', t.memberEmail ?? '');
      }

      setSession();
      router.push('/');
    } catch (err) {
      const msg = (err as Error).message || '알 수 없는 오류가 발생했습니다.';
      setError(translateError(msg));
    }
  }

  return (
    <>
      <SeoHead
        config={SITE_CONFIG}
        title="로그인 / 회원가입"
        description="대한중앙 형사전문센터 회원 로그인 및 회원가입 페이지입니다."
        canonicalPath="/login"
      />
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
    <div className="min-h-screen relative">
      <div
        className="fixed inset-0 -z-10 pointer-events-none bg-no-repeat bg-center"
        style={{ backgroundImage: 'url(/loginHero.png)', backgroundSize: '100% 100%' }}
        aria-hidden
      />
      <div
        className="fixed inset-0 -z-[9] pointer-events-none"
        style={{ background: 'rgba(10, 15, 30, 0.38)' }}
        aria-hidden
      />

      <div className="relative z-10 min-h-screen flex flex-col lg:flex-row max-w-7xl mx-auto px-6 sm:px-10 py-10 lg:py-16 gap-10 lg:gap-12">

        {/* Left: hero tagline */}
        <div className="flex-1 flex flex-col justify-center text-center lg:text-left animate-fade-in-up">
          <p className="text-[13px] text-white/60 tracking-[0.35em] uppercase mb-5">
            법무법인 대한중앙 · {SITE_CONFIG.practiceArea} 전문
          </p>

          <h1 className="text-[38px] sm:text-[54px] lg:text-[64px] font-black text-white leading-[1.05] tracking-tight mb-2">
            HIGHER STANDARDS,
          </h1>
          <h1 className="text-[38px] sm:text-[54px] lg:text-[64px] font-black text-gold-400 leading-[1.05] tracking-tight mb-8">
            BUILDING TRUST
          </h1>

          <p className="text-[14px] sm:text-[16px] text-white/70 leading-relaxed max-w-md mx-auto lg:mx-0">
            {SITE_CONFIG.practiceArea} 전문변호사와 함께<br />
            든든한 법률 파트너가 되어드립니다
          </p>

          <div className="flex items-center gap-3 mt-10 justify-center lg:justify-start">
            <span className="h-px w-16 bg-white/25" />
            <span className="text-gold-400 text-[14px]">★</span>
            <span className="h-px w-16 bg-white/25" />
          </div>
        </div>

        {/* Right: login card */}
        <div className="w-full lg:w-[420px] lg:flex-shrink-0 flex flex-col gap-5 justify-center animate-fade-in-up">

          {/* Logo */}
          <div className="text-center">
            <Link href="/" className="inline-flex flex-row items-center gap-1.5 no-underline">
              <img src="/favicon2.png" alt="법무법인 대한중앙" className="h-9 w-auto" />
              <div className="w-px h-8 bg-white/20 mx-0.5" />
              <div className="flex flex-col items-start gap-0.5">
                <span className="text-white font-bold text-[15px] tracking-wide leading-none">법무법인 대한중앙</span>
                <span className="text-gold-400 text-[10px] font-medium tracking-[0.18em] uppercase leading-none">Daehan Law Group</span>
              </div>
            </Link>
          </div>

          <div className="w-full bg-white rounded-2xl shadow-2xl p-8">

            {/* Mode toggle */}
            <div className="grid grid-cols-2 gap-1 mb-6 p-1 bg-gray-100 rounded-xl">
              {(['login', 'signup'] as Mode[]).map(m => (
                <button
                  key={m}
                  type="button"
                  onClick={() => switchMode(m)}
                  className={`py-3 min-h-11 text-[13px] font-bold rounded-lg transition-all ${
                    mode === m
                      ? 'bg-white text-navy-900 shadow-sm'
                      : 'text-gray-500 hover:text-navy-700'
                  }`}
                >
                  {m === 'login' ? '로그인' : '회원가입'}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">

              {mode === 'signup' && (
                <div>
                  <label htmlFor="memberFullName" className="form-label">
                    성함 <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="memberFullName" name="memberFullName" type="text"
                    value={form.memberFullName} onChange={handleChange}
                    placeholder="홍길동" required
                    className="form-input"
                  />
                </div>
              )}

              <div>
                <label htmlFor="memberEmail" className="form-label">
                  이메일 <span className="text-red-500">*</span>
                </label>
                <input
                  id="memberEmail" name="memberEmail" type="email"
                  value={form.memberEmail} onChange={handleChange}
                  placeholder="example@email.com" required autoComplete="email"
                  className="form-input"
                />
              </div>

              {mode === 'signup' && (
                <div>
                  <label htmlFor="memberPhone" className="form-label">
                    연락처 <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="memberPhone" name="memberPhone" type="tel"
                    value={form.memberPhone} onChange={handleChange}
                    placeholder="010-1234-5678" required autoComplete="tel"
                    className="form-input"
                  />
                </div>
              )}

              <div>
                <label htmlFor="memberPassword" className="form-label">
                  비밀번호 <span className="text-red-500">*</span>
                </label>
                <input
                  id="memberPassword" name="memberPassword" type="password"
                  value={form.memberPassword} onChange={handleChange}
                  placeholder="6자 이상" required
                  autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                  className="form-input"
                />
              </div>

              {mode === 'signup' && (
                <div>
                  <label htmlFor="passwordConfirm" className="form-label">
                    비밀번호 확인 <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="passwordConfirm" name="passwordConfirm" type="password"
                    value={form.passwordConfirm} onChange={handleChange}
                    placeholder="비밀번호 재입력" required autoComplete="new-password"
                    className="form-input"
                  />
                </div>
              )}

              {error && (
                <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-gold-500 hover:bg-gold-400 disabled:opacity-60 text-navy-900 font-bold text-[14px] rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    처리 중...
                  </>
                ) : mode === 'login' ? '로그인' : '회원가입'}
              </button>
            </form>

            <div className="mt-6 text-center text-[13px] text-gray-500">
              {mode === 'login' ? '계정이 없으신가요?' : '이미 계정이 있으신가요?'}{' '}
              <button
                type="button"
                onClick={() => switchMode(mode === 'login' ? 'signup' : 'login')}
                className="text-navy-700 font-semibold hover:text-navy-900 transition-colors"
              >
                {mode === 'login' ? '회원가입' : '로그인'}
              </button>
            </div>
          </div>

          <Link
            href="/"
            className="self-center inline-flex items-center justify-center min-h-11 px-4 py-2 text-[13px] text-white/70 hover:text-white transition-colors no-underline"
          >
            ← 메인으로 돌아가기
          </Link>

        </div>
      </div>
    </div>
    </>
  );
}
