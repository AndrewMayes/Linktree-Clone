import React from 'react';
import NewLink from './NewLink';
import AdminHeader from './AdminHeader';
import { Link } from 'react-router-dom';

const Admin = ({ username }) => {
  return (
    <>
      <AdminHeader admin={'active'}/>
      <div>
        
      </div>
      <div className="flex-container">
        <NewLink username={username}/>
        <Link to={`/${username}`} target="_blank" className="sign-in-button">{username}'s Linktree</Link>
      </div>
    </>) 
}

export default Admin
