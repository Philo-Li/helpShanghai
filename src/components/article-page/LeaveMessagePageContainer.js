/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { format } from 'date-fns';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import DropdownButton from '../others/button/edit-article-btn/DropdownButton';
import EditModal from './edit-article-meta/EditModal';
import DeleteConfirmModal from './DeleteConfirmModal';
import ArticleComment from './ArticleComment';

const LeaveMessagePageContainer = ({ articleToShow, setArticleToShow }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [showEditModal, setShowEditModal] = useState(false);
  const history = useHistory();
  const username = localStorage.getItem('username');

  if (!articleToShow) return null;

  const article = articleToShow;

  const redirectToEditPage = async () => {
    history.push(`/edit/${articleToShow.id}`);
  };

  const publishedDate = format(new Date(article.createdAt), 'PP');
  const initProfileImage = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';

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
              <img src={initProfileImage} alt="user avatar" className="article-card-author article-card-author-avatar" />
            </div>
          </a>
          <a href={`/@${article.user.username}`}>
            <div className="article-card-author-name">{`${article.user.firstName} ${article.user.lastName || ''}`}</div>
          </a>
          <div className="article-card-date">{publishedDate}</div>
        </div>
      </div>
      <div className="container-col-article-details">
        <div className="container-row-license">
          <div className="container-row-license-item">
            无需登录注册账号即可留言，对本站有任何改进的意见或建议或者bug，均可留言。
          </div>
        </div>
      </div>
      <div className="container-article-comment">
        <ArticleComment articleId={article.id} />
      </div>
    </div>
  );
};

export default LeaveMessagePageContainer;
