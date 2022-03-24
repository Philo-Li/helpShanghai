import { useMutation } from '@apollo/client';

import { UPDATE_ARTICLE } from '../graphql/mutations';

const useUpdateArticle = () => {
  const [mutate, result] = useMutation(UPDATE_ARTICLE);

  const updateArticle = async (variables) => {
    await mutate({
      variables,
    });
  };

  return [updateArticle, result];
};

export default useUpdateArticle;
