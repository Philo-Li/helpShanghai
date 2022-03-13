import { useMutation } from '@apollo/client';

import { CREATE_ARTICLE } from '../graphql/mutations';

const useCreateArticle = () => {
  const [mutate, result] = useMutation(CREATE_ARTICLE);

  const createArticle = async (variables) => {
    await mutate({
      variables,
    });
  };

  return [createArticle, result];
};

export default useCreateArticle;
