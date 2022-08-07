const productsModel = require("../models/products");
const category = require("../models/category");

// function to find all products
const getAllProducts = (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  productsModel
    .find({})
    .populate("comments")
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .then((products) => {
      if (products.length) {
        res.status(200).json({
          success: true,
          message: `All the products`,
          products: products,
          comments: products.comments,
          totalPages: Math.ceil(products.length / limit),
          currentPage: page
        });
      } else {
        res.status(200).json({
          success: false,
          message: `No products Yet`,
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
// function to create category
const createCategory = (req, res) => {
  console.log(req.body);
  const { title } = req.body;
  const newCategory = new category({
    title,
  });

  newCategory
    .save()
    .then((Category) => {
      res.status(201).json({
        success: true,
        message: `Category created`,
        Category: Category,
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
// function to get all categories
const getALLCategory
= (req, res) => {
  category
    .find({})
    .then((category) => {
      if (category.length) {
        res.status(200).json({
          success: true,
          message: `All the category`,
          category: category,
         
        });
      } else {
        res.status(404).json({
          success: false,
          message: `No category Yet`,
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



// function to get product by category
const getProductsByCategory = (req, res) => {
  console.log("backend",req.params)
  let categoryId = req.params.id;

  productsModel
    .find({ categoryId })
    .populate("categoryId", "title")
    .populate("comments")

    .then((products) => {
      if (!products.length) {
        return res.status(404).json({
          success: false,
          message: "The product is not found",
        });
      }
      res.status(200).json({
        success: true,
        message: "The product in category",
        product: products,
        // comments: products.comments,
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
// function to get the products by title to use by search
const getProductsByTitle = (req, res) => {
  let title = req.query.title;

  productsModel
    .find({})
    .then((products) => {
      console.log(products);
      if (!products.length) {
        return res.status(404).json({
          success: false,
          message: "The product is not found",
        });
      }
      products=products.filter((element)=>{
        return element.title.toLowerCase().includes(title.toLowerCase());
      })
      res.status(200).json({
        success: true,
        message: "The product in title",
        products: products,
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
// function to create product 
const createProductsByUser = (req, res) => {
  const { title, price, img, categoryId } = req.body;
  const newProduct = new productsModel({
    title,
    price,
    img,
    categoryId,
    userId: req.token.userId,
  });

  newProduct
    .save()
    .then((product) => {
      res.status(201).json({
        success: true,
        message: `Product created`,
        product: product,
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

// function to update product by user
const  updateProductsByUser = (req, res) => {
  const _id = req.params.id;

  productsModel
    .findByIdAndUpdate(_id, req.body, { new: true })
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `The product is not found`,
        });
      }
      res.status(202).json({
        success: true,
        message: `Product updated`,
        product: result,
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


// function to delete product by user
const deleteProductsByUser = (req, res) => {
  const id = req.params.id;
  productsModel
    .findByIdAndDelete(id)
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
  getAllProducts,
  createCategory,
  getProductsByCategory,
  getProductsByTitle,
  createProductsByUser,
  updateProductsByUser,
  deleteProductsByUser,
  getALLCategory
};
