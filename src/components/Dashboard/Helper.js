import "../../App.css";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Container = (props) => {
  return (
    <div {...props} className="content">
      {props.children}
    </div>
  );
};
export const Div = (props) => {
  return (
    <div {...props} className="main-div-container">
      {props.children}
    </div>
  );
};

export const URL = "http://ifeomasart.herokuapp.com/api/v1";

export const Toast = {
  error: (msg) => {
    toast.error(msg, {
      position: toast.POSITION.TOP_RIGHT,
      hideProgressBar: true,
      autoClose: 4000,
      pauseOnHover: false,
    });
  },
  success: (msg) => {
    toast.success(msg, {
      position: toast.POSITION.TOP_RIGHT,
      hideProgressBar: true,
      autoClose: 4000,
      pauseOnHover: false,
    });
  },
};
