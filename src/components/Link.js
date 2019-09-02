import React from 'react'

const Links = ({ link }) => {

  const linkStyle = {
    display: 'block',
    borderStyle: 'solid',
    borderColor: 'black',
    marginBottom: '12px',
    textAlign: 'center',
    padding: '15px'
  }

  return (
    <div>
      <a style={linkStyle} href={link.url}>{link.title}</a>
    </div>
  )
}

export default Links
