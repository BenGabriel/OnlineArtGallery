import { CREATE_POST, GET_ALL_POST, UPDATE_USER, CLEAR_POST } from "../Type";

export default (state, action) => {
  switch (action.type) {
    case GET_ALL_POST:
      return {
        ...state,
        post: action.payload,
      };
    case CREATE_POST: {
      return {
        ...state,
        postState: true,
      };
    }
    case CLEAR_POST: {
      return {
        ...state,
        postState: null,
      };
    }
    case UPDATE_USER: {
      return {
        ...state,
      };
    }
    default:
      return state;
  }
};
