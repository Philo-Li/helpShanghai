import React from 'react';
import { useHistory } from 'react-router-dom';
import Masonry from 'react-masonry-css';
import { nanoid } from 'nanoid';
import LoadMore from '../button/LoadMore';
import useLikeArticle from '../../../hooks/useLikeArticle';
import ArticleCard from '../article-card/ArticleCard';
import useUnlikeArticle from '../../../hooks/useUnlikeArticle';

const breakpointColumnsObj = {
  default: 3,
  1000: 2,
  500: 1,
};

const breakpointColumnsObj2 = {
  default: 3,
  1000: 2,
  500: 1,
};

const HomeArticleListContainer = ({
  allArticles, setAllArticles, clickFetchMore, loading, column, hasNextPage,
}) => {
  const [likeArticle] = useLikeArticle();
  const [unlikeArticle] = useUnlikeArticle();
  const history = useHistory();
  const token = localStorage.getItem('token');

  const likeSingleArticle = async (article) => {
    if (!token) {
      history.push('/signin');
    } else {
      const temp = allArticles
        .map((obj) => (obj.id === article.id ? { ...obj, isLiked: !obj.isLiked } : obj));
      setAllArticles(temp);
      if (article.isLiked) {
        await unlikeArticle({ articleId: article.id });
      } else {
        await likeArticle({ articleId: article.id });
      }
    }
  };

  return (
    <div className="p-3 article-list-container">
      <div className="">
        <Masonry
          breakpointCols={column === 'collection' ? breakpointColumnsObj2 : breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {allArticles.map((article) => (
            <div key={nanoid()}>
              <ArticleCard
                article={article}
                likeSingleArticle={likeSingleArticle}
              />
            </div>
          ))}
        </Masonry>
      </div>
      <LoadMore
        hasNextPage={hasNextPage}
        loading={loading}
        clickFetchMore={clickFetchMore}
      />
    </div>
  );
};

export default HomeArticleListContainer;
