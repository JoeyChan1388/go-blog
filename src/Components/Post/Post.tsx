import React from "react";
import "./Post.css";
import image from "../../img/placeholder.jpeg";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { Link } from "react-router-dom";

const Post = (props: {
  postid: number;
  posterName: string;
  posterID: number;
  postTitle: string;
  postMessage: string;
  reversed: boolean;
}) => {

  const user = useSelector(selectUser);

  // Take the post body and shorten it for preview
  const shortenPost = (post: string) => {
    if (post.length > 300) {
      return post.substring(0, 300) + "...";
    } else {
      return post;
    }
  };

  const deletePost = (postid: number) => {
    fetch(`https://my-blog-server-production.up.railway.app/post/${postid}/delete`, {
      method: "DELETE",
    }).then((res) => {
      console.log(res);
      window.location.reload();
    });
  };

  return (
    // If reversed is true, reverse the order of the post
    <div className={props.reversed ? "post post--reversed" : "post"}>
      <div className="post__left">
        <div className="post__left__top">
          <h2>{props.postTitle}</h2>
          <h4>{props.posterName}</h4>
          <p>{shortenPost(props.postMessage)}</p>
        </div>

        <div className="post__left__bottom">
          <Link to={`/post/${props.postid}`}>
            <button className="btn--primary">View Post</button>
          </Link>
          {user.id === props.posterID ? (
            <>
            <Link to={`/post/${props.postid}/edit`}>
              <button className="btn--secondary">Edit Post</button>
            </Link>
            <button onClick={() => deletePost(props.postid)} className="btn--danger">Delete Post</button>
            </>
            
          ) : null}
        </div>
      </div>
      <div className="post__right">
        <img className="post__right__image" src={image} alt=""></img>
      </div>
    </div>
  );
};

export default Post;
