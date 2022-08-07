import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Register } from "./components/Register";
import Login from "./components/Login";
import React, { useState, createContext } from "react";
import Home from "./components/Home";
import Category from "./components/Category";
import ProductsBuCategory from "./components/ProductsByCategory";
import AddProduct from "./components/AddProduct";
import Logout from "./components/Logout";
import Search from "./components/Search";
import Cart from "./components/Cart";
import Footer from "./components/Footer";

export const tokenContext = createContext();
export const isLoggedInContext = createContext();
export const productContext = createContext();
export const userContext = createContext();
function App() {
  const saveToken = localStorage.getItem("saveToken") || "";
  const saveUser = localStorage.getItem("saveUser") || "";

  const [userId, setUserId] = useState(saveUser);
  const [token, setToken] = useState(saveToken);
  const [isLoggedIn, setIsLoggedIn] = useState("false");
  const [products, setProducts] = useState([]);
  return (
    <div className="App">
      <tokenContext.Provider value={{ token, setToken }}>
        <isLoggedInContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
          <productContext.Provider value={{ products, setProducts }}>
          <userContext.Provider value={{ userId, setUserId }}>
            <div className="naav">
              <h1 className="titleOfWebsite">Beauty Recipe</h1> <Search />
              <Navbar />
            </div>

            <Category />

            <Routes>
              <Route path="/users" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Home />} />
              <Route path="/category/:id" element={<ProductsBuCategory />} />
              <Route path="/add" element={<AddProduct />} />
              <Route path="/cart" element={<Cart />} />

              <Route path="/logout" element={<Logout />} />
            </Routes>
            <Footer />
            </userContext.Provider>
          </productContext.Provider>
        </isLoggedInContext.Provider>
      </tokenContext.Provider>
    </div>
  );
}

export default App;
