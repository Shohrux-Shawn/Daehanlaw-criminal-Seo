import React from 'react';
import Link from 'next/link';

export interface HeroCrumb {
  label: string;
  href?: string;
}

export interface PageHeroProps {
  crumbs: HeroCrumb[];
  title: React.ReactNode;
  label?: string;
  description?: React.ReactNode;
  backgroundImage?: string;
}

export default function PageHero({ crumbs, title, label, description, backgroundImage }: PageHeroProps) {
  const hasImage = Boolean(backgroundImage);

  return (
    <div
      className="relative w-full overflow-hidden"
      style={
        hasImage
          ? { backgroundImage: `url('${backgroundImage}')`, backgroundColor: '#0d1629', backgroundSize: 'cover', backgroundPosition: 'center' }
          : { backgroundColor: '#eef1f6' }
      }
    >
      {hasImage && (
        <div className="absolute inset-0 bg-black/50 pointer-events-none" aria-hidden="true" />
      )}

      <div className="relative z-10 w-full max-w-7xl mx-auto pt-[48px] pb-[56px] px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        <nav className={`flex items-center gap-[8px] text-[12px] mb-[20px] sm:mb-[24px] ${hasImage ? 'text-white/60' : 'text-gray-400'}`}>
          {crumbs.map((crumb, i) => (
            <React.Fragment key={i}>
              {i > 0 && <span>›</span>}
              {crumb.href ? (
                <Link
                  href={crumb.href}
                  className={`cursor-pointer transition-colors no-underline ${hasImage ? 'text-white/70 hover:text-white' : 'text-gray-500 hover:text-gray-800'}`}
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className={i === crumbs.length - 1 ? (hasImage ? 'text-white/80' : 'text-gray-600') : ''}>
                  {crumb.label}
                </span>
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* Title */}
        <h1
          className={`text-[28px] sm:text-[36px] lg:text-[44px] font-black leading-tight tracking-[-0.25px] ${hasImage ? 'text-white' : 'text-gray-900'}`}
          style={{ marginBottom: label || description ? 6 : 0 }}
        >
          {title}
        </h1>

        {/* Eyebrow label */}
        {label && (
          <p
            className={`text-[11px] sm:text-[12px] font-semibold uppercase mt-[8px] ${hasImage ? 'text-gold-300' : 'text-navy-700'}`}
            style={{ letterSpacing: '0.12em', marginBottom: description ? 10 : 0 }}
          >
            {label}
          </p>
        )}

        {/* Description */}
        {description && (
          <p className={`text-[13px] sm:text-[14px] leading-relaxed tracking-[-0.25px] mt-[14px] ${hasImage ? 'text-white/70' : 'text-gray-500'}`}>
            {description}
          </p>
        )}
      </div>

      {/* Decorative diagonal — light bg only */}
      {!hasImage && (
        <div
          className="absolute right-0 top-0 bottom-0 w-[180px] md:w-[280px] lg:w-[420px] pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, transparent 40%, rgba(200,210,230,0.35) 100%)',
            clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0 100%)',
          }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
