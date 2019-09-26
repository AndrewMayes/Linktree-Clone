import React, { useReducer } from 'react';
import axios from 'axios';

const NewLink = ({ username }) => {
  const [linkInput, setLinkInput] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      linkTitle: '',
      url: ''
    }
  );

  const onSubmit = e => {
    e.preventDefault();

    const linkInfo = {
      "linkTitle": linkInput.linkTitle,
      "url": linkInput.url
    }
    const newLink = () => {
      axios.patch(`/users/${username}`, linkInfo )
        .then(res => {
          console.log(res)
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
          alert('Something went wrong')
        })
    }

    newLink();
    setLinkInput({linkTitle: '', url: ''});
  }

  const onChange = e => {
    const {name, value} = e.target;

    setLinkInput({[name]: value});
  }

  return (
    <div className="new-link">
      <form onSubmit={onSubmit}>
      <input type="text" name="linkTitle" value={linkInput.linkTitle} onChange={onChange} placeholder="Link Title"/>
      <input type="text" name="url" value={linkInput.url} onChange={onChange} placeholder="URL"/>
      <button type="submit" disabled={!linkInput.linkTitle || !linkInput.url}>Submit</button>
      </form>
    </div>
  )
}

export default NewLink
