import React, { useState } from 'react';
import Avatar from 'react-avatar-edit';
import axios from 'axios';

const AvatarComponent = ({ closeModal, username, avatar, rerender}) => {

  const [preview, setPreview] = useState(null);
  const [previewFileName, setPreviewFileName] = useState(null);

  const token = localStorage.getItem('auth-token');
  const config = {
    headers: {'auth-token': token}
  }

  const onClose = () => {
    setPreview(null);
  }

  const onCrop = (preview) => {
    setPreview(preview);
  }

  const onBeforeFileLoad = (e) => {
    if(e.target.files[0].size > 5000000){
      alert("File size is too big!");
      e.target.value = "";
    } else {
      const userAvatar = e.target.files[0];

      const formData = new FormData();
      formData.append('userAvatar', userAvatar);
      

      const imgName = formData.getAll('userAvatar')[0].name
      setPreviewFileName(imgName);
    }
  }

// Create Blob using the base64 string which is returned from cropping the avatar
const  b64toBlob = (dataURI) => {

  var byteString = atob(dataURI.split(',')[1]);
  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);

  for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: 'image/jpeg' });
}

const submitAvatar = () => {
  
  var newBlob = b64toBlob(preview);

  // Create FormData object using Blob. This will be sent to the backend
  var newFD = new FormData();
  newFD.append('userAvatar', newBlob, previewFileName);

  axios.patch(`/users/${username}/avatar`, newFD, config)
  .then(res => {
    rerender(preview);
  })
  .catch(err => {
    console.log(err.response);
  })

  closeModal();
}

  return (
    <>
      <div className="modal-avatar-container">
        <div className="edit-avatar-container">
          <Avatar
            width={250}
            height={250}
            onCrop={onCrop}
            onClose={onClose}
            src={avatar}
            onBeforeFileLoad={onBeforeFileLoad}
          />
        </div>
      </div>
      <div className="avatar-buttons-container">
        <div className="avatar-buttons">
          <button onClick={closeModal}>Close</button>
          <button onClick={submitAvatar}>Upload!</button>
        </div>
      </div>
    </>
  )
}

export default AvatarComponent
