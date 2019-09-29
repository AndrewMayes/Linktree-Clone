import React from 'react';
import AdminHeader from './AdminHeader';
import avatar from '../imgs/default.png';
import AvatarComponent from './AvatarComponent'

const Settings = () => {

  const onClick = () => {
    console.log('clickeee');
  }

  return (
    <>
      <AdminHeader settings={'active'}/>
      <div className="settings-container">
        <div className="avatar-container">
          <div className="avatar">
            <input type="image" src={avatar} name="change-avatar" className="change-avatar-style" onClick={onClick}/>
            {/*<AvatarComponent />*/}
          </div>
          <div className="avatar-form">
            <div className="remove-button" onClick={onClick}>Remove</div>
          </div>
        </div>
        <div className="color-div">
          temp
        </div>
      </div>
    </>
  )
}

export default Settings
