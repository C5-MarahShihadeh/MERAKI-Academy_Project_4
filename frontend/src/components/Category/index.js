import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { tokenContext } from "../../App";
import { isLoggedInContext } from "../../App";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import "./style.css";
// component for category
const Category = () => {
  const [category, setCategory] = useState([]);

  const getALLCategory = () => {
    axios
      .get("http://localhost:5000/products/category/all")
      .then((result) => {
        setCategory(result.data.category);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getALLCategory();
  }, []);

  const mappedCategory =
    category &&
    category.map((element, index) => {
      return (
        <span className="addedCategory" key={index}>
          {" "}
          <h4 className="categoryy">
            <Link to={`/category/${element._id}`}>{element.title}</Link>
          </h4>{" "}
        </span>
      );
    });

  return <div className="parentCategory">{mappedCategory}</div>;
};

export default Category;
