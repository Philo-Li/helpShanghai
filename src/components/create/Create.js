/* eslint-disable no-unused-vars */
import React, { useState, useMemo } from 'react';
import axios from 'axios';
import { css } from '@emotion/react';
import { nanoid } from 'nanoid';
import { useHistory } from 'react-router-dom';
import PacmanLoader from 'react-spinners/PacmanLoader';
import CreateContainer from './CreateContainer';
import useCreatePhoto from '../../hooks/useCreatePhoto';
import config from '../../config';

const override = css`
  display: flex;
  justify-content: center;
  align-item: center;
  margin: 3rem;
  margin-bottom: 6rem;
`;

const baseUrl = config.philoartApi;

const initialValues = {
  title: 'Untitled',
  description: '',
  license: 'Philo Art License',
  type: 'painting',
};

const Create = () => {
  const history = useHistory();
  const [errorInfo, setErrorInfo] = useState('');
  const [loading, setLoading] = useState(false);
  const [createPhoto] = useCreatePhoto();
  const [files, setFiles] = useState([]);
  const userId = localStorage.getItem('philoart-userId');

  if (!userId) {
    return (
      <div className="col-item-3">
        <PacmanLoader color="#9B9B9B" loading css={override} size={50} />
      </div>
    );
  }

  const onSubmit = async (values) => {
    const {
      title, description, license, type,
    } = values;

    setLoading(true);
    try {
      // get secure url from our server

      const variables = {
        title,
      };
      await createPhoto(variables);
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

export default Create;
