import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import useArticles from '../../hooks/useArticles';
import HomeArticleList from '../others/table/HomeArticleList';

const AllEmergencyList = () => {
  const [allArticles, setAllArticles] = useState();
  const [loading, setLoading] = useState(false);

  const variables = {
    searchKeyword: '',
    urgent: true,
    orderDirection: 'DESC',
    first: 30,
  };

  const { articles, fetchMore, hasNextPage } = useArticles(variables);

  useEffect(async () => {
    if (articles) {
      const temp = articles && articles.edges
        ? articles.edges.map((edge) => {
          const article = edge.node;
          const fullAddress = JSON.parse(article.fullAddress);
          const address1 = JSON.parse(article.address1);
          const address1Str = address1 && address1.join('-');
          const fullAddressStr = fullAddress && fullAddress.join('-');
          const createdAt = format(new Date(article.createdAt), 'PPpp');
          const updatedAt = format(new Date(article.updatedAt), 'PPpp');
          const updatedArticle = {
            ...article,
            fullAddress: fullAddressStr,
            address1: address1Str,
            createdAt,
            updatedAt,
          };
          return updatedArticle;
        })
        : [];

      const temp2 = temp.filter((item) => item.id !== 'uS-6emdcWD');

      setAllArticles(temp2);
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

export default AllEmergencyList;
