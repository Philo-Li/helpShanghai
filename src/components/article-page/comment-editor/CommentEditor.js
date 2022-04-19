import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import useCreateArticleComment from '../../../hooks/useCreateArticleComment';
import useCreateAnonymousComment from '../../../hooks/useCreateAnonymousComment';
import EditCollectionContainer from './EditCollectionContainer';

const CommentEditor = ({
  articleId,
  // setArticleToShow,
}) => {
  const [createArticleComment] = useCreateArticleComment();
  const [createAnonymousComment] = useCreateAnonymousComment();
  const [loading, setLoading] = useState(false);
  const [errorInfo, setErrorInfo] = useState('');
  const [successInfo, setSuccessInfo] = useState('');
  const history = useHistory();

  const initialValues = {
    content: '',
  };

  const onSubmit = async (values) => {
    const variables = {
      articleId,
      content: values.content,
    };

    // const updatedArticle = {
    //   content: values.content,
    // };
    setLoading(true);

    try {
      if (articleId === 'uS-6emdcWD') {
        await createAnonymousComment(variables);
      } else {
        await createArticleComment(variables);
      }
      setSuccessInfo('评论发布成功');

      setTimeout(() => {
        setSuccessInfo('');
        // setArticleToShow(updatedArticle);
        history.push('/comment');
      }, 2000);
      setTimeout(() => { setSuccessInfo(''); }, 3000);
    } catch (e) {
      setErrorInfo(e.message);
      setTimeout(() => { setErrorInfo(''); }, 3000);
    }
    setLoading(false);
  };

  return (
    <div>
      <EditCollectionContainer
        initialValues={initialValues}
        onSubmit={onSubmit}
        errorInfo={errorInfo}
        successInfo={successInfo}
        loading={loading}
      />
    </div>
  );
};

export default CommentEditor;
