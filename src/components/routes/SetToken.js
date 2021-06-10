import axios from "axios";

const setToken = (token) => {
  if (token) {
    axios.defaults.headers.common["auth_token"] = token;
  } else {
    delete axios.defaults.headers.common["auth_token"];
  }
};

export default setToken;
