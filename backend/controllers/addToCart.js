const usersModel = require("../models/users");

const addToCart = (req, res) => {
  const productId = req.params.id;
  const userId = req.token.userId;
  console.log("BACKEND");
  usersModel
    .updateOne({ _id: userId }, { $push: { cart: productId } })
    .then((result) => {
      res.status(201).json({
        success: true,
        message: `Add to cart`,
        cart: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

const getProductInCart = (req, res) => {
  const userId = req.token.userId;
  usersModel
    .find({ _id: userId })
    .populate("cart")

    .then((result) => {
      console.log({ result });
      if (result.length) {
        res.status(200).json({
          success: true,
          message: `All the products in cart`,
          result: result[0].cart,
        });
      } else {
        res.status(200).json({
          success: false,
          message: `No products in cart Yet`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

const deleteProductInCart = (req, res) => {
  const productId = req.params.id;
  const id = req.token.userId;

  usersModel

    .updateOne({ _id: id }, { $pull: { cart: productId } })

    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `The product is not found`,
        });
      }
      res.status(200).json({
        success: true,
        message: `Product deleted`,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

module.exports = {
  addToCart,
  getProductInCart,
  deleteProductInCart,
};
