import React, { useState } from 'react';
import Masonry from 'react-masonry-css';
import { nanoid } from 'nanoid';
import LoadMore from '../button/LoadMore';
import ArticleCard from '../article-card/ArticleCardTableItem';
import ArticleDetailsCardModal from '../article-card/ArticleDetailsCardModal';

const breakpointColumnsObj = {
  default: 1,
};

const HomeArticleListContainer = ({
  // eslint-disable-next-line no-unused-vars
  allArticles, setAllArticles, clickFetchMore, loading, column, hasNextPage,
}) => {
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [articleDetailsToShow, setArticleDetailsToShow] = useState();

  return (
    <div className="p-3 article-list-container">
      <div className="">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {allArticles.map((article) => (
            <div key={nanoid()}>
              <ArticleCard
                article={article}
                // showDetailsModal={showDetailsModal}
                setShowDetailsModal={setShowDetailsModal}
                setArticleDetailsToShow={setArticleDetailsToShow}
              />
            </div>
          ))}
        </Masonry>
      </div>
      <ArticleDetailsCardModal
        articleDetailsToShow={articleDetailsToShow}
        showDetailsModal={showDetailsModal}
        setShowDetailsModal={setShowDetailsModal}
      />
      <LoadMore
        hasNextPage={hasNextPage}
        loading={loading}
        clickFetchMore={clickFetchMore}
      />
    </div>
  );
};

export default HomeArticleListContainer;
