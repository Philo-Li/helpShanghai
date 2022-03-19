/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { Modal, Spinner, Alert } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import UserCollectionsList from '../UserCollectionsList';
import useCreateCollectionAndCollectArticle from '../../../hooks/useCreateCollectionAndCollectArticle';
import useCollections from '../../../hooks/useUserCollectionsPlus';
import useUncollectArticle from '../../../hooks/useUncollectArticle';
import useCollectArticle from '../../../hooks/useCollectArticle';
import TextInput from '../TextInput';

const validationSchema = Yup.object().shape({
  title: Yup
    .string()
    .required('Title is required'),
});

const initialValues = {
  title: '',
};

export const CreateAndSaveForm = ({ loading }) => (
  <Form className="container-create-collection-row">
    <div className="create-collection-row-item">
      <TextInput
        name="title"
        type="text"
        placeholder="Create new and save"
      />
    </div>

    <div className="create-collection-row-item">
      {!loading && (
        <button type="submit" className="create-collection-btn" id="create-button">
          Save
        </button>
      )}
      {loading && (
        <button type="submit" className="create-collection-btn" id="create-loading-button" disabled>
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          <span className="sr-only">Loading...</span>
        </button>
      )}
    </div>
  </Form>
);

const SaveToCollectionsModal = ({
  article, showCollectModal, setShowCollectModal,
}) => {
  const [createCollectionAndCollectArticle, newCollection] = useCreateCollectionAndCollectArticle();
  const [collectArticle] = useCollectArticle();
  const [uncollectArticle] = useUncollectArticle();
  const [errorInfo, setErrorInfo] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingList, setLoadingList] = useState(true);

  const [allCollections, setAllCollections] = useState();
  const { username } = localStorage;

  const { collections } = useCollections({
    username,
    checkArticleCollect: article.id,
    first: 30,
  });

  useEffect(() => {
    if (collections) {
      const temp = collections && collections.edges
        ? collections.edges.map((edge) => edge.node)
        : [];

      const updatedAllCollections = temp
        .map((obj) => {
          const coverToShow = obj.isCollected ? article.srcLarge : obj.cover;
          return { ...obj, coverToShow };
        });

      setAllCollections(updatedAllCollections);
      setLoadingList(false);
      setLoading(false);
    }
    if (allCollections && newCollection) {
      const updatedCollection = { ...newCollection, isCollected: true, coverToShow: newCollection.cover };
      setAllCollections([updatedCollection, ...allCollections]);
    }
  }, [collections, newCollection]);

  const onSubmit = async (value) => {
    const { title } = value;
    setLoading(true);
    try {
      const variables = {
        title,
        description: '',
        public: true,
        articleId: article.id,
      };
      await createCollectionAndCollectArticle(variables);
    } catch (e) {
      setErrorInfo(e.message);
      setTimeout(() => { setErrorInfo(''); }, 3000);
    }
    setLoading(false);
  };

  const collectSingleArticle = async (collection) => {
    const uncollect = collection.isCollected;
    const updatedCollection = {
      ...collection,
      isCollected: !collection.isCollected,
      coverToShow: uncollect ? collection.cover : article.srcLarge,
    };
    const updatedAllCollections = allCollections
      .map((obj) => (obj.id === collection.id ? updatedCollection : obj));

    setAllCollections(updatedAllCollections);

    if (uncollect) {
      await uncollectArticle({ articleId: article.id, collectionId: collection.id });
    } else {
      await collectArticle({ articleId: article.id, collectionId: collection.id });
    }
  };

  return (
    <div>
      <Modal
        show={showCollectModal}
        onHide={() => setShowCollectModal(false)}
        size="lg"
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
        scrollable
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Save to collections
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container-col">
            {errorInfo && (
              <Alert variant="danger">
                {errorInfo}
              </Alert>
            )}
            <div className="container-row-3">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                {({ handleSubmit }) => <CreateAndSaveForm onSubmit={handleSubmit} loading={loading} />}
              </Formik>
            </div>
            <div className="col-item-0">
              <UserCollectionsList
                loadingList={loadingList}
                allCollections={allCollections}
                collectSingleArticle={collectSingleArticle}
              />
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default SaveToCollectionsModal;
