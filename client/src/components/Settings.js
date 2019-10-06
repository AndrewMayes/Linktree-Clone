import React, { useState } from 'react';
import AdminHeader from './AdminHeader';
import Theme from './Theme';
import avatar from '../imgs/default.png';

const Settings = ({ username }) => {

  const onClick = () => {
    console.log('clickeee');
  }

  const [active, setActive] = useState(false);

  const isActive = () => {
    //setActive(!active);
    return 'active';
  }

  return (
    <>
      <AdminHeader settings={'active'}/>
      <div className="settings-container">
        <div className="avatar-container">
          <div className="avatar">
            <input type="image" alt="avatar" src={avatar} name="change-avatar" className="change-avatar-style" onClick={onClick}/>
          </div>
          <div className="avatar-form">
            <div className="remove-button" onClick={onClick}>Remove</div>
          </div>
        </div>
        <div className="color-container">
          <h5>Theme</h5>
          <div className="themes-container">
            <Theme isActive={isActive} username={username} theme={1}/>
            <Theme isActive={isActive} username={username} theme={2}/>
            <Theme isActive={isActive} username={username} theme={3}/>
            <Theme isActive={isActive} username={username} theme={4}/>
            <Theme isActive={isActive} username={username} theme={5}/>
            <Theme isActive={isActive} username={username} theme={6}/>
            <Theme isActive={isActive} username={username} theme={7}/>
            <Theme isActive={isActive} username={username} theme={8}/>
          </div>
        </div>
      </div>
    </>
  )
}

export default Settings
