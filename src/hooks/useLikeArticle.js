import { useMutation } from '@apollo/client';

import { LIKE_ARTICLE } from '../graphql/mutations';

const useLikeArticle = () => {
  const [mutate, result] = useMutation(LIKE_ARTICLE);

  const likeArticle = async (variables) => {
    await mutate({
      variables,
    });
  };

  return [likeArticle, result];
};

export default useLikeArticle;
