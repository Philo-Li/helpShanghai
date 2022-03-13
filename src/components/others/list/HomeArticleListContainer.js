import React from 'react';
import { useHistory } from 'react-router-dom';
import Masonry from 'react-masonry-css';
import { nanoid } from 'nanoid';
import LoadMore from '../button/LoadMore';
import useLikePhoto from '../../../hooks/useLikePhoto';
import PhotoCard from '../photo-card/PhotoCard';
import useUnlikePhoto from '../../../hooks/useUnlikePhoto';

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
  const [likePhoto] = useLikePhoto();
  const [unlikePhoto] = useUnlikePhoto();
  const history = useHistory();
  const token = localStorage.getItem('philoart-token');

  const likeSinglePhoto = async (photo) => {
    if (!token) {
      history.push('/signin');
    } else {
      const temp = allArticles
        .map((obj) => (obj.id === photo.id ? { ...obj, isLiked: !obj.isLiked } : obj));
      setAllArticles(temp);
      if (photo.isLiked) {
        await unlikePhoto({ photoId: photo.id });
      } else {
        await likePhoto({ photoId: photo.id });
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
                likeSinglePhoto={likeSinglePhoto}
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
