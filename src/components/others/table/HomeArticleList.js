import React from 'react';
import { css } from '@emotion/react';
import PacmanLoader from 'react-spinners/PacmanLoader';
import HomeArticleListContainer from './HomeArticleListContainer';

const override = css`
  display: flex;
  justify-content: center;
  align-item: center;
  margin: 3rem;
  margin-bottom: 6rem;
`;

const HomeArticleList = ({
  allArticles, setAllArticles, clickFetchMore, loading, column, hasNextPage,
}) => {
  if (allArticles === undefined) {
    return (
      <div className="col-item-3">
        <PacmanLoader color="#9B9B9B" loading css={override} size={50} />
      </div>
    );
  }

  return (
    <div>
      <HomeArticleListContainer
        allArticles={allArticles}
        setAllArticles={setAllArticles}
        clickFetchMore={clickFetchMore}
        loading={loading}
        column={column}
        hasNextPage={hasNextPage}
      />
    </div>
  );
};

export default HomeArticleList;
