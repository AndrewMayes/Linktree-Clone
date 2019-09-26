import React, { useState, useEffect } from 'react';
import NewLink from './NewLink';
import AdminHeader from './AdminHeader';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';

const Admin = () => {
  const token = localStorage.getItem('auth-token');
  const config = {
    headers: {'auth-token': token}
  }
  const [username, setUsername] = useState('Andy');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getName = () => {
      axios.get(`/users/auth`, config)
        .then(res => {
          setUsername(res.data.username);
          console.log(res);
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
        })
    }
    getName();
  }, [username]);
  
  return (
    <>
      <AdminHeader admin={'active'}/>
      <h1>{`Hi ${username}!`}</h1>
      <div className="flex-container">
        <NewLink username={username}/>
        <Link to={`/${username}`} target="_blank" className="sign-in-button">Your Linktree</Link>
      </div>
    </>
  )
}

export default Admin
