import React from 'react';

const Home = () => {
  return (
    <div className="homepage">
      <div className="buttons">
        <a className="sign-in-button" href="/login" rel="noopener noreferrer">Log In!</a>
        <span id="or">or</span>
        <a className="sign-in-button" href="/signup" rel="noopener noreferrer">Sign Up!</a>
      </div>
    </div>
  )
}

export default Home
