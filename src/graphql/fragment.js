import { gql } from '@apollo/react-hooks';

export const ARTICLE_DETAILS = gql`
  fragment articleDetails on Article {
    id
    title
    metaTitle
    slug
    summary
    content
    tag
    author
    viewCount
    license
    cover
    thumb
    published
    publishedAt
    updatedAt
    articleLikeCount
    user {
      username
      firstName
      lastName
      profileImage
    }
  }
`;

export const COLLECTION_DETAILS = gql`
  fragment collectionDetails on Collection {
    id
    title
    cover
    articleCount
  }
`;

export const USER_DETAILS = gql`
  fragment userDetails on User {
    id
    username
    firstName
    lastName
    email
    profileImage
    description
  }
`;

export default ARTICLE_DETAILS;
