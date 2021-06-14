import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Div, Toast, URL } from "../Dashboard/Helper";
import "./login.css";

const Email = () => {
  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const resetPassword = (e) => {
    e.preventDefault();

    if (email === "") {
      return Toast.error("Enter your Email");
    }
    console.log(email);

    fetch(`${URL}/reset-password/?email=${email}/`)
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
    // fetch(`${URL}/reset-password/`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     email,
    //   }),
    // })
    //   .then((res) => res.json())
    //   .then((data) => console.log(data))
    //   .catch((err) => console.log(err));
  };
  return (
    <Div>
      <div className="form-container">
        <form className="form" style={{ height: "400px" }}>
          <h2>Send your Email For Verification</h2>
          <div className="form-div">
            <label className="label">Email</label>
            <input
              className={"signup-input"}
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
            />
            <button className="auth-btn" onClick={resetPassword}>
              Send
            </button>
          </div>
        </form>
      </div>
    </Div>
  );
};

export default Email;
