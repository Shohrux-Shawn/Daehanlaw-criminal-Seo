import React, { useState } from 'react';
import type { GetStaticProps } from 'next';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { SITE_CONFIG } from '@/site.config';
import { SeoHead } from '@daehanlaw/ui';

/* ── 상간자 위자료 산정 로직 ───────────────────────────────── */
const BASE_BY_MARRIAGE: Record<string, number> = {
  '2년미만':           10_000_000,
  '2년이상 5년미만':   20_000_000,
  '5년이상 10년미만':  30_000_000,
  '10년이상 15년미만': 40_000_000,
  '15년이상 30년미만': 50_000_000,
  '30년이상':          70_000_000,
};

const AFFAIR_MULTIPLIER: Record<string, number> = {
  '1년 이상': 1.3,
  '1년 미만': 1.0,
};

function calculateSolatium(
  marry: string,
  affair: string,
  ongoing: string,    // Q3: 만남 지속 여부
  evidence: string,   // Q4: 혼인관계 인지 증거
  divorce: string,    // Q5: 이혼 의사/소송 중
) {
  const base = BASE_BY_MARRIAGE[marry] ?? 20_000_000;
  let mult = AFFAIR_MULTIPLIER[affair] ?? 1.0;

  // Q3: 아직 만남 지속 중 → 가산
  if (ongoing === '네') mult += 0.1;
  // Q4: 혼인 인지 증거 있음 → 가산 (입증력 강화)
  if (evidence === '네') mult += 0.2;
  // Q5: 이혼 의사/소송 → 가산 (혼인 파탄 현실화)
  if (divorce === '네') mult += 0.15;

  const avg = Math.round((base * mult) / 1_000_000) * 1_000_000;
  return {
    low:  Math.round(avg * 0.6),
    avg,
    high: Math.round(avg * 1.5),
  };
}

function fmt(n: number) {
  return n.toLocaleString('ko-KR');
}

const NAVY = '#1a2f5c';
const TABS = ['기본정보', '예상 상간자\n위자료', '법률상담접수'];

const MARRY_OPTIONS = [
  '2년미만',
  '2년이상 5년미만',
  '5년이상 10년미만',
  '10년이상 15년미만',
  '15년이상 30년미만',
  '30년이상',
];

const AFFAIR_OPTIONS = ['1년 이상', '1년 미만'];

