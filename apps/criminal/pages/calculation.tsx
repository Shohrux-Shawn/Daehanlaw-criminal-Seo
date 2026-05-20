import React, { useState } from 'react';
import type { GetStaticProps } from 'next';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { SITE_CONFIG } from '@/site.config';
import { SeoHead } from '@daehanlaw/ui';

/* ── 양육비 산정기준표 (2021 서울가정법원) ─────────────────── */
type AgeGroup = '0-2' | '3-5' | '6-8' | '9-11' | '12-14' | '15-18';
type Row = Record<AgeGroup, { avg: number; min: number; max: number | null }>;

const TABLE: { label: string; data: Row }[] = [
  { label: '0\n~\n199만원', data: {
    '0-2':   {avg:621000,  min:264000,  max:686000},
    '3-5':   {avg:631000,  min:268000,  max:695000},
    '6-8':   {avg:648000,  min:272000,  max:707000},
    '9-11':  {avg:667000,  min:281000,  max:724000},
    '12-14': {avg:679000,  min:295000,  max:734000},
    '15-18': {avg:703000,  min:319000,  max:830000},
  }},
  { label: '200\n~\n299만원', data: {
    '0-2':   {avg:752000,  min:687000,  max:848000},
    '3-5':   {avg:759000,  min:696000,  max:854000},
    '6-8':   {avg:767000,  min:708000,  max:863000},
    '9-11':  {avg:782000,  min:725000,  max:885000},
    '12-14': {avg:790000,  min:735000,  max:894000},
    '15-18': {avg:957000,  min:831000,  max:1092000},
  }},
  { label: '300\n~\n399만원', data: {
    '0-2':   {avg:945000,  min:849000,  max:1021000},
    '3-5':   {avg:949000,  min:855000,  max:1031000},
    '6-8':   {avg:959000,  min:864000,  max:1049000},
    '9-11':  {avg:988000,  min:886000,  max:1075000},
    '12-14': {avg:998000,  min:895000,  max:1139000},
    '15-18': {avg:1227000, min:1093000, max:1314000},
  }},
  { label: '400\n~\n499만원', data: {
    '0-2':   {avg:1098000, min:1022000, max:1171000},
    '3-5':   {avg:1113000, min:1032000, max:1189000},
    '6-8':   {avg:1140000, min:1050000, max:1216000},
    '9-11':  {avg:1163000, min:1076000, max:1240000},
    '12-14': {avg:1280000, min:1140000, max:1351000},
    '15-18': {avg:1402000, min:1315000, max:1503000},
  }},
  { label: '500\n~\n599만원', data: {
    '0-2':   {avg:1245000, min:1172000, max:1323000},
    '3-5':   {avg:1266000, min:1190000, max:1344000},
    '6-8':   {avg:1292000, min:1217000, max:1385000},
    '9-11':  {avg:1318000, min:1241000, max:1406000},
    '12-14': {avg:1423000, min:1352000, max:1510000},
    '15-18': {avg:1604000, min:1504000, max:1699000},
  }},
  { label: '600\n~\n699만원', data: {
    '0-2':   {avg:1401000, min:1324000, max:1491000},
    '3-5':   {avg:1422000, min:1345000, max:1510000},
    '6-8':   {avg:1479000, min:1386000, max:1546000},
    '9-11':  {avg:1494000, min:1407000, max:1562000},
    '12-14': {avg:1598000, min:1511000, max:1654000},
    '15-18': {avg:1794000, min:1700000, max:1879000},
  }},
  { label: '700\n~\n799만원', data: {
    '0-2':   {avg:1582000, min:1492000, max:1685000},
    '3-5':   {avg:1598000, min:1511000, max:1702000},
    '6-8':   {avg:1614000, min:1547000, max:1732000},
    '9-11':  {avg:1630000, min:1563000, max:1758000},
    '12-14': {avg:1711000, min:1655000, max:1847000},
    '15-18': {avg:1964000, min:1880000, max:2063000},
  }},
  { label: '800\n~\n899만원', data: {
    '0-2':   {avg:1789000, min:1686000, max:1893000},
    '3-5':   {avg:1807000, min:1703000, max:1912000},
    '6-8':   {avg:1850000, min:1733000, max:1957000},
    '9-11':  {avg:1887000, min:1759000, max:2012000},
    '12-14': {avg:1984000, min:1848000, max:2071000},
    '15-18': {avg:2163000, min:2064000, max:2204000},
  }},
  { label: '900만원\n이상', data: {
    '0-2':   {avg:1997000, min:1894000, max:null},
    '3-5':   {avg:2017000, min:1913000, max:null},
    '6-8':   {avg:2065000, min:1958000, max:null},
    '9-11':  {avg:2137000, min:1958000, max:null},
    '12-14': {avg:2159000, min:2144000, max:null},
    '15-18': {avg:2246000, min:2205000, max:null},
  }},
];

