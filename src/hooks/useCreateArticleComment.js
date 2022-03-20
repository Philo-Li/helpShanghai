import { useMutation } from '@apollo/client';

import { CREATE_ARTICLE_COMMENT } from '../graphql/mutations';

const useCreateArticleComment = () => {
  const [mutate, result] = useMutation(CREATE_ARTICLE_COMMENT);

  const createArticleComment = async (variables) => {
    await mutate({
      variables,
    });
  };

  return [createArticleComment, result];
};

export default useCreateArticleComment;
