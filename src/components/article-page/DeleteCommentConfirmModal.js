import React, { useState } from 'react';
import { Modal, Alert } from 'react-bootstrap';
import useDeleteArticleComment from '../../hooks/useDeleteArticleComment';

const DeleteConfirmModal = ({
  id,
  itemType,
  showDeleteModal,
  setShowDeleteModal,
  updateList,
}) => {
  const [errorInfo, setErrorInfo] = useState('');
  const [successInfo, setSuccessInfo] = useState('');
  const [deleteArticleComment] = useDeleteArticleComment();

  const deleteSingleCollection = async () => {
    try {
      await deleteArticleComment({ id });
      setSuccessInfo(`${itemType} is deleted`);
      setTimeout(() => { setSuccessInfo(''); setShowDeleteModal(false); updateList(id); }, 3000);
    } catch (e) {
      setErrorInfo(e.message);
      setTimeout(() => { setErrorInfo(''); }, 3000);
    }
  };

  return (
    <div>
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            {`Delete this
            ${itemType}
            ?`}
          </Modal.Title>
        </Modal.Header>
        {errorInfo && (
        <Alert variant="danger">
          {errorInfo}
        </Alert>
        )}
        {successInfo && (
          <Alert variant="success">
            {successInfo}
          </Alert>
        )}
        <Modal.Footer>
          <button className="more-photos-btn" type="button" onClick={() => setShowDeleteModal(false)}>
            Close
          </button>
          <button className="delete-btn" type="button" onClick={() => deleteSingleCollection()}>
            <i className="bi bi-trash-fill icon-delete" />
            Delete
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DeleteConfirmModal;
