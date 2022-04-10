/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import { useHistory, useParams } from 'react-router-dom';
import PacmanLoader from 'react-spinners/PacmanLoader';
import CreateContainer from './CreateContainer';
import useArticle from '../../hooks/useArticle';
import useUpdateArticle from '../../hooks/useUpdateArticle';
import DropdownButton from '../others/button/edit-page-article-btn/DropdownButton';
import EditModal from '../article-page/edit-article-meta/EditModal';
import DeleteConfirmModal from '../article-page/DeleteConfirmModal';

const override = css`
  display: flex;
  justify-content: center;
  align-item: center;
  margin: 3rem;
  margin-bottom: 6rem;
`;

const emergencyRateMap = { 不紧急: 1, 紧急: 2, 危急: 3 };
const emergencyRateMapReverse = { 1: '不紧急', 2: '紧急', 3: '危急' };

const Edit = () => {
  const history = useHistory();
  const { id } = useParams();
  const [articleToShow, setArticleToShow] = useState();
  const [errorInfo, setErrorInfo] = useState('');
  const [successInfo, setSuccessInfo] = useState('');
  const [loading, setLoading] = useState(false);
  const [updateArticle] = useUpdateArticle();
  const [editorState, setEditorState] = useState('');
  const userId = localStorage.getItem('userId');
  const [type, setType] = useState('');
  const [status, setStatus] = useState('待解决');
  const [emergencyRate, setEmergencyRate] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const { article } = useArticle({
    id,
  });

  useEffect(() => {
    if (article) {
      const fullAddress = JSON.parse(article.fullAddress);
      const fullAddressStr = fullAddress.join('-');
      setArticleToShow({ ...article, fullAddress: fullAddressStr });
      setEditorState(JSON.parse(article.address1));
      setType(article.type);
      setStatus(article.status);
      setEmergencyRate(emergencyRateMapReverse[article.emergencyRate]);
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
    tag: articleToShow.tag,
    address1: articleToShow.address1,
    address2: articleToShow.address2,
    peopleCount: articleToShow.peopleCount,
    need: articleToShow.need,
    provide: articleToShow.provide,
    surviveDate: articleToShow.surviveDate,
    contact: articleToShow.contact,
    note: articleToShow.note,
    emergencyRate: articleToShow.emergencyRate,
    type: articleToShow.type,
    status: articleToShow.status,
  };

  const onSubmit = async (values) => {
    const {
      title, tag, address2, peopleCount, need, provide, surviveDate, contact, note,
    } = values;

    setLoading(true);
    try {
      // get secure url from our server

      const titleArrayString = !title ? [...editorState, title].join('-') : title;
      const variables = {
        articleId: articleToShow.id,
        title: titleArrayString,
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
        emergencyRate: emergencyRateMap[emergencyRate],
        type,
        status,
      };
      await updateArticle(variables);
      setSuccessInfo('信息更新成功');

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
      <div className="container-collection-title p-3">
        <div className="collection-dropbtn">
          <DropdownButton
            setShowEditModal={setShowEditModal}
            setShowDeleteModal={setShowDeleteModal}
          />
        </div>
      </div>
      <EditModal
        articleToShow={article}
        setArticleToShow={setArticleToShow}
        showEditModal={showEditModal}
        setShowEditModal={setShowEditModal}
      />
      <DeleteConfirmModal
        id={articleToShow.id}
        itemType="Article"
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
      />
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

export default Edit;
