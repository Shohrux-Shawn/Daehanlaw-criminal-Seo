import Link from 'next/link';
import type { ReactNode } from 'react';

interface CtaButtonProps {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'outline';
  external?: boolean;
  className?: string;
}

export function CtaButton({ href, children, variant = 'primary', external, className = '' }: CtaButtonProps) {
  const cls = variant === 'primary'
    ? `btn-primary ${className}`
    : `btn-outline ${className}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }
  return <Link href={href} className={cls}>{children}</Link>;
}
