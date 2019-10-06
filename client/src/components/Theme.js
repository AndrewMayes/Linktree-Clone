import React, { useState } from 'react';
import axios from 'axios';
import formValidation from './FormValidation';
import inputErrors from './InputErrors';

const Theme = ({ isActive, username, theme }) => {

  const token = localStorage.getItem('auth-token');
  const config = {
    headers: {'auth-token': token}
  }

  const submit = () => {
    axios.patch(`/users/${username}/theme`, {theme}, config)
    .then(res => {

    })
    .catch(err => {
      console.log(err);
    })
  }

  return (
    <div className={`box ${isActive()}`} onClick={submit}>
      <div className="theme">
        {theme}
      </div>
    </div>
  )
}

export default Theme