const AGE_GROUPS: AgeGroup[] = ['0-2', '3-5', '6-8', '9-11', '12-14', '15-18'];
const NAVY = '#1a2f5c';

function fmt(n: number) {
  return n.toLocaleString('ko-KR');
}

function getRow(combined: number): Row {
  if (combined < 200)  return TABLE[0].data;
  if (combined < 300)  return TABLE[1].data;
  if (combined < 400)  return TABLE[2].data;
  if (combined < 500)  return TABLE[3].data;
  if (combined < 600)  return TABLE[4].data;
  if (combined < 700)  return TABLE[5].data;
  if (combined < 800)  return TABLE[6].data;
  if (combined < 900)  return TABLE[7].data;
  return TABLE[8].data;
}

function calcSupport(
  myIncome: number,
  spouseIncome: number,
  children: AgeGroup[],
  isUrban: boolean,
  custodian: 'me' | 'spouse',
) {
  const combined = myIncome + spouseIncome;
  if (combined === 0) return null;
  const row = getRow(combined);
  const urban = isUrban ? 1.1 : 1.0;

  let totalAvg = 0, totalMin = 0, totalMax = 0;
  children.forEach((age, i) => {
    const factor = i === 0 ? 1 : i === 1 ? 0.8 : 0.7;
    totalAvg += row[age].avg * factor;
    totalMin += row[age].min * factor;
    totalMax += (row[age].max ?? row[age].min * 1.1) * factor;
  });
  totalAvg *= urban; totalMin *= urban; totalMax *= urban;

  const custodianIncome  = custodian === 'me' ? myIncome  : spouseIncome;
  const nonCustodianIncome = custodian === 'me' ? spouseIncome : myIncome;
  const custodianShare    = Math.round((custodianIncome  / combined) * totalAvg);
  const nonCustodialShare = Math.round((nonCustodianIncome / combined) * totalAvg);

  return {
    totalAvg: Math.round(totalAvg),
    totalMin: Math.round(totalMin),
    totalMax: Math.round(totalMax),
    custodianShare,
    nonCustodialShare,
  };
}

const TABS = ['기본정보', '자녀정보', '월 예상 양육비', '법률상담접수'];

