import React, { useState, useEffect } from 'react';
import NewLink from './NewLink';
import AdminHeader from './AdminHeader';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';

const Admin = () => {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    const config = {
      headers: {'auth-token': token}
    }

    const getName = () => {
      axios.get(`/users/admin`, config)
        .then(res => {
          setUsername(res.data.username);
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
        })
    }
    getName();
  }, [username]);
  
  return (loading) ? <div className="loader"><ClipLoader sizeUnit={"px"} size={150} color={'rgb(31, 28, 28)'} loading={true}/></div> :
    (<>
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
