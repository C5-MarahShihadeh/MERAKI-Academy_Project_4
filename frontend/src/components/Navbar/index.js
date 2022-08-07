import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { isLoggedInContext } from "../../App";
import { tokenContext } from "../../App";
import "./style.css";
import { BsCart4 } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
// component for NavBar
const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(isLoggedInContext);
  const { token, setToken } = useContext(tokenContext);

  return token ? (
    <div className="naav">
      <Link className="homme" to="/">
        Home
      </Link>
      <Link className="adds" to="/add">
        Add your Products{" "}
      </Link>
      <Link to="/cart">
        <BsCart4 className="cart1" />
      </Link>
      <Link className="logout" to="/logout">
        Logout
      </Link>
    </div>
  ) : (
    <div>
      <Link className="homme" to="/login">
        {" "}
        <FaUser /> Sign In
      </Link>
      <Link className="homme" to="/">
        Home
      </Link>
      <Link to="/category"></Link>
    </div>
  );
};

export default Navbar;
