import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import PacmanLoader from 'react-spinners/PacmanLoader';
import { useParams } from 'react-router-dom';
import useArticle from '../../hooks/useArticle';
import ArticleDetailsContainer from './ArticleDetailsContainer';

const override = css`
  display: flex;
  justify-content: center;
  align-item: center;
  margin: 3rem;
  margin-bottom: 6rem;
`;

const ArticleDetails = () => {
  const [articleToShow, setArticleToShow] = useState();
  const { id } = useParams();
  const userId = localStorage.getItem('waldon-userId');

  const { article } = useArticle({
    id,
    checkUserLike: userId,
    checkUserCollect: userId,
  });

  useEffect(() => {
    if (article) {
      const content = JSON.parse(article.content);
      setArticleToShow({ ...article, content });
    }
  }, [article]);

  if (article === undefined) {
    return (
      <div className="discover">
        <div className="p-3 container-profile">
          <div className="profile-item">
            <p className="header">Loading</p>
          </div>
        </div>
        <div className="col-item-3">
          <PacmanLoader color="#9B9B9B" loading css={override} size={50} />
        </div>
      </div>
    );
  }

  console.log('article', articleToShow);

  return (
    <div>
      <ArticleDetailsContainer
        articleToShow={articleToShow}
        setArticleToShow={setArticleToShow}
      />
    </div>
  );
};

export default ArticleDetails;
