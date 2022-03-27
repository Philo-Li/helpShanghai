import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import useUser from '../../hooks/useUser';
import useFollowUser from '../../hooks/useFollowUser';
import useUnfollowUser from '../../hooks/useUnfollowUser';

// const initProfileImage = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';

const ProfileDetailCard = ({ profileImage, userNow }) => {
  const [followUser] = useFollowUser();
  const [unfollowUser] = useUnfollowUser();
  const [follow, setFollow] = useState(false);
  const userId = localStorage.getItem('userId');

  const history = useHistory();
  let { username } = useParams();
  username = username.substr(1, username.length - 1);

  let variables;

  if (userId) variables = { username, checkUserFollow: userId };
  else variables = { username };

  const { user } = useUser(variables);

  useEffect(() => {
    if (user) {
      setFollow(user.isFollowed);
    }
  }, [user]);

  const handleFollowUser = async () => {
    if (!userId) {
      history.push('/signin');
    } else {
      setFollow(!follow);
      if (userNow.isFollowed) {
        await unfollowUser({ userId: userNow.id });
      } else {
        await followUser({ userId: userNow.id });
      }
    }
  };

  const isFollowDisabled = userNow && userId === userNow.id;

  return (
    <div className="p-3">
      <div className="container-profile">
        <div className="profile-item">
          <Image src={profileImage} width={100} height={100} magin={10} roundedCircle />
        </div>
        <div className="profile-item">
          <h1>{userNow && `${userNow.firstName} ${userNow.lastName || ''}`}</h1>
        </div>
      </div>
      {userNow && userNow.description && (
        <div className="container-profile">
          <div className="user-description">{userNow.description}</div>
        </div>
      )}
      <div className="container-profile">
        <div className="profile-item">
          {`${userNow ? userNow.articleCount : 0} articles`}
        </div>
        {/* <div className="profile-item">
          {`${userNow ? userNow.followingCount : 0} followings`}
        </div> */}
        <div className="profile-item">
          {`${userNow ? userNow.followerCount : 0} followers`}
        </div>
        <div className="profile-item">
          {follow && (
            <button className="button-unfollow" type="button" onClick={handleFollowUser} disabled={isFollowDisabled}>
              Unfollow
            </button>
          )}
          {!follow && (
            <button className="button-follow" type="button" onClick={handleFollowUser} disabled={isFollowDisabled}>
              Follow
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileDetailCard;
