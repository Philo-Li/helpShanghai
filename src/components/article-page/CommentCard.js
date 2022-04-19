import React, { useState } from 'react';
import { format } from 'date-fns';
import DeleteConfirmModal from './DeleteCommentConfirmModal';

const CommentCard = ({ comment, updateList }) => {
  const createDate = format(new Date(comment.createdAt), 'PP');
  const username = localStorage.getItem('username');

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const initProfileImage = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
  const { profileImage } = comment.user;

  // const reply = () => {
  //   console.log('reply');
  // };

  return (
    <div className="article-comment-card-container comment-card-border">
      <DeleteConfirmModal
        id={comment.id}
        itemType="Comment"
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        updateList={updateList}
      />
      <div className="container-row-primary">
        <a href={`/@${comment.user.username}`}>
          <div className="">
            <img src={profileImage || initProfileImage} alt="user avatar" className="article-card-author article-card-author-avatar" />
          </div>
        </a>
        <a href={`/@${comment.user.username}`}>
          <div className="article-comment-card-name">{`${comment.user.firstName} ${comment.user.lastName || ''}:`}</div>
        </a>
      </div>
      <div className="article-comment-card">
        <div className="article-comment-card-content">
          {comment.content}
        </div>
      </div>
      <div className="container-article-card-bookmark">
        {username === comment.user.username && (
          <div className="">
            <button
              type="button"
              className="article-comment-card-btn-delete article-card-date"
              onClick={() => setShowDeleteModal(true)}
            >
              删除
              <i className="bi bi-trash" />
            </button>
          </div>
        )}
        <div className="article-card-date">{createDate}</div>
        {/* <div className="article-card-bookmark-btn-end">
          <button
            type="button"
            className="article-card-btn-bookmark article-card-btn-item"
            onClick={() => reply()}
          >
            <div className="">
              reply
            </div>
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default CommentCard;
