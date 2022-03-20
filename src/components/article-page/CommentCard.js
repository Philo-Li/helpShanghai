import React from 'react';
import { format } from 'date-fns';

const CommentCard = ({ comment }) => {
  const createDate = format(new Date(comment.createdAt), 'PP');

  const initProfileImage = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
  const { profileImage } = comment.user;

  const reply = () => {
    console.log('reply');
  };

  return (
    <div className="article-comment-card-container comment-card-border">
      <div className="article-comment-card">
        <div className="article-card-summary">
          {comment.content}
        </div>
      </div>
      <div className="container-row-primary">
        <a href={`/@${comment.user.username}`}>
          <div className="">
            <img src={profileImage || initProfileImage} alt="user avatar" className="article-card-author article-card-author-avatar" />
          </div>
        </a>
        <a href={`/@${comment.user.username}`}>
          <div className="article-card-author-name">{`${comment.user.firstName} ${comment.user.lastName || ''}`}</div>
        </a>
        <div className="article-card-date">{createDate}</div>
      </div>
      <div className="container-article-card-bookmark">
        <div className="article-card-bookmark-btn-end">
          <button
            type="button"
            className="article-card-btn-bookmark article-card-btn-item"
            onClick={() => reply()}
          >
            <div className="">
              reply
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
