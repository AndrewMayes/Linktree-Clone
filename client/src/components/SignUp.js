import React, { useState } from 'react';
import axios from 'axios';
import formValidation from './FormValidation';
import inputErrors from './InputErrors';

const SignUp = () => {
  
  const initialState = {
    username: '',
    password: '',
    email: ''
  };

  const [userExists, setUserExists] = useState(false);
  const [emailExists, setEmailExists] = useState(false);

  const axiosFunc = () => {
    setEmailExists(false);
    setUserExists(false);
    axios.post(`/users/register`, values )
      .then(res => {         
        // Save JWT token in localStorage
        localStorage.setItem('auth-token', res.data);

        // Redirect user to admin page
        window.location = '/admin';
      })
      .catch(err => {
        const error = err.response.data
        if (error === 'Email already exists') {
          setEmailExists(true);
        }
        if (error === 'Username already exists') {
          setUserExists(true);
        }
      })
  }

  const {handleSubmit, handleChange, values, errors, isSubmitting} = formValidation(initialState, inputErrors, axiosFunc);

  return (
    <div className="green-container">
      <div className="error-msg">
        <p>{userExists ? 'Username already exists' : ''}</p>
        <p>{emailExists ? 'Email already exists' : ''}</p>
        <p>{errors.username ? errors.username : ''}</p>
        <p>{errors.email ? errors.email : ''}</p>
        <p>{errors.password ? errors.password : ''}</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="signup-buttons">
          <input type="text" name="username" value={values.username} onChange={handleChange} placeholder={'Username'} className={errors.username ? 'user-input error-text' : 'user-input'}/>
          <input type="text" name="email" value={values.email} onChange={handleChange} placeholder={'Email'} className={errors.email ? 'user-input error-text' : 'user-input'}/>
          <input type="password" name="password" value={values.password} onChange={handleChange} placeholder={'Password'} autoComplete="password" className={errors.password ? 'user-input error-text' : 'user-input'}/>
          <button type="submit" disabled={isSubmitting} className="user-submit">Sign Up!</button>
        </div>
      </form>
    </div>
  )
}

export default SignUp