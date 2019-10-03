import React, { useState, useEffect } from 'react';
import Admin from './Admin';
import Edit from './Edit';
import axios from 'axios';
import ClipLoader from 'react-spinners/ClipLoader';

const State = ({ component }) => {

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

  const toggle = (component) => {
    switch (component) {
      case 'admin':
        return <Admin username={username} />
      case 'edit':
        return <Edit username={username} />
      default:
        return null;
    }
  }

  return (loading) ? <div className="loader"><ClipLoader sizeUnit={"px"} size={150} color={'rgb(31, 28, 28)'} loading={true}/></div> :
  (
    <div>
      {toggle(component)}
    </div>
  )
}

export default State
