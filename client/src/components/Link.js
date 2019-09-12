import React from 'react';

const Links = ({ link }) => {
  return (
    <div className="link">
      <a className="linkContainer" href={link.url}>{link.title}</a>
    </div>
  )
}

export default Links
