import React from 'react';
import Link from './Link';
import AdminHeader from './AdminHeader';

const Edit = ({ username }) => {

  // Return loading UI while waiting for GET request, then load user's page once the request goes through.
  // Return NotFound component if GET request does not find the searched username
  return (<>
        <AdminHeader edit={'active'} />
        <h1>{username}</h1>
      </>)
}

export default Edit
