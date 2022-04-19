import { useMutation } from '@apollo/client';

import { CREATE_ANONYMOUS_COMMENT } from '../graphql/mutations';

const useCreateAnonymousComment = () => {
  const [mutate, result] = useMutation(CREATE_ANONYMOUS_COMMENT);

  const createAnonymousComment = async (variables) => {
    await mutate({
      variables,
    });
  };

  return [createAnonymousComment, result];
};

export default useCreateAnonymousComment;
