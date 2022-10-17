import React, { useEffect } from 'react'
import { useParams } from "react-router-dom";
import './PostView.css'

const PostView = () => {
    const { id } = useParams();

    useEffect(() => {
        fetch(`https://my-blog-server-production.up.railway.app/post/${id}`)
          .then((response) => {
            console.log(
              response.json().then((data) => {
                console.log(data);
                (document.querySelector("#postTitle") as HTMLHeadingElement ).textContent = data.title;
                (document.querySelector("#postMessage") as HTMLParagraphElement).textContent = data.message;
                (document.querySelector("#posterName") as HTMLParagraphElement).textContent = data.poster;

              })
            );
          })
          .catch((error) => {
            console.log(error);
          });
      }, [id]);

  return (
    <div className='postview__container'>
        <h1 id='postTitle'>Post Title</h1>
        <h4 id='posterName'>Poster</h4>
        <p id='postMessage'>Post Message</p>
    </div>
  )
}

export default PostView