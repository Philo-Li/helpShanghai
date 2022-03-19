import { useMutation } from '@apollo/client';

import { UPDATE_ARTICLE_COVER } from '../graphql/mutations';

const useUpdateArticleCover = () => {
  const [mutate, result] = useMutation(UPDATE_ARTICLE_COVER);

  const updateArticleCover = async (variables) => {
    await mutate({
      variables,
    });
  };

  return [updateArticleCover, result];
};

export default useUpdateArticleCover;
