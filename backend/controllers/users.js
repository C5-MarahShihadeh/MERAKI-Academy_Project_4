const usersModel = require("../models/users");

// This function creates a new author (new user)
const register = (req, res) => {
  const { firstName, lastName, country, email, password } = req.body;
  const user = new usersModel({
    firstName,
    lastName,
    country,
    email,
    password
  });

  user
    .save()
    .then((result) => {
      res.status(201).json({
        success: true,
        message: `Account Created Successfully`,
        user: result,
      });
    })
    .catch((err) => {
      if (err.keyPattern) {
        return res.status(409).json({
          success: false,
          message: `The email already exists`,
        });
      }
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

module.exports = {
  register,
};
