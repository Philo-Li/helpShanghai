import { useMutation } from '@apollo/client';

import { DELETE_ARTICLE_COMMENT } from '../graphql/mutations';

const useDeleteArticleComment = () => {
  const [mutate, result] = useMutation(DELETE_ARTICLE_COMMENT);

  const deleteArticleComment = async (variables) => {
    await mutate({
      variables,
    });
  };

  return [deleteArticleComment, result];
};

export default useDeleteArticleComment;
