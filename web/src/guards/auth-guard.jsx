import React from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../contexts/auth-context";

function AuthGuard(props) {
  const { user } = React.useContext(AuthContext);
  const Component = props.component;

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <Component />;
}

export default AuthGuard;
