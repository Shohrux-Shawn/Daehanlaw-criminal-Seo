import React from 'react';
import type { FaqItem } from '@/lib/seo/faqs';

interface FaqSchemaProps {
  items: FaqItem[];
}

/**
 * Emits a `FAQPage` JSON-LD block for AI answer engines (Google, ChatGPT,
 * Gemini, Perplexity, Claude, Naver Cue:). Drop once per page where the
 * Q&As are also visible to humans (recommended) or as a hidden schema-only
 * block on the homepage as a citation surface.
 */
export default function FaqSchema({ items }: FaqSchemaProps) {
  if (!items.length) return null;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: it.answer,
      },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
