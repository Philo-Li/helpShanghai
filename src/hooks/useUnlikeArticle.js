import { useMutation } from '@apollo/client';

import { UNLIKE_ARTICLE } from '../graphql/mutations';

const useUnlikeArticle = () => {
  const [mutate, result] = useMutation(UNLIKE_ARTICLE);

  const unlikeArticle = async (variables) => {
    await mutate({
      variables,
    });
  };

  return [unlikeArticle, result];
};

export default useUnlikeArticle;
