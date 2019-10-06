import React from 'react';
import { Link } from 'react-router-dom';
const Home = () => {
  return (
    <div className="green-container">
      <div className="buttons">
        <Link to='/login' className="sign-in-button">
          <p>Log In!</p>
        </Link>
        <span id="or">or</span>
        <Link to='/signup' className="sign-in-button">
          <p>Sign Up!</p>
        </Link>
      </div>
    </div>
  )
}

export default Home
