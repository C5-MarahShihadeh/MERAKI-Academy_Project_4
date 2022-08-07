const express = require("express");

// Import login controller
const { login } = require("../controllers/login");

// Create login router
const loginRouter = express.Router();


loginRouter.post("/", login);

module.exports = loginRouter;
