import React from 'react';

const UserHeader = ({ username, avatar }) => {
  return (
    <header className="userContainer">
      <img className="avatarStyle" src={avatar} alt="user avatar"/>
      <h2>{`@${username}`}</h2>
    </header>
  )
}

export default UserHeader
