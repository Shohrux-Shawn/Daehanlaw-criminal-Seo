export interface Article {
  _id: string;
  articleCategory: string;
  articleStatus: string;
  articleTitle: string;
  articleContent: string;
  articleImage: string[];
  authorId: string;
  propertyType?: string;
  /** Multi-domain SEO tag (e.g. 'MAIN', 'DIVORCE'). Matches backend SiteOrigin enum. */
  siteOrigin?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface Articles {
  list: Article[];
  metaCounter: [{ total: number }];
}

export interface Case {
  _id: string;
  siteOrigin?: string;
  caseType: string;
  caseStatus: string;
  caseLocation: string;
  caseTitle: string;
  caseDesc?: string;
  caseImage: string[];
  agentId: string;
  createdAt: string;
}

export interface Cases {
  list: Case[];
  metaCounter: [{ total: number }];
}

export interface Agent {
  _id: string;
  agentType: string;
  agentStatus: string;
  agentFullName: string;
  agentPhone?: string;
  agentImage: string[];
  agentDesc?: string;
  agentProperties: number;
  agentCases: number;
  agentArticles: number;
  createdAt: string;
}

export interface Agents {
  list: Agent[];
  metaCounter: [{ total: number }];
}

export interface Property {
  _id: string;
  propertyTitle: string;
  propertyType: string;
  propertyStatus: string;
  propertyLocation: string;
  propertyDesc?: string;
  propertyContent?: string;
  propertyImages: string[];
  propertyRank: number;
  agentId: string;
  createdAt: string;
}

export interface Properties {
  list: Property[];
  metaCounter: [{ total: number }];
}

export interface LeadInput {
  leadName: string;
  leadPhone: string;
  leadEmail?: string;
  leadMessage?: string;
  leadSource?: string;
  leadKeyword?: string;
  leadCampaign?: string;
  leadServiceType?: string;
}

// ─── Admin auth ──────────────────────────────────────────────────────────────

export interface AuthAgent {
  _id: string;
  agentFullName: string;
  agentType: string;
  agentStatus: string;
  agentImage: string[];
  accessToken: string;
}
