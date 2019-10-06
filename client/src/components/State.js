import React, { useState, useEffect } from 'react';
import Admin from './Admin';
import Edit from './Edit';
import axios from 'axios';
import ClipLoader from 'react-spinners/ClipLoader';
import Settings from './Settings';

const State = ({ component }) => {

  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(1);

  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    const config = {
      headers: {'auth-token': token}
    }

    const getName = () => {
      axios.get(`/users/admin`, config)
        .then(res => {
          setUsername(res.data.username);
          setTheme(res.data.theme);
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
      case 'settings':
        return <Settings username={username} activeTheme={theme} />
      default:
        return null;
    }
  }

  return (loading) ? <div className="green-container"><div className="loader"><ClipLoader sizeUnit={"px"} size={150} color={'rgb(31, 28, 28)'} loading={true}/></div></div> :
  (
    <div className="green-container">
      {toggle(component)}
    </div>
  )
}

export default State
