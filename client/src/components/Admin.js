import React from 'react';
import NewLink from './NewLink';
import AdminHeader from './AdminHeader';

const Admin = () => {
  return (
    <>
      <AdminHeader />
      <div className="flex-container">
        <NewLink />
      </div>
    </>
  )
}

export default Admin
