/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Editor } from 'react-draft-wysiwyg';
import { format } from 'date-fns';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import useLikeArticle from '../../hooks/useLikeArticle';
import useUnlikeArticle from '../../hooks/useUnlikeArticle';
import SaveToCollectionsModal from '../others/photo-card/SaveToCollectionsModal';
import DropdownButton from '../others/button/edit-article-btn/DropdownButton';
import DeleteConfirmModal from './DeleteConfirmModal';

const ArticleDetailContainer = ({ articleToShow, setArticleToShow }) => {
  const [likeArticle] = useLikeArticle();
  const [unlikeArticle] = useUnlikeArticle();
  const [showCollectModal, setShowCollectModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [showEditModal, setShowEditModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
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
        await unlikeArticle({ articleId: articleToShow.id });
      } else {
        await likeArticle({ articleId: articleToShow.id });
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

  const redirectToEditPage = async () => {
    history.push(`/edit-article/${articleToShow.id}`);
  };

  const publishedDate = format(new Date(photo.publishedAt), 'PP');
  // console.log('article', photo, publishedDate, photo.publishedAt);
  const profileImage = 'https://cdn.philoart.io/1/700x700/vQAgad7txFp8EhHrq8qTW-avatar.jpg';

  return (
    <div className="">
      <img
        src={photo.cover}
        width="100%"
        height={300}
        alt="gird item"
      />
      <div className="container-collection-title">
        <div className="collection-dropbtn">
          {username && articleToShow.user.username === username && (
            <DropdownButton
              redirectToEditPage={redirectToEditPage}
              setShowDeleteModal={setShowDeleteModal}
            />
          )}
        </div>
      </div>
      <DeleteConfirmModal
        id={articleToShow.id}
        itemType="Article"
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
      />
      <div className="container-col-title">
        <div className="article-details-title">
          {photo.title}
        </div>
      </div>
      <div className="article-details-author-row">
        <div className="article-card">
          <a href={`/article/${photo.id}`}>
            <div className="article-card-summary">
              {photo.summary}
            </div>
          </a>
        </div>
        <div className="container-row-primary flex-center">
          <div className="">
            <img src={profileImage} alt="user avatar" className="article-card-author article-card-author-avatar" />
          </div>
          <div className="article-card-author-name">{photo.author || 'Philo'}</div>
          <div className="article-card-date">{publishedDate}</div>
        </div>
        <div className="container-article-card-bookmark">
          <div className="article-card-bookmark-btn-end">
            <SaveToCollectionsModal
              photo={photo}
              showCollectModal={showCollectModal}
              setShowCollectModal={setShowCollectModal}
            />
            <button
              type="button"
              className="article-card-btn-bookmark article-card-btn-item"
              onClick={() => openCollectModal()}
            >
              <div className="">
                {!photo.isCollected && (<i className={photo.isCollected ? 'bi bi-bookmark-fill' : 'bi bi-bookmark'} />)}
                {photo.isCollected && (
                  <div className="yellow-icon">
                    <i className={photo.isCollected ? 'bi bi-bookmark-fill' : 'bi bi-bookmark'} />
                  </div>
                )}
              </div>
            </button>
          </div>
        </div>
        <div className="container-article-card-bookmark">
          <div className="article-card-bookmark-btn-end">
            <button
              type="button"
              className="article-card-btn-bookmark article-card-btn-item"
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
          </div>
        </div>
      </div>
      <div className="article-details-content container-col-article-details">
        {!editMode && (
          <Editor
            toolbarHidden="true"
            initialContentState={articleToShow.content}
            readOnly="true"
          />
        )}
        {editMode && (
          <Editor
            wrapperClassName="wrapper-class"
            editorClassName="editor-class"
            toolbarClassName="toolbar-class"
            toolbar={{
              inline: { inDropdown: true },
              list: { inDropdown: true },
              textAlign: { inDropdown: true },
              link: { inDropdown: true },
              history: { inDropdown: true },
            }}
            initialContentState={articleToShow.content}
          />
        )}
      </div>

      <div className="container-row-0">
        <div className="container-row-0">
          <button
            type="button"
            className="article-card-btn-bookmark article-card-btn-item"
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
        </div>
      </div>
      <div className="container-row-0">
        <h5>{photoCredit}</h5>
      </div>
    </div>
  );
};

export default ArticleDetailContainer;
