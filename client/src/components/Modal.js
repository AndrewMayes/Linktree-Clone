import React, { useState } from 'react';
import Model from 'react-modal';
import AvatarComponent from './AvatarComponent';
import ClipLoader from 'react-spinners/ClipLoader';

const modalStyle = {
  content: {
    top                   : '45%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    width: '260px',
    height: '350px',
    background            : 'white',
    padding: '0px'
  },
  overlay: {
    backgroundColor: 'rgba(47, 53, 62, 0.86)'
  },
}

const Modal = ({ username, avatar, rerender }) => {

  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  }

  const closeModal = () => {
    setShowModal(false);
  }

  return (
    <div>
      {avatar ? <input type="image" src={avatar} alt="avatar-select" className='avatarStyle' onClick={openModal}></input> : <div className="avatarStyle"><ClipLoader sizeUnit={"px"} size={96} color={'rgb(31, 28, 28)'} loading={true}/></div>}
      <Model 
        isOpen={showModal}
        contentLabel="Minimal Modal Example"
        style={modalStyle}
        ariaHideApp={false}
      >
        <AvatarComponent closeModal={closeModal} username={username} avatar={avatar} rerender={rerender}/>
      </Model>
    </div>
  )
}

export default Modal
