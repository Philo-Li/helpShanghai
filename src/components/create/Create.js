/* eslint-disable no-unused-vars */
import React, { useState, useMemo } from 'react';
import axios from 'axios';
import { css } from '@emotion/react';
import { nanoid } from 'nanoid';
import { useHistory } from 'react-router-dom';
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
  tags: '',
  license: 'CC 3.0',
};

const Create = () => {
  const history = useHistory();
  const [errorInfo, setErrorInfo] = useState('');
  const [loading, setLoading] = useState(false);
  const [createArticle] = useCreateArticle();
  const [editorstate, setEditorState] = useState([]);
  const userId = localStorage.getItem('userId');
  const [license, setLicense] = useState('CC BY');

  if (!userId) {
    return (
      <div className="col-item-3">
        <PacmanLoader color="#9B9B9B" loading css={override} size={50} />
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
        content: JSON.stringify(editorstate),
        license,
        published: true,
      };
      // console.log('content', editorstate, JSON.stringify(editorstate));
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
        editorstate={editorstate}
        setEditorState={setEditorState}
        setLicense={setLicense}
      />
    </div>
  );
};

export default Create;
