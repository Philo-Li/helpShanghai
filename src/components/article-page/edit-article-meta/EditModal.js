import React, { useState } from 'react';
import { Modal, Tab, Tabs } from 'react-bootstrap';
import { nanoid } from 'nanoid';
import useUpdateArticleCover from '../../../hooks/useUpdateArticleCover';
import EditCollectionContainer from './EditCollectionContainer';
import saveToS3 from '../../../utils/saveToS3';

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
  const [cover, setCover] = useState([]);
  const userId = localStorage.getItem('userId');
  const [key, setKey] = useState('Upload');

  const initialValues = {
    cover: '',
  };

  const onSubmit = async (values) => {
    setLoading(true);
    let newCover;

    try {
      if (key === 'Link') {
        const variables = {
          articleId: articleToShow.id,
          newCover: values.cover,
          newThumb: values.cover,
        };
        newCover = values.cover;
        await updateArticleCover(variables);
      } else {
        const imageKey = `${userId}-${nanoid()}`;
        const imageUrl = await saveToS3(imageKey, cover[0]);
        const pathToImage = imageUrl.substring(51);
        const srcLarge = `https://cdn.waldon.io/1200x1200/${pathToImage}`;
        const srcTiny = `https://cdn.waldon.io/700x700/${pathToImage}`;

        const variables = {
          articleId: articleToShow.id,
          newCover: srcLarge,
          newThumb: srcTiny,
        };

        newCover = srcLarge;

        await updateArticleCover(variables);
      }

      const updatedArticle = {
        ...articleToShow,
        cover: newCover,
      };

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
            Change Cover
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3"
          >
            <Tab eventKey="Upload" title="Upload">
              <div>
                <EditCollectionContainer
                  initialValues={initialValues}
                  onSubmit={onSubmit}
                  errorInfo={errorInfo}
                  successInfo={successInfo}
                  loading={loading}
                  tabKey={key}
                  cover={cover}
                  setCover={setCover}
                />
              </div>
            </Tab>
            <Tab eventKey="Link" title="Paste link">
              <div>
                <EditCollectionContainer
                  initialValues={initialValues}
                  onSubmit={onSubmit}
                  errorInfo={errorInfo}
                  successInfo={successInfo}
                  loading={loading}
                  tabKey={key}
                  cover={cover}
                  setCover={setCover}
                />
              </div>
            </Tab>
          </Tabs>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default EditModal;
