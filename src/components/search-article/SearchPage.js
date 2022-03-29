import React, { useState, useEffect } from 'react';
import { useLocation, withRouter } from 'react-router-dom';
import queryString from 'query-string';
import { css } from '@emotion/react';
import BeatLoader from 'react-spinners/BeatLoader';
import useArticles from '../../hooks/useArticles';
import HomeArticleList from '../others/list/HomeArticleList';
import ArticleRelatedTagBar from '../others/ArticleRelatedTagBar';
import NavSearchBar from '../others/NavSearchBar';

const override = css`
  display: flex;
  justify-content: center;
  align-item: center;
  margin-top: 3rem;
`;

const SearchPage = () => {
  const [allArticles, setAllArticles] = useState();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const parsed = queryString.parse(location.search);
  const userId = localStorage.getItem('userId');

  const variables = {
    searchKeyword: parsed.q,
    checkUserLike: userId,
    first: 20,
  };

  const { articles, fetchMore, hasNextPage } = useArticles(variables);

  useEffect(() => {
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
      <div className="p-3 container-profile">
        <div className="profile-item">
          <h3>Search:</h3>
        </div>
        <div className="container-row-searchpage-searchbox">
          <NavSearchBar placeholder={parsed.q} searchRange="picky" />
        </div>
      </div>
      <ArticleRelatedTagBar allArticles={allArticles} />
      { !articles && allArticles && (<BeatLoader color="#9B9B9B" loading css={override} size={50} />) }
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

export default withRouter(SearchPage);
