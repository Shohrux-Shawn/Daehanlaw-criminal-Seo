import { gql } from '@apollo/client';

export const GET_ARTICLES = gql`
  query GetArticles($input: ArticlesInquiry!) {
    getArticles(input: $input) {
      list {
        _id
        articleCategory
        articleStatus
        articleTitle
        articleContent
        articleImage
        authorId
        propertyType
        siteOrigin
        createdAt
      }
      metaCounter {
        total
      }
    }
  }
`;

export const GET_ARTICLE = gql`
  query GetArticle($articleId: String!) {
    getArticle(articleId: $articleId) {
      _id
      articleCategory
      articleStatus
      articleTitle
      articleContent
      articleImage
      authorId
      siteOrigin
      createdAt
      updatedAt
    }
  }
`;

export const GET_CASES = gql`
  query GetCases($input: CasesInquiry!) {
    getCases(input: $input) {
      list {
        _id
        siteOrigin
        caseType
        caseStatus
        caseLocation
        caseTitle
        caseDesc
        caseImage
        agentId
        createdAt
      }
      metaCounter {
        total
      }
    }
  }
`;

export const GET_CASE = gql`
  query GetCase($caseId: String!) {
    getCase(caseId: $caseId) {
      _id
      siteOrigin
      caseType
      caseStatus
      caseLocation
      caseTitle
      caseDesc
      caseImage
      agentId
      createdAt
    }
  }
`;

export const GET_AGENTS = gql`
  query GetAgents($input: AgentsInquiry!) {
    getAgents(input: $input) {
      list {
        _id
        agentType
        agentStatus
        agentFullName
        agentPhone
        agentImage
        agentDesc
        agentProperties
        agentCases
        agentArticles
        createdAt
      }
      metaCounter {
        total
      }
    }
  }
`;

// ─── Admin queries (require Authorization: Bearer token) ─────────────────────

export const ADMIN_GET_ARTICLES = gql`
  query GetAllArticlesByAdmin($input: AllArticlesInquiry!) {
    getAllArticlesByAdmin(input: $input) {
      list {
        _id
        articleTitle
        articleCategory
        articleStatus
        articleContent
        propertyType
        siteOrigin
        authorId
        createdAt
      }
      metaCounter {
        total
      }
    }
  }
`;

export const GET_PROPERTIES = gql`
  query GetProperties($input: PropertiesInquiry!) {
    getProperties(input: $input) {
      list {
        _id
        propertyTitle
        propertyType
        propertyStatus
        propertyLocation
        propertyDesc
        propertyContent
        propertyImages
        propertyRank
        agentId
        createdAt
      }
      metaCounter {
        total
      }
    }
  }
`;
