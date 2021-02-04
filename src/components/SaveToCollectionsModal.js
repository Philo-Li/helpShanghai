/* eslint-disable object-curly-newline */
/* eslint-disable no-alert */
/* eslint-disable arrow-body-style */
import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
import { Modal, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import UserCollectionsList from './UserCollectionsList';
// import useAuthorizedUser from '../hooks/useAuthorizedUser';
import '../index.css';

const SaveToCollectionsModal = ({ photo, allCollections, setAllCollections }) => {
  const [show, setShow] = useState(false);

  const handleShowModal = () => {
    setShow(true);
    const updatedAllCollections = allCollections.map((collection) => {
      const collectedPhotos = collection.photos && collection.photos.edges
        ? collection.photos.edges.map((edge) => edge.node)
        : [];

      const find = collectedPhotos.find((obj) => obj.id === photo.id);
      return find ? { ...collection, isCollected: true } : { ...collection, isCollected: false };
    });
    setAllCollections(updatedAllCollections);
    console.log('updatedAllCollections', updatedAllCollections);
  };

  const collectSinglePhoto = async (photoToCollect, collection) => {
    const updatedCollection = { ...collection, isCollected: !collection.isCollected };
    console.log('updatedCollection', updatedCollection);
    const temp = allCollections.map((obj) => (obj.id === collection.id ? updatedCollection : obj));
    setAllCollections(temp);
    if (collection.isCollected) {
      // const photoLikes = photo.likes && photo.likes.edges
      //   ? photo.likes.edges.map((edge) => edge.node)
      //   : [];

      // const likedId = photoLikes.find((like) => like.user.id === authorizedUser.id);
      console.log('uncollect photo', photoToCollect.id, collection.id);
      // await uncollectPhoto({ id: likedId.id });
    } else {
      console.log('collect photo', photoToCollect.id, collection.id);
      // await collectPhoto({ photoId: photo.id });
    }
  };

  const createNewCollection = () => {
    console.log('create new collection');
  };

  return (
    <>
      <Button className="button1" variant="light" onClick={() => handleShowModal()}>
        <i className="bi bi-plus-square" />
      </Button>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        size="lg"
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Save to collections
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container-profile">
            <div className="profile-item">
              <UserCollectionsList
                show={show}
                photo={photo}
                allCollections={allCollections}
                collectSinglePhoto={collectSinglePhoto}
              />
            </div>
            <div className="profile-item">
              <div className="button-1">
                <div id={photo.id}>
                  <OverlayTrigger overlay={<Tooltip id="tooltip-create-collection">Create collection</Tooltip>}>
                    <span className="d-inline-block">
                      <Button variant="info" size="lg" onClick={() => createNewCollection()}>
                        <i className="bi bi-plus-circle" />
                      </Button>
                    </span>
                  </OverlayTrigger>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SaveToCollectionsModal;