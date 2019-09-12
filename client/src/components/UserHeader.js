import React from 'react';
import avatar from '../imgs/default.png';

const UserHeader = () => {
  return (
    <div className="userContainer">
      <img className="avatarStyle" src={avatar} alt="user avatar"/>
      <h2>@user123</h2>
    </div>
  )
}

export default UserHeader
