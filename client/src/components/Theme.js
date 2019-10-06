import React from 'react';
import axios from 'axios';
import '../themes.css';

const Theme = ({ activeTheme, username, theme, rerender }) => {

  const token = localStorage.getItem('auth-token');
  const config = {
    headers: {'auth-token': token}
  }

  const submit = () => {
    axios.patch(`/users/${username}/theme`, {theme}, config)
    .then(res => {
      rerender(theme);
      console.log('reredner pls')
    })
    .catch(err => {
      console.log(err);
    })
  }

  const isActive = () => {
    if (activeTheme === theme) {
      return 'active-theme';
    }
    return '';
  }

  return (
    <div className={`box ${isActive()}`} onClick={submit}>
      <div className={`theme-${theme}-thumb`}>
        <span className="dot">
        </span>
      </div>
    </div>
  )
}

export default Theme
