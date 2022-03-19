import { useMutation } from '@apollo/client';

import { CREATE_COLLECTION_AND_COLLECT_ARTICLE } from '../graphql/mutations';

const useCreateCollectionAndCollectArticle = () => {
  const [mutate, result] = useMutation(CREATE_COLLECTION_AND_COLLECT_ARTICLE);

  const createCollectionAndCollectArticle = async (variables) => {
    await mutate({
      variables,
    });
  };
  let newCollection = null;
  if (result.data) {
    newCollection = result.data.createCollectionAndCollectArticle.collection;
  }

  return [createCollectionAndCollectArticle, newCollection];
};

export default useCreateCollectionAndCollectArticle;
