import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import PacmanLoader from 'react-spinners/PacmanLoader';
import DiscoverCollectionList from './DiscoverCollectionList';
import config from '../../config';
import useDiscoverCollections from '../../hooks/useDiscoverCollections';

const override = css`
  display: flex;
  justify-content: center;
  align-item: center;
  margin: 3rem;
  margin-bottom: 6rem;
`;

// const CATEGORY = ['mood', 'animals', 'light', 'nature', 'human', 'road', 'food'];

const Discover = () => {
  const [allCollections, setAllCollections] = useState();
  const { collections } = useDiscoverCollections({
    username: config.pickyAdmin,
    first: 30,
  });

  useEffect(() => {
    if (collections) {
      const temp = collections && collections.edges
        ? collections.edges.map((edge) => edge.node)
        : [];

      setAllCollections(temp);
    }
  }, [collections]);

  if (allCollections === undefined) {
    return (
      <div className="discover">
        <div className="p-3 container-profile">
          <div className="profile-item">
            <p className="header">Discover</p>
          </div>
        </div>
        <div className="col-item-3">
          <PacmanLoader color="#9B9B9B" loading css={override} size={50} />
        </div>
      </div>
    );
  }

  return (
    <div className="p-3 discover">
      <div className="p-3 container-profile">
        <div className="profile-item">
          <p className="header">Discover</p>
        </div>
      </div>
      <div className="p-3">
        <div className="container-profile profile-item subheader">
          <p>Authors</p>
        </div>
        <DiscoverCollectionList allCollections={allCollections} category="nature" />
      </div>
      <div className="p-3">
        <div className="container-profile profile-item subheader">
          <p>Articles</p>
        </div>
        <DiscoverCollectionList allCollections={allCollections} category="human" />
      </div>
    </div>
  );
};

export default Discover;
