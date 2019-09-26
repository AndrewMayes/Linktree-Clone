import React, { useReducer } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

const Login = () => {
  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      username: '',
      password: ''
    }
  );

  const onSubmit = e => {
    e.preventDefault();
    
    const loginInfo = {
      "username": userInput.username,
      "password": userInput.password
    }
    const login = () => {
      axios.post(`/users/auth`, loginInfo )
        .then(res => {
          console.log(res)
          console.log(res.data);

          // Save JWT token in localStorage
          localStorage.setItem('auth-token', res.data);

          // Redirect user to admin page
          window.location = '/admin';
        })
        .catch(err => {
          console.log(err);
          alert('Credentials do not match our records')
        })
    }
    login();
    setUserInput({username: '', password: ''});
  }

  const onChange = e => {
    const {name, value} = e.target;

    setUserInput({[name]: value});

  }

  return (
    <div className="container">
      <div className="buttons">
        <form onSubmit={onSubmit}>
          <input type="text" name="username" value={userInput.username} onChange={onChange} placeholder="Username" className="user-input"/>
          <input type="password" name="password" value={userInput.password} onChange={onChange} placeholder="Password" autoComplete="password" className="user-input"/>
          <button type="submit" disabled={!userInput.username || !userInput.password}>Login!</button>
        </form>
      </div>
    </div>
  )
}

export default Login