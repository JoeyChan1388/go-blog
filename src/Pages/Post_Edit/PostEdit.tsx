import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { useParams } from "react-router-dom";

const PostEdit = () => {
  const user = useSelector(selectUser);
  const { id } = useParams();

  console.log(id);
  useEffect(() => {
    fetch(`https://my-blog-server-production.up.railway.app/post/${id}`)
      .then((response) => {
        console.log(
          response.json().then((data) => {
            console.log(data);
            (document.querySelector("#postTitle") as HTMLInputElement).value = data.title;
            (document.querySelector("#postMessage") as HTMLTextAreaElement).value = data.message;
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const submitPost = () => {
    let title = (document.getElementById("postTitle") as HTMLInputElement)
      .value;
    let message = (document.getElementById("postMessage") as HTMLInputElement)
      .value;

    fetch(`https://my-blog-server-production.up.railway.app/post/${id}/edit`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        poster_id: user.id,
        title: title,
        message: message,
      }),
    })
      .then((response) => {
        response.json().then((data) => {
          console.log(data);
        });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        window.location.href = "/";
      });
  };

  return (
    <div>
      <h1>Post Edit</h1>
      <input id="postTitle" type="text" placeholder="Title" />
      <textarea id="postMessage" placeholder="Write your post here" />
      <button onClick={submitPost}>Update</button>
    </div>
  );
};

export default PostEdit;
