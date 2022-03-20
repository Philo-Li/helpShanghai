import React, { useState, useEffect } from 'react';
import useArticles from '../../hooks/useArticles';
import HomeArticleList from '../others/list/HomeArticleList';

const UserArticles = ({ username }) => {
  const [allArticles, setAllArticles] = useState();
  const [loading, setLoading] = useState(false);

  const userId = localStorage.getItem('waldon-userId');

  const variables = {
    username,
    checkUserLike: userId,
    checkUserCollect: userId,
    first: 20,
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
      <div className="">
        <HomeArticleList
          allArticles={allArticles}
          setAllArticles={setAllArticles}
          clickFetchMore={clickFetchMore}
          loading={loading}
          hasNextPage={hasNextPage}
        />
      </div>
    </div>
  );
};

export default UserArticles;
