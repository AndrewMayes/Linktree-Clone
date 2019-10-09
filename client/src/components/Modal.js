import React, { useState } from 'react';
import Model from 'react-modal';
import AvatarComponent from './AvatarComponent';

const modalStyle = {
  content: {
    top                   : '45%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    width: '750px',
    height: '500px',
    background            : 'white',
    padding: '0px'
  },
  overlay: {
    backgroundColor: 'rgba(47, 53, 62, 0.86)'
  },
}

const buttonStyle = {

}

const Modal = ({ username }) => {

  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  }

  const closeModal = () => {
    setShowModal(false);
  }

  const saveAvatar = () => {
    console.log('avatar saved');
    setShowModal(false);
  }

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      <Model 
        isOpen={showModal}
        contentLabel="Minimal Modal Example"
        style={modalStyle}
        ariaHideApp={false}
      >
        <AvatarComponent closeModal={closeModal} username={username}/>
      </Model>
    </div>
  )
}

export default Modal
