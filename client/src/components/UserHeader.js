import React from 'react';
import avatar from '../imgs/default.png';

const UserHeader = ({ username }) => {
  return (
    <div className="userContainer">
      <img className="avatarStyle" src={avatar} alt="user avatar"/>
      <h2>{`@${username}`}</h2>
    </div>
  )
}

export default UserHeader
