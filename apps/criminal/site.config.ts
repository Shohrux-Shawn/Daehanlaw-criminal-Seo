import type { SiteConfig } from '@daehanlaw/config';

export const SITE_CONFIG: SiteConfig = {
  practiceArea:   '형사',
  practiceAreaEn: 'criminal',
  siteName:       '대한중앙 형사전문센터',
  siteUrl:        'https://daehanlaw-criminal.com',
  mainSiteUrl:    'https://daehanlaw.com',
  leadSource:     'criminal-satellite',
  leadKeyword:    'criminal',
  siteOrigin:     'CRIMINAL',
  articleCategory: 'PRACTICE_CRIMINAL',
  caseType:        'CRIMINAL',
  propertyType:    'CRIMINAL',
  brandColor:     '#1a1a2f',
  heroImage:      '',
  heroHeadline:   '당신의 편에서,\n가장 든든한 형사 조력자',
  heroSubheadline: '불안한 형사 절차 속에서도 차분한 설명과 실질적 대응으로 끝까지 함께합니다.',
  phoneNumber:    '1533-7377',
  /* Canonical NAP — used in every JSON-LD schema. */
  legalName:      '법무법인 대한중앙',
  officeAddress:  {
    streetAddress:   '해운대로 554 라온제이빌딩 7층',
    addressLocality: '해운대구',
    addressRegion:   '부산광역시',
    addressCountry:  'KR',
  },
  /* TODO: replace with confirmed coordinates from the firm.
     Current values are an approximation of 부산 해운대구 해운대로 554. */
  geo: {
    latitude:  35.16310,
    longitude: 129.16352,
  },
};
