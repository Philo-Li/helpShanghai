import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import PacmanLoader from 'react-spinners/PacmanLoader';
import useUsers from '../../hooks/useUsers';
import DiscoverAuthorList from './DiscoverAuthorList';

const override = css`
  display: flex;
  justify-content: center;
  align-item: center;
  margin: 3rem;
  margin-bottom: 6rem;
`;

const Discover = () => {
  const [allUsers, setAllUsers] = useState();
  const { users } = useUsers({
    first: 30,
  });

  useEffect(() => {
    if (users) {
      const temp = users && users.edges
        ? users.edges.map((edge) => edge.node)
        : [];

      setAllUsers(temp);
    }
  }, [users]);

  if (allUsers === undefined) {
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
        <DiscoverAuthorList allUsers={allUsers} category="nature" />
      </div>
      <div className="p-3">
        <div className="container-profile profile-item subheader">
          <p>Articles</p>
        </div>
      </div>
    </div>
  );
};

export default Discover;
