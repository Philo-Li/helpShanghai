import React, { useState, useEffect } from 'react';
import useArticles from '../../hooks/useArticles';
import HomeArticleList from '../others/list/HomeArticleList';

const Latest = () => {
  const [allArticles, setAllArticles] = useState();
  const [loading, setLoading] = useState(false);

  // const userId = localStorage.getItem('userId');

  const variables = {
    // checkUserLike: userId,
    // checkUserCollect: userId,
    first: 50,
  };

  const { articles, fetchMore, hasNextPage } = useArticles(variables);

  useEffect(async () => {
    if (articles) {
      const temp = articles && articles.edges
        ? articles.edges.map((edge) => edge.node)
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

export default Latest;
