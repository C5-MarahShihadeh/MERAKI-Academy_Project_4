import React, { useState, useContext, useEffect, useParams } from "react";
import axios from "axios";
import { tokenContext } from "../../App";
import { isLoggedInContext } from "../../App";
import { userContext } from "../../App";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { productContext } from "../../App";
import { BsCartPlus } from "react-icons/bs";
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
import { RiDeleteBinLine } from "react-icons/ri";


import "./style.css";
// compinent for the home page
const Home = () => {
  const { token, setToken } = useContext(tokenContext);
  const { products, setProducts } = useContext(productContext);
  const { userId, setUserId } = useContext(userContext);
  const { isLoggedIn, setIsLoggedIn } = useContext(isLoggedInContext);
  const [message, setMessage] = useState("");
  const [comment, setComment] = useState("");
  const [cart, setCart] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(9);
  const [newTitle, setNewTitle] = useState("");
  const [newPrice, setNewPrice] = useState(0);
  // function to show all product in home
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
  const getNextProduct = (page) => {
    axios
      .get(`http://localhost:5000/products/?page=${page}&limit=9`)
      .then((result) => {
        setProducts(result.data.products);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getNextProduct();
  }, []);

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
          <h4 className="addedPrice">{element.price} JD</h4>{" "}
          {token ? (
            <div className="carrt">
              <button
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
                      setMessage(error.response.data.message);
                    });
                }}
                className="addToCart"
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
                      getAllProducts();
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
          ) : (
            <></>
          )}
        </div>
      );
    });

  return (
    <div className="productsParent1">
      <div>
        <img
          className="bigImage"
          src="https://www.sephora.com/contentimages/homepage/051022/Homepage/DesktopMweb/2022-5-16-hp-slide-sol-de-janerio-beija-flor-us-ca-desktop-slice.jpeg?imwidth=1200"
        />
      </div>
      <div className="productsParent">{mappedProducts}</div>
      <div>
        <button
          className="previous"
          onClick={() => {
            setPage(page - 1);
            setLimit(9);
            getNextProduct(page - 1);
          }}
        >
          <GrPrevious className="prev" />
        </button>
        <button
          className="next"
          onClick={() => {
            setPage(page + 1);
            setLimit(9);
            getNextProduct(page + 1);
          }}
        >
          <GrNext className="nex" />
        </button>
      </div>
    </div>
  );
};

export default Home;
