interface ErrorMessageProps {
  message?: string;
}

export function ErrorMessage({ message = '데이터를 불러오지 못했습니다.' }: ErrorMessageProps) {
  return (
    <div className="py-16 text-center">
      <p className="text-[14px] text-red-600">{message}</p>
      <p className="text-[12px] text-gray-400 mt-1">잠시 후 다시 시도해주세요.</p>
    </div>
  );
}
