import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../context/AuthContext/AuthContext";
import { Div, Toast } from "../Dashboard/Helper";
import "./login.css";

const Login = (props) => {
  const { userAuth, loginUser } = useContext(AuthContext);
  console.log(userAuth, "userrrrrrrrrrrrr");
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState({
    usernameError: false,
    passwordError: false,
  });

  const history = useHistory();

  useEffect(() => {
    if (userAuth) {
      props.history.push("/dashboard");
    }
  });

  const submit = (e) => {
    e.preventDefault();
    const { username, password } = user;
    if (username === "") {
      Toast.error("Enter Your Username");
      return setError({
        ...error,
        usernameError: true,
      });
    }
    if (password.length < 8) {
      Toast.error("Password must be 8 characters long");
      return setError({
        ...error,
        passwordError: true,
      });
    }

    loginUser({ username, password });
  };

  const handleUsernameChange = (e) => {
    setError({
      ...error,
      usernameError: false,
      passwordError: false,
    });
    setUser({ ...user, username: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setError({
      ...error,
      passwordError: false,
    });
    setUser({ ...user, password: e.target.value });
  };

  const { usernameError, passwordError } = error;
  return (
    <Div>
      <div className="form-container">
        <form className="form">
          <p>Welcome Back</p>
          <h2>Log into your Account</h2>
          <div className="form-div">
            <label className="label">Username</label>
            <input
              className={usernameError ? "error-input" : "signup-input"}
              type="text"
              value={user.username}
              onChange={handleUsernameChange}
            />
            <label className="label">Password</label>
            <input
              type="password"
              className={passwordError ? "error-input" : "signup-input"}
              value={user.password}
              onChange={handlePasswordChange}
            />
            <button className="auth-btn" onClick={submit}>
              Log In
            </button>
            <p
              className="accountToCreate"
              onClick={() => history.push("/signup")}
            >
              Don't have an account? Sign up
            </p>
          </div>
        </form>
      </div>
    </Div>
  );
};

export default Login;
