import React from 'react';

const Link = ({ link }) => {
  return (
    <div className="link">
      <a className="linkContainer" href={link.url} target="_blank" rel="noopener noreferrer">{link.linkTitle}</a>
    </div>
  )
}

export default Link
