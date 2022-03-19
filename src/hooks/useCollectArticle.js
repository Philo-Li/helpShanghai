import { useMutation } from '@apollo/client';

import { COLLECT_ARTICLE } from '../graphql/mutations';

const useCollectArticle = () => {
  const [mutate, result] = useMutation(COLLECT_ARTICLE);

  const collectArticle = async (variables) => {
    await mutate({
      variables,
    });
  };

  return [collectArticle, result];
};

export default useCollectArticle;
