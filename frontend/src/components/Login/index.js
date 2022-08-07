import React, { useState, useContext } from "react";
import axios from "axios";
import { tokenContext } from "../../App";
import { isLoggedInContext } from "../../App";
import { useNavigate, Link } from "react-router-dom";
import "./style.css";
// component for login
const Login = () => {
  const { token, setToken } = useContext(tokenContext);
  const { isLoggedIn, setIsLoggedIn } = useContext(isLoggedInContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  return (
    <div className="login">
      <input
        id="email"
        type="email"
        placeholder="     Email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <br />
      <input
        id="password"
        type="password"
        placeholder="     Password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <br />
      <button
        id="login"
        onClick={(e) => {
          axios
            .post("http://localhost:5000/login/", {
              email,
              password,
            })

            .then((result) => {
              setToken(result.data.token);
              localStorage.setItem("saveToken", result.data.token);
              localStorage.setItem("saveUser", result.data.userId);

              setIsLoggedIn(true);
              setMessage(result.data.message);
              navigate("/");
            })
            .catch((error) => {
              setMessage(error.response.data.message);
            });
        }}
      >
        Sign In
      </button>
      <Link className="regg" to="/users">
        Sign Up?Click here
      </Link>
      <p className="messageLogin">{message}</p>
    </div>
  );
};

export default Login;
