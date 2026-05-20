import { gql } from '@apollo/client';

export const CREATE_LEAD = gql`
  mutation CreateLead($input: LeadInput!) {
    createLead(input: $input) {
      _id
      leadName
      leadPhone
      createdAt
    }
  }
`;

export const USER_LOGIN = gql`
  mutation UserLogin($input: UserLoginInput!) {
    userLogin(input: $input) {
      _id
      memberFullName
      memberEmail
      memberStatus
      accessToken
    }
  }
`;

export const USER_SIGNUP = gql`
  mutation UserSignup($input: UserInput!) {
    userSignup(input: $input) {
      _id
      memberFullName
      memberEmail
      accessToken
    }
  }
`;

// ─── Admin (lawyer/admin) auth + article CRUD ───────────────────────────────
// Used by the satellite admin UI. Public pages do not need these.

export const AGENT_LOGIN = gql`
  mutation AgentLogin($input: LoginInput!) {
    agentLogin(input: $input) {
      _id
      agentFullName
      agentType
      agentStatus
      agentImage
      accessToken
    }
  }
`;

export const CREATE_ARTICLE = gql`
  mutation AgentCreateArticle($input: ArticleInput!) {
    agentCreateArticle(input: $input) {
      _id
      articleTitle
      articleCategory
      articleStatus
      siteOrigin
      createdAt
    }
  }
`;

export const UPDATE_ARTICLE = gql`
  mutation UpdateArticle($input: ArticleUpdate!) {
    updateArticle(input: $input) {
      _id
      articleTitle
      articleCategory
      articleStatus
      siteOrigin
      createdAt
    }
  }
`;

export const UPDATE_ARTICLE_BY_ADMIN = gql`
  mutation UpdateArticleByAdmin($input: ArticleUpdate!) {
    updateArticleByAdmin(input: $input) {
      _id
      articleStatus
      siteOrigin
    }
  }
`;

export const DELETE_ARTICLE_BY_ADMIN = gql`
  mutation DeleteArticleByAdmin($articleId: String!) {
    deleteArticleByAdmin(articleId: $articleId) {
      _id
      articleTitle
      articleStatus
    }
  }
`;
