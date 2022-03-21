/* eslint-disable no-unused-vars */
import React, { useState, useParams, useEffect } from 'react';
import { css } from '@emotion/react';
import { useHistory } from 'react-router-dom';
import PacmanLoader from 'react-spinners/PacmanLoader';
import CreateContainer from './CreateContainer';
import useArticle from '../../hooks/useArticle';
import useCreateArticle from '../../hooks/useCreateArticle';

const override = css`
  display: flex;
  justify-content: center;
  align-item: center;
  margin: 3rem;
  margin-bottom: 6rem;
`;

const initialValues = {
  title: '',
  description: '',
  license: 'CC 3.0',
};

const Edit = () => {
  const history = useHistory();
  const { id } = useParams();
  const [articleToShow, setArticleToShow] = useState();
  const [errorInfo, setErrorInfo] = useState('');
  const [loading, setLoading] = useState(false);
  const [createArticle] = useCreateArticle();
  const [files, setFiles] = useState([]);
  const userId = localStorage.getItem('userId');

  const { article } = useArticle({
    id,
    checkUserLike: userId,
    checkUserCollect: userId,
  });

  useEffect(() => {
    if (article) {
      const content = JSON.parse(article.content);
      setArticleToShow({ ...article, content });
    }
  }, [article]);

  if (!userId) {
    return (
      <div className="col-item-3">
        You are not authorized to edit this article;
      </div>
    );
  }

  if (article === undefined) {
    return (
      <div className="discover">
        <div className="p-3 container-profile">
          <div className="profile-item">
            <p className="header">Loading</p>
          </div>
        </div>
        <div className="col-item-3">
          <PacmanLoader color="#9B9B9B" loading css={override} size={50} />
        </div>
      </div>
    );
  }

  const onSubmit = async (values) => {
    const {
      title, content,
    } = values;

    setLoading(true);
    try {
      // get secure url from our server

      const variables = {
        title,
        content: JSON.stringify(files),
        license: 'CC 3.0',
        published: true,
      };
      // console.log('content', files, JSON.stringify(files));
      await createArticle(variables);
      history.push('/');
      setLoading(false);
    } catch (e) {
      setErrorInfo(e.message);
      setLoading(false);
      setTimeout(() => { setErrorInfo(''); }, 3000);
    }
  };

  return (
    <div>
      <CreateContainer
        initialValues={initialValues}
        onSubmit={onSubmit}
        errorInfo={errorInfo}
        loading={loading}
        files={files}
        setFiles={setFiles}
      />
    </div>
  );
};

export default Edit;
