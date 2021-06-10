import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext/AuthContext";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { userAuth } = useContext(AuthContext);
  const token = localStorage.getItem("token");
  console.log(token);
  return (
    <Route
      {...rest}
      render={(props) =>
        !userAuth === null ? <Redirect to="login" /> : <Component {...props} />
      }
    />
  );
};

export default PrivateRoute;
