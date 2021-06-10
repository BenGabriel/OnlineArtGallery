import axios from "axios";
import React, { useReducer } from "react";
import { Toast } from "../../components/Dashboard/Helper";
import { URL } from "../../components/Dashboard/Helper";
import { CLEAR_POST, CREATE_POST, GET_ALL_POST } from "../Type";
import ArtistContext from "./ArtistContext";
import ArtistReducer from "./ArtistReducer";

const ArtistState = (props) => {
  const initialState = {
    postState: null,
    user: null,
    post: null,
  };

  const [state, dispatch] = useReducer(ArtistReducer, initialState);

  const getPost = async () => {
    try {
      const res = await axios.get(`${URL}/posts/`);
      dispatch({
        type: GET_ALL_POST,
        payload: res.data,
      });
      console.log("hi");
      console.log(res.data, "data");
    } catch (error) {
      console.log(error);
    }
  };

  const createPost = async (post) => {
    const token = await localStorage.getItem("token");
    console.log(token);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Token ${token}`,
      },
    };
    try {
      const res = await axios.post(`${URL}/posts/`, post, config);
      dispatch({
        type: CREATE_POST,
      });
      console.log(res.data);
      Toast.success("Art work successfully added");
      getPost();
    } catch (err) {
      console.log(err.response);
    }
  };

  const clearPost = () => {
    dispatch({
      type: CLEAR_POST,
    });
  };

  return (
    <ArtistContext.Provider
      value={{
        user: state.user,
        postState: state.postState,
        post: state.post,
        getPost,
        createPost,
        clearPost,
      }}
    >
      {props.children}
    </ArtistContext.Provider>
  );
};

export default ArtistState;
