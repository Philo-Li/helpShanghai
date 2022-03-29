/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { css } from '@emotion/react';
import { nanoid } from 'nanoid';
import PacmanLoader from 'react-spinners/PacmanLoader';
import CreateContainer from './CreateContainer';
import useCreateArticle from '../../hooks/useCreateArticle';
import config from '../../config';

const override = css`
  display: flex;
  justify-content: center;
  align-item: center;
  margin: 3rem;
  margin-bottom: 6rem;
`;

const baseUrl = config.waldonApi;

const initialValues = {
  title: '',
  tag: '',
  license: 'CC BY',
};

const editorContentInit = {
  entityMap: {},
  blocks: [{
    key: '637gr', text: 'Type here.', type: 'unstyled', depth: 0, inlineStyleRanges: [], entityRanges: [], data: {},
  }],
};

const Create = () => {
  const [errorInfo, setErrorInfo] = useState('');
  const [successInfo, setSuccessInfo] = useState('');
  const [loading, setLoading] = useState(false);
  const [createArticle, result] = useCreateArticle();
  const [editorState, setEditorState] = useState(editorContentInit);
  const userId = localStorage.getItem('userId');
  const [license, setLicense] = useState('CC BY');
  const [cover, setCover] = useState('');
  const [articleId, setArticleId] = useState('');
  const history = useHistory();

  if (!userId) {
    return (
      <div className="col-item-3">
        <PacmanLoader color="#9B9B9B" loading css={override} size={50} />
      </div>
    );
  }

  useEffect(() => {
    if (result && result.data) {
      const tempId = result.data.createArticle.id;
      setArticleId(tempId);
      setTimeout(() => {
        setSuccessInfo('');
        history.push(`/article/${articleId}`);
      }, 3000);
    }
  }, [result]);

  const onSubmit = async (values) => {
    const {
      title, tag,
    } = values;

    setLoading(true);
    try {
      // get secure url from our server

      const variables = {
        title,
        content: JSON.stringify(editorState),
        license,
        tag,
        published: true,
      };
      const res = await createArticle(variables);
      setSuccessInfo('Article created');

      setLoading(false);
    } catch (e) {
      setErrorInfo(e.message);
      setLoading(false);
      setTimeout(() => { setErrorInfo(''); }, 3000);
    }
  };

  return (
    <div>
      {/* <img
        src={cover}
        className="article-details-cover"
        width="100%"
        height={300}
        alt="gird item"
      /> */}
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

export default Create;
