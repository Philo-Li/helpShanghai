/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Editor } from 'react-draft-wysiwyg';
import { format } from 'date-fns';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import useLikePhoto from '../../hooks/useLikePhoto';
import useUnlikePhoto from '../../hooks/useUnlikePhoto';
import useDownloadPhoto from '../../hooks/useDownloadPhoto';
import DropdownButton from '../others/button/edit-photo-btn/DropdownButton';
import SaveToCollectionsModal from '../others/photo-card/SaveToCollectionsModal';
import DeletePhotoModal from './DeletePhotoModal';

const ArticleDetailContainer = ({ articleToShow, setArticleToShow }) => {
  const [likePhoto] = useLikePhoto();
  const [unlikePhoto] = useUnlikePhoto();
  const [downloadPhoto] = useDownloadPhoto();
  const [showCollectModal, setShowCollectModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [showEditModal, setShowEditModal] = useState(false);
  const history = useHistory();
  const userId = localStorage.getItem('philoart-userId');
  const username = localStorage.getItem('philoart-username');

  if (!articleToShow) return null;

  const likeSinglePhoto = async () => {
    if (!userId) {
      history.push('/signin');
    } else {
      const temp = { ...articleToShow, isLiked: !articleToShow.isLiked };
      setArticleToShow(temp);
      if (articleToShow.isLiked) {
        await unlikePhoto({ photoId: articleToShow.id });
      } else {
        await likePhoto({ photoId: articleToShow.id });
      }
    }
  };

  const openCollectModal = async () => {
    if (!userId) {
      history.push('/signin');
    } else {
      setShowCollectModal(true);
    }
  };

  const photo = articleToShow;

  const photoCredit = `License: ${photo.license}`;

  const downloadSinglePhoto = async () => {
    window.open(photo.srcLarge);
    await downloadPhoto({ id: photo.id });
  };

  const publishedDate = format(new Date(photo.publishedAt), 'PP');
  // console.log('article', photo, publishedDate, photo.publishedAt);
  const profileImage = 'https://cdn.philoart.io/1/700x700/vQAgad7txFp8EhHrq8qTW-avatar.jpg';

  console.log('content', articleToShow.content);

  return (
    <div className="">
      <img
        src={photo.cover}
        width="100%"
        height={300}
        alt="gird item"
      />
      <div className="container-col-title">
        <div className="article-details-title">
          {photo.title}
        </div>
      </div>
      <div className="article-details-author-row">
        <div className="article-card">
          <a href={`/article/${photo.id}`}>
            {/* <div className="article-card-summary">
              summaryWhen we talk about web3, I suspect most people in tech
              instantly think about NFTs, cryptocurrency,
              or DeFi. I can’t blame them there: judging by...
            </div> */}
            <div className="article-card-summary">
              {photo.summary}
            </div>
          </a>
        </div>
        <div className="container-row-primary flex-center">
          <div className="">
            <img src={profileImage} alt="user avatar" className="article-card-author article-card-author-avatar" />
          </div>
          <div className="article-card-author-name">{photo.author || 'Author'}</div>
          <div className="article-card-date">{publishedDate}</div>
        </div>
        <div className="container-article-card-bookmark">
          <div className="article-card-bookmark-btn-end">
            <button
              type="button"
              className="article-card-btn-bookmark article-card-btn-item"
              onClick={() => likeSinglePhoto(photo)}
            >
              <div className="">
                {!photo.isLiked && (<i className={photo.isLiked ? 'bi bi-bookmark-fill' : 'bi bi-bookmark'} />)}
                {photo.isLiked && (
                  <div className="yellow-icon">
                    <i className={photo.isLiked ? 'bi bi-bookmark-fill' : 'bi bi-bookmark'} />
                  </div>
                )}
              </div>
            </button>
          </div>
        </div>
      </div>
      <div className="article-details-content">
        <Editor
          toolbarHidden="true"
          initialContentState={articleToShow.content}
          readOnly="true"
        />
      </div>
      {/* <div className="article">
        {articleToShow.content || 'rendering'}
      </div> */}
      {/* <div className="container-collection-title">
        <div className="collection-dropbtn">
          {photo.user.username === username && (
            <DropdownButton
              setShowEditModal={setShowEditModal}
              setShowDeleteModal={setShowDeleteModal}
            />
          )}
        </div>
      </div> */}
      {/* <DeletePhotoModal
        photo={photo}
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
      />
      <div className="container-row-photodetail-btn">
        <div className="">
          <button
            type="button"
            className="photodetails-card-btn-like container-row-0 photodetails-card-btn-item"
            onClick={() => likeSinglePhoto(photo)}
          >
            <div className="">
              {!photo.isLiked && (<i className={photo.isLiked ? 'bi bi-heart-fill' : 'bi bi-heart'} />)}
              {photo.isLiked && (
                <div className="red-icon">
                  <i className={photo.isLiked ? 'bi bi-heart-fill' : 'bi bi-heart'} />
                </div>
              )}
            </div>
          </button>
        </div> */}
      {/* <div>
          <button type="button" className="photodetails-card-btn-collect photodetails-card-btn-item" onClick={() => openCollectModal()}>
            <i className="bi bi-plus-square" />
          </button>
          <SaveToCollectionsModal
            photo={photo}
            showCollectModal={showCollectModal}
            setShowCollectModal={setShowCollectModal}
          />
        </div>
        <div className="photodetails-card-btn-item">
          <button type="button" className="photodetails-card-btn-download" onClick={() => downloadSinglePhoto()}>
            <i className="bi bi-download" />
          </button>
        </div>
      </div> */}
      <div className="container-row-0">
        <h5>{photoCredit}</h5>
      </div>
    </div>
  );
};

export default ArticleDetailContainer;
