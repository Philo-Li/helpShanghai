import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import useArticles from '../../hooks/useArticles';
import HomeArticleList from '../others/table/HomeArticleList';

const AllSOSList = () => {
  const [allArticles, setAllArticles] = useState();
  const [loading, setLoading] = useState(false);

  const variables = {
    searchKeyword: '',
    SOS: true,
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
          const address1Str = address1.join('-');
          const fullAddressStr = fullAddress.join('-');
          const createdAt = format(new Date(article.createdAt), 'yyyy-MM-dd HH:mm', { timeZone: 'Asia/Shanghai' });
          const updatedAt = format(new Date(article.updatedAt), 'yyyy-MM-dd HH:mm', { timeZone: 'Asia/Shanghai' });
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

export default AllSOSList;
