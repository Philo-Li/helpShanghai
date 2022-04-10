import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import LoadMore from '../button/LoadMore';
import ArticleCard from '../article-card/ArticleCardTableItem';
import ArticleDetailsCardModal from '../article-card/ArticleDetailsCardModal';

const HomeArticleListContainer = ({
  // eslint-disable-next-line no-unused-vars
  allArticles, setAllArticles, clickFetchMore, loading, column, hasNextPage,
}) => {
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [articleDetailsToShow, setArticleDetailsToShow] = useState();

  return (
    <div className="p-3 article-list-container">
      <div className="">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>状态</th>
              <th>紧急程度</th>
              <th>城市</th>
              <th>分类</th>
              <th>生存指数</th>
              <th>可提供</th>
              <th>需要</th>
              <th>详情</th>
            </tr>
          </thead>
          <tbody>
            {allArticles.map((article) => (
              <ArticleCard
                article={article}
                // showDetailsModal={showDetailsModal}
                setShowDetailsModal={setShowDetailsModal}
                setArticleDetailsToShow={setArticleDetailsToShow}
              />
            ))}
          </tbody>
        </Table>
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
