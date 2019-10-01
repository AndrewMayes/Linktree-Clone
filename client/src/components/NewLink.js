import React from 'react';
import axios from 'axios';
import formValidation from './FormValidation';
import inputErrors from './InputErrors';

const NewLink = ({ username }) => {

  const initialState = {
    linkTitle: '',
    url: ''
  };

  const axiosFunc = () => {
    axios.patch(`/users/${username}`, values )
      .then(res => {
        console.log(res)
        console.log(res.data);
        // Reset to initial state
        setValues(initialState);
      })
      .catch(err => {
        console.log(err);
        alert('Something went wrong')
      })
  }

  const {handleSubmit, handleChange, values, errors, isSubmitting, setValues} = formValidation(initialState, inputErrors, axiosFunc);

  return (
    <form onSubmit={handleSubmit}>
      <div className="newlink-buttons">
        <input type="text" name="linkTitle" value={values.linkTitle} onChange={handleChange} placeholder="Title" className="user-input"/>
        {errors.linkTitle && <p className="error-text">{errors.linkTitle}</p>}
        <input type="text" name="url" value={values.url} onChange={handleChange} placeholder="URL" className="user-input"/>
        {errors.url && <p className="error-text">{errors.url}</p>}
        <button type="submit" disabled={isSubmitting} className="user-submit">Submit</button>
      </div>
    </form>
  )
}

export default NewLink
