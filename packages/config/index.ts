export interface SiteConfig {
  practiceArea: string;
  practiceAreaEn: string;
  siteName: string;
  siteUrl: string;
  mainSiteUrl: string;
  leadSource: string;
  leadKeyword: string;
  /** Multi-domain SEO origin tag — must match a value in the backend SiteOrigin enum. */
  siteOrigin: string;
  articleCategory: string;
  caseType: string | null;
  propertyType: string | null;
  brandColor: string;
  heroImage: string;
  heroHeadline: string;
  heroSubheadline: string;
  phoneNumber: string;
}

export function mainSiteLink(config: SiteConfig, path: string = '/'): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const params = new URLSearchParams({
    utm_source: config.leadSource,
    utm_medium: 'satellite',
    utm_campaign: config.leadKeyword,
  });
  return `${config.mainSiteUrl}${cleanPath}?${params.toString()}`;
}
