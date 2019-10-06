import React, { useState } from 'react';
import AdminHeader from './AdminHeader';
import Theme from './Theme';
import avatar from '../imgs/default.png';

const Settings = ({ username, activeTheme }) => {

  const onClick = () => {
    console.log('clickeee');
  }

  const [newTheme, setNewTheme] = useState(activeTheme);

  const rerender = (theme) => {
    setNewTheme(theme);
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
            <Theme activeTheme={newTheme} username={username} theme={1} rerender={rerender}/>
            <Theme activeTheme={newTheme} username={username} theme={2} rerender={rerender}/>
            <Theme activeTheme={newTheme} username={username} theme={3} rerender={rerender}/>
            <Theme activeTheme={newTheme} username={username} theme={4} rerender={rerender}/>
            <Theme activeTheme={newTheme} username={username} theme={5} rerender={rerender}/>
            <Theme activeTheme={newTheme} username={username} theme={6} rerender={rerender}/>
            <Theme activeTheme={newTheme} username={username} theme={7} rerender={rerender}/>
            <Theme activeTheme={newTheme} username={username} theme={8} rerender={rerender}/>
          </div>
        </div>
      </div>
    </>
  )
}

export default Settings
