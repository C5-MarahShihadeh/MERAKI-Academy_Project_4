import React, { useState, useContext } from "react";
import { tokenContext } from "../../App";
import { isLoggedInContext } from "../../App";
import { useNavigate } from "react-router";
// component for logout
const Logout = () => {
  const { token, setToken } = useContext(tokenContext);
  const { isLoggedIn, setIsLoggedIn } = useContext(isLoggedInContext);
  setToken(null);
  setIsLoggedIn(false);
  localStorage.removeItem("saveToken");
  const navigate = useNavigate();
  return navigate("/");
};
export default Logout;
