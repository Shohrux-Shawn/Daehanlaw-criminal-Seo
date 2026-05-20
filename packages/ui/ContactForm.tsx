import { useState, FormEvent } from 'react';
import { useMutation } from '@apollo/client';
import type { SiteConfig } from '@daehanlaw/config';
import { CREATE_LEAD } from '@daehanlaw/graphql';

interface FormState {
  memberName: string;
  memberPhone: string;
  memberEmail: string;
  memberMessage: string;
  agreed: boolean;
}

const initialForm: FormState = {
  memberName: '',
  memberPhone: '',
  memberEmail: '',
  memberMessage: '',
  agreed: false,
};

interface ContactFormProps {
  config: SiteConfig;
}

export function ContactForm({ config }: ContactFormProps) {
  const [form, setForm] = useState<FormState>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof FormState, string>>>({});

  const [createLead, { loading, error }] = useMutation(CREATE_LEAD);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (fieldErrors[name as keyof FormState]) {
      setFieldErrors(prev => ({ ...prev, [name]: undefined }));
    }
  }

  function validate(): boolean {
    const errors: Partial<Record<keyof FormState, string>> = {};
    if (!form.memberName.trim()) errors.memberName = '성함을 입력해주세요.';
    if (!form.memberPhone.trim()) {
      errors.memberPhone = '연락처를 입력해주세요.';
    } else if (!/^[0-9\-+\s]{8,15}$/.test(form.memberPhone.trim())) {
      errors.memberPhone = '올바른 연락처를 입력해주세요.';
    }
    if (form.memberEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.memberEmail)) {
      errors.memberEmail = '올바른 이메일 주소를 입력해주세요.';
    }
    if (!form.agreed) errors.agreed = '개인정보 수집에 동의해주세요.';
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    try {
      await createLead({
        variables: {
          input: {
            leadName:        form.memberName.trim(),
            leadPhone:       form.memberPhone.trim(),
            leadEmail:       form.memberEmail.trim() || undefined,
            leadMessage:     form.memberMessage.trim() || undefined,
            leadSource:      config.leadSource,
            leadKeyword:     config.leadKeyword,
            leadServiceType: config.practiceArea,
          },
        },
      });
      setSubmitted(true);
      setForm(initialForm);
    } catch {
      /* error state rendered below */
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-16 px-6">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
          <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-navy-900 mb-3">상담 신청이 완료되었습니다!</h3>
        <p className="text-gray-600 mb-2">담당 변호사가 빠른 시일 내에 연락드리겠습니다.</p>
        <p className="text-gray-500 text-sm">평일 09:00 – 18:00 기준으로 연락드립니다.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div>
        <label htmlFor="memberName" className="form-label">
          성함 <span className="text-red-500">*</span>
        </label>
        <input
          id="memberName" name="memberName" type="text"
          value={form.memberName} onChange={handleChange} placeholder="홍길동"
          className={`form-input ${fieldErrors.memberName ? 'border-red-400 focus:ring-red-300' : ''}`}
          autoComplete="off"
        />
        {fieldErrors.memberName && <p className="mt-1 text-xs text-red-500">{fieldErrors.memberName}</p>}
      </div>

      <div>
        <label htmlFor="memberPhone" className="form-label">
          연락처 <span className="text-red-500">*</span>
        </label>
        <input
          id="memberPhone" name="memberPhone" type="tel"
          value={form.memberPhone} onChange={handleChange} placeholder="010-1234-5678"
          className={`form-input ${fieldErrors.memberPhone ? 'border-red-400 focus:ring-red-300' : ''}`}
          autoComplete="tel"
        />
        {fieldErrors.memberPhone && <p className="mt-1 text-xs text-red-500">{fieldErrors.memberPhone}</p>}
      </div>

      <div>
        <label htmlFor="memberEmail" className="form-label">
          이메일 <span className="text-gray-400 text-xs font-normal">(선택)</span>
        </label>
        <input
          id="memberEmail" name="memberEmail" type="email"
          value={form.memberEmail} onChange={handleChange} placeholder="example@email.com"
          className={`form-input ${fieldErrors.memberEmail ? 'border-red-400 focus:ring-red-300' : ''}`}
          autoComplete="email"
        />
        {fieldErrors.memberEmail && <p className="mt-1 text-xs text-red-500">{fieldErrors.memberEmail}</p>}
      </div>

      <div>
        <label htmlFor="memberMessage" className="form-label">
          상담 내용 <span className="text-gray-400 text-xs font-normal">(선택)</span>
        </label>
        <textarea
          id="memberMessage" name="memberMessage" rows={4}
          value={form.memberMessage} onChange={handleChange}
          placeholder={`${config.practiceArea} 관련 상담 내용을 간략히 적어주세요.`}
          className="form-input resize-none"
        />
      </div>

      <div className="flex items-start gap-3">
        <input
          id="agreed" name="agreed" type="checkbox"
          checked={form.agreed} onChange={handleChange}
          className="mt-1 w-5 h-5 rounded border-gray-300 cursor-pointer accent-navy-700"
        />
        <label htmlFor="agreed" className="text-sm text-gray-600 cursor-pointer leading-relaxed">
          <span className="font-semibold text-gray-700">[필수]</span> 개인정보 수집 및 이용에 동의합니다.
          상담 목적으로만 사용되며, 상담 완료 후 즉시 파기됩니다.
        </label>
      </div>
      {fieldErrors.agreed && <p className="text-xs text-red-500">{fieldErrors.agreed}</p>}

      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          일시적 오류가 발생했습니다. 잠시 후 다시 시도하거나 전화 상담을 이용해주세요.
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 text-white font-bold text-lg rounded-xl bg-navy-800 hover:bg-navy-700 disabled:opacity-60 transition-colors shadow-sm"
      >
        {loading ? '전송 중...' : '상담 신청하기'}
      </button>

      <p className="text-center text-xs text-gray-400">
        또는 전화 상담:{' '}
        <a href={`tel:${config.phoneNumber}`} className="font-semibold text-navy-700 hover:text-navy-900">
          {config.phoneNumber}
        </a>
        &nbsp;(평일 09:00 – 18:00)
      </p>
    </form>
  );
}
