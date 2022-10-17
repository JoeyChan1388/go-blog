import React from 'react'
import './AddPostForm.css'
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";

const AddPostForm = () => {
  const user = useSelector(selectUser);

  const submitPost = () => {
    let title = (document.getElementById('postTitle') as HTMLInputElement).value
    let message = (document.getElementById('postMessage') as HTMLInputElement).value

    fetch('https://my-blog-server-production.up.railway.app/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        poster_id: user.id,
        title: title,
        message: message,
      }),
    }).then((response) => {
      console.log(response.json().then((data) => {
        console.log(data)
      }))
    }).catch((error) => {
      console.log(error)
    }).finally(() => {
      window.location.href = '/'
    })
  }

  return (
    <div className='postForm-Container'>
      <div className='postForm'>
        <h1>Add a new post</h1>
        <input id='postTitle' type='text' placeholder='Title' />
        <textarea id='postMessage' placeholder='Write your post here' />
        <button onClick={submitPost}>Submit</button>
      </div>
    </div>
  )
}

export default AddPostForm