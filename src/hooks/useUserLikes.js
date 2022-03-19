import { useQuery } from '@apollo/client';

import { GET_USER_LIKES } from '../graphql/queries';

const useUserLikedArticles = (variables) => {
  const {
    data, fetchMore, refetch, loading, ...result
  } = useQuery(GET_USER_LIKES, {
    fetchPolicy: 'cache-and-network',
    variables,
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data && data.articleLikes.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      query: GET_USER_LIKES,
      variables: {
        after: data.articleLikes.pageInfo.endCursor,
        ...variables,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const nextResult = {
          articleLikes: {
            ...fetchMoreResult.articleLikes,
            edges: [
              ...previousResult.articleLikes.edges,
              ...fetchMoreResult.articleLikes.edges,
            ],
          },
        };

        return nextResult;
      },
    });
  };

  return {
    likes: data ? data.articleLikes : undefined,
    fetchMore: handleFetchMore,
    hasNextPage: data && data.articleLikes.pageInfo.hasNextPage,
    refetch,
    loading,
    ...result,
  };
};

export default useUserLikedArticles;
