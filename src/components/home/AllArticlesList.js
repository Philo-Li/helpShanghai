import React, { useState, useEffect } from 'react';
import useArticles from '../../hooks/useArticles';
import HomeArticleList from '../others/table/HomeArticleList';

const AllArticlesList = () => {
  const [allArticles, setAllArticles] = useState();
  const [loading, setLoading] = useState(false);

  const userId = localStorage.getItem('userId');

  const variables = {
    checkUserLike: userId,
    checkUserCollect: userId,
    orderDirection: 'ASC',
    first: 20,
  };

  const { articles, fetchMore, hasNextPage } = useArticles(variables);

  useEffect(async () => {
    if (articles) {
      const temp = articles && articles.edges
        ? articles.edges.map((edge) => {
          const article = edge.node;
          const fullAddress = JSON.parse(article.fullAddress);
          const address1 = JSON.parse(article.address1);
          const address1Str = address1.join('-');
          const fullAddressStr = fullAddress.join('-');
          const updatedArticle = { ...article, fullAddress: fullAddressStr, address1: address1Str };
          return updatedArticle;
        })
        : [];

      setAllArticles(temp);
      setLoading(false);
    }
  }, [articles]);

  const clickFetchMore = () => {
    fetchMore();
    setLoading(true);
  };

  return (
    <div>
      <HomeArticleList
        allArticles={allArticles}
        setAllArticles={setAllArticles}
        clickFetchMore={clickFetchMore}
        loading={loading}
        hasNextPage={hasNextPage}
      />
    </div>
  );
};

export default AllArticlesList;
