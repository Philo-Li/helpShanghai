import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { format } from 'date-fns';
import PacmanLoader from 'react-spinners/PacmanLoader';
import useArticle from '../../hooks/useArticle';
import LeaveMessagePageContainer from './LeaveMessagePageContainer';

const override = css`
  display: flex;
  justify-content: center;
  align-item: center;
  margin: 3rem;
  margin-bottom: 6rem;
`;

// const emergencyRateMapReverse = { 1: '不紧急', 2: '紧急', 3: '危急' };

const LeaveMessagePage = () => {
  const [articleToShow, setArticleToShow] = useState();
  const id = 'uS-6emdcWD';

  const { article } = useArticle({
    id,
  });

  useEffect(() => {
    if (article) {
      const fullAddress = JSON.parse(article.fullAddress);
      const fullAddressStr = fullAddress && fullAddress.join('-');

      const createdAt = format(new Date(article.createdAt), 'PPpp');
      const updatedAt = format(new Date(article.updatedAt), 'PPpp');

      setArticleToShow({
        ...article,
        fullAddress: fullAddressStr,
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
      <LeaveMessagePageContainer
        articleToShow={articleToShow}
        setArticleToShow={setArticleToShow}
      />
    </div>
  );
};

export default LeaveMessagePage;
