const express = require("express");

// Import products controllers
const {
  getAllProducts,
  createCategory,
  getProductsByCategory,
  getProductsByTitle,
  createProductsByUser,
  updateProductsByUser,
  deleteProductsByUser,
  getALLCategory,
} = require("../controllers/products");

// Import comments controller
const { createNewComment } = require("./../controllers/comments");

// Middleware
const authentication = require("../middleware/authentication");

// create products router
const productsRouter = express.Router();

productsRouter.get("/", getAllProducts);

productsRouter.post("/category", createCategory);

productsRouter.get("/category/all", getALLCategory);

productsRouter.get("/category/:id", getProductsByCategory);

productsRouter.get("/search", getProductsByTitle);

productsRouter.post("/", authentication, createProductsByUser);

productsRouter.put("/:id", authentication, updateProductsByUser);

productsRouter.delete("/:id", authentication, deleteProductsByUser);

productsRouter.post("/:id/comments", authentication, createNewComment);

module.exports = productsRouter;
