import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const authedFooter = () => {
    const isAuth = localStorage.getItem('auth-token');
    if (isAuth) return <Link to='/admin'>linktree-clone</Link>

    return <Link to='/'>linktree-clone</Link>
  }
  return (
    <div>
      <h1 className="footer">
        {authedFooter()}
      </h1>
    </div>
  )
}

export default Footer
