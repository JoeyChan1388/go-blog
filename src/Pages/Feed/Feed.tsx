import React, { useEffect, useState } from "react";
import AddPostForm from "../../Components/AddPostForm/AddPostForm";
import Post from "../../Components/Post/Post";
import "./Feed.css";

import { selectUser } from "../../features/userSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Feed = () => {
  const navigate = useNavigate();
  interface BlogPost {
    postid: number;
    posterID: number;
    posterName: string;
    postTitle: string;
    postMessage: string;
  }

  const user = useSelector(selectUser);

  const [posts, setPosts] = useState([] as BlogPost[]);

  // Fetch posts from the API
  useEffect(() => {
    fetch("https://my-blog-server-production.up.railway.app/posts")
      .then((res) => res.json())
      .then((data) => {
        // Convert posts from backend into usable BlogPost objects
        let dataPosts = [] as BlogPost[];
        data.forEach(
          (dataPost: {
            post_id: number;
            poster_id: number;
            poster: string;
            title: string;
            message: string;
          }) => {
            dataPosts.push({
              postid: dataPost.post_id,
              posterID: dataPost.poster_id,
              posterName: dataPost.poster,
              postTitle: dataPost.title,
              postMessage: dataPost.message,
            });
          }
        );
        // Store the BlogPost objects in state to be rendered
        setPosts(dataPosts);
      });
  }, []);

  return (
    <div className="feed-container">
      <div className="feed">
        {/* Make a post for each post */}
        <div className="feed__header">
          <div>
            <h1> Main Feed </h1>
          </div>
          <div>
            {user.name ? (
              <button
                className="btn--primary"
                onClick={() => navigate("/my-blog/posts/create")}
              >
                Create Post
              </button>
            ) : null}
          </div>
        </div>

        {posts.map((post) => (
          <Post
            key={post.postid}
            postid={post.postid}
            posterID={post.posterID}
            posterName={post.posterName}
            postTitle={post.postTitle}
            postMessage={post.postMessage}
            reversed={posts.indexOf(post) % 2 === 1}
          ></Post>
        ))}
      </div>
    </div>
  );
};

export default Feed;
