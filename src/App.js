import React, { useState } from 'react';
import Link from './components/Link';
import UserHeader from './components/UserHeader';

const App = () => {

  const [links, setLinks] = useState([
    {
      title: 'Twitter',
      url: 'https://twitter.com'
    },
    {
      title: 'Instagram',
      url: 'https://www.instagram.com'
    }
  ]);

  const linkContainer = {
    display: 'block',
    color: 'red',
    maxWidth: '650px',
    position: 'center',
    margin: 'auto'
  }

  return (
    <div>
      <UserHeader />
      <div style={linkContainer}>
        {links.map(link => <Link link={link}/>)}
      </div>
    </div>
  )
}

export default App


