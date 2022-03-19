import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import useUpdateArticleCover from '../../../hooks/useUpdateArticleCover';
import EditCollectionContainer from './EditCollectionContainer';

const EditModal = ({
  articleToShow,
  setArticleToShow,
  showEditModal,
  setShowEditModal,
}) => {
  const [updateArticleCover] = useUpdateArticleCover();
  const [loading, setLoading] = useState(false);
  const [errorInfo, setErrorInfo] = useState('');
  const [successInfo, setSuccessInfo] = useState('');

  const initialValues = {
    cover: articleToShow.cover || '',
  };

  const onSubmit = async (values) => {
    const variables = {
      articleId: articleToShow.id,
      newCover: values.cover,
    };

    const updatedArticle = {
      ...articleToShow,
      cover: values.cover,
    };
    setLoading(true);

    try {
      await updateArticleCover(variables);
      setSuccessInfo('Cover details updated');

      setTimeout(() => {
        setSuccessInfo('');
        setArticleToShow(updatedArticle);
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
      <Modal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        centered
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Edit Collection
            {' '}
            {articleToShow.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditCollectionContainer
            initialValues={initialValues}
            onSubmit={onSubmit}
            errorInfo={errorInfo}
            successInfo={successInfo}
            loading={loading}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default EditModal;
