const commentsModel = require("../models/comments");
const productsModel = require("../models/products");

// This function creates a new comment for a specific product
const createNewComment = (req, res) => {
  const productId = req.params.id;
  const { comment } = req.body;
  const newComment = new commentsModel({
    comment,
    commenter: req.token.userId,
  });
  newComment
    .save()
    .then((result) => {
        productsModel
        .updateOne({ _id: productId }, { $push: { comments: result._id } })
        .then(() => {
          res.status(201).json({
            success: true,
            message: `Comment added`,
            comment: result,
          });
        })
        .catch((err) => {
          res.status(500).json({
            success: false,
            message: `Server Error`,
            err: err.message,
          });
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
  createNewComment,
};
