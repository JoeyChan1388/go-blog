import React from "react";
import "./Header.css";
import { useSelector, useDispatch } from "react-redux";
import { logout, selectUser } from "../../features/userSlice";
import { Link } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  return (
    <div className="header">
      <div className="header__left">
        <h1 className="title"> Joey's Blog</h1>
      </div>
      <div className="header__right">
        <Link to='/'>About</Link>
        {user.name ? (
          <>
            <p>{user.name}</p>
            <button onClick={() => dispatch(logout())}>Logout</button>
          </>
        ) : (
          <button
            onClick={() =>
              (window.location.href = "http://localhost:3000/signin")
            }
          >
            Sign in
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
