import { gql } from '@apollo/react-hooks';

export const ARTICLE_DETAILS = gql`
  fragment articleDetails on Article {
    id
    title
    tag
    address1
    address2
    fullAddress
    peopleCount
    need
    provide
    surviveDate
    contact
    note
    emergencyRate
    type
    status
    createdAt
    updatedAt
    articleLikeCount
    user {
      username
      firstName
      lastName
      profileImage
      id
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
