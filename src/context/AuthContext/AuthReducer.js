import { GET_USER, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT } from "../Type";

export default (state, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.auth_token);
      return {
        ...state,
        userAuth: true,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        userAuth: null,
      };
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        userAuth: null,
      };
    case GET_USER:
      return {
        ...state,
        artist: action.payload,
        userAuth: true,
      };
    default:
      return state;
  }
};
