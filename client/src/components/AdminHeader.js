import React from 'react';
import { Link } from 'react-router-dom';

const AdminHeader = ({ admin, settings }) => {
  return (
    <div className="admin-header">
      <Link to='/admin' className={`header-links ${admin}`}>Links</Link>
      <Link to='/settings' className={`header-links ${settings}`}>Settings</Link>
    </div>
  )
}

export default AdminHeader
