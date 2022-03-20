import { useQuery } from '@apollo/client';

import { GET_ARTICLE_COMMENTS } from '../graphql/queries';

const useArticleComments = (variables) => {
  const {
    data, fetchMore, refetch, loading, ...result
  } = useQuery(GET_ARTICLE_COMMENTS, {
    fetchPolicy: 'cache-and-network',
    variables,
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data && data.articleComments.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      query: GET_ARTICLE_COMMENTS,
      variables: {
        after: data.articleComments.pageInfo.endCursor,
        ...variables,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const nextResult = {
          articleComments: {
            ...fetchMoreResult.articleComments,
            edges: [
              ...previousResult.articleComments.edges,
              ...fetchMoreResult.articleComments.edges,
            ],
          },
        };

        return nextResult;
      },
    });
  };

  return {
    comments: data ? data.articleComments : undefined,
    fetchMore: handleFetchMore,
    hasNextPage: data && data.articleComments.pageInfo.hasNextPage,
    refetch,
    loading,
    ...result,
  };
};

export default useArticleComments;
