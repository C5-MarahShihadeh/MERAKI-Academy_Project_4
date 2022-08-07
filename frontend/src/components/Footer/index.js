import React, { useState, useContext, useEffect, useParams } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { AiOutlineMail } from "react-icons/ai";
import { AiOutlinePhone } from "react-icons/ai";
import { AiFillFacebook } from "react-icons/ai";
import { FiTwitter } from "react-icons/fi";
import { BsInstagram } from "react-icons/bs";
import "./style.css";

// component for footer
const Footer = () => {
  return (
    <div className="Footer">
      <div className="about">
        <h4>About us</h4>
        <p>
          Beauty recipe is a a store where you <br />
          can find your beauty in all ways you need{" "}
        </p>
      </div>

      <div className="contact">
        <h4>Contact</h4>
        <h4>
          <AiOutlineHome /> Amman-Jordan
        </h4>
        <p>
          <AiOutlineMail /> beauty.recipe@gmail.com{" "}
        </p>

        <p>
          <AiOutlinePhone /> +9679666669{" "}
        </p>
      </div>
      <div className="info">
        <h1 className="fb">
          <AiFillFacebook />
        </h1>
        <h1 className="tw">
          <FiTwitter />
        </h1>
        <h1>
          <BsInstagram />
        </h1>
      </div>
    </div>
  );
};

export default Footer;
