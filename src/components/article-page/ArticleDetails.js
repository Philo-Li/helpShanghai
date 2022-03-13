import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useArticle from '../../hooks/useArticle';
import ArticleDetailsContainer from './ArticleDetailsContainer';

const ArticleDetails = () => {
  const [articleToShow, setArticleToShow] = useState();
  const { id } = useParams();
  const userId = localStorage.getItem('philoart-userId');

  const { article } = useArticle({
    id,
    checkUserLike: userId,
  });

  useEffect(() => {
    if (article) {
      const content = JSON.parse(article.content);
      setArticleToShow({ ...article, content });
    }
  }, [article]);

  return (
    <div>
      <ArticleDetailsContainer
        articleToShow={articleToShow}
        setArticleToShow={setArticleToShow}
      />
    </div>
  );
};

export default ArticleDetails;
