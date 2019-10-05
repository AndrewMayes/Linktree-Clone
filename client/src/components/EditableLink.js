import React, { useState } from 'react';
import axios from 'axios';
import formValidation from './FormValidation';
import inputErrors from './InputErrors';
import editSVG from '../imgs/edit.svg';
import deleteSVG from '../imgs/trash.svg';
import ReactSVG from 'react-svg';

const EditableLink = ({ id, username, link, rerender }) => {

  const initialState = {
    _id: id,
    linkTitle: link.linkTitle,
    url: link.url
  };

  const token = localStorage.getItem('auth-token');
  const config = {
    headers: {'auth-token': token}
  }

  const [editTitle, setEditTitle] = useState(false);
  const [editURL, setEditURL] = useState(false);

  const axiosFunc = () => {
    axios.patch(`/users/${username}/editlink`, values, config)
      .then(res => {
        if (editTitle === true) {
          toggleEditTitle();
        }
        if (editURL === true) {
          toggleEditURL();
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  const {handleSubmit, handleChange, values, errors} = formValidation(initialState, inputErrors, axiosFunc);

  const deleteLink = () => {
    axios.patch(`/users/${username}/deletelink`, {_id: id}, config)
    .then(res => {
      rerender();
    })
    .catch(err => {
      console.log(err);
    })
  }

  const toggleEditTitle = () => {
    setEditTitle(!editTitle);
  }

  const toggleEditURL = () => {
    setEditURL(!editURL);
  }

  return (
    <div className="edit-link-container">
      <span className="delete-button" onClick={deleteLink}>
        <ReactSVG src={deleteSVG} />
      </span>
      <div className="edit-linkTitle">
        <div className="edit-linkTitle-wrap">
          {(editTitle) ? 
            <form onSubmit={handleSubmit}>
              <div>
                <input type="text" name="linkTitle" value={values.linkTitle} onChange={handleChange} autoFocus="autofocus" onBlur={handleSubmit} placeholder={'Title'} className={errors.linkTitle ? 'error-url-text' : 'edit-link-input'}/>
              </div>
            </form> 
            : values.linkTitle}
        </div>
        <span className="edit-button" onClick={toggleEditTitle}>
          {(editTitle) ? '' : <ReactSVG src={editSVG} />}
        </span>
      </div>
      <div className="edit-url">
        <div className="edit-url-wrap">
          {(editURL) ? 
            <form onSubmit={handleSubmit}>
              <div>
                <input type="text" name="url" value={values.url} onChange={handleChange} autoFocus="autofocus" onBlur={handleSubmit} placeholder={'URL'} className={errors.url ? 'error-url-text' : 'edit-link-input'}/>
              </div>
            </form> 
          : values.url}
        </div>
        <span className="edit-button" onClick={toggleEditURL}>
          {(editURL) ? '' : <ReactSVG src={editSVG} />}
        </span>
      </div>
    </div>
  )
}

export default EditableLink
