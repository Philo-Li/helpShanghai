import React, { useState } from 'react';
import useCreateArticleComment from '../../../hooks/useCreateArticleComment';
import EditCollectionContainer from './EditCollectionContainer';

const CommentEditor = ({
  articleId,
  // setArticleToShow,
}) => {
  const [createArticleComment] = useCreateArticleComment();
  const [loading, setLoading] = useState(false);
  const [errorInfo, setErrorInfo] = useState('');
  const [successInfo, setSuccessInfo] = useState('');

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
      await createArticleComment(variables);
      setSuccessInfo('Comment sent');

      setTimeout(() => {
        setSuccessInfo('');
        // setArticleToShow(updatedArticle);
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
