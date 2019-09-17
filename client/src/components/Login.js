import React from 'react';

const Login = () => {
  return (
    <div className="buttons">
      <form>
        <input type="text" placeholder="Enter username or email"/>
        <button type="submit">Login!</button>
      </form>
    </div>
  )
}

export default Login