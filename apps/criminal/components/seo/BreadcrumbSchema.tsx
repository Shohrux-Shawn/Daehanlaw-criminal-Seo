import React from 'react';
import { SITE_CONFIG } from '@/site.config';

export interface BreadcrumbItem {
  /** Visible label, e.g. "그룹소개". For the root, use "홈" (avoid emojis in schema). */
  label: string;
  /** Path relative to the site root (e.g. "/about"). The component prepends `siteUrl`. */
  path: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

/**
 * Emits a `BreadcrumbList` JSON-LD block for AI answer engines and Google
 * rich results. Pass the same chain you render visually (root → … → current).
 */
export default function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  if (!items.length) return null;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.label,
      item: `${SITE_CONFIG.siteUrl}${it.path.startsWith('/') ? it.path : `/${it.path}`}`,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
