/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import useUser from '../../hooks/useUser';
import useFollowUser from '../../hooks/useFollowUser';
import useUnfollowUser from '../../hooks/useUnfollowUser';

// const initProfileImage = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';

const ProfileDetailCard = ({ profileImage, userNow }) => {
  const a = 1;
  return (
    <div className="p-3">
      <div className="container-profile">
        <div className="profile-item">
          <Image src={profileImage} width={80} height={80} magin={10} roundedCircle />
        </div>
        <div className="profile-item">
          <h3>{userNow && `${userNow.firstName} ${userNow.lastName || ''}`}</h3>
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
      </div>
    </div>
  );
};

export default ProfileDetailCard;
