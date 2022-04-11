import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { format } from 'date-fns';
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

// const emergencyRateMapReverse = { 1: '不紧急', 2: '紧急', 3: '危急' };

const ArticleDetails = () => {
  const [articleToShow, setArticleToShow] = useState();
  const { id } = useParams();
  const userId = localStorage.getItem('userId');

  const { article } = useArticle({
    id,
    checkUserLike: userId,
    checkUserCollect: userId,
  });

  useEffect(() => {
    if (article) {
      // const fullAddress = JSON.parse(article.fullAddress);
      // const fullAddressStr = fullAddress.join('-');
      const createdAt = format(new Date(article.createdAt), 'yyyy-MM-dd HH:mm');
      const updatedAt = format(new Date(article.updatedAt), 'yyyy-MM-dd HH:mm');
      // const emergencyRate = emergencyRateMapReverse[article.emergencyRate];
      setArticleToShow({
        ...article,
        // fullAddress: fullAddressStr,
        createdAt,
        updatedAt,
      });
    }
  }, [article]);

  if (article === undefined) {
    return (
      <div className="discover min-height-500">
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
