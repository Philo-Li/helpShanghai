import React from 'react';
import { Image } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Masonry from 'react-masonry-css';

const breakpointColumnsObj = {
  default: 3,
  800: 2,
  500: 1,
};

// const INIT_COVER = galleryIcon;

const DiscoverAuthorList = ({ allUsers }) => {
  const collectionsToShow = allUsers;

  const history = useHistory();
  if (!collectionsToShow) {
    return (
      <div className="col-item-3">
        <h3>No result</h3>
      </div>
    );
  }

  // eslint-disable-next-line no-unused-vars
  const openCollection = (collection) => {
    history.push(`/collection/${collection.id}`);
  };

  const initProfileImage = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';

  return (
    <div className="p-3">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {collectionsToShow.map((user) => (
          <a href={`/@${user.username}`} key={user.username}>
            <div className="container-profile">
              <div className="profile-item" key={`${user.username}-avatar`}>
                <Image
                  src={user.profileImage || initProfileImage}
                  width={100}
                  height={100}
                  magin={10}
                  roundedCircle
                />
              </div>
              <div className="profile-item" key={`${user.username}-name`}>
                <h1>{`${user.firstName}`}</h1>
                {user.lastName && ` ${user.lastName}`}
              </div>
            </div>
          </a>
        ))}
      </Masonry>
    </div>
  );
};

export default DiscoverAuthorList;
