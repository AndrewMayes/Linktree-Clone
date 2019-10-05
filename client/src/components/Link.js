import React from 'react';

const Link = ({ link }) => {
  const formatURL = () => {
    const substring = "//";
    if (link.url.includes(substring)) {
      return link.url;
    } else {
      const newURL = `//${link.url}`;
      return newURL;
    }
  }

  return (
    <div className="link">
      <a className="linkContainer" href={formatURL()} target="_blank" rel="noopener noreferrer">{link.linkTitle}</a>
    </div>
  )
}

export default Link
