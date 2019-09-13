import React from 'react';

const Links = ({ link }) => {
  return (
    <div className="link">
      <a className="linkContainer" href={link.url} target="_blank" rel="noopener noreferrer">{link.linkTitle}</a>
    </div>
  )
}

export default Links
