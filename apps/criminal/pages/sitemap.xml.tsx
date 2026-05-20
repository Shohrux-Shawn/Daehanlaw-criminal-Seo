import type { GetServerSideProps } from 'next';
import { getApolloClient } from '@daehanlaw/graphql';
import { GET_ARTICLES, GET_CASES } from '@daehanlaw/graphql';
import { SITE_CONFIG } from '@/site.config';

const STATIC_ROUTES = [
  '/',
  '/cases',
  '/cases/reviews',
  '/cases/knowledge',
  '/cases/analysis',
  '/cases/insights',
  '/articles',
  '/attorneys',
  '/contact',
];

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function urlTag(path: string, lastmod?: string): string {
  const loc = escapeXml(`${SITE_CONFIG.siteUrl}${path}`);
  const mod = lastmod ? `<lastmod>${escapeXml(lastmod.split('T')[0])}</lastmod>` : '';
  return `<url><loc>${loc}</loc>${mod}</url>`;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const client = getApolloClient(process.env.NEXT_PUBLIC_API_URL);
  const urls: string[] = [];

  for (const route of STATIC_ROUTES) {
    urls.push(urlTag(route));
  }

  try {
    const { data } = await client.query<any>({
      query: GET_ARTICLES,
      variables: {
        input: {
          page: 1, limit: 500, sort: 'createdAt', direction: 'DESC',
          search: { siteOrigin: SITE_CONFIG.siteOrigin },
        },
      },
      fetchPolicy: 'no-cache',
    });
    for (const a of data?.getArticles?.list ?? []) {
      urls.push(urlTag(`/articles/${a._id}`, a.createdAt));
    }
  } catch {}

  try {
    const { data } = await client.query<any>({
      query: GET_CASES,
      variables: {
        input: {
          page: 1, limit: 500, sort: 'createdAt', direction: 'DESC',
          search: { siteOrigin: SITE_CONFIG.siteOrigin },
        },
      },
      fetchPolicy: 'no-cache',
    });
    for (const c of data?.getCases?.list ?? []) {
      urls.push(urlTag(`${SITE_CONFIG.mainSiteUrl}/cases/${c._id}`, c.createdAt));
    }
  } catch {}

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  res.write(xml);
  res.end();

  return { props: {} };
};

export default function Sitemap() { return null; }
