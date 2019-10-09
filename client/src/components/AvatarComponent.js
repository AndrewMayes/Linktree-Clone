import React, { useState } from 'react';
import Avatar from 'react-avatar-edit';
import axios from 'axios';
import pic from '../imgs/default.png';

const AvatarComponent = ({ closeModal, username }) => {

  const [preview, setPreview] = useState(null);
  const [avatar, setAvatar] = useState(pic);
  const [final, setFinal] = useState(null);
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
    console.log(preview);
  }

  const onBeforeFileLoad = (e) => {
    if(e.target.files[0].size > 5000000){
      alert("File size is too big!");
      e.target.value = "";
    } else {
      const userAvatar = e.target.files[0];

      const formData = new FormData();
      formData.append('userAvatar', userAvatar);
      setAvatar(formData)
      //console.log(e.target.files);
      //console.log(avatar)
      console.log(...formData);
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
  })
  .catch(err => {
    console.log(err.response);
  })

  closeModal();
}

  return (
    <div>
      <Avatar
        width={250}
        height={250}
        onCrop={onCrop}
        onClose={onClose}
        src={avatar}
        onBeforeFileLoad={onBeforeFileLoad}
      />
      <img style={{width: '150px', height: '150px'}}src={preview} alt="Preview" />
      <button onClick={submitAvatar}>Upload!</button>
  </div>
  )
}

export default AvatarComponent
