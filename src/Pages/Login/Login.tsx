import React from "react";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import { login, selectUser } from "../../features/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  let signin = true;

  if (user.name !== "" || user == null) {
    window.location.href = "http://localhost:3000/";
  }

  const handleLoginSubmit = () => {
    let userName: string = (
      document.getElementById("username") as HTMLInputElement
    ).value;
    let password: string = (
      document.getElementById("password") as HTMLInputElement
    ).value;

    // send get request to server on port 3000
    fetch("https://my-blog-server-production.up.railway.app/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        user_displayname: userName,
        user_password: password,
      }),
    })
      .then((response) => {
        console.log(
          response.json().then((data) => {
            console.log(data);
            if (data.user_id && data.user_displayname) {
              dispatch(
                login({ id: data.user_id, name: data.user_displayname })
              );
              //redirect to home page
              window.location.href = "http://localhost:3000/";
            } else {
              alert("Invalid username or password");
            }
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSignupSubmit = () => {
    let userName: string = (
      document.getElementById("signup-username") as HTMLInputElement
    ).value;
    let password: string = (
      document.getElementById("signup-password") as HTMLInputElement
    ).value;

    // send get request to server on port 3000
    fetch("https://my-blog-server-production.up.railway.app/adduser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        user_displayname: userName,
        user_password: password,
      }),
    })
      .then((response) => {
        console.log(
          response.json().then((data) => {
            console.log(data);
            if (data.user_id && data.user_displayname) {
              dispatch(
                login({ id: data.user_id, name: data.user_displayname })
              );
              //redirect to home page
              window.location.href = "http://localhost:3000/";
            } else {
              alert("Invalid username or password");
            }
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const onFormSwitch = () => {
    signin = !signin;
    console.log(signin);

    if (signin) {
      document
        .getElementsByClassName("signup-section")[0]
        .classList.remove("focused");

      document
        .getElementsByClassName("login-section")[0]
        .classList.add("focused");

      document.getElementsByClassName("signup-form")[0].classList.add("hidden");
      document.getElementsByClassName("login-form")[0].classList.remove("hidden");

      (document.getElementById('signup-prompt') as HTMLDivElement).classList.remove('hidden');
      (document.getElementById('login-prompt') as HTMLDivElement).classList.add('hidden');

    } else {
      document
        .getElementsByClassName("login-section")[0]
        .classList.remove("focused");
      document
        .getElementsByClassName("signup-section")[0]
        .classList.add("focused");

        document.getElementsByClassName("signup-form")[0].classList.remove("hidden");
        document.getElementsByClassName("login-form")[0].classList.add("hidden");
        
        (document.getElementById('signup-prompt') as HTMLDivElement).classList.add('hidden');
        (document.getElementById('login-prompt') as HTMLDivElement).classList.remove('hidden');
    }
  };
  return (
    <div className="login">
      <div className="login-signup">
        <div className="login-section focused">
          <div className="login-form">
            <h1>Welcome back to my Blog!</h1>
            <div className="input-field">
              <label htmlFor="username">Username</label>
              <input type="text" name="username" id="username" />
            </div>

            <div className="input-field">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" id="password" />
            </div>

            <a href="/signup">Need Account?</a>
            <button
              className="login-button"
              onClick={handleLoginSubmit}
              type="submit"
            >
              Login
            </button>
          </div>
          <div id="login-prompt" className="prompt hidden">
            <h1>Have an account?</h1>
            <p> Login to your account </p>
            <button className="signup-button" onClick={onFormSwitch}>
              Log in
            </button>
          </div>
        </div>
        <div className="signup-section">
          <div className="signup-form hidden">
            <h1>Create an Account!</h1>
            <div className="input-field">
              <label htmlFor="signup-username">Username</label>
              <input type="text" name="username" id="signup-username" />
            </div>

            <div className="input-field">
              <label htmlFor="signup-password">Password</label>
              <input type="password" name="password" id="signup-password" />
            </div>

            <a href="/signup">Need Account?</a>
            <button
              className="login-button"
              onClick={handleSignupSubmit}
              type="submit"
            >
              Login
            </button>
          </div>
          <div id='signup-prompt' className="prompt">
            <h1>New Here?</h1>
            <p> Sign up and gain access to my blog here! </p>
            <button className="signup-button" onClick={onFormSwitch}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
