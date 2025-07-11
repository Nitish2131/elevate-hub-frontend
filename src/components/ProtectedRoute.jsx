import React from "react";
import useUserStore from "../store/user";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = (props) => {
  const { children } = props;
  const { user } = useUserStore();
  const location = useLocation(); // Get the current location

  if (!user) {
    // Redirect to signin with the current location as a query parameter
    return <Navigate to={`/signin?redirect=${location.pathname}`} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
