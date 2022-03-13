import { useQuery } from '@apollo/client';

import { GET_ARTICLE } from '../graphql/queries';

const useArticle = (variables) => {
  const {
    data, loading, ...result
  } = useQuery(GET_ARTICLE, {
    fetchPolicy: 'cache-and-network',
    variables,
  });

  return {
    article: data ? data.article : undefined,
    loading,
    ...result,
  };
};

export default useArticle;
