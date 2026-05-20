interface LoadingSpinnerProps {
  message?: string;
}

export function LoadingSpinner({ message = '불러오는 중...' }: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3">
      <svg className="animate-spin w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
      </svg>
      <p className="text-[13px] text-gray-500">{message}</p>
    </div>
  );
}
