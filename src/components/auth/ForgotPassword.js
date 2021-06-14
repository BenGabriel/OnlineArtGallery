import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Div, Toast } from "../Dashboard/Helper";
import "./login.css";

const ForgotPassword = (props) => {
  const [user, setUser] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const history = useHistory();
  const { oldPassword, newPassword } = user;

  const handleOldPasswordChange = (e) => {
    setUser({ ...user, oldPassword: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setUser({ ...user, newPassword: e.target.value });
  };

  const resetPassword = (e) => {
    e.preventDefault();

    if (oldPassword === "") {
      return Toast.error("Enter your old password");
    }
    if (newPassword === "") {
      return Toast.error("Enter your new password");
    }
    console.log(oldPassword, newPassword);
  };
  return (
    <Div>
      <div className="form-container">
        <form className="form">
          <h2>Forgot Your Password</h2>
          <div className="form-div">
            <label className="label">Old Password</label>
            <input
              className={"signup-input"}
              type="password"
              value={oldPassword}
              onChange={handleOldPasswordChange}
            />
            <label className="label">New Password</label>
            <input
              type="password"
              className={"signup-input"}
              value={newPassword}
              onChange={handlePasswordChange}
            />
            <button className="auth-btn" onClick={resetPassword}>
              Reset
            </button>
          </div>
        </form>
      </div>
    </Div>
  );
};

export default ForgotPassword;
