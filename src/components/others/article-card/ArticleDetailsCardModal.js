import React from 'react';
import { Modal } from 'react-bootstrap';
import ArticleDetailsCard from './ArticleDetailsCard';

const ArticleDetailsCardModal = ({
  articleDetailsToShow, showDetailsModal, setShowDetailsModal,
}) => (
  <div>
    <Modal
      show={showDetailsModal}
      onHide={() => setShowDetailsModal(false)}
      centered
      dialogClassName="modal-90w"
      aria-labelledby="example-custom-modal-styling-title"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-custom-modal-styling-title">
          {articleDetailsToShow && articleDetailsToShow.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {articleDetailsToShow && <ArticleDetailsCard article={articleDetailsToShow} />}
      </Modal.Body>
    </Modal>
  </div>
);

export default ArticleDetailsCardModal;
