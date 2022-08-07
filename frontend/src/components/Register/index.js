import React, { useState, createContext } from "react";
import axios from "axios";
import "./style.css"
// component for register
export const Register = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegestered,setIsRegestered]=useState(false);
  return (
    <div className="regist">
      <input
        className="firstName"
        type="text"
        placeholder="First Name"
        onChange={(e) => {
          setFirstName(e.target.value);
        }}
      />
      <br/>
      <input
        className="lastName"
        type="text"
        placeholder="Last Name"
        onChange={(e) => {
          setLastName(e.target.value);
        }}
      />

      <br/>
      <input
        className="country"
        type="text"
        placeholder="Country"
        onChange={(e) => {
          setCountry(e.target.value);
        }}
      />
      <br/>
      <input
        className="email"
        type="email"
        placeholder="Email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <br/>
      <input
        className="password"
        type="password"
        placeholder=" Password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <br/>
      <button id="regist"
        onClick={(e) => {
          axios
            .post("http://localhost:5000/users/", {
              firstName: firstName,
              lastName: lastName,
              country: country,
              email: email,
              password: password,
            })
            .then((result) => {
              setUsers([
                ...users,
                {
                  firstName: firstName,
                  lastName: lastName,
                  country: country,
                  email: email,
                  password: password,
                },
              ]);
             
              setMessage(result.data.message)  ;
              setIsRegestered(true);
            })
            .catch((error) => {
              setMessage(error.response.data.message);
              setIsRegestered(false);
            });
        }}
      >
      Sign Up
      </button>
      <p className={isRegestered?'Succesfull':'error'}>{message}</p>
    </div>
  );
};
