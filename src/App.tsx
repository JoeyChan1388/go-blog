import React from "react";
import Login from "./Pages/Login/Login";
import Feed from "./Pages/Feed/Feed";
import "./App.css";
import Header from "./Components/Header/Header";
// import { selectUser } from "./features/userSlice";
// import { login, logout } from "./features/userSlice";
// import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PostEdit from "./Pages/Post_Edit/PostEdit";
import PostCreate from "./Pages/Post_Create/PostCreate";
import PostView from "./Pages/Post_View/PostView";

function App() {
  // const dispatch = useDispatch();
  // const user = useSelector(selectUser);

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/post/:id" element={<PostView />} />
          <Route path="/posts/create" element={<PostCreate />} />
          <Route path="/post/:id/edit" element={<PostEdit />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/" element={<Feed />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
