import { useQuery } from '@apollo/client';

import { GET_ARTICLES } from '../graphql/queries';

const useArticles = (variables) => {
  const {
    data, fetchMore, refetch, loading, ...result
  } = useQuery(GET_ARTICLES, {
    fetchPolicy: 'cache-and-network',
    variables,
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data && data.articles.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      query: GET_ARTICLES,
      variables: {
        after: data.articles.pageInfo.endCursor,
        ...variables,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const nextResult = {
          articles: {
            ...fetchMoreResult.articles,
            edges: [
              ...previousResult.articles.edges,
              ...fetchMoreResult.articles.edges,
            ],
          },
        };

        return nextResult;
      },
    });
  };

  return {
    articles: data ? data.articles : undefined,
    fetchMore: handleFetchMore,
    hasNextPage: data && data.articles.pageInfo.hasNextPage,
    refetch,
    loading,
    ...result,
  };
};

export default useArticles;
