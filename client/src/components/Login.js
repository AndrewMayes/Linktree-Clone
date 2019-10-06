import React, { useState } from 'react';
import axios from 'axios';
import formValidation from './FormValidation';
import inputErrors from './InputErrors';

const Login = () => {

  const initialState = {
    username: '',
    password: ''
  };

  const [userNotFound, setUserNotFound] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);

  const axiosFunc = () => {
    setUserNotFound(false);
    setWrongPassword(false);
    axios.post(`/users/login`, values )
      .then(res => {
        // Save JWT token in localStorage
        localStorage.setItem('auth-token', res.data);

        // Redirect user to admin page
        window.location = '/admin';
      })
      .catch(err => {
        const error = err.response.data
        if (error === 'Username/Email not found') {
          setUserNotFound(true);
        }
        if (error === 'Invalid password') {
          setWrongPassword(true);
        }
      })
  }

  const {handleSubmit, handleChange, values, errors, isSubmitting} = formValidation(initialState, inputErrors, axiosFunc);

  return (
    <div className="green-container">
      <div className="error-msg">
        <p>{userNotFound ? 'Username/Email not found' : ''}</p>
        <p>{wrongPassword ? 'Invalid Password' : ''}</p>
        <p>{errors.username ? 'Required Username/Email.' : ''}</p>
        <p>{errors.password ? errors.password : ''}</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="login-buttons">
          <input type="text" name="username" value={values.username} onChange={handleChange} placeholder={'Username or Email'} className={errors.username ? 'user-input error-text' : 'user-input'}/>
          <input type="password" name="password" value={values.password} onChange={handleChange} placeholder={'Password'} autoComplete="password" className={errors.password ? 'user-input error-text' : 'user-input'}/>
          <button type="submit" disabled={isSubmitting} className="user-submit">Login!</button>
        </div>
      </form>
    </div>
  )
}

export default Login