import React from "react";
import "./Header.css";
import { useSelector, useDispatch } from "react-redux";
import { logout, selectUser } from "../../features/userSlice";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  return (
    <div className="header">
      <div className="header__left">
        <h1 className="title"> Joey's Blog</h1>
      </div>
      <div className="header__right">
        <Link to='/about/'>About</Link>
        {user.name ? (
          <>
            <p>{user.name}</p>
            <button onClick={() => dispatch(logout())}>Logout</button>
          </>
        ) : (
          <button
            onClick={() =>
              navigate("/my-blog/signin")
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
