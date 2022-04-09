/* eslint-disable max-len */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { format } from 'date-fns';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import useLikeArticle from '../../hooks/useLikeArticle';
import useUnlikeArticle from '../../hooks/useUnlikeArticle';
import SaveToCollectionsModal from '../others/article-card/SaveToCollectionsModal';
import DropdownButton from '../others/button/edit-article-btn/DropdownButton';
import EditModal from './edit-article-meta/EditModal';
import DeleteConfirmModal from './DeleteConfirmModal';
import ArticleComment from './ArticleComment';

const ArticleDetailContainer = ({ articleToShow, setArticleToShow }) => {
  const [likeArticle] = useLikeArticle();
  const [unlikeArticle] = useUnlikeArticle();
  const [showCollectModal, setShowCollectModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [showEditModal, setShowEditModal] = useState(false);
  const history = useHistory();
  const userId = localStorage.getItem('userId');
  const username = localStorage.getItem('username');

  if (!articleToShow) return null;

  const likeSingleArticle = async () => {
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

  const article = articleToShow;

  const redirectToEditPage = async () => {
    history.push(`/edit/${articleToShow.id}`);
  };

  const publishedDate = format(new Date(article.updatedAt), 'PP');
  console.log('article', article);
  const initProfileImage = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
  const { profileImage } = article.user;
  // const profileImage = 'https://cdn.philoart.io/1/700x700/vQAgad7txFp8EhHrq8qTW-avatar.jpg';

  return (
    <div className="">
      <div className="container-collection-title p-3">
        <div className="collection-dropbtn">
          {username && articleToShow.user.username === username && (
            <DropdownButton
              setShowEditModal={setShowEditModal}
              redirectToEditPage={redirectToEditPage}
              setShowDeleteModal={setShowDeleteModal}
            />
          )}
        </div>
      </div>
      <EditModal
        articleToShow={article}
        setArticleToShow={setArticleToShow}
        showEditModal={showEditModal}
        setShowEditModal={setShowEditModal}
      />
      <DeleteConfirmModal
        id={articleToShow.id}
        itemType="Article"
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
      />
      <div className="container-col-title">
        <div className="article-details-title">
          {article.title}
        </div>
      </div>
      <div className="article-details-author-row">
        <div className="container-row-primary flex-center">
          <a href={`/@${article.user.username}`}>
            <div className="">
              <img src={profileImage || initProfileImage} alt="user avatar" className="article-card-author article-card-author-avatar" />
            </div>
          </a>
          <a href={`/@${article.user.username}`}>
            <div className="article-card-author-name">{`${article.user.firstName} ${article.user.lastName || ''}`}</div>
          </a>
          <div className="article-card-date">{publishedDate}</div>
        </div>
        <div className="container-article-card-bookmark">
          <div className="article-card-bookmark-btn-end">
            <SaveToCollectionsModal
              article={article}
              showCollectModal={showCollectModal}
              setShowCollectModal={setShowCollectModal}
            />
            <button
              type="button"
              className="article-card-btn-bookmark article-card-btn-item"
              onClick={() => openCollectModal()}
            >
              <div className="">
                {!article.isCollected && (<i className={article.isCollected ? 'bi bi-bookmark-fill' : 'bi bi-bookmark'} />)}
                {article.isCollected && (
                  <div className="yellow-icon">
                    <i className={article.isCollected ? 'bi bi-bookmark-fill' : 'bi bi-bookmark'} />
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
              onClick={() => likeSingleArticle(article)}
            >
              <div className="">
                {!article.isLiked && (<i className={article.isLiked ? 'bi bi-heart-fill' : 'bi bi-heart'} />)}
                {article.isLiked && (
                  <div className="red-icon">
                    <i className={article.isLiked ? 'bi bi-heart-fill' : 'bi bi-heart'} />
                  </div>
                )}
              </div>
            </button>
          </div>
        </div>
      </div>
      <div className="container-col-article-details">
        <div className="container-row-license">
          <div className="container-row-license-item">
            分类:
          </div>
          <div className="container-row-license-item">
            {article.type}
          </div>
        </div>
        <div className="container-row-license">
          <div className="container-row-license-item">
            紧急程度:
          </div>
          <div className="container-row-license-item">
            {article.emergencyRate}
          </div>
        </div>
        <div className="container-row-license">
          <div className="container-row-license-item">
            状态:
          </div>
          <div className="container-row-license-item">
            {article.status}
          </div>
        </div>
        <div className="container-row-license">
          <div className="container-row-license-item">
            地理位置:
          </div>
          <div className="container-row-license-item">
            {article.fullAddress}
          </div>
        </div>
        <div className="container-col-text-input-create">
          人数：
          {article.peopleCount}
        </div>
        <div className="container-col-text-input-create">
          需要的物资：
          {article.need}
        </div>
        <div className="container-col-text-input-create">
          可交换分享购买的物资：
          {article.provide}
        </div>
        <div className="container-col-text-input-create">
          存粮预计消耗至：
          {article.surviveDate}
        </div>
        <div className="container-col-text-input-create">
          联系方式：
          {article.contact}
        </div>
        <div className="container-col-text-input-create">
          备注：
          {article.note}
        </div>
        <div className="container-col-text-input-create">
          创建日期：
          {article.updatedAt}
        </div>
        <div className="container-col-text-input-create">
          最后更新日期：
          {article.updatedAt}
        </div>
      </div>
      <div className="container-article-comment">
        <ArticleComment articleId={article.id} />
      </div>
    </div>
  );
};

export default ArticleDetailContainer;
