import React, { useState } from 'react';
import axios from 'axios';
import formValidation from './FormValidation';
import inputErrors from './InputErrors';

const NewLink = ({ username }) => {

  const initialState = {
    linkTitle: '',
    url: ''
  };

  const token = localStorage.getItem('auth-token');
  const config = {
    headers: {'auth-token': token}
  }

  const [added, setAdded] = useState(false);

  const axiosFunc = () => {
    setAdded(false);
    axios.patch(`/users/${username}`, values, config)
      .then(res => {
        // Reset to initial state
        setValues(initialState);

        setAdded(true);

        // Notify user that post was successful, then removes the notification after 3 sec
        setTimeout(() => setAdded(false), 1500);
      })
      .catch(err => {
        console.log(err);
      })
  }

  const {handleSubmit, handleChange, values, errors, isSubmitting, setValues} = formValidation(initialState, inputErrors, axiosFunc);

  return (
    <>
      <div className="link-error-msg">
        <p id="added">{added ? 'New Link Added To Your Linktree!' : ''}</p>
        <p>{errors.linkTitle ? errors.linkTitle : ''}</p>
        <p>{errors.url ? errors.url : ''}</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="newlink-buttons">
          <input type="text" name="linkTitle" value={values.linkTitle} onChange={handleChange} placeholder={'Title'} className={errors.linkTitle ? 'user-input error-text' : 'user-input'}/>
          <input type="text" name="url" value={values.url} onChange={handleChange} placeholder={'URL'} className={errors.url ? 'user-input error-text' : 'user-input'}/>
          <button type="submit" disabled={isSubmitting} className="user-submit">Submit</button>
        </div>
      </form>
    </>
  )
}

export default NewLink
