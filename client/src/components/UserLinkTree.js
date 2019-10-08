import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserHeader from './UserHeader';
import Link from './Link';
import NotFound from './NotFound';
import ClipLoader from 'react-spinners/ClipLoader';
import '../themes.css';

const UserLinkTree = (props) => {

  const [links, setLinks] = useState([]);
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [theme, setTheme] = useState(1);
  //const [avatar, setAvatar] = useState(avatar);
  const [userAvatar, setUserAvatar] = useState('');

  useEffect(() => {
    const getLinks = () => {
      axios.get(`/users/${props.match.params.username}`)
        .then(res => {
          setLinks(res.data.links);
          setUsername(res.data.username);
          setTheme(res.data.theme);
          setLoading(false);
          setUserAvatar(res.data.avatar);
        })
        .catch(err => {
          console.log(err.response);
          setNotFound(true);
        })
    }
    getLinks();

  }, [props.match.params.username]);


  // Return loading UI while waiting for GET request, then load user's page once the request goes through.
  // Return NotFound component if GET request does not find the searched username
  return ( 
    (loading && !notFound) ? <div className="green-container"><div className="loader"><ClipLoader sizeUnit={"px"} size={150} color={'rgb(31, 28, 28)'} loading={true}/></div></div>
    : (notFound) ? <NotFound /> 
    : (<div className={(theme === 1) ? 'green-container' : `theme-${theme}`}>
        <UserHeader username={username} avatar={userAvatar}/>
        <div className="linksList">
          {(links.length > 0) ? (links.map(link => <Link key={link._id} link={link}/>)) : (<h1 className="empty-linktree">User's Linktree is empty!</h1>)}
        </div>
      </div>)
  )
}

export default UserLinkTree
