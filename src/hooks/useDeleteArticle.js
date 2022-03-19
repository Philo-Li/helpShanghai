import { useMutation } from '@apollo/client';

import { DELETE_ARTICLE } from '../graphql/mutations';

const useDeleteArticle = () => {
  const [mutate, result] = useMutation(DELETE_ARTICLE);

  const deleteArticle = async (variables) => {
    await mutate({
      variables,
    });
  };

  return [deleteArticle, result];
};

export default useDeleteArticle;
