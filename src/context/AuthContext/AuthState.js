import React, { useReducer } from "react";
import AuthContext from "./AuthContext";
import AuthReducer from "./AuthReducer";
import { GET_USER, LOGIN_SUCCESS, LOGOUT } from "../Type";
import axios from "axios";
import { Toast, URL } from "../../components/Dashboard/Helper";
const AuthState = (props) => {
  const initialState = {
    userAuth: null,
    artist: null,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const loginUser = async (userData) => {
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(
        "https://ifeomasart.herokuapp.com/api/auth/token/login/",
        userData,
        config
      );
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      console.log(res.data);
    } catch (err) {
      Toast.error("Invalid Credentials");
      console.log(err.response);
    }
  };

  const logout = () => {
    dispatch({
      type: LOGOUT,
    });
  };

  //get artist
  const getArtist = async () => {
    const token = await localStorage.getItem("token");
    console.log(token);
    try {
      const res = await axios.get(`${URL}/users/me/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      dispatch({
        type: GET_USER,
        payload: res.data,
      });
      console.log(res.data, "data");
    } catch (error) {
      console.log(error);
    }
  };

  //upload post

  return (
    <AuthContext.Provider
      value={{
        userAuth: state.userAuth,
        artist: state.artist,
        loginUser,
        logout,
        getArtist,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
