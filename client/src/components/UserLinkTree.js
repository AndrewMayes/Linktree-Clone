import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserHeader from './UserHeader';
import Link from './Link';
import NotFound from './NotFound';
import ClipLoader from 'react-spinners/ClipLoader';

const UserLinkTree = (props) => {

  const [links, setLinks] = useState([]);
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const getLinks = () => {
      axios.get(`/users/${props.match.params.username}`)
        .then(res => {
          console.log(res)
          console.log(res.data.links);
          setLinks(res.data.links);
          setUsername(res.data.username);
          setLoading(false);
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
    (loading && !notFound) ? <div className="loader"><ClipLoader sizeUnit={"px"} size={150} color={'rgb(31, 28, 28)'} loading={true}/></div>
    : (notFound) ? <NotFound /> 
    : (<>
        <UserHeader username={username}/>
        <div className="linksList">
          {(links !== []) ? (links.map(link => <Link key={link._id} link={link}/>)) : (<h2>no links yet</h2>)}
        </div>
      </>)
  )
}

export default UserLinkTree
