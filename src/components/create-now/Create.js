/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { css } from '@emotion/react';
import CreateContainer from './CreateContainer';
import useCreateInstantArticle from '../../hooks/useCreateInstantArticle';

const override = css`
  display: flex;
  justify-content: center;
  align-item: center;
  margin: 3rem;
  margin-bottom: 6rem;
`;

const initialValues = {
  title: '',
  tag: '',
  need: '',
  contact: '',
  emergencyRate: '',
  type: '物资',
  status: '待解决',
};

const map = { 不紧急: 1, 紧急: 2, 危急: 3 };

const Create = () => {
  const [errorInfo, setErrorInfo] = useState('');
  const [successInfo, setSuccessInfo] = useState('');
  const [loading, setLoading] = useState(false);
  const [createInstantArticle, result] = useCreateInstantArticle();
  const [editorState, setEditorState] = useState('');
  const [type, setType] = useState('物资');
  const [status, setStatus] = useState('待解决');
  const [emergencyRate, setEmergencyRate] = useState('不紧急');
  const [articleId, setArticleId] = useState('');
  const history = useHistory();

  useEffect(() => {
    if (result && result.data) {
      const tempId = result.data.createInstantArticle.id;
      setArticleId(tempId);
      setTimeout(() => {
        setSuccessInfo('');
        history.push(`/article/${articleId}`);
      }, 3000);
    }
  }, [result]);

  const onSubmit = async (values) => {
    const {
      title, tag, need, contact, note,
    } = values;

    setLoading(true);
    try {
      const variables = {
        title: type,
        tag,
        address1: JSON.stringify(editorState),
        need,
        contact,
        note,
        emergencyRate: map[emergencyRate],
        type,
        status,
      };
      const res = await createInstantArticle(variables);
      setSuccessInfo('信息发布成功');

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
        successInfo={successInfo}
        loading={loading}
        editorState={editorState}
        setEditorState={setEditorState}
        type={type}
        setType={setType}
        status={status}
        setStatus={setStatus}
        emergencyRate={emergencyRate}
        setEmergencyRate={setEmergencyRate}
      />
    </div>
  );
};

export default Create;
