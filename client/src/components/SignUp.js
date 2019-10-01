import React from 'react';
import axios from 'axios';
import formValidation from './FormValidation';
import inputErrors from './InputErrors';

const SignUp = () => {
  
  const initialState = {
    username: '',
    password: '',
    email: ''
  };

  const axiosFunc = () => {
    axios.post(`/users/`, values )
      .then(res => {         
        // Save JWT token in localStorage
        localStorage.setItem('auth-token', res.data);

        // Redirect user to admin page
        window.location = '/admin';
      })
      .catch(err => {
        console.log(err);
        alert('Please enter all fields')
      })
  }

  const {handleSubmit, handleChange, values, errors, isSubmitting} = formValidation(initialState, inputErrors, axiosFunc);

  return (
    <form onSubmit={handleSubmit}>
      <div className="signup-buttons">
        <input type="text" name="username" value={values.username} onChange={handleChange} placeholder="Username" className="user-input"/>
        {errors.username && <p className="error-text">{errors.username}</p>}
        <input type="text" name="email" value={values.email} onChange={handleChange} placeholder="Email" className="user-input"/>
        {errors.email && <p className="error-text">{errors.email}</p>}
        <input type="password" name="password" value={values.password} onChange={handleChange} placeholder="Password" autoComplete="password" className="user-input"/>
        {errors.password && <p className="error-text">{errors.password}</p>}
        <button type="submit" disabled={isSubmitting} className="user-submit">Sign Up!</button>
      </div>
    </form>
  )
}

export default SignUp