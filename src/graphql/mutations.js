import { gql } from '@apollo/react-hooks';
import { USER_DETAILS } from './fragment';

export const AUTHORIZE = gql`
  mutation authorize($email: String!, $password: String!) {
    authorize(credentials: { email: $email, password: $password }) {
      accessToken
      expiresAt
      user {
        username
        id
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser(
    $username: String!
    $password: String!
    $firstName: String!
    $lastName: String
    $email: String!
    ) {
    createUser(user: {
      username: $username
      password: $password
      firstName: $firstName
      lastName: $lastName
      email:$email
    }) {
      username
    }
  }
`;

export const UPDATE_PROFILE = gql`
  mutation updateUserProfile(
    $username: String!
    $password: String!
    $firstName: String!
    $lastName: String
    $email: String!
    $description: String
    ) {
    updateUserProfile(user: {
      username: $username
      password: $password
      firstName: $firstName
      lastName: $lastName
      email:$email
      description: $description
    }) {
      ...userDetails
      description
    }
  }
  ${USER_DETAILS}
`;

export const CREATE_ARTICLE = gql`
  mutation createArticle(
    $title: String!
    $summary: String
    $tag: String
    $cover: String
    $content: String
    $license: String
    $published: Boolean!
    ) {
    createArticle(article: {
      title: $title
      summary: $summary
      tag: $tag
      cover: $cover
      content: $content
      license: $license
      published: $published
    } ) {
      id
    }
  }
`;

export const UPDATE_ARTICLE = gql`
  mutation updateArticle(
    $articleId: ID!
    $title: String!
    $summary: String
    $tag: String
    $content: String
    $license: String
    $published: Boolean!
    ) {
    updateArticle(article: {
      articleId: $articleId
      title: $title
      summary: $summary
      tag: $tag
      content: $content
      license: $license
      published: $published
    } ) {
      id
    }
  }
`;

export const LIKE_PHOTO = gql`
  mutation likePhoto( $photoId: ID! ) {
    likePhoto( photoId: $photoId ) {
      id
    }
  }
`;

export const UNLIKE_PHOTO = gql`
  mutation unlikePhoto( $photoId: ID! ) {
    unlikePhoto(photoId: $photoId )
  }
`;

export const LIKE_ARTICLE = gql`
  mutation likeArticle( $articleId: ID! ) {
    likeArticle( articleId: $articleId ) {
      id
    }
  }
`;

export const UNLIKE_ARTICLE = gql`
  mutation unlikeArticle( $articleId: ID! ) {
    unlikeArticle(articleId: $articleId )
  }
`;

export const COLLECT_ARTICLE = gql`
  mutation collectArticle( $articleId: ID!,  $collectionId: ID! ) {
    collectArticle(collect: { articleId: $articleId, collectionId: $collectionId } ) {
      id
    }
  }
`;

export const UNCOLLECT_ARTICLE = gql`
  mutation deleteColletedArticle( $articleId: ID!,  $collectionId: ID! ){
    deleteCollectedArticle(uncollect: { articleId: $articleId, collectionId: $collectionId })
  }
`;

export const DELETE_COLLECTION = gql`
  mutation deleteCollection( $id: ID! ) {
    deleteCollection( id: $id )
  }
`;

export const CREATE_COLLECTION = gql`
  mutation createCollection(
    $title: String!
    $description: String
    $public: Boolean!
    ) {
    createCollection(collection: {
      title: $title
      description: $description
      public: $public
    } ) {
      id
      title
      description
    }
  }
`;

export const CREATE_COLLECTION_AND_COLLECT_ARTICLE = gql`
  mutation createCollectionAndCollectPhoto(
    $title: String!
    $description: String
    $public: Boolean!
    $articleId: ID!
    $cover: String
    ) {
      createCollectionAndCollectArticle(collection: {
      title: $title
      description: $description
      public: $public
      articleId: $articleId
      cover:  $cover
    } ) {
      id
      collection {
        id
        title
        description
        cover
      }
    }
  }
`;

export const EDIT_PHOTO_LABELS = gql`
  mutation editPhoto( $photoId: ID! ){
    editPhoto(edit: { photoId: $photoId }) {
      id
      labels
      tags
      color
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser( $id: ID! ) {
    deleteUser( id: $id )
  }
`;

export const CHANGE_PASSWORD = gql`
  mutation changePassword(
    $currentPassword: String!
    $newPassword: String!
    ) {
      changePassword(user: {
        currentPassword: $currentPassword
        newPassword: $newPassword
      })
    }
`;

export const DOWNLOAD_PHOTO = gql`
  mutation downloadPhoto( $id: ID! ) {
    downloadPhoto( id: $id )
  }
`;

export const DELETE_ARTICLE = gql`
  mutation deleteArticle( $id: ID! ) {
    deleteArticle( id: $id )
  }
`;

export const EDIT_COLLECTION = gql`
  mutation editCollection(
    $collectionId: ID!
    $newTitle: String!
    $newDescription: String!
    $newCover: String
    ){
    editCollection(edit: {
      collectionId: $collectionId
      newTitle: $newTitle
      newDescription: $newDescription
      newCover: $newCover
    } ) {
      id
  }
}
`;

export const FOLLOW_USER = gql`
  mutation followUser( $userId: ID! ) {
    followUser( userId: $userId )
  }
`;

export const UNFOLLOW_USER = gql`
  mutation unfollowUser( $userId: ID! ) {
    unfollowUser( userId: $userId )
  }
`;

export const UPDATE_AVATAR = gql`
  mutation updateAvatar( $url: String! ) {
    updateAvatar( url: $url )
  }
`;

export const UPDATE_ARTICLE_COVER = gql`
  mutation updateArticleCover(
    $articleId: ID!
    $newCover: String
    $newThumb: String
    ){
    updateArticleCover(edit: {
      articleId: $articleId
      newCover: $newCover
      newThumb: $newThumb
    })
  }
`;

export const CREATE_ARTICLE_COMMENT = gql`
  mutation createArticleComment( $articleId: ID!, $content: String! ) {
    createArticleComment( articleComment: {
      articleId: $articleId
      content: $content
    } ) {
      content
    }
  }
`;

export const DELETE_ARTICLE_COMMENT = gql`
  mutation deleteArticleComment( $id: ID! ) {
    deleteArticleComment( id: $id )
  }
`;

export default {
  AUTHORIZE,
  CREATE_COLLECTION_AND_COLLECT_ARTICLE,
  EDIT_COLLECTION,
  UPDATE_ARTICLE_COVER,
  UPDATE_ARTICLE,
  CREATE_ARTICLE_COMMENT,
  DELETE_ARTICLE_COMMENT,
  UNFOLLOW_USER,
};
