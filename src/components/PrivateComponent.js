import React from "react";
import { Navigate, Outlet } from "react-router-dom";

// this protects our routes from being accessed without authorization
const PrivateComponent = () => {
  const auth = localStorage.getItem("user");

  //   outlet is a set of children inside of the wrapper route
  return auth ? <Outlet /> : <Navigate to="signup" />;
};

export default PrivateComponent;
