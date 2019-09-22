import React from 'react';
import NewLink from './NewLink';
import AdminHeader from './AdminHeader';
import { Link } from 'react-router-dom';

const Admin = () => {
  return (
    <>
      <AdminHeader admin={'active'}/>
      <div className="flex-container">
        <NewLink />
        {/* Temp username */}
        <Link to='/andrewm757' target="_blank" className="sign-in-button">Your Linktree</Link>
      </div>
    </>
  )
}

export default Admin
