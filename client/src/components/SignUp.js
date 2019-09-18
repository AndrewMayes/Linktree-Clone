import React, { useReducer } from 'react';

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
    console.log('signup submited!');

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