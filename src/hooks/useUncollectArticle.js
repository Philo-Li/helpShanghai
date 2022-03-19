import { useMutation } from '@apollo/client';

import { UNCOLLECT_ARTICLE } from '../graphql/mutations';

const useUncollectArticle = () => {
  const [mutate, result] = useMutation(UNCOLLECT_ARTICLE);

  const uncollectArticle = async (variables) => {
    await mutate({
      variables,
    });
  };

  return [uncollectArticle, result];
};

export default useUncollectArticle;
