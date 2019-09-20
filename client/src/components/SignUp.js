import React, { useReducer } from 'react';
import axios from 'axios';

const SignUp = () => {
  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      username: '',
      email: '',
      password: ''
    }
  );

  const onSubmit = e => {
    e.preventDefault();
    
    const signupInfo = {
      "username": userInput.username,
      "password": userInput.password,
      "email": userInput.email
    }
    const signup = () => {
      axios.post(`/users/`, signupInfo )
        .then(res => {
          console.log(res)
          console.log(res.data);
          //window.location = `/${res.data.user.username}`;
          window.location = '/admin';
        })
        .catch(err => {
          console.log(err);
          alert('Please enter all fields')
        })
    }
    signup();

    setUserInput({username: '', email: '', password: ''});
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
          <input type="text" name="email" value={userInput.email} onChange={onChange} placeholder="Email" className="user-input"/>
          <input type="password" name="password" value={userInput.password} onChange={onChange} placeholder="Password" autoComplete="password" className="user-input"/>
          <button type="submit" disabled={!userInput.username || !userInput.email || !userInput.password}>Sign Up!</button>
        </form>
      </div>
    </div>
  )
}

export default SignUp