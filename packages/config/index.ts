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
  /* ── Canonical NAP / AEO fields (used in JSON-LD on every page) ───────── */
  /** Legal/registered name of the firm. Used as the canonical `name` in schemas. */
  legalName?: string;
  /** Office address, structured for PostalAddress JSON-LD. */
  officeAddress?: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode?: string;
    addressCountry: string;
  };
  /** Geo coordinates for the office. Used in GeoCoordinates JSON-LD. */
  geo?: {
    latitude: number;
    longitude: number;
  };
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
