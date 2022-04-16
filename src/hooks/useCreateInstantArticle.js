import { useMutation } from '@apollo/client';

import { CREATE_INSTANT_ARTICLE } from '../graphql/mutations';

const useCreateInstantArticle = () => {
  const [mutate, result] = useMutation(CREATE_INSTANT_ARTICLE);

  const createInstantArticle = async (variables) => {
    await mutate({
      variables,
    });
  };

  return [createInstantArticle, result];
};

export default useCreateInstantArticle;
