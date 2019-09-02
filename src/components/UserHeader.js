import React from 'react';
import avatar from '../imgs/default.png';

const UserHeader = () => {

  const avatarStyle = {
    borderRadius: '50%',
    width: '90px',
    height: '90px'
  }

  const userContainer = {
    textAlign: 'center',
    fontSize: '12px',
    margin: '30px'
  }

  return (
    <div style={userContainer}>
      <img style={avatarStyle} src={avatar} alt="user avatar"/>
      <h2>@user123</h2>
    </div>
  )
}

export default UserHeader
