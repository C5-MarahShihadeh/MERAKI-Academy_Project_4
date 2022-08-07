import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { tokenContext } from "../../App";
import { isLoggedInContext } from "../../App";
import { useNavigate } from "react-router";
import { Link, useParams } from "react-router-dom";
import { productContext } from "../../App";
import { userContext } from "../../App";
import { RiDeleteBinLine } from "react-icons/ri";
import { BsCartPlus } from "react-icons/bs";
import "./style.css";
const ProductsBuCategory = () => {
  const { token, setToken } = useContext(tokenContext);
  const { id } = useParams();

  const [category, setCategory] = useState([]);
  const { products, setProducts } = useContext(productContext);
  const { userId, setUserId } = useContext(userContext);

  const [user, setUser] = useState(0);
  const [newTitle, setNewTitle] = useState("");
  const [newPrice, setNewPrice] = useState(0);
  const [message, setMessage] = useState("");
  const [comment, setComment] = useState("");
  const [cart, setCart] = useState([]);

  const ProductByCategory = () => {
    axios
      .get(`http://localhost:5000/products/category/${id}`)
      .then((result) => {
        console.log("ppp", result.data.product);
        setProducts(result.data.product);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    ProductByCategory();
  }, [id]);

  const getAllProducts = () => {
    axios
      .get("http://localhost:5000/products/?page=1&limit=9")
      .then((result) => {
        setProducts(result.data.products);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAllProducts();
  }, []);

  const mappedProducts =
    products &&
    products.map((element, index) => {
      return (
        <div className="addedProduct" key={index}>
          <img src={element.img} />
          <h4 className="addedTitle">{element.title}</h4>
          <h4 className="addedPrice">{element.price} JD</h4>
          {token ? (
            <div>
              <button
                className="addToCart"
                onClick={(e) => {
                  axios
                    .post(
                      `http://localhost:5000/users/cart/${element._id}`,
                      {},

                      { headers: { authorization: "Bearer " + token } }
                    )

                    .then((result) => {
                      setCart(result.data);
                      setMessage(result.data.message);
                    })
                    .catch((error) => {
                      console.log(error.response);

                      setMessage(error.response.data.message);
                    });
                }}
              >
                <BsCartPlus className="cart" />
              </button>
              <p>
                {element.comments &&
                  element.comments.map((comment, i) => {
                    return <p>{comment.comment}</p>;
                  })}
              </p>
              <button
                className="addingComment"
                onClick={() => {
                  axios
                    .post(
                      ` http://localhost:5000/products/${element._id}/comments`,
                      { comment },

                      { headers: { authorization: "Bearer " + token } }
                    )

                    .then((result) => {
                      setComment(result.data.comment);
                      ProductByCategory();
                    })
                    .catch((error) => {
                      setMessage(error.response.data.message);
                    });
                }}
              >
                Add Feedback
              </button>
              <input
                id="comment"
                onChange={(e) => {
                  setComment(e.target.value);
                }}
                placeholder="Feedback..."
              />
            </div>
          ) : (
            <></>
          )}
          {element.userId === userId ? (
            <>
              <br />
              <div className="update and delete">
              <input
                    id="newTitle"
                    type={"text"}
                    defaultValue={element.title}
                    onChange={(e) => {
                      setNewTitle(e.target.value);
                    }}
                    placeholder="update title"
                  />

                  <input
                    id="newPrice"
                    type={"text"}
                    defaultValue={element.price}
                    onChange={(e) => {
                      setNewPrice(e.target.value);
                    }}
                    placeholder="update price"
                  />

                  <button
                    className="update"
                    onClick={() => {
                      axios
                        .put(
                          `http://localhost:5000/products/${element._id}`,
                    
                          {
                            title: newTitle ? newTitle : element.title,
                            price: newPrice
                              ? newPrice
                              : element.price,
                          },

                          { headers: { authorization: "Bearer " + token } }
                        )

                        .then((result) => {
                          getAllProducts();
                          setMessage(result.data.message);
                        })
                        .catch((error) => {
                          setMessage(error.response.data.message);
                        });
                    }}
                  >
                    update
                  </button>
        
              <button className="dellete"
                onClick={() => {
                  axios
                    .delete(`http://localhost:5000/products/${element._id}`, {
                      headers: { authorization: "Bearer " + token },
                    })
                    .then((result) => {
                      getAllProducts();
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }}
              >
               <RiDeleteBinLine className="del"/>
            </button>
            </div>
            </>
          ) : (
            <></>
          )}
        </div>
      );
    });

  return <div className="productsParent">{mappedProducts}</div>;
};

export default ProductsBuCategory;
