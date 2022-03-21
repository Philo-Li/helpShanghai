/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import useArticleComments from '../../hooks/useArticleComments';
import CommentEditor from './comment-editor/CommentEditor';
import CommentCard from './CommentCard';

const ArticleComment = ({
  articleId,
}) => {
  const [allComments, setAllComments] = useState();
  const [loading, setLoading] = useState(false);

  const variables = {
    articleId,
    first: 20,
  };

  const { comments, fetchMore } = useArticleComments(variables);

  useEffect(() => {
    if (comments) {
      const temp = comments && comments.edges
        ? comments.edges.map((edge) => edge.node)
        : [];

      setAllComments(temp);
      // setLoading(false);
    }
  }, [comments]);

  const clickFetchMore = () => {
    fetchMore();
    setLoading(true);
  };

  return (
    <div>
      <div className="article-comment-card-container">
        <CommentEditor articleId={articleId} />
      </div>
      <div className="p-3 container-profile">
        <h3>Comments</h3>
      </div>
      {allComments && allComments.map((comment) => (
        <div key={nanoid()}>
          <CommentCard comment={comment} />
        </div>
      ))}
    </div>
  );
};

export default ArticleComment;
