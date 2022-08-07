import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { productContext } from "../../App";
import "./style.css";
import { BsSearch } from "react-icons/bs";
// Component for search
const Search = () => {
  const { products, setProducts } = useContext(productContext);
  const [title, setTitle] = useState("");
  const getAllProducts = () => {
    axios
      .get(`http://localhost:5000/products/search/?title=${title}`)
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
          {" "}
          <img src={element.img} />
          <h4 className="addedTitle">{element.title}</h4>
          <h4 className="addedPrice">{element.price} JD</h4>{" "}
        </div>
      );
    });

  return (
    <div className="search">
      <input
        id="search1"
        placeholder="Enter Product Title"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <button className="searchButton" onClick={getAllProducts}>
        <BsSearch />
      </button>
    </div>
  );
};

export default Search;
