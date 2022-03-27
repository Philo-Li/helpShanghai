/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import { useHistory, useParams } from 'react-router-dom';
import PacmanLoader from 'react-spinners/PacmanLoader';
import CreateContainer from './CreateContainer';
import useArticle from '../../hooks/useArticle';
import useUpdateArticle from '../../hooks/useUpdateArticle';

const override = css`
  display: flex;
  justify-content: center;
  align-item: center;
  margin: 3rem;
  margin-bottom: 6rem;
`;

const editorContentInit = {
  entityMap: {},
  blocks: [{
    key: '637gr', text: 'Type here.', type: 'unstyled', depth: 0, inlineStyleRanges: [], entityRanges: [], data: {},
  }],
};

const Edit = () => {
  const history = useHistory();
  const { id } = useParams();
  const [articleToShow, setArticleToShow] = useState();
  const [errorInfo, setErrorInfo] = useState('');
  const [successInfo, setSuccessInfo] = useState('');
  const [loading, setLoading] = useState(false);
  const [updateArticle] = useUpdateArticle();
  const [editorState, setEditorState] = useState(editorContentInit);
  const [license, setLicense] = useState('CC BY');
  const userId = localStorage.getItem('userId');

  const { article } = useArticle({
    id,
  });

  useEffect(() => {
    if (article) {
      const content = JSON.parse(article.content);
      setArticleToShow({ ...article, content });
      setEditorState(content.length !== 0 ? content : editorContentInit);
    }
  }, [article]);

  const checkPermission = () => {
    if (userId === articleToShow.user.id) {
      return true;
    }
    return false;
  };

  if (articleToShow === undefined) {
    return (
      <div className="discover min-height-500">
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

  if (!checkPermission(articleToShow)) {
    return (
      <div className="col-item-3 min-height-500">
        You are not authorized to edit this article
      </div>
    );
  }

  const initialValues = {
    title: articleToShow.title,
    tag: articleToShow.tag || '',
    license: 'CC BY',
  };

  const onSubmit = async (values) => {
    const {
      title, tag,
    } = values;

    setLoading(true);
    try {
      // get secure url from our server

      const variables = {
        articleId: articleToShow.id,
        title,
        summary: '',
        tag,
        content: JSON.stringify(editorState),
        license,
        published: true,
      };
      // console.log('content', files, JSON.stringify(files));
      await updateArticle(variables);
      setSuccessInfo('Article updated');

      setTimeout(() => {
        setSuccessInfo('');
      }, 2000);
      setLoading(false);
    } catch (e) {
      setErrorInfo(e.message);
      setLoading(false);
      setTimeout(() => { setErrorInfo(''); }, 3000);
    }
  };

  return (
    <div>
      <img
        src={article.cover}
        className="article-details-cover"
        width="100%"
        height={300}
        alt="gird item"
      />
      <CreateContainer
        initialValues={initialValues}
        onSubmit={onSubmit}
        errorInfo={errorInfo}
        successInfo={successInfo}
        loading={loading}
        editorState={editorState}
        setEditorState={setEditorState}
        setLicense={setLicense}
      />
    </div>
  );
};

export default Edit;
