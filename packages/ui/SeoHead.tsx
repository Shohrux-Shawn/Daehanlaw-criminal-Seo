import Head from 'next/head';
import type { SiteConfig } from '@daehanlaw/config';

interface SeoHeadProps {
  config: SiteConfig;
  title: string;
  description: string;
  canonicalPath?: string;
  ogImage?: string;
  schema?: object;
}

export function SeoHead({
  config,
  title,
  description,
  canonicalPath = '/',
  ogImage = '/og-image.jpg',
  schema,
}: SeoHeadProps) {
  const canonicalUrl = `${config.siteUrl}${canonicalPath}`;
  const fullTitle = `${title} | ${config.siteName}`;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="canonical" href={canonicalUrl} />
      <link rel="icon" href="/favicon.png" />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${config.siteUrl}${ogImage}`} />
      <meta property="og:locale" content="ko_KR" />
      <meta property="og:site_name" content={config.siteName} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${config.siteUrl}${ogImage}`} />

      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
    </Head>
  );
}
