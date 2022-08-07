import React from "react";
import { useState, useContext ,useEffect} from "react";
import axios from "axios";
import { tokenContext } from "../../App";

import "./style.css";
// component to add products by users
const AddProduct = () => {
  const { token, setToken } = useContext(tokenContext);
  const [categoryId,setcategoryId]=useState("")
  const [categoryItem, setcategoryItem] = useState([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [img, setImg] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);


const onChangeValue =  (e) => {
  setcategoryId(e.target.value);

  };

  const getALLCategory = () => {
    axios
      .get("http://localhost:5000/products/category/all")
      .then((result) => {
      
        setcategoryItem(result.data.category);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getALLCategory();
  }, []);

  const mappedCategory =
    categoryItem &&
    categoryItem.map((element, index) => {
      return (
        <div id="chooseCategory">
          <label>{element.title}</label>
          <input type="radio" name={element.title}  onChange={onChangeValue} value={element._id} />
          <br />
        </div>
      );
    });
  return (
      
    <div className="addsProduct">
        <label id="title">Title</label>&nbsp; &nbsp;
      <input
        className="title"
        type="text"
        name="title"
        placeholder="Product title"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <br />
      <label id="price">Price</label>&nbsp; &nbsp;
      <input
        className="priceInput"
        placeholder="product price"
        onChange={(e) => {
          setPrice(e.target.value);
        }}
      />
      <br />
      <label id="img">Image</label>&nbsp; &nbsp;
      <input
        type="url"
        className="imgInput"
        placeholder="Image of Product"
        onChange={(e) => {
          setImg(e.target.value);
        }}
      /><br/>
       <label id="label">Please select category:</label>&nbsp; &nbsp;
        <div className="chooseCategory">{mappedCategory}</div>
  
      <button
        className="addProduct"
        onClick={(e) => {

          axios
            .post(
              "http://localhost:5000/products/",
              { title: title, price: price, img: img ,categoryId:categoryId},

              { headers: { authorization: "Bearer " + token } }
  
            )

            .then((result) => {
              console.log(result.data);
console.log('add product function',categoryId );
              console.log("token", token);
           
              setMessage(result.data.message);
              setError(false);
            })
            .catch((error) => {
              setMessage(error.response.data.message);
              setError(true);
            });
        }}
      >
        Create New Product
      </button>
      <p className="meessage">{message}</p>
    </div>
  );
};

export default AddProduct;
