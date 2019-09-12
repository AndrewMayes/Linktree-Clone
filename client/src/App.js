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
    },
    {
      title: 'Twitter',
      url: 'https://twitter.com'
    },
    {
      title: 'Instagram',
      url: 'https://www.instagram.com'
    },
    {
      title: 'Twitter',
      url: 'https://twitter.com'
    },
    {
      title: 'Instagram',
      url: 'https://www.instagram.com'
    }
  ]);

  return (
    <div>
      <UserHeader />
      <div className="linksList">
        {links.map(link => <Link link={link}/>)}
      </div>
    </div>
  )
}

export default App


