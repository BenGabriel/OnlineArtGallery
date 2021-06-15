import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Div, URL, Toast } from "../Dashboard/Helper";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./signup.css";

toast.configure();
const Signup = () => {
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    location: "",
    phone: "",
    password: "",
  });
  const [error, setError] = useState({
    firstnameError: false,
    lastnameError: false,
    emailError: false,
    usernameError: false,
    phoneError: false,
    passwordError: false,
    locationError: false,
  });
  const {
    usernameError,
    firstnameError,
    lastnameError,
    emailError,
    phoneError,
    passwordError,
    locationError,
  } = error;
  const history = useHistory();

  const notify = () => {
    console.log("hello");
    toast("Default Notification !");

    toast.success("Success Notification !", {
      position: toast.POSITION.TOP_CENTER,
    });

    toast.error("Error Notification !", {
      position: toast.POSITION.TOP_LEFT,
    });

    toast.warn("Warning Notification !", {
      position: toast.POSITION.BOTTOM_LEFT,
    });

    toast.info("Info Notification !", {
      position: toast.POSITION.BOTTOM_CENTER,
    });

    toast("Custom Style Notification with css class!", {
      position: toast.POSITION.BOTTOM_RIGHT,
      className: "foo-bar",
    });
  };

  const submit = (e) => {
    const { firstname, lastname, email, username, phone, password, location } =
      user;
    e.preventDefault();
    if (firstname === "") {
      Toast.error("Enter your Firstname");
      return setError({
        ...error,
        firstnameError: true,
      });
    }
    if (lastname === "") {
      Toast.error("Enter your Lastname");
      return setError({
        ...error,
        lastnameError: true,
      });
    }
    if (username === "") {
      Toast.error("Enter your Username");
      return setError({
        ...error,
        usernameError: true,
      });
    }
    if (email === "") {
      Toast.error("Enter your email");
      return setError({
        ...error,
        emailError: true,
      });
    }
    if (phone === "") {
      Toast.error("Enter your Phone number");
      return setError({
        ...error,
        phoneError: true,
      });
    }
    if (location === "") {
      Toast.error("Enter your Location");
      return setError({
        ...error,
        locationError: true,
      });
    }
    if (password.length < 8) {
      Toast.error("Password must be 8 characters long");
      return setError({
        ...error,
        passwordError: true,
      });
    }
    fetch(`${URL}/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: firstname,
        last_name: lastname,
        username,
        phone_number: phone,
        city: location,
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.username[0] === "A user with that username already exists.") {
          // console.log(data.username[0]);
          Toast.error("User Already Exist");
        } else {
          // console.log(typeof data.username[0]);
          Toast.success("Account Created");
          history.push("/login");
        }
      })
      .catch((err) => console.log(err));

    // console.log(user);
    // history.push("/login");
  };

  return (
    <Div>
      <div className="form-holder"></div>
      <div className="form-container">
        <form className="form-signup">
          <p onClick={notify}>Welcome</p>
          <h2>Sign up to Join </h2>
          <div className="form-div">
            <label className="label">Firstname</label>
            <input
              className={firstnameError ? "error-input" : "signup-input"}
              type="text"
              value={user.firstname}
              onChange={(e) => {
                setUser({ ...user, firstname: e.target.value });
                setError({ ...error, firstnameError: false });
              }}
            />
            <label className="label">Lastname</label>
            <input
              className={lastnameError ? "error-input" : "signup-input"}
              type="text"
              value={user.lastname}
              onChange={(e) => {
                setUser({ ...user, lastname: e.target.value });
                setError({ ...error, lastnameError: false });
              }}
            />
            <label className="label">Username</label>
            <input
              className={usernameError ? "error-input" : "signup-input"}
              type="text"
              value={user.username}
              onChange={(e) => {
                setUser({ ...user, username: e.target.value });
                setError({ ...error, usernameError: false });
              }}
            />
            <label className="label">Email</label>
            <input
              className={emailError ? "error-input" : "signup-input"}
              type="email"
              value={user.email}
              onChange={(e) => {
                setUser({ ...user, email: e.target.value });
                setError({ ...error, emailError: false });
              }}
            />
            <label className="label">Phone Number</label>
            <input
              className={phoneError ? "error-input" : "signup-input"}
              type="text"
              value={user.phone}
              onChange={(e) => {
                setUser({ ...user, phone: e.target.value });
                setError({ ...error, phoneError: false });
              }}
            />
            <label className="label">Location</label>
            <input
              className={locationError ? "error-input" : "signup-input"}
              type="text"
              value={user.location}
              onChange={(e) => {
                setUser({ ...user, location: e.target.value });
                setError({ ...error, locationError: false });
              }}
            />
            <label className="label">Password</label>
            <input
              className={passwordError ? "error-input" : "signup-input"}
              type="password"
              value={user.password}
              onChange={(e) => {
                setUser({ ...user, password: e.target.value });
                setError({ ...error, passwordError: false });
              }}
            />
            <button className="auth-btn" onClick={submit}>
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </Div>
  );
};

export default Signup;
