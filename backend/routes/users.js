const express = require("express");
const { register } = require("../controllers/users");
const authentication = require("../middleware/authentication");
const {addToCart,getProductInCart,deleteProductInCart}=require("../controllers/addToCart")
// define router
const usersRouter = express.Router();


usersRouter.post("/", register);
usersRouter.post("/cart/:id",authentication, addToCart);
usersRouter.get("/cart",authentication,getProductInCart);
usersRouter.delete("/cart/:id",authentication,deleteProductInCart);

module.exports = usersRouter;
