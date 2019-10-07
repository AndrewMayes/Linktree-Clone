import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminHeader from './AdminHeader';
import Theme from './Theme';
import avatar from '../imgs/default.png';

const Settings = ({ username }) => {

  const onClick = () => {
    console.log('clickeee');
  }

  const [newTheme, setNewTheme] = useState(0);

  const rerender = (theme) => {
    setNewTheme(theme);
  }

  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    const config = {
      headers: {'auth-token': token}
    }

    const getTheme = () => {
      axios.get(`/users/admin`, config)
        .then(res => {
          setNewTheme(res.data.theme);
        })
        .catch(err => {
          console.log(err);
        })
    }
    getTheme();
  }, [newTheme])

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
