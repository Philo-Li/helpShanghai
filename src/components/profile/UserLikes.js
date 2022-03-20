import React, { useState, useEffect } from 'react';
import useUserLikes from '../../hooks/useUserLikes';
import HomeArticleList from '../others/list/HomeArticleList';

const UserLikes = ({ username }) => {
  const [allArticles, setAllArticles] = useState();
  const [loading, setLoading] = useState(false);
  const userId = localStorage.getItem('userId');

  const variables = {
    username,
    checkUserLike: userId,
    first: 15,
  };

  const { likes, fetchMore, hasNextPage } = useUserLikes(variables);

  useEffect(() => {
    if (likes) {
      const temp = likes && likes.edges
        ? likes.edges.map((edge) => edge.node.article)
        : [];

      setAllArticles(temp);
      setLoading(false);
    }
  }, [likes]);

  const clickFetchMore = () => {
    fetchMore();
    setLoading(true);
  };

  return (
    <div className="p-3">
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

export default UserLikes;
