import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserHeader from './UserHeader';
import Link from './Link';
import ClipLoader from 'react-spinners/ClipLoader';
import UserLinkTree from './UserLinkTree';
import EditableLink from './EditableLink';
import AdminHeader from './AdminHeader';

const Edit = ({ username }) => {

  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleted, setDeleted] = useState(false);

  // This function is passed down to the EditableLink component and is called whenever a Link is deleted.
  // That forces this component to update which removes the deleted link from the ui
  const rerender = () => {
    setDeleted(!deleted);
  }

  useEffect(() => {
    const getLinks = () => {
      axios.get(`/users/${username}`)
        .then(res => {
          setLinks(res.data.links);
          setLoading(false);
        })
        .catch(err => {
          console.log(err.response);
        })
    }
    getLinks();

  }, [username, deleted]);

  return ( 
    (loading) ? <div className="loader"><ClipLoader sizeUnit={"px"} size={150} color={'rgb(31, 28, 28)'} loading={true}/></div>
    : (<>
        <AdminHeader edit={'active'}/>
        <div className="linksList">
          {(links !== []) ? (links.map(link => <EditableLink key={link._id} id={link._id} link={link} username={username} rerender={rerender}/>)) : (<h2>no links yet</h2>)}
        </div>
      </>)
  )
}

export default Edit