export default function SolatiumPage() {
  const [tab, setTab]       = useState(0);
  const [marry, setMarry]   = useState('');
  const [affair, setAffair] = useState('');
  const [ongoing, setOngoing]   = useState('');   // Q3
  const [evidence, setEvidence] = useState('');   // Q4
  const [divorce, setDivorce]   = useState('');   // Q5

  // consultation form
  const [name, setName]       = useState('');
  const [phone, setPhone]     = useState('');
  const [message, setMessage] = useState('');
  const [agreed, setAgreed]   = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const allAnswered = !!marry && !!affair && !!ongoing && !!evidence && !!divorce;
  const result = allAnswered
    ? calculateSolatium(marry, affair, ongoing, evidence, divorce)
    : null;

  return (
    <Layout>
      <SeoHead
        config={SITE_CONFIG}
        title="상간자 위자료 계산기 · 이혼 위자료 청구 예상 금액"
        description="상간자와 배우자의 교제 기간, 의뢰인 부부의 이혼 여부 등 상황을 토대로 대략적인 예상 손해배상금을 확인할 수 있는 상간자 위자료 계산기입니다."
        canonicalPath="/practice/위자료계산기"
      />

      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[13px] text-gray-400 mb-8">
          <Link href="/" className="hover:text-gray-600 no-underline">⌂</Link>
          <span>›</span>
          <Link href="/practice" className="hover:text-gray-600 no-underline text-gray-600">업무분야</Link>
          <span>›</span>
          <span className="text-gray-800 font-medium">위자료계산기</span>
        </div>

        {/* Hero */}
        <div className="mb-10">
          <h1 className="text-[32px] sm:text-[48px] font-black text-gray-900 tracking-[-1px] leading-tight">
            상간자 위자료 계산기
          </h1>
          <p className="text-[#285FA7] mt-2 text-[18px] uppercase tracking-wide">solatium calculator</p>
          <div className="mt-4 h-[60px] w-[3px] bg-gray-200 hidden lg:block" />
          <p className="mt-4 sm:mt-6 text-[16px] leading-[1.8] text-gray-700 max-w-2xl">
            상간자와 배우자의 교제 기간, 의뢰인 부부의 혼인 기간 등 상황을 토대로{' '}
            <b>대략적인 예상 손해배상금을 확인할 수 있는 상간자 위자료 계산기</b>입니다.
          </p>
        </div>

        {/* ── Calculator Widget ───────────────────────────── */}
        <div className="border border-gray-200 rounded-xl overflow-hidden mb-16" style={{ minHeight: 500 }}>
          <div className="flex flex-col md:flex-row h-full">

            {/* Sidebar tabs — desktop */}
            <div className="hidden md:flex flex-col w-[200px] flex-shrink-0 border-r border-gray-200">
              {TABS.map((t, i) => (
                <button
                  key={i}
                  onClick={() => setTab(i)}
                  className={`relative flex flex-col items-center justify-center gap-2 py-6 border-b border-gray-100 last:border-b-0 text-[13px] font-bold leading-snug transition-colors ${
                    tab === i ? 'bg-white text-gray-900' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
                  }`}
                >
                  {tab === i && (
                    <span className="absolute left-0 top-0 h-full w-[4px] rounded-r" style={{ background: NAVY }} />
                  )}
                  <span className="text-[20px]">{['①', '②', '③'][i]}</span>
                  <span className="text-center whitespace-pre-line">{t}</span>
                </button>
              ))}
            </div>

            {/* Top tabs — mobile */}
            <div className="flex md:hidden border-b border-gray-200">
              {TABS.map((t, i) => (
                <button
                  key={i}
                  onClick={() => setTab(i)}
                  className={`relative flex-1 py-3 text-[11px] font-bold leading-tight transition-colors ${
                    tab === i ? 'bg-white text-gray-900' : 'bg-gray-50 text-gray-400'
                  }`}
                >
                  {tab === i && (
                    <span className="absolute bottom-0 left-0 w-full h-[3px]" style={{ background: NAVY }} />
                  )}
                  {['①', '②', '③'][i]}<br />{t.replace('\n', ' ')}
                </button>
              ))}
            </div>

            {/* Content area */}
            <div className="flex-1 flex flex-col p-6 sm:p-10 overflow-y-auto" style={{ minHeight: 400 }}>

              {/* ── Tab 1: 기본정보 ── */}
              {tab === 0 && (
                <div className="flex flex-col gap-8 flex-1">
                  <Question label="1. <b>부부의 혼인관계 유지 기간</b>을 알려주세요.">
                    <div className="mt-3 grid grid-cols-2 gap-3">
                      {MARRY_OPTIONS.map(o => (
                        <label key={o} className="flex items-center gap-2 text-[15px] cursor-pointer">
                          <input
                            type="radio"
                            name="marry"
                            value={o}
                            checked={marry === o}
                            onChange={() => setMarry(o)}
                            className="accent-[#1a2f5c] w-4 h-4"
                          />
                          {o}
                        </label>
                      ))}
                    </div>
                  </Question>

                  <Question label="2. <b>상간자와 배우자의 외도 기간</b>은 어느정도인가요?">
                    <div className="mt-3 flex gap-6">
                      {AFFAIR_OPTIONS.map(o => (
                        <label key={o} className="flex items-center gap-2 text-[15px] cursor-pointer">
                          <input
                            type="radio"
                            name="affair"
                            value={o}
                            checked={affair === o}
                            onChange={() => setAffair(o)}
                            className="accent-[#1a2f5c] w-4 h-4"
                          />
                          {o}
                        </label>
                      ))}
                    </div>
                  </Question>

                  <Question label="3. 배우자와 상간자는 아직 <b>만남을 이어가고 있나요?</b>">
                    <div className="mt-3 flex gap-6">
                      {['네', '아니오'].map(o => (
                        <label key={o} className="flex items-center gap-2 text-[15px] cursor-pointer">
                          <input
                            type="radio"
                            name="ongoing"
                            value={o}
                            checked={ongoing === o}
                            onChange={() => setOngoing(o)}
                            className="accent-[#1a2f5c] w-4 h-4"
                          />
                          {o}
                        </label>
                      ))}
                    </div>
                  </Question>

                  <Question label="4. 상간자가 배우자의 <b>혼인관계를 알고도 부정행위를 하였다는 증거</b>가 있나요?">
                    <div className="mt-3 flex gap-6">
                      {['네', '아니오'].map(o => (
                        <label key={o} className="flex items-center gap-2 text-[15px] cursor-pointer">
                          <input
                            type="radio"
                            name="evidence"
                            value={o}
                            checked={evidence === o}
                            onChange={() => setEvidence(o)}
                            className="accent-[#1a2f5c] w-4 h-4"
                          />
                          {o}
                        </label>
                      ))}
                    </div>
                  </Question>

                  <Question label="5. 의뢰인은 배우자의 외도를 계기로 <b>이혼을 할 의사가 있거나, 이혼 소송 중인가요?</b>">
                    <div className="mt-3 flex gap-6">
                      {['네', '아니오'].map(o => (
                        <label key={o} className="flex items-center gap-2 text-[15px] cursor-pointer">
                          <input
                            type="radio"
                            name="divorce"
                            value={o}
                            checked={divorce === o}
                            onChange={() => setDivorce(o)}
                            className="accent-[#1a2f5c] w-4 h-4"
                          />
                          {o}
                        </label>
                      ))}
                    </div>
                  </Question>

                  <NavButtons onNext={() => setTab(1)} nextDisabled={!marry || !affair || !ongoing || !evidence || !divorce} />
                </div>
              )}

              {/* ── Tab 2: 예상 상간자 위자료 ── */}
              {tab === 1 && (
                <div className="flex flex-col gap-6 flex-1">
                  {allAnswered && result ? (
                    <>
                      <div className="bg-gray-50 rounded-lg p-6 sm:p-8 flex flex-col gap-4">
                        <p className="text-[14px] text-gray-500">
                          입력하신 정보를 토대로 계산된 예상 위자료입니다.
                        </p>

                        <div className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col items-center gap-4 text-center">
                          <p className="text-[14px] font-semibold text-gray-600">예상 위자료 청구금액</p>
                          <div className="w-full">
                            <p className="text-[13px] text-gray-400 mb-1">최소 ~ 최대</p>
                            <p className="text-[20px] sm:text-[24px] font-black text-gray-900">
                              {fmt(result.low)}원 ~ {fmt(result.high)}원
                            </p>
                          </div>
                          <div className="w-full h-px bg-gray-100" />
                          <div className="w-full">
                            <p className="text-[13px] text-gray-400 mb-1">평균 예상 금액</p>
                            <p className="text-[22px] sm:text-[28px] font-black" style={{ color: NAVY }}>
                              ★ {fmt(result.avg)}원
                            </p>
                          </div>
                        </div>

                        <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 text-[13px] text-amber-700">
                          ⚠ 위 금액은 참고용 예상 금액이며, 실제 법원 판결은 개별 사정에 따라 크게 다를 수 있습니다.
                        </div>

                        <div className="bg-white border border-gray-200 rounded-lg px-5 py-4 text-[13px] text-gray-700 flex flex-col gap-1">
                          <p className="font-semibold mb-1">입력 정보 요약</p>
                          <p>• 혼인 기간: {marry}</p>
                          <p>• 외도 기간: {affair}</p>
                          <p>• 만남 지속 여부: {ongoing}</p>
                          <p>• 혼인 인지 증거: {evidence}</p>
                          <p>• 이혼 의사/소송: {divorce}</p>
                        </div>

                        <div className="mt-2 border-t border-gray-200 pt-4 text-center">
                          <p className="text-[14px] font-semibold" style={{ color: NAVY }}>보다 명확한 사건 검토를 원하시나요?</p>
                          <p className="text-[13px] text-gray-500 mt-1">이혼전문변호사와 상담을 통해 내 상황에 적합한<br />실질적인 법률조력을 받아보실 수 있습니다.</p>
                        </div>

                        <div className="flex gap-3 mt-1">
                          <Link href="/cases" className="flex-1 text-center py-3 text-white text-[13px] font-bold rounded no-underline" style={{ background: '#6b3a4b' }}>
                            업무사례 보기
                          </Link>
                          <button
                            onClick={() => setTab(2)}
                            className="flex-1 py-3 text-white text-[13px] font-bold rounded transition-opacity hover:opacity-90"
                            style={{ background: NAVY }}
                          >
                            무료 법률 상담 신청하기
                          </button>
                        </div>

                        <p className="text-[10px] text-gray-400 text-center">
                          실제 법원 판결은 개별 사정에 따라 달라질 수 있습니다 · 법률 전문가와 상담을 권장합니다.
                        </p>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center flex-1 gap-4 py-12 text-center">
                      <p className="text-[15px] text-gray-500">
                        기본정보를 먼저 입력해주세요.<br />
                        이전 탭으로 돌아가서 모든 항목을 선택해주시면 예상 위자료를 확인하실 수 있습니다.
                      </p>
                      <button
                        onClick={() => setTab(0)}
                        className="mt-2 px-6 py-2.5 rounded-lg text-[14px] font-semibold text-white transition-opacity hover:opacity-90"
                        style={{ background: NAVY }}
                      >
                        기본정보 입력하기
                      </button>
                    </div>
                  )}

                  <NavButtons onPrev={() => setTab(0)} onNext={() => setTab(2)} />
                </div>
              )}

              {/* ── Tab 3: 법률상담접수 ── */}
              {tab === 2 && (
                <div className="flex flex-col gap-4 flex-1">
                  {submitted ? (
                    <div className="flex flex-col items-center justify-center flex-1 gap-4 py-12 text-center">
                      <div className="text-[48px]">✅</div>
                      <p className="text-[18px] font-bold text-gray-900">상담 신청이 완료되었습니다.</p>
                      <p className="text-[14px] text-gray-500">담당 변호사가 빠르게 연락드리겠습니다.</p>
                      <button
                        onClick={() => { setSubmitted(false); setTab(0); }}
                        className="mt-4 px-6 py-2.5 rounded-lg text-[14px] font-semibold text-white"
                        style={{ background: NAVY }}
                      >
                        처음으로
                      </button>
                    </div>
                  ) : (
                    <>
                      <p className="text-[14px] text-gray-500 mb-2">개인정보 및 상담 내용에 대한 비밀을 보장합니다.</p>
                      <Field label="이름" required>
                        <input
                          value={name}
                          onChange={e => setName(e.target.value)}
                          placeholder="이름을 입력해주세요"
                          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-[14px] focus:outline-none focus:border-blue-400"
                        />
                      </Field>
                      <Field label="연락처" required>
                        <input
                          value={phone}
                          onChange={e => setPhone(e.target.value)}
                          placeholder="- 없이 입력해주세요"
                          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-[14px] focus:outline-none focus:border-blue-400"
                        />
                      </Field>
                      <Field label="문의내용">
                        <textarea
                          value={message}
                          onChange={e => setMessage(e.target.value)}
                          placeholder="상담하실 내용을 입력해주세요 (100자 이내)"
                          rows={3}
                          maxLength={100}
                          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-[14px] resize-none focus:outline-none focus:border-blue-400"
                        />
                      </Field>
                      <label className="flex items-start gap-2 text-[13px] text-gray-600 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={agreed}
                          onChange={e => setAgreed(e.target.checked)}
                          className="mt-0.5 accent-[#1a2f5c]"
                        />
                        개인정보 수집에 동의합니다.
                      </label>
                      <div className="flex gap-3 mt-2">
                        <button
                          onClick={() => setTab(1)}
                          className="flex-1 py-3 rounded-lg border border-gray-300 text-[14px] font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
                        >
                          이전
                        </button>
                        <button
                          disabled={!name || !phone || !agreed}
                          onClick={() => setSubmitted(true)}
                          className="flex-1 py-3 rounded-lg text-white text-[14px] font-bold transition-opacity disabled:opacity-40 hover:opacity-90"
                          style={{ background: NAVY }}
                        >
                          상담 신청서 제출
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}

            </div>
          </div>
        </div>

        {/* ── 상간자 위자료 안내 섹션 ─────────────────────────── */}
        <div className="mb-16">
          <h2 className="text-[26px] font-black text-gray-900 tracking-[-0.5px] mb-3">상간자 위자료란?</h2>
          <p className="text-[14px] text-gray-600 mb-6 leading-relaxed">
            상간자 위자료는 배우자 있는 자와 부적절한 관계를 맺은 제3자(상간자)에게 청구하는 손해배상금입니다.
            법원은 혼인 기간, 외도 기간, 자녀 유무, 이혼 여부 등 다양한 요소를 종합적으로 고려하여 금액을 결정합니다.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: '혼인 기간', desc: '혼인 기간이 길수록 정신적 고통이 더 크다고 판단하여 위자료가 높아집니다.' },
              { title: '외도 기간', desc: '외도 기간이 1년 이상인 경우 관계의 심각성이 인정되어 위자료가 가산됩니다.' },
              { title: '자녀 유무', desc: '미성년 자녀가 있는 경우 가정 파탄에 대한 책임이 가중될 수 있습니다.' },
              { title: '실제 이혼 여부', desc: '외도로 인해 실제 이혼에 이른 경우 위자료가 더 높게 산정될 수 있습니다.' },
            ].map(item => (
              <div key={item.title} className="bg-gray-50 border border-gray-200 rounded-lg p-5">
                <p className="font-bold text-[14px] text-gray-900 mb-1" style={{ color: NAVY }}>{item.title}</p>
                <p className="text-[13px] text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-[12px] text-gray-400 mt-4">
            ※ 위 계산기는 참고용이며 실제 법원 판결 금액과 다를 수 있습니다. 정확한 금액 산정을 위해 전문 변호사와 상담하시기 바랍니다.
          </p>
        </div>

      </div>
    </Layout>
  );
}

/* ── Helper components ──────────────────────────── */

function Question({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[15px] text-gray-800 mb-1" dangerouslySetInnerHTML={{ __html: label }} />
      {children}
    </div>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  );
}

function NavButtons({ onPrev, onNext, nextDisabled }: { onPrev?: () => void; onNext?: () => void; nextDisabled?: boolean }) {
  return (
    <div className="flex gap-3 mt-auto pt-6">
      <button
        onClick={onPrev}
        disabled={!onPrev}
        className="flex-1 h-[50px] border border-gray-300 rounded-lg text-[14px] font-semibold text-gray-600 hover:bg-gray-50 disabled:opacity-30 transition-colors"
      >
        이전
      </button>
      <button
        onClick={onNext}
        disabled={!onNext || nextDisabled}
        className="flex-1 h-[50px] rounded-lg text-white text-[14px] font-bold disabled:opacity-40 transition-opacity hover:opacity-90"
        style={{ background: NAVY }}
      >
        다음
      </button>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => ({ props: {}, revalidate: 3600 });
