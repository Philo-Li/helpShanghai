/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import LazyLoad from 'react-lazyload';
import SaveToCollectionsModal from './SaveToCollectionsModal';
import useDeletePhoto from '../../../hooks/useDeletePhoto';
import useDownloadPhoto from '../../../hooks/useDownloadPhoto';
import '../../../MDB-Free_4.19.2/css/mdb.css';

const PhotoCard = ({
  photo, likeSinglePhoto,
}) => {
  if (!photo) return null;

  const thumb = photo.thumb || 'https://cdn.philoart.io/b/700x700/ejt2Vbza56UViZTf2vEHY.jpg';

  const [deletePhoto] = useDeletePhoto();
  const [downloadPhoto] = useDownloadPhoto();
  const history = useHistory();
  const [showCollectModal, setShowCollectModal] = useState(false);

  const username = localStorage.getItem('philoart-username');

  const bgColor = photo.color || '#84B0B3';

  const mystyle = {
    backgroundColor: bgColor,
  };

  const Placeholder = () => (
    <div style={mystyle}>
      <a href={`/photo/${photo.id}`}>
        <img
          src={thumb}
          className="lazyload-img"
          width="100%"
          alt="gird item"
        />
      </a>
    </div>
  );

  const deleteSinglePhoto = async () => {
    await deletePhoto({ id: photo.id });
  };

  const openCollectModal = async () => {
    if (!username) {
      history.push('/signin');
    } else {
      setShowCollectModal(true);
    }
  };

  const downloadSinglePhoto = async () => {
    window.open(photo.srcLarge);
    await downloadPhoto({ id: photo.id });
  };

  console.log('article', photo);

  return (
    <div className="grid-item">
      <div className="p-3">
        <Card key={photo.id}>
          <LazyLoad
            height={300}
            offset={[-100, 0]}
            debounce={500}
            once
            placeholder={<Placeholder />}
          >
            <div className="photo-card overlay">
              <a href={`/photo/${photo.id}`}>
                <img
                  src={thumb}
                  width="100%"
                  alt="gird item"
                />
              </a>

            </div>
          </LazyLoad>
          <Card.Title>
            <div className="article-card-title">
              {photo.title}
            </div>
            <p>{photo.tag}</p>
            <div className="article-card-summary">
              summaryWhen we talk about web3, I suspect most people in tech
              instantly think about NFTs, cryptocurrency,
              or DeFi. I can’t blame them there: judging by...
            </div>
            <div className="container-row-primary">
              <div className="article-card-author">author name</div>
              <div calssName="article-card-summary">Jan 29,2022</div>
            </div>
            <div className="">
              <div calssName="article-card-author">adad 29,2022</div>
            </div>
            <div className="article-card-flex-end">
              <button
                type="button"
                className="photodetails-card-btn-like container-row-0 photodetails-card-btn-item"
                onClick={() => likeSinglePhoto(photo)}
              >
                <div className="">
                  {!photo.isLiked && (<i className={photo.isLiked ? 'bi bi-bookmark-fill' : 'bi bi-bookmark'} />)}
                  {photo.isLiked && (
                    <div className="red-icon">
                      <i className={photo.isLiked ? 'bi bi-bookmark-fill' : 'bi bi-bookmark'} />
                    </div>
                  )}
                </div>
              </button>
            </div>
          </Card.Title>
        </Card>
      </div>
    </div>
  );
};

export default PhotoCard;
