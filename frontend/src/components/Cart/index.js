import React, { useState, useContext, useEffect, useParams } from "react";
import axios from "axios";
import { tokenContext } from "../../App";
import { isLoggedInContext } from "../../App";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { productContext } from "../../App";

import "./style.css";

// component for product in cart to get and delete
const Cart = () => {
  
  const { token, setToken } = useContext(tokenContext);
  const { products, setProducts } = useContext(productContext);
  const { isLoggedIn, setIsLoggedIn } = useContext(isLoggedInContext);

  const [user, setUser] = useState(0);
  const [message, setMessage] = useState("");
  const [comment, setComment] = useState("");
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  // function to show all product in cart
  const getAllProducts = () => {
    axios
      .get("http://localhost:5000/users/cart/", {
        headers: { authorization: "Bearer " + token },
      })
      .then((result) => {
        console.log(result.data.result, "ooolo");  
        setCart(result.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const mappedProducts =
    cart &&
    cart.map((element, index) => {
      return (
        <div className="addedProduct" key={index}>
          <img src={element.img} />
          <h4 className="addedTitle">{element.title}</h4>
          <h4 className="addedPrice">{element.price} JD</h4>
          <button
            onClick={(e) => {
              axios
                .delete(`http://localhost:5000/users/cart/${element._id}`, {
                  headers: { authorization: "Bearer " + token },
                })
                .then((result) => {
                  console.log(result.data.result, "ooolo");
                  getAllProducts();
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
            className="deleteButton"
          >
            Delete
          </button>
        </div>
      );
    });
  return <div className="mapp">{mappedProducts}
  <div><p>Total Price=80 JD</p></div></div>;
};

export default Cart;
