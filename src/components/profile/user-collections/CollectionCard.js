import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import galleryIcon from '../../../img/galleryIcon.jpg';
import '../../../index.css';
import CollectionDropdownButton from '../../others/button/edit-collection-btn/CollectionDropdownButtonDotIcon';
import DeleteCollectionModal from './DeleteCollectionModal';
import EditCollectionModal from './edit-collection/EditCollectionModal';

const INIT_COVER = galleryIcon;

const CollectionCard = ({
  showEditButton, collection, allCollections, setAllCollections,
}) => {
  const [showEditCollectionModal, setShowEditCollectionModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const history = useHistory();

  const openCollection = (collectionId) => {
    history.push(`/collection/${collectionId}`);
  };

  // console.log('cover', collection.cover);

  return (
    <div className="p-3">
      <Card key={collection.id}>
        <div
          className="view zoom overlay"
          onClick={() => { openCollection(collection.id); }}
          onKeyPress={() => openCollection(collection.id)}
          role="button"
          tabIndex="0"
        >
          <img
            src={collection.cover || INIT_COVER}
            className="max-height-100"
            alt="collection cover"
          />
          <div className="mask flex-center rgba-blue-light white-text">
            <i size="lg" className="bi bi-search" />
          </div>
        </div>
        <Card.Title>
          <div className="container-user-collection-list-title">
            {showEditButton && (
              <div className="user-collection-list-title-padding-left">
                {collection.title}
                (
                {collection.articleCount}
                )
              </div>
            )}
            {!showEditButton && (
              <div className="user-collection-list-title">
                {collection.title}
                (
                {collection.articleCount}
                )
              </div>
            )}
            <div className="user-collection-list-btn">
              {showEditButton && (
                <CollectionDropdownButton
                  setShowEditCollectionModal={setShowEditCollectionModal}
                  setShowDeleteModal={setShowDeleteModal}
                />
              )}
              <DeleteCollectionModal
                collectionNow={collection}
                allCollections={allCollections}
                setAllCollections={setAllCollections}
                showDeleteModal={showDeleteModal}
                setShowDeleteModal={setShowDeleteModal}
              />
              <EditCollectionModal
                collectionNow={collection}
                allCollections={allCollections}
                setAllCollections={setAllCollections}
                showEditCollectionModal={showEditCollectionModal}
                setShowEditCollectionModal={setShowEditCollectionModal}
              />
            </div>
          </div>
        </Card.Title>
      </Card>
    </div>
  );
};

export default CollectionCard;
