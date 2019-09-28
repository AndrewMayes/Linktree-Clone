import React from 'react';
import { Link } from 'react-router-dom';

const AdminHeader = ({ admin, settings }) => {

  const logOut = () => {
    localStorage.removeItem('auth-token');
    window.location = '/';
  }

  return (
    <nav className="admin-header">
      <Link to='/admin' className={`header-links ${admin}`}>Links</Link>
      <Link to='/settings' className={`header-links ${settings}`}>Settings</Link>
      <h1 className='header-links' onClick={logOut}>Log Out</h1>
    </nav>
  )
}

export default AdminHeader
