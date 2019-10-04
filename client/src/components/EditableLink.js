import React from 'react';
import axios from 'axios';
import editSVG from '../imgs/edit.svg';
import ReactSVG from 'react-svg';

const EditableLink = ({ id, username, link, rerender }) => {

  const token = localStorage.getItem('auth-token');
  const config = {
    headers: {'auth-token': token}
  }

  const deleteLink = () => {
    axios.patch(`/users/${username}/link`, {_id: id}, config)
    .then(res => {
      rerender();
    })
    .catch(err => {
      console.log(err);
    })
  }

  return (
    <div className="edit-link-container">
      <span className="delete-button" onClick={deleteLink}>
        X
      </span>
      <div className="edit-linkTitle">
        {link.linkTitle}
        <span className="svg">
          <ReactSVG src={editSVG} />
        </span>
      </div>
      <div className="edit-url">
        {link.url}
      </div>
    </div>
  )
}

export default EditableLink