export default function CalculationPage() {
  const [tab, setTab]               = useState(0);
  const [gender, setGender]         = useState<'남자' | '여자' | ''>('');
  const [custodian, setCustodian]   = useState<'본인' | '배우자' | ''>('');
  const [region, setRegion]         = useState<'도시' | '농어촌' | ''>('');
  const [childCount, setChildCount] = useState(1);
  const [ages, setAges]             = useState<AgeGroup[]>(['0-2']);
  const [myIncome, setMyIncome]     = useState('');
  const [spouseIncome, setSpouseIncome] = useState('');
  const [name, setName]             = useState('');
  const [phone, setPhone]           = useState('');
  const [message, setMessage]       = useState('');
  const [agreed, setAgreed]         = useState(false);
  const [submitted, setSubmitted]   = useState(false);

  const result = tab >= 2 && myIncome && spouseIncome
    ? calcSupport(
        Number(myIncome),
        Number(spouseIncome),
        ages.slice(0, childCount),
        region === '도시',
        custodian === '본인' ? 'me' : 'spouse',
      )
    : null;

  function setChildAge(idx: number, age: AgeGroup) {
    setAges(prev => { const n = [...prev]; n[idx] = age; return n; });
  }

  function handleCountChange(n: number) {
    setChildCount(n);
    setAges(prev => {
      const next = [...prev];
      while (next.length < n) next.push('0-2');
      return next.slice(0, n);
    });
  }

  return (
    <Layout>
      <SeoHead
        config={SITE_CONFIG}
        title="이혼양육비 계산기 · 이혼 시 양육비 계산기"
        description="양육비계산기는 이혼 시 양육비 산정을 위한 자녀 수, 나이 등을 고려해 예상 이혼양육비를 계산합니다."
        canonicalPath="/calculation"
      />

      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[13px] text-gray-400 mb-8">
          <Link href="/" className="hover:text-gray-600 no-underline">⌂</Link>
          <span>›</span>
          <span className="text-gray-600">업무분야</span>
          <span>›</span>
          <span className="text-gray-800 font-medium">이혼 양육비계산기</span>
        </div>

        {/* Hero */}
        <div className="mb-10">
          <h1 className="text-[32px] sm:text-[48px] font-black text-gray-900 tracking-[-1px] leading-tight">
            이혼 시 양육비 계산기
          </h1>
          <p className="text-[#285FA7] mt-2 text-[18px] uppercase tracking-wide">child support calculator</p>
          <div className="mt-4 h-[60px] w-[3px] bg-gray-200 hidden lg:block" />
          <p className="mt-4 sm:mt-6 text-[16px] leading-[1.8] text-gray-700 max-w-2xl">
            양육비계산기는 이혼 시 자녀 양육비 산정을 위한 <b>자녀 수, 나이 등을 고려해 예상 이혼양육비를 계산</b>합니다.
            서울가정법원의 양육비 산정기준표에 따라 이혼 시 자녀 양육비를 정밀하게 계산하여 예상 양육비를 정합니다.
          </p>
        </div>

        {/* ── Calculator Widget ───────────────────────────── */}
        <div className="border border-gray-200 rounded-xl overflow-hidden mb-16" style={{ minHeight: 500 }}>
          <div className="flex flex-col md:flex-row h-full">

            {/* Sidebar tabs — desktop */}
            <div className="hidden md:flex flex-col w-[200px] flex-shrink-0 border-r border-gray-200">
              {TABS.map((t, i) => (
                <button
                  key={t}
                  onClick={() => setTab(i)}
                  className={`relative flex flex-col items-center justify-center gap-2 py-6 border-b border-gray-100 last:border-b-0 text-[13px] font-bold leading-snug transition-colors ${
                    tab === i ? 'bg-white text-gray-900' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
                  }`}
                >
                  {tab === i && (
                    <span className="absolute left-0 top-0 h-full w-[4px] rounded-r" style={{ background: NAVY }} />
                  )}
                  <span className="text-[20px]">{['①','②','③','④'][i]}</span>
                  <span className="text-center whitespace-pre-line">{t}</span>
                </button>
              ))}
            </div>

            {/* Top tabs — mobile */}
            <div className="flex md:hidden border-b border-gray-200">
              {TABS.map((t, i) => (
                <button
                  key={t}
                  onClick={() => setTab(i)}
                  className={`relative flex-1 py-3 text-[11px] font-bold leading-tight transition-colors ${
                    tab === i ? 'bg-white text-gray-900' : 'bg-gray-50 text-gray-400'
                  }`}
                >
                  {tab === i && (
                    <span className="absolute bottom-0 left-0 w-full h-[3px]" style={{ background: NAVY }} />
                  )}
                  {['①','②','③','④'][i]}<br />{t}
                </button>
              ))}
            </div>

            {/* Content area */}
            <div className="flex-1 flex flex-col p-6 sm:p-10 overflow-y-auto" style={{ minHeight: 400 }}>

              {/* ── Tab 1: 기본정보 ── */}
              {tab === 0 && (
                <div className="flex flex-col gap-8 flex-1">
                  <Question label="1. 본인의 <b>성별</b>을 알려주세요">
                    <Radios options={['남자','여자']} value={gender} onChange={v => setGender(v as any)} />
                  </Question>
                  <Question label="2. 이혼 후 누가 <b>자녀와 함께</b> 지내고 있나요?">
                    <Radios options={['본인','배우자']} value={custodian} onChange={v => setCustodian(v as any)} />
                  </Question>
                  <Question label="3. 자녀가 <b>거주할(거주 중인) 지역</b>은 어디인가요?">
                    <Radios options={['도시','농어촌']} value={region} onChange={v => setRegion(v as any)} />
                    <div className="flex items-center gap-2 bg-red-50 px-4 py-2 text-[13px] text-red-600 font-semibold rounded mt-3">
                      <span>📍</span> 거주지역에 따른 가산요소가 반영됩니다.
                    </div>
                  </Question>
                  <NavButtons onNext={() => setTab(1)} nextDisabled={!gender || !custodian || !region} />
                </div>
              )}

              {/* ── Tab 2: 자녀정보 ── */}
              {tab === 1 && (
                <div className="flex flex-col gap-8 flex-1">
                  <Question label="4. 자녀가 <b>몇 명</b>인가요?">
                    <div className="flex gap-3 flex-wrap">
                      {[1,2,3].map(n => (
                        <button
                          key={n}
                          onClick={() => handleCountChange(n)}
                          className={`px-5 py-2 rounded-full border text-[14px] font-semibold transition-colors ${
                            childCount === n
                              ? 'text-white border-transparent'
                              : 'text-gray-600 border-gray-300 hover:border-gray-400'
                          }`}
                          style={childCount === n ? { background: NAVY, borderColor: NAVY } : {}}
                        >
                          {n === 3 ? '3명 이상' : `${n}명`}
                        </button>
                      ))}
                    </div>
                  </Question>
                  {Array.from({ length: childCount }).map((_, i) => (
                    <Question key={i} label={`5-${i+1}. 자녀 <b>${i+1}</b>의 나이(만 나이)를 선택해주세요`}>
                      <div className="flex flex-wrap gap-2">
                        {AGE_GROUPS.map(ag => (
                          <button
                            key={ag}
                            onClick={() => setChildAge(i, ag)}
                            className={`px-3 py-1.5 rounded border text-[13px] font-semibold transition-colors ${
                              ages[i] === ag
                                ? 'text-white border-transparent'
                                : 'text-gray-600 border-gray-300 hover:border-gray-400'
                            }`}
                            style={ages[i] === ag ? { background: NAVY, borderColor: NAVY } : {}}
                          >
                            {ag}세
                          </button>
                        ))}
                      </div>
                    </Question>
                  ))}
                  <NavButtons onPrev={() => setTab(0)} onNext={() => setTab(2)} />
                </div>
              )}

              {/* ── Tab 3: 월 예상 양육비 ── */}
              {tab === 2 && (
                <div className="flex flex-col gap-6 flex-1">
                  <Question label="5. <b>본인의 월 소득(세전)</b>을 알려주세요">
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={myIncome}
                        onChange={e => setMyIncome(e.target.value)}
                        placeholder="소득을 입력해주세요"
                        className="border border-gray-300 rounded-lg px-4 py-2.5 text-[14px] w-48 focus:outline-none focus:border-navy-600"
                      />
                      <span className="text-[14px] text-gray-600">만원</span>
                    </div>
                  </Question>
                  <Question label="6. <b>배우자의 월 소득(세전)</b>을 알려주세요">
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={spouseIncome}
                        onChange={e => setSpouseIncome(e.target.value)}
                        placeholder="소득을 입력해주세요"
                        className="border border-gray-300 rounded-lg px-4 py-2.5 text-[14px] w-48 focus:outline-none focus:border-navy-600"
                      />
                      <span className="text-[14px] text-gray-600">만원</span>
                    </div>
                  </Question>

                  <p className="text-[12px] text-red-600 leading-relaxed">
                    ※ 서울가정법원의 양육비 산정기준표 평균값을 토대로 계산되었으며, 표준양육비는 가산·감산 요소등을 고려하여 조정될 수 있습니다.
                  </p>

                  {result ? (
                    <div className="bg-gray-100 rounded-lg p-8 flex flex-col items-center gap-4 text-center">
                      <p className="text-[16px] text-gray-700">월 예상 양육비는</p>
                      <p className="text-[22px] sm:text-[26px] font-black text-gray-900">
                        [ 양육자 {fmt(result.custodianShare)}원 ]
                      </p>
                      <p className="text-[22px] sm:text-[26px] font-black text-gray-900">
                        [ 비양육자 {fmt(result.nonCustodialShare)}원 ]
                      </p>
                      <p className="text-[16px] text-gray-700">입니다.</p>
                      <div className="mt-2 border-t border-gray-300 pt-4 w-full text-center">
                        <p className="text-[14px] font-semibold" style={{ color: NAVY }}>보다 명확한 사건 검토를 원하시나요?</p>
                        <p className="text-[13px] text-gray-500 mt-1">이혼전문변호사와 상담을 통해 내 상황에 적합한<br />실질적인 법률조력을 받아보실 수 있습니다.</p>
                      </div>
                      <div className="flex gap-3 w-full mt-2">
                        <Link href="/cases" className="flex-1 text-center py-3 text-white text-[13px] font-bold rounded no-underline" style={{ background: '#6b3a4b' }}>
                          업무사례 보기
                        </Link>
                        <Link href="/contact" className="flex-1 text-center py-3 text-white text-[13px] font-bold rounded no-underline" style={{ background: NAVY }}>
                          법률상담 접수하기
                        </Link>
                      </div>
                      <p className="text-[10px] text-gray-400 mt-1">2021년 서울가정법원 양육비 산정기준표 기반 · 실제 법원 결정은 사안에 따라 다를 수 있습니다.</p>
                    </div>
                  ) : (
                    <div className="bg-gray-100 rounded-lg p-8 flex items-center justify-center text-[14px] text-gray-400 min-h-[200px]">
                      위 소득 정보를 입력하면 예상 양육비가 계산됩니다.
                    </div>
                  )}

                  <NavButtons onPrev={() => setTab(1)} onNext={() => setTab(3)} />
                </div>
              )}

              {/* ── Tab 4: 법률상담접수 ── */}
              {tab === 3 && (
                <div className="flex flex-col gap-4 flex-1">
                  {submitted ? (
                    <div className="flex flex-col items-center justify-center flex-1 gap-4 py-12 text-center">
                      <div className="text-[48px]">✅</div>
                      <p className="text-[18px] font-bold text-gray-900">상담 신청이 완료되었습니다.</p>
                      <p className="text-[14px] text-gray-500">담당 변호사가 빠르게 연락드리겠습니다.</p>
                      <button onClick={() => { setSubmitted(false); setTab(0); }} className="mt-4 px-6 py-2.5 rounded-lg text-[14px] font-semibold text-white" style={{ background: NAVY }}>
                        처음으로
                      </button>
                    </div>
                  ) : (
                    <>
                      <p className="text-[14px] text-gray-500 mb-2">개인정보 및 상담 내용에 대한 비밀을 보장합니다.</p>
                      <Field label="이름" required>
                        <input value={name} onChange={e => setName(e.target.value)} placeholder="이름을 입력해주세요" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-[14px] focus:outline-none focus:border-blue-400" />
                      </Field>
                      <Field label="연락처" required>
                        <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="- 없이 입력해주세요" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-[14px] focus:outline-none focus:border-blue-400" />
                      </Field>
                      <Field label="문의내용">
                        <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="상담하실 내용을 입력해주세요 (50자 이내)" rows={3} maxLength={200} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-[14px] resize-none focus:outline-none focus:border-blue-400" />
                      </Field>
                      <label className="flex items-start gap-2 text-[13px] text-gray-600 cursor-pointer">
                        <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} className="mt-0.5 accent-navy-800" />
                        개인정보 수집에 동의합니다.
                      </label>
                      <div className="flex gap-3 mt-2">
                        <button onClick={() => setTab(2)} className="flex-1 py-3 rounded-lg border border-gray-300 text-[14px] font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
                          이전
                        </button>
                        <button
                          disabled={!name || !phone || !agreed}
                          onClick={() => setSubmitted(true)}
                          className="flex-1 py-3 rounded-lg text-white text-[14px] font-bold transition-opacity disabled:opacity-40"
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

        {/* ── Reference Table ─────────────────────────────── */}
        <div className="mb-16">
          <h2 className="text-[26px] font-black text-gray-900 tracking-[-0.5px] mb-3">이혼 시 자녀 양육비 기준금액</h2>
          <p className="text-[14px] text-gray-600 mb-6">
            아래 표를 기준으로 이혼 시 <b>부모합산소득에 따라 평균 자녀 양육비 구간</b>을 확인할 수 있습니다.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse table-auto text-[12px]">
              <thead style={{ background: NAVY }} className="text-white">
                <tr>
                  <th rowSpan={3} className="border border-white/20 py-3 px-3 align-middle w-[120px] whitespace-pre-line">부모{'\n'}합산소득(세전)</th>
                  <th colSpan={6} className="border border-white/20 py-2 px-3">자녀 만나이</th>
                </tr>
                <tr>
                  {AGE_GROUPS.map(ag => (
                    <th key={ag} className="border border-white/20 py-2 px-2">{ag}세</th>
                  ))}
                </tr>
                <tr>
                  <th colSpan={6} className="border border-gray-200 bg-white text-gray-700 py-2 px-3 text-center font-normal">평균 양육비(원) &nbsp; 양육비 구간</th>
                </tr>
              </thead>
              <tbody>
                {TABLE.map((row, ri) => (
                  <tr key={ri} className="text-center text-[11px]">
                    <td className="border border-gray-200 bg-gray-50 py-3 px-2 font-bold whitespace-pre-line align-middle">{row.label}</td>
                    {AGE_GROUPS.map(ag => {
                      const d = row.data[ag];
                      return (
                        <td key={ag} className="border border-gray-200 py-3 px-2 align-middle leading-snug">
                          <p className="font-bold text-gray-900">{fmt(d.avg)}</p>
                          <div className="h-px bg-gray-200 my-1.5 w-[70%] mx-auto" />
                          <p style={{ color: NAVY }} className="text-[10px]">
                            {fmt(d.min)}{d.max ? `~\n${fmt(d.max)}` : '\n이상'}
                          </p>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
              <caption className="mt-2 text-right text-[11px] text-gray-400">출처 : 2021년 서울가정법원 양육비산정기준표</caption>
            </table>
          </div>
        </div>

      </div>
    </Layout>
  );
}

/* ── Helper components ──────────────────────────── */

function Question({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[15px] text-gray-800 mb-3" dangerouslySetInnerHTML={{ __html: label }} />
      {children}
    </div>
  );
}

function Radios({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex gap-6">
      {options.map(o => (
        <label key={o} className="flex items-center gap-2 text-[15px] cursor-pointer">
          <input
            type="radio"
            name={options.join('-')}
            value={o}
            checked={value === o}
            onChange={() => onChange(o)}
            className="accent-[#1a2f5c] w-4 h-4"
          />
          {o}
        </label>
      ))}
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
