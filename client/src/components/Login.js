import React, { useReducer } from 'react';

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
    console.log('signup submited!');
    
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