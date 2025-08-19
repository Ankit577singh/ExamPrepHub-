import { Navigate } from "react-router";
import React, { useContext } from "react";
import { AppContent } from "../contextapi/AppContext";

function AuthRedirectRoute({ children }) {
//   const { isLoggin } = useContext(AppContent); // check login state from context
const isLoggedIn = document.cookie.includes("token=");



  // Agar user already logged in, home/login pe jaane se redirect
  if (isLoggedIn) {
    return <Navigate to="/login-home" />;
  }

  return children;
}

export default AuthRedirectRoute;
