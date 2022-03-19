import React from 'react';
import { useHistory } from 'react-router-dom';
import Masonry from 'react-masonry-css';
import { nanoid } from 'nanoid';
import LoadMore from '../button/LoadMore';
import useLikeArticle from '../../../hooks/useLikeArticle';
import PhotoCard from '../photo-card/PhotoCard';
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
  const token = localStorage.getItem('philoart-token');

  const likeSingleArticle = async (photo) => {
    if (!token) {
      history.push('/signin');
    } else {
      const temp = allArticles
        .map((obj) => (obj.id === photo.id ? { ...obj, isLiked: !obj.isLiked } : obj));
      setAllArticles(temp);
      if (photo.isLiked) {
        await unlikeArticle({ photoId: photo.id });
      } else {
        await likeArticle({ photoId: photo.id });
      }
    }
  };

  return (
    <div className="p-3 photo-list-container">
      <div className="">
        <Masonry
          breakpointCols={column === 'collection' ? breakpointColumnsObj2 : breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {allArticles.map((photo) => (
            <div key={nanoid()}>
              <PhotoCard
                photo={photo}
                likeSinglePhoto={likeSingleArticle}
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
