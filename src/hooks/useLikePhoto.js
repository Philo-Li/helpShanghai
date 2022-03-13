import { useMutation } from '@apollo/client';

import { LIKE_ARTICLE } from '../graphql/mutations';

const useLikePhoto = () => {
  const [mutate, result] = useMutation(LIKE_ARTICLE);

  const likePhoto = async (variables) => {
    await mutate({
      variables,
    });
  };

  return [likePhoto, result];
};

export default useLikePhoto;
