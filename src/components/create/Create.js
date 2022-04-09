/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { css } from '@emotion/react';
import PacmanLoader from 'react-spinners/PacmanLoader';
import CreateContainer from './CreateContainer';
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
  tag: '',
  address1: '',
  address2: '',
  peopleCount: '',
  need: '',
  provide: '',
  surviveDate: '',
  contact: '',
  note: '',
  emergencyRate: '',
  type: '物资购买/分享交换',
  status: '待解决',
};

const editorContentInit = {
  entityMap: {},
  blocks: [{
    key: '637gr', text: 'Type here.', type: 'unstyled', depth: 0, inlineStyleRanges: [], entityRanges: [], data: {},
  }],
};

const map = { 不紧急: 1, 紧急: 2, 危急: 3 };

const Create = () => {
  const [errorInfo, setErrorInfo] = useState('');
  const [successInfo, setSuccessInfo] = useState('');
  const [loading, setLoading] = useState(false);
  const [createArticle, result] = useCreateArticle();
  const [editorState, setEditorState] = useState('');
  const userId = localStorage.getItem('userId');
  const [type, setType] = useState('物资购买/分享交换');
  const [status, setStatus] = useState('待解决');
  const [emergencyRate, setEmergencyRate] = useState('不紧急');
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
      title, tag, address2, peopleCount, need, provide, surviveDate, contact, note,
    } = values;

    setLoading(true);
    try {
      const titleArray = title ? [...editorState, title] : editorState;
      const variables = {
        title: titleArray.join('-'),
        tag,
        address1: JSON.stringify(editorState),
        address2,
        fullAddress: JSON.stringify([...editorState, address2]),
        peopleCount: peopleCount || 1,
        need,
        provide,
        surviveDate,
        contact,
        note,
        emergencyRate: map[emergencyRate],
        type,
        status,
      };
      const res = await createArticle(variables);
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
